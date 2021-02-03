import TabManager from '../../controllers/TabManager';
import store from '../../store';

/**
 * Message from content_script to know if website is active
 */
export function onMessageIsActive(request, sender, sendResponse) {
  // TODO different message for tabActive
  if (request.message === 'isTabActive') {
    return TabManager.getCurrentTab().then((tab) => {
      const { href, hostname } = request.options;
      const isActive = store.getters.isActive(href, hostname);

      store.commit('url', href);

      return {
        active: isActive,
        currentTabUrl: tab.url,
      };
    }, console.error);
  }
}
