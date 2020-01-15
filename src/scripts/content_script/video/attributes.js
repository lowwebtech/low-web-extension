import store from '../../store';

export default function() {
  if (store.getters.video_attributes) {
    // TODO add button play
    let videos = document.querySelectorAll('video');
    videos.forEach(item => {
      item.setAttribute('preload', 'none');
      item.setAttribute('autoplay', false);
      item.setAttribute('loop', false);
      item.pause();
      // TODO add event and/or timeout to pause
    });
  }
}
