// TODO more and external
// TODO look at these urls https://gist.github.com/rodrigoborgesdeoliveira/987683cfbfcc8d800192da1e73adc486

export default {
  /* {

    id: ,
    domains: ,
    embed_url: ,
    embed_url_filter: ,
    video_url: ,
    oembed: ,
    player: ,
    skin: ,

  } */

  youtube: {
    id: 'youtube',
    domains: ['youtube.com', 'youtu.be'],
    embed_url: 'youtube.com/embed',
    video_url: 'https://www.youtube.com/watch?v=##ID##',
    oembed: 'https://www.youtube.com/oembed',
    player: 'players/Youtube.js',
    customized: true,
    skin:
      '<a href="##VIDEO_URL##" target="_self">##IMAGE##<svg enable-background="new 0 0 68 48" viewBox="0 0 68 48" height="68" width="48"  xmlns="http://www.w3.org/2000/svg"><path d="m66.6 7.5c-.8-2.9-3.1-5.3-6-6.1-5.4-1.4-26.6-1.4-26.6-1.4s-21.2 0-26.6 1.5c-2.9.8-5.3 3.1-6 6.1-1.4 5.3-1.4 16.4-1.4 16.4s0 11.1 1.5 16.5c.8 2.9 3.1 5.3 6 6 5.3 1.5 26.5 1.5 26.5 1.5s21.2 0 26.6-1.4c2.9-.8 5.3-3.1 6-6 1.4-5.5 1.4-16.6 1.4-16.6s0-11.1-1.4-16.5z" fill="#212121" fill-opacity="0.8" /><path d="m27 34.1 17.8-10.1-17.8-10.1z" fill="#fff"/></svg><div class="lowweb__title">##TITLE##</div></a>'
    // image: '', // 'https://img.youtube.com/vi/##ID##/mqdefault.jpg',
  },
  vimeo: {
    id: 'vimeo',
    domains: ['vimeo.com'],
    embed_url: 'player.vimeo.com/',
    video_url: 'https://player.vimeo.com/video/##ID##',
    oembed: 'https://vimeo.com/api/oembed.json',
    customized: true,
    skin:
      '<a href="##VIDEO_URL##" target="_self">##IMAGE##<svg enable-background="new 0 0 65 40" height="65" width="40" viewBox="0 0 65 40" xmlns="http://www.w3.org/2000/svg"><path d="m60 40h-55c-2.8 0-5-2.2-5-5v-30c0-2.8 2.2-5 5-5h55c2.8 0 5 2.2 5 5v30c0 2.8-2.2 5-5 5z" fill-opacity="0.75" /><path d="m26 9.4 19.8 10.6-19.8 10.6" fill="#fff"/></svg><div class="lowweb__container"><div class="lowweb__title">##TITLE##</div><br><div class="lowweb__author"><span>by</span> ##AUTHOR##</div></div></a>'
    // image: 'https://vimeo.com/api/v2/video/##ID##.json?callback=showThumb'
    
  },
  dailymotion: {
    id: 'dailymotion',
    domains: ['dailymotion.com'],
    embed_url: 'dailymotion.com/embed/',
    video_url: 'https://www.dailymotion.com/embed/video/##ID##',
    oembed: 'https://www.dailymotion.com/services/oembed',
    customized: true,
    skin:
      '<a href="##VIDEO_URL##" target="_self">##IMAGE##<svg enable-background="new 0 0 80 80" height="80" width="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><g fill="#fff"><path d="m40.1 80c-21.8 0-40.3-18.5-40.1-40.3.3-21.4 17.7-39.2 38.8-39.7 22.2-.4 40.6 17 41.1 39.1.5 21.9-17.9 40.8-39.8 40.9" opacity=".5"/><path d="m30.8 40.3c0-4.4 0-8.8 0-13.2 0-1 .4-1.6 1.3-1.6.3 0 .6.1 1 .3 7.4 4.1 14.8 8.3 22.2 12.6.3.2.7.4 1.1.6.5.3.9.7.9 1.3s-.4 1-.9 1.3c-3.7 2.1-7.3 4.1-11 6.3-4.1 2.3-8.1 4.6-12.2 6.9 0 0-.2.1-.2.1-1.2.6-2.2 0-2.2-1.3 0-2.2 0-4.4 0-6.6z"/></g></svg><div class="lowweb__container"><div class="lowweb__author">##AUTHOR##</div><div class="lowweb__title">##TITLE##</div></div></a>'
  },
}
