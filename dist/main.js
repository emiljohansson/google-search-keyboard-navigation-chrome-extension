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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_keyboard_handler__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_keyboard_handler___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_keyboard_handler__);


const focusTitleClass = 'focused-title'
const focusLinkClass = 'focused-link'

const searchField = document.querySelector('input[type="text"]')
const titles = [...document.querySelectorAll('h3.r, ._bCp, .zjbNbe')].filter(el => !el.classList.contains('_Ojt'))
const links = document.querySelectorAll('h3.r a, ._bCp a, .zjbNbe a')
let focusIndex = -1
let cmdIsDown = false

Object(__WEBPACK_IMPORTED_MODULE_0_keyboard_handler__["keyIsDown"])(91, () => {
  cmdIsDown = true
})

Object(__WEBPACK_IMPORTED_MODULE_0_keyboard_handler__["keyReleased"])(event => {
  if (cmdIsDown && event.key === 'Meta') {
    cmdIsDown = false
  }
})

Object(__WEBPACK_IMPORTED_MODULE_0_keyboard_handler__["keyPressed"])(event => {
  if (cmdIsDown) {
    return
  }
  const key = event.key
  const isBackspace = key === 'Backspace'
  if (key === 'ArrowDown') {
    updateFocus(event, focusIndex + 1)
    return
  }
  if (key === 'ArrowUp') {
    updateFocus(event, focusIndex - 1)
    return
  }
  if (!canFocusField(key) && !isBackspace) {
    return
  }
  if (document.activeElement === searchField) {
    return
  }
  searchField.focus()
  if (isBackspace) {
    removeFromSearchFieldValue()
    return
  }
  addToSearchFieldValue()
})

const updateFocus = (event, nextIndex) => {
  removeFocused()
  if (nextIndex < 0) {
    nextIndex = 0
  }
  if (nextIndex >= links.length) {
    nextIndex = links.length - 1
  }
  focusIndex = nextIndex
  titles[focusIndex].classList.add(focusTitleClass)
  links[focusIndex].classList.add(focusLinkClass)
  links[focusIndex].focus()

  event.stopPropagation()
  event.preventDefault()
}

const removeFocused = () => {
  if (focusIndex < 0) {
    return
  }
  titles[focusIndex].classList.remove(focusTitleClass)
  links[focusIndex].classList.remove(focusLinkClass)
}

const canFocusField = key => key.length === 1 && /[a-z0-9]/i.test(key)

const removeFromSearchFieldValue = () => {
  const value = searchField.value
  searchField.focus()
  searchField.value = ''
  searchField.value = value
}

const addToSearchFieldValue = () => {
  const space = ' '
  let value = searchField.value.replace(/  +/g, space)
  const length = value.length
  if (value[length - 1] !== space) {
    value += space
  }
  searchField.value = value
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.codes = {
    'backspace': 8,
    'tab': 9,
    'enter': 13,
    'shift': 16,
    'control': 17,
    'alt': 18,
    'caps_lock': 20,
    'escape': 27,
    'space': 32,
    'page_up': 33,
    'page_down': 34,
    'end': 35,
    'home': 36,
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40,
    'delete': 46
};

var types = {
    down: 'keydown',
    up: 'keyup'
};
var events = {};
var keyDownEvents;
var codeCache = {};

exports.keysAreDown = function(codes, cb) {
    exports.keyPressed(function(event) {
        if (!every(codes, function(code) {
                return codeCache[code] === true;
            })) {
            return;
        }
        cb();
    });
};

exports.keyIsDown = function(code, cb) {
    if (keyDownEvents) {
        if (!keyDownEvents[code]) {
            keyDownEvents[code] = [cb];
            return;
        }
        keyDownEvents[code].push(cb);
        return;
    }
    keyDownEvents = {};
    keyDownEvents[code] = [cb];
    exports.keyPressed(onKeyIsDown);
};

exports.keyPressed = function(cb) {
    initEvent(types.down);
    events[types.down].push(cb);
};

exports.keyReleased = function(cb) {
    initEvent(types.up);
    events[types.up].push(cb);
};

function getKey(event) {
    return event.keyCode || event.which;
}

function onKeyIsDown(event) {
    var callbacks = keyDownEvents[getKey(event)];
    if (!callbacks) {
        return;
    }
    forEach(callbacks, bind(caller, event));
}

function bind(cb, thisArg) {
    return function() {
        var args = Array.prototype.slice.call(arguments);
        args.push(thisArg);
        cb.apply(thisArg, args);
    };
}

function every(array, predicate) {
    var length = array.length;
    var index = -1;
    while (++index < length) {
        if (predicate(array[index]) === false) {
            return false;
        }
    }
    return true;
}

function forEach(array, iteratee) {
    var length = array.length;
    var index = -1;
    while (++index < length) {
        iteratee(array[index]);
    }
}

function initEvent(type) {
    if (events[type]) {
        return;
    }
    events[type] = [];
    document.addEventListener(type, on(events[type]));
}

function on(array) {
    return function(event) {
        if (event.type === types.down) {
            codeCache[getKey(event)] = true;
        }
        if (event.type === types.up) {
            delete codeCache[getKey(event)];
        }
        forEach(array, bind(caller, event));
    };
}

function caller(cb, event) {
    cb(event);
}


/***/ })
/******/ ]);