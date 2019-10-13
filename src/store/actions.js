import * as types from './mutation-types';

export const setSaveData = ({ commit }, payload) => {
  commit(types.SAVE_DATA, payload);
};
export const setCssAnimation = ({ commit }, payload) => {
  commit(types.CSS_ANIMATION, payload);
};
export const setBlockImages = ({ commit }, payload) => {
  commit(types.BLOCK_IMAGES, payload);
};
export const setBlockVideos = ({ commit }, payload) => {
  commit(types.BLOCK_VIDEOS, payload);
};
export const setBlockFonts = ({ commit }, payload) => {
  commit(types.BLOCK_FONTS, payload);
};
export const setBlockScripts = ({ commit }, payload) => {
  commit(types.BLOCK_SCRIPTS, payload);
};
export const setImageSrcset = ({ commit }, payload) => {
  commit(types.IMAGE_SRCSET, payload);
};
export const setImageLazyload = ({ commit }, payload) => {
  commit(types.IMAGE_LAZYLOAD, payload);
};
export const setIframeLazyload = ({ commit }, payload) => {
  commit(types.IFRAME_LAZYLOAD, payload);
};
export const setBlockSocial = ({ commit }, payload) => {
  commit(types.BLOCK_SOCIAL, payload);
};
export const setBlockAds = ({ commit }, payload) => {
  commit(types.BLOCK_ADS, payload);
};