import { TOKEN } from '../../datas/constants';
import { dataTextLink } from '../../utils/data-uri';
import { watchFilter } from '../../store/watch';
import videoToBlock from '../../datas/video-to-block';
import sanitizeEmbedUrl from '../../utils/sanitize-embed-video-url';

export function blockEmbedVideo() {
  const action = details => {
    let response = {};

    const { url, tabId } = details;

    // test if url is not whitelisted by lowweb TOKEN
    if (url.indexOf('lowweb=' + TOKEN) === -1) {
      // find video blocked
      for (const key of keys) {
        if (url.indexOf(videoToBlock[key].embed_url) !== -1) {
          if (videoToBlock[key].oembed) {
            // send a message to content_script form embed customisation
            browser.tabs.sendMessage(tabId, {
              message: 'embedVideoBlocked',
              url: url,
            });
            // redirect to simple fallback just a link to original embed url
            response.redirectUrl = dataTextLink(url);
          } else {
            const sanitizedUrl = sanitizeEmbedUrl(url, false, true);
            console.log(sanitizedUrl);

            if (sanitizedUrl !== url) {
              response.redirectUrl = sanitizedUrl;
            }
          }
        }
      }
    }

    return response;
  };

  const embedUrls = [];
  const keys = Object.keys(videoToBlock);
  for (const key of keys) {
    if (videoToBlock[key].embed_url_filter) {
      embedUrls.push(videoToBlock[key].embed_url_filter);
    }
  }
  const filter = {
    urls: embedUrls,
    types: ['sub_frame'],
  };

  watchFilter('video_clicktoload', action, filter);
}
