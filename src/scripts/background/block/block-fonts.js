import { watchList } from '../../store/watch';

/**
 * Blocks script and files from third-party font services
 * @param  {string} fontsTxt List of fonts services
 * @return
 */
export function blockFonts(fontsTxt) {
  if (fontsTxt) watchList('block_fonts', fontsTxt);
}
