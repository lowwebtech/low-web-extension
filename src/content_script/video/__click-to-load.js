import { localOption } from '../../utils/get-local-options'
import videoToBlock from '../../datas/video-to-block'
import IframeToLoad from './iframe-to-load'

let style
const selectorString = getIframeSelector()

/**
 * Block video iframes, display a fallback (if possible) and click to load
 */
export default function () {
  localOption('video_clicktoload').then((value) => {
    if (value === 1) {
      const iframes = document.querySelectorAll(selectorString)
      if (iframes.length > 0) {
        loadStyles()
      }

      // wait for message 'embedVideoBlocked' from background_script
      const onEmbedVideoBlocked = (request, sender, sendResponse) => {
        if (request.message === 'embedVideoBlocked') {
          if (style) {
            customizeIframes()
          } else {
            loadStyles()
          }
        }
        return Promise.resolve({ message: 'embedVideoBlockedDone', result: 'ok' })
      }
      if (!browser.runtime.onMessage.hasListener(onEmbedVideoBlocked)) {
        browser.runtime.onMessage.addListener(onEmbedVideoBlocked)
      }
    }
  })
}

function loadStyles () {
  // TODO split css by embed type
  fetch(browser.runtime.getURL('oembed/oembed.css'), { cache: 'force-cache' })
    .then(function (response) {
      if (!response || response.status !== 200) {
        return true
      }
      return response.text()
    })
    .then((css) => {
      style = css
      customizeIframes()
    })
}

function customizeIframes () {
  const iframes = document.querySelectorAll(selectorString)
  const customIframes = []
  iframes.forEach((iframe) => {
    const customIframe = new IframeToLoad(iframe, style)
    customIframes.push(customIframe)
  })
}

function getIframeSelector () {
  const selectors = []
  Object.keys(videoToBlock).map((key) => {
    selectors.push('iframe[src*="' + videoToBlock[key].embed_url + '"]')
  })
  return selectors.join(',')
}
