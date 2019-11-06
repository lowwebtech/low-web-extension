// import YoutubePlayer from './YoutubePlayer'

(function(){

  let player = document.getElementById('movie_player') || document.querySelector('.ytp-embed')
  // console.log(player.getAvailableQualityLevels())
  player.setPlaybackQualityRange('tiny')

}())
