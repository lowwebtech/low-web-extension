<template>
  <div :class="['options', {'options--active': active}]">
    
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

    <hr />

    <div v-for="input in json" :class="'input input--' + input.id" :key="`input-${input.id}`">
      <p class="input__label">{{ input.label }}</p>
      <div v-if="input.type === 'bool'" class="input__field inline">
        <label><input type="radio" :key="`${input.id}-1`" :name="input.id" value="1" :checked="$store.getters[input.id]==1?'checked':false" @input="onFieldChange" /> True</label>
        <label><input type="radio" :key="`${input.id}-0`" :name="input.id" value="0" :checked="$store.getters[input.id]==0?'checked':false" @input="onFieldChange" /> False</label>
      </div>
      <div v-if="input.type === 'select'" class="input__field inline">
        <label>
          <select :name="input.id" @input="onFieldChange">
            <option v-for="option in input.options" :value="option.value" :key="`option-${option.value}`" :selected="$store.getters[input.id]==option.value?'selected':false">
              {{ option.label }}
            </option>
          </select>
        </label>
      </div>
      <div class="input__info" v-if="input.info">
        <span>i</span>
        <div class="input__info-text">
          {{ input.info }}
        </div>
      </div>
    </div>
    <!-- <button id="save" @click="saveOptions">Save</button> -->
    <div class="status"><b>{{ status }}</b></div>
    
  </div>
</template>

<script>
import jsonOptions from '../scripts/store/options.json';
import store from '../scripts/store';
// import { mapFields } from 'vuex-map-fields';

let fields = Object.keys(store.state);
let jsonFields = jsonOptions.map(a => a.id);
// console.log(jsonFields);
// jsonFields.push('level');
let timeout;

export default {
  name: 'App',
  data() {
    return {
      status: '',
      json: jsonOptions,
      active: true,
    };
  },
  computed: {
    level: {
      get () {
        return this.$store.state.level;
      },
      set (value) {
        this.$store.commit('level', value);
        this.saved();
      }
    },
    // TODO find why :v-model not working
    // ...mapFields(jsonFields),
  },
  methods: {
    getModelId(id){
      console.log('getModelId', id);
      return id;
    },
    onFieldChange(){
      this.saveOptions();
    },
    saveOptions() {
      for (let i = 0, lg = this.json.length; i < lg; i++) {
        let o = jsonOptions[i];
        let val;
        switch (o.type) {
          case 'bool':
            val = this.getInputValue(o.id);
            break;
          case 'select':
            val = this.getSelectValue(o.id);
            break;
        }
        this.$store.commit(o.id, val);
      }
      this.saved();
    },
    saved(){
      this.status = 'Options saved.';
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.status = '';
      }, 1500);
    },
    checkRadioButton(name, value) {
      var radiobuttons = this.$el.querySelectorAll('input[name="' + name + '"]');
      for (let i = 0, lg = radiobuttons.length; i < lg; i++) {
        if (radiobuttons[i].value === value) {
          radiobuttons[i].checked = true;
          i = lg;
        }
      }
    },
    checkSelect(name, value) {
      var select = this.$el.querySelector('select[name="' + name + '"]');
      var options = select.querySelectorAll('option');
      for (let i = 0, lg = options.length; i < lg; i++) {
        if (options[i].value === value) {
          select.selectedIndex = i;
        }
      }
    },
    getInputValue(name) {
      return this.$el.querySelector('input[name="' + name + '"]:checked').value;
    },
    getSelectValue(name) {
      var select = this.$el.querySelector('select[name="' + name + '"]');
      return select.options[select.selectedIndex].value;
    },
  },
  mounted() {
    // TODO find why state isn't init yet
    // setTimeout(() => {
    //   this.active = true;
    // }, 300);
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/options.scss";
</style>
