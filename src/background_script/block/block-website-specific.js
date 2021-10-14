import Blocker from '../../controllers/Blocker'
/**
 * Blocks specific files on popular website
 * For now, only used on preview images from Youtube
 * @param  {string} websiteSpecificTxt List of specific files to bloc on popular websites
 * @return
 */
export function blockWebsiteSpecific (websiteSpecificTxt) {
  if (websiteSpecificTxt) Blocker.addListToBlock(websiteSpecificTxt, 'block_fonts')
}
