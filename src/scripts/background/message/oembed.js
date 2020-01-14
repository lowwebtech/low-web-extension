export function onMessageOEmbed(port) {
  const handleOEmbedMessage = function(request, sender, sendResponse) {
    if (request.message === 'oembed') {
      // TODO cache oembed call
      return fetch(request.options.oembedUrl, { cache: 'force-cache' })
        .then(response => {
          if (!response || response.status !== 200) {
            return true;
          }
          return response.json();
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
