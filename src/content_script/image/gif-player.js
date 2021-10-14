import { localOption } from '../../utils/get-local-options'
import { EXCLUDE_HOST_GIF } from '../../datas/constants'
import './gif.scss'

export default function () {
  console.log('gifplayer')
  localOption().then((options) => {
    // eslint-disable-next-line camelcase
    const { gif_player, level, block_images } = options
    if (parseInt(gif_player[level]) === 1 && parseInt(block_images[level]) === 0) {
      if (EXCLUDE_HOST_GIF.indexOf(window.location.hostname) === -1) {
        const gifEls = document.querySelectorAll('img[src*=".gif"], img[src*=".giphy.com/media"], iframe[src*="giphy.com/embed"]')
        if (gifEls.length > 0) {
          const script = document.createElement('script')
          script.type = 'text/javascript'
          script.src = browser.runtime.getURL('players/Gif.js');
          (document.head || document.documentElement).appendChild(script)
        }
      }
    }
  })
}
