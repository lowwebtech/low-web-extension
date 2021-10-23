import { HTTP_URLS } from '../../datas/constants'

/**
 * Some CSPs (Content Security Policy) can prevent the extension from working properly,
 * for example prohibiting inserting an image or modifying an iframe
 */
export default () => {
  browser.webRequest.onHeadersReceived.addListener(
    function (details) {
      for (let i = 0; i < details.responseHeaders.length; i++) {
        if (isCSPHeader(details.responseHeaders[i].name.toUpperCase())) {
          // let csp = details.responseHeaders[i].value;
          const cspArray = parse(details.responseHeaders[i].value)

          // Allows the insertion of images
          // used to insert images for Video Player (Youtube, Vimeo, Dailymotion) or Gif Player (Giphy)
          if (cspArray['img-src'] !== undefined) {
            cspArray['img-src'].push('https://i.ytimg.com', 'https://i.vimeocdn.com', 'https://*.dmcdn.net', 'https://*.giphy.com')
          } else if (cspArray['default-src']) {
            cspArray['default-src'].push('https://i.ytimg.com', 'https://i.vimeocdn.com', 'https://*.dmcdn.net', 'https://*.giphy.com')
          }

          // Allows the insertion of javascript code
          // used to customize Gif player (Gif.js)
          if (cspArray['script-src'] !== undefined) {
            cspArray['script-src'].push("'unsafe-eval'")
          } else if (cspArray['default-src']) {
            if (cspArray['default-src'].indexOf('unsafe-eval') === -1) {
              cspArray['default-src'].push("'unsafe-eval'")
            }
          }

          // Allows the use of iframe with Data-URI format (data:)
          // used to customize video iframes, youtube, vimeo...
          if (cspArray['frame-src'] !== undefined) {
            cspArray['frame-src'].push('data:')
          } else if (cspArray['default-src']) {
            if (cspArray['default-src'].indexOf('data:') === -1) {
              cspArray['default-src'].push('data:')
            }
          }

          details.responseHeaders[i].value = stringify(cspArray)
        }
      }
      return {
        // Return the new HTTP header
        responseHeaders: details.responseHeaders
      }
    },
    {
      urls: [HTTP_URLS],
      types: ['main_frame', 'script', 'xmlhttprequest']
    },
    ['blocking', 'responseHeaders']
  )
}

function isCSPHeader (headerName) {
  return headerName === 'CONTENT-SECURITY-POLICY' || headerName === 'X-WEBKIT-CSP'
}

function parse (policy) {
  return policy.split(';').reduce((result, directive) => {
    const [directiveKey, ...directiveValue] = directive.trim().split(/\s+/g)
    if (!directiveKey || Object.prototype.hasOwnProperty.call(result, directiveKey)) {
      return result
    } else {
      return Object.assign(Object.assign({}, result), { [directiveKey]: directiveValue })
    }
  }, {})
}
function stringify (policy) {
  const str = Object.keys(policy).map(function (key, index) {
    return key + ' ' + policy[key].join(' ')
  })
  return str.join('; ')
}
