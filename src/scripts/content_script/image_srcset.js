import srcsetUtil from 'srcset';
import store from '../../store';

export default function(){

  const IMAGE_SRCSET = store.getters.image_srcset
  console.log('LOWWEB >>>>>>>>>> image srcset', IMAGE_SRCSET )

  if( IMAGE_SRCSET > 0 ){
    const imgs = document.querySelectorAll('img')
    let cleanedSrcset, box
    let boxes = []
    imgs.forEach((img)=>{
      boxes.push( img.getBoundingClientRect() )
    })

    imgs.forEach((img, index)=>{
      
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

        box = boxes[index]

        // check srcset
        if( img.srcset != null ){
          srcset = img.srcset
          cleanedSrcset = cleanSrcset( srcset, width, box )
          if( cleanedSrcset ) img.srcset = cleanedSrcset
        }

        if( img.dataset.srcset ){
          srcset = img.dataset.srcset
          cleanedSrcset = cleanSrcset( srcset, width, box )
          if( cleanedSrcset ) img.dataset.srcset = cleanedSrcset
        }

        if( img.dataset['lazy-srcset'] ){
          srcset = img.dataset['lazy-srcset']
          cleanedSrcset = cleanSrcset( srcset, width, box )
          if( cleanedSrcset ) img.dataset['lazy-srcset'] = cleanedSrcset
        }
  
        if( img.dataset.lowsrcset ){
          srcset = img.dataset.lowsrcset
          cleanedSrcset = cleanSrcset( srcset, width, box )
          if( cleanedSrcset ) img.dataset.lowsrcset = cleanedSrcset
        }

      }

    }) 
  } 
}

function noRetina( srcset ){
  
  for ( let i = srcset.length - 1; i >= 0; i -= 1) {
    if( srcset[i].density && srcset[i].density > 1 ){
      srcset.splice(i, 1);
    }
  }

  return srcset
}

function smart( srcset, box ){

  srcset = noRetina( srcset )
  srcset = sortSrcset( srcset )

  let newSrcset = [srcset[0]]

  srcset.forEach((o, i)=>{

    if( i > 0 ){
      if( o.width ){
        let dpiWidth = box.width * window.devicePixelRatio
        if( dpiWidth > o.width ){
          newSrcset.push(o)
        }
      } 
    }

  })

  return newSrcset

}

function compare( a, b ) {
  if ( a.width < b.width ){
    return -1;
  }
  if ( a.width > b.width ){
    return 1;
  }
  return 0;
}

function sortSrcset( srcset ){
  return srcset.sort( compare )
}

function smallest( srcset, width ){

  let mini
  let miniWidth = width, miniDensity

  srcset = noRetina(srcset)

  srcset.forEach((o)=>{
    if( mini ){
      let w = o.width
      if( w && w < miniWidth ){
        mini = o
      }
    }else{
      mini = o

      if( o.width ){
        miniWidth = o.width
      }
    }
  })

  if( mini && mini.url && mini.url != '' ){
    return [mini]
  }else{
    return false
  }
}

// remove all images except the smallest
function cleanSrcset( srcset, width, box ){
  const parsed = srcsetUtil.parse(srcset);
  
  let cleanedSrcset
  switch( parseInt(store.getters.image_srcset) ){
    case 1:
      cleanedSrcset = noRetina( parsed )
      break;
    case 2:
      cleanedSrcset = smallest( parsed, width )
      break;
    case 3:
      cleanedSrcset = smart( parsed, box )
      break;
  }

  cleanedSrcset = smallest( parsed, width )

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