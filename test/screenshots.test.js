import { screenshot } from './screenShoter';
import { getBrowser, getPage } from './Puppet';
import { goToOptionPage, goToPopupPage, goToWeb } from './utils';

const urls = {
  social: "https://lowweb.tech/docs/social.html",
  embedvideo: "https://lowweb.tech/docs/embed-video.html",
  giphy: "https://lowweb.tech/docs/giphy.html",
  gif: "https://lowweb.tech/docs/gif.html",

  media: "https://lowweb.tech/docs/media.html",
  srcset: "https://lowweb.tech/docs/srcset.html",
  avatar: "https://lowweb.tech/docs/avatar.html",
  fonts: "https://lowweb.tech/docs/fonts.html",
  animations: "https://lowweb.tech/docs/animations.html",
};

let page, browser;
describe('--------- SCREENSHOTS', () => {
  if (process.env.EXTENSION_INSTALLED !== 'true') {
    it('empty test', async () => {
      expect('').toEqual('');
    });
  } else {
    beforeAll(async () => {
      browser = await getBrowser();
      page = await getPage(browser);

      screenshot.setPage(page);
    });

    afterAll(async () => {
      await browser.close();
    });

    describe('------ ', () => {
      it('popup.html', async () => {
        await goToPopupPage(page);
        return screenshot.takeAndCompare(page, 'popup');
      });
    });
    it('options.html', async () => {
      await goToOptionPage(page);
      return screenshot.takeAndCompare(page, 'option');
    });
    it('kuroneko.io', async () => {
      await goToWeb('https://kuroneko.io', page);
      return screenshot.takeAndCompare(page, 'kuroneko');
    });

    for (const [key, value] of Object.entries(urls)) {
      it(key, async () => {
        await goToWeb(value, page);
        return screenshot.takeAndCompare(page, key);
      });
    }
  }
});
