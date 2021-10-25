// TODO load on demand
import imageSrcset from './image/srcset.js'
import lazyload from './lazyload.js'
import marquee from './marquee.js'
import gifPlayer from './image/gif-player.js'
import hoverImages from './image/hover-images.js'
import customSocial from './iframe/social.js'
import mediaAttribute from './media/attributes.js'
import oEmbedToLoad from './iframe/oembed-to-load.js'
import customPlayers from './video/custom-players.js'

// import '../styles/social.scss';

let domContentLoaded = false
let loaded = false
let contentScripted = false
let tabFocused = false

// used to store url on the page and to know if website is active
/**
 * send winwdow.location to background script
 * and return if website is active (eg: not temporarily disabled)
 */
function start () {
  // no need to check here id website is activated
  // doContentScript();

  // send a message to background and verify tab/website is activate
  browser.runtime
    .sendMessage({
      message: 'isTabActive',
      options: {
        href: window.location.href,
        hostname: window.location.hostname
      }
    })
    .then(
      ({ active, currentTabUrl }) => {
        if (active) {
          if (currentTabUrl === document.location.href) {
            tabFocused = true
            doContentScript()
          }
        }
      },
      (e) => {
        console.warn('error message isTabActive', e)
      }
    )
}

function doContentScript () {
  contentScripted = true

  if (domContentLoaded) onDomLoaded()
  if (loaded) onLoaded()
}

function onDomLoaded () {
  // clean srcset and remove biggest images
  imageSrcset()
  lazyload()

  // custom video attribute
  mediaAttribute()
}
function onLoaded () {
  requestAnimationFrame(() => {
    // disable marquee animation
    marquee()

    // custom gif/play when over them
    gifPlayer()

    // hover to display image
    hoverImages(tabFocused)

    // custom video embed iframes
    oEmbedToLoad()

    // custom social embeds
    customSocial()

    // custom video player low quality
    // TODO import only for videos-to-block
    customPlayers()
  })
}

document.addEventListener('DOMContentLoaded', () => {
  domContentLoaded = true
  if (contentScripted) onDomLoaded()
})

window.addEventListener('load', () => {
  loaded = true
  if (contentScripted) onLoaded()
})

start()
