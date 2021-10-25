import store from '../../store'
import videoToBlock from '../../datas/videos-to-block'
import iframesToBlock from '../../datas/iframes-to-block'
import { dataTextLink } from '../../utils/data-uri'
import sanitizeEmbedUrl, { isUrlSanitized } from '../../utils/sanitize-embed-video-url'
import Blocker from '../../controllers/Blocker'

/**
 * Block request for iframe embeds
 */
export function blockIframes () {
  const action = (details) => {
    const response = {}
    const { url, tabId } = details
    
    if (store.getters.getOption('video_clicktoload', tabId) === 1 && !isUrlSanitized(url)) {
      // find oembed video blocked
      for (const [key, video] of Object.entries(videoToBlock)) {
        if (url.indexOf(video.embed_url) !== -1) {
          if (video.customized && video.oembed) {
            // send a message to content_script for embed customisation
            browser.tabs.sendMessage(tabId, {
              message: 'embedVideoBlocked',
              url: url,
              key
            })
          }
        }
      }

      // redirect to simple fallback (just a link to original embed url)
      // iframe will be customized by content_script after oembed response message
      const sanitizedUrl = sanitizeEmbedUrl(url, false, true, store.getters.getOption('video_quality', tabId))
      response.redirectUrl = dataTextLink(sanitizedUrl)
    }

    return response
  }
  const filters = {
    urls: iframesToBlock,
    types: ['sub_frame']
  }

  Blocker.filterRequest(action, filters)
}
