import Vue from 'vue';
import Vuex from 'vuex';
import options from '../datas/options.js';
import getters from './getters';
import mutations from './mutations';
// import * as actions from './actions';
import VuexWebExtensions from 'vuex-webextensions';

let state = {
  pausedWebsites: [],
  pausedPages: [],
};
const nonPersistentState = {
  active: true,
  url: undefined,
  hostname: undefined,
  level: 0,
};

for (let i = 0, lg = options.length; i < lg; i++) {
  const o = options[i];
  state[o.id] = o.value;
}

const persistentVars = Object.keys(state);
state = Object.assign(nonPersistentState, state);

Vue.use(Vuex);
export default new Vuex.Store({
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
