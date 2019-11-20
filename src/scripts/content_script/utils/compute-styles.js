(function(){

  window.lowComputeStyles = function(){

    let computeTos = document.querySelectorAll('.lowweb__compute-styles')
    let computeFroms = document.querySelectorAll('.lowweb__compute-styles--original')

    // get dummy element to get computed styles compared to default values
    const dummyIFRAME = document.createElement( 'iframe' );
    document.body.appendChild( dummyIFRAME );

    const dummyIMG = document.createElement( 'img' );
    document.body.appendChild( dummyIMG );

    const dummy = document.createElement( 'element-'+( new Date().getTime() ) );
    document.body.appendChild( dummy );

    const defaultStyles = getComputedStyle( dummy );
    const defaultIMGStyles = getComputedStyle( dummyIMG );
    const defaultIFRAMEStyles = getComputedStyle( dummyIFRAME );

    // TODO find a better way to get/set computed style
    let computeid, compEl, dummyStyle, cs, style
    for( let i = 0, lg = computeTos.length; i<lg; i++ ){
      
      compEl = computeTos[i]
      computeid = compEl.dataset.computeid

      switch( compEl.tagName.toUpperCase() ){
        case 'IMG': style = defaultIMGStyles; break;
        case 'IFRAME': style = defaultIFRAMEStyles; break;
        default: style = defaultStyles; break;
      }

      for( let j = 0, lgj = computeFroms.length; j<lgj; j++ ){

        if( computeid == computeFroms[j].dataset.computeid ){

          cs = window.getComputedStyle(computeFroms[i])

          // get the differences
          var diff = {};
          for( var key in cs ) {
            if(cs.hasOwnProperty(key)
                  && style[ key ] !== cs[ key ] )
            {
              diff[ key ] = cs[ key ];
            }
          }

          // set the difference
          for( var key in diff ) {
            compEl.style[key] = cs[key]
          }

          // if( cs.getPropertyValue('position') != 'static' ){
          //   compEl.style.position = cs.getPropertyValue('position') 
          // }
          // if( cs.getPropertyValue('display') != 'inline' ){
          //   compEl.style.display = cs.getPropertyValue('inline-block') 
          // }

          j = lgj

        }

      }

    }

    for( let i = 0, lg = computeFroms.length; i<lg; i++ ){ 
      computeFroms[i].parentNode.removeChild(computeFroms[i])
    }

    dummyIFRAME.remove();
    dummyIMG.remove();
    dummy.remove();

  }

  // function setProperty( el, name ){
  //   // TODO exclude default value
  //   if( cs.getPropertyValue(name) ){
  //     console.log(name)
  //     el.style[name] = cs.getPropertyValue(name) 
  //   }
  // }
}())