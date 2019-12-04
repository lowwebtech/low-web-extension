import store from '../../store';
import fontsTxt from '../../../lists/fonts.txt';
import Blocker from '../Blocker';

export function blockFonts() {
  store.watch(
    (state, getters) => getters.block_fonts,
    (newValue, oldValue) => {
      console.log(`Updating from ${oldValue} to ${newValue}`);
      if (newValue === 0) {
        Blocker.removeListToBlock(fontsTxt);
      } else {
        Blocker.addListToBlock(fontsTxt);
      }
    }
  );
  console.log('blockFonts', store.getters.block_fonts);
  if (store.getters.block_fonts === 1) {
    Blocker.addListToBlock(fontsTxt);
  }
}
