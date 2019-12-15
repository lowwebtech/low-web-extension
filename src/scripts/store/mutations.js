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
};
// mutations.active = function(state, active) {
//   state.active = active;
// };
mutations.pauseWebsite = function(state, website) {
  const index = state.pausedWebsites.indexOf(website);
  if (index === -1) {
    state.pausedWebsites.push(website);
    // browser.tabs.reload({ bypassCache: true });
    if (browser.tabs) browser.tabs.reload();
  }
};
mutations.resumeWebsite = function(state, website) {
  const index = state.pausedWebsites.indexOf(website);
  if (index !== -1) {
    state.pausedWebsites.splice(index, 1);
    if (browser.tabs) browser.tabs.reload();
  }
};
mutations.pausePage = function(state, page) {
  const index = state.pausedPages.indexOf(page);
  if (index === -1) {
    state.pausedPages.push(page);
    // browser.tabs.reload({ bypassCache: true });
    if (browser.tabs) browser.tabs.reload();
  }
};
mutations.resumePage = function(state, page) {
  const index = state.pausedPages.indexOf(page);
  if (index !== -1) {
    state.pausedPages.splice(index, 1);
    if (browser.tabs) browser.tabs.reload();
  }
};
// mutations.resetActive = function(state) {
//   state.pausedPages = [];
//   state.pausedWebsites = [];
//   state.active = true;
// };

export default mutations;
