import store from '../../store';

export default function() {
  if (store.getters.video_attributes) {
    // TODO add button play
    let videos = document.querySelectorAll('video');
    videos.forEach(item => {
      // item.parentNode.removeChild(item)
      item.setAttribute('preload', 'none');
      item.removeAttribute('autoplay');
      item.removeAttribute('loop');
    });
  }
}
