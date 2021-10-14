export default [
  {
    urls: ['youtube.com'],
    code: `
          ytd-browse[page-subtype="home"], 
          .ytd-watch-next-secondary-results-renderer,
          ytd-thumbnail #mouseover-overlay{
            display:none!important;
          }
          `
    // runAt: 'document_start',
  }
]
