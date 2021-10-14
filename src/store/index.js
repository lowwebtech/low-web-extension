import Vue from 'vue'
import Vuex from 'vuex'
import options from '../datas/defaultOptions.js'
import getters from './getters'
import mutations from './mutations'
// import * as actions from './actions';
import VuexWebExtensions from 'vuex-webextensions'
import { localOption } from '../utils/get-local-options.js'

const defaultOptions = {
  pausedWebsites: [],
  pausedPages: [],
  websitesModeChanges: {},
  level: 1
}
for (let i = 0, lg = options.length; i < lg; i++) {
  const o = options[i]
  // console.log(o);
  // console.log(o.values);
  defaultOptions[o.id] = o.values
}
let state = Object.assign({}, defaultOptions)
const persistentVars = Object.keys(state)

const nonPersistentState = {
  active: true,
  url: undefined,
  hostname: undefined,
  nonPersistentState: true,
  whitelistHoverImages: []
}
// add nonPersitent after setting persistenVars
state = Object.assign(nonPersistentState, state)

/**
 * new option value (eg: datas/defaultOptions.js) may not defined in localStorage
 * commit new option value if needed
 */
function checkDefaultOption () {
  const keys = Object.keys(defaultOptions)
  for (const key of keys) {
    const option = options.find((o) => o.id === key)
    if (option) {
      localOption(key, false).then((optionValue) => {
        if (!optionValue) {
          setTimeout(() => {
            store.commit(option.id, option.values)
          }, 300)
        }
      })
    }
  }
}

Vue.use(Vuex)
const store = new Vuex.Store({
  plugins: [
    VuexWebExtensions({
      // loggerLevel: 'debug',
      persistentStates: persistentVars
    })
  ],
  state: state,
  getters: getters,
  mutations
  // actions,
})
checkDefaultOption()

export default store
