// TODO generate youtube script (Youtube-tiny.js,Youtube-small.js,Youtube-medium.js) from common source
(function(){

  function setQuality(){

    let player = document.getElementById('movie_player') || document.querySelector('.ytp-embed')
    if( player ){
      player.setPlaybackQualityRange( 'medium' ) 
    }

  }
  
  document.body.addEventListener("yt-navigate-finish", (event)=>{
    setQuality()
  });

  setQuality()
  
}())