import './click-to-load.scss';
import store from '../../store';
import videoToBlock from '../../datas/video-to-block';
import sanitizeEmbedUrl from '../../utils/sanitize-embed-video-url';
import { getYoutubeId, getDailymotionId, getFacebookId, getVimeoId, getTwitchId } from '../../utils/get-video-id';

let style;
export default function() {
  if (store.getters.video_clicktoload === 1) {
    let iframes = document.querySelectorAll('iframe');

    if (iframes.length > 0) {
      loadStyles();
    }

    const onEmbedVideoBlocked = (request, sender, sendResponse) => {
      if (request.message === 'embedVideoBlocked') {
        if (style) {
          customIframes();
        } else {
          loadStyles();
        }
      }
      return Promise.resolve({ message: 'embedVideoBlockedDone', result: 'ok' });
    };
    if (!browser.runtime.onMessage.hasListener(onEmbedVideoBlocked)) {
      browser.runtime.onMessage.addListener(onEmbedVideoBlocked);
    }
  }
}

function loadStyles() {
  // TODO split css by embed type
  fetch(browser.runtime.getURL('oembed/style.css'), { cache: 'force-cache' })
    .then(function(response) {
      if (!response || response.status !== 200) {
        return true;
      }
      return response.text();
    })
    .then(css => {
      style = css;
      customIframes();
    });
}

function customIframes() {
  let iframes = document.querySelectorAll('iframe');

  iframes.forEach(iframe => {
    let src = iframe.src;
    if (!src || src === '') {
      src = iframe.dataset.src;
    }

    if (src) {
      const type = videoBlocked(src);
      if (type !== false) {
        const dataVideoBlock = videoToBlock[type];
        const id = getId(src, type);
        let videoUrl, oembedUrl;
        if (dataVideoBlock.video_url !== '' && dataVideoBlock.oembed !== '' && id) {
          videoUrl = dataVideoBlock.video_url.replace('##ID##', id);

          if (videoUrl) {
            oembedUrl = dataVideoBlock.oembed + '?format=json&url=' + encodeURIComponent(videoUrl);

            const options = {
              message: 'oembed',
              options: {
                type: type,
                videoUrl: videoUrl,
                oembedUrl: oembedUrl,
              },
            };

            const callback = response => {
              if (response.data) {
                const oembed = response.data;
                // button
                if (dataVideoBlock.skin) {
                  let skin = dataVideoBlock.skin;

                  let thumb = oembed.thumbnail_url;
                  if (type === 'youtube') {
                    thumb = thumb.replace('hqdefault', 'mqdefault');
                  }
                  // some oembed doesn't provide thumbnail_url
                  if (!thumb && dataVideoBlock.image !== '') {
                    thumb = dataVideoBlock.image.replace('##ID##', id);
                  }

                  let title;
                  if (oembed.title) {
                    title = oembed.title;
                  } else if (type === 'facebook') {
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
                    if (videoUrl.indexOf(dataVideoBlock.embed_url) !== -1) {
                      videoUrl = sanitizeEmbedUrl(videoUrl, true, true);
                      skin = skin.replace('_blank', '_self');
                    }
                    skin = skin.replace('##VIDEO_URL##', videoUrl);
                  }

                  skin = '<style type="text/css">' + style + '</style><div class="lowweb--' + type + '">' + skin + '</div>';

                  let newIframe = document.createElement('iframe');
                  newIframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(skin);

                  for (let i = 0; i < iframe.attributes.length; i++) {
                    let a = iframe.attributes[i];
                    if (a.name !== 'src') {
                      newIframe.setAttribute(a.name, a.value);
                    }
                  }

                  iframe.parentNode.replaceChild(newIframe, iframe);

                  browser.runtime.sendMessage({
                    message: 'logOptimised',
                    data: {
                      type: 'click-to-load',
                      tabId: response.tabId,
                      url: videoUrl,
                    },
                  });
                }
              }
            };

            browser.runtime.sendMessage(options).then(callback, e => {
              console.error('error message click-to-load', e);
            });
          }
        }
      }
    }
  });
}

function videoBlocked(url) {
  const keys = Object.keys(videoToBlock);
  for (const key of keys) {
    if (url.indexOf(videoToBlock[key].embed_url) !== -1) {
      return key;
    }
  }
  return false;
}

function getId(url, type) {
  const u = new URL(url);
  const path = u.origin + u.pathname;

  let id;
  switch (type) {
    case 'youtube':
      id = getYoutubeId(path);
      break;
    case 'vimeo':
      id = getVimeoId(path);
      break;
    case 'dailymotion':
      id = getDailymotionId(path);
      break;
    case 'twitch':
      id = getTwitchId(path);
      break;
    case 'facebook':
      id = getFacebookId(url);
      break;
  }
  return id;
}
