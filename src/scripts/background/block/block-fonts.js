import store from '../../store';
import fontsTxt from '../../../lists/fonts.txt';
import Blocker from '../Blocker';

export function blockFonts() {
  store.watch(
    (state, getters) => getters.block_fonts,
    (newValue, oldValue) => {
      console.log(`Updating from ${oldValue} to ${newValue}`);
      if( newValue == 0 ){
        Blocker.removeListToblock(fontsTxt);    
      }else{
        Blocker.addListToblock(fontsTxt);
      }
    },
  );
  console.log('blockFonts', store.getters.block_fonts);
  if (store.getters.block_fonts === 1) {
    Blocker.addListToblock(fontsTxt);
  }
}
