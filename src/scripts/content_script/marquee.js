import store from '../store';

export default function() {
  if (store.getters.marquee_animation === 1) {
    // TODO doesn't work on Firefox
    const marquees = document.querySelectorAll('marquee');
    marquees.forEach(marquee => {
      marquee.stop();
    });
  }
}
