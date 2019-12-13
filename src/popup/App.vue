<template>
  <div class="popup">

    <div class="input input--checkbox input--page">
      <p class="input__label">Current page</p>
      <input type="checkbox" v-model="current_page" name="current_page" id="current_page" />
      <label for="current_page">Current page</label>
    </div>

    <div class="input input--level">
      <p class="input__label">Presets</p>
      <label>
        <select v-model="level" name="level">
          <option value="0">Hardcore</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
        </select>
      </label>
    </div>

    <a href="" @click.prevent="openOptions">more options</a>
  </div>
</template>
<script>
/* eslint-disable import/first, indent */
global.browser = require('webextension-polyfill');
import store from '../scripts/store';
/* eslint-enable import/first, indent */

export default {
  data() {
    return {
      active: this.$store.state.active,
    };
  },
  computed: {
    level: {
      get () {
        return this.$store.state.level;
      },
      set (value) {
        this.$store.commit('level', value);
      }
    },
    level: {
      get () {
        return this.$store.state.level;
      },
      set (value) {
        this.$store.commit('level', value);
      }
    },
  },
  mounted() {
    console.log('mounted popup')
    console.log(window.location.url)
    console.log(window.location.url)
  },
  methods: {
    openOptions(){
      browser.runtime.openOptionsPage(); // .then(onOpened, onError)
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/options.scss";
.popup{
  width: 200px; 
  .input__label{
    width: 80px;
  }
}

.input{
  &--checkbox{
    input[type=checkbox]{
      height: 0;
      width: 0;
      visibility: hidden;
    }

    label {
      cursor: pointer;
      text-indent: -9999px;
      width: 30px;
      height: 17px;
      background: grey;
      display: block;
      border-radius: 17px;
      position: relative;
    }

    label:after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 11px;
      height: 11px;
      background: #fff;
      border-radius: 11px;
      // transition: 0.3s;
    }

    input:checked + label {
      background: #bada55;
    }

    input:checked + label:after {
      left: calc(100% - 2px);
      transform: translateX(-100%);
    }

    label:active:after {
      width: 13px;
    }
  }
}
</style>
