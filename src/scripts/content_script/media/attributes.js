import store from '../../store';

export default function () {
  if (store.getters.media_attributes) {
    // TODO add button play
    const medias = document.querySelectorAll('video,sound');
    medias.forEach((media) => {
      media.setAttribute('preload', 'none');
      media.setAttribute('autoplay', false);
      media.setAttribute('loop', false);
      media.pause();
      // TODO add event and/or timeout to pause
      // temp
      setTimeout(() => {
        media.pause();
      }, 300);
    });
  }
}
