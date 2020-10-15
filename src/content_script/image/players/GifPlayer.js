import DOMPurify from 'dompurify';

export default class GifPlayer {
  constructor(el) {
    this.el = el;
    this.image = el;

    // needed for modifying origin of image, will be a canvas blob:
    this.image.crossOrigin = 'Anonymous';

    this.originalSrc = this.el.src;
    // this.doPlay = true;
    this.type = 'img';
  }

  start() {
    if (!this.el.complete) {
      this.buildHandler = () => {
        this.build();
      };
      this.image.addEventListener('load', this.buildHandler);
    } else {
      this.build();
    }
  }

  build() {
    if (this.buildHandler) {
      this.image.removeEventListener('load', this.buildHandler);
    }
    if (!this.isAnimated() || this.isSmall()) {
      return;
    }

    this.canvas = document.createElement('canvas');
    this.canvas.crossOrigin = 'Anonymous';
    this.context = this.canvas.getContext('2d');

    if (this.el.width) {
      this.canvas.width = this.el.width;
      this.canvas.height = this.el.height;
    } else if (this.image.naturalWidth && this.image.naturalWidth !== 0) {
      this.canvas.width = this.image.naturalWidth;
      this.canvas.height = this.image.naturalHeight;
    }

    this.render();

    // if (this.doPlay) {
    this.el.addEventListener('mouseenter', () => this.play());
    this.el.addEventListener('mouseleave', () => this.stop());
    // }
  }

  render() {
    this.draw();
    // TODO avoid try catch
    try {
      this.canvas.toBlob((blob) => {
        this.blobUrl = URL.createObjectURL(blob);
        // TODO check memory
        // this.el.onload = function() {
        //   // no longer need to read the blob so it's revoked
        //   URL.revokeObjectURL(url);
        // };
        this.el.src = this.blobUrl;
      });
    } catch (e) {
      console.warn('low—web gif crossorigin issue : ' + this.image.src);
    }
  }

  play() {
    if (!this.playing) {
      const imgSrc = DOMPurify.sanitize(this.originalSrc);
      // TODO hide play button
      this.playing = true;
      if (this.type === 'img') {
        this.el.src = imgSrc;
      } else if (this.type === 'iframe') {
        const imgStr = '<style type="text/css">body{margin:0;padding:0} img{width:100%;height:"auto";}</style><img src="' + imgSrc + '" />';
        this.el.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(imgStr);
      }
    }
  }

  stop() {
    if (this.playing) {
      this.playing = false;
      this.el.src = this.blobUrl;
    }
  }

  draw() {
    this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    // if (this.doPlay) {
    const scale = Math.max(300, Math.min(600, this.canvas.width)) / 300;
    const width = scale * 20;

    this.context.beginPath();
    this.context.moveTo(10, 10);
    this.context.lineTo(10 + width, 10 + width / 2);
    this.context.lineTo(10, 10 + width);
    this.context.closePath();

    this.context.lineWidth = 8;
    this.context.strokeStyle = '#000';
    this.context.stroke();

    this.context.fillStyle = '#FFF';
    this.context.fill();
    // }
  }

  isAnimated() {
    // TODO detect animated gif
    // need blob
    // window.animatedGifDetect.process(this.el, () => {
    //   console.log('is animated')
    // }, () => {
    //   console.log('is not animated')
    // })
    return true;
  }

  isSmall() {
    // arbitrary rule, gif player is displayed when width and height are greater than 50 px
    if (this.el.width < 50 || this.el.height < 50) {
      return true;
    } else if (this.el.naturalWidth && (this.el.naturalWidth < 50 || this.el.naturalHeight < 50)) {
      return true;
    } else {
      return false;
    }
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
