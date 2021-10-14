export function isLazyload (img) {
  if (img.dataset && (img.dataset.src || img.dataset.srcset)) {
    return true
  } else if (img.getAttribute('class') && img.getAttribute('class').indexOf('lazy')) {
    return true
  }

  // find a dataset params containing 'lazy'
  if (img.dataset) {
    const datasetKeys = Object.keys(img.dataset)
    if (datasetKeys.length > 0) {
      const lazyKey = datasetKeys.find((key) => key.indexOf('lazy') !== 1)
      console.log('----------------------', lazyKey)
      if (lazyKey) {
        return true
      }
    }
  }

  // opinionated : img without a src is surely a lazyloaded image
  if (!img.src) {
    return true
  }

  return false
}
