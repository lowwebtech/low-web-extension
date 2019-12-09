import browserInfo from 'browser-info';
import { BASE64_GIF } from '../../../constants';
// import { getRandomId } from '../../../utils/get-random-id';
import { prepareForStyleComputing } from '../../utils/prepare-to-compute';

export default class GiphyPlayer {
  constructor(el) {
    this.original = el.cloneNode();
    this.playing = false;
    this.first = true;
    const src = el.src;

    if (el.tagName === 'IFRAME') {
      this.id = getIdFromEmbed(src);
    } else {
      this.id = getIdFromImage(src);
    }
    this.webp = supportWebp();

    // TODO reuse original
    this.preview = document.createElement('img');
    this.preview.width = el.width;
    this.preview.height = el.height;

    this.animated = document.createElement('img');
    this.animated.classList = el.classList;
    this.animated.classList.add('lowweb__gif-player--anim');

    let container = document.createElement('div');
    container.classList.add('lowweb__gif-player');
    container.classList.add('lowweb__gif-player--giphy');
    el.parentNode.insertBefore(container, el);

    container.innerHTML =
      '<svg class="lowweb__gif-player__play" width="23" height="23" enable-background="new 0 0 23.2 23.2" viewBox="0 0 23.2 23.2" xmlns="http://www.w3.org/2000/svg"><path d="m1 1.6 20 10-20 10z" fill="#fff" stroke="#000" stroke-miterlimit="10" stroke-width="2"/></svg>';
    container.appendChild(this.preview);
    prepareForStyleComputing(container, el);

    // el.parentNode.removeChild(el);
    el.src = BASE64_GIF;
    this.container = container;
  }
  setData(data) {
    this.data = data;
    this.preview.onload = () => {
      this.addEvents();
    };
    // TODO find best size / mp4 / webp
    //  fixed_height_still
    this.preview.src = data.images.downsized_still.url + '&lowweb=AxkdIEKx';
  }
  addEvents() {
    this.container.addEventListener('mouseenter', () => this.play());
    this.container.addEventListener('mouseleave', () => this.stop());
  }
  play() {
    // TODO play at first frame
    if (!this.playing) {
      this.playing = true;
      if (this.first) {
        this.first = false;
        this.animated.width = this.original.width;
        this.animated.height = this.original.height;
        // TODO find best size / mp4 / webp
        this.animated.src = this.data.images.downsized.url + '&lowweb=AxkdIEKx';
        this.container.appendChild(this.animated);
      }
      this.container.classList.add('lowweb__gif-player--playing');
    }
  }
  stop() {
    if (this.playing) {
      this.playing = false;
      this.container.classList.remove('lowweb__gif-player--playing');
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
