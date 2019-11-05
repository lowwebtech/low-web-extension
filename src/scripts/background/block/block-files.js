import store from '../../store';
import Blocker from '../Blocker'

export function blockFiles(){

  let action = function(details) {
    let cancel
    switch( details.type ){
      case 'video':
        cancel = store.getters.block_videos
        break;
      case 'font':
        cancel = store.getters.block_fonts
        break;
      case 'image':
      case 'imageset':
        cancel = store.getters.block_images
        break;
      case 'script':
        cancel = store.getters.block_scripts
        break;
      default:
        cancel = 0
        break;
    }

    return {
      cancel: cancel == 1
    }
  }

  Blocker.filterRequest( action )
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