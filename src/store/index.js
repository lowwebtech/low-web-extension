import Vue from 'vue';
import Vuex from 'vuex';
import options from '../datas/options.js';
import getters from './getters';
import mutations from './mutations';
// import * as actions from './actions';
import VuexWebExtensions from 'vuex-webextensions';

const defaultOptions = {
  pausedWebsites: [],
  pausedPages: [],
  websitesModeChanges: {},
};
let state = Object.assign({}, defaultOptions);

const nonPersistentState = {
  active: true,
  url: undefined,
  hostname: undefined,
  level: 0,
  nonPersistentState: true,
};

for (let i = 0, lg = options.length; i < lg; i++) {
  const o = options[i];
  state[o.id] = o.value;
}
const persistentVars = Object.keys(state);

// add nonPersitent after setting persistenVars
state = Object.assign(nonPersistentState, state);

// TODO
function checkDefault() {
  const defaultOptionValues = Object.assign({}, defaultOptions);
  for (let i = 0, lg = options.length; i < lg; i++) {
    const o = options[i];
    state[o.id] = o.value;
  }

  Object.entries(state).forEach(([key, value]) => {
    if (value === undefined && defaultOptionValues[key] !== undefined) {
      console.log(key);
      console.log(defaultOptionValues[key]);
      state.commit(key, defaultOptionValues[key]);
    }
  });
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
checkDefault();
console.log(state);

export default store;
