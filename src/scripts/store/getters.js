import jsonOptions from './options.json'
const getters = {}
for( let i = 0, lg = jsonOptions.length; i<lg; i++ ){
  let o = jsonOptions[i]
  getters[o.id] = state => parseInt(state[o.id]);
}
export default getters