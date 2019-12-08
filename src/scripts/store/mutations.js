import jsonOptions from './options.json';
import getHostname from '../utils/get-hostname';
import store from './index';

const mutations = {};
for (let i = 0, lg = jsonOptions.length; i < lg; i++) {
  let o = jsonOptions[i];
  mutations[o.id] = function(state, value) {
    console.log('update', o.id, value);
    state[o.id] = value;
  };
}

mutations.url = function(state, url) {
  state.url = url;
  state.hostname = getHostname(url);
};
mutations.level = function(state, level) {
  state.level = level;

  let o;
  for (let i = 0, lg = jsonOptions.length; i < lg; i++) {
    o = jsonOptions[i];
    store.commit(o.id, o.presets[parseInt(level)]);
  }
  // switch (parseInt(level)) {
  //   case 0:
  //     store.commit('video_quality', 1);
  //     store.commit('video_clicktoload', 1);
  //     store.commit('video_attributes', 1);
  //     store.commit('save_data', 1);
  //     store.commit('gif_player', 1);
  //     store.commit('image_srcset', 2);
  //     store.commit('css_animation', 1);
  //     store.commit('marquee_animation', 1);
  //     store.commit('image_lazyload', 0);
  //     store.commit('iframe_lazyload', 0);
  //     store.commit('block_social', 1);
  //     store.commit('block_avatar', 1);
  //     store.commit('block_images', 1);
  //     store.commit('block_medias', 1);
  //     store.commit('block_objects', 1);
  //     store.commit('block_subframes', 1);
  //     store.commit('block_fonts', 1);
  //     break;
  //   case 1:
  //     store.commit('video_quality', 2);
  //     store.commit('video_clicktoload', 1);
  //     store.commit('video_attributes', 1);
  //     store.commit('save_data', 1);
  //     store.commit('gif_player', 1);
  //     store.commit('image_srcset', 3);
  //     store.commit('css_animation', 0);
  //     store.commit('marquee_animation', 1);
  //     store.commit('block_social', 1);
  //     store.commit('block_avatar', 1);
  //     store.commit('block_images', 0);
  //     store.commit('block_medias', 0);
  //     store.commit('block_objects', 0);
  //     store.commit('block_subframes', 0);
  //     store.commit('block_fonts', 1);
  //     break;
  //   case 2:
  //     store.commit('video_quality', 3);
  //     store.commit('video_clicktoload', 1);
  //     store.commit('video_attributes', 1);
  //     store.commit('save_data', 1);
  //     store.commit('gif_player', 0);
  //     store.commit('image_srcset', 3);
  //     store.commit('css_animation', 0);
  //     store.commit('marquee_animation', 1);
  //     store.commit('block_social', 1);
  //     store.commit('block_avatar', 0);
  //     store.commit('block_images', 0);
  //     store.commit('block_medias', 0);
  //     store.commit('block_objects', 0);
  //     store.commit('block_subframes', 0);
  //     store.commit('block_fonts', 0);
  //     break;
  // }
};
mutations.active = function(state, active) {
  state.active = active;
};
mutations.toggleWebsite = function(state, website) {
  const index = state.pausedWebsites.indexOf(website);
  if (index !== -1) {
    state.pausedWebsites.splice(index, 1);
  } else {
    state.pausedWebsites.push(website);
  }
  // console.log('pausedWebsites',state.pausedWebsites)
};
mutations.togglePage = function(state, page) {
  const index = state.pausedPages.indexOf(page);
  if (index !== -1) {
    state.pausedPages.splice(index, 1);
  } else {
    state.pausedPages.push(page);
  }
  // console.log('pausedPages',state.pausedPages)
};
mutations.resetActive = function(state) {
  // console.log('pausedPages', state.pausedPages);
  // console.log('pausedWebsites', state.pausedWebsites);
  // console.log('active', state.active);
  state.pausedPages = [];
  state.pausedWebsites = [];
  state.active = true;
  // console.log('resetActive')
};

export default mutations;
