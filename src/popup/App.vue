<template>
  <div class="popup">

    <div class="input input--checkbox input--page">
      <p class="input__label">Page activated:</p>
      <input type="checkbox" :checked="currentPage" @input="updateCurrentPage" name="currentPage" id="currentPage" />
      <label for="currentPage">
        <span class="yes" v-if="currentPage">Yes</span>
        <span class="no" v-if="!currentPage">No</span>
      </label>
    </div>

    <div class="input input--checkbox input--website">
      <p class="input__label">Website activated:</p>
      <input type="checkbox" :checked="currentWebsite" @input="updateCurrentWebsite" name="currentWebsite" id="currentWebsite" />
      <label for="currentWebsite">
        <span class="yes" v-if="currentWebsite">Yes</span>
        <span class="no" v-if="!currentWebsite">No</span>
      </label>
    </div>

    <hr />

    <div class="blocked" v-html="blocked"></div>

    <div class="input input--level">
      <p class="input__label">Quick presets:</p>
      <label>
        <button @click="clickPreset" value="0" title="Mostly all files will be blocked">Very low</button> 
        <button @click="clickPreset" value="1" title="Unnecessary files will be blocked and some other content optimized (recommended)">Low</button> 
        <button @click="clickPreset" value="2" title="Minimal optimization (just for vegans)">Medium</button> 
      </label>
    </div>

    <div class="popup__more">
      <p class="input__label"></p>
      or <a href="" @click.prevent="openOptions" class="right">define your options</a>.
    </div>
    
    <div v-show="reloadNote" class="popup__note">
      <b>Some files may still be cached after reload.</b>
    </div>
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
      url: false,
      hostname: false,
      reloadNote: false,
    };
  },
  computed: {
    blocked() {
      return ;
    },
    level: {
      get () {
        return this.$store.state.level;
      },
      set (value) {
        this.$store.commit('level', value);
      }
    },

    currentPage(){
      return this.$store.getters.isPageActive(this.url);
    },
    currentWebsite(){
      return this.$store.getters.isWebsiteActive(this.hostname);
    },
  },
  mounted() {
    browser.tabs.query({ active: true, lastFocusedWindow: true })
      .then(
        tabs => {
          let domainOk = false;
          if (tabs.length > 0) {
            return tabs[0].url;
          }else{
            return -1;
          }
        }).then((url)=>{
          this.url = url;
          this.hostname = new URL(url).hostname;
        });
  },
  methods: {
    clickPreset(e){
      this.$store.commit('level', parseInt(e.currentTarget.value));
      if (browser.tabs) browser.tabs.reload();
      this.displayReloadNote();
    },
    openOptions(){
      browser.runtime.openOptionsPage(); // .then(onOpened, onError)
    },
    displayReloadNote(){
      this.reloadNote = true;
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.reloadNote = false;
      }, 4000);
    },
    updateCurrentPage(e){
      if (e.target.checked) {
        this.$store.commit('resumePage', this.url);
      }else{
        this.$store.commit('pausePage', this.url);
      }
      this.displayReloadNote();
    },
    updateCurrentWebsite(e){
      if (e.target.checked) {
        this.$store.commit('resumeWebsite', this.hostname);
      }else{
        this.$store.commit('pauseWebsite', this.hostname);
      }
      this.displayReloadNote();
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../styles/options.scss";
.popup{
  width: 270px; 
  .input__label{
    width: 105px;
  }

  &__more{
    margin-top: 4px;
  }
  &__note{
    text-align: center;
    margin-top: 8px;
  }
  button{
    margin-top: 4px;
  }
  .right{
    text-align: right;
  }
}

.input{
  &--checkbox{
    margin-bottom:2px;
    line-height: 21px;

    input[type=checkbox]{
      height: 0;
      width: 0;
      visibility: hidden;
      margin: 0;
    }

    label {
      cursor: pointer;
      // text-indent: -9999px;
      width: 46px;
      height: 21px;
      background: grey;
      display: inline-block;
      border-radius: 21px;
      padding-left: 22px;
      position: relative;
    }

    label:after {
      content: '';
      position: absolute;
      top: 4px;
      left: 4px;
      width: 13px;
      height: 13px;
      background: #fff;
      border-radius: 11px;
    }

    input:checked + label {
      background: #61d316;
      padding-left: 6px;
    }

    input:checked + label:after {
      left: calc(100% - 4px);
      transform: translateX(-100%);
    }

    label:active:after {
      width: 15px;
    }
  }
}
</style>
