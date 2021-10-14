export default [
  {
    id: 'video_quality',
    label: 'Video quality',
    type: 'select',
    groups: ['video', 'important'],
    description:
      'When possible, lower video quality is displayed. Video is an heavy and energy-consuming content, reducing the quality, reduces the weight of a video and its energy consumption. Currently works on Youtube, Vimeo & Dailymotion (ex Youtube: Light = 144p, Normal = 360p).<br>Video quality is one of the most important parameters to reduce this data.',
    values: [1, 2],
    options: [
      {
        value: 1,
        label: 'Smallest'
      },
      {
        value: 2,
        label: 'Normal'
      },
      {
        value: 3,
        label: 'Large'
      },
      {
        value: 0,
        label: 'Do nothing'
      }
    ]
  },
  {
    id: 'media_attributes',
    label: 'Custom attributes for html element &lt;video&gt; and &lt;audio&gt;',
    type: 'bool',
    groups: ['video', 'important'],
    values: [1, 1],
    description:
      "The html5 media element &lt;video&gt; and &lt;audio&gt; allows us to define certain parameters limiting the use of video and audio. The autoplay, loop and preload attributes are disabled. A site can choose to re-enable them, so it won't be effective."
  },
  {
    id: 'image_srcset',
    label: 'Image quality',
    type: 'select',
    groups: ['image'],
    values: [2, 1],
    description:
      'An html &lt;img&gt; element can contain different image quality (srcset). The lowest quality is then chosen. Due to browser limitations, this option only works for "lazy-loaded" images.',
    options: [
      {
        value: 2,
        label: 'Remove all except minus'
      },
      {
        value: 1,
        label: 'Remove retina'
      },
      {
        value: 0,
        label: 'Do nothing'
      }
    ]
  },
  {
    id: 'gif_player',
    label: 'Hover over a GIF to play it',
    type: 'bool',
    groups: ['image', 'animation'],
    values: [1, 1],
    description:
      'This option stops looping gifs animation. The continuous animation of a gif forces browsers to refresh part of what it displays on the screen, it consumes energy. If possible only the 1st image is preloaded, the full animation will load and play the rollover (Giphy).'
  },
  {
    id: 'block_avatar',
    label: 'Block avatar images',
    type: 'bool',
    groups: ['image'],
    values: [1, 0],
    description:
      'Avatar images (like Gravatar, Twitter, Reddit...) are small, but there are often many, and they are not always necessary. When it is possible to identify them, they are blocked and therefore not loaded.'
  },
  {
    id: 'website_specific',
    label: 'Specific optimisation for most used websites',
    type: 'select',
    values: [2, 1],
    groups: ['misc'],
    options: [
      {
        value: 2,
        label: 'Reduce data and display'
      },
      {
        value: 1,
        label: 'Reduce data'
      },
      {
        value: 0,
        label: 'Do nothing'
      }
    ],
    description:
      'There are billions of websites and a few sites that have billions of visits. For these sites, it is sometimes possible to reduce the data or to hide unnecessary content to limit their use.<br>Supported sites: Youtube'
  },
  {
    id: 'block_social',
    label: 'Block social media embeds',
    type: 'bool',
    values: [1, 1],
    groups: ['misc', 'important'],
    description:
      'When a content from social media (Facebook, Instagram, Twitter, etc.) is shared on a website, many scripts (often tracking) are loaded, just to display a text or an image. These scripts are blocked, the extension automatically applies a layout imitating the original content.<br>Unnecessary features like buttons Facebook Like or Share are blocked.'
  },
  {
    id: 'block_fonts',
    label: 'Block Fonts',
    groups: ['filetype'],
    description: 'Block web fonts loaded for an @font-face CSS rule. Some icon webfont like fontawesome are whitelisted.',
    type: 'bool',
    values: [1, 0]
  },
  {
    id: 'block_images',
    label: 'Block Images',
    groups: ['image', 'filetype', 'important'],
    type: 'bool',
    values: [1, 0],
    description: 'Block images loaded by an &lt;img&gt; element'
  },
  {
    id: 'block_medias',
    label: 'Block Medias',
    type: 'bool',
    groups: ['video', 'filetype'],
    values: [1, 0],
    description: 'Block resources loaded by an &lt;video&gt; or &lt;audio&gt; element.'
  },
  {
    id: 'block_objects',
    label: 'Block Objects',
    groups: ['filetype'],
    type: 'bool',
    values: [1, 0],
    description: 'Block resources loaded by an &lt;object&gt; or &lt;embed&gt; element.'
  },
  {
    id: 'block_subframes',
    label: 'Block Iframes',
    groups: ['filetype'],
    type: 'bool',
    values: [1, 0],
    description: 'Block documents loaded in an &lt;iframe&gt; or &lt;frame&gt; element.'
  },
  {
    id: 'css_animation',
    label: 'Disable animation',
    type: 'bool',
    groups: ['misc', 'animation'],
    values: [1, 0],
    description:
      'CSS animation and transition are disabled. The &lt;marquee&gt; element is also stopped.'
  },
  {
    id: 'save_data',
    label: '"Save-data" browser settings',
    type: 'bool',
    values: [1, 1],
    groups: ['misc', 'important'],
    description:
      'A "save-data: on" parameter can be sent (header http) when browsing the internet. It tells the site you are visiting that you want to save data. Free to this site to reduce the loaded data.'
  }
  // {
  //   id: 'video_clicktoload',
  //   label: 'Click to load a video',
  //   type: 'bool',
  //   groups: ['video'],
  //   values: [1, 1],
  //   description:
  //     'When a Youtube, Facebook, Dailymotion, Vimeo video is displayed on a website in the form of an iframe, it contains many loaded scripts even if the video is not viewed. These iframes are replaced by a simple image, a title and a button. On click, the scripts will load and the video will play.',
  // },
  // {
  //   id: 'marquee_animation',
  //   label: 'Disable marquee animation',
  //   type: 'bool',
  //   groups: ['misc', 'animation'],
  //   values: [1, 1],
  //   description: 'Disable old marquee animations. Animations may cause render and reflow',
  // },
  // {
  //   id: 'css_font_rendering',
  //   label: 'Optimize font rendering (disable antialias)',
  //   type: 'bool',
  //   groups: ['misc'],
  //   values: [0, 0],
  //   description:
  //     'Rendering of fonts is already optimised by browser but we could optimise it a bit more by disabling antialiasing (-webkit-font-smoothing: none) and advanced fonts features like ligature (text-rendering: optimizeSpeed)',
  // },
]
