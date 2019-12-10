import { TOKEN } from '../../../constants';
import GifPlayer from './GifPlayer';
// import browserInfo from 'browser-info';

export default class GiphyPlayer extends GifPlayer {
  constructor(el) {
    super(el);

    const src = el.src;
    if (el.tagName === 'IFRAME') {
      this.id = getIdFromEmbed(src);
    } else {
      this.id = getIdFromImage(src);
    }
    // this.webp = supportWebp();
  }
  setData(data) {
    // TODO find best size / mp4 / webp
    // fixed_height_still
    const previewUrl = data.images.downsized_still.url + '&lowweb=' + TOKEN;
    this.originalSrc = data.images.downsized.url + '&lowweb=' + TOKEN;

    this.buildHandler = () => {
      this.build();
    };
    this.image.addEventListener('load', this.buildHandler);
    this.image.src = previewUrl;
  }
}
function getIdFromEmbed(url) {
  url = url.split('giphy.com/embed/');
  if (url.length > 1) {
    return url[1];
  } else {
    return false;
  }
}
function getIdFromImage(url) {
  // TODO regex
  url = url.split('.giphy.com/media/');
  if (url.length > 1) {
    if (url[1].indexOf('/giphy.gif') !== -1) {
      return url[1].replace('/giphy.gif', '');
    } else if (url[1].indexOf('/giphy.webp') !== -1) {
      return url[1].replace('/giphy.webp', '');
    }
  } else {
    return false;
  }
}

// function supportWebp() {
//   const info = browserInfo();
//   switch (info.name.toLowerCase()) {
//     case 'chrome':
//     case 'firefox':
//     case 'opera':
//       return true;
//   }
//   return false;
// }
