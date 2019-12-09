export function onMessageOEmbed(port) {
  const handleOEmbedMessage = function(request, sender, sendResponse) {
    if (request.message === 'oembed') {
      return fetch(request.options.oembedUrl)
        .then(res => {
          return res.json();
        })
        .catch(function(error) {
          console.error('oembed error', error);
        });
    } else {
      return true;
    }
  };
  browser.runtime.onMessage.addListener(handleOEmbedMessage);
}
