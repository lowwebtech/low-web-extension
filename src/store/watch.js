import Blocker from '../background_script/controllers/Blocker';
import store from './index';

/**
 * Watch general option changes, then filter/unfilter requests
 * @param  {string} optionName general option name (look at options.json)
 * @param  {function} action   function executed for each filtered webRequest
 * @param  {Object} filter     webRequest filter
 * @return
 */
export function watchFilter(optionName, action, filter = {}) {
  // TODO put back unfilter request

  // store.watch(
  //   (state, getters) => getters[optionName],
  //   (newValue, oldValue) => {
  //     console.log(`Updating filter ${optionName} from ${oldValue} to ${newValue}`);
  //     if (newValue === 0) {
  //       Blocker.unfilterRequest(filterItem.blockRequest);
  //     } else if (newValue === 1) {
  //       filterItem.blockRequest = Blocker.filterRequest(action, filter);
  //     }
  //   }
  // );

  // if (store.getters[optionName] === 1) {
  //   filterItem.blockRequest = Blocker.filterRequest(action, filter);
  // }
  Blocker.filterRequest(action, filter);
}

/**
 * Watch general option changes, then block/unblock txt list
 * @param  {string} optionName general option name (look at options.json)
 * @param  {} listTxt    datas form TXT files (folder lists/)
 * @return
 */
export function watchList(optionName, listTxt) {
  watch(optionName, (newValue, oldValue) => {
    // console.log(`Updating list ${optionName} from ${oldValue} to ${newValue}`);
    if (newValue === 0) {
      Blocker.removeListToBlock(listTxt);
    } else if (newValue === 1) {
      Blocker.addListToBlock(listTxt);
    }
  });

  // add list at init if optionName is enabled
  if (store.getters[optionName] === 1) {
    Blocker.addListToBlock(listTxt);
  }
}

export function watchBool(optionName, enableCallback, disableCallback) {
  watch(optionName, (newValue, oldValue) => {
    if (newValue === 0) {
      enableCallback();
    } else if (newValue === 1) {
      disableCallback();
    }
  });
}

export function watch(optionName, callback) {
  // watch future options change
  store.watch((state, getters) => getters[optionName], callback);
}
