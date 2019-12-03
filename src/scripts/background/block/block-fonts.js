import store from '../../store';
import fontsTxt from '../../../lists/fonts.txt';
import Blocker from '../Blocker';

export function blockFonts() {
  if (store.getters.block_fonts === 1) {
    Blocker.addListToblock(fontsTxt);
  }
}