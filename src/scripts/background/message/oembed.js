export function onMessageOEmbed(port) {
  const handleOEmbedMessage = function(request, sender, sendResponse) {
    if (request.message === 'oembed') {
      // TODO cache oembed call
      return fetch(request.options.oembedUrl, { cache: 'force-cache' })
        .then(res => {
          if (res.status === '200') {
            return res.json();
          }
          return true;
        })
        .catch(function(error) {
          console.error('oembed error', error);
        });
    } else {
      return true;
    }
  };
  if (!browser.runtime.onMessage.hasListener(handleOEmbedMessage)) {
    browser.runtime.onMessage.addListener(handleOEmbedMessage);
  }
}
