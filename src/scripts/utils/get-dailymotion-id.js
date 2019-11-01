export default function getDailyMotionId(url) {

  var m = url.match(/^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?$/);

  if (m !== null) {
    if(m[1] !== undefined) {
      return m[1];
    }
  }
  return null;
  
}