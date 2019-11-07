import types from './mutation-types';
import jsonOptions from './options.json'

export const setSaveData = ({ commit }, payload) => {
  commit(types.save_data, payload);
};
export const setCssAnimation = ({ commit }, payload) => {
  commit(types.css_animation, payload);
};
export const setBlockImages = ({ commit }, payload) => {
  commit(types.block_images, payload);
};
export const setBlockVideos = ({ commit }, payload) => {
  commit(types.block_videos, payload);
};
export const setBlockFonts = ({ commit }, payload) => {
  commit(types.block_fonts, payload);
};
export const setGifPlayer = ({ commit }, payload) => {
  commit(types.gif_player, payload);
};
export const setImageSrcset = ({ commit }, payload) => {
  commit(types.image_srcset, payload);
};
export const setImageLazyload = ({ commit }, payload) => {
  commit(types.image_lazyload, payload);
};
export const setIframeLazyload = ({ commit }, payload) => {
  commit(types.iframe_lazyload, payload);
};
export const setBlockSocial = ({ commit }, payload) => {
  commit(types.block_social, payload);
};
export const setVideoQuality = ({ commit }, payload) => {
  commit(types.video_quality, payload);
};
export const setVideoClicktoload = ({ commit }, payload) => {
  commit(types.video_clicktoload, payload);
};
export const setVideoAttributes = ({ commit }, payload) => {
  commit(types.video_attributes, payload);
};