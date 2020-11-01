import options from '../datas/options.js';

const getters = {};
for (let i = 0, lg = options.length; i < lg; i++) {
  const o = options[i];

  getters[o.id] = (state) => {
    return parseInt(state[o.id]);
  };
}

getters.active = (state) => state.active;
getters.level = (state) => state.level;
getters.pausedWebsites = (state) => state.pausedWebsites;
getters.pausedPages = (state) => state.pausedPages;
getters.websitesModeChanges = (state) => state.websitesModeChanges;
getters.isPageActive = (state) => (url) => {
  return state.pausedPages.indexOf(url) === -1;
};
getters.isWebsiteActive = (state) => (hostname) => {
  return state.pausedWebsites.indexOf(hostname) === -1;
};
getters.isActive = (state, getters) => (pageUrl, domain) => {
  if (domain === undefined || (getters.isPageActive(pageUrl) && getters.isWebsiteActive(domain))) {
    return true;
  } else {
    return false;
  }
};
getters.isBlockFile = (state, getters) => {
  if (getters.block_medias === 1 || getters.block_objects === 1 || getters.block_subframes === 1 || getters.block_fonts === 1 || getters.block_images === 1) {
    return 1;
  } else {
    return 0;
  }
};

export default getters;
