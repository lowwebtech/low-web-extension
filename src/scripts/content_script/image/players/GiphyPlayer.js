import { TOKEN } from '../../../constants';
import { getIdFromEmbed, getIdFromImage } from '../../../utils/giphy';
import GifPlayer from './GifPlayer';
// import browserInfo from 'browser-info';

export default class GiphyPlayer extends GifPlayer {
  constructor(el) {
    super(el);

    const src = el.src;
    if (el.tagName === 'IFRAME') {
      el.marginWidth = 0;
      el.marginHeight = 0;
      const img = document.createElement('img');
      img.setAttribute('crossorigin', 'anonymous');
      this.image = img;
      this.id = getIdFromEmbed(src);
    } else {
      this.image = el;
      this.id = getIdFromImage(src);
    }
    this.type = el.tagName.toLowerCase();
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
