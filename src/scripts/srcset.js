console.log('srcset')
const srcsetUtil = require('srcset');

let imgs = document.querySelectorAll('img')
let cleanedSrcset
imgs.forEach((img)=>{
  
  // check that img is not already loaded
  // TODO
  if( ! img.complete || ( img.complete && img.src == '' ) ){

    let srcset, width = 9999
    // TODO check actual size with getBoundinClientRect
    if( img.dataset.width ){
      width = img.dataset.width
    }else if( img.width ){
      width = img.width
    }

    // check srcset
    if( img.getAttribute('srcset') != null ){
      srcset = img.getAttribute('srcset')
      cleanedSrcset = cleanSrcset( srcset, width )
      if( cleanedSrcset ) img.setAttribute('srcset', cleanedSrcset )
    }

    // also check lazy srcset 
    // TODO look at the main lazyload packages to find other lazyload implementations
    if( img.dataset.srcset ){
      srcset = img.dataset.srcset
      cleanedSrcset = cleanSrcset( srcset, width )
      if( cleanedSrcset ) img.dataset.srcset = cleanedSrcset
    }

  }

})

function noRetinaSrcset( srcset ){
  srcset.forEach((o, index, object)=>{
    if( o.density && o.density > 1 ){
      object.splice(index, 1);
    }
  })
}

function getSmallestSrcset( srcset, width ){

  let mini
  let miniWidth = width, miniDensity

  srcset.forEach((o)=>{
    if( mini ){
      let w
      if( o.density && o.width ){
        w = o.density * o.width
      }else if( o.width ){
        w = o.width
      }

      if( w ){
        if( w < miniWidth ){
          mini = o
        }
      }else{
        if( o.density && o.density < miniDensity ){
          mini = o
        }
      }
    }else{
      mini = o
      
      if( o.density ){
        miniDensity = o.density
      }else{
        miniDensity = 1
      }

      if( o.width ){
        miniWidth = o.width
      }
    }
  })

  if( mini && mini.url && mini.url != '' ){
    let aMini = []
    aMini.push(mini)
    return aMini
  }else{
    return false
  }
}

// remove all images except the smallest
function cleanSrcset( srcset, width ){
  const parsed = srcsetUtil.parse(srcset);
  
  let cleanedSrcset
  if( true ){
    cleanedSrcset = getSmallestSrcset( parsed, width )
  }else{
    cleanedSrcset = noRetinaSrcset( parsed )
  }

  if( cleanedSrcset ){
    return srcsetUtil.stringify(cleanedSrcset)
  }else{
    return false
  }
}
  // chrome.tabs.onUpdated.addListener(
  //   function(tabId, changeInfo, tab){
  //     console.log(tab)
  //     console.log(document)
  //   }
  // );

  // chrome.tabs.onUpdated.addListener(
  //   function(tabId, changeInfo, tab){
  //     console.log(tab)
  //     console.log(document)
  //   }
  // );