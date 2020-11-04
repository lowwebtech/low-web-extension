<template>
  <div :class="['option', { 'option--active': active }]">
    <div class="input input--level">
      <p class="option__title">Define default mode:</p>

      <!-- <label>
        <button @click="clickMode" value="0">Light</button>
        <button @click="clickMode" value="1">Normal</button>
      </label>
       -->
      <div v-for="mode in modes" :key="'mode' + mode.name">
        <input type="radio" :id="mode.id" name="mode" :value="mode.index" :checked="level === mode.index" @input="updateDefaultMode" />
        <label :for="mode.id">{{ mode.name }}</label>
      </div>
      <!-- <div>
        <input type="radio" id="normal" name="mode" value="1" :checked="level === 1" @input="updateDefaultMode" />
        <label for="normal">Comfort</label>
      </div> -->
    </div>

    <div class="tab">
      <div class="tab__buttons">
        <p class="option__title">Define options by mode:</p>
        <ul class="inline-list">
          <li v-for="mode in modes" :key="'button' + mode.name" :class="['tab__button', { 'tab__button--active': currentTab === mode.index }]">
            <button :id="mode.index" @click="updateTab">{{ mode.name }}</button>
          </li>
        </ul>
      </div>

      <div class="tab__items">
        <div v-for="mode in modes" :key="'tab' + mode.name" class="tab__item">
          <div v-if="currentTab === mode.index">
            <div v-for="input in options" :class="'input input--' + input.id" :key="`input-${mode.name}-${input.id}`">
              <div v-if="input.type && input.id && $store.getters[input.id]">
                <div class="input__text">
                  <p class="input__label" :id="input.id" v-html="input.label"></p>
                  <p class="input__description" v-if="input.description" v-html="input.description"></p>
                </div>

                <div v-if="input.type === 'bool'" class="input__field inline">
                  <label
                    ><input
                      type="radio"
                      :key="`${input.id}-1`"
                      :name="input.id"
                      value="1"
                      :checked="$store.getters[input.id][mode.index] == 1 ? 'checked' : false"
                      @input="onFieldChange"
                    />
                    True</label
                  >
                  <label
                    ><input
                      type="radio"
                      :key="`${input.id}-0`"
                      :name="input.id"
                      value="0"
                      :checked="$store.getters[input.id][mode.index] == 0 ? 'checked' : false"
                      @input="onFieldChange"
                    />
                    False</label
                  >
                </div>

                <div v-if="input.type === 'select'" class="input__field inline">
                  <label>
                    <select :name="input.id" @input="onFieldChange">
                      <option
                        v-for="option in input.options"
                        :value="option.value"
                        :key="`option-${option.value}`"
                        :selected="$store.getters[input.id][mode.index] === option.value ? 'selected' : false"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <button id="save" @click="saveOptions">Save</button> -->
    <div class="status">
      <b>{{ status }}</b>
    </div>
  </div>
</template>

<script>
import options from '../datas/defaultOptions.js';
import { getOptionById } from '../datas/options.js';

// let fields = Object.keys(store.state);
// let jsonFields = options.map((a) => a.id);
let timeout;

export default {
  name: 'App',
  data() {
    return {
      status: '',
      options,
      active: true,
      currentTab: 0,
      modes: [
        {
          id: 'minimalist',
          name: 'Minimalist',
          index: 0,
        },
        {
          id: 'comfort',
          name: 'Comfort',
          index: 1,
        },
      ],
    };
  },
  computed: {
    level: {
      get() {
        return this.$store.state.level;
      },
      // set(value) {
      //   console.log('commit level value', value);
      //   this.$store.commit('level', value);
      //   this.saved();
      // },
    },
  },
  methods: {
    updateDefaultMode(e) {
      this.$store.commit('level', parseInt(e.currentTarget.value));
      this.saved();
    },
    getModelId(id) {
      return id;
    },
    onFieldChange(e) {
      const target = e.currentTarget;
      this.saveOption(target);
    },
    saveOption(target) {
      const id = target.name;
      const option = getOptionById(id);
      const val = parseInt(this.getInputValue(option));
      const values = this.$store.getters[id];
      values[this.currentTab] = val;
      this.$store.commit(id, values);
      this.saved();
    },
    // saveOptions(target) {
    //   for (let i = 0, lg = options.length; i < lg; i++) {
    //     const o = options[i];
    //     const val = this.getInputValue(o);
    //     const values = this.$store.getters[o.id];
    //     values[this.currentTab] = val;
    //     this.$store.commit(o.id, values);
    //   }
    //   this.saved();
    // },
    saved() {
      this.status = 'Options saved.';
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.status = '';
      }, 1500);
    },
    updateTab(e) {
      this.currentTab = parseInt(e.currentTarget.id);
    },
    checkRadioButton(name, value) {
      var radiobuttons = this.$el.querySelectorAll('input[name="' + name + '"]');
      for (let i = 0, lg = radiobuttons.length; i < lg; i++) {
        if (radiobuttons[i].value === value) {
          radiobuttons[i].checked = true;
          i = lg;
        }
      }
    },
    checkSelect(name, value) {
      var select = this.$el.querySelector('select[name="' + name + '"]');
      var options = select.querySelectorAll('option');
      for (let i = 0, lg = options.length; i < lg; i++) {
        if (options[i].value === value) {
          select.selectedIndex = i;
        }
      }
    },
    getInputValue(option) {
      switch (option.type) {
        case 'bool':
          return this.getRadioValue(option.id);
        case 'select':
          return this.getSelectValue(option.id);
      }
    },
    getRadioValue(name) {
      return this.$el.querySelector('input[name="' + name + '"]:checked').value;
    },
    getSelectValue(name) {
      var select = this.$el.querySelector('select[name="' + name + '"]');
      return select.options[select.selectedIndex].value;
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import '../styles/common.scss';

.option {
  width: 960px;
  visibility: hidden;

  &--active {
    visibility: visible;
  }

  &__title {
    margin: 0;
    margin-bottom: 4px;
    font-weight: bold;
    font-size: 16px;
  }

  .input {
    white-space: nowrap;
    padding: 16px 20px;
    border-bottom: 1px solid #bbb;
    &__field {
      width: 210px;
      vertical-align: top;
    }
    &__label {
      font-size: 16px;
      font-weight: bold;
      margin: 0;
    }
    &__text {
      margin: 0;
      display: inline-block;
      width: calc(100% - 210px);
      padding-right: 5%;
      vertical-align: bottom;
      white-space: normal;
    }
    &__description {
      display: inline-block;
      margin: 0;
      position: relative;
      font-size: 14px;
    }
  }
}

.tab {
  &__buttons {
    border: 0 !important;
    padding: 16px 20px 0;
  }
  &__items {
    padding: 0 20px 16px;
  }
  &__item {
    background-color: #eee;
  }
  &__button {
    cursor: pointer;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
    &--active {
      opacity: 1;
      cursor: auto;
    }
  }
}
.button-tab--active {
  opacity: 1;
}
</style>
