import store from '../../store';

/**
 * Message from content_script to know if website is active
 */
export function onMessageIsActive(request, sender, sendResponse) {
  if (request.message === 'isActive') {
    const { href, hostname } = request.options;
    store.commit('url', href);
    return store.getters.isActive(href, hostname);
  }
}
