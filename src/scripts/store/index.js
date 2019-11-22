import Vue from 'vue';
import Vuex from 'vuex';
import jsonOptions from './options.json';
import getters from './getters';
import mutations from './mutations';
// import * as actions from './actions';
import VuexWebExtensions from 'vuex-webextensions';
// localStorage.clear()
let state = {
  active: true,
  pausedWebsites: [],
  pausedPages: [],
  url: undefined,
  hostname: undefined,
};

for (let i = 0, lg = jsonOptions.length; i < lg; i++) {
  let o = jsonOptions[i];
  state[o.id] = o.value;
  // persistentVars.push(o.id)
}
let persistentVars = Object.keys(state);
Vue.use(Vuex);
export default new Vuex.Store({
  plugins: [
    VuexWebExtensions({
      persistentStates: persistentVars,
      // loggerLevel: 'debug'
    }),
  ],
  state: state,
  getters: getters,
  mutations,
  // actions,
});
