// import store from '../store';
import urls_to_block from './social-to-block'

export function blockSocial(){
  browser.webRequest.onBeforeRequest.addListener(
    function(details) {

      let cancel = false
      for( let i = 0, lg = urls_to_block.length; i<lg; i++ ){
        if( details.url.indexOf(urls_to_block[i]) != -1 ){
          // TODO check not main website
          cancel = true
        }
      }

      return {
        cancel: cancel
      };
    },
    {
      urls: ["<all_urls>"]
    },
    ["blocking"]
  );
}