export function cssAnimation(){

  console.log('disable css transition & animation')

  chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab){
      if( changeInfo.status == 'loading' ){
        var re = new RegExp("^(http|https)://", "i");
        var match = re.test(tab.url);
        
        if( match ){
          chrome.tabs.insertCSS(tabId, {
            code: `* {
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
        // chrome.tabs.executeScript({
        //   file: 'scripts/injected-css-transition.js'
        // }); 
      }
    }
  );

  // chrome.runtime.onMessage.addListener(
  //   function(message, callback) {
  //     console.log('message', message)
  //     if (message == 'changeColor'){
        
  //     }
  //  });

}