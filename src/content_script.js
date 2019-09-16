/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/srcset/index.js":
/*!**************************************!*\
  !*** ./node_modules/srcset/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const arrayUniq = __webpack_require__(/*! array-uniq */ "./node_modules/srcset/node_modules/array-uniq/index.js");

const integerRegex = /^\d+$/;

function deepUnique(array) {
	return array.sort().filter((element, index) => {
		return JSON.stringify(element) !== JSON.stringify(array[index - 1]);
	});
}

exports.parse = string => {
	return deepUnique(
		string.split(',').map(part => {
			const result = {};

			part
				.trim()
				.split(/\s+/)
				.forEach((element, index) => {
					if (index === 0) {
						result.url = element;
						return;
					}

					const value = element.slice(0, element.length - 1);
					const postfix = element[element.length - 1];
					const integerValue = parseInt(value, 10);
					const floatValue = parseFloat(value);

					if (postfix === 'w' && integerRegex.test(value)) {
						result.width = integerValue;
					} else if (postfix === 'h' && integerRegex.test(value)) {
						result.height = integerValue;
					} else if (postfix === 'x' && !Number.isNaN(floatValue)) {
						result.density = floatValue;
					} else {
						throw new Error(`Invalid srcset descriptor: ${element}`);
					}
				});

			return result;
		})
	);
};

exports.stringify = array => {
	return arrayUniq(
		array.map(element => {
			if (!element.url) {
				throw new Error('URL is required');
			}

			const result = [element.url];

			if (element.width) {
				result.push(`${element.width}w`);
			}

			if (element.height) {
				result.push(`${element.height}h`);
			}

			if (element.density) {
				result.push(`${element.density}x`);
			}

			return result.join(' ');
		})
	).join(', ');
};


/***/ }),

/***/ "./node_modules/srcset/node_modules/array-uniq/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/srcset/node_modules/array-uniq/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const arrayUniq = array => [...new Set(array)];

module.exports = arrayUniq;


/***/ }),

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var srcsetUtil = __webpack_require__(/*! srcset */ "./node_modules/srcset/index.js"); // import { cssAnimation } from './scripts/css-animation.js'


var imgs = document.querySelectorAll('img');
var cleanedSrcset;
imgs.forEach(function (img) {
  // check that img is not already loaded
  // TODO
  if (!img.complete || img.complete && img.src == '') {
    var srcset,
        width = 9999; // TODO check actual size with getBoundinClientRect

    if (img.dataset.width) {
      width = img.dataset.width;
    } else if (img.width) {
      width = img.width;
    } // check srcset


    if (img.getAttribute('srcset') != null) {
      srcset = img.getAttribute('srcset');
      cleanedSrcset = cleanSrcset(srcset, width);
      if (cleanedSrcset) img.setAttribute('srcset', cleanedSrcset);
    } // also check lazy srcset 
    // TODO look at the main lazyload packages to find other lazyload implementations


    if (img.dataset.srcset) {
      srcset = img.dataset.srcset;
      cleanedSrcset = cleanSrcset(srcset, width);
      if (cleanedSrcset) img.dataset.srcset = cleanedSrcset;
    }
  }
});

function noRetinaSrcset(srcset) {
  srcset.forEach(function (o) {
    if (o.density && o.density > 1) {}
  });
}

function getSmallestSrcset(srcset, width) {
  var mini;
  var miniWidth = width,
      miniDensity;
  srcset.forEach(function (o) {
    if (mini) {
      var w;

      if (o.density && o.width) {
        w = o.density * o.width;
      } else if (o.width) {
        w = o.width;
      }

      if (w) {
        if (w < miniWidth) {
          mini = o;
        }
      } else {
        if (o.density && o.density < miniDensity) {
          mini = o;
        }
      }
    } else {
      mini = o;

      if (o.density) {
        miniDensity = o.density;
      } else {
        miniDensity = 1;
      }

      if (o.width) {
        miniWidth = o.width;
      }
    }
  });

  if (mini && mini.url && mini.url != '') {
    var aMini = [];
    aMini.push(mini);
    return aMini;
  } else {
    return false;
  }
} // remove all images except the smallest


function cleanSrcset(srcset, width) {
  var parsed = srcsetUtil.parse(srcset);
  var cleanedSrcset;

  if (true) {
    cleanedSrcset = getSmallestSrcset(parsed, width);
  } else {}

  if (cleanedSrcset) {
    return srcsetUtil.stringify(cleanedSrcset);
  } else {
    return false;
  }
} // chrome.tabs.onUpdated.addListener(
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

/***/ })

/******/ });
//# sourceMappingURL=content_script.js.map