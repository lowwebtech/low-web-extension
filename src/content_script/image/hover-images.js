import { localOption } from '../../utils/get-local-options'
import HoverElement from './hover-element'

let canvas
const elements = []
// TODO refacto img/picture/figure
export default function (tabFocused) {
  // TODO data-uri and styling images doesn't seem to work when tab is not focused
  // TODO add message listner from background when tab focus
  // if (tabFocused) {
  hoverImages()
  // } else {
  //   browser.runtime.onMessage.addListener((message) => {
  //     console.log('----message', message);
  //   });
  // }
}

function hoverImages () {
  localOption('block_images').then((value) => {
    if (parseInt(value) === 1) {
      // listenPointerOver();
      canvas = document.createElement('canvas')
      canvas.width = 48
      canvas.height = 27

      createElements()
      listenNewImages()
      listenPointerMove()
    }
  })
}

function createElements () {
  const imgs = document.querySelectorAll('img')
  imgs.forEach((img) => {
    createElement(img)
  })
}

function createElement (img) {
  if (img.dataset.lowStyled !== 'true') {
    elements.push(new HoverElement(img, canvas))
  }
}

let timeoutMove
function listenPointerMove () {
  // listen mouse movement to detect hover on images
  document.addEventListener('pointermove', onMove, { passive: true })
}
function onMove (e) {
  if (timeoutMove) {
    clearTimeout(timeoutMove)
    timeoutMove = null
  }

  // TODO throttle instead of debounce
  // call function after a delay to avoid too many calls
  timeoutMove = setTimeout(() => {
    doMove(e.clientX, e.clientY)
  }, 100)
}
function doMove (x, y) {
  // find img from elements under mouse point
  const els = document.elementsFromPoint(x, y)
  const img = els.find((el) => el.tagName === 'IMG')
  if (img) {
    whitelistHoverImage(img)
  }
}

function whitelistHoverImage (image) {
  if (image.dataset.whitelisted !== 'true') {
    const element = elements.find((el) => el.hash === parseInt(image.dataset.lowHash))
    if (element) {
      element.whitelist()
    }
  }
}

function listenNewImages () {
  const targetNode = document.querySelector('body')
  const config = { attributes: true, childList: true, subtree: true }

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.addedNodes.length > 0 && mutation.addedNodes[0].tagName === 'IMG') {
        console.log('New Image added in DOM!', mutation.addedNodes[0])
        createElement(mutation.addedNodes[0])
      }
    }
  }

  const observer = new MutationObserver(callback)
  observer.observe(targetNode, config)
}
