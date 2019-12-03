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
    const fragment = document.createDocumentFragment();
    const dummyIFRAME = document.createElement('iframe');
    const dummyIMG = document.createElement('img');
    const dummy = document.createElement('element-' + new Date().getTime());
    fragment.appendChild(dummyIFRAME);
    fragment.appendChild(dummyIMG);
    fragment.appendChild(dummy);
    document.body.appendChild(fragment);

    const defaultStyles = getComputedStyle(dummy);
    const defaultIMGStyles = getComputedStyle(dummyIMG);
    const defaultIFRAMEStyles = getComputedStyle(dummyIFRAME);

    let computeid;
    let compFromEl;
    let compToEl;
    let cs;
    let style;

    // TODO find a better way to get/set computed style
    for (let i = 0, lg = computeFroms.length; i < lg; i++) {
      compFromEl = computeFroms[i];
      computeid = compFromEl.dataset.computeid;
      compToEl = findComputeTo(computeid);

      console.log(compFromEl.width);
      if (compToEl) {
        switch (compFromEl.tagName.toUpperCase()) {
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

            if (compFromEl.width) {
              diff['width'] = compFromEl.width;
            }
            if (compFromEl.height) {
              diff['height'] = compFromEl.height;
            }

            // set the difference
            for (let key in diff) {
              if (properties.indexOf(key) !== -1) {
                compToEl.style[key] = cs[key];
              }
            }

            // switch (compFromEl.tagName.toUpperCase()) {
            //   case 'IFRAME':
            console.log(compFromEl.width, style['width'], cs.getPropertyValue('width'));

            if (cs.getPropertyValue('position') === 'absolute') {
              compToEl.style.width = '';
              compToEl.style.height = '';
            }
            if (compToEl.style.display === '') {
              compToEl.style.display = 'inline-block';
            }
            j = lgj;
          }
        }
      }
    }
    dummyIFRAME.remove();
    dummyIMG.remove();
    dummy.remove();
  };

  function findComputeTo(id) {
    for (let i = 0, lg = computeTos.length; i < lg; i++) {
      if (computeTos[i].dataset.computeid === id) {
        return computeTos[i];
      }
    }
  }

  window.addEventListener('load', e => {
    window.lowComputeStyles();
    for (let i = 0, lg = computeFroms.length; i < lg; i++) {
      computeTos[i].classList.remove('lowweb__compute-styles');
      computeFroms[i].parentNode.removeChild(computeFroms[i]);
    }
  });
})();
