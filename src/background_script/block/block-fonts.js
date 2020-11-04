import Blocker from '../../controllers/Blocker';
/**
 * Blocks script and files from third-party font services
 * @param  {string} fontsTxt List of fonts services
 * @return
 */
export function blockFonts(fontsTxt) {
  if (fontsTxt) Blocker.addListToBlock(fontsTxt, 'block_fonts');
}
