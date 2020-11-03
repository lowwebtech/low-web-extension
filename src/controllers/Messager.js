import { onMessageOEmbed } from '../background_script/message/oembed';
import { onMessageIsActive } from '../background_script/message/is-active';

/**
 * Messager class is used to communicate between background and content scripts
 */
class Messager {
  constructor() {
    this.handlers = [onMessageOEmbed, onMessageIsActive];
  }

  init() {
    const handleIsMessage = (request, sender, sendResponse) => {
      if (request.message !== undefined) {
        console.log('MESSAGE', request.message);
        let response;
        for (let i = 0, lg = this.handlers.length; i < lg; i++) {
          response = this.handlers[i](request, sender, sendResponse);
          if (response) break;
        }

        if (response) {
          console.log('RESPONSE', response);
          sendResponse(response);
        }
      }
    };
    browser.runtime.onMessage.addListener(handleIsMessage);
  }
}

const messager = new Messager();
export default messager;
