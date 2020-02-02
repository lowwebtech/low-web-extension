import store from '../store';
import knownRedirects from '../datas/known-to-redirect';

export default function() {
  if (store.getters.website_specific > 0) {
    for (const knownRedirect of knownRedirects) {
      browser.webRequest.onBeforeRequest.addListener(
        details => {
          const { url } = details;
          const response = {};
          // eslint-disable-next-line
          // dance:

          // for (const redirect of knownRedirect.files) {
          //   for (const redirectUrl of redirect) {
          //     if (url.indexOf(redirectUrl) !== -1) {
          //       response.redirectUrl = url.replace(redirectUrl, redirect.to);
          //       break dance;
          //     }
          //   }
          // }
          for (let i = 0, lg = knownRedirect.files.length; i < lg; i++) {
            const redirect = knownRedirect.files[i];
            for (let j = 0, lgj = redirect.from.length; j < lgj; j++) {
              const redirectUrl = redirect.from[j];
              if (url.indexOf(redirectUrl) !== -1) {
                response.redirectUrl = url.replace(redirectUrl, redirect.to);
                j = lgj;
                i = lg;
              }
            }
          }
          return response;
        },
        knownRedirect.filters,
        ['blocking']
      );
    }
  }
}
