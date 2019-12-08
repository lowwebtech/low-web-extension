<template>
  <div class="popup">
    <!-- <button @click="pausePage" v-html="pausePageText"></button>
    <button @click="pauseWebsite" v-html="pauseWebsiteText"></button> -->
    Level of optimization<br>
    <input type="radio" id="hardcore" v-model="level" value="0" v-on:change="updateLevel">
    <label for="hardcore">Hardcore</label>
    <input type="radio" id="low" v-model="level" value="1" v-on:change="updateLevel">
    <label for="low">Low</label>
    <input type="radio" id="medium" v-model="level" value="2" v-on:change="updateLevel">
    <label for="medium">Medium</label>
    <br>
    
    <button @click="pauseAll" v-html="pauseText"></button>
    <!-- <button @click="resetActive">Reset</button> -->
  </div>
</template>
<script>
/* eslint-disable import/first, indent */
global.browser = require('webextension-polyfill');
import store from '../scripts/store';
/* eslint-enable import/first, indent */

// import getHostname from '../scripts/utils/get-hostname';
// import { mapGetters, mapState } from 'vuex';
export default {
  data() {
    return {
      // pausedPages: this.$store.state.pausedPages,
      // pausedWebsites: this.$store.state.pausedWebsites,
      active: this.$store.state.active,
      // pausePageText: '',
      // pauseWebsiteText: '',
      // level: this.$store.state.level,
      pauseText: '',
    };
  },
  computed: {
    // ...mapGetters([
    //   'isPagePaused',
    //   'isWebsitePaused',
    //   // ...
    // ])
  },
  mounted() {
    browser.tabs.query({ active: true, lastFocusedWindow: true }).then(
      tabs => {
        if (tabs.length > 0) {
          let t = tabs[0];
          this.$store.commit('url', t.url);
          // this.textTogglePage();
          // this.textToggleWebsite();
          this.textToggleActive();
          console.log(this.$store.state.level)
        }
      });
  },
  methods: {
    updateLevel(){
      console.log('popup level', this.level);
      console.log('popup level', this.$store.state.level);
      this.$store.commit('level', this.level);
    },
    // textTogglePage() {
    //   console.log('---textTogglePage',this.$store.getters.isPagePaused)
    //   if (this.$store.getters.isPagePaused) {
    //     this.pausePageText = 'Run on this page'
    //   } else {
    //     this.pausePageText = "Don't run on this page"
    //   }
    // },
    // textToggleWebsite() {
    //   console.log('---textToggleWebsite',this.$store.getters.isWebsitePaused)
    //   if (this.$store.getters.isWebsitePaused) {
    //     this.pauseWebsiteText = 'Run on this website'
    //   } else {
    //     this.pauseWebsiteText = "Don't run on this website"
    //   }
    // },
    textToggleActive() {
      console.log('---textToggleActive', this.$store.state.active);
      if (this.$store.state.active) {
        this.pauseText = 'Extension enabled';
      } else {
        this.pauseText = 'Extension disabled';
      }
    },
    // pausePage() {
    //   // console.log('pausePage')
    //   browser.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    //     // console.log(tabs.length)
    //     if (tabs.length > 0) {
    //       let t = tabs[0]
    //       // console.log(t.url)
    //       this.$store.commit('togglePage', t.url)
    //       this.textTogglePage()
    //     }
    //   })
    // },
    // pauseWebsite() {
    //   // console.log('pauseWebsite')
    //   browser.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    //     // console.log(tabs.length)
    //     if (tabs.length > 0) {
    //       let t = tabs[0]
    //       this.$store.commit('toggleWebsite', getHostname(t.url))
    //       this.textToggleWebsite()
    //     }
    //   })
    // },
    pauseAll() {
      // console.log('pauseAll', this.$store.state)
      this.$store.commit('active', !this.$store.state.active);
      this.textToggleActive();
    },
    // resetActive() {
    //   this.$store.commit('resetActive')
    // }
  },
};
</script>
<style lang="scss" scoped>
body {
  padding: 0;
  margin: 0;
}
button {
  white-space: nowrap;
  padding: 6px 10px;
  display: block;
}
.popup{
  width: 300px; 
}
</style>
