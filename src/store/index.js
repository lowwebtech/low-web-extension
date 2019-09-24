import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters';
import mutations from './mutations';
import * as actions from './actions';

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // foo: 'bar',

    save_data: 1,
    css_animation: 1,

    image_srcset: 1,
    image_lazyload: 1,
    iframe_lazyload: 1,

    block_images: 0,
    block_videos: 0,
    block_fonts: 0,
    block_scripts: 0,
    
  },
  getters,
  mutations,
  actions,
  plugins: [createPersistedState()]
});
