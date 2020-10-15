import Vuex from 'vuex'
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Options from "./../src/options/App.vue";

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: "alice"
  }
})

describe('Options', () => 
  
  describe('initial state', () => {
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
});