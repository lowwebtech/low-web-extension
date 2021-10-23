import { getBrowser, getPage } from '../../../test/Puppet'
import { goToPopupPage } from '../../../test/utils'

let page, browser
describe('--------- Popup.html', () => {
  if (process.env.EXTENSION_INSTALLED !== 'true') {
    it('empty test', async () => {
      expect('').toEqual('')
    })
  } else {
    beforeAll(async () => {
      browser = await getBrowser()
      page = await getPage(browser)

      await goToPopupPage(page)
    })

    afterAll(async () => {
      await browser.close()
    })

    describe('--- functional', () => {
      it('has white background color by default', async () => {
        const bodyColor = await page.$eval('body', (body) => body.style.backgroundColor)
        expect(bodyColor).toEqual('')
      })

      it('finds 2 checkboxes', async () => {
        const cbs = await page.$$eval('input[type="checkbox"]', (checkboxes) => checkboxes)
        expect(cbs).toHaveLength(2)
      })

      it('changes background-color checkboxes after click', async () => {
        const bgColors = await page.$$eval('input[type=checkbox]', (radios) =>
          radios.map((radio, index) => {
            const label = radio.parentNode.querySelector('label')
            if (index === 0) label.click()
            const style = window.getComputedStyle(label)
            return style.backgroundColor
          })
        )
        expect(bgColors).toEqual(['rgb(128, 128, 128)', 'rgb(97, 211, 22)'])
      })
    })
  }
})
