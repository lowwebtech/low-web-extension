export default [
  {
    filters: {
      urls: ['*://i.ytimg.com/vi/*', '*://img.youtube.com/vi/*'],
      types: ['image'],
    },
    find: [
      'maxresdefault.jpg',
      'maxresdefault_live.jpg',
      'hq720.jpg',
      'hq720_live.jpg',
      'sddefault.jpg',
      'sddefault_live.jpg',
      'mqdefault.jpg',
      'mqdefault_live.jpg',
      'hqdefault.jpg',
      'hqdefault_live.jpg',
    ],
    to: 'default.jpg',
  },
];
