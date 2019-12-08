export function onMessageOEmbed(port) {
  const handleOEmbedMessage = function(request, sender, sendResponse) {
    if (request.message === 'oembed') {
      fetch(request.options.oembedUrl)
        .then(res => {
          return res.json();
        })
        .then(json => {
          // TODO return promise
          sendResponse(json);
        })
        .catch(function(error) {
          console.log('oembed error', error);
        });
    }
    return true;
  };
  browser.runtime.onMessage.addListener(handleOEmbedMessage);
}
