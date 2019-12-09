
export default class GifPlayer {
  constructor(image) {
    this.image = image;

    this.originalSrc = this.image.src;
    this.doPlay = false;

    if (!this.image.complete) {
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
    if (this.isAnimated() && !this.isSmall()) {
      this.doPlay = true;
    }

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    if (this.image.width) {
      this.canvas.width = this.image.width;
      this.canvas.height = this.image.height;
    } else if (this.image.naturalWidth && this.image.naturalWidth !== 0) {
      this.canvas.width = this.image.naturalWidth;
      this.canvas.height = this.image.naturalHeight;
    }

    this.render();

    if (this.doPlay){
      this.image.addEventListener('mouseenter', () => this.play());
      this.image.addEventListener('mouseleave', () => this.stop());
    }
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
  play() {
    this.image.src = this.originalSrc;
  }
  stop() {
    this.image.src = this.blobUrl;
  }
  draw() {
    this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    if (this.doPlay) {
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

      this.context.fillStyle = "#FFF";
      this.context.fill(); 
    }
  }
  isAnimated() {
    // TODO detect animated gif
    // need blob
    // window.animatedGifDetect.process(this.image, () => {
    //   console.log('is animated')
    // }, () => {
    //   console.log('is not animated')
    // })
    return true;
  }
  isSmall() {
    // arbitrary rule, gif player is displayed when width and height are greater than 50 px
    if (this.image.width < 50 || this.image.height < 50) {
      return true;
    } else if (this.image.naturalWidth && (this.image.naturalWidth < 50 || this.image.naturalHeight < 50)) {
      return true;
    } else {
      return false;
    }
  }
}
