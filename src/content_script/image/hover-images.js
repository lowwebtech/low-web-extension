import { localOption } from '../../utils/get-local-options';

export default function () {
  localOption().then((options) => {
    // eslint-disable-next-line camelcase
    const { level, block_images } = options;
    if (parseInt(block_images[level]) === 1) {
      // listenPointerOver();
      listenPointerMove();
      styleBrokenImages();
    }
  });
}

let timeoutMove;
function listenPointerMove() {
  // listen mouse movement to detect hover on images
  document.addEventListener('pointerover', onMove, { passive: true });
}
function onMove(e) {
  if (timeoutMove) {
    clearTimeout(timeoutMove);
    timeoutMove = null;
  }
  // call function after a delay to avoid to many calls
  timeoutMove = setTimeout(() => {
    doMove(e.clientX, e.clientY);
  }, 200);
}
function doMove(x, y) {
  // find img from elements under mouse point
  const els = document.elementsFromPoint(x, y);
  const img = els.find((el) => el.tagName === 'IMG');
  if (img) {
    whitelistHoverImage(img);
  }
}

// function listenPointerOver() {
//   const overHandler = (e) => {
//     if (e.target.tagName === 'IMG' && !e.target.dataset.whitelistSrc) {
//       whitelistHoverImage(e.target);
//     }
//   };
//   document.addEventListener('pointerover', overHandler);
// }

function whitelistHoverImage(image) {
  // TODO clean srcset
  const src = image.currentSrc;

  browser.runtime
    .sendMessage({
      message: 'whitelistHoverImage',
      options: {
        src,
      },
    })
    .then(
      (whitelisted) => {
        if (whitelisted) loadImage(image);
      },
      (e) => {
        console.warn('error message whitelistHoverImage', e);
      }
    );
}

function loadImage(image) {
  const currentSrc = image.currentSrc;
  image.src = '';

  setTimeout(() => {
    image.style.paddingBottom = '';
    image.style.backgroundColor = '';
    image.classList.add('lowHover');
    image.src = currentSrc;
  }, 50);
}

// broken images have no height
// add a padding-bottom for images with width/height attributes
function styleBrokenImages() {
  const imgs = document.querySelectorAll('img');
  imgs.forEach((img) => {
    const w = img.getAttribute('width');
    const h = img.getAttribute('height');
    if (w && h) {
      const ratio = parseInt(h) / parseInt(w);
      const padd = (ratio * 100).toFixed(2) + '%';
      img.style.paddingBottom = padd;
      img.style.backgroundColor = '#999';
    }
  });
}
