/* eslint-disable no-undef */
import { screenShoter } from '../screenShoter';
const fs = require('fs');
// const PNG = require('pngjs').PNG;
const puppeteer = require('puppeteer');
const path = require('path');

const pathToExtension = require('path').join(path.join(__dirname, '..', '..', '..', 'dist'));
const puppeteerArgs = [`--disable-extensions-except=${pathToExtension}`, `--load-extension=${pathToExtension}`, '--show-component-extension-options'];

let page, browser;
describe('Popup page', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      devtools: true,
      args: puppeteerArgs,
    });

    page = await browser.newPage();
    screenShoter.setPage(page);

    await goToPopupPage();
    // await goToWeb('https://kuroneko.io/en/');
  });

  afterAll(async () => {
    // await polyserve.close();
    await browser.close();
  });

  describe('--- screenshots', () => {
    // beforeEach(async () => {
    //   await goToPopupPage();
    // });

    // it('original popup', async () => {
    //   await page.screenshot({ path: './test/screenshots/original/popup.test.png' }).then((screenshot) => {
    //     console.log('screenshot', screenshot.length);
    //   });
    // });
    it('popup screenshot is equal to original', async () => {
      return screenShoter.takeAndCompare(page, 'popup.test');
    });
    it('kuroneko', async () => {
      await goToWeb('https://kuroneko.io/en/');
      await page.reload();
      return screenShoter.takeAndCompare(page, 'kuroneko');
    });
  });

  describe('--- functional', () => {
    it('has white background color by default', async () => {
      const bodyColor = await page.$eval('body', (body) => body.style.backgroundColor);
      expect(bodyColor).toEqual('');
    });

    it('changes background-color checkboxes after click', async () => {
      const bgColors = await page.$$eval('input[type=checkbox]', (radios) =>
        radios.map((radio, index) => {
          const label = radio.parentNode.querySelector('label');
          if (index === 0) label.click();
          var style = window.getComputedStyle(label);
          return style.backgroundColor;
        })
      );

      expect(bgColors).toEqual(['rgb(128, 128, 128)', 'rgb(97, 211, 22)']);
    });
    //
    // it('changes the background color on click', async () => {
    //   const bodyColors = await page.$$eval(
    //     '.popup-body-color-radios input[type="radio"]',
    //     radios =>
    //       radios.map(radio => {
    //         radio.click();
    //         return document.querySelector('body').style.backgroundColor;
    //       })
    //   );

    //   expect(bodyColors).toEqual(
    //     [ 'rgb(191, 231, 197)', 'rgb(201, 218, 248)', 'rgb(244, 238, 188)'],
    //   );
    // });

    it('finds 2 checkboxes', async () => {
      const checkboxes = await page.$$eval('input[type="checkbox"]', checkboxes => checkboxes);

      expect(checkboxes).toHaveLength(2);
    });
  });

  // * NOT DO-ABLE YET *
  // Existing tools don't allow us to do this in this way yet.

  /* *** *** ***
  describe("when 'Do the magic!' button is clicked", () => {
    it('sends message to content script', async () => {
      // CLICK the button that triggers the sendMessage
      await page.click('#do-the-magic-btn');
      // expect the sendMessage was triggered
      /////////////////////////
      // it's not actually working because we can't load the content script here,
      // due to that, the communication between content script & popup is broken
      // and send message doesn't work.
      /////////////////////////
      expect(chrome.tabs.sendMessage).toHaveBeenCalled();
      // expect the sendMessage was triggered with some specific values
      /////////////////////////
      // it's not actually working because we can't load the content script here,
      // due to that, the communication between content script & popup is broken
      // and send message doesn't work.
      /////////////////////////
      expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(
        expect.any(Number),
        {
          msg: { action: "print_in_console" }
        }
      );
    });
  });
  *** *** *** */
});

async function goToPopupPage() {
  const extensionId = 'aliphkafmeldgkmmjlhgpbleaicgbamj'; // For ease, place this in the env variables
  const chromeExtPath = `chrome-extension://${extensionId}/popup/popup.html`;
  await goTo(chromeExtPath, { waitUntil: 'domcontentloaded' });
}
async function goToWeb(url){
  await goTo(url, { waitUntil: 'domcontentloaded' });
}
async function goTo(to, opts){
  await page.goTo(to, opts);
  await page.reload();
  await page.setViewport({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT });
}