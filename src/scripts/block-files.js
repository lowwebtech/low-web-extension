export function blockFiles(){
  console.log('block files')
  browser.webRequest.onBeforeRequest.addListener(
    function(details) {
      console.log(details.type)
      return {
        cancel: details.type == 'image'
      };
    },
    {
      urls: ["<all_urls>"]
    },
    ["blocking"]
  );
}