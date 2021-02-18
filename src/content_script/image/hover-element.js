import { isLazyload } from '../../utils/lazyload';
import src7 from 'srcset';

export default class HoverElement {
  constructor(img, canvas) {
    this.img = img;
    this.canvas = canvas;

    this.hash = parseInt(Math.random() * 9999999999);
    img.dataset.lowHash = this.hash;
    img.dataset.lowStyled = 'true';

    this.isPicture = img.parentNode && img.parentNode.tagName === 'PICTURE';
    this.isFigure = img.parentNode && img.parentNode.tagName === 'FIGURE';
    this.isImg = !this.isPicture && !this.isFigure;

    if (this.isImg) {
      this.element = img;
    } else {
      this.element = img.parentNode;
    }

    this.isLazy = isLazyload(img);

    this.width = img.getAttribute('width') || 0;
    this.height = img.getAttribute('height') || 0;
    this.hasSize = this.width !== 0 && this.height !== 0;

    if (!this.isLazy) {
      this.src = img.currentSrc;
    } else {
      if (img.dataset.src) this.src = img.dataset.src;
      else this.src = img.currentSrc;
      if (img.dataset.srcset) this.srcset = img.dataset.srcset;
      // if (img.getAttribute('src') && img.getAttribute('src') !== '') this.src = img.src;
      // if (img.getAttribute('srcset') && img.getAttribute('srcset') !== '') this.srcset = img.srcset;
    }

    this.createTempDataUri();
    // TODO keep srcset
    // remove srcset and sources to avoid future use by browser
    img.srcset = '';
    if (this.isPicture) {
      const sources = img.parentNode.querySelectorAll('source');
      const lg = sources.length;
      for (let i = 0; i < lg; i++) {
        const element = sources[i];
        img.parentNode.removeChild(element);
      }
    }

    if (this.isPicture) {
      this.element.classList.add('lowNotLoaded');
    } else {
      img.classList.add('lowNotLoaded');
    }
  }

  createTempDataUri() {
    // create data-uri image from canvas with same img attributes width/height
    // useful for responsive images, it will display the good ratio
    // TODO use smaller canvas width/height keep ratio
    let w, h;
    if (this.hasSize) {
      w = this.width;
      h = this.height;
    } else {
      w = 48;
      h = 27;
    }

    this.canvas.width = w;
    this.canvas.height = h;

    const datauri = this.canvas.toDataURL();
    this.img.src = datauri;
  }

  whitelist() {
    // TODO clean srcset
    const src = [this.src];

    // console.log('whitelist', this.src);
    // console.log('whitelist', this.srcset);
    // console.log('whitelist', this.isLazy);
    // console.log('whitelist', this.img);
    // console.log('whitelist', this.img.dataset.src);

    // TODO split srcset and whitelist urls
    if (this.isLazy && this.srcset) {
      const s7 = src7.parse(this.srcset);
      s7.forEach((image) => {
        src.push(image.url);
      });
      // console.log(src);
      // console.log(s7);
    }

    // console.log(this.isLazy, this.srcset);
    // console.log(this.isLazy && this.srcset);
    // console.log('------->', src);

    browser.runtime
      .sendMessage({
        message: 'whitelistHoverImage',
        options: {
          src,
        },
      })
      .then(
        (whitelisted) => {
          if (whitelisted) this.load();
        },
        (e) => {
          console.warn('error message whitelistHoverImage', e);
        }
      );
  }

  load() {
    this.img.dataset.whitelisted = 'true';
    this.img.src = '';
    this.img.srcset = '';

    if (this.isPicture === 'PICTURE') {
      this.element.classList.remove('lowNotLoaded');
    } else {
      this.img.classList.remove('lowNotLoaded');
    }

    requestAnimationFrame(() => {
      if (this.src) this.img.src = this.src;
      if (this.srcset) this.img.srcset = this.srcset;
    });
  }
}
