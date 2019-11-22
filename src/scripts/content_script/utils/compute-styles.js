(function() {
  let computeTos;
  let computeFroms;
  // const excludeStyles = ['block-size', 'inline-size', 'perspective-origin', 'transform-origin'];
  // list of css properties to copy, from original element to replaced element
  // ex : iframe youtube -> div
  const properties = [
    'position',
    'display',
    'box-sizing',
    'width',
    'height',
    'padding',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'margin',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
    'top',
    'right',
    'bottom',
    'left',
    'max-height',
    'min-height',
    'max-width',
    'min-width',
    'overflow-x',
    'overflow-y',
    'pointer-events',
    'visibility',
  ];

  window.lowComputeStyles = function() {
    computeTos = document.querySelectorAll('.lowweb__compute-styles');
    computeFroms = document.querySelectorAll('.lowweb__compute-styles--original');
    // get dummy element to get computed styles compared to default values
    const dummyIFRAME = document.createElement('iframe');
    document.body.appendChild(dummyIFRAME);
    const dummyIMG = document.createElement('img');
    document.body.appendChild(dummyIMG);
    const dummy = document.createElement('element-' + new Date().getTime());
    document.body.appendChild(dummy);

    const defaultStyles = getComputedStyle(dummy);
    const defaultIMGStyles = getComputedStyle(dummyIMG);
    const defaultIFRAMEStyles = getComputedStyle(dummyIFRAME);

    let computeid;
    let compEl;
    let cs;
    let style;
    // TODO find a better way to get/set computed style
    for (let i = 0, lg = computeFroms.length; i < lg; i++) {
      compEl = computeTos[i];
      computeid = compEl.dataset.computeid;

      switch (compEl.tagName.toUpperCase()) {
        case 'IMG':
          style = defaultIMGStyles;
          break;
        case 'IFRAME':
          style = defaultIFRAMEStyles;
          break;
        default:
          style = defaultStyles;
          break;
      }

      for (let j = 0, lgj = computeFroms.length; j < lgj; j++) {
        if (computeid === computeFroms[j].dataset.computeid) {
          cs = window.getComputedStyle(computeFroms[i]);
          // get the differences
          let diff = {};
          for (let key in cs) {
            if (cs.hasOwnProperty(key) && style[key] !== cs[key]) {
              diff[key] = cs[key];
            }
          }
          // set the difference
          for (let key in diff) {
            if (properties.indexOf(key) !== -1) {
              compEl.style[key] = cs[key];
            }
          }
          if (cs.getPropertyValue('position') === 'absolute') {
            compEl.style.width = '';
            compEl.style.height = '';
          }
          if (compEl.style.display === '') {
            compEl.style.display = 'inline-block';
          }
          j = lgj;
        }
      }
    }
    dummyIFRAME.remove();
    dummyIMG.remove();
    dummy.remove();
  };

  window.addEventListener('load', e => {
    // TODO :(
    window.lowComputeStyles();
    window.lowComputeStyles();
    for (let i = 0, lg = computeFroms.length; i < lg; i++) {
      computeTos[i].classList.remove('lowweb__compute-styles');
      computeFroms[i].parentNode.removeChild(computeFroms[i]);
    }
  });
})();
