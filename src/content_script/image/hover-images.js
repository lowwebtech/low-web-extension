import { localOption, getLevel } from '../../utils/get-local-options';
import { dataImage } from '../../utils/data-uri.js';
import { cookies } from 'webextension-polyfill';

export default function () {
  localOption().then((options) => {
    // eslint-disable-next-line camelcase
    const { block_images } = options;
    // console.log('parseInt(block_images[level])parseInt(block_images[level])', parseInt(block_images[getLevel()]));
    if (parseInt(block_images[getLevel()]) === 1) {
      // listenPointerOver();
      listenPointerMove();
      styleBrokenImages();
      listenNewImages();
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
  const picture = els.find((el) => el.tagName === 'PICTURE');
  const img = els.find((el) => el.tagName === 'IMG');
  if (picture) {
    whitelistHoverImage(picture.querySelector('img'));
  } else if (img) {
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
  if (image.dataset.whitelisted !== 'true') {
    // TODO clean srcset
    let src;
    if (image.currentSrc !== '') src = image.currentSrc;
    else if (image.dataset.src !== '') src = image.dataset.src;
    else src = image.src;

    console.log('currentSrc', image.currentSrc);
    console.log('dataset.src', image.dataset.src);
    console.log('src', image.src);

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
}

function loadImage(image) {
  image.dataset.whitelisted = 'true';

  const currentSrc = image.currentSrc;
  image.src = '';
  if (image.dataset.alt) image.alt = image.dataset.alt;

  image.style.paddingBottom = '';
  if (image.parentNode && image.parentNode.tagName === 'PICTURE') {
    image.parentNode.classList.remove('lowNotLoaded');
  } else {
    image.classList.remove('lowNotLoaded');
  }

  requestAnimationFrame(() => {
    image.src = currentSrc;
  });
}

// broken images have no height
// add a padding-bottom for images with width/height attributes
function styleBrokenImages() {
  const imgs = document.querySelectorAll('img');
  imgs.forEach((img) => {
    styleImage(img);
  });
}

function listenNewImages() {
  const targetNode = document.querySelector('body');
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.addedNodes.length > 0 && mutation.addedNodes[0].tagName === 'IMG') {
        console.log('New Image added in DOM!', mutation.addedNodes[0]);
        styleImage(mutation.addedNodes[0]);
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

function styleImage(img) {
  if (img.dataset.styled !== 'true') {
    img.dataset.styled = 'true';

    const w = img.getAttribute('width');
    const h = img.getAttribute('height');

    // empty alt to hide broken image icon
    img.dataset.alt = img.alt;
    img.alt = '';

    let ratio;
    if (w && h) {
      ratio = parseInt(h) / parseInt(w);
    } else {
      ratio = 0.5;
    }

    const padd = (ratio * 100).toFixed(2) + '%';

    // if naturalWidth === image already loaded
    const noNaturalSize = img.naturalWidth === 0 && img.naturalHeight === 0;
    const isPicture = img.parentNode && img.parentNode.tagName === 'PICTURE';
    console.log(noNaturalSize, img.height, isPicture);
    if (noNaturalSize) {
      if (img.style.paddingBottom === '') {
        img.style.paddingBottom = padd;
      }
      if (!isPicture) {
        img.classList.add('lowNotLoaded');
      } else {
        img.parentNode.classList.add('lowNotLoaded');
      }
    }
  }
}
