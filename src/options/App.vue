<template>
  <div :class="['options', {'options--active': active}]">
    
    <div class="input input--level">
      <p class="input__label">Quick presets</p>

      <label>
        <button @click="clickPreset" value="0">Very low</button> 
        <button @click="clickPreset" value="1">Low</button> 
        <button @click="clickPreset" value="2">Medium</button> 
      </label>
    </div>

    <div v-for="input in options" :class="'input input--' + input.id" :key="`input-${input.id}`">

      <div class="input__text">
        <p class="input__label" :id="input.id" v-html="input.label"></p>
        <p class="input__description" v-if="input.description" v-html="input.description"></p>
      </div>

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

    </div>
    <!-- <button id="save" @click="saveOptions">Save</button> -->
    <div class="status"><b>{{ status }}</b></div>
    
  </div>
</template>

<script>
import options from '../scripts/datas/options.js';
import store from '../scripts/store';

let fields = Object.keys(store.state);
let jsonFields = options.map(a => a.id);
let timeout;

export default {
  name: 'App',
  data() {
    return {
      status: '',
      options,
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
  },
  methods: {
    clickPreset(e){
      this.$store.commit('level', parseInt(e.currentTarget.value));
      this.saved();
    },
    getModelId(id){
      return id;
    },
    onFieldChange(){
      this.saveOptions();
    },
    saveOptions() {
      for (let i = 0, lg = options.length; i < lg; i++) {
        const o = options[i];
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
    
  },
};
</script>
<style lang="scss" scoped>
@import "../styles/common.scss";

.options{
  width: 960px;
  visibility: hidden;
  
  &--active{
    visibility: visible;
  }

  .input {
    white-space: nowrap;
    padding: 16px 20px;
    border-bottom: 1px solid #BBB;
    font-size: 16px;
    &__field {
      width: 210px;
      vertical-align: top;
    }
    &__text {
      margin: 0;
      display: inline-block;
      width: calc(100% - 210px);
      padding-right: 5%;
      vertical-align: bottom;
      white-space: normal;
    }
    &__description {
      display: inline-block;
      margin: 0;
      position: relative;
      font-size: 14px;
    }
    &__label{
      margin: 0;
      margin-bottom: 4px;
      font-weight: bold;
    }
  }
}
</style>
