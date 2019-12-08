import fontsTxt from '../../../lists/fonts.txt';
import { watchList } from '../../store/watch';

export function blockFonts() {
  watchList('block_fonts', fontsTxt);
}
