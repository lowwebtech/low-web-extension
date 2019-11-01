export default function( url ){
  var regexID = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
  let ids = url.match(regexID)

  if( ids.length > 1 ){
    return ids[1]
    id = ids[1]
  }else{
    return null
  }
}
  