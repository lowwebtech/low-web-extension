import Blocker from '../Blocker';
import { TOKEN } from '../../constants';
import { dataTextLink } from '../../utils/data-uri';

export function blockEmbedVideo() {
  const action = details => {
    let response = {};
    if (details.type === 'sub_frame') {
      const { url } = details;
      if (url.indexOf('lowweb=' + TOKEN) === -1) {
        response.redirectUrl = dataTextLink(url);
      }
    }
    return response;
  };

  const filter = {
    urls: ['*://*.youtube.com/embed/*', '*://player.vimeo.com/*', '*://*.dailymotion.com/embed/*', '*://*.facebook.com/plugins/video.php*'],
  };
  // TODO use a ABP list
  Blocker.filterRequest(action, filter);
}
