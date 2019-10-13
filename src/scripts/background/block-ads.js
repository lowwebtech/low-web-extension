import store from '../../store';
import RequestManager from './RequestManager'

import * as ABPFilterParser from 'abp-filter-parser';
import easyListTxt from '../../easylist2.txt'


let parsedFilterData = {};
ABPFilterParser.parse(easyListTxt, parsedFilterData);


export function blockAds(){
  browser.webRequest.onBeforeRequest.addListener(
    function(details) {
      let cancel = false

      if( store.getters.block_ads ){

        const { tabId, requestId, url } = details;
        const tab = RequestManager.getTab( tabId )

        if( tab && tab.domain ){
          
          cancel = ABPFilterParser.matches(parsedFilterData, url, {
            domain: tab.domain,
            elementTypeMaskMap: ABPFilterParser.elementTypes.SCRIPT,
          })

          if( cancel ) console.log(url)
        }
         
      }

      return {
        cancel: cancel
      };
    },
    {
      urls: ["<all_urls>"]
    },
    ["blocking"]
  );
}