import store from '../../store';

export function blockFiles(){
  browser.webRequest.onBeforeRequest.addListener(
    function(details) {
      if( details.url.indexOf('vimeo') != -1 ){
        console.log(details.url) 
      }
      
      let cancel
      switch( details.type ){
        case 'video':
          cancel = store.getters.block_videos
          break;
        case 'font':
          cancel = store.getters.block_fonts
          break;
        case 'image':
          cancel = store.getters.block_images
          break;
        case 'script':
          cancel = store.getters.block_scripts
          break;
        default:
          cancel = 0
          break;
      }

      // console.log(details.type, cancel)

      return {
        cancel: cancel == 1
      };
    },
    {
      urls: ["<all_urls>"]
    },
    ["blocking"]
  );
}