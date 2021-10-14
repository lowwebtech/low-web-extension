let lazyloadSupported = false
if ('loading' in HTMLImageElement.prototype) {
  lazyloadSupported = true
}

/**
 * Lazy load image and iframe medias
 * @return
 */
// TODO: test if loading="lazy" defer the load of assets (not already loaded or currently loading)
// TODO: add option image_lazyload / iframe_lazyload
export default function () {
  if (lazyloadSupported) {
    const imgs = document.querySelectorAll('img')
    imgs.forEach((img) => {
      img.loading = 'lazy'
    })

    const iframes = document.querySelectorAll('iframe')
    iframes.forEach((iframe) => {
      iframe.loading = 'lazy'
    })
  }
}
