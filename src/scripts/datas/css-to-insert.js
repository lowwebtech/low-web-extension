export default [
  {
    urls: ['youtube.com'],
    code: `
          /*
          #comments, #items, ytd-browse{
            display:none!important;
          }
          */
          #comments, 
          ytd-browse[page-subtype="home"], 
          .ytd-watch-next-secondary-results-renderer,
          ytd-thumbnail #mouseover-overlay{
            display:none!important;
          }
          `,
    // runAt: 'document_start',
  },
];
