<template>
  <div>
    <div class="status"></div>
    <ul>
      <li>
        Send save-data header
        <label>
          <input type="radio" name="save_data" value="1">
          True
        </label>
        <label>
          <input type="radio" name="save_data" value="0">
          False
        </label>
      </li>
      <li>
        Disable css animation
        <label>
          <input type="radio" name="css_animation" value="1">
          True
        </label>
        <label>
          <input type="radio" name="css_animation" value="0">
          False
        </label>
      </li>

      <li>
        Block request type : image
        <label>
          <input type="radio" name="block_images" value="1">
          True
        </label>
        <label>
          <input type="radio" name="block_images" value="0">
          False
        </label>
      </li>
      <li>
        Block request type : video
        <label>
          <input type="radio" name="block_videos" value="1">
          True
        </label>
        <label>
          <input type="radio" name="block_videos" value="0">
          False
        </label>
      </li>
      <li>
        Block request type : font
        <label>
          <input type="radio" name="block_fonts" value="1">
          True
        </label>
        <label>
          <input type="radio" name="block_fonts" value="0">
          False
        </label>
      </li>
      <li>
        Block request type : script
        <label>
          <input type="radio" name="block_scripts" value="1">
          True
        </label>
        <label>
          <input type="radio" name="block_scripts" value="0">
          False
        </label>
      </li>
    </ul>

    <button id="save" @click="saveOptions">Save</button>
  </div>
</template>

<script>
console.log('App')
import store from '../store'
export default {
  name: 'App',
  methods:{
    saveOptions(){

      var save_data = this.$el.querySelector('input[name="save_data"]:checked').value;
      var css_animation = this.$el.querySelector('input[name="css_animation"]:checked').value;

      var block_images = this.$el.querySelector('input[name="block_images"]:checked').value;
      var block_videos = this.$el.querySelector('input[name="block_videos"]:checked').value;
      var block_fonts = this.$el.querySelector('input[name="block_fonts"]:checked').value;
      var block_scripts = this.$el.querySelector('input[name="block_scripts"]:checked').value;

      store.commit('SAVE_DATA', save_data)
      store.commit('CSS_ANIMATION', css_animation)

      store.commit('BLOCK_IMAGES', block_images)
      store.commit('BLOCK_VIDEOS', block_videos)
      store.commit('BLOCK_FONTS', block_fonts)
      store.commit('BLOCK_SCRIPTS', block_scripts)

      // Update status to let user know options were saved.
      var status = this.$el.querySelector('.status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    },

    checkRadioButton( name, value ){
      var radiobuttons = this.$el.querySelectorAll('input[name="'+name+'"]')
      for( let i = 0, lg = radiobuttons.length; i<lg; i++ ){
        if( parseInt( radiobuttons[i].value ) == value ){
          radiobuttons[i].checked = true
        }
      }
    }

  },
  mounted(){
    this.checkRadioButton( 'save_data', store.getters.save_data )
    this.checkRadioButton( 'css_animation', store.getters.css_animation )

    this.checkRadioButton( 'block_images', store.getters.block_images )
    this.checkRadioButton( 'block_videos', store.getters.block_videos )
    this.checkRadioButton( 'block_fonts', store.getters.block_fonts )
    this.checkRadioButton( 'block_scripts', store.getters.block_scripts )
  }
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
