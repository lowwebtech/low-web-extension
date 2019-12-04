import store from '../../store';
import Blocker from '../Blocker';

export function blockFiles() {
  let action = function(details) {
    let cancel;
    let { type, url } = details;
    switch (type) {
      case 'media':
        cancel = store.getters.block_medias;
        break;
      case 'object':
      case 'object_subrequest':
        cancel = store.getters.block_objects;
        break;
      case 'sub_frame':
        cancel = store.getters.block_subframes;
        break;
      case 'font':
        cancel = store.getters.block_fonts;
        break;
      case 'image':
      case 'imageset':
        cancel = store.getters.block_images;
        break;
      case 'script':
        cancel = store.getters.block_scripts;
        break;
      default:
        cancel = 0;
        break;
    }
    if (cancel) {
      console.warn('blocked', url);
    }
    return {
      cancel: cancel === 1,
    };
  };

  let blockRequest;
  store.watch(
    (state, getters) => getters.isBlockFile,
    (newValue, oldValue) => {
      console.log(`Updating isBlockFile from ${oldValue} to ${newValue}`);
      if (newValue === 0) {
        Blocker.unfilterRequest(blockRequest);
      } else {
        blockRequest = Blocker.filterRequest(action);
      }
    }
  );

  if (store.getters.isBlockFile) {
    blockRequest = Blocker.filterRequest(action);
  }
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
