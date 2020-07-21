import store from '../../store';
import RequestManager from '../RequestManager';

export default function () {
  if (store.getters.website_specific > 0) {
    // smaller GCP images
    browser.webRequest.onBeforeRequest.addListener(
      (requestDetails) => {
        const { url } = requestDetails;
        let newUrl = url;

        /*
        TODO regex
        https://lh3.googleusercontent.com/93uhV8K2yHkRuD63KJxlTi7SxjHS8my2emuHmGLZxEmX99_XAjTN3c_2zmKVb3XQ5d8FEkwtgbGjyYpaDQg=s256-c
        */

        if (newUrl.indexOf('-c-fcrop') !== -1) {
          const splitUrl = newUrl.split('-c-fcrop');
          const splitSize = splitUrl[0].split('=s');
          if (splitSize.length === 2) {
            if (parseInt(splitSize[1]) > 256) {
              newUrl = splitSize[0] + '=s256-c-fcrop' + splitUrl[1];
            }
          }
        }

        const response = {};
        if (url !== newUrl) {
          response.redirectUrl = newUrl;
        }
        return response;
      },
      {
        urls: ['*://*.googleusercontent.com/*'],
        types: ['image'],
      },
      ['blocking']
    );
  }

  // website_specific > 1 means settings 'Specific optimisation for most used websites' is set to 'Reduce data and Display'
  if (store.getters.website_specific > 1) {
    // block video bytes from video on channel page
    browser.webRequest.onBeforeRequest.addListener(
      (requestDetails) => {
        let cancel = false;
        const response = {};
        const tab = RequestManager.getTab(requestDetails.tabId);

        if (tab) {
          const pageUrl = tab.pageUrl;

          if (pageUrl) {
            if (pageUrl.indexOf('youtube.com/channel/') !== -1) {
              cancel = true;
            }
          }
        }

        if (cancel) {
          response.cancel = true;
        }
        return response;
      },
      {
        urls: ['*://*.googlevideo.com/*'],
        types: ['xmlhttprequest'],
      },
      ['blocking']
    );

    // block images on homepage & video page
    const blockAllImages = function (requestDetails) {
      let cancel = false;
      const response = {};
      const tab = RequestManager.getTab(requestDetails.tabId);

      if (tab) {
        const pageUrl = tab.pageUrl;
        if (pageUrl === 'https://www.youtube.com/' || pageUrl === 'https://youtube.com/') {
          cancel = true;
        }
      }

      if (cancel) {
        response.cancel = true;
      }
      return response;
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
}
