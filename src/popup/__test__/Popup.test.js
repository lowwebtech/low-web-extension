/* eslint-disable no-undef */
import { screenShoter } from '../../../test/screenShoter';
const fs = require('fs');
// const PNG = require('pngjs').PNG;
const puppeteer = require('puppeteer');
const path = require('path');

const withExtension = true;
const pathToExtension = require('path').join(path.join(__dirname, '..', '..', '..', 'dist'));
const puppeteerArgs = [];
if ( withExtension ){
  puppeteerArgs.push(`--disable-extensions-except=${pathToExtension}`, `--load-extension=${pathToExtension}`, '--show-component-extension-options');
}

let page, browser;
describe('--------- Popup.html', () => {
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

  describe('------ INTEGRATION', () => {

    describe('--- screenshots', () => {
      if (withExtension) {
        it('popup screenshot is equal to original', async () => {
          return screenShoter.takeAndCompare(page, 'popup.test');
        });
      }

      // it('kuroneko', async () => {
      //   await goToWeb('https://kuroneko.io/en/');
      //   await page.reload();
      //   return screenShoter.takeAndCompare(page, 'kuroneko');
      // });
    });

    if (withExtension) {
      describe('--- functional', () => {
        it('has white background color by default', async () => {
          const bodyColor = await page.$eval('body', (body) => body.style.backgroundColor);
          expect(bodyColor).toEqual('');
        });

        it('finds 2 checkboxes', async () => {
          const cbs = await page.$$eval('input[type="checkbox"]', (checkboxes) => checkboxes);
          expect(cbs).toHaveLength(2);
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
      });
    }
  });
});

async function goToPopupPage() {
  const extensionId = 'aliphkafmeldgkmmjlhgpbleaicgbamj';
  const chromeExtPath = `chrome-extension://${extensionId}/popup/popup.html`;
  await goTo(chromeExtPath, { waitUntil: 'domcontentloaded' });
}
async function goToWeb(url) {
  await goTo(url, { waitUntil: 'domcontentloaded' });
}
async function goTo(to, opts) {
  await page.goto(to, opts);
  await page.reload();
}
