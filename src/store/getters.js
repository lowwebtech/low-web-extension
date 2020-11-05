import RequestManager from '../controllers/RequestManager';
import options from '../datas/defaultOptions.js';

const getters = {};
for (let i = 0, lg = options.length; i < lg; i++) {
  const o = options[i];

  getters[o.id] = (state) => {
    // console.log(o.id)
    // console.log(state[o.id])
    return state[o.id];
  };
}

getters.active = (state) => state.active;
getters.level = (state) => state.level;
getters.pausedWebsites = (state) => state.pausedWebsites;
getters.pausedPages = (state) => state.pausedPages;
getters.websitesModeChanges = (state) => state.websitesModeChanges;
getters.isDefaultMode = (state) => (domain) => {
  return state.websitesModeChanges[domain] === undefined;
};
getters.getLevel = (state, getters) => (domain) => {
  if (!state.websitesModeChanges[domain]) return getters.level;
  else return state.websitesModeChanges[domain];
};
getters.isPageActive = (state) => (url) => {
  return state.pausedPages.indexOf(url) === -1;
};
getters.isWebsiteActive = (state) => (domain) => {
  return state.pausedWebsites.indexOf(domain) === -1;
};
getters.isWhitelistedImage = (state) => (url) => {
  const splitUrl = url.split('//');
  if (splitUrl[0] === 'https:') url = url.slice(splitUrl[0].length);
  if (splitUrl[0] === 'http:') url = url.slice(splitUrl[0].length);
  const whitelisted = state.whitelistHoverImages.find((image) => {
    return image.indexOf(url) !== -1;
  });
  if (whitelisted) return true;
  else return false;
};
getters.isActive = (state, getters) => (pageUrl, domain) => {
  if (domain === undefined || (getters.isPageActive(pageUrl) && getters.isWebsiteActive(domain))) {
    return true;
  } else {
    return false;
  }
};
getters.getOption = (state, getters) => (name, tabId) => {
  const tab = RequestManager.getTab(tabId);
  const domain = tab.domain;
  const level = getters.getLevel(domain);
  const option = getters[name][level];
  return parseInt(option);
};

export default getters;
