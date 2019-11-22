import store from '../store';

export default function() {
  if (store.state.marquee_animation) {
    const marquees = document.querySelectorAll('marquee');
    marquees.forEach(marquee => {
      marquee.stop();
    });
  }
}
