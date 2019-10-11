import isWebpage from '../utils/is-webpage'

// TODO find solution for events transitionend / animationend
export function cssAnimation(){

  console.log('disable css transition & animation')

  chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab){
      if( changeInfo.status == 'loading' ){        
        if( isWebpage( tab.url ) ){
          chrome.tabs.insertCSS(tabId, {
            code: `*, *:before, *:after {
              -o-transition: none !important;
              -moz-transition: none !important;
              -ms-transition: none !important;
              -webkit-transition: none !important;
              transition: none !important;

              -webkit-animation: none !important;
              -moz-animation: none !important;
              -o-animation: none !important;
              -ms-animation: none !important;
              animation: none !important;
            }`
          }); 
        }
      }
    }
  );
}