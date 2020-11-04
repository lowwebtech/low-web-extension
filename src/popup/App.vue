<template>
  <div class="popup">
    <div class="input input--page">
      <button class="popup__action" @click="disableCurrentPage" v-if="isPageActive">Deactivate on this page</button>
      <button class="popup__action" @click="enableCurrentPage" v-if="!isPageActive">Activate on this page</button>
    </div>

    <div class="input input--site">
      <button class="popup__action" @click="disableCurrentWebsite" v-if="isWebsiteActive">Deactivate on this website</button>
      <button class="popup__action" @click="enableCurrentWebsite" v-if="!isWebsiteActive">Activate on this website</button>
    </div>

    <div class="input input--mode">
      <label class="input__label">Mode on this website:</label>
      <div>
        <input type="radio" id="default" name="mode" :value="getDefaultValue" :checked="isDefaultMode" @input="updateCurrentMode" />
        <label for="default">{{ getDefaultName }}</label>
      </div>
      <div>
        <input type="radio" id="normal" name="mode" :value="getOtherValue" :checked="!isDefaultMode" @input="updateCurrentMode" />
        <label for="normal">{{ getOtherName }}</label>
      </div>
    </div>

    <div>
      <button @click.prevent="openOptions">Manage options</button>
      <button @click.prevent="openPopup" v-if="isDev">Manage popup</button>
      <button @click.prevent="resetActive" v-if="isDev">Reset active</button>
      <button @click.prevent="clearStorage" v-if="isDev">Clear localstorage</button>
      <button @click.prevent="reload" v-if="isDev">Reload</button>
    </div>

    <div v-show="reloadNote" class="popup__note">
      <b>Some files may still be cached after reload.</b>
    </div>

    <!-- <div class="input input--checkbox input--page">
      <p class="input__label">Page activated:</p>
      <div class="input__value">
        <input type="checkbox" :checked="isPageActive" @input="updateCurrentPage" name="isPageActive" id="isPageActive" />
        <label for="isPageActive">
          <span class="yes" v-if="isPageActive">Yes</span>
          <span class="no" v-if="!isPageActive">No</span>
        </label>
      </div>
    </div> -->

    <!-- <div class="input input--checkbox input--website">
      <p class="input__label">Website activated:</p>
      <div class="input__value">
        <input type="checkbox" :checked="isWebsiteActive" @input="updateCurrentWebsite" name="isWebsiteActive" id="isWebsiteActive" />
        <label for="isWebsiteActive">
          <span class="yes" v-if="isWebsiteActive">Yes</span>
          <span class="no" v-if="!isWebsiteActive">No</span>
        </label>
      </div>
    </div> -->
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
      // set(value) {
      //   console.log('commit level value', value);
      //   this.$store.commit('level', value);
      // },
    },
    isPageActive() {
      return this.$store.getters.isPageActive(this.url);
    },
    isWebsiteActive() {
      return this.$store.getters.isWebsiteActive(this.hostname);
    },
    isDefaultMode() {
      console.log('isDefaultMode', this.$store.getters.isDefaultMode(this.hostname));
      return this.$store.getters.isDefaultMode(this.hostname);
    },
    getDefaultName() {
      if (this.level === 0) return 'Light (default)';
      else return 'Normal (default)';
    },
    getDefaultValue() {
      return this.level;
    },
    getOtherName() {
      if (this.level === 0) return 'Normal';
      else return 'Light';
    },
    getOtherValue() {
      if (this.level === 0) return 1;
      else return 0;
    },
    isDev() {
      return process.env.NODE_ENV === 'development';
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

    setTimeout(() => {
      console.log(this.isDefaultMode);
      console.log(this.$store.getters.isDefaultMode(this.hostname));
    }, 500);

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
      browser.runtime.openOptionsPage();
    },
    openPopup() {
      var url = '/popup/popup.html';
      window.open(url);
    },
    resetActive() {
      this.$store.commit('resetActive');
    },
    clearStorage() {
      browser.storage.local.clear();
      browser.storage.sync.clear();
    },
    reload() {
      if (browser.tabs) browser.tabs.reload();
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
      this.$store.commit('changeWebsiteMode', {
        hostname: this.hostname,
        value: e.target.value,
      });
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
