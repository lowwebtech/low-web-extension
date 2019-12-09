import './click-to-load.scss';
import store from '../../store';
import videoToBlock from '../../video-to-block';
import sanitizeEmbedUrl from '../../utils/sanitize-embed-video-url';
import { getYoutubeId, getDailymotionId, getFacebookId, getVimeoId, getTwitchId } from '../../utils/get-video-id';

export default function() {
  if (store.getters.video_clicktoload === 1) {
    let iframes = document.querySelectorAll('iframe');

    if (iframes.length > 0) {
      // TODO find a way to cache
      fetch(browser.runtime.getURL('oembed/style.css'))
        .then(function(response) {
          return response.text();
        })
        .then(function(css) {
          customIframes(css);
        });
    }
  }
}
function customIframes(style) {
  let iframes = document.querySelectorAll('iframe');

  iframes.forEach(iframe => {
    let src = iframe.src;
    if (!src || src === '') {
      src = iframe.dataset.src;
    }

    if (src && videoBlocked(src)) {
      let data, type;
      const keys = Object.keys(videoToBlock);
      for (const key of keys) {
        if (src.indexOf(videoToBlock[key].embed_url) !== -1) {
          type = key;
          data = videoToBlock[type];
          break;
        }
      }

      const id = getId(src, type);

      let videoUrl, oembedUrl;
      if (data.video_url !== '' && data.oembed !== '' && id) {
        videoUrl = data.video_url.replace('##ID##', id);

        if (videoUrl) {
          oembedUrl = data.oembed + '?format=json&url=' + encodeURIComponent(videoUrl);

          const options = {
            message: 'oembed',
            options: {
              type: type,
              videoUrl: videoUrl,
              oembedUrl: oembedUrl,
            },
          };

          const callback = function(oembed) {
            if (oembed) {
              let thumb = oembed.thumbnail_url;
              // some oembed doesn't provide thumbnail_url
              if (!thumb && data.image !== '') {
                thumb = data.image.replace('##ID##', id);
              }
              if (type === 'youtube') thumb = thumb.replace('hqdefault', 'mqdefault');

              // button
              if (data.skin) {
                let skin = data.skin;
                let title;

                if (oembed.title) {
                  title = oembed.title;
                } else if (oembed.provider_name && oembed.provider_name.toLowerCase() === 'facebook') {
                  let parser = new DOMParser();
                  let html = parser.parseFromString(oembed.html, 'text/html');
                  let t = html.querySelector('blockquote > a');
                  if (t) {
                    title = t.textContent;
                  }
                }
                if (title) {
                  skin = skin.replace('##TITLE##', title);
                }
                if (oembed.description) {
                  skin = skin.replace('##DESCRIPTION##', oembed.description);
                }
                if (oembed.author_name) {
                  skin = skin.replace('##AUTHOR##', oembed.author_name);
                }
                if (thumb) {
                  skin = skin.replace('##IMAGE##', '<img src="' + thumb + '" />');
                }
                if (videoUrl) {
                  if (videoUrl.indexOf(videoToBlock[type].embed_url) !== -1) {
                    videoUrl = sanitizeEmbedUrl(videoUrl, true);
                  }
                  skin = skin.replace('##VIDEO_URL##', videoUrl);
                }

                skin = '<style type="text/css">' + style + '</style><div class="lowweb--' + type + '">' + skin + '</div>';
                iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(skin);
              }
            }
          };

          browser.runtime.sendMessage(options).then(callback, e => {
            console.error('error message click-to-load');
            console.error(e);
          });
        }
      }
    }
  });
}

function videoBlocked(url) {
  const keys = Object.keys(videoToBlock);
  for (const key of keys) {
    if (url.indexOf(videoToBlock[key].embed_url) !== -1) {
      return true;
    }
  }
  return false;
}

function getId(url, type) {
  let id;
  switch (type) {
    case 'youtube':
      id = getYoutubeId(url);
      break;
    case 'vimeo':
      id = getVimeoId(url);
      break;
    case 'dailymotion':
      id = getDailymotionId(url);
      break;
    case 'twitch':
      id = getTwitchId(url);
      break;
    case 'facebook':
      id = getFacebookId(url);
      break;
  }
  return id;
}
