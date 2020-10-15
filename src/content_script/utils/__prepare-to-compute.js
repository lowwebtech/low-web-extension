import { getRandomId } from '../../utils/get-random-id';

export function prepareForStyleComputing(el, original) {
  let rand = getRandomId();
  el.classList.add('lowweb__compute-styles');
  el.dataset.computeid = rand;

  original.classList.add('lowweb__compute-styles--original');
  original.dataset.computeid = rand;
}
