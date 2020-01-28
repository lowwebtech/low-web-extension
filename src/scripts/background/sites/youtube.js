export default function() {
  // smaller GCP images
  browser.webRequest.onBeforeRequest.addListener(
    details => {
      // console.log('smallImages', details)
      const { url } = details;
      let newUrl = url;

      /*
      TODO regex
      https://lh3.googleusercontent.com/93uhV8K2yHkRuD63KJxlTi7SxjHS8my2emuHmGLZxEmX99_XAjTN3c_2zmKVb3XQ5d8FEkwtgbGjyYpaDQg=s256-c
      */

      if (newUrl.indexOf('-c-fcrop') !== -1) {
        let splitUrl = newUrl.split('-c-fcrop');
        let splitSize = splitUrl[0].split('=s');
        // console.log(splitUrl)
        // console.log(splitSize.length);
        if (splitSize.length === 2) {
          // console.log(parseInt(splitSize[1]));
          if (parseInt(splitSize[1]) > 320) {
            newUrl = splitSize[0] + '=s320-c-fcrop' + splitUrl[1];
            // console.log(url);
            // console.log(newUrl);
          }
        }
      }

      if (url !== newUrl) {
        return {
          redirectUrl: newUrl,
        };
      } else {
        return {};
      }
    },
    {
      urls: ['*://*.googleusercontent.com/*'],
    },
    ['blocking']
  );

  // block all images
  const blockAllImages = function(requestDetails) {
    // console.log("Canceling: " + requestDetails.url);
    return {
      cancel: true,
    };
  };
  browser.webRequest.onBeforeRequest.addListener(
    blockAllImages,
    {
      urls: ['*://*.youtube.com/*', '*://*.ytimg.com/*', '*://*.googleusercontent.com/*', '*://*.ggpht.com/*'],
      types: ['image'],
    },
    ['blocking']
  );
}
