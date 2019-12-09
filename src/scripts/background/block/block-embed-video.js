import Blocker from '../Blocker';

export function blockEmbedVideo() {
  const action = details => {
    let response = {};
    // TODO block iframe until DOMContentLoaded
    // -> 'click-to-load' function is only executed once after DOMContentLoaded
    if (details.type === 'sub_frame') {
      response.cancel = true;
    }
    return response;
  };

  const filter = {
    urls: ['*://*.youtube.com/embed/*', '*://player.vimeo.com/*', '*://*.dailymotion.com/embed/*', '*://*.facebook.com/plugins/video.php*'],
  };
  // TODO use a ABP list
  Blocker.filterRequest(action, filter);
}
