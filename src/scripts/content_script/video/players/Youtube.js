// import YoutubePlayer from './YoutubePlayer'

(function(){

  if( store.state.video_quality > 0 ){

    let player = document.getElementById('movie_player') || document.querySelector('.ytp-embed')
    
    if( player ){
      
      let q
      // TODO check getAvailableQualityLevels() 
      switch( store.this.state.video_quality ){
        case 1:
          q = 'tiny'
          break;
        case 2:
          q = 'small'
          break;
        case 3:
          q = 'medium'
          break;
      }

      player.setPlaybackQualityRange( q ) 

    }
     
  }

}())
