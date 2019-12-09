import store from '../../store';
// import urlsToBlock from '../../social-to-block';

export default function() {
  if (store.getters.block_social === 1) {
    // removeSocialIframes();
    // removeSocialScripts();
    customSocial();
  }
}

function customSocial() {
  const instagramEmbeds = document.querySelectorAll('blockquote.instagram-media');
  instagramEmbeds.forEach(embed => {
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
    const callback = function(res) {
      if (res && res.thumbnail_url) {
        const img = document.createElement('img');
        img.style.width = '100%';
        img.style.height = 'auto';
        img.src = res.thumbnail_url;
        const container = embed.querySelector('a');
        container.textContent = '';
        container.appendChild(img);
      }
    };
    browser.runtime.sendMessage(options).then(callback, e => {
      console.error('error message social');
      console.error(e);
    });
  });
}
// function removeSocialIframes() {
//   const iframes = document.querySelectorAll('iframe');
//   iframes.forEach((iframe, index) => {
//     let src = iframe.src;
//     if (src && socialBlocked(src)) {
//       iframe.parentNode.removeChild(iframe);
//     }
//   });
// }
// function removeSocialScripts() {
//   let scripts = document.querySelectorAll('script');
//   scripts.forEach((script, index) => {
//     let src = script.src;
//     if (src && socialBlocked(src)) {
//       script.parentNode.removeChild(script);
//     } else {
//       for (let i = 0, lg = urlsToBlock.length; i < lg; i++) {
//         if (script.innerText.indexOf(urlsToBlock[i]) !== -1) {
//           script.parentNode.removeChild(script);
//         }
//       }
//     }
//   });
// }
// function socialBlocked(url) {
//   for (let i = 0, lg = urlsToBlock.length; i < lg; i++) {
//     if (window.location.hostname.indexOf(urlsToBlock[i][1]) === -1 && url.indexOf(urlsToBlock[i][0]) !== -1) {
//       return true;
//     }
//   }
//   return false;
// }
