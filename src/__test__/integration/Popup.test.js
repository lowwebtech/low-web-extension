/* eslint-disable no-undef */
const fs = require('fs');
const PNG = require('pngjs').PNG;
const puppeteer = require('puppeteer');
const path = require('path');
// const { startServers } = require('polyserve');
const pixelmatch = require('pixelmatch');
const pathToExtension = require('path').join(path.join(__dirname, '..', '..', '..', 'dist'));

const puppeteerArgs = [`--disable-extensions-except=${pathToExtension}`, `--load-extension=${pathToExtension}`, '--show-component-extension-options'];
const testDir = './test/screenshots';

let page, browser;
describe('Popup page', () => {
  // This is ran when the suite starts up.
  // before(async () => {
  // });

  if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);
  if (!fs.existsSync(`${testDir}/original`)) fs.mkdirSync(`${testDir}/original`);
  if (!fs.existsSync(`${testDir}/new`)) fs.mkdirSync(`${testDir}/new`);

  beforeAll(async () => {
    // This is where you would substitute your python or Express server or whatever.
    // polyserve = await startServers({ port: 4000 });

    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      devtools: true,
      args: puppeteerArgs,
    });

    page = await browser.newPage();
    await gotoPopupPage();
    await page.reload();
    await page.setViewport({ width: 800, height: 600 });
  });

  // beforeAll(async () => {
    
  // });

  afterAll(async () => {
    // await polyserve.close();
    await browser.close();
  });

  describe('--- screenshots', () => {
    // beforeEach(async () => {
    //   await gotoPopupPage();
    // });

    // it('original popup', async () => {
    //   await page.screenshot({ path: './test/screenshots/original/popup.test.png' }).then((screenshot) => {
    //     console.log('screenshot', screenshot.length);
    //   });
    // });
    it('popup screenshot is equal to original', async () => {
      return takeAndCompareScreenshot(page, 'popup.test');
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

async function gotoPopupPage() {
  const extensionId = 'aliphkafmeldgkmmjlhgpbleaicgbamj'; // For ease, place this in the env variables
  const chromeExtPath = `chrome-extension://${extensionId}/popup/popup.html`;
  await page.goto(chromeExtPath, { waitUntil: 'domcontentloaded' });
}
async function takeAndCompareScreenshot(page, fileName) {
  await page.screenshot({ path: `${testDir}/new/${fileName}.png` });
  return compareScreenshots(fileName);
}
function compareScreenshots(fileName) {
  return new Promise((resolve, reject) => {
    const img1 = fs.createReadStream(`${testDir}/new/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);
    const img2 = fs.createReadStream(`${testDir}/original/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);

    let filesRead = 0;
    function doneReading() {
      if (++filesRead < 2) return;

      expect(img1.width).toEqual(img2.width);
      expect(img1.height).toEqual(img2.height);

      const diff = new PNG({ width: img1.width, height: img2.height });
      const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.1 });
      expect(numDiffPixels).toEqual(0);

      resolve();
    }
  });
}