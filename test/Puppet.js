const puppeteer = require('puppeteer');
const path = require('path');

const pathToExtension = require('path').join(path.join(__dirname, '..', 'dist'));
const puppeteerArgs = [];

if (process.env.EXTENSION_INSTALLED === 'true') {
  puppeteerArgs.push(`--disable-extensions-except=${pathToExtension}`, `--load-extension=${pathToExtension}`, '--show-component-extension-options');
}

export async function getBrowser() {
  return await puppeteer.launch({
    headless: false,
    slowMo: 250,
    devtools: true,
    args: puppeteerArgs,
  });
}

export async function getPage(browser) {
  return await browser.newPage();
}
