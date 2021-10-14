// TODO generate youtube script (Youtube-small.js,Youtube-medium.js,Youtube-large.js) from common source
(function () {
  function setQuality () {
    const player = document.getElementById('movie_player') || document.querySelector('.ytp-embed')
    if (player && typeof player.setPlaybackQualityRange === 'function') {
      player.setPlaybackQualityRange('large')
    }
  }
  document.body.addEventListener('yt-navigate-finish', (event) => {
    setQuality()
  })
  setQuality()
})()
