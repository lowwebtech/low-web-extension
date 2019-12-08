<template>
  <div class="popup">

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
  },
  mounted() {
    
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
</style>
