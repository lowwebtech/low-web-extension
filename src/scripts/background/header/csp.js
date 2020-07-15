// const stringifyObject = require('stringify-object');
// import parse from 'content-security-policy-parser';

export default () => {
  browser.webRequest.onHeadersReceived.addListener(
    function (details) {
      for (let i = 0; i < details.responseHeaders.length; i++) {
        if (isCSPHeader(details.responseHeaders[i].name.toUpperCase())) {
          // let csp = details.responseHeaders[i].value;
          const cspArray = parse(details.responseHeaders[i].value);

          // img
          if (cspArray['img-src'] !== undefined) {
            cspArray['img-src'].push('https://i.ytimg.com', 'https://i.vimeocdn.com', 'https://*.dmcdn.net', 'https://*.giphy.com');
            // csp = csp.replace('img-src', 'img-src i.ytimg.com i.vimeocdn.com *.dmcdn.net');
          } else if (cspArray['default-src']) {
            // TODO merge default-src replace
            cspArray['default-src'].push('https://i.ytimg.com', 'https://i.vimeocdn.com', 'https://*.dmcdn.net', 'https://*.giphy.com');
            // csp = csp.replace('default-src', 'default-src i.ytimg.com i.vimeocdn.com *.dmcdn.net');
          }

          // script injected like Gif.js
          // -> github.com
          if (cspArray['script-src'] !== undefined) {
            cspArray['script-src'].push("'unsafe-eval'");
            // csp = csp.replace('script-src', "script-src 'unsafe-eval'");
          } else if (cspArray['default-src']) {
            if (cspArray['default-src'].indexOf('unsafe-eval') === -1) {
              cspArray['default-src'].push("'unsafe-eval'");
            }
            // csp = csp.replace('default-src', "default-src 'unsafe-eval'");
          }

          // iframe
          if (cspArray['frame-src'] !== undefined) {
            cspArray['frame-src'].push('data:');
            // csp = csp.replace('frame-src', 'frame-src data:');
          } else if (cspArray['default-src']) {
            if (cspArray['default-src'].indexOf('data:') === -1) {
              cspArray['default-src'].push('data:');
            }
            // csp = csp.replace('default-src', 'default-src data:');
          }

          details.responseHeaders[i].value = stringify(cspArray);
        }
      }
      return {
        // Return the new HTTP header
        responseHeaders: details.responseHeaders,
      };
    },
    {
      urls: ['<all_urls>'],
      types: ['main_frame', 'script', 'xmlhttprequest'],
    },
    ['blocking', 'responseHeaders']
  );
};

function isCSPHeader(headerName) {
  return headerName === 'CONTENT-SECURITY-POLICY' || headerName === 'X-WEBKIT-CSP';
}

function parse(policy) {
  return policy.split(';').reduce((result, directive) => {
    const [directiveKey, ...directiveValue] = directive.trim().split(/\s+/g);
    if (!directiveKey || Object.prototype.hasOwnProperty.call(result, directiveKey)) {
      return result;
    } else {
      return Object.assign(Object.assign({}, result), { [directiveKey]: directiveValue });
    }
  }, {});
}
function stringify(policy) {
  // policy.map()
  let str = '';
  Object.keys(policy).map(function (key, index) {
    str += key + ' ' + policy[key].join(' ') + '; ';
  });
  return str.slice(0, -1);
  // return policy.reduce((result, directive) => {
  //   console.log(result, directive);
  //   // const [directiveKey, ...directiveValue] = directive.trim().split(/\s+/g);
  //   // if (!directiveKey || Object.prototype.hasOwnProperty.call(result, directiveKey)) {
  //   //   return result;
  //   // } else {
  //   //   return Object.assign(Object.assign({}, result), { [directiveKey]: directiveValue });
  //   // }
  // }, {});
}
