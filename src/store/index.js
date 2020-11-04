import Vue from 'vue';
import Vuex from 'vuex';
import options from '../datas/options.js';
import getters from './getters';
import mutations from './mutations';
// import * as actions from './actions';
import VuexWebExtensions from 'vuex-webextensions';
import { localOption } from '../utils/get-local-options.js';

const defaultOptions = {
  pausedWebsites: [],
  pausedPages: [],
  websitesModeChanges: {},
};
for (let i = 0, lg = options.length; i < lg; i++) {
  const o = options[i];
  defaultOptions[o.id] = o.value;
}
let state = Object.assign({}, defaultOptions);
const persistentVars = Object.keys(state);

const nonPersistentState = {
  active: true,
  url: undefined,
  hostname: undefined,
  level: 0,
  nonPersistentState: true,
};
// add nonPersitent after setting persistenVars
state = Object.assign(nonPersistentState, state);

/**
 * new option value (eg: datas/options.js) may not defined in localStorage
 * commit new option value if needed
 */
function checkDefaultOption() {
  for (let i = 0, lg = options.length; i < lg; i++) {
    const o = options[i];
    localOption(o.id).then((optionValue) => {
      if (optionValue === undefined) {
        setTimeout(() => {
          store.commit(o.id, o.values);
        }, 100);
      }
    });
  }
}

Vue.use(Vuex);
const store = new Vuex.Store({
  plugins: [
    VuexWebExtensions({
      // loggerLevel: 'debug',
      persistentStates: persistentVars,
    }),
  ],
  state: state,
  getters: getters,
  mutations,
  // actions,
});
checkDefaultOption();

export default store;
