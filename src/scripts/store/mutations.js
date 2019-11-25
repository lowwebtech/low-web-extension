import jsonOptions from './options.json';
import getHostname from '../utils/get-hostname';

const mutations = {};
for (let i = 0, lg = jsonOptions.length; i < lg; i++) {
  let o = jsonOptions[i];
  mutations[o.id] = function(state, payload) {
    state[o.id] = parseInt(payload);
  };
}

mutations.url = function(state, url) {
  state.url = url;
  state.hostname = getHostname(url);
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
