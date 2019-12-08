<template>
  <div :class="['options', {'options--active': active}]">
    
    <div class="input input--level">
      <p class="input__label">Level of optimization</p>
      <label>
        <select v-model="level" name="level">
          <option value="0">Hardcore</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
        </select>
      </label>
    </div>
<!-- 
    <div class="input input--image_srcset">
      <p class="input__label">image_srcset of optimization</p>
      <label>
        <select v-model="image_srcset" name="image_srcset">
          <option value="0">Hardcore</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
        </select>
      </label>
    </div> -->

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

export default {
  name: 'App',
  data() {
    return {
      status: '',
      json: jsonOptions,
      active: false,
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
    // ...mapFields(jsonFields),
  },
  methods: {
    getModelId(id){
      console.log('getModelId', id);
      return id;
    },
    // updateLevel(){
    //   console.log(this.$store.state);
    //   // console.log(this.level, this.getSelectValue('level'));
    //   this.$store.commit('setLevel', this.getSelectValue('level'));
    // },
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
      setTimeout(() => {
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
      console.log(name, select);
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
    setTimeout(() => {
      // for (let i = 0, lg = this.json.length; i < lg; i++) {
      //   let o = jsonOptions[i];
      //   switch (o.type) {
      //     case 'bool':
      //       // this.checkRadioButton(o.id, this.$store.getters[o.id]);
      //       break;
      //     case 'select':
      //       // this.checkSelect(o.id, this.$store.getters[o.id]);
      //       break;
      //   }
      // }
      // this.checkSelect('level', this.$store.getters.level);
      // console.log(this.$computed);
      this.active = true;
    }, 300);

    console.log(this)
  },
};
function mapFields(fields) {
  let computeds = {};
  console.log('mapFields', this);
  for (let field of fields) {
    console.log(field);
    computeds[field] = {
      get() {
        console.log('get', field, this.$store.state[field]);
        return this.$store.state[field];
      },
      set(value) {
        console.log('set', field, value);
        this.$store.commit(field, value);
      }
    }
  }
  console.log(computeds);
  return computeds;
}
</script>
<style lang="scss" scoped>
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.options{
  visibility: hidden;
  &--active{
    visibility: visible;
  }
}
.inline {
  display: inline-block;
}
.input {
  white-space: nowrap;
  &__field {
    width: 180px;
  }
  &__label {
    margin: 0;
    display: inline-block;
    min-width: 180px;
  }
  &__info {
    display: inline-block;
    margin: 0;
    position: relative;
    span {
      cursor: pointer;
      border: 1px solid black;
      display: inline-block;
      width: 18px;
      height: 18px;
      line-height: 18px;
      margin: 2px;
      text-align: center;
      border-radius: 100%;
      font-weight: bold;
    }
    &:hover {
      .input__info-text {
        visibility: visible;
      }
    }
  }
  &__info-text {
    padding: 2px 4px;
    visibility: hidden;
    position: absolute;
    width: 250px;
    border: 1px solid black;
    background-color: white;
    left: 30px;
    top: 0;
    white-space: initial;
  }
}
.status{
  margin-top: 10px;
  font-weight: bold;
}
button {
  margin-top: 10px;
}
</style>
