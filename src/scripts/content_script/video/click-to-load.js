import DOMPurify from 'dompurify';
// import './click-to-load.scss';
import store from '../../store';
import videoToBlock from '../../datas/video-to-block';
import sanitizeEmbedUrl from '../../utils/sanitize-embed-video-url';
import { getYoutubeId, getDailymotionId, getFacebookId, getVimeoId, getTwitchId } from '../../utils/get-video-id';

let style;
let selectorString = '';
const keys = Object.keys(videoToBlock);
for (const key of keys) {
  selectorString += 'iframe[src*="' + videoToBlock[key].embed_url + '"],';
}
if (selectorString !== '') {
  selectorString = selectorString.slice(0, -1);
}

export default function () {
  if (store.getters.video_clicktoload === 1) {
    const iframes = document.querySelectorAll(selectorString);
    if (iframes.length > 0) {
      loadStyles();
    }

    const onEmbedVideoBlocked = (request, sender, sendResponse) => {
      if (request.message === 'embedVideoBlocked') {
        if (style) {
          customizeIframes();
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
    .then(function (response) {
      if (!response || response.status !== 200) {
        return true;
      }
      return response.text();
    })
    .then((css) => {
      style = css;
      customizeIframes();
    });
}

function customizeIframes() {
  const iframes = document.querySelectorAll(selectorString);
  const customIframes = [];
  iframes.forEach((iframe) => {
    const customIframe = new CustomIframe(iframe);
    customIframes.push(customIframe);
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

class CustomIframe {
  constructor(el) {
    this.el = el;

    let src = el.src;
    if (!src || src === '') {
      src = el.dataset.src;
    }

    if (src) {
      this.type = videoBlocked(src);
      if (this.type !== false) {
        this.dataVideoBlock = videoToBlock[this.type];
        const id = getId(src, this.type);

        if (this.dataVideoBlock.video_url !== '' && this.dataVideoBlock.oembed !== '' && id) {
          this.videoUrl = this.dataVideoBlock.video_url.replace('##ID##', id);

          if (this.videoUrl) {
            const oembedUrl = this.dataVideoBlock.oembed + '?format=json&url=' + encodeURIComponent(this.videoUrl);

            const options = {
              message: 'oembed',
              options: {
                type: this.type,
                videoUrl: this.videoUrl,
                oembedUrl: oembedUrl,
              },
            };

            browser.runtime.sendMessage(options).then(
              (e) => this.onOEmbed(e),
              (e) => {
                console.error('error message click-to-load', e);
              }
            );
          }
        }
      }
    }
  }

  onOEmbed(response) {
    if (response && response.data) {
      if (this.dataVideoBlock.skin) {
        // test parentNode, iframe may be removed from the dom
        if (this.el && this.el.parentNode) {
          const oembedData = response.data;
          const id = getId(this.el.src, this.type);

          let skin = this.dataVideoBlock.skin;

          let title;
          if (oembedData.title) {
            title = oembedData.title;
          } else if (this.type === 'facebook') {
            const parser = new DOMParser();
            const html = parser.parseFromString(oembedData.html, 'text/html');
            const t = html.querySelector('blockquote > a');
            if (t) {
              title = t.textContent;
            }
          }
          if (title) {
            skin = skin.replace('##TITLE##', title);
          }

          if (oembedData.description) {
            skin = skin.replace('##DESCRIPTION##', oembedData.description);
          }

          if (oembedData.author_name) {
            skin = skin.replace('##AUTHOR##', oembedData.author_name);
          }

          let thumb = oembedData.thumbnail_url;
          if (this.type === 'youtube') {
            thumb = thumb.replace('hqdefault', 'mqdefault');
          }
          // some oembed doesn't provide thumbnail_url
          if (!thumb && this.dataVideoBlock.image !== '') {
            thumb = this.dataVideoBlock.image.replace('##ID##', id);
          }
          if (thumb) {
            skin = skin.replace('##IMAGE##', '<img src="' + thumb + '" />');
          }

          if (this.videoUrl) {
            if (this.videoUrl.indexOf(this.dataVideoBlock.embed_url) !== -1) {
              this.videoUrl = sanitizeEmbedUrl(this.videoUrl, true, true);
              skin = skin.replace('_blank', '_self');
            }
            skin = skin.replace('##VIDEO_URL##', this.videoUrl);
          }

          skin =
            '<style type="text/css">' +
            DOMPurify.sanitize(style) +
            '</style><div class="lowweb--' +
            DOMPurify.sanitize(this.type) +
            '"><div>' +
            DOMPurify.sanitize(skin) +
            '</div></div>';

          const newIframe = document.createElement('iframe');
          newIframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(skin);

          for (let i = 0; i < this.el.attributes.length; i++) {
            const a = this.el.attributes[i];
            if (a.name !== 'src') {
              newIframe.setAttribute(a.name, a.value);
            }
          }

          this.el.parentNode.replaceChild(newIframe, this.el);

          browser.runtime.sendMessage({
            message: 'logOptimised',
            data: {
              type: 'click-to-load',
              tabId: response.tabId,
              url: this.videoUrl,
            },
          });
        }
      }
    }
  }
}
