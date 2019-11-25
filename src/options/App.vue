<template>
  <div>
    <div class="status"></div>
    <div v-for="input in json" :class="'input input--' + input.id" :key="`input-${input.id}`">
      <p class="input__label">{{ input.label }}</p>
      <div v-if="input.type === 'bool'" class="input__field inline">
        <label><input type="radio" :name="input.id" value="1" /> True</label>
        <label><input type="radio" :name="input.id" value="0" /> False</label>
      </div>
      <div v-if="input.type === 'select'" class="input__field inline">
        <label>
          <select :name="input.id">
            <option v-for="option in input.options" :value="option.value" :key="`option-${option.value}`">
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
    <button id="save" @click="saveOptions">Save</button>
  </div>
</template>
<script>
import store from '../scripts/store';
import jsonOptions from '../scripts/store/options.json';

export default {
  name: 'App',
  data() {
    return {
      json: jsonOptions,
    };
  },
  methods: {
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
        store.commit(o.id, val);
      }
      // Update status to let user know options were saved.
      var status = this.$el.querySelector('.status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    },
    checkRadioButton(name, value) {
      var radiobuttons = this.$el.querySelectorAll('input[name="' + name + '"]');
      for (let i = 0, lg = radiobuttons.length; i < lg; i++) {
        if (parseInt(radiobuttons[i].value) === value) {
          radiobuttons[i].checked = true;
          i = lg;
        }
      }
    },
    checkSelect(name, value) {
      var select = this.$el.querySelector('select[name="' + name + '"]');
      var options = select.querySelectorAll('option');
      for (let i = 0, lg = options.length; i < lg; i++) {
        if (parseInt(options[i].value) === value) {
          select.selectedIndex = i;
        }
      }
    },
    getInputValue(name) {
      return parseInt(this.$el.querySelector('input[name="' + name + '"]:checked').value);
    },
    getSelectValue(name) {
      var select = this.$el.querySelector('select[name="' + name + '"]');
      return select.options[select.selectedIndex].value;
    },
  },
  mounted() {
    // TODO find why state isn't init yet
    setTimeout(() => {
      for (let i = 0, lg = this.json.length; i < lg; i++) {
        let o = jsonOptions[i];
        switch (o.type) {
          case 'bool':
            this.checkRadioButton(o.id, store.getters[o.id]);
            break;
          case 'select':
            this.checkSelect(o.id, store.getters[o.id]);
            break;
        }
      }
    }, 300);
  },
};
</script>
<style lang="scss" scoped>
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
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
button {
  margin-top: 10px;
}
</style>
