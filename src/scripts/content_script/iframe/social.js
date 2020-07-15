import store from '../../store';
// import urlsToBlock from '../../social-to-block';

export default function () {
  if (store.getters.block_social === 1) {
    customSocial();
  }
}

function customSocial() {
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
        container.textContent = '';
        container.appendChild(img);
      }
    };
    browser.runtime.sendMessage(options).then(callback, (e) => {
      console.error('error message social', e);
    });
  });
}
