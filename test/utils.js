
const extensionId = 'aliphkafmeldgkmmjlhgpbleaicgbamj';
const chromeExtPath = `chrome-extension://${extensionId}/`;
export async function goToOptionPage(page) {
  const path = chromeExtPath + 'options.html';
  await goTo(path, page);
}
export async function goToPopupPage(page) {
  const path = chromeExtPath + 'popup.html';
  await goTo(path, page);
}
export async function goToWeb(url, page) {
  await goTo(url, page);
}
export async function goTo(to, page) {
  await page.goto(to, { waitUntil: 'domcontentloaded' });
  await page.reload();
}
