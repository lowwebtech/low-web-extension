<template>
  <div class="popup">

    <div class="input input--checkbox input--page">
      <p class="input__label">Current page</p>
      <input type="checkbox" :checked="current_page" @input="updateCurrentPage" name="current_page" id="current_page" />
      <label for="current_page">Current page</label>
    </div>

    <div class="input input--checkbox input--website">
      <p class="input__label">Current website</p>
      <input type="checkbox" :checked="current_website" @input="updateCurrentWebsite" name="current_website" id="current_website" />
      <label for="current_website">Current website</label>
    </div>

    <hr />

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
import RequestManager from '../scripts/background/RequestManager';
/* eslint-enable import/first, indent */

export default {
  data() {
    return {
      active: this.$store.state.active,
      url: false,
      hostname: false,
      // current_page: false,
      // current_website: false,
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

    current_page(){
      console.log('current_page',this.$store.state.pausedPages)
      return this.$store.getters.isPageActive(this.url);
    },
    current_website(){
      console.log('current_website', this.$store.state.pausedWebsites)
      return this.$store.getters.isWebsiteActive(this.hostname);
    },
      // get () {
        // return this.$store.getters.isPageActive(this.url);
      // },
      // set (value) {
      //   if (value) {
      //     this.$store.commit('resumePage', this.url);
      //   }else{
      //     this.$store.commit('pausePage', this.url);
      //   }
      // }
    // },
    // current_website: {
    //   get () {
    //     return true;// this.$store.state.level;
    //   },
    //   set (value) {
    //     if (value) {
    //       this.$store.commit('resumeWebsite', this.url);
    //     }else{
    //       this.$store.commit('pauseWebsite', this.url);
    //     }
    //   }
    // },
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
          // this.current_page = this.$store.getters.isPageActive(url);
          // this.current_website = this.$store.getters.isWebsiteActive(this.hostname);
        });
  },
  methods: {
    openOptions(){
      browser.runtime.openOptionsPage(); // .then(onOpened, onError)
    },
    updateCurrentPage(e){
      if (e.target.checked) {
        this.$store.commit('resumePage', this.url);
      }else{
        this.$store.commit('pausePage', this.url);
      }
    },
    updateCurrentWebsite(e){
      if (e.target.checked) {
        this.$store.commit('resumeWebsite', this.hostname);
      }else{
        this.$store.commit('pauseWebsite', this.hostname);
      }
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
