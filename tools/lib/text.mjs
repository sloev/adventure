// Typography helpers shared by the web and LaTeX renderers.

// Slack-style :shortcodes: → Unicode code points. Unknown shortcodes are left
// as text (which is also what Slack does with custom emoji you don't have).
export const EMOJI = {
  '100': '1f4af', christmas_tree: '1f384', clap: '1f44f', coffee: '2615', dog: '1f415',
  exploding_head: '1f92f', eyes: '1f440', fire: '1f525', headphones: '1f3a7', heart: '2764',
  joy: '1f602', muscle: '1f4aa', pray: '1f64f', raised_hands: '1f64c', rocket: '1f680',
  saluting_face: '1fae1', skull: '1f480', slightly_smiling_face: '1f642', sweat_smile: '1f605',
  tada: '1f389', wave: '1f44b', white_check_mark: '2705', '+1': '1f44d', thumbsup: '1f44d',
  thinking_face: '1f914', grimacing: '1f62c', sob: '1f62d', cry: '1f622', smile: '1f604',
  upside_down_face: '1f643', see_no_evil: '1f648', point_up: '261d', warning: '26a0',
  rotating_light: '1f6a8', fire_engine: '1f692', broken_heart: '1f494', wilted_flower: '1f940',
  hugging_face: '1f917', handshake: '1f91d', beers: '1f37b', beer: '1f37a', cake: '1f370',
  sunny: '2600', snowflake: '2744', zzz: '1f4a4', ok_hand: '1f44c', facepalm: '1f926',
  shrug: '1f937', robot_face: '1f916', chart_with_upwards_trend: '1f4c8', red_circle: '1f534',
  large_green_circle: '1f7e2', ship: '1f6a2', bug: '1f41b', x: '274c', heavy_check_mark: '2714',
  pretzel: '1f968', sunglasses: '1f60e', partying_face: '1f973', chart: '1f4b9', mega: '1f4e3',
  bar_chart: '1f4ca', dart: '1f3af', star: '2b50', sparkles: '2728', moneybag: '1f4b0', hourglass: '231b',
  mortar_board: '1f393', palm_tree: '1f334', green_heart: '1f49a', face_with_thermometer: '1f912', trophy: '1f3c6', dog2: '1f415', soccer: '26bd', confetti_ball: '1f38a', pizza: '1f355',
};
export const SHORTCODE_RE = /:([a-z0-9_+-]+):/g;

export function emojiToUnicode(s) {
  return s.replace(SHORTCODE_RE, (m, name) =>
    EMOJI[name] ? String.fromCodePoint(...EMOJI[name].split('-').map((h) => parseInt(h, 16))) : m
  );
}

// Straight quotes → typographic quotes. Applied to prose text only, never code.
export function smartQuotes(s) {
  return s
    .replace(/(^|[\s(\[{—–\/])"/g, '$1“')
    .replace(/"/g, '”')
    .replace(/(^|[\s(\[{—–\/])'/g, '$1‘')
    .replace(/'/g, '’');
}
