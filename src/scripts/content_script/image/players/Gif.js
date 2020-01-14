import { GIPHY_TOKEN } from '../../../constants';
import GifPlayer from './GifPlayer';
import GiphyPlayer from './GiphyPlayer';
// import Logger from '../../../background/Logger';

(function() {
  let giphies = [];
  let gifs = [];

  let imgs = document.querySelectorAll('img');
  let gif;
  imgs.forEach(img => {
    if (img.src.indexOf('.giphy.com/media') !== -1) {
      giphies.push(new GiphyPlayer(img));
    } else if (img.src.indexOf('.gif') !== -1) {
      // TODO add animated webp
      gif = new GifPlayer(img);
      gif.start();
      gifs.push(gif);
    }
  });

  let iframes = document.querySelectorAll('iframe[src*="giphy.com/embed/"]');
  iframes.forEach(iframe => {
    giphies.push(new GiphyPlayer(iframe));
  });

  // Logger.log(giphies.length + ' Giphy optimized');

  if (giphies.length > 0) {
    let ids = [];
    giphies.forEach(giphy => {
      ids.push(giphy.id);
    });

    fetch('https://api.giphy.com/v1/gifs?api_key=' + GIPHY_TOKEN + '&ids=' + ids.toString(), { cache: 'force-cache' })
      .then(function(response) {
        if (!response || response.status !== 200) {
          console.warn('Giphy error. Status Code: ' + response.status);
          return;
        }

        response.json().then(function(data) {
          data.data.forEach((gifdata, index) => {
            giphies[index].setData(gifdata);
          });
          // window.lowComputeStyles();
        });
      })
      .catch(function(err) {
        console.warn('Fetch Error :-S', err);
      });
  }
})();
