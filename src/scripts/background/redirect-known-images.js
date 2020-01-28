import knownReplaces from '../datas/known-to-replace';

export default function() {
  for (let i = 0, lg = knownReplaces.length; i < lg; i++) {
    let replaceElement = knownReplaces[i];

    browser.webRequest.onBeforeRequest.addListener(
      details => {
        const { url } = details;
        let newUrl = url;

        const find = replaceElement.find;
        for (let j = 0, lgj = find.length; j < lgj; j++) {
          if (newUrl.indexOf(find[j]) !== -1) {
            newUrl = newUrl.replace(find[j], replaceElement.to);
            break;
          }
        }

        const response = {};
        if (url !== newUrl) response.redirectUrl = newUrl;
        return response;
      },
      replaceElement.filters,
      ['blocking']
    );
  }
}
