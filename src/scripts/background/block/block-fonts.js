// import fontsTxt from '../../../lists/fonts.txt';
import { watchList } from '../../store/watch';

export function blockFonts(fontsTxt) {
  if (fontsTxt) watchList('block_fonts', fontsTxt);
}
