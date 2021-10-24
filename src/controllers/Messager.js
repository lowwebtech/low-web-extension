import { onMessageOEmbed } from '../background_script/message/oembed'
import { onMessageIsActive } from '../background_script/message/is-active'
import { onWhitelistHoverImage } from '../background_script/message/whitelist-image'

/**
 * Messager class is used to communicate between background and content scripts
 */
class Messager {
  constructor () {
    this.handlers = [onMessageOEmbed, onMessageIsActive, onWhitelistHoverImage]
  }

  init () {
    const handleIsMessage = (request, sender, sendResponse) => {
      if (request.message !== undefined) {
        console.log('MESSAGE', request.message)
        let response
        for (let i = 0, lg = this.handlers.length; i < lg; i++) {
          response = this.handlers[i](request, sender, sendResponse)
          if (response) break
        }

        if (response) {
          // TODO return promise not sendResponse
          /**
           * Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage) Error
           */
          console.log('RESPONSE', response)
          sendResponse(response)
        }
      }
    }
    browser.runtime.onMessage.addListener(handleIsMessage)
  }
}

const messager = new Messager()
export default messager
