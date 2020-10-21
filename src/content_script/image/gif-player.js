import { localOption } from '../../utils/get-local-options';
import { EXCLUDE_HOST_GIF } from '../../datas/constants';
import './gif.scss';

export default function () {
  localOption().then((options) => {
    if (parseInt(options.gif_player) === 1 && parseInt(options.block_images) === 0) {
      if (EXCLUDE_HOST_GIF.indexOf(window.location.hostname) === -1) {
        const gifEls = document.querySelectorAll('img[src*=".gif"], img[src*=".giphy.com/media"], iframe[src*="giphy.com/embed"]');
        if (gifEls.length > 0) {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = browser.runtime.getURL('players/Gif.js');
          (document.head || document.documentElement).appendChild(script);
        }
      }
    }
  });
}
