/**
 * Message / communication between content_script and background_script
 * used to get content from oEmbed APIs
 * (cf: oembed-to-load.js, social.js)
 */
export function onMessageOEmbed (request, sender, sendResponse) {
  if (request.message === 'oembed') {
    // TODO cache oembed call
    return fetch(request.options.oembedUrl, { cache: 'force-cache' })
      .then((response) => {
        if (!response || response.status !== 200) {
          return true
        }
        const logDone = (data) => {
          return {
            data: data,
            tabId: sender.tab.id
          }
        }
        const logFail = (error) => {
          console.warn('oembed error', error)
        }
        return response.json().then(logDone, logFail)
      })
      .catch(function (error) {
        console.warn('oembed error', error)
      })
  }
}
