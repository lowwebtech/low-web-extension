import parse from 'content-security-policy-parser';

export default () => {
  console.log('add onHeadersReceived');
  browser.webRequest.onHeadersReceived.addListener(
    function(details) {
      console.log('onHeadersReceived', details);
      for (let i = 0; i < details.responseHeaders.length; i++) {
        if (isCSPHeader(details.responseHeaders[i].name.toUpperCase())) {
          var csp = details.responseHeaders[i].value;
          var cspA = parse(csp);
          console.log(details.type, details.url);
          console.log(cspA);

          // img
          csp = csp.replace('img-src', 'img-src i.ytimg.com i.vimeocdn.com *.dmcdn.net');

          // script injected like Gif.js
          // -> github.com
          csp = csp.replace('script-src', "script-src 'unsafe-eval'");

          // iframe
          csp = csp.replace('default-src', 'default-src data:');
          // csp = csp.replace('frame-src', 'frame-src data:');
          // csp = csp.replace('default-src', 'frame-src www.youtube.com data:, default-src');

          details.responseHeaders[i].value = csp;
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
