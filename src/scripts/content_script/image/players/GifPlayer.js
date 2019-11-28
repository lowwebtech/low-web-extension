// TODO detect animated gif
// import isAnimated from 'animated-gif-detector'
// import '../../../utils/animated-gif-detect'
// blob
// import { prepareForStyleComputing } from '../../utils/prepare-to-compute';

export default class GifPlayer {
  constructor(gif) {
    this.gif = gif;
    this.playing = false;
    this.gif.classList.add('lowweb--hidden');

    if (!this.gif.complete) {
      this.gif.onload = () => {
        this.build();
      };
    } else {
      this.build();
    }
  }
  build() {
    if (this.isAnimated() && !this.isSmall()) {
      this.canvas = document.createElement('canvas');
      this.canvas.classList.add('lowweb__gif-player--preview');
      this.context = this.canvas.getContext('2d');
      this.gif.classList.remove('lowweb--hidden');
      if (this.gif.width) {
        this.canvas.width = this.gif.width;
        this.canvas.height = this.gif.height;
      }
      let container = document.createElement('div');
      container.classList.add('lowweb__gif-player');

      if (this.isSmall()) {
        container.classList.add('lowweb__gif-player--small');
      }

      // prepareForStyleComputing(container, this.gif);

      container.innerHTML =
        '<svg class="lowweb__gif-player__play" width="20" height="20" enable-background="new 0 0 20 20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 20 10-20 10" fill="#fff"/></svg>';

      this.gif.parentNode.insertBefore(container, this.gif);
      container.appendChild(this.canvas);
      container.appendChild(this.gif);
      // gif.parentNode.insertBefore(this.canvas, gif.nextSibling);
      this.gif.classList.add('lowweb__gif-player--anim');
      this.container = container;
      // console.log(container);
      container.addEventListener('mouseenter', () => this.play());
      container.addEventListener('mouseleave', () => this.stop());
      this.draw();
    }
  }
  // toggle() {
  //   if (this.playing) this.stop()
  //   else this.play()
  // }
  play() {
    if (!this.playing) {
      this.playing = true;
      this.container.classList.add('lowweb__gif-player--playing');
    }
  }
  stop() {
    if (this.playing) {
      this.playing = false;
      this.container.classList.remove('lowweb__gif-player--playing');
    }
  }
  draw() {
    this.context.drawImage(this.gif, 0, 0, this.canvas.width, this.canvas.height);
  }
  isAnimated() {
    // TODO detect animated gif
    // need blob
    // window.animatedGifDetect.process(this.gif, () => {
    //   console.log('is animated')
    // }, () => {
    //   console.log('is not animated')
    // })
    return true;
  }
  isSmall() {
    // arbitrary rule, gif player is displayed when width and height are greater than 50 px
    if (this.gif.width < 50 || this.gif.height < 50) {
      return true;
    } else if (this.gif.naturalWidth && (this.gif.naturalWidth < 50 || this.gif.naturalHeight < 50)) {
      return true;
    } else {
      return false;
    }
  }
}
