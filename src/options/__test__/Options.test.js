import { getBrowser, getPage } from '../../../test/Puppet';
import { goToOptionPage } from '../../../test/utils';
import Vuex from 'vuex';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Options from '../App.vue';

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: "alice"
  },
});
let page, browser;

describe('--------- Options.html', () => {
  describe('------ UNIT ---', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(Options, {
        store,
        localVue,
      });
    });

    it('test ok', () => {
      const input = wrapper.find('.input');
      const select = wrapper.find('select');
      const label = wrapper.find('label');
      const radio = wrapper.find('input[type=radio]');

      expect(input.exists()).toBe(true);
      expect(select.exists()).toBe(true);
      expect(label.exists()).toBe(true);
      expect(radio.exists()).toBe(true);
    });
  });

  describe('--------- functional', () => {
    if (process.env.EXTENSION_INSTALLED !== 'true') {
      it('empty test', async () => {
        expect('').toEqual('');
      });
    }else{
      beforeAll(async () => {
        browser = await getBrowser();
        page = await getPage(browser);

        await goToOptionPage(page);
      });

      afterAll(async () => {
        await browser.close();
      });

      describe('---', () => {
        it('has white background color by default', async () => {
          const bodyColor = await page.$eval('body', (body) => body.style.backgroundColor);
          expect(bodyColor).toEqual('');
        });
      });
    }
  });

});