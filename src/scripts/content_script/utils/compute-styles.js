(function(){
  
  let ctl = document.querySelectorAll('.lowweb__click-to-load')
  let ctlOrigin = document.querySelectorAll('.lowweb__click-to-load--original')

  let computedStyles
  const properties = ['top', 'left', 'bottom', 'right', 'width', 'height']

  // TODO find a better way to get/set computed style
  for( let i = 0, lg = ctl.length; i<lg; i++ ){

    if( ctl[i].dataset.computeid == ctlOrigin[i].dataset.computeid ){

      computedStyles = window.getComputedStyle(ctlOrigin[i])
      if( computedStyles.getPropertyValue('position') != 'static' ){
        ctl[i].style.position = computedStyles.getPropertyValue('position') 
      }
      if( computedStyles.getPropertyValue('display') != 'inline' ){
        ctl[i].style.display = computedStyles.getPropertyValue('inline-block') 
      }

      properties.forEach((prop)=>{
        setProperty( ctl[i], prop )
      })
       
    }

    ctlOrigin[i].parentNode.removeChild(ctlOrigin[i])

  }

  function setProperty( el, name ){
    // TODO exclude default value
    if( computedStyles.getPropertyValue(name) ){
      el.style[name] = computedStyles.getPropertyValue(name) 
    }
  }
}())