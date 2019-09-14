export function cssAnimation(){

  console.log('disable css transition')

  chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab){
      if( changeInfo.status == 'loading' ){
        console.log('insertCSS', tab.url)
        var re = new RegExp("^(http|https)://", "i");
        var str = "My String";
        var match = re.test(tab.url);
        console.log(match)
        chrome.tabs.insertCSS(tabId, {
            code: "* { transition: none !important; }"
        });
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