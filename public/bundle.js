/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	var {week, weekModel} = __webpack_require__(5);
	
	window.addEventListener('load', ()=>{
	 document.body.appendChild(week(new weekModel(1)));
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./app.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./app.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "html, body {\n  margin: 0;\n  padding: 0; }\n\nbody {\n  height: 100%;\n  min-width: 800px;\n  padding-top: 20px;\n  font: 16px Arial, Helvetica, sans-serif; }\n", "", {"version":3,"sources":["/./components/components/styles/app.scss"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,WAAW,EACZ;;AACD;EACE,aAAa;EACb,iBAAiB;EACjB,kBAAkB;EAClB,wCAAwC,EACzC","file":"app.scss","sourcesContent":["html, body {\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\nbody {\r\n  height: 100%;\r\n  min-width: 800px;\r\n  padding-top: 20px;\r\n  font: 16px Arial, Helvetica, sans-serif;\r\n}\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  week : __webpack_require__(6),
	  weekModel : __webpack_require__(15)
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	var Day = __webpack_require__(9);
	
	function Week(content) {
	  let container = document.createElement('div');
	
	  container.innerHTML = `
	<div class="calendar-week">
	  <div class="head">
	    <div class="header"><span>Hour</span></div>
	    <div class="header"><span>Monday</span></div>
	    <div class="header"><span>Tuesday</span></div>
	    <div class="header"><span>Wednesday</span></div>
	    <div class="header"><span>Thursday</span></div>
	    <div class="header"><span>Friday</span></div>
	    <div class="header"><span>Saturday</span></div>
	    <div class="header"><span>Sunday</span></div>
	  </div>
	  <div class="body">
	  </div>
	</div>
	`;
	  let body = container.querySelector('.body');
	  let hoursList = document.createElement('ul');
	
	  for (let i = 1; i <= 24; i ++) {
	    hoursList.innerHTML += `
	    <li class="hour hour-number">${i}</li>
	    `;
	  }
	  let hours = document.createElement('div');
	  hours.classList.add('day-wrapper');
	  hours.appendChild(hoursList);
	  body.appendChild(hours);
	
	  for (let i = 0; i < 7; i++) {
	    container.querySelector('.body').appendChild(new Day(content.days[i]));
	  }
	
	  return container;
	}
	
	module.exports = Week;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./weekstyle.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./weekstyle.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".flex-container, .calendar-week .head, .calendar-week .body {\n  display: flex;\n  flex-direction: row;\n  justify-content: center; }\n\n.calendar-week {\n  width: 90%;\n  height: 90%;\n  margin: 0 auto;\n  border: 1px solid #072100; }\n  .calendar-week .head, .calendar-week .body {\n    border-bottom: 1px solid #072100; }\n    .calendar-week .head .header, .calendar-week .head .day-wrapper, .calendar-week .body .header, .calendar-week .body .day-wrapper {\n      width: 13%;\n      flex-basis: 300px;\n      border-left: 1px solid #072100;\n      text-align: center; }\n    .calendar-week .head .header:first-child, .calendar-week .head .day-wrapper:first-child, .calendar-week .body .header:first-child, .calendar-week .body .day-wrapper:first-child {\n      max-width: 55px;\n      min-width: 55px;\n      border: none; }\n  .calendar-week .head {\n    background-color: #e2ffdb; }\n  .calendar-week .body {\n    border: none; }\n", "", {"version":3,"sources":["/./components/components/styles/weekstyle.scss"],"names":[],"mappings":"AAEA;EACE,cAAc;EACd,oBAAoB;EACpB,wBAAwB,EACzB;;AAED;EACE,WAAW;EACX,YAAY;EACZ,eAAe;EACf,0BAZ6B,EAkC9B;EA1BD;IAOI,iCAf2B,EA2B5B;IAnBH;MASM,WAAW;MACX,kBAAkB;MAClB,+BAnByB;MAoBzB,mBAAmB,EACpB;IAbL;MAeM,gBAAgB;MAChB,gBAAgB;MAChB,aAAa,EACd;EAlBL;IAqBI,0BAA0B,EAC3B;EAtBH;IAwBI,aAAa,EACd","file":"weekstyle.scss","sourcesContent":["$calendar-border-color: #072100;\r\n\r\n.flex-container {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: center;\r\n}\r\n\r\n.calendar-week {\r\n  width: 90%;\r\n  height: 90%;\r\n  margin: 0 auto;\r\n  border: 1px solid $calendar-border-color;\r\n  .head, .body {\r\n    @extend .flex-container;\r\n    border-bottom: 1px solid $calendar-border-color;\r\n    .header, .day-wrapper {\r\n      width: 13%;\r\n      flex-basis: 300px;\r\n      border-left: 1px solid $calendar-border-color;\r\n      text-align: center;\r\n    }\r\n    .header:first-child, .day-wrapper:first-child {\r\n      max-width: 55px;\r\n      min-width: 55px;\r\n      border: none;\r\n    }\r\n  }\r\n  .head {\r\n    background-color: #e2ffdb;\r\n  }\r\n  .body {\r\n    border: none;\r\n  }\r\n}\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);
	var Hour = __webpack_require__(12);
	
	function DayView(context) {
	  var container = document.createElement('div');
	  hoursList = document.createElement('ul');
	
	  for (let i = 1; i <=24; i++) {
	    hoursList.appendChild(new Hour(context.hours[i-1]));
	  }
	
	  container.appendChild(hoursList);
	  container.classList.add('day-wrapper');
	  return container;
	}
	
	module.exports = DayView;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./daystyle.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./daystyle.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".day-wrapper ul {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n", "", {"version":3,"sources":["/./components/components/styles/daystyle.scss"],"names":[],"mappings":"AAAA;EACE,iBAAiB;EACjB,UAAU;EACV,WAAW,EACZ","file":"daystyle.scss","sourcesContent":[".day-wrapper ul {\r\n  list-style: none;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(13);
	
	function HourView(context) {
	  var container = document.createElement('li');
	  var caption = document.createElement('h6');
	  var text = document.createElement('p');
	
	  container.classList.add('hour');
	  caption.classList.add('caption');
	  text.classList.add('text');
	
	  if (context.data.caption) {
	    container.classList.add('has-note');
	  }
	
	  caption.innerText = context.data.caption;
	  text.innerText = context.data.text;
	
	  container.appendChild(caption);
	  container.appendChild(text);
	
	  return container;
	}
	
	module.exports = HourView;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./hourstyle.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/sass-loader/index.js?sourceMap!./hourstyle.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".hour {\n  border-bottom: 1px solid black;\n  box-sizing: border-box;\n  min-height: 1.72em; }\n  .hour .dots, .hour .caption, .hour .text {\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden; }\n  .hour .zeroIndent, .hour .caption, .hour .text {\n    margin: 0;\n    padding: 0; }\n  .hour .caption {\n    color: #2a0505;\n    font-weight: bold;\n    font-style: italic; }\n  .hour .text {\n    color: #01062f;\n    font-size: 0.55em; }\n  .hour:last-child {\n    border: none; }\n\n.hour-number {\n  background-color: #d0edff; }\n\n.has-note {\n  background-color: #c2c8f9; }\n", "", {"version":3,"sources":["/./components/components/styles/hourstyle.scss"],"names":[],"mappings":"AAEA;EACE,+BAA+B;EAC/B,uBAAuB;EACvB,mBALa,EAkCd;EAhCD;IAMI,oBAAoB;IACpB,wBAAwB;IACxB,iBAAiB,EAClB;EATH;IAYI,UAAU;IACV,WAAW,EACZ;EAdH;IAkBI,eAAe;IACf,kBAAkB;IAClB,mBAAmB,EACpB;EArBH;IAyBI,eAAe;IACf,kBAAkB,EACnB;EA3BH;IA8BI,aAAa,EACd;;AAEH;EACE,0BAA0B,EAC3B;;AACD;EACE,0BAA0B,EAC3B","file":"hourstyle.scss","sourcesContent":["$height: 0.55em + 0.67em + 0.5em;\r\n\r\n.hour{\r\n  border-bottom: 1px solid black;\r\n  box-sizing: border-box;\r\n  min-height: $height;\r\n\r\n  .dots {\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n    overflow: hidden;\r\n  }\r\n\r\n  .zeroIndent {\r\n    margin: 0;\r\n    padding: 0;\r\n  }\r\n  .caption {\r\n    @extend .zeroIndent;\r\n    @extend .dots;\r\n    color: #2a0505;\r\n    font-weight: bold;\r\n    font-style: italic;\r\n  }\r\n  .text {\r\n    @extend .zeroIndent;\r\n    @extend .dots;\r\n    color: #01062f;\r\n    font-size: 0.55em;\r\n  }\r\n\r\n  &:last-child {\r\n    border: none;\r\n  }\r\n}\r\n.hour-number {\r\n  background-color: #d0edff;\r\n}\r\n.has-note {\r\n  background-color: #c2c8f9;\r\n}\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Day = __webpack_require__(16);
	
	class WeekModel {
	  constructor(weekNumber = 1){
	    this.weekNumber = weekNumber;
	    this.days = [];
	    for (let i = 0; i < 7; i++) {
	      this.days.push(new Day(weekNumber, i+1));
	    }
	  }
	}
	
	module.exports = WeekModel;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Hour = __webpack_require__(17);
	var notesList = __webpack_require__(19);
	var Note = __webpack_require__(18);
	
	class DayModel {
	
	  constructor(weekNumber = 1, dayNumber = 1){
	    this.hours = [];
	    let notesByHour = {};
	
	    if (notesList['week' + weekNumber]) {
	      if (notesList['week' + weekNumber]['day' + dayNumber]) {
	        notesList['week' + weekNumber]['day' + dayNumber].notes.forEach(note => {
	          notesByHour['hour' + note.hour] = new Note(note.caption, note.text);
	        });
	      }
	    }
	
	    for (let i = 1; i <= 24; i++) {
	      this.hours.push(new Hour(notesByHour, i));
	    }
	  }
	}
	
	module.exports = DayModel;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Note = __webpack_require__(18);
	
	class HourModel {
	  constructor(context = {}, hour) {
	    this.hour = hour;
	    if (context['hour' + hour]) {
	      this.data = new Note(context['hour' + hour].caption, context['hour' + hour].text);
	    } else {
	      this.data = new Note();
	    }
	  }
	}
	
	module.exports = HourModel;


/***/ },
/* 18 */
/***/ function(module, exports) {

	class Note {
	  constructor (caption = '', text = '') {
	    this.caption = caption;
	    this.text = text;
	  }
	}
	
	module.exports = Note;


/***/ },
/* 19 */
/***/ function(module, exports) {

	var notesList = {
	  week1 : {
	    day1 : {
	      notes : [
	        {
	          hour : 7,
	          caption : 'note 1',
	          text : "Create task with very long text content for test column width"
	        }
	      ]
	    },
	    day3 : {
	      notes : [
	        {
	          hour : 15,
	          caption : 'note 1',
	          text : "Complete task"
	        }
	      ]
	    },
	    day5 : {
	      notes : [
	        {
	          hour : 19,
	          caption : 'note 1',
	          text : "Send work"
	        }
	      ]
	    },
	  }
	};
	
	module.exports = notesList;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map