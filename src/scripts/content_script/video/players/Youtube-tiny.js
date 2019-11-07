// TODO generate youtube script (Youtube-tiny.js,Youtube-small.js,Youtube-medium.js) from common source
(function(){
  let player = document.getElementById('movie_player') || document.querySelector('.ytp-embed')
  if( player ){
    // TODO check getAvailableQualityLevels() 
    player.setPlaybackQualityRange( 'tiny' ) 
  }
}())
