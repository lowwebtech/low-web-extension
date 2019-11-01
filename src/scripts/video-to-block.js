// TODO more and external
export default {
  youtube: {
    url: 'youtube.com/embed', 
    image: 'https://img.youtube.com/vi/##ID##/mqdefault.jpg',
    // js: 'players/Youtube.js'
  },
  vimeo: {
    url: 'player.vimeo.com/video/',
    // image: 'https://vimeo.com/api/v2/video/##ID##.json?callback=showThumb'
  },
  dailymotion:{
    url: 'dailymotion.com/embed/video', 
    js: 'players/Dailymotion.js',
    image: 'https://www.dailymotion.com/thumbnail/video/##ID##'
  },
  facebook:{
    url: 'facebook.com/plugins/video.php', 
    image: 'https://graph.facebook.com/##ID##/picture'
  },
  twitch:{
    url: 'player.twitch.tv', 
    // js: 'players/Twitch.js'
  }
}
