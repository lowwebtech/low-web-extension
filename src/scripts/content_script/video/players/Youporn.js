// import { getVimeoId } from '../../../utils/get-video-id';
// import VimeoPlayer from './VimeoPlayer'
(function() {
  window.MHP1138.player.onQualityChange = function(e) {
    console.log(window.store.get('player_quality'));
  };
  // setInterval(() => {
  // console.log(window.store)
  // console.log(window.store.get('player_quality'))
  // },1000)
})();
