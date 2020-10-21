import { GIPHY_TOKEN } from '../../../datas/constants';
import GifPlayer from './GifPlayer';
import GiphyPlayer from './GiphyPlayer';

(function () {
  const giphies = [];
  const gifs = [];

  // select img .gif, or img and iframe from giphy.com
  const gifEls = document.querySelectorAll('img[src*=".gif"], img[src*=".giphy.com/media"], iframe[src*="giphy.com/embed"]');

  gifEls.forEach((img) => {
    if (img.src.indexOf('giphy.com') !== -1) {
      // create GiphyPlayer (extends GifPlayer)
      // will call Giphy API to load static image
      giphies.push(new GiphyPlayer(img));
    } else if (img.src.indexOf('.gif') !== -1) {
      const gif = new GifPlayer(img);
      gif.start();
      gifs.push(gif);
    }
  });

  // Logger.log(giphies.length + ' Giphy optimized');

  if (giphies.length > 0) {
    const ids = [];
    // batch giphy ids
    giphies.forEach((giphy) => {
      ids.push(giphy.id);
    });

    // fetch giphy API with ids to retrieve images data
    fetch('https://api.giphy.com/v1/gifs?api_key=' + GIPHY_TOKEN + '&ids=' + ids.toString(), { cache: 'force-cache' })
      .then(function (response) {
        if (!response || response.status !== 200) {
          console.warn('Giphy error. Status Code: ' + response.status);
          return;
        }

        response.json().then(function (data) {
          data.data.forEach((gifdata, index) => {
            // set data for Giphy players
            giphies[index].setData(gifdata);
          });
        });
      })
      .catch(function (err) {
        console.warn('Fetch Error :-S', err);
      });
  }
})();
