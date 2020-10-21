import { localOption } from '../../utils/get-local-options';

/**
 * add attributes to <video> and <audio> to reduce loading and use of these medias
 * @return
 */
export default function () {
  localOption('media_attributes').then((value) => {
    if (value === 1) {
      const medias = document.querySelectorAll('video, audio');

      medias.forEach((media) => {
        media.setAttribute('preload', 'none');
        media.setAttribute('autoplay', false);
        media.setAttribute('loop', false);
        media.pause();

        // pause media after a delay to block medias launched after DOMloaded
        // TODO watch dom, and add event and/or timeout to pause
        setTimeout(() => {
          media.pause();
        }, 500);
      });
    }
  });
}
