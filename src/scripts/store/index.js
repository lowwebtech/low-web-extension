import Vue from 'vue';
import Vuex from 'vuex';

import jsonOptions from './options.json'

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
  
}

for( let i = 0, lg = jsonOptions.length; i<lg; i++ ){
  let o = jsonOptions[i]
  state[ o.id ] = o.value 
  // persistent_vars.push(o.id)
}

let persistent_vars = Object.keys(state)

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [VuexWebExtensions({
    persistentStates: persistent_vars,
    // loggerLevel: 'debug'
  })],
  state: state,
  getters: getters,
  mutations,
  // actions,
});
