export default [
  {
    filters: {
      urls: ['*://i.ytimg.com/vi/*', '*://img.youtube.com/vi/*'],
      types: ['image'],
    },
    files: [
      {
        from: [
          // TODO add .jpg or .webp ?
          'maxresdefault',
          'hq720',
          'sddefault',
          // 'mqdefault',
          'hqdefault',
        ],
        to: 'mqdefault', // smaller -> 'default'
      },
      {
        from: [
          'maxresdefault_live',
          'hq720_live',
          'sddefault_live',
          // 'mqdefault_live',
          'hqdefault_live',
        ],
        to: 'mqdefault_live', // smaller -> 'default_live'
      },
    ],
  },
];
