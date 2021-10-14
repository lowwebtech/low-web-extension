import { localOption } from '../utils/get-local-options'

/**
 * Stop <marquee> elements
 * @return
 */
export default function () {
  localOption('css_animation').then((value) => {
    if (value === 1) {
      const marquees = document.querySelectorAll('marquee')
      marquees.forEach((marquee) => {
        marquee.stop()
      })
    }
  })
}
