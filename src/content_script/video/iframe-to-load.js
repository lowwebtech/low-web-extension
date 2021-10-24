import DOMPurify from 'dompurify'
import videoToBlock from '../../datas/video-to-block'
import { localOption } from '../../utils/get-local-options'
import { getYoutubeId, getDailymotionId, getFacebookId, getVimeoId, getTwitchId } from '../../utils/get-video-id'
import sanitizeEmbedUrl from '../../utils/sanitize-embed-video-url'

/**
 * Custom video iframe
 */
let videoQuality = 1
export default class IframeToLoad {
  constructor (el, style) {
    this.el = el
    this.style = style

    let src = el.src
    if (!src || src === '') {
      src = el.dataset.src
    }
    this.src = src

    localOption('video_quality').then((quality) => {
      videoQuality = quality
    })

    if (src) {
      this.type = videoBlocked(src)
      if (this.type !== false) {
        this.dataVideoBlock = videoToBlock[this.type]
        const id = getId(src, this.type)

        if (this.dataVideoBlock.video_url !== '' && this.dataVideoBlock.oembed !== '' && id) {
          this.videoUrl = this.dataVideoBlock.video_url.replace('##ID##', id)

          if (this.videoUrl && this.dataVideoBlock.oembed) {
            const oembedUrl = this.dataVideoBlock.oembed + '?format=json&url=' + encodeURIComponent(this.videoUrl)

            const options = {
              message: 'oembed',
              options: {
                type: this.type,
                videoUrl: this.videoUrl,
                oembedUrl: oembedUrl
              }
            }

            browser.runtime.sendMessage(options).then(
              (e) => this.onOEmbed(e),
              (e) => {
                console.error('error message click-to-load', e)
              }
            )
          }
        }
      }
    }
  }

  onOEmbed (response) {
    if (response && response.data) {
      if (this.dataVideoBlock.skin) {
        // test parentNode, iframe may be removed from the dom
        if (this.el && this.el.parentNode) {
          this.data = response.data
          this.id = getId(this.el.src, this.type)
          
          const newIframe = document.createElement('iframe')
          // copy html attributes from original iframe
          // TODO limit to known attributes
          for (let i = 0; i < this.el.attributes.length; i++) {
            const a = this.el.attributes[i]
            if (a.name !== 'src') {
              newIframe.setAttribute(a.name, a.value)
            }
          }

          const skin = this.getSkin()
          newIframe.dataset.src = this.el.src
          newIframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(skin)
          // newIframe.addEventListener('click', (e) => {
          //   console.log('prevent click iframe')
          //   newIframe.src = newIframe.dataset.src
          //   e.preventDefault()
          //   return false
          // })
          this.el.parentNode.replaceChild(newIframe, this.el)

          browser.runtime.sendMessage({
            message: 'logOptimised',
            data: {
              type: 'click-to-load',
              tabId: response.tabId,
              url: this.videoUrl
            }
          })
        }
      }
    }
  }

  getSkin () {
    let skin = this.dataVideoBlock.skin

    const title = this.getTitle()
    const thumb = this.getThumb()
    const sanitizedUrl = sanitizeEmbedUrl(this.src, true, true, videoQuality)
    
    if (title) {
      skin = skin.replace('##TITLE##', title)
    }

    if (this.data.description) {
      skin = skin.replace('##DESCRIPTION##', this.data.description)
    }

    if (this.data.author_name) {
      skin = skin.replace('##AUTHOR##', this.data.author_name)
    }

    if (this.videoUrl) {
      if (this.videoUrl.indexOf(this.dataVideoBlock.embed_url) !== -1) {
        this.videoUrl = sanitizedUrl// sanitizeEmbedUrl(this.videoUrl, true, true, videoQuality)
        skin = skin.replace('_blank', '_self')
      }
      skin = skin.replace('##VIDEO_URL##', sanitizedUrl)
    }

    if (thumb) {
      let alt = ''
      if (this.videoUrl) alt = this.videoUrl
      skin = skin.replace('##IMAGE##', '<img src="' + thumb + '" alt="' + alt + '" />')
    }

    // console.log(sanitizedUrl)
    // console.log(sanitizeEmbedUrl(this.videoUrl, true, true, videoQuality))

    // if (this.src) {
    //   skin = skin.replace('##IFRAME_URL##', sanitizedUrl)
    // }

    skin =
      '<style type="text/css">' +
      DOMPurify.sanitize(this.style) +
      '</style><div class="lowweb--' +
      DOMPurify.sanitize(this.type) +
      '"><div>' +
      DOMPurify.sanitize(skin) +
      '</div></div>'

    return skin
  }

  getThumb () {
    let thumb = this.data.thumbnail_url
    if (this.type === 'youtube') {
      thumb = thumb.replace('hqdefault', 'mqdefault')
    }
    // some oembed doesn't provide thumbnail_url
    if (!thumb && this.dataVideoBlock.image !== '') {
      thumb = this.dataVideoBlock.image.replace('##ID##', this.id)
    }
    return thumb
  }

  getTitle () {
    if (this.data.title) {
      return this.data.title
    }
    // else if (this.type === 'facebook') {
    //   const parser = new DOMParser();
    //   const html = parser.parseFromString(this.data.html, 'text/html');
    //   const t = html.querySelector('blockquote > a');
    //   if (t) {
    //     title = t.textContent;
    //   }
    // }
  }
}

function videoBlocked (url) {
  const keys = Object.keys(videoToBlock)
  for (const key of keys) {
    if (url.indexOf(videoToBlock[key].embed_url) !== -1) {
      return key
    }
  }
  return false
}

function getId (url, type) {
  const u = new URL(url)
  const path = u.origin + u.pathname

  let id
  switch (type) {
    case 'youtube':
      id = getYoutubeId(path)
      break
    case 'vimeo':
      id = getVimeoId(path)
      break
    case 'dailymotion':
      id = getDailymotionId(path)
      break
    case 'twitch':
      id = getTwitchId(path)
      break
    case 'facebook':
      id = getFacebookId(url)
      break
  }
  return id
}
