import { watchList } from '../../store/watch';

export function blockWebsiteSpecific(websiteSpecificTxt) {
  if (websiteSpecificTxt) watchList('website_specific', websiteSpecificTxt);
}
