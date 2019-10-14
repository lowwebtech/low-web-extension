<template>
  <div>
    <div class="status"></div>
    General
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
        Disable ads (not optimised, preferably use AdBlock)
        <label>
          <input type="radio" name="block_ads" value="1">
          True
        </label>
        <label>
          <input type="radio" name="block_ads" value="0">
          False
        </label>
      </li>
      <li>
        Disable social (widgets)
        <label>
          <input type="radio" name="block_social" value="1">
          True
        </label>
        <label>
          <input type="radio" name="block_social" value="0">
          False
        </label>
      </li>
    </ul>

    Image
    <ul>
      <li>
        Srcset
        <label>
          <select name="image_srcset">
            <option value="1">Remove retina</option>
            <option value="2">Remove all except minus</option>
            <option value="0">Do nothing</option>
          </select>
        </label>
      </li>
      <li>
        Add lazyload attribute
        <label>
          <input type="radio" name="image_lazyload" value="1">
          True
        </label>
        <label>
          <input type="radio" name="image_lazyload" value="0">
          False
        </label>
      </li>
    </ul>

    Video
    <ul>
      <li>
        Video quality
        <label>
          <select name="video_quality">
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high" disabled>high</option>
          </select>
        </label>
      </li>
      <li>
        Video attributes (autoplay, loop, rel)
        <label>
          <input type="radio" name="video_attributes" value="1">
          True
        </label>
        <label>
          <input type="radio" name="video_attributes" value="0">
          False
        </label>
      </li>
      <li>
        Video click to load
        <label>
          <input type="radio" name="video_clicktoload" value="1">
          True
        </label>
        <label>
          <input type="radio" name="video_clicktoload" value="0">
          False
        </label>
      </li>
    </ul>    

    Iframe
    <ul>
      <li>
        Add lazyload attribute
        <label>
          <input type="radio" name="iframe_lazyload" value="1">
          True
        </label>
        <label>
          <input type="radio" name="iframe_lazyload" value="0">
          False
        </label>
      </li>
    </ul>

    Block Request
    <ul>
      <li>
        image
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
        video
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
        font
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
        script
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
import store from '../store'
export default {
  name: 'App',
  methods:{
    saveOptions(){

      var save_data = this.getInputValue("save_data");
      var css_animation = this.getInputValue("css_animation");
      var image_srcset = this.getSelectValue("image_srcset")

      var image_lazyload = this.getInputValue("image_lazyload");
      var iframe_lazyload = this.getInputValue("iframe_lazyload");
      
      var block_social = this.getInputValue("block_social");
      var block_ads = this.getInputValue("block_ads");

      var block_images = this.getInputValue("block_images");
      var block_videos = this.getInputValue("block_videos");
      var block_fonts = this.getInputValue("block_fonts");
      var block_scripts = this.getInputValue("block_scripts");

      var video_quality = this.getSelectValue("video_quality")
      var video_clicktoload = this.getInputValue("video_clicktoload");
      var video_attributes = this.getInputValue("video_attributes");

      store.commit('SAVE_DATA', save_data)
      store.commit('CSS_ANIMATION', css_animation)

      store.commit('BLOCK_SOCIAL', block_social)
      store.commit('BLOCK_ADS', block_ads)

      store.commit('IMAGE_SRCSET', image_srcset)
      store.commit('IMAGE_LAZYLOAD', image_lazyload)
      store.commit('IFRAME_LAZYLOAD', iframe_lazyload)

      store.commit('BLOCK_IMAGES', block_images)
      store.commit('BLOCK_VIDEOS', block_videos)
      store.commit('BLOCK_FONTS', block_fonts)
      store.commit('BLOCK_SCRIPTS', block_scripts)

      store.commit('VIDEO_QUALITY', video_quality)
      store.commit('VIDEO_CLICKTOLOAD', video_clicktoload)
      store.commit('VIDEO_ATTRIBUTES', video_attributes)

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
          i = lg
        }
      }
    },

    checkSelect( name, value ){
      var select = this.$el.querySelector('select[name="'+name+'"]')
      var options = select.querySelectorAll('option')

      for( let i = 0, lg = options.length; i<lg; i++ ){
        if( parseInt( options[i].value ) == value ){
          select.selectedIndex = i
        }
      }
    },

    getInputValue( name ){
      return parseInt(this.$el.querySelector('input[name="'+name+'"]:checked').value);
    },
    getSelectValue( name ){
      var select = this.$el.querySelector('select[name="'+name+'"]')
      return select.options[select.selectedIndex].value
    }

  },
  mounted(){
    this.checkRadioButton( 'save_data', store.getters.save_data )
    this.checkRadioButton( 'css_animation', store.getters.css_animation )
    this.checkSelect( 'image_srcset', store.getters.image_srcset )

    this.checkRadioButton( 'image_lazyload', store.getters.image_lazyload )
    this.checkRadioButton( 'iframe_lazyload', store.getters.iframe_lazyload )

    this.checkRadioButton( 'block_social', store.getters.block_social )
    this.checkRadioButton( 'block_ads', store.getters.block_ads )

    this.checkRadioButton( 'block_images', store.getters.block_images )
    this.checkRadioButton( 'block_videos', store.getters.block_videos )
    this.checkRadioButton( 'block_fonts', store.getters.block_fonts )
    this.checkRadioButton( 'block_scripts', store.getters.block_scripts )

    this.checkSelect( 'video_quality', store.getters.video_quality )
    this.checkRadioButton( 'video_attributes', store.getters.video_attributes )
    this.checkRadioButton( 'video_clicktoload', store.getters.video_clicktoload )

    console.log(store)
    console.log(store.getters.block_social)

  }
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
