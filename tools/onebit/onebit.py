#!/usr/bin/env python3
"""Make a strictly 1-bit black-and-white print master from a compiled PDF.

Each page is rasterised at print resolution (1200 dpi by default) and every
tonal area (box fills, avatars, emoji, the cover) is screened with the
stochastic clustered-dot halftone from sloev/grudgebook (tools/halftone.c,
vendored here unchanged, and the dot_threshold / dot_gain_inverse steps of its
tools/halftone.py):

  * dot centres are thrown at random with a minimum spacing (no grid), ~220
    per inch; each pixel's threshold is its distance to the nearest centre,
    scaled per dot, then ranked into a uniform 0..1 field so that a flat tone
    of coverage c prints exactly c;
  * mid-tones are pre-compensated for 12 % dot gain;
  * coverage below 1.2 % is paper white, above 98.8 % solid black.

Like grudgebook, the 1-bit edition carries no grey text: it is compiled with
\\gbonebit, which makes all text and rules solid black, so only fills are
screened. Rasterisation uses no anti-aliasing, so type stays crisp line art.

The photographic pre-processing of grudgebook's screen() (per-image levels,
resampling, unsharp mask, S-curve) is not applied: book pages are not photos,
and a page's tones are already the designer's intended values.

Output: one CCITT Group 4 image per page, 1 bit per pixel, same page size.

Usage: python3 tools/onebit/onebit.py in.pdf out.pdf [--dpi 1200] [--jobs N]
"""
import argparse
import ctypes
import io
import os
import subprocess
import sys
import tempfile
import zlib
from multiprocessing import Pool

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
T = None  # shared threshold field (inherited by forked workers)


def _lib():
    src = os.path.join(HERE, "halftone.c")
    so = os.path.join(tempfile.gettempdir(), "adventure-halftone-%d.so" % int(os.path.getmtime(src)))
    if not os.path.exists(so):
        subprocess.run(["cc", "-O2", "-shared", "-fPIC", "-o", so, src, "-lm"], check=True)
    lib = ctypes.CDLL(so)
    lib.dot_field.argtypes = [ctypes.c_void_p, ctypes.c_int, ctypes.c_int, ctypes.c_double,
                              ctypes.c_double, ctypes.c_double, ctypes.c_uint64]
    return lib


# --- from grudgebook tools/halftone.py ---------------------------------------
def dot_threshold(h, w, seed, spacing, rmin=0.62, wjit=0.35):
    """Uniform 0..1 threshold field of randomly placed, growing dots."""
    f = np.empty((h, w), dtype=np.float32)
    _lib().dot_field(f.ctypes.data, h, w, spacing, rmin, wjit, seed)
    hist, edges = np.histogram(f, bins=8192)
    cdf = np.concatenate([[0.0], np.cumsum(hist) / f.size])
    return np.interp(f, edges, cdf).astype(np.float32)


def dot_gain_inverse(p, g):
    """Coverage to image so that printed coverage c + 4g c(1-c) equals p."""
    if g <= 0:
        return p
    a = 1 + 4 * g
    return (a - np.sqrt(a * a - 16 * g * p)) / (8 * g)
# -----------------------------------------------------------------------------


def page_size_pts(pdf):
    out = subprocess.run(["pdfinfo", pdf], capture_output=True, text=True, check=True).stdout
    pages = int(next(l for l in out.splitlines() if l.startswith("Pages:")).split()[1])
    w, h = [float(x) for x in next(l for l in out.splitlines() if l.startswith("Page size:")).split()[2:5:2]]
    return pages, w, h


def screen_page(job):
    pdf, page, dpi, gain = job
    with tempfile.TemporaryDirectory() as tmp:
        base = os.path.join(tmp, "p")
        subprocess.run(["pdftoppm", "-gray", "-r", str(dpi), "-aa", "no", "-aaVector", "no",
                        "-f", str(page), "-l", str(page), "-singlefile", pdf, base], check=True)
        a = np.asarray(Image.open(base + ".pgm"))
    h, w = a.shape
    th, tw = T.shape
    if (h, w) != (th, tw):  # 1-px rounding differences between pages
        a = np.asarray(Image.fromarray(a).resize((tw, th), Image.NEAREST))
    if np.isin(a, (0, 255)).all():
        ink = a < 128  # pure line art: nothing to screen
    else:
        cov = 1 - a.astype(np.float32) / 255
        cov = dot_gain_inverse(cov, gain)
        cov[cov < 0.012] = 0
        cov[cov > 0.988] = 1
        ink = cov > T
    im = Image.fromarray(~ink).convert("1")  # white = 1
    buf = io.BytesIO()
    im.save(buf, "TIFF", compression="group4", tiffinfo={278: im.height})
    tif = Image.open(io.BytesIO(buf.getvalue()))
    off, n = tif.tag_v2[273][0], tif.tag_v2[279][0]
    photometric = tif.tag_v2.get(262, 0)
    return page, im.width, im.height, buf.getvalue()[off:off + n], photometric


def write_pdf(path, pages, wpt, hpt):
    objs = []

    def add(b):
        objs.append(b)
        return len(objs)

    catalog = add(None)
    pages_obj = add(None)
    kids = []
    for _, w, h, g4, photometric in pages:
        black_is_1 = "true" if photometric == 1 else "false"
        img = add(b"<< /Type /XObject /Subtype /Image /Width %d /Height %d /ColorSpace /DeviceGray "
                  b"/BitsPerComponent 1 /Filter /CCITTFaxDecode /DecodeParms << /K -1 /Columns %d /Rows %d "
                  b"/BlackIs1 %s >> /Length %d >>\nstream\n" % (w, h, w, h, black_is_1.encode(), len(g4))
                  + g4 + b"\nendstream")
        content = b"q %.4f 0 0 %.4f 0 0 cm /Im0 Do Q" % (wpt, hpt)
        c = add(b"<< /Length %d >>\nstream\n" % len(content) + content + b"\nendstream")
        kids.append(add(b"<< /Type /Page /Parent %d 0 R /MediaBox [0 0 %.4f %.4f] "
                        b"/Resources << /XObject << /Im0 %d 0 R >> >> /Contents %d 0 R >>"
                        % (pages_obj, wpt, hpt, img, c)))
    objs[catalog - 1] = b"<< /Type /Catalog /Pages %d 0 R >>" % pages_obj
    objs[pages_obj - 1] = b"<< /Type /Pages /Count %d /Kids [%s] >>" % (
        len(kids), b" ".join(b"%d 0 R" % k for k in kids))
    out = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = []
    for i, o in enumerate(objs, 1):
        offsets.append(len(out))
        out += b"%d 0 obj\n" % i + o + b"\nendobj\n"
    xref = len(out)
    out += b"xref\n0 %d\n0000000000 65535 f \n" % (len(objs) + 1)
    out += b"".join(b"%010d 00000 n \n" % o for o in offsets)
    out += b"trailer\n<< /Size %d /Root %d 0 R >>\nstartxref\n%d\n%%%%EOF\n" % (len(objs) + 1, catalog, xref)
    with open(path, "wb") as f:
        f.write(out)


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("src")
    ap.add_argument("dst")
    ap.add_argument("--dpi", type=int, default=int(os.environ.get("ONEBIT_DPI", 1200)))
    ap.add_argument("--gain", type=float, default=0.12, help="mid-tone dot gain to compensate")
    ap.add_argument("--spacing", type=float, default=220, help="mean dots per inch of the screen")
    ap.add_argument("--jobs", type=int, default=max(1, (os.cpu_count() or 2) - 1))
    args = ap.parse_args()

    global T
    n, wpt, hpt = page_size_pts(args.src)
    w, h = round(wpt / 72 * args.dpi), round(hpt / 72 * args.dpi)
    # One screen for the whole book, like a press: same seed, same dots.
    T = dot_threshold(h, w, zlib.crc32(b"adventure") | 1, args.dpi / args.spacing)
    jobs = [(args.src, p, args.dpi, args.gain) for p in range(1, n + 1)]
    with Pool(args.jobs) as pool:
        pages = sorted(pool.imap_unordered(screen_page, jobs, chunksize=2))
    write_pdf(args.dst, pages, wpt, hpt)
    size = os.path.getsize(args.dst) / 1e6
    print(f"{args.dst}: {n} pages, 1-bit at {args.dpi} dpi, {size:.1f} MB")


if __name__ == "__main__":
    sys.exit(main())
