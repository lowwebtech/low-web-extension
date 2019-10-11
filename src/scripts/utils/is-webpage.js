export default function isWebpageUrl( url ){
  var re = new RegExp("^(http|https)://", "i");
  return re.test(url);
}