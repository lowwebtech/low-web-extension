import './gif.scss';
import store from '../../store';

export default function () {
  if (store.getters.gif_player === 1 && store.getters.block_images === 0) {
    const exclude = ['giphy.com'];
    if (exclude.indexOf(store.state.hostname) === -1) {
      const gifEls = document.querySelectorAll('img[src*=".gif"], img[src*=".giphy.com/media"], iframe[src*="giphy.com/embed"]');
      if (gifEls.length > 0) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = browser.runtime.getURL('players/Gif.js');
        (document.head || document.documentElement).appendChild(script);
      }
    }
  }
}
