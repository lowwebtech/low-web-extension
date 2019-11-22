// TODO more and external
export default {
  youtube: {
    id: 'youtube',
    domains: ['youtube.com', 'youtu.be'],
    embed_url: 'youtube.com/embed',
    video_url: 'https://www.youtube.com/watch?v=##ID##',
    oembed: 'https://www.youtube.com/oembed',
    image: '', // 'https://img.youtube.com/vi/##ID##/mqdefault.jpg',
    player: 'players/Youtube.js',
    skin:
      '<svg enable-background="new 0 0 68 48" viewBox="0 0 68 48" height="68" width="48"  xmlns="http://www.w3.org/2000/svg"><path d="m66.6 7.5c-.8-2.9-3.1-5.3-6-6.1-5.4-1.4-26.6-1.4-26.6-1.4s-21.2 0-26.6 1.5c-2.9.8-5.3 3.1-6 6.1-1.4 5.3-1.4 16.4-1.4 16.4s0 11.1 1.5 16.5c.8 2.9 3.1 5.3 6 6 5.3 1.5 26.5 1.5 26.5 1.5s21.2 0 26.6-1.4c2.9-.8 5.3-3.1 6-6 1.4-5.5 1.4-16.6 1.4-16.6s0-11.1-1.4-16.5z" fill="#212121" fill-opacity="0.8" /><path d="m27 34.1 17.8-10.1-17.8-10.1z" fill="#fff"/></svg><div class="lowweb__title">##TITLE##</div>',
  },
  // youporn: {
  //   id: 'youporn',
  //   domains: ['youporn.com'],
  //   // embed_url: 'youtube.com/embed',
  //   // video_url: 'https://www.youtube.com/watch?v=##ID##',
  //   // oembed: 'https://www.youtube.com/oembed',
  //   // image: 'https://img.youtube.com/vi/##ID##/mqdefault.jpg',
  //   player: 'players/Youporn.js',
  // },
  vimeo: {
    id: 'vimeo',
    domains: ['vimeo.com'],
    embed_url: 'player.vimeo.com/video/',
    video_url: 'https://vimeo.com/##ID##',
    oembed: 'https://vimeo.com/api/oembed.json',
    image: '',
    player: '', // 'players/Vimeo.js',
    skin:
      '<svg enable-background="new 0 0 65 40" height="65" width="40" viewBox="0 0 65 40" xmlns="http://www.w3.org/2000/svg"><path d="m60 40h-55c-2.8 0-5-2.2-5-5v-30c0-2.8 2.2-5 5-5h55c2.8 0 5 2.2 5 5v30c0 2.8-2.2 5-5 5z" fill-opacity="0.75" /><path d="m26 9.4 19.8 10.6-19.8 10.6" fill="#fff"/></svg><div class="lowweb__container"><div class="lowweb__title">##TITLE##</div><br><div class="lowweb__author"><span>by</span> ##AUTHOR##</div></div>',
    // image: 'https://vimeo.com/api/v2/video/##ID##.json?callback=showThumb'
  },
  dailymotion: {
    id: 'dailymotion',
    domains: ['dailymotion.com'],
    embed_url: 'dailymotion.com/embed/video',
    video_url: 'https://www.dailymotion.com/video/##ID##',
    oembed: 'https://www.dailymotion.com/services/oembed',
    player: '', // 'players/Dailymotion.js',
    external_player: 'players/Dailymotion.js',
    image: '',
    skin:
      '<svg enable-background="new 0 0 80 80" height="80" width="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><g fill="#fff"><path d="m40.1 80c-21.8 0-40.3-18.5-40.1-40.3.3-21.4 17.7-39.2 38.8-39.7 22.2-.4 40.6 17 41.1 39.1.5 21.9-17.9 40.8-39.8 40.9" opacity=".5"/><path d="m30.8 40.3c0-4.4 0-8.8 0-13.2 0-1 .4-1.6 1.3-1.6.3 0 .6.1 1 .3 7.4 4.1 14.8 8.3 22.2 12.6.3.2.7.4 1.1.6.5.3.9.7.9 1.3s-.4 1-.9 1.3c-3.7 2.1-7.3 4.1-11 6.3-4.1 2.3-8.1 4.6-12.2 6.9 0 0-.2.1-.2.1-1.2.6-2.2 0-2.2-1.3 0-2.2 0-4.4 0-6.6z"/></g></svg><div class="lowweb__container"><div class="lowweb__author">##AUTHOR##</div><div class="lowweb__title">##TITLE##</div></div>',
  },
  facebook: {
    id: 'facebook',
    embed_url: 'facebook.com/plugins/video.php',
    video_url: 'https://www.facebook.com/video.php?v=##ID##',
    oembed: 'https://www.facebook.com/plugins/video/oembed.json',
    image: 'https://graph.facebook.com/##ID##/picture',
    skin:
      '<svg enable-background="new 0 0 80 80" viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg"><path d="m40.1 78c-20.7 0-38.3-17.6-38.1-38.3.3-20.3 16.8-37.2 36.9-37.7 21.1-.4 38.6 16.2 39.1 37.1s-17 38.8-37.9 38.9" opacity=".5"/><g fill="#fff"><path d="m40.1 80c-10.5 0-20.8-4.4-28.4-12.1s-11.8-17.7-11.7-28.2c.3-21.4 17.7-39.2 38.9-39.7 22.1-.4 40.6 17.1 41.1 39.1.2 10.4-4 20.9-11.5 28.6-7.6 7.8-17.9 12.3-28.4 12.3zm-.5-77.1c-.2 0-.5 0-.7 0-19.6.5-35.7 17-36 36.8-.1 9.7 3.8 19 10.9 26.2 7.1 7.1 16.7 11.2 26.4 11.2s19.3-4.2 26.3-11.4 10.9-16.9 10.7-26.5c-.6-20.2-17.3-36.3-37.6-36.3z"/><path d="m30.8 40.3c0-4.7 0-9.5 0-14.2 0-1 .4-1.7 1.3-1.7.3 0 .6.1 1 .3 7.3 4.4 14.7 8.9 22 13.5.3.2.7.4 1.1.7.5.3.9.7.9 1.4s-.4 1-.9 1.4c-3.7 2.2-7.2 4.4-10.9 6.8-4.1 2.5-8.1 4.9-12.1 7.4l-.3.1c-1.2.7-2.2 0-2.2-1.4 0-2.4 0-4.7 0-7.1z"/></g></svg><div class="lowweb__container"><p class="lowweb__title"><b>##TITLE##</b></p><p class="lowweb__author">published by <b>##AUTHOR##</b></p></div>',
  },
  twitch: {
    id: 'twitch',
    embed_url: 'player.twitch.tv',
    video_url: 'https://www.twitch.tv/videos/##ID##',
    oembed: '', // https://api.twitch.tv/v4/oembed
    image: '',
    player: '', // players/Twitch.js
    skin:
      '<svg class="player-icon-play" id="icon_play" viewBox="0 0 30 30" width="120" height="120" xmlns="http://www.w3.org/2000/svg"><path d="M9 22.066V7.934a.5.5 0 0 1 .777-.416L21 15 9.777 22.482A.5.5 0 0 1 9 22.066z" fill="#FFF"></path></svg>',
  },
};
