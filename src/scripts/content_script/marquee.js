import store from '../store';

export default function() {
  if (store.getters.marquee_animation === 1) {
    const marquees = document.querySelectorAll('marquee');
    marquees.forEach(marquee => {
      marquee.stop();
    });
  }
}
