export function onMessageOEmbed(port) {
  const handleOEmbedMessage = function(request, sender, sendResponse) {
    if (request.message === 'oembed') {
      // TODO cache oembed call
      return fetch(request.options.oembedUrl, {cache: "force-cache"})
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
  console.log('addListener handleOEmbedMessage', browser.runtime.onMessage.hasListener(handleOEmbedMessage));
  if (!browser.runtime.onMessage.hasListener(handleOEmbedMessage)) {
    browser.runtime.onMessage.addListener(handleOEmbedMessage);
  }
}
