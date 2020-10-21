import { onMessageOEmbed } from './message/oembed';
import { onMessageIsActive } from './message/is-active';

/**
 * Messager class is used to communicate between background and content scripts
 */
class Messager {
  init() {
    // wait for event 'runtime.connect' then add onMessage handler to communicate between (background_script and content_script)
    const addConnect = (port) => {
      onMessageOEmbed();
      onMessageIsActive();
      browser.runtime.onConnect.removeListener(addConnect);
    };
    browser.runtime.onConnect.addListener(addConnect);
  }
}

const messager = new Messager();
export default messager;
