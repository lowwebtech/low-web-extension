import store from '../../store';
import urls_to_block from '../social-to-block'
import RequestManager from './RequestManager'

export function blockSocial(){

  browser.webRequest.onBeforeRequest.addListener( (details)=>{

    let cancel = false

    if( store.getters.block_social ){

      const { tabId, requestId, url } = details;
      const tab = RequestManager.getTab( tabId )

      if( tab ){
        for( let i = 0, lg = urls_to_block.length; i<lg; i++ ){
          if( tab.domain != urls_to_block[i][1]
            && url.indexOf(urls_to_block[i][0]) != -1 ){
            cancel = true
          }
        } 
      }
       
    }

    return {
      cancel: cancel
    };
  },{
    urls: ["<all_urls>"]
  },
  ["blocking"]);

}