import * as types from './mutation-types';

// export const setFoo = ({ commit }, payload) => {
//   commit(types.UPDATE_FOO, payload);
// };

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