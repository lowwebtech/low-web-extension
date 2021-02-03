const pkg = require('../../package.json');

let csp = "script-src 'self'; object-src 'self'; default-src 'self'";
if (process.env.NODE_ENV === 'development') csp = "script-src 'self' 'unsafe-eval'; object-src 'self'; default-src 'self'";

const manifestInput = {
  manifest_version: 2,
  name: '__MSG_extensionName__',
  version: pkg.version,
  default_locale: 'en_US',
  web_accessible_resources: ['options.js', 'players/*', 'images/*', 'oembed/*', 'lists/*'],
  icons: {
    32: 'icons/favicon-48.png',
    48: 'icons/favicon-48.png',
    96: 'icons/favicon-96.png',
    128: 'icons/favicon-128.png',
  },

  description: '__MSG_extensionDescription__',
  homepage_url: 'https://github.com/lowwebtech/low-web-extension',
  short_name: 'low-web',

  permissions: ['storage', 'tabs', 'webNavigation', 'webRequest', 'webRequestBlocking', '<all_urls>'],
  content_security_policy: csp,

  '__chrome|firefox__author': 'lowwebtech',
  __opera__developer: {
    name: 'lowwebtech',
  },

  __firefox__applications: {
    gecko: { id: '{ab9c153a-f2ef-4134-9675-97498ccc160f}' },
  },

  __chrome__minimum_chrome_version: '49',
  __opera__minimum_opera_version: '36',

  browser_action: {
    browser_style: true,
    default_title: 'low—web',
    default_popup: 'popup/popup.html',
    default_icon: {
      32: 'icons/favicon-32.png',
      48: 'icons/favicon-48.png',
      96: 'icons/favicon-96.png',
      128: 'icons/favicon-128.png',
    },
    '__chrome|opera__chrome_style': false,
    __firefox__browser_style: false,
  },

  '__chrome|opera__options_page': 'options/options.html',

  options_ui: {
    page: 'options/options.html',
    open_in_tab: true,
    __chrome__chrome_style: true,
  },

  background: {
    scripts: ['background.js'],
    '__chrome|opera__persistent': true,
  },

  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['content_script.js'],
      css: ['content_script.css'],
      run_at: 'document_start',
      all_frames: false,
    },
  ],
};

module.exports = manifestInput;
