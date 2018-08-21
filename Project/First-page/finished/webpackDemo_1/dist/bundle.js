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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__com_news__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__com_news___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__com_news__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__com_goTop__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__com_goTop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__com_goTop__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__com_carousel__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__com_carousel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__com_carousel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_css__);





	__WEBPACK_IMPORTED_MODULE_0__com_news___default.a.init($('.pinterest'))
	__WEBPACK_IMPORTED_MODULE_1__com_goTop___default.a.init($('body'),$('.goTop'))
	__WEBPACK_IMPORTED_MODULE_2__com_carousel___default.a.init($('.carousel-info'))


/***/ }),
/* 1 */
/***/ (function(module, exports) {


		function Pinterest($ct) {
			this.$ct = $ct
			this.init()
		}

		Pinterest.prototype.init = function() {
			this.cardWidth = $(this.$ct).find('.getWidth').innerWidth()
			this.pageNum = 2
			this.cardPad = 30
			this.pageIdx = 0
			this.cardArr = []
			this.nowLoad = 0
			this.status = true
			this.$btn = $(this.$ct.find('.getMore'))
			this.getWidth()
			this.runAjax( this.rowNum * 2 )
			this.bindBtn()
			this.reorder()
		};

		Pinterest.prototype.getWidth = function() {
			this.maxHeight = 0
			this.rowNum = Math.floor ( $( this.$ct ).innerWidth() / ( this.cardWidth + this.cardPad ) )
			this.beginLeft = ( $( this.$ct ).innerWidth() - this.rowNum * ( this.cardWidth + this.cardPad ) + this.cardPad ) / 2 
			this.hArr = []
			for (let i = 0; i<this.rowNum; i++)
				this.hArr[i] = 0
		};

		Pinterest.prototype.runAjax = function(n) {
			let _this = this
			$.ajax({
				url:"https://platform.sina.com.cn/slide/album_tech",
				data: {
					num: n, 
					page: this.pageNum, 
					app_key:1271687855, 
				} ,
				dataType: "jsonp",
				jsonp: "jsoncallback"
			}).done(function(e){
				_this.dealData($(e.data))
			})
		};

		Pinterest.prototype.dealData = function($e) {
			let _this = this
			$e.each(function(idx,e){
				let $tmp =$(`
					<div class="card" clickUrl=` +  e.url + `>
						<img src=` + e.img_url + `>
						<h3>` + e.short_name + `</h3>
						<p>` + e.name + `</p>
						<p>` + e.short_intro +`</p>
						<div class="cover"></div>
					</div>
				`)
				$tmp.find('img')[0].onload = function(){
					_this.cardArr.push($tmp)
					_this.nowLoad++	//	已经加载了 nowLoad 张图片
					_this.status = _this.nowLoad === _this.rowNum * 2 ? true : false
					_this.cardArr[_this.pageIdx].click(function(e){
						window.open($(this).attr('clickUrl'))
					})
					_this.renderCard(_this.pageIdx)
					_this.pageIdx ++
				}

			})
		};

		Pinterest.prototype.renderCard = function(i) {	
			let idx = this.hArr.indexOf(Math.min.apply([],this.hArr))
			this.cardArr[i].appendTo(this.$ct).animate( { left: this.beginLeft + idx * ( this.cardWidth + this.cardPad ), top: this.hArr[idx] } ,100) 
			this.hArr[idx] += this.cardArr[i].innerHeight() + this.cardPad
			this.maxHeight = Math.max( this.maxHeight, this.hArr[idx])
			this.$ct.css({paddingTop: this.maxHeight})
		};
		//	加载更多
		Pinterest.prototype.bindBtn = function() {
			let _this = this
			this.$btn.click(function(){
				if (_this.status) {
					_this.status = false;
					_this.nowLoad = 0
					_this.pageNum = Math.ceil(_this.pageIdx / _this.rowNum) + 1
					_this.runAjax( _this.rowNum * 2 )
				}
			})
		};

		Pinterest.prototype.reorder = function(){
			let _this = this
			let clock
			$(window).resize(function(){
				clearTimeout(clock)
				clock = setTimeout(function(){
					if ( _this.status ) {
						console.log(1)
						_this.getWidth()
						$.each( _this.cardArr, function(i,e){
							_this.renderCard(i)
						})
					}
				}, 300)
			})
		}

	module.exports =  {
			init: function(ct){
				new Pinterest(ct)
			}
	}


/***/ }),
/* 2 */
/***/ (function(module, exports) {


    function GoTop(ct,target){
      this.ct = ct
      this.preTop = $(window).scrollTop()
      this.target = target
      this.bindEvent()
    }

    GoTop.prototype.bindEvent = function() {
      let self = this
      self.target.click(function(){
        self.ct.animate({scrollTop: 0}, 300); 
      })
      let flag = true
      $(window).scroll(function(e){
          self.nowTop = $(window).scrollTop()
          if (self.nowTop > 100 && flag) {
            self.target.fadeIn(100)
            flag = false
          } else if (self.nowTop <= 100 && !flag){
            self.target.fadeOut(100)
            flag = true
          }
      })
    }

   module.exports = {
      init: function(ct,target){
        new GoTop(ct,target)
      }
    }


/***/ }),
/* 3 */
/***/ (function(module, exports) {


	function Carousel($ct) {
		this.$ct = $ct
	    this.init()
	}


	Carousel.prototype.init = function(){
	    this.nowIndex = 1
	    this.nowIndicators = 1
	    this.$carousel = this.$ct.find('.carousel')
	    this.$info = this.$ct.find('.info')
	    this.$carousel.data("flag",0)
	    this.infoArr = []
	    this.imgArr = []
		this.imgNum = 1
		this.animTime = 300
	    this.runAjax()
	}

	Carousel.prototype.runAjax = function() {
		let _this = this
		$.ajax({
			url:"https://platform.sina.com.cn/slide/album_tech",
			data: {
				num: 5, 
				page: 1, 
				app_key:1271687855, 
			} ,
			dataType: "jsonp",
			jsonp: "jsoncallback"
		}).done(function(e){
			_this.dealData(e.data)
		})
	};


	Carousel.prototype.dealData = function(e) {
		let _this = this
		$(e).each(function(i,e){
			let img = new Image()
			img.src = e.img_url
			$(img).attr("clickUrl",e.url)
			let $info = $('<li><h2>' +
						 (e.short_name ? e.short_name : e.name) +
						 '</h2><p>' +
						 e.name +
						 '</p></li>')
			img.onload = function(){
				_this.imgArr[_this.imgNum] = this
				_this.infoArr[_this.imgNum] = $info
				_this.imgNum++
				if (_this.imgNum === 6) {
					_this.imgArr.push($(_this.imgArr[1]).clone()[0])
					_this.imgArr[0] = $(_this.imgArr[5]).clone()[0]
					_this.infoArr.push($(_this.infoArr[1]).clone()[0])
					_this.infoArr[0] = $(_this.infoArr[5]).clone()[0]
					_this.renderData()
	  				_this.widthInit()
	  				_this.bind()
	  
				}
			}
		})
	};


	Carousel.prototype.renderData = function() {
		let _this = this
		$(this.imgArr).each(function(i,e){
			$(e).appendTo(_this.$carousel)
			$(e).click(function(e){
							window.open($(this).attr('clickUrl'))
						})
		})

		$(this.infoArr).each(function(i,e){
			$(e).appendTo(_this.$info)
		})

		setInterval(function(){
			_this.play(1, 1)
		},2500)

	};


	Carousel.prototype.widthInit = function(){
	  this.carWidth = this.$ct.find('.carouselCt').width()
	  this.infoWidth = this.$ct.find('.infoCt').width()
	  this.$carousel.css({left: -1 * this.nowIndex * this.carWidth})
	  this.$info.css({left: -1 * this.nowIndex * this.infoWidth})
	}

	Carousel.prototype.bind = function(){
	  let self = this
	  
	  this.$ct.find('.pre').click(function(){
	    self.play(1,-1)
	  })

	  this.$ct.find('.next').click(function(){
	    self.play(1,1)
	  })

	  this.$ct.find('.trig').on('click','li',function(){
	    let t = -1
	    let num = $(this).index()+1
	    if  (num > self.nowIndex) 
	      t = 1
	    self.play((num-self.nowIndex)*t,t)
	  })

	  $(window).resize(function(){
	  	self.widthInit()
	  })

	}

	Carousel.prototype.play = function(n,direction){
	  let self = this
	  if (this.$carousel.data("flag")) return
	  this.$carousel.data("flag",1)
	  this.nowIndex += n*direction 
	  let sum = -1 * this.nowIndex

	  this.$carousel.animate({left:sum * this.carWidth},this.animTime,function(){
	    self.$carousel.data("flag",0)
	  })

	  this.$info.animate({left:sum * this.infoWidth},this.animTime)

	  if (self.nowIndex === 0) {
	    self.$carousel.animate({left:-this.carWidth*5},0)
	    self.$info.animate({left:-this.infoWidth*5},0)
	    self.nowIndex = 5
	  } 
	  if (self.nowIndex === 6) {
	    self.$carousel.animate({left:-this.carWidth},0)
	    self.$info.animate({left:-this.infoWidth},0)
	    self.nowIndex = 1
	  }
	  self.playIndicators(self.nowIndex)
	}

	Carousel.prototype.playIndicators = function(n) {
	  this.$ct.find('.trig li').eq(this.nowIndicators-1).removeClass('active')
	  this.$ct.find('.trig li').eq(n-1).addClass('active')
	  this.nowIndicators = n
	};

	module.exports = {
		init:function(e){
			new Carousel(e)
		}
	}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "*{\r\n\tpadding: 0;\r\n\tmargin: 0;\r\n}\r\n\r\nmain {\r\n\tposition: relative;\r\n}\r\n\r\n\r\n/*---回到顶部---*/\r\n.goTop {\r\n\tcolor: white;\r\n\tpadding: 10px;\r\n\tborder-radius: 5px;\r\n\tborder:0;\r\n\toutline: none;\r\n\tbackground: rgba(0,0,0,0.6);\r\n\tposition:fixed;\r\n\tbottom: 50px;\r\n\tright: 50px;\r\n\tz-index: 10;\r\n\tdisplay: none;\r\n\tcursor: pointer;\r\n}\r\n\r\n.goTop:hover {\r\n\tbackground: rgba(0,0,0,0.4);\r\n}\r\n\r\n.goTop:active {\r\n\tbackground: rgba(0,0,0,0.2);\r\n}\r\n/*---END---*/\r\n\r\n/*---瀑布流---*/\r\n.getWidth {\r\n\tdisplay: none;\r\n}\r\n\r\n.pinterest {\r\n\tposition: relative;\r\n\tmax-width: 1800px;\r\n\tmin-width: 300px;\r\n\tmargin-right: auto;\r\n\tmargin-left: auto;\r\n\tpadding-bottom: 50px;\r\n}\r\n.card {\r\n\tposition:absolute;\r\n\twidth: 240px;\r\n\t/*border-radius: 5px;*/\r\n\tpadding: 10px;\r\n\tborder:1px solid rgba( 0, 0, 0, .1 );\r\n\tcursor: pointer;\r\n}\r\n\r\n.card img {\r\n\twidth: 100%;\r\n\tz-index: -1;\r\n\t/*border-radius: 5px;*/\r\n}\r\n\r\n.card h3 {\r\n\tpadding: 10px;\r\n\tmargin:10px 0;\r\n}\r\n\r\n.card p {\r\n\tpadding: 10px;\r\n\tcolor: #666;\r\n}\r\n\r\n.card .cover {\r\n\ttop:0;\r\n\tleft:0;\r\n\tdisplay: none;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tposition: absolute;\r\n\t/*border-radius: 5px;*/\r\n\tbackground: rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.card:hover .cover {\r\n\tdisplay: block;\r\n\ttransition: all 1s;\r\n} \r\n\r\n.getMore {\r\n\tcolor: #999;\r\n\tpadding: 10px;\r\n\tbackground: white;\r\n\tborder: 1px solid #999;\r\n\t/*border-radius: 5px;*/\r\n\toutline: none;\r\n\tcursor: pointer;\r\n\tmargin-right: auto;\r\n\tmargin-left: auto;\r\n\tdisplay: block;\r\n}\r\n\r\n.getMore:hover {\r\n\tbackground: yellow;\r\n}\r\n\r\n.getMore:active {\r\n\tbackground: #aaa;\r\n}\r\n/*---END---*/\r\n/*---轮播---*/\r\n* {\r\n\tpadding: 0;\r\n\tmargin: 0;\r\n}\r\n\r\nli {\r\n\tlist-style: none;\r\n}\r\n\r\n\r\n.carousel-info {\r\n\tbackground: white;\r\n\twidth: 100vw;\r\n\theight: 30vw; \r\n\tmin-width: 600px;\r\n\tmin-height: 180px;\r\n\toverflow: hidden;\r\n\tposition: relative;\r\n\tmargin-bottom: 10vw;\r\n}\r\n\r\n.carousel-info .carouselCt {\r\n\tbox-sizing: border-box;\r\n\tfloat: left;\r\n\theight: 100%;\r\n\twidth: 60%;\r\n\toverflow: hidden;\r\n\tposition: relative;\r\n}\r\n\r\n.carousel-info .carouselCt .carousel {\r\n\twidth:calc(100% * 7); \r\n\tposition: absolute;\r\n}\r\n\r\n.carousel-info .carouselCt img {\t\r\n\twidth: calc(100% / 7);\r\n\tfloat: left;\r\n\tcursor: pointer;\r\n}\r\n\r\n.carousel-info .carouselCt button{\r\n\tposition: absolute;\r\n\tright: 5%;\r\n\ttop: 50%;\r\n\tbackground: white;\r\n\twidth: 2vw;\r\n\theight: 2vw;\r\n\tmin-width: 20px;\r\n\tmin-height: 20px;\r\n\tborder-radius: 9999px;\r\n\tborder:0;\r\n\tfont-size: 1.8vw;\r\n\tfont-weight: bold;\r\n\toutline: none;\r\n\tcursor: pointer;\r\n}\r\n\r\n.carousel-info .carouselCt .pre {\r\n\tleft: 5%;\r\n}\r\n\r\n.carousel-info .carouselCt button:hover {\r\n\tbackground: yellow;\r\n}\r\n\r\n.carousel-info .carouselCt button:active {\r\n\tcolor: #ccc;\r\n\r\n}\r\n\r\n.carousel-info .carouselCt .trig {\r\n\tposition: absolute;\r\n\tdisplay: block;\t\r\n\tbottom: 5%;\r\n \twidth: 100%;\r\n  \ttext-align: center;\r\n  \tfont-size: 0;\r\n}\r\n\r\n.carousel-info .carouselCt .trig li{\r\n\tposition: relative;\r\n\tdisplay: inline-block;\r\n\twidth: 4%;\r\n\theight: .5vw;\r\n\tmin-height: 4px;\r\n\tpadding: .5% .4%;\r\n\r\n\tcursor: pointer;\r\n}\r\n\r\n.carousel-info .carouselCt .trig li span {\r\n\tdisplay: inline-block;\r\n\tbackground: white;\r\n\theight: 100%;\r\n\twidth: 100%;\r\n\tborder-radius: 999px;\r\n}\r\n\r\n.carousel-info .carouselCt .trig li:hover span{\r\n\tbackground: yellow;\r\n}\r\n\r\n.carousel-info .carouselCt .trig .active span{\r\n\tbackground: yellow;\r\n}\r\n\r\n\r\n.carousel-info .infoCt {\r\n\tfloat: left;\r\n\theight: 100%;\r\n\twidth: 40%;\r\n\tbackground: yellow;\r\n\tposition: relative;\r\n\toverflow: hidden;\r\n}\r\n\r\n.carousel-info .info {\r\n\twidth: calc(100% * 7);\r\n\tposition: absolute;\r\n}\r\n\r\n.carousel-info .info li {\r\n\tbox-sizing: border-box;\r\n\tdisplay: inline-block;\r\n\tpadding: 2%;\r\n\tfloat: left;\r\n\twidth: calc(100% / 7);\r\n}\r\n\r\n.carousel-info .info h2 {\r\n\tfont-size: 4vw;\r\n\r\n}\r\n\r\n@media screen and (max-width: 600px) {\r\n    .carousel-info .info h2 {\r\n        font-size:24px;\r\n    }\r\n\r\n    .carousel-info .info p {\r\n    \tfont-size:7.2px;\r\n    }\r\n\r\n    .carousel-info .carouselCt button {\r\n    \tfont-size:10.8px;\r\n    }\r\n}\r\n\r\n\r\n.carousel-info .info p {\r\n\tcolor: #999;\r\n\ttext-align: left;\r\n\tmargin:20% 0;\r\n\tfont-size: 1.2vw;\r\n\r\n}\r\n\r\n/*---END---*/", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
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

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
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

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

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

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);