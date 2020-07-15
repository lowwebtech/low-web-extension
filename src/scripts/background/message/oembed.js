export function onMessageOEmbed(port) {
  const handleOEmbedMessage = function (request, sender, sendResponse) {
    if (request.message === 'oembed') {
      // TODO cache oembed call
      return fetch(request.options.oembedUrl, { cache: 'force-cache' })
        .then((response) => {
          if (!response || response.status !== 200) {
            return true;
          }
          const logDone = (data) => {
            return {
              data: data,
              tabId: sender.tab.id,
            };
          };
          const logFail = (error) => {
            console.warn('oembed error', error);
          };
          return response.json().then(logDone, logFail);
        })
        .catch(function (error) {
          console.warn('oembed error', error);
        });
    }
    return true;
  };
  if (!browser.runtime.onMessage.hasListener(handleOEmbedMessage)) {
    browser.runtime.onMessage.addListener(handleOEmbedMessage);
  }
}
