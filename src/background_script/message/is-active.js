import TabManager from '../../controllers/TabManager';
import store from '../../store';

/**
 * Message from content_script to know if website is active
 */
export function onMessageIsActive(request, sender, sendResponse) {
  // TODO different message for tabActive
  if (request.message === 'isTabActive') {
    return TabManager.getCurrentTab().then((tab) => {
      const location = request.options.location;
      const isActive = store.getters.isActive(location.href, location.hostname);

      store.commit('url', location.href);

      return {
        active: isActive,
        currentTabUrl: tab.url,
      };
    }, console.error);
  }
}
