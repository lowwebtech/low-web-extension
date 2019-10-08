// import store from '../store';
import urls_to_block from '../social-to-block'
import getHostname from '../utils/get-hostname'

let tabStorage = {}
let networkFilters = {
  urls: ["<all_urls>"]
}

export function blockSocial(){

  browser.webRequest.onBeforeRequest.addListener(
    (details)=>{

      const { tabId, requestId } = details;
      if (!tabStorage.hasOwnProperty(tabId)) {
        return;
      }

      tabStorage[tabId].requests[requestId] = {
        requestId: requestId,
        url: details.url,
        startTime: details.timeStamp,
        status: 'pending'
      };

      let o = {}
      for( let i = 0, lg = urls_to_block.length; i<lg; i++ ){
        if( details.url.indexOf(urls_to_block[i][0]) != -1 
          && tabStorage[tabId].domain != urls_to_block[i][1] ){
          o.cancel = true
        }
      }

      return o
    },
    networkFilters,
    ["blocking"]
  );

  browser.webRequest.onCompleted.addListener((details) => {

    const { tabId, requestId } = details;
    if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId)) {
      return;
    }

    const request = tabStorage[tabId].requests[requestId];

    Object.assign(request, {
      endTime: details.timeStamp,
      requestDuration: details.timeStamp - request.startTime,
      status: 'complete'
    });

  }, networkFilters);

  browser.webRequest.onErrorOccurred.addListener((details)=> {
    const { tabId, requestId } = details;
    if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId)) {
      return;
    }

    const request = tabStorage[tabId].requests[requestId];
    Object.assign(request, {
      endTime: details.timeStamp,           
      status: 'error',
    });
    // console.log(tabStorage[tabId].requests[requestId]);
  }, networkFilters);


  browser.tabs.onUpdated.addListener((tabId) => {
    addTab( tabId )
    
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs)=>{
      
      if( tabs.length > 0 ){
        let t = tabs[0]
        if( tabStorage && tabStorage[t.id] ){
          tabStorage[t.id].domain = getHostname( t.url )
        }
      }
      
    });
  });

  browser.tabs.onActivated.addListener((tab) => {
    const tabId = tab ? tab.tabId : browser.tabs.TAB_ID_NONE;
    addTab(tabId)
  });

  browser.tabs.onRemoved.addListener((tab) => {
    const tabId = tab.tabId;
    
    if (!tabStorage.hasOwnProperty(tabId)) {
      return;
    }
    tabStorage[tabId] = null;
  });
}

function addTab( tabId ){
  if (tabId && !tabStorage.hasOwnProperty(tabId)) {
    tabStorage[tabId] = {
      id: tabId,
      requests: {},
      url: '',
      registerTime: new Date().getTime()
    };
  }
}