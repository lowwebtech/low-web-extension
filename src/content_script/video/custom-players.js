import { localOption } from '../../utils/get-local-options';
import videoToBlock from '../../datas/video-to-block';

export default function () {
  localOption('video_quality').then((value) => {
    if (value > 0) {
      const keys = Object.keys(videoToBlock);
      const containerScript = document.head || document.documentElement;

      for (const key of keys) {
        const video = videoToBlock[key];
        let jsUrl;

        if (video.player && video.player !== '') {
          for (let i = 0, lg = video.domains.length; i < lg; i++) {
            if (window.location.hostname.indexOf(video.domains[i]) !== -1) {
              jsUrl = video.player;
              if (video.id === 'youtube') {
                switch (value) {
                  case 1:
                    jsUrl = jsUrl.replace('.js', '-small.js');
                    break;
                  case 2:
                    jsUrl = jsUrl.replace('.js', '-medium.js');
                    break;
                  case 3:
                    jsUrl = jsUrl.replace('.js', '-large.js');
                    break;
                }
              }
              const script = document.createElement('script');
              script.type = 'text/javascript';
              script.src = browser.runtime.getURL(jsUrl);
              containerScript.appendChild(script);
              i = lg;

              browser.runtime.sendMessage({
                message: 'logOptimised',
                data: {
                  type: 'video_quality',
                  tabId: -1,
                  url: jsUrl,
                },
              });
            }
          }
        } else if (video.api_player && video.api_player !== '') {
          if (video.domains.indexOf(window.location.hostname) === -1) {
            // jsUrl = video.api_player
            // let script = document.createElement('script');
            // script.type = 'text/javascript';
            // script.src = browser.runtime.getURL(jsUrl);
            // containerScript.appendChild(script);
          }
        }
      }
    }
  });
}
