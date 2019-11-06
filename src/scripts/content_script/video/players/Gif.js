import GifPlayer from './GifPlayer'
import GiphyPlayer from './GiphyPlayer'

(function(){

  let gifs = document.querySelectorAll('img[src$=".gif"]')
  let giphies = []
  gifs.forEach((gif)=>{
    if( gif.src.indexOf('.giphy.com/media') != -1 ){
      giphies.push( new GiphyPlayer( gif ) )
    }else{
      new GifPlayer( gif ) 
    }
  })

  if( giphies.length > 0 ){
    let ids = []
    giphies.forEach((giphy)=>{
      ids.push(giphy.id)
    })

    fetch('https://api.giphy.com/v1/gifs?api_key=WOfkdCJZ5ZbYzERVBz996efvXADEKASm&ids='+ids.toString())
      .then(
        function(response) {
          if (response.status !== 200) {
            console.warn('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.json().then(function(data) {
            data.data.forEach((gifdata, index)=>{
              giphies[index].setData(gifdata)
            })
          });
        }
      )
      .catch(function(err) {
        console.warn('Fetch Error :-S', err);
      });
  }

}())
