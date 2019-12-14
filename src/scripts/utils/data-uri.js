export function dataTextLink(url) {
  const link = `<a href="${url}">${url}</a>`;
  return 'data:text/html;charset=utf-8,<style>body{background:white;}</style>' + encodeURIComponent(link);
}
export function dataImage() {
  return browser.runtime.getURL('images/1x1-black.gif');
}
