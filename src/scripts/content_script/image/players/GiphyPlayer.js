import { TOKEN } from '../../../datas/constants';
import { getIdFromGiphyEmbed, getIdFromGiphyUrl } from '../../../utils/giphy';
import GifPlayer from './GifPlayer';

export default class GiphyPlayer extends GifPlayer {
  constructor(el) {
    super(el);

    this.isGiphy = true;

    const src = el.src;
    if (el.tagName === 'IFRAME') {
      // Giphy player can be an iframe
      el.marginWidth = 0;
      el.marginHeight = 0;
      const img = document.createElement('img');
      img.setAttribute('crossorigin', 'anonymous');
      this.image = img;
      this.id = getIdFromGiphyEmbed(src);
    } else if (el.tagName === 'IMG') {
      // or img
      this.image = el;
      this.id = getIdFromGiphyUrl(src);
    }
    this.type = el.tagName.toLowerCase();
  }
  setData(data) {
    const previewUrl = data.images.downsized_still.url + '&lowweb=' + TOKEN;
    this.originalSrc = data.images.downsized.url + '&lowweb=' + TOKEN;

    this.buildHandler = () => {
      this.build();
    };
    this.image.addEventListener('load', this.buildHandler);
    this.image.src = previewUrl;
  }
}
