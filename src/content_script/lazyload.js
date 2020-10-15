import store from '../store';

let lazyloadSupported = false;
if ('loading' in HTMLImageElement.prototype) {
  lazyloadSupported = true;
}

// !! DOESN'T WORK !! browser already starts loading images
// TODO: test if loading="lazy" defer the load of assets (not already loaded or currently loading)
// TODO add loading lazy to audio elements
//
/**
 * Lazy load image and iframe medias
 * @return
 */
export default function () {
  const IMAGE_LAZYLOAD = store.getters.image_lazyload;
  const IFRAME_LAZYLOAD = store.getters.iframe_lazyload;
  if (lazyloadSupported) {
    if (IMAGE_LAZYLOAD) {
      const imgs = document.querySelectorAll('img');
      imgs.forEach((img) => {
        img.loading = 'lazy';
      });
    }
    if (IFRAME_LAZYLOAD) {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach((iframe) => {
        iframe.loading = 'lazy';
        // if (!isAlreadyLazied(iframe)) {
        //   iframe.loading = 'lazy';
        // }
      });
    }
  }
}

// function isAlreadyLazied(el) {
//   if (el.dataset.src || el.dataset.lowsrc || el.dataset['lazy-src']) {
//     return true;
//   } else {
//     return false;
//   }
// }
