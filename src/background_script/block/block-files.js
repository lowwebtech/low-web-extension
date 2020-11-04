import store from '../../store';
import { dataTextLink } from '../../utils/data-uri';
import Blocker from '../../controllers/Blocker';

/**
 * Filters and blocks requests by filetype
 * @return {object} webRequest response
 */
// TODO used Request Filetype filters
export function blockFiles() {
  const blockByFiletype = function (details) {
    // console.log(details);
    let cancel = 0;
    let redirect = false;
    const response = {};

    const { type, url, tabId } = details;

    switch (type) {
      case 'media':
        cancel = store.getters.getOption('block_medias', tabId);
        break;
      case 'object':
      case 'object_subrequest':
        cancel = store.getters.getOption('block_objects', tabId);
        break;
      case 'sub_frame':
        if (store.getters.getOption('block_subframes', tabId) === 1) redirect = dataTextLink(url);
        break;
      case 'font':
        // exclude main fonts used for icons
        // TODO external whitelist-icon-font
        if (url.indexOf('fontawesome') === -1 && url.indexOf('fontello') === -1 && url.indexOf('ico') === -1) {
          cancel = store.getters.getOption('block_fonts', tabId);
        }
        break;
      case 'image':
      case 'imageset':
        cancel = store.getters.getOption('block_images', tabId);
        break;
    }

    if (cancel === 1) {
      response.cancel = true;
    }
    if (redirect !== false) {
      response.redirectUrl = redirect;
    }
    // Logger.logBlocked(details, response);

    return response;
  };

  // test if filetype filters are available
  // types : imageset, object_subrequest work only on Firefox
  // const filterTypes = ['media', 'object', 'sub_frame', 'font', 'image', 'imageset', 'object_subrequest'];
  // for (let i = filterTypes.length - 1; i >= 0; i--) {
  //   if (browser.webRequest.ResourceType[filterTypes[i].toUpperCase()] === undefined) {
  //     filterTypes.splice(i, 1);
  //   }
  // }

  Blocker.filterRequest(blockByFiletype, {});
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
