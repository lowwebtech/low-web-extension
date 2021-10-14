import store from '../../store';
import videoToBlock from '../../datas/video-to-block';
import { dataTextLink } from '../../utils/data-uri';
import sanitizeEmbedUrl from '../../utils/sanitize-embed-video-url';
import Blocker from '../../controllers/Blocker';

/**
 * Block request for iframe video embeds
 */
export function clickToLoad() {
  const embedUrls = [];
  const keys = Object.keys(videoToBlock);
  for (const key of keys) {
    if (videoToBlock[key].embed_url_filter) {
      embedUrls.push(videoToBlock[key].embed_url_filter);
    }
  }

  const action = (details) => {
    const response = {};
    const { url, tabId } = details;
    if (store.getters.getOption('video_clicktoload', tabId) === 1) {
      // find video blocked
      for (const [key, video] of Object.entries(videoToBlock)) {
        if (url.indexOf(video.embed_url) !== -1) {
          if (video.customized && video.oembed) {
            // send a message to content_script for embed customisation
            browser.tabs.sendMessage(tabId, {
              message: 'embedVideoBlocked',
              url: url,
              key,
            });
          }
        }

        // redirect to simple fallback (just a link to original embed url)
        // iframe will be customized by content_script after oembed response message
        const sanitizedUrl = sanitizeEmbedUrl(url, false, true, store.getters.getOption('video_quality', tabId));
        response.redirectUrl = dataTextLink(sanitizedUrl);
        // response.cancel = true;
      }
    }

    return response;
  };
  const filters = {
    urls: embedUrls,
    types: ['sub_frame'],
  };

  Blocker.filterRequest(action, filters);
}
