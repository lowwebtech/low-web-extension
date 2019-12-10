export function getIdFromEmbed(url) {
  url = url.split('giphy.com/embed/');
  if (url.length > 1) {
    return url[1];
  } else {
    return false;
  }
}
export function getIdFromImage(url) {
  // TODO regex
  url = url.split('.giphy.com/media/');
  if (url.length > 1) {
    if (url[1].indexOf('/giphy.gif') !== -1) {
      return url[1].replace('/giphy.gif', '');
    } else if (url[1].indexOf('/giphy.webp') !== -1) {
      return url[1].replace('/giphy.webp', '');
    }
  } else {
    return false;
  }
}
