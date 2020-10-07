import store from '../store';

/**
 * Stop <marquee> elements
 * @return
 */
export default function () {
  if (store.getters.marquee_animation === 1) {
    const marquees = document.querySelectorAll('marquee');
    marquees.forEach((marquee) => {
      marquee.stop();
    });
  }
}
