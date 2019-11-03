export default function getVimeoId(url) {

  var result = url.match(/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i);
  
  if( result.length > 1 ){
    return result[1]
  }else{
    return null
  }
}