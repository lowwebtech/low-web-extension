import jsonOptions from './options.json'

const mutations = {}
for( let i = 0, lg = jsonOptions.length; i<lg; i++ ){
  let o = jsonOptions[i]
  mutations[o.id] = function(state, payload) {
    state[o.id] = parseInt(payload);
  }
}

export default mutations