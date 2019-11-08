import RequestManager from './RequestManager'

let blockRequests = []
let urlsToBlock = []

class Blocker{
  constructor(){

  }

  init(){
    this.filterRequest( blockUrls )
  }

  filterRequest( callback, filter = {} ){
    
    filter = Object.assign({
      urls: ["<all_urls>"]
    }, filter)

    let request = new BlockRequest( callback, filter )
    blockRequests.push( request )

    browser.webRequest.onBeforeRequest.addListener(
      callback,
      filter,
      ["blocking"]
    );
  }

  addUrlsToBlock( urls ){
    urlsToBlock = [...urlsToBlock, ...urls]
  }
}

const blockUrls = function( details ){

  let cancel = false
  const { tabId, requestId, url } = details;

  // block urls with domain
  const tab = RequestManager.getTab( tabId )
  if( tab ){
    for( let i = 0, lg = urlsToBlock.length; i<lg; i++ ){

      if( urlsToBlock[i][1] != -1//
        && tab.domain != urlsToBlock[i][1]
        && url.indexOf(urlsToBlock[i][0]) != -1 ){
        cancel = true
      }
    } 
  }

  // block other urls -1
  for( let i = 0, lg = urlsToBlock.length; i<lg; i++ ){
    
    let regex = new RegExp( escapeRegExp(urlsToBlock[i][0]).replace(/\*/g, '.*') )
    if( regex.test(url) ){
      cancel = true
    }

  }

  let o = {}
  if( cancel ) {
    console.warn('blocked', url)
    o.cancel = true
  }
  
  return o
}

const escapeRegExp = string => {
  return string.replace(/[.+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  // return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

class BlockRequest{
  constructor(callback, filter){
    
    this.callback = callback
    this.filter = filter

  }
}

let blocker = new Blocker
export default blocker