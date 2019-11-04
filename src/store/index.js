import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters';
import mutations from './mutations';
import * as actions from './actions';

// import createPersistedState from 'vuex-persistedstate'
import VuexWebExtensions from 'vuex-webextensions';
// import createMutationsSharer from "vuex-shared-mutations";

Vue.use(Vuex);

let state = {

  save_data: 1,
  css_animation: 0,

  image_srcset: 2,
  image_lazyload: 1,
  iframe_lazyload: 1,

  gif_player: 1,

  block_images: 0,
  block_videos: 0,
  block_fonts: 0,
  block_scripts: 0,

  block_social: 1,
  block_ads: 0,

  video_quality: 'low',
  video_clicktoload: 1,
  video_attributes: 1
  
}
const keys = Object.keys(state)
let shared_vars = []
for (const key of keys) {
  shared_vars.push(key)
}
console.log(shared_vars)
export default new Vuex.Store({
  state: state,
  getters,
  mutations,
  // actions,
  // plugins: [createMutationsSharer({ predicate: shared_vars })]
  plugins: [VuexWebExtensions({
    persistentStates: shared_vars
  })]
  // plugins: [createPersistedState({
  //   'key': 'lowweb',
  //   'paths': shared_vars
  // })]

});
