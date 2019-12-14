import Vue from 'vue';
import Vuex from 'vuex';
import jsonOptions from './options.json';
import getters from './getters';
import mutations from './mutations';
// import * as actions from './actions';
import VuexWebExtensions from 'vuex-webextensions';
// Import the `getField` getter and the `updateField`
// mutation function from the `vuex-map-fields` module.
// import { getField, updateField } from 'vuex-map-fields';

let state = {
  active: true,
  pausedWebsites: [],
  pausedPages: [],
  url: undefined,
  hostname: undefined,
  level: 0,
};

// chrome.storage.sync.set({testValue: 'hello'}, function() {
//   console.log('testValue is set');
// });

// chrome.storage.sync.get(['testValue'], function(result) {
//   console.log('testValue currently is ' + result.testValue);
// });
// getters.getField = getField;
// mutations.updateField = updateField;

for (let i = 0, lg = jsonOptions.length; i < lg; i++) {
  let o = jsonOptions[i];
  state[o.id] = o.value;
  // persistentVars.push(o.id)
}
let persistentVars = Object.keys(state);
console.log(persistentVars);
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
