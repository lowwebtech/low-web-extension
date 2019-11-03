import queryString from 'query-string'
import store from '../../store';
import urls_to_block from '../images-to-block'
import RequestManager from './RequestManager'

export function blockImages(){

  browser.webRequest.onBeforeRequest.addListener( (details)=>{

    let o = {}

    // TODO add flag for images
    // if( store.getters.block_social == 1 ){

      const { tabId, requestId, url } = details;
      const tab = RequestManager.getTab( tabId )

      if( tab ){
        for( let i = 0, lg = urls_to_block.length; i<lg; i++ ){      
          if( tab.domain != urls_to_block[i][1]
            && url.indexOf(urls_to_block[i][0]) != -1 ){
            // o.redirectUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM88x8AAp0BzdNtlUkAAAAASUVORK5CYII='
            console.warn('blocked', url)
            o.cancel = true
          }
        } 

        if( url.indexOf('//media.giphy.com/media') != -1 ){
          console.warn('blocked', url)
          //https://media.giphy.com/media/gHWegg7yI1qOjTmpqN/giphy.gif
          if( url.indexOf('lowweb=AxkdIEKx') == -1 ){

            // let newUrl = new URL(url)
            // newUrl.searchParams.append('lowweb', 'AxkdIEKx')
            // newUrl.search = queryString(newUrl.searchParams)
            // console.log(newUrl)

            // o.redirectUrl = newUrl
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