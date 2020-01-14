import store from '../../store';
import { watchFilter } from '../../store/watch';
import { dataTextLink } from '../../utils/data-uri';
// import Logger from '../Logger';

export function blockFiles() {
  let action = function(details) {
    let cancel = 0;
    let redirect = false;
    let response = {};

    const { type, url } = details;
    switch (type) {
      case 'media':
        cancel = store.getters.block_medias;
        break;
      case 'object':
      case 'object_subrequest':
        cancel = store.getters.block_objects;
        break;
      case 'sub_frame':
        // cancel = store.getters.block_subframes;
        if (store.getters.block_subframes === 1) redirect = dataTextLink(url);
        break;
      case 'font':
        // exclude main font icons
        if (url.indexOf('fontawesome') === -1 && url.indexOf('fontello') === -1 && url.indexOf('icon') === -1) {
          cancel = store.getters.block_fonts;
        }
        break;
      case 'image':
      case 'imageset':
        cancel = store.getters.block_images;
        // if (store.getters.block_images === 1) redirect = dataImage();
        break;
      case 'script':
        cancel = store.getters.block_scripts;
        break;
    }
    if (cancel === 1) {
      response.cancel = true;
    }
    if (redirect !== false) {
      // response.cancel = true;
      response.redirectUrl = redirect;
    }
    // Logger.logRequest(details, response);
    return response;
  };

  watchFilter('isBlockFile', action);
}

// TODO look at those types
/*
https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/ResourceType
beacon
csp_report
font
image
imageset
main_frame
media
object
object_subrequest
ping
script
speculative
stylesheet
sub_frame
web_manifest
websocket
xbl
xml_dtd
xmlhttprequest
xslt
other
*/
