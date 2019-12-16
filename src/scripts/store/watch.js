import Blocker from '../background/Blocker';
import store from './index';

export function watchFilter(name, action, filter = {}) {
  // store.watch(
  //   (state, getters) => getters[name],
  //   (newValue, oldValue) => {
  //     console.log(`Updating filter ${name} from ${oldValue} to ${newValue}`);
  //     if (newValue === 0) {
  //       Blocker.unfilterRequest(filterItem.blockRequest);
  //     } else if (newValue === 1) {
  //       filterItem.blockRequest = Blocker.filterRequest(action, filter);
  //     }
  //   }
  // );

  // if (store.getters[name] === 1) {
  //   filterItem.blockRequest = Blocker.filterRequest(action, filter);
  // }
  Blocker.filterRequest(action, filter);
}

export function watchList(name, listTxt) {
  store.watch(
    (state, getters) => getters[name],
    (newValue, oldValue) => {
      console.log(`Updating list ${name} from ${oldValue} to ${newValue}`);
      if (newValue === 0) {
        Blocker.removeListToBlock(listTxt);
      } else if (newValue === 1) {
        Blocker.addListToBlock(listTxt);
      }
    }
  );

  if (store.getters[name] === 1) {
    Blocker.addListToBlock(listTxt);
  }
}
