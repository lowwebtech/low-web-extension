import store from '../../store';

/**
 * Message from content_script to know if website is active
 */
export function onMessageIsActive() {
  const handleIsActiveMessage = function (request, sender, sendResponse) {
    if (request.message === 'isActive') {
      const location = request.options.location;
      store.commit('url', location.href);
      return store.getters.isActive(location.href, location.hostname);
    }
    return false;
  };
  if (!browser.runtime.onMessage.hasListener(handleIsActiveMessage)) {
    browser.runtime.onMessage.addListener(handleIsActiveMessage);
  }
}
