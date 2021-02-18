import { LOWWEB } from '../datas/constants';

export function isWebpageUrl(url) {
  return url && url.startsWith('http');
}
export function addLowwebParam(url) {
  // TODO check url valid
  const newUrl = new URL(url);
  if (newUrl && newUrl.searchParams) {
    addLowwebSearchParam(newUrl.searchParams);
    return newUrl.href;
  } else {
    console.error(url);
    return url;
  }
}
export function addLowwebSearchParam(searchParams) {
  if (searchParams && searchParams.append) {
    searchParams.append('lowweb', LOWWEB);
    return searchParams;
  } else {
    console.error(searchParams);
  }
}
export function hasLowwebParam(url) {
  return url.indexOf(LOWWEB) !== -1;
}
