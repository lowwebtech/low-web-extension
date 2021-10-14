import store from '../../store'

/**
 * Message from content_script to know if website is active
 */
export function onWhitelistHoverImage (request, sender, sendResponse) {
  if (request.message === 'whitelistHoverImage') {
    const src = request.options.src
    store.commit('whitelistHoverImage', src)
    return src
  }
}
