import Vue from 'vue';
import Vuex from 'vuex';

import jsonOptions from './options.json'

import getters from './getters';
import mutations from './mutations';
// import * as actions from './actions';

import VuexWebExtensions from 'vuex-webextensions';

let state = {}
let shared_vars = []
for( let i = 0, lg = jsonOptions.length; i<lg; i++ ){
  let o = jsonOptions[i]
  state[ o.id ] = o.value 
  shared_vars.push(o.id)
}

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [VuexWebExtensions({
    persistentStates: shared_vars,
    loggerLevel: 'debug'
  })],
  state: state,
  getters: getters,
  mutations,
  // actions,
});
