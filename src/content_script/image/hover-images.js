import { localOption, getLevel } from '../../utils/get-local-options';

export default function () {
  localOption().then((options) => {
    // eslint-disable-next-line camelcase
    const { block_images } = options;
    // console.log('parseInt(block_images[level])parseInt(block_images[level])', parseInt(block_images[getLevel()]));
    if (parseInt(block_images[getLevel()]) === 1) {
      // listenPointerOver();
      listenPointerMove();
      styleBrokenImages();
    }
  });
}

let timeoutMove;
function listenPointerMove() {
  // listen mouse movement to detect hover on images
  document.addEventListener('pointermove', onMove, { passive: true });
}
function onMove(e) {
  if (timeoutMove) {
    clearTimeout(timeoutMove);
    timeoutMove = null;
  }
  // console.log('move');
  // call function after a delay to avoid too many calls
  timeoutMove = setTimeout(() => {
    doMove(e.clientX, e.clientY);
  }, 100);
}
function doMove(x, y) {
  // find img from elements under mouse point
  const els = document.elementsFromPoint(x, y);
  const img = els.find((el) => el.tagName === 'IMG');
  console.log(img);
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
    image.style.boxSizing = '';
    image.classList.add('lowHover');
    image.src = currentSrc;
  }, 50);
}

// broken images have no height
// add a padding-bottom for images with width/height attributes
function styleBrokenImages() {
  console.log('styleBrokenImages');
  const imgs = document.querySelectorAll('img');
  imgs.forEach((img) => {
    const w = img.getAttribute('width');
    const h = img.getAttribute('height');
    img.style.backgroundColor = '#999';
    if (w && h) {
      const ratio = parseInt(h) / parseInt(w);
      const padd = (ratio * 100).toFixed(2) + '%';
      img.style.paddingBottom = padd;
      img.style.boxSizing = 'border-box';
    }
  });
}
