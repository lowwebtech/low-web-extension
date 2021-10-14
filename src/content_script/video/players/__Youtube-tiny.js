// TODO generate youtube script (Youtube-tiny.js,Youtube-small.js,Youtube-medium.js) from common source
(function () {
  function setQuality () {
    const player = document.getElementById('movie_player') || document.querySelector('.ytp-embed')
    if (player && typeof player.setPlaybackQualityRange === 'function') {
      player.setPlaybackQualityRange('small')
    }
  }
  document.body.addEventListener('yt-navigate-finish', (event) => {
    setQuality()
  })
  setQuality()
})()
