import options from '../datas/options.js';
import getHostname from '../utils/get-hostname';
import store from './index';
import Vue from 'vue';

const mutations = {};
for (let i = 0, lg = options.length; i < lg; i++) {
  const o = options[i];
  mutations[o.id] = function (state, values) {
    // console.log(o.id, values);
    Vue.set(state, o.id, values);
  };
}

mutations.url = function (state, url) {
  state.url = url;
  state.hostname = getHostname(url);
};
mutations.level = function (state, level) {
  state.level = level;
  state.websitesModeChanges = {};
  let o;
  for (let i = 0, lg = options.length; i < lg; i++) {
    o = options[i];
    store.commit(o.id, o.values);
  }
};
mutations.pauseWebsite = function (state, website) {
  const index = state.pausedWebsites.indexOf(website);
  if (index === -1) {
    state.pausedWebsites.push(website);
    if (browser.tabs) browser.tabs.reload(); // bypassCache: true
  }
};
mutations.resumeWebsite = function (state, website) {
  const index = state.pausedWebsites.indexOf(website);
  if (index !== -1) {
    state.pausedWebsites.splice(index, 1);
    if (browser.tabs) browser.tabs.reload(); // bypassCache: true
  }
};
mutations.pausePage = function (state, page) {
  const index = state.pausedPages.indexOf(page);
  if (index === -1) {
    state.pausedPages.push(page);
    if (browser.tabs) browser.tabs.reload(); // bypassCache: true
  }
};
mutations.resumePage = function (state, page) {
  const index = state.pausedPages.indexOf(page);
  if (index !== -1) {
    state.pausedPages.splice(index, 1);
    if (browser.tabs) browser.tabs.reload(); // bypassCache: true
  }
};
mutations.changeWebsiteMode = function (state, website) {
  console.log('this.changeWebsiteMode');
  console.log(state.websitesModeChanges);
  // state.websitesModeChanges = {};
  if (!state.websitesModeChanges[website.hostname]) {
    state.websitesModeChanges[website.hostname] = website.value;
  } else {
    delete state.websitesModeChanges[website.hostname];
  }
  console.log(state.websitesModeChanges);

  // const index = state.websitesModeChanges.findIndex((w) => w.hostname === website.hostname);
  // if (index === -1) {
  //   state.websitesModeChanges.push(website);
  // } else {
  //   state.websitesModeChanges.splice(index, 1);
  // }
  if (browser.tabs) browser.tabs.reload(); // bypassCache: true
};

mutations.resetActive = function (state) {
  state.pausedPages = [];
  state.pausedWebsites = [];
  state.active = true;
  state.websitesModeChanges = {};
};

export default mutations;
