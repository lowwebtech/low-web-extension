export const imageFallback = 'images/1x1-black.gif'
export function dataTextLink (url) {
  const link = `<a href="${url}" target="_blank">${url}</a>`
  return 'data:text/html;charset=utf-8,<style>body{background:white;}</style>' + encodeURIComponent(link)
}
export function dataImage () {
  return browser.runtime.getURL(imageFallback)
}
