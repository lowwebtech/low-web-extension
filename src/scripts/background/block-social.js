import urls_to_block from '../social-to-block'
import RequestManager from './RequestManager'
// import { AdBlockClient, FilterOptions } from 'ad-block'

export function blockSocial(){

  // const client = new AdBlockClient()
  // client.parse('/public/ad/*$domain=slashdot.org')
  // client.parse('/public/ad3/*$script')
  // var b1 = client.matches('http://www.brianbondy.com/public/ad/some-ad', FilterOptions.script, 'slashdot.org')
  // var b2 = client.matches('http://www.brianbondy.com/public/ad/some-ad', FilterOptions.script, 'digg.com')
  // console.log('public/ad/* should match b1.  Actual: ', b1)
  // console.log('public/ad/* should not match b2.  Actual: ', b2)

  browser.webRequest.onBeforeRequest.addListener( (details)=>{

    const { tabId, requestId, url } = details;
    const tab = RequestManager.getTab( tabId )


    let o = {}
    if( tab ){
      for( let i = 0, lg = urls_to_block.length; i<lg; i++ ){
        if( tab.domain != urls_to_block[i][1]
          && url.indexOf(urls_to_block[i][0]) != -1 ){
          o.cancel = true
        }
      } 
    }

    return o
  },{
    urls: ["<all_urls>"]
  },
  ["blocking"]);
}