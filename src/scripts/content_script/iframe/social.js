import DOMPurify from 'dompurify';
import store from '../../store';
// import urlsToBlock from '../../social-to-block';

/**
 * Used to load datas from oEmbed APis and customize social embeds
 */
export default function () {
  if (store.getters.block_social === 1) {
    customInstagram();
  }
}

/**
 * This function is used to retrieve the url of an image from an Instagram embed.
 * A call to the background_script (message) made to retrieve the image url from the Instagram API.
 *
 * The original Instagram embed loads a script to retrieve this image url and also loads a whole bunch of tracker...
 */
function customInstagram() {
  const instagramEmbeds = document.querySelectorAll('blockquote.instagram-media');

  instagramEmbeds.forEach((embed) => {
    const url = new URL(embed.querySelector('a').href);
    const embedUrl = url.origin + url.pathname;
    const oembedUrl = 'https://api.instagram.com/oembed?format=json&url=' + encodeURIComponent(embedUrl);

    const options = {
      message: 'oembed',
      options: {
        type: 'instagram',
        oembedUrl: oembedUrl,
      },
    };

    const callback = function (res) {
      if (res && res.data.thumbnail_url) {
        const img = document.createElement('img');
        img.style.width = '100%';
        img.style.height = 'auto';
        img.src = res.data.thumbnail_url;
        const container = embed.querySelector('a');
        // container.textContent = '';
        // container.appendChild(img);
        container.innerHTML = DOMPurify.sanitize(img);
      }
    };
    browser.runtime.sendMessage(options).then(callback, (e) => {
      console.error('error message social', e);
    });
  });
}
