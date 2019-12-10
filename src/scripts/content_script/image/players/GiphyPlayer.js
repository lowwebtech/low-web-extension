import browserInfo from 'browser-info';
import { TOKEN } from '../../../constants';

export default class GiphyPlayer {
  constructor(el) {
    this.image = el;
    this.image.setAttribute('crossorigin', 'anonymous');
    this.playing = false;

    const src = el.src;
    if (el.tagName === 'IFRAME') {
      this.id = getIdFromEmbed(src);
    } else {
      this.id = getIdFromImage(src);
    }
    this.webp = supportWebp();
  }
  setData(data) {
    // TODO find best size / mp4 / webp
    // fixed_height_still
    const previewUrl = data.images.downsized_still.url + '&lowweb=' + TOKEN;
    this.animatedUrl = data.images.downsized.url + '&lowweb=' + TOKEN;

    this.buildHandler = () => {
      this.build();
    };
    this.image.addEventListener('load', this.buildHandler);
    this.image.src = previewUrl;
  }
  build() {
    if (this.buildHandler) {
      this.image.removeEventListener('load', this.buildHandler);
    }
    this.canvas = document.createElement('canvas');

    if (this.image.width) {
      this.canvas.width = this.image.width;
      this.canvas.height = this.image.height;
    } else if (this.image.naturalWidth && this.image.naturalWidth !== 0) {
      this.canvas.width = this.image.naturalWidth;
      this.canvas.height = this.image.naturalHeight;
    }

    this.addEvents();
    this.render();
  }
  addEvents() {
    this.image.addEventListener('mouseenter', () => this.play());
    this.image.addEventListener('mouseleave', () => this.stop());
  }
  render() {
    this.draw();
    this.canvas.toBlob(blob => {
      this.blobUrl = URL.createObjectURL(blob);
      // TODO check memory leak
      // this.image.onload = function() {
      //   // no longer need to read the blob so it's revoked
      //   URL.revokeObjectURL(url);
      // };
      this.image.src = this.blobUrl;
    });
  }
  draw() {
    const context = this.canvas.getContext('2d');
    context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    
    const scale = Math.max(300, Math.min(600, this.canvas.width)) / 300;
    const width = scale * 20;

    context.beginPath();
    context.moveTo(10, 10);
    context.lineTo(10 + width, 10 + width / 2);
    context.lineTo(10, 10 + width);
    context.closePath();

    context.lineWidth = 8;
    context.strokeStyle = '#000';
    context.stroke();

    context.fillStyle = '#FFF';
    context.fill();
  }
  play() {
    // TODO play at first frame
    if (!this.playing) {
      this.playing = true;
      this.image.src = this.animatedUrl;
    }
  }
  stop() {
    if (this.playing) {
      this.playing = false;
      console.log('BLOB', this.blobUrl);
      this.image.src = this.blobUrl;
    }
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

function supportWebp() {
  const info = browserInfo();
  switch (info.name.toLowerCase()) {
    case 'chrome':
    case 'firefox':
    case 'opera':
      return true;
  }
  return false;
}
