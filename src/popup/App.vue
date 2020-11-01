<template>
  <div class="popup">
    <button class="popup__action" @click="disableCurrentPage" v-if="currentPage">Deactivate the extension on this page</button>
    <button class="popup__action" @click="enableCurrentPage" v-if="!currentPage">Activate the extension on this page</button>

    <button class="popup__action" @click="disableCurrentWebsite" v-if="currentWebsite">Deactivate the extension on this website</button>
    <button class="popup__action" @click="enableCurrentWebsite" v-if="!currentWebsite">Activate the extension on this website</button>

    <!-- <div class="input input--checkbox input--page">
      <p class="input__label">Page activated:</p>
      <div class="input__value">
        <input type="checkbox" :checked="currentPage" @input="updateCurrentPage" name="currentPage" id="currentPage" />
        <label for="currentPage">
          <span class="yes" v-if="currentPage">Yes</span>
          <span class="no" v-if="!currentPage">No</span>
        </label>
      </div>
    </div> -->

    <!-- <div class="input input--checkbox input--website">
      <p class="input__label">Website activated:</p>
      <div class="input__value">
        <input type="checkbox" :checked="currentWebsite" @input="updateCurrentWebsite" name="currentWebsite" id="currentWebsite" />
        <label for="currentWebsite">
          <span class="yes" v-if="currentWebsite">Yes</span>
          <span class="no" v-if="!currentWebsite">No</span>
        </label>
      </div>
    </div> -->

    <hr />
    <!-- 
    <div class="blocked" v-html="blocked"></div>
    <div class="optimised" v-html="optimised"></div>
 -->
    <div class="input input--level">
      <label class="input__label">Quick presets:</label>
      <select @input="updateCurrentMode">
        <option value="0">Default (light)</option>
        <option value="1">Normal</option>
      </select>
      <!-- <button @click="clickPreset" value="0" title="Mostly all files will be blocked">Light</button>
        <button @click="clickPreset" value="1" title="Unnecessary files will be blocked and some other content optimized">Normal</button> -->
      <!-- <button @click="clickPreset" value="2" title="Minimal optimization (just for vegans)">Medium</button> -->
    </div>

    <div class="popup__more">
      <p>
        <b>or <a href="" @click.prevent="openOptions" class="right">define your options</a>.</b>
      </p>
    </div>

    <div v-show="reloadNote" class="popup__note">
      <b>Some files may still be cached after reload.</b>
    </div>
  </div>
</template>
<script>
/* eslint-disable import/first, indent */
global.browser = require('webextension-polyfill');
/* eslint-enable import/first, indent */

export default {
  data() {
    return {
      active: this.$store.state.active,
      url: false,
      hostname: false,
      reloadNote: false,
      blocked: '',
      optimised: '',
    };
  },
  computed: {
    level: {
      get() {
        return this.$store.state.level;
      },
      set(value) {
        this.$store.commit('level', value);
      },
    },
    currentPage() {
      return this.$store.getters.isPageActive(this.url);
    },
    currentWebsite() {
      return this.$store.getters.isWebsiteActive(this.hostname);
    },
  },
  mounted() {
    browser.tabs
      .query({ active: true, lastFocusedWindow: true })
      .then((tabs) => {
        if (tabs.length > 0) {
          return tabs[0].url;
        } else {
          return -1;
        }
      })
      .then((url) => {
        this.url = url;
        if (url && url !== -1) {
          const u = new URL(url);
          this.hostname = u.hostname;
        }
      });

    const onMessageUpdateLogs = (request, sender, sendResponse) => {
      if (request.message === 'updateLogs') {
        if (request.data && request.data.logs) {
          this.blocked = 'Files blocked : ' + this.formatLogs(request.data.blocked);
          this.optimised = 'Files optimised : ' + this.formatLogs(request.data.optimised);
          return Promise.resolve({ message: 'logsUpdated', result: 'ok' });
        }
      }
      return true;
    };
    if (!browser.runtime.onMessage.hasListener(onMessageUpdateLogs)) {
      browser.runtime.onMessage.addListener(onMessageUpdateLogs);
    }

    const logsHandler = (response) => {
      this.formatResponse(response);
    };
    browser.runtime
      .sendMessage({
        message: 'getLogs',
      })
      .then(logsHandler, (e) => {
        console.log('error message logs', e);
      });
  },
  methods: {
    formatResponse(response) {
      if (response) {
        if (response.blocked) this.blocked = 'Blocked: ' + this.formatLogs(response.blocked);
        if (response.optimised) this.optimised = 'Optimised: ' + this.formatLogs(response.optimised);
      }
    },
    formatLogs(logs) {
      let str = '';
      const keys = Object.keys(logs);
      if (keys.length > 0) {
        let k;
        str = '';
        for (const key of keys) {
          k = key;
          if (logs[key].length > 1) k += 's';
          str += logs[key].length + ' ' + k + ', ';
        }
        str = str.substring(0, str.length - 2);
      }
      return str;
    },
    clickPreset(e) {
      this.$store.commit('level', parseInt(e.currentTarget.value));
      if (browser.tabs) browser.tabs.reload();
      this.displayReloadNote();
    },
    openOptions() {
      browser.runtime.openOptionsPage(); // .then(onOpened, onError)
    },
    displayReloadNote() {
      this.reloadNote = true;
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.reloadNote = false;
      }, 4000);
    },
    enableCurrentPage(e) {
      this.$store.commit('resumePage', this.url);
      this.displayReloadNote();
    },
    disableCurrentPage(e) {
      this.$store.commit('pausePage', this.url);
      this.displayReloadNote();
    },
    enableCurrentWebsite(e) {
      this.$store.commit('resumeWebsite', this.hostname);
      this.displayReloadNote();
    },
    disableCurrentWebsite(e) {
      this.$store.commit('pauseWebsite', this.hostname);
      this.displayReloadNote();
    },
    updateCurrentMode(e) {
      // if (e.target.checked) {
      this.$store.commit('changeWebsiteMode', {
        hostname: this.hostname,
        value: e.target.value,
      });
      // } else {
      //   this.$store.commit('pauseWebsite', this.hostname);
      // }
      this.displayReloadNote();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../styles/common.scss';

html,
body {
  background: white;
  width: 250px;
  padding: 10px;
}
p {
  margin: 0;
}
.popup {
  width: 230px;
  margin: 10px;
  font-size: 13px;

  &__more {
    margin-top: 4px;
  }
  &__note {
    text-align: center;
    margin-top: 8px;
  }
  &__action {
  }
  button {
    margin-top: 4px;
  }
  .right {
    text-align: right;
  }

  .input {
    white-space: nowrap;
    font-size: 13px;
    &__label {
      width: 120px;
      display: inline-block;
      margin: 0;
      margin-bottom: 4px;
    }
    &__value {
      display: inline-block;
      margin: 0;
      position: relative;
      margin-left: 10px;
    }
  }
}
</style>
