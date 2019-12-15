<template>
  <div class="popup">

    <div class="input input--checkbox input--page">
      <p class="input__label">Current page</p>
      <input type="checkbox" :checked="currentPage" @input="updateCurrentPage" name="currentPage" id="currentPage" />
      <label for="currentPage">Current page</label>
    </div>

    <div class="input input--checkbox input--website">
      <p class="input__label">Current website</p>
      <input type="checkbox" :checked="currentWebsite" @input="updateCurrentWebsite" name="currentWebsite" id="currentWebsite" />
      <label for="currentWebsite">Current website</label>
    </div>

    <hr />

    <div class="blocked" v-html="blocked"></div>

    <div class="input input--level">
      <p class="input__label">Quick presets</p>
      <br>
      <label>
        <button @click="clickPreset" value="0">Very low</button> 
        <button @click="clickPreset" value="1">Low</button> 
        <button @click="clickPreset" value="2">Medium</button> 
      </label>
    </div>

    <a href="" @click.prevent="openOptions" class="right">more options</a>

    <div v-show="reloadNote">Some files may still be cached after reloading.</div>

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
      console.log('currentPage',this.$store.state.pausedPages)
      return this.$store.getters.isPageActive(this.url);
    },
    currentWebsite(){
      console.log('currentWebsite', this.$store.state.pausedWebsites)
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
          // this.currentPage = this.$store.getters.isPageActive(url);
          // this.currentWebsite = this.$store.getters.isWebsiteActive(this.hostname);
        });
  },
  methods: {
    clickPreset(e){
      // console.log(parseInt(e.currentTarget.value));
      this.$store.commit('level', parseInt(e.currentTarget.value));
      // this.saved();
    },
    openOptions(){
      browser.runtime.openOptionsPage(); // .then(onOpened, onError)
    },
    displayReloadNote(){
      this.reloadNote = true;
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.reloadNote = false;
      }, 3000);
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
@import "../scss/options.scss";
.popup{
  width: 200px; 
  .input__label{
    width: 100px;
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
      display: inline-block;
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
    }

    input:checked + label {
      background: #61d316;
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
