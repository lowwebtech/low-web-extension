import { TOKEN } from '../constants'
import queryString from 'query-string'
import store from '../../store';
import images_to_block from '../images-to-block'
import RequestManager from './RequestManager'

export function blockImages(){

  browser.webRequest.onBeforeRequest.addListener( (details)=>{

    let o = {}

    // TODO add flag for images
    // if( store.getters.block_social == 1 ){

      const { tabId, requestId, url } = details;
      const tab = RequestManager.getTab( tabId )

      if( tab ){
        for( let i = 0, lg = images_to_block.length; i<lg; i++ ){      
          if( tab.domain != images_to_block[i][1]
            && url.indexOf(images_to_block[i][0]) != -1 ){
            console.warn('blocked', url)
            o.cancel = true
          }
        } 

        if( url.indexOf('//media.giphy.com/media') != -1 ){
          
          //https://media.giphy.com/media/gHWegg7yI1qOjTmpqN/giphy.gif
          if( url.indexOf('lowweb='+TOKEN) == -1 ){

            // let newUrl = new URL(url)
            // newUrl.searchParams.append('lowweb', 'AxkdIEKx')
            // newUrl.search = queryString(newUrl.searchParams)
            // o.redirectUrl = newUrl
            
            console.warn('blocked', url)
            o.cancel = true
          }
        }
      }
    // }

    return o
  },{
    urls: ["<all_urls>"]
  },
  ["blocking"]);

}