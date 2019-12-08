import Blocker from '../background/Blocker';
import store from './index';

export function watchFilter(name, action) {
  let blockRequest;
  store.watch(
    (state, getters) => getters[name],
    (newValue, oldValue) => {
      console.log(`Updating filter ${name} from ${oldValue} to ${newValue}`);
      if (newValue === 0) {
        Blocker.unfilterRequest(blockRequest);
      } else {
        blockRequest = Blocker.filterRequest(action);
      }
    }
  );

  if (store.getters[name]) {
    blockRequest = Blocker.filterRequest(action);
  }
}
export function watchList(name, listTxt) {
  store.watch(
    (state, getters) => getters[name],
    (newValue, oldValue) => {
      console.log(`Updating list ${name} from ${oldValue} to ${newValue}`);
      if (newValue === 0) {
        Blocker.removeListToBlock(listTxt);
      } else {
        Blocker.addListToBlock(listTxt);
      }
    }
  );

  if (store.getters[name]) {
    Blocker.addListToBlock(listTxt);
  }
}
