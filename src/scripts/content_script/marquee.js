import store from '../store';

export default function() {
  if (store.state.marquee_animation) {
    // TODO doesn't work on Firefox
    const marquees = document.querySelectorAll('marquee');
    marquees.forEach(marquee => {
      console.log(marquee);
      marquee.stop();
    });
  }
}
