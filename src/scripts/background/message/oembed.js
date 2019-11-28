export function onMessageOEmbed(port) {
  port.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'oembed') {
      fetch(request.options.oembedUrl)
      .then(res => {
        return res.json();
      })
      .then(json => {
        sendResponse(json);
      })
      .catch(function(error) {
        console.log('oembed error', error);
      });
    }
    return true;
  });
}
