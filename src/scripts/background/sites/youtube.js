export default function() {
  // smaller youtube preview
  browser.webRequest.onBeforeRequest.addListener(
    details => {
      const { url } = details;
      let newUrl = url;

      // block animated preview
      if (url.indexOf('mqdefault_6s_480x270.webp') !== -1) {
        return {
          cancel: true,
        };
      } else {
        // redirect to smaller image static preview
        if (newUrl.indexOf('maxresdefault.jpg') !== -1) {
          newUrl = newUrl.replace('maxresdefault.jpg', 'default.jpg');
        } else if (newUrl.indexOf('hq720.jpg') !== -1) {
          newUrl = newUrl.replace('hq720.jpg', 'default.jpg');
        } else if (newUrl.indexOf('sddefault.jpg') !== -1) {
          newUrl = newUrl.replace('sddefault.jpg', 'default.jpg');
        } else if (newUrl.indexOf('mqdefault.jpg') !== -1) {
          newUrl = newUrl.replace('mqdefault.jpg', 'default.jpg');
        } else if (newUrl.indexOf('hqdefault.jpg') !== -1) {
          newUrl = newUrl.replace('hqdefault.jpg', 'default.jpg');
        }
        if (url !== newUrl) {
          return {
            redirectUrl: newUrl,
          };
        } else {
          return {};
        }
      }
    },
    {
      urls: ['*://*.ytimg.com/*'],
    },
    ['blocking']
  );

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
    return {cancel: true};
  };
  browser.webRequest.onBeforeRequest.addListener(
    blockAllImages,
    {urls: ['*://*.youtube.com/*', '*://*.ytimg.com/*', '*://*.googleusercontent.com/*', '*://*.ggpht.com/*'], types: ["image"]},
    ["blocking"]
  );


  // hide part of youtube
  // TODO add listener only on youtube.com
  // TODO add css before onUpdated
  browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // console.log('onUpdated', changeInfo.status);
    if (changeInfo.status === 'loading') {
      // console.log(tab.url);
      if (tab.url.indexOf('youtube.com') !== -1) {
        let code = `
          #comments, #items, ytd-browse{
            display:none!important;
          }
          `;
        browser.tabs.insertCSS(tabId, {
          code: code,
          runAt: 'document_start'
        });
      }
    }
  });
}
