import './gif.scss';
import store from '../../store';

export default function() {
  if (store.getters.gif_player === 1 && store.getters.block_images === 0) {
    // TODO better exclusion
    const exclude = ['giphy.com'];
    if (exclude.indexOf(store.state.hostname) === -1) {
      // TODO insert script only when gif
      // document.querySelectorAll('img[src*=".gif"]').length
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = browser.runtime.getURL('players/Gif.js');
      (document.head || document.documentElement).appendChild(script);
    }
  }
}
