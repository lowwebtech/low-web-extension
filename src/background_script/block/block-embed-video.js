// import { TOKEN } from '../../datas/constants';
import { dataTextLink } from '../../utils/data-uri';
import { watchFilter } from '../../store/watch';
import videoToBlock from '../../datas/video-to-block';
import sanitizeEmbedUrl from '../../utils/sanitize-embed-video-url';

/**
 * Block request for iframe video embeds
 */
export function blockEmbedVideo() {
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
      // iframe will be customized by content_script after message if oembed
      const sanitizedUrl = sanitizeEmbedUrl(url, false, true);
      response.redirectUrl = dataTextLink(sanitizedUrl);
    }

    return response;
  };
  const filters = {
    urls: embedUrls,
    types: ['sub_frame'],
  };

  watchFilter('video_clicktoload', action, filters);
}
