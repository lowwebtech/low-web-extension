import store from '../store';
import queryString from 'query-string';
import videosToBlock from '../datas/video-to-block';
import { TOKEN } from '../datas/constants';

export default function (url, autoplay = false, token = false) {
  const u = new URL(url);
  let params = queryString.parse(u.search);
  const originalParams = Object.assign({}, params);

  let video;
  const keys = Object.keys(videosToBlock);
  for (const key of keys) {
    video = videosToBlock[key];
    if (url.indexOf(video.embed_url) !== -1) {
      switch (key) {
        case 'youtube':
          params = setEmbedParam(params, 'loop', '0');
          params = setEmbedParam(params, 'rel', '0');
          if (autoplay) {
            params.autoplay = 1;
          } else {
            params = setEmbedParam(params, 'autoplay', '0');
          }
          // vq (small/medium) doesn't work
          break;

        case 'twitch':
          params = setEmbedParam(params, 'loop', 'false');
          if (autoplay) {
            params.autoplay = true;
          } else {
            params = setEmbedParam(params, 'autoplay', 'false');
          }
          // quality (low/medium) doesn't work
          break;

        case 'dailymotion':
          params = setEmbedParam(params, 'loop', 'false');
          params = setEmbedParam(params, 'queue-enable', 'false');
          if (autoplay) {
            params.autoplay = true;
          } else {
            params = setEmbedParam(params, 'autoplay', 'false');
          }
          // quality (240/380) doesn't work
          break;

        case 'vimeo':
          params = setEmbedParam(params, 'loop', 'false');
          if (autoplay) {
            params.autoplay = true;
          } else {
            params = setEmbedParam(params, 'autoplay', 'false');
          }
          switch (store.getters.video_quality) {
            case 1:
              params.quality = '240p';
              break;
            case 2:
              params.quality = '360p';
              break;
            case 3:
              params.quality = '540p';
              break;
          }
          break;
      }
      break;
    }
  }

  if (token) {
    params.lowweb = TOKEN;
  }

  if (JSON.stringify(params) !== JSON.stringify(originalParams)) {
    const newSearch = queryString.stringify(params);
    u.search = newSearch;
    return u.href;
  }
  return url;
}

function setEmbedParam(params, name, value) {
  // if (typeof params[name] !== 'undefined' && params[name] !== value) {
  params[name] = value;
  // }
  return params;
}
