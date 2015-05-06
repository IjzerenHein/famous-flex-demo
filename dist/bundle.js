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
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014/2015
	 */
	
	/*global Please, console*/
	/*eslint no-console:0*/
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
	    //<webpack>
	    __webpack_require__(/*! famous-polyfills */ 1);
	    __webpack_require__(/*! ./css/bootstrap.min.css */ 3);
	    __webpack_require__(/*! famous/core/famous.css */ 8);
	    __webpack_require__(/*! ./css/styles.css */ 5);
	    __webpack_require__(/*! ./index.html */ 7);
	    //</webpack>
	
	    // please-js
	    __webpack_require__(/*! pleasejs/Please */ 2);
	
	    // Fast-click
	    var FastClick = __webpack_require__(/*! fastclick/lib/fastclick */ 24);
	    FastClick.attach(document.body);
	
	    // import dependencies
	    var Engine = __webpack_require__(/*! famous/core/Engine */ 10);
	    var Surface = __webpack_require__(/*! famous/core/Surface */ 11);
	    var ViewSequence = __webpack_require__(/*! famous/core/ViewSequence */ 12);
	    var ContainerSurface = __webpack_require__(/*! famous/surfaces/ContainerSurface */ 13);
	    var InputSurface = __webpack_require__(/*! famous/surfaces/InputSurface */ 14);
	    var LayoutController = __webpack_require__(/*! famous-flex/LayoutController */ 15);
	    var FlexScrollView = __webpack_require__(/*! famous-flex/FlexScrollView */ 16);
	    var LayoutUtility = __webpack_require__(/*! famous-flex/LayoutUtility */ 17);
	    var LayoutDockHelper = __webpack_require__(/*! famous-flex/helpers/LayoutDockHelper */ 18);
	    var ProportionalLayout = __webpack_require__(/*! famous-flex/layouts/ProportionalLayout */ 19);
	    var NavBarLayout = __webpack_require__(/*! famous-flex/layouts/NavBarLayout */ 20);
	    var ListLayout = __webpack_require__(/*! famous-flex/layouts/ListLayout */ 21);
	    var CollectionLayout = __webpack_require__(/*! famous-flex/layouts/CollectionLayout */ 22);
	    //var FontLayout = require('famous-flex/layouts/FontLayout');
	    var WheelLayout = __webpack_require__(/*! famous-flex/layouts/WheelLayout */ 23);
	    var collectionItemId = 0;
	
	    // create the main context
	    var mainContext = Engine.createContext();
	
	    // Create the shell
	    var layoutListRenderables = [];
	    var collection = [];
	    var layouts = [];
	    var layoutDetailsView;
	    var navbar = _createNavbar();
	    var sidebar = _createSidebar();
	    var container = new ContainerSurface();
	    var back = new Surface({
	        classes: ['back']
	    });
	    container.context.setPerspective(500);
	    var scrollView = _createScrollView();
	    container.add(scrollView);
	    container.pipe(scrollView);
	    var shell = _createShell({
	        back: back,
	        navbar: navbar,
	        sidebar: sidebar,
	        content: container
	    });
	    mainContext.add(shell);
	
	    /**
	     * Shell
	     */
	    function ShellLayout(context, options) {
	        var size = context.size;
	        context.set('back', {
	            size: context.size,
	            translate: [0, 0, -10000]
	        });
	        context.set('navbar', {
	            size: [size[0], options.navBarHeight],
	            translate: [0, 0, 100]
	        });
	        context.set('content', {
	            size: [size[0], size[1] - options.navBarHeight],
	            translate: [0, options.navBarHeight, 0],
	            origin: [1, 0],
	            align: [1, 0],
	            rotate: options.showSideBar ? [0, (Math.PI/180) * -20, 0] : [0, 0, 0]
	        });
	        context.set('sidebar', {
	            size: [options.sideBarWidth, size[1] - options.navBarHeight],
	            translate: [0, options.navBarHeight, 100],
	            origin: [0, 0],
	            align: [0, 0],
	            rotate: options.showSideBar ? [0, (Math.PI/180) * 10, 0] : [0, (Math.PI/180) * 90, 0]
	        });
	    }
	    function _createShell(renderables) {
	        return new LayoutController({
	            layout: ShellLayout,
	            layoutOptions: {
	                navBarHeight: 58,
	                sideBarWidth: 180
	            },
	            flow: true,
	            flowOptions: {
	                reflowOnResize: false
	            },
	            dataSource: renderables
	        });
	    }
	    function _createSidebar() {
	        layoutDetailsView = _createLayoutDetailsView();
	        return new LayoutController({
	            layout: function(context) {
	                var size = context.size;
	                var dock = new LayoutDockHelper(context);
	                context.set('back', {size: size});
	                if (size[0] < 300) {
	                    dock.bottom('details', 200, 1);
	                }
	                else {
	                    dock.right('details', 200, 1);
	                }
	                dock.fill('list', 1);
	            },
	            dataSource: {
	                'list': _createLayoutListView(),
	                'details': layoutDetailsView,
	                'back': new Surface({
	                    classes: ['panel']
	                })
	            }
	        });
	    }
	    function _hideSidebar() {
	        shell.setLayoutOptions({
	            showSideBar: false
	        });
	    }
	    function _toggleSidebar() {
	        shell.setLayoutOptions({
	            showSideBar: !shell.getLayoutOptions().showSideBar
	        });
	    }
	
	    /**
	     * Navbar
	     */
	    function _createButton(content) {
	        return new Surface({
	            size: [50, undefined],
	            content: '<button type="button" class="btn btn-default">' + content + '</button>'
	        });
	    }
	    function _insertItem() {
	        _hideSidebar.call(this);
	        _addCollectionItem.call(this);
	    }
	    function _removeItem() {
	        _hideSidebar.call(this);
	        _removeCollectionItem.call(this);
	    }
	    function _moveNextItem() {
	        _hideSidebar.call(this);
	        scrollView.goToNextPage();
	    }
	    function _movePrevItem() {
	        _hideSidebar.call(this);
	        scrollView.goToPreviousPage();
	    }
	    function _rotateLayout() {
	        _hideSidebar.call(this);
	        var direction = scrollView.getDirection(true);
	        scrollView.setDirection((direction + 1) % 2);
	    }
	    function _toggleLayoutAlignment() {
	        _hideSidebar.call(this);
	        scrollView.setOptions({
	            alignment: scrollView.options.alignment ? 0 : 1
	        });
	    }
	    function _createNavbar() {
	        var layoutController = new LayoutController({
	            layout: NavBarLayout,
	            layoutOptions: {
	                margins: [8],
	                itemSpacer: 5
	            }
	        });
	        var background = new Surface({classes: ['navbar', 'navbar-default']});
	        var title = new Surface({content: 'famous-flex', classes: ['title']});
	        var addButton = _createButton('<i class="glyphicon glyphicon-plus"></i>');
	        addButton.on('click', _insertItem);
	        var removeButton = _createButton('<i class="glyphicon glyphicon-minus"></i>');
	        removeButton.on('click', _removeItem);
	        var directionButton = _createButton('<i class="glyphicon glyphicon-repeat"></i>');
	        directionButton.on('click', _rotateLayout);
	        var alignmentButton = _createButton('<i class="glyphicon glyphicon-sort-by-attributes"></i>');
	        alignmentButton.on('click', _toggleLayoutAlignment);
	        var menuButton = _createButton('<i class="glyphicon glyphicon-tasks"></i>');
	        menuButton.on('click', _toggleSidebar);
	
	        var nextButton = _createButton('<i class="glyphicon glyphicon-forward"></i>');
	        nextButton.on('click', _moveNextItem);
	        var prevButton = _createButton('<i class="glyphicon glyphicon-backward"></i>');
	        prevButton.on('click', _movePrevItem);
	
	        layoutController.setDataSource({
	            background: background,
	            title: title,
	            rightItems: [
	                removeButton,
	                addButton,
	                nextButton,
	                prevButton,
	                alignmentButton,
	                directionButton
	            ],
	            leftItems: [
	                menuButton
	            ]
	        });
	        return layoutController;
	    }
	
	    /**
	     * Collection
	     */
	    function _createCollectionItem() {
	        collectionItemId++;
	        var text = 'Item ' + collectionItemId;
	        var sur = new Surface({
	            classes: ['item'],
	            properties: {
	                backgroundColor: window.Please.make_color()
	            }
	        });
	        sur.text = text;
	        return sur;
	    }
	    function _addCollectionItem() {
	        if (scrollView) {
	            var rightItems = navbar.getSpec('rightItems');
	            var insertSpec = LayoutUtility.cloneSpec(navbar.getSpec(rightItems[1]));
	            var pos = Math.floor(Math.random() * (Math.min(collection.length, 5) + 1));
	            //pos = Math.max(pos, 1);
	            /*pos = 0;
	            insertSpec = {
	                opacity: 0
	            };*/
	            var item = _createCollectionItem();
	            scrollView.insert(pos, item, insertSpec);
	            //scrollView.ensureVisible(item);
	            scrollView.goToRenderNode(item);
	        }
	        else {
	            collection.push(_createCollectionItem());
	            if (scrollView) {
	                scrollView.reflowLayout();
	            }
	        }
	    }
	    function _removeCollectionItem() {
	        if (scrollView) {
	            var rightItems = navbar.getSpec('rightItems');
	            var removeSpec = LayoutUtility.cloneSpec(navbar.getSpec(rightItems[0]));
	            removeSpec.opacity = 0;
	            var pos = Math.floor(Math.random() * Math.min(collection.length, 5));
	            scrollView.remove(pos, removeSpec);
	        }
	        else if (collection.length) {
	            collection.splice(0, 1);
	            if (scrollView) {
	                scrollView.reflowLayout();
	            }
	        }
	    }
	    function _createScrollView() {
	        for (var i = 0; i < 200; i++) {
	            _addCollectionItem();
	        }
	        var scr = new FlexScrollView({
	            dataSource: collection,
	            flow: true,
	            flowOptions: {
	                spring: {
	                    dampingRatio: 0.6,
	                    period: 600
	                }
	            },
	            debug: true,
	            mouseMove: true,
	            paginated: false
	        });
	        scr.on('pagechange', function(event) {
	            console.log('pagechange: ' + (event.renderNode ? event.renderNode.text : 'none'));
	        });
	        scr.on('scrollend', function(event) {
	            var item = scr.getFirstVisibleItem();
	            console.log('scrollend: ' + (item ? item.renderNode.text : 'none'));
	        });
	        return scr;
	    }
	
	    /**
	     * Layouts
	     */
	    function _createLayoutListView() {
	        return new LayoutController({
	            layout: ListLayout,
	            layoutOptions: { itemSize: 50 },
	            dataSource: layoutListRenderables
	        });
	    }
	    function _createLayoutDetailsView() {
	        return new FlexScrollView({
	            autoPipeEvents: true,
	            alignment: 1,
	            layoutOptions: { itemSize: 40 }
	        });
	    }
	
	    function _incrementLayoutOption(option, value, input) {
	        var step;
	        if (Array.isArray(option.value)) {
	            var newValue = [];
	            for (var i = 0; i < option.value.length; i++) {
	                step = option.step ? option.step[i] : 1;
	                newValue.push(Math.round(Math.max(Math.min(option.value[i] + (value * step), option.max[i]), option.min[i]) * 100) / 100);
	            }
	            option.value = newValue;
	        }
	        else {
	            step = option.step || 1;
	            option.value = Math.max(Math.min(option.value + (value * step), option.max), option.min);
	            option.value = Math.round(option.value * 100) / 100;
	        }
	        input.setValue(JSON.stringify(option.value));
	        var layoutOptions = {};
	        layoutOptions[option.name] = option.value;
	        scrollView.setLayoutOptions(layoutOptions);
	    }
	    function _changeLayoutOption(option, event) {
	        if (Array.isArray(option.value)) {
	            var val = JSON.parse(event.currentTarget.value);
	            if (!Array.isArray(val) || (val.length !== option.value.length)) {
	                event.currentTarget.value = JSON.stringify(option.value);
	                return;
	            }
	        }
	        option.value = JSON.parse(event.currentTarget.value);
	        var layoutOptions = {};
	        layoutOptions[option.name] = option.value;
	        scrollView.setLayoutOptions(layoutOptions);
	    }
	    function _createLayoutDetailItem(option) {
	        var title = new Surface({
	            classes: ['layout-detail-item-title'],
	            content: option.name
	        });
	        var valueInput = new InputSurface({
	            classes: ['layout-detail-item-input'],
	            value: JSON.stringify(option.value)
	        });
	        valueInput.on('change', function(event) {
	            _changeLayoutOption(option, event);
	        });
	        var addButton = new Surface({
	            content: '<button type="button" class="btn btn-sm btn-default"><i class="glyphicon glyphicon-plus"></i></button>'
	        });
	        addButton.on('click', function() {
	            _incrementLayoutOption(option, 1, valueInput);
	        });
	        var subButton = new Surface({
	            content: '<button type="button" class="btn btn-sm btn-default"><i class="glyphicon glyphicon-minus"></i></button>'
	        });
	        subButton.on('click', function() {
	            _incrementLayoutOption(option, -1, valueInput);
	        });
	        return new LayoutController({
	            layout: {dock: [
	                ['left', 'subButton', 40],
	                ['right', 'addButton', 40],
	                ['top', 'title', 17],
	                ['fill', 'valueInput']
	            ]},
	            dataSource: {
	                title: title,
	                subButton: subButton,
	                addButton: addButton,
	                valueInput: valueInput
	            }
	        });
	    }
	    function _updateLayoutDetails(name) {
	        var viewSequence = new ViewSequence();
	        var layout = _findLayout(name);
	        for (var i = 0; i < layout.options.length; i++) {
	            if ((layout.options[i].editable === undefined) || layout.options[i].editable) {
	                viewSequence.push(_createLayoutDetailItem(layout.options[i]));
	                viewSequence = viewSequence.getNext() || viewSequence;
	            }
	        }
	        layoutDetailsView.setDataSource(viewSequence);
	    }
	    function _findLayout(name) {
	        for (var i =0; i < layouts.length; i++) {
	            if (layouts[i].name === name) {
	                return layouts[i];
	            }
	        }
	        return undefined;
	    }
	    function _selectLayout(name) {
	
	        // Select the layout and options
	        var layout = _findLayout(name);
	        var layoutOptions = {};
	        var i;
	        for (i = 0; i < layout.options.length; i++) {
	            layoutOptions[layout.options[i].name] = layout.options[i].value;
	        }
	        scrollView.setLayout(layout.layout, layoutOptions);
	
	        // Highlight the selected layout
	        for (i = 0; i < layouts.length; i++) {
	            layout = layouts[i];
	            if (layout.name === name) {
	                layout.surface.addClass('selected');
	            }
	            else {
	                layout.surface.removeClass('selected');
	            }
	        }
	
	        // Update detail-view
	        _updateLayoutDetails(name);
	    }
	    function _addLayout(name, layoutFn, options) {
	        var layout = {
	            name: name,
	            layout: layoutFn,
	            options: options
	        };
	        layouts.push(layout);
	        var listRenderable = new Surface({
	            classes: ['layout-list-item'],
	            content: name
	        });
	        layout.surface = listRenderable;
	        listRenderable.on('click', _selectLayout.bind(this, name));
	        layoutListRenderables.push(listRenderable);
	    }
	    function _addLayouts() {
	        _addLayout('ProportionalLayout', ProportionalLayout, [
	            {name: 'ratios', value: [1, 2, 3, 1], min: [0, 0, 0, 0], max: [10000, 10000, 10000, 10000]}
	        ]);
	        _addLayout('ListLayout', ListLayout, [
	            {name: 'itemSize', value: 50, min: 0, max: 1000},
	            {name: 'margins', value: [5, 5, 5, 5], min: [-100, -100, -100, -100], max: [100, 100, 100, 100]},
	            {name: 'spacing', value: 5, min: -100, max: 1000}
	        ]);
	        _addLayout('CollectionLayout', CollectionLayout, [
	            {name: 'cells', value: [3, 5], min: [1, 1], max: [1000, 1000]},
	            {name: 'itemSize', value: [90, 90], min: [0, 0], max: [1000, 1000]},
	            {name: 'justify', value: [0, 0], min: [0, 0], max: [1, 1]},
	            {name: 'margins', value: [10, 10, 10, 10], min: [-100, -100, -100, -100], max: [100, 100, 100, 100]},
	            {name: 'spacing', value: [10, 10], min: [-100, -100], max: [100, 100]},
	            {name: 'suppressWarnings', value: true, editable: false}
	        ]);
	        _addLayout('FullScreen', ListLayout, [
	            {name: 'itemSize', value: undefined, editable: false},
	            {name: 'margins', value: [0, 0, 0, 0], min: [-100, -100, -100, -100], max: [100, 100, 100, 100]},
	            {name: 'spacing', value: 0, min: -100, max: 1000}
	        ]);
	        _addLayout('WheelLayout', WheelLayout, [
	            {name: 'itemSize', value: 70, min: 0, max: 1000},
	            {name: 'diameter', value: 500, min: 10, max: 100000},
	            {name: 'radialOpacity', value: 0, min: -2, max: 1, step: 0.1}
	        ]);
	        /*_addLayout('FontLayout', FontLayout, [
	            {name: 'segmentSize', value: [20, 2], min: [1, 1], max: [1000, 1000]},
	            {name: 'spacing', value: 10, min: 0, max: 100000}
	        ]);*/
	        /*_addLayout('CoverLayout', CoverLayout, [
	            {name: 'itemSize',   value: [260, 200], min: [0, 0], max: [1000, 1000]}
	        ]);*/
	        /*_addLayout('CubeLayout', CubeLayout, [
	            {name: 'itemSize',   value: [100, 100], min: [0, 0], max: [1000, 1000]}
	        ]);*/
	    }
	    _addLayouts();
	    _selectLayout('CollectionLayout');
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/*!**************************************!*\
  !*** ../~/famous-polyfills/index.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./classList.js */ 26);
	__webpack_require__(/*! ./functionPrototypeBind.js */ 27);
	__webpack_require__(/*! ./requestAnimationFrame.js */ 28);

/***/ },
/* 2 */
/*!*******************************!*\
  !*** ../~/pleasejs/Please.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/*Please JS v0.2.0, Jordan Checkman 2014, Checkman.io, MIT Liscense, Have fun.*/
	(function(window){
		'use strict';
		function define_Please(){
			var Please = {};
			var color_data = {
				aliceblue: "F0F8FF",
				antiquewhite: "FAEBD7",
				aqua: "00FFFF",
				aquamarine: "7FFFD4",
				azure: "F0FFFF",
				beige: "F5F5DC",
				bisque: "FFE4C4",
				black: "000000",
				blanchedalmond: "FFEBCD",
				blue: "0000FF",
				blueviolet: "8A2BE2",
				brown: "A52A2A",
				burlywood: "DEB887",
				cadetblue: "5F9EA0",
				chartreuse: "7FFF00",
				chocolate: "D2691E",
				coral: "FF7F50",
				cornflowerblue: "6495ED",
				cornsilk: "FFF8DC",
				crimson: "DC143C",
				cyan: "00FFFF",
				darkblue: "00008B",
				darkcyan: "008B8B",
				darkgoldenrod: "B8860B",
				darkgray: "A9A9A9",
				darkgrey: "A9A9A9",
				darkgreen: "006400",
				darkkhaki: "BDB76B",
				darkmagenta: "8B008B",
				darkolivegreen: "556B2F",
				darkorange: "FF8C00",
				darkorchid: "9932CC",
				darkred: "8B0000",
				darksalmon: "E9967A",
				darkseagreen: "8FBC8F",
				darkslateblue: "483D8B",
				darkslategray: "2F4F4F",
				darkslategrey: "2F4F4F",
				darkturquoise: "00CED1",
				darkviolet: "9400D3",
				deeppink: "FF1493",
				deepskyblue: "00BFFF",
				dimgray: "696969",
				dimgrey: "696969",
				dodgerblue: "1E90FF",
				firebrick: "B22222",
				floralwhite: "FFFAF0",
				forestgreen: "228B22",
				fuchsia: "FF00FF",
				gainsboro: "DCDCDC",
				ghostwhite: "F8F8FF",
				gold: "FFD700",
				goldenrod: "DAA520",
				gray: "808080",
				grey: "808080",
				green: "008000",
				greenyellow: "ADFF2F",
				honeydew: "F0FFF0",
				hotpink: "FF69B4",
				indianred: "CD5C5C",
				indigo: "4B0082",
				ivory: "FFFFF0",
				khaki: "F0E68C",
				lavender: "E6E6FA",
				lavenderblush: "FFF0F5",
				lawngreen: "7CFC00",
				lemonchiffon: "FFFACD",
				lightblue: "ADD8E6",
				lightcoral: "F08080",
				lightcyan: "E0FFFF",
				lightgoldenrodyellow: "FAFAD2",
				lightgray: "D3D3D3",
				lightgrey: "D3D3D3",
				lightgreen: "90EE90",
				lightpink: "FFB6C1",
				lightsalmon: "FFA07A",
				lightseagreen: "20B2AA",
				lightskyblue: "87CEFA",
				lightslategray: "778899",
				lightslategrey: "778899",
				lightsteelblue: "B0C4DE",
				lightyellow: "FFFFE0",
				lime: "00FF00",
				limegreen: "32CD32",
				linen: "FAF0E6",
				magenta: "FF00FF",
				maroon: "800000",
				mediumaquamarine: "66CDAA",
				mediumblue: "0000CD",
				mediumorchid: "BA55D3",
				mediumpurple: "9370D8",
				mediumseagreen: "3CB371",
				mediumslateblue: "7B68EE",
				mediumspringgreen: "00FA9A",
				mediumturquoise: "48D1CC",
				mediumvioletred: "C71585",
				midnightblue: "191970",
				mintcream: "F5FFFA",
				mistyrose: "FFE4E1",
				moccasin: "FFE4B5",
				navajowhite: "FFDEAD",
				navy: "000080",
				oldlace: "FDF5E6",
				olive: "808000",
				olivedrab: "6B8E23",
				orange: "FFA500",
				orangered: "FF4500",
				orchid: "DA70D6",
				palegoldenrod: "EEE8AA",
				palegreen: "98FB98",
				paleturquoise: "AFEEEE",
				palevioletred: "D87093",
				papayawhip: "FFEFD5",
				peachpuff: "FFDAB9",
				peru: "CD853F",
				pink: "FFC0CB",
				plum: "DDA0DD",
				powderblue: "B0E0E6",
				purple: "800080",
				rebeccapurple: "663399",
				red: "FF0000",
				rosybrown: "BC8F8F",
				royalblue: "4169E1",
				saddlebrown: "8B4513",
				salmon: "FA8072",
				sandybrown: "F4A460",
				seagreen: "2E8B57",
				seashell: "FFF5EE",
				sienna: "A0522D",
				silver: "C0C0C0",
				skyblue: "87CEEB",
				slateblue: "6A5ACD",
				slategray: "708090",
				slategrey: "708090",
				snow: "FFFAFA",
				springgreen: "00FF7F",
				steelblue: "4682B4",
				tan: "D2B48C",
				teal: "008080",
				thistle: "D8BFD8",
				tomato: "FF6347",
				turquoise: "40E0D0",
				violet: "EE82EE",
				wheat: "F5DEB3",
				white: "FFFFFF",
				whitesmoke: "F5F5F5",
				yellow: "FFFF00",
				yellowgreen: "9ACD32"
			};
	
			var PHI = 0.618033988749895;
	
			var make_color_default = {
				hue: null,
				saturation: null,
				value: null,
				base_color: '',
				greyscale: false,
				grayscale: false, //whatever I support them both, murrica
				golden: true,
				full_random: false,
				colors_returned: 1,
				format: 'hex',
			};
	
			var make_scheme_default = {
				scheme_type: 'analogous',
				format: 'hex'
			};
	
			var make_contrast_default = {
				golden: false,
				format: 'hex'
			}
	
			function random_int( min, max ){
				return Math.floor( Math.random() * ( max - min + 1 )) + min;
			}
	
			function random_float( min, max ){
				return Math.random() * ( max - min ) + min;
			}
	
			function clamp( num, min, max ){
				return Math.max( min, Math.min( num, max ));
			}
	
			function convert_to_format( format_string, array ){
				switch( format_string ){
					case 'hex':
						for ( var i = 0; i < array.length; i++ ) {
							array[i] = Please.HSV_to_HEX( array[i] );
						}
						break;
					case 'rgb':
						for ( var i = 0; i < array.length; i++ ) {
							array[i] = Please.HSV_to_RGB( array[i] );
						}
						break;
					case 'rgb-string':
						for ( var i = 0; i < array.length; i++ ) {
							var raw_rgb =  Please.HSV_to_RGB( array[i] );
							array[i] =
								"rgb(" +
								raw_rgb.r + "," +
								raw_rgb.g + "," +
								raw_rgb.b + ")";
						}
						break;
					case 'hsv':
						break;
					default:
						console.log( 'Format not recognized.' );
						break;
				}
				return array;
			}
	
			function contrast_quotient( HSV ){
				var RGB = Please.HSV_to_RGB( HSV );
				var YIQ = ( ( RGB.r * 299 ) +
							( RGB.g * 587 ) +
							( RGB.b * 114 )
						) / 1000;
				return ( YIQ >= 128 ) ? 'dark' : 'light';
			}
	
			function copy_object( object ){
				var copy = {};
				for( var key in object ){
					if( object.hasOwnProperty( key )){
						copy[key] = object[key];
					}
				}
				return copy;
			}
	
			Please.NAME_to_HEX = function( name ){
				if( name in color_data ){
					return color_data[name];
				}
				else{
					console.log( 'Color name not recognized.' );
				}
			}
	
			Please.NAME_to_HSV = function( name ){
				return Please.HEX_to_RGB( Please.NAME_to_HEX( name ));
			}
	
			Please.NAME_to_HSV = function( name ){
				return Please.HEX_to_HSV( Please.NAME_to_HEX( name ));
			}
	
			//accepts hex string, produces RGB object
			Please.HEX_to_RGB = function( hex ){
				var regex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
				hex = hex.replace( regex, function( m, r, g, b ) {
					return r + r + g + g + b + b;
				});
				var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
				return result ? {
					r: parseInt( result[1], 16 ),
					g: parseInt( result[2], 16 ),
					b: parseInt( result[3], 16 )
				} : null;
			}
	
			//accepts RGB object, produces hex string
			Please.RGB_to_HEX = function( RGB ){
				return "#" +
				(( 1 << 24 ) + ( RGB.r << 16 ) + ( RGB.g << 8 ) + RGB.b )
				.toString( 16 ).slice( 1 );
			}
	
			//accepts HSV object, returns RGB object
			Please.HSV_to_RGB = function( HSV ){
				var r, g, b;
				var h = ( HSV.h / 360 );
				var s = HSV.s;
				var v = HSV.v;
				var i = Math.floor( h * 6 );
				var f = h * 6 - i;
				var p = v * ( 1 - s );
				var q = v * ( 1 - f * s );
				var t = v * ( 1 - ( 1 - f ) * s );
				switch( i % 6 ){
					case 0: r = v, g = t, b = p;
						break;
					case 1: r = q, g = v, b = p;
						break;
					case 2: r = p, g = v, b = t;
						break;
					case 3: r = p, g = q, b = v;
						break;
					case 4: r = t, g = p, b = v;
						break;
					case 5: r = v, g = p, b = q;
						break;
				}
				return{
					r:Math.floor( r * 255 ),
					g:Math.floor( g * 255 ),
					b:Math.floor( b * 255 )
				}
			}
	
			//accepts RGB object, returns HSV object
			Please.RGB_to_HSV = function( RGB ){
				var r, g, b;
				var computed_H = 0;
				var computed_S = 0;
				var computed_V = 0;
				r = ( RGB.r / 255 );
				g = ( RGB.g / 255 );
				b = ( RGB.b / 255 );
				var min_RGB = Math.min( r, Math.min( g, b ) );
				var max_RGB = Math.max( r, Math.max( g, b ) );
				// Black-gray-white
				if ( min_RGB == max_RGB ) {
					computed_V = min_RGB;
					return{
						h: 0,
						s: 0,
						v: computed_V
					}
				}
				// Colors other than black-gray-white:
				var d = ( r == min_RGB ) ? g - b : (( b == min_RGB ) ? r - g : b - r);
				var h = ( r == min_RGB ) ? 3 : (( b == min_RGB ) ? 1 : 5 );
				computed_H = 60 * ( h - d / ( max_RGB - min_RGB ));
				computed_S = ( max_RGB - min_RGB ) / max_RGB;
				computed_V = max_RGB;
				return {
					h: computed_H,
					s: computed_S,
					v: computed_V
				}
			}
	
			//accepts HSV object, returns hex string
			Please.HSV_to_HEX = function( HSV ){
				return Please.RGB_to_HEX( Please.HSV_to_RGB( HSV ));
			}
	
			//accepts hex string, returns HSV object
			Please.HEX_to_HSV = function( hex ){
				return Please.RGB_to_HSV( Please.HEX_to_RGB( hex ));
			}
	
			//accepts HSV object and options object, returns list or single object depending on options
			Please.make_scheme = function( HSV, options ){
				//clone base please options
				var scheme_options = copy_object( make_scheme_default );
	
				if( options != null ){
				//override base Please options
					for( var key in options ){
						if( options.hasOwnProperty( key )){
							scheme_options[key] = options[key];
						}
					}
				}
	
				var scheme = [HSV];
				//DRY for repeated cloning
				function clone( HSV ){
					return{
						h: HSV.h,
						s: HSV.s,
						v: HSV.v
					}
				}
				switch( scheme_options.scheme_type.toLowerCase() ){
					case 'monochromatic':
					case 'mono':
						for ( var i = 1; i <= 2; i++ ) {
							var adjusted = clone( HSV );
	
							var adjusted_s = adjusted.s + ( .1 * i );
							adjusted_s = clamp( adjusted_s, 0, 1 );
	
							var adjusted_v = adjusted.v + ( .1 * i );
							adjusted_v = clamp( adjusted_v, 0, 1 );
	
							adjusted.s = adjusted_s;
							adjusted.v = adjusted_v;
	
							scheme.push(adjusted);
						}
						for ( var i = 1; i <= 2; i++ ) {
							var adjusted = clone( HSV );
	
							var adjusted_s = adjusted.s - ( .1 * i );
							adjusted_s = clamp( adjusted_s, 0, 1 );
	
							var adjusted_v = adjusted.v - ( .1 * i );
							adjusted_v = clamp( adjusted_v, 0, 1 );
	
							adjusted.s = adjusted_s;
							adjusted.v = adjusted_v;
	
							scheme.push( adjusted );
						}
					break;
					case 'complementary':
					case 'complement':
					case 'comp':
						var adjusted = clone( HSV );
						adjusted.h = ( adjusted.h + 180 ) % 360;
						scheme.push( adjusted );
					break;
					//30 degree seperation
					case 'split-complementary':
					case 'split-complement':
					case 'split':
						var adjusted = clone( HSV );
						adjusted.h = ( adjusted.h + 165 ) % 360;
						scheme.push( adjusted );
						var adjusted = clone( HSV );
						adjusted.h = Math.abs( ( adjusted.h - 165 ) % 360 );
						scheme.push( adjusted );
					break;
					case 'double-complementary':
					case 'double-complement':
					case 'double':
						//first basic complement
						var adjusted = clone( HSV );
						adjusted.h = ( adjusted.h + 180 ) % 360;
						scheme.push( adjusted );
						//then offset
						adjusted.h = ( adjusted.h + 30 ) % 360;
						var secondary = clone( adjusted );
						scheme.push( adjusted );
						//complement offset
						adjusted.h = ( adjusted.h + 180 ) % 360;
						scheme.push( secondary );
					break;
					case 'analogous':
					case 'ana':
						for ( var i = 1; i <= 5; i++ ) {
							var adjusted = clone( HSV );
							adjusted.h = ( adjusted.h + ( 20 * i ) ) % 360;
							scheme.push( adjusted );
						}
					break;
					case 'triadic':
					case 'triad':
					case 'tri':
						for ( var i = 1; i < 3; i++ ) {
							var adjusted = clone( HSV );
							adjusted.h = ( adjusted.h + ( 120 * i ) ) % 360;
							scheme.push( adjusted );
						};
					break;
					default:
						console.log( 'Color scheme not recognized.' )
					break;
				}
				convert_to_format( scheme_options.format.toLowerCase(), scheme );
				return scheme;
			}
			//accepts options object returns list or single color
			Please.make_color = function( options ){
				var color = [];
				//clone base please options
				var color_options = copy_object( make_color_default );
	
				if( options != null ){
				//override base Please options
					for( var key in options ){
						if( options.hasOwnProperty( key )){
							color_options[key] = options[key];
						}
					}
				}
				//first, check for a base color
				var base_color;
				if ( color_options.base_color.length > 0 ) {
					base_color = color_data[color_options.base_color.toLowerCase()];
					base_color = Please.HEX_to_HSV( base_color );
				}
				for ( var i = 0; i < color_options.colors_returned; i++ ) {
					var random_hue = random_int( 0, 360 );
					var hue,saturation,value;
					if( base_color != null ){
						hue = random_int( ( base_color.h - 5 ), ( base_color.h + 5 ));
						saturation = random_float( .4, .85 );
						value = random_float( .4, .85 );
						color.push({h: hue, s: saturation, v: value});
					}
					else{
						if( color_options.greyscale == true || color_options.grayscale == true ){
							hue = 0;
						}
						//make hue goldennnnnnnn
						else if( color_options.golden == true ){
							hue = ( random_hue + ( random_hue / PHI )) % 360;
						}
						else if( color_options.hue == null || color_options.full_random == true ){
							hue = random_hue;
						}
						else{
							hue = clamp( color_options.hue, 0, 360 );
						}
						//set saturation
						if ( color_options.greyscale == true || color_options.grayscale == true ) {
							saturation = 0; //if they want greyscale no saturation allowed
						}
						else if ( color_options.full_random == true ){
							saturation = random_float( 0, 1 );
						}
						else if ( color_options.saturation == null ){
							saturation = .4;
						}
						else{
							saturation = clamp( color_options.saturation, 0, 1 );
						}
						//set value
						if( color_options.full_random == true ){
							value = random_float( 0, 1 );
						}
						else if( color_options.greyscale == true || color_options.grayscale == true ){
							value = random_float(.15,.75)
						}
						else if( color_options.value == null ){
							value = .75;
						}
						else{
							value = clamp( color_options.value, 0 , 1 );
						}
						color.push( {h: hue, s: saturation, v: value} );
					}
				}
				//output options based on format
				convert_to_format( color_options.format.toLowerCase(), color );
				if ( color.length === 1 ){return color[0];}
				else{return color;}
			}
			//accepts HSV object returns contrasting color
			Please.make_contrast = function( HSV, options ){
	
				//clone base please options
				var contrast_options = copy_object( make_contrast_default );
	
				if( options != null ){
				//override base Please options
					for( var key in options ){
						if( options.hasOwnProperty( key )){
							contrast_options[key] = options[key];
						}
					}
				}
	
				var contrast;
				var value_range = contrast_quotient( HSV );
				var adjusted_hue;
	
				if( contrast_options.golden == true ){
					adjusted_hue = ( HSV.h * ( 1 + PHI ) ) % 360;
				}
				else{
					var contrast_base =
					Please.make_scheme( HSV,
					{
						scheme_type: 'complementary',
						format: 'hsv'
					})[1];
					adjusted_hue = clamp( ( contrast_base.h - 30 ), 0, 360 );
				}
				var adjusted_value;
				if ( value_range === 'dark' ){
					adjusted_value = clamp( ( HSV.v - .25 ), 0, 1 );
				}
				else if ( value_range === 'light' ){
					adjusted_value = clamp( ( HSV.v + .25 ), 0, 1 );
				}
				contrast = [{
					h: adjusted_hue,
					s: HSV.s,
					v: adjusted_value
				}]
	
				convert_to_format( contrast_options.format.toLowerCase(), contrast );
				return contrast[0];
			}
	
			return Please;
		}
		//globalize it 3/60
		if( typeof( Please ) == 'undefined' ) {
			window.Please = define_Please();
		}
	})( window );

/***/ },
/* 3 */
/*!*******************************!*\
  !*** ./css/bootstrap.min.css ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(/*! ../~/style-loader/addStyle.js */ 25)
		// The css code:
		(__webpack_require__(/*! !../~/css-loader!./css/bootstrap.min.css */ 4));
	// Hot Module Replacement
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 4 */
/*!***********************************************!*\
  !*** ../~/css-loader!./css/bootstrap.min.css ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		"@import url(//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700);" +
		"/*!\n * bootswatch v3.2.0\n * Homepage: http://bootswatch.com\n * Copyright 2012-2014 Thomas Park\n * Licensed under MIT\n * Based on Bootstrap\n*//*! normalize.css v3.0.1 | MIT License | git.io/normalize */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:bold}dfn{font-style:italic}h1{font-size:2em;margin:0.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace, monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=\"button\"],input[type=\"reset\"],input[type=\"submit\"]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=\"checkbox\"],input[type=\"radio\"]{box-sizing:border-box;padding:0}input[type=\"number\"]::-webkit-inner-spin-button,input[type=\"number\"]::-webkit-outer-spin-button{height:auto}input[type=\"search\"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type=\"search\"]::-webkit-search-cancel-button,input[type=\"search\"]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:0.35em 0.625em 0.75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:bold}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}@media print{*{text-shadow:none !important;color:#000 !important;background:transparent !important;box-shadow:none !important}a,a:visited{text-decoration:underline}a[href]:after{content:\" (\" attr(href) \")\"}abbr[title]:after{content:\" (\" attr(title) \")\"}a[href^=\"javascript:\"]:after,a[href^=\"#\"]:after{content:\"\"}pre,blockquote{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}tr,img{page-break-inside:avoid}img{max-width:100% !important}p,h2,h3{orphans:3;widows:3}h2,h3{page-break-after:avoid}select{background:#fff !important}.navbar{display:none}.table td,.table th{background-color:#fff !important}.btn>.caret,.dropup>.btn>.caret{border-top-color:#000 !important}.label{border:1px solid #000}.table{border-collapse:collapse !important}.table-bordered th,.table-bordered td{border:1px solid #ddd !important}}@font-face{font-family:'Glyphicons Halflings';src:url("+__webpack_require__(/*! ../fonts/glyphicons-halflings-regular.eot */ 40)+");src:url("+__webpack_require__(/*! ../fonts/glyphicons-halflings-regular.eot */ 40)+"?#iefix) format('embedded-opentype'),url("+__webpack_require__(/*! ../fonts/glyphicons-halflings-regular.woff */ 41)+") format('woff'),url("+__webpack_require__(/*! ../fonts/glyphicons-halflings-regular.ttf */ 42)+") format('truetype'),url("+__webpack_require__(/*! ../fonts/glyphicons-halflings-regular.svg */ 43)+"#glyphicons_halflingsregular) format('svg')}.glyphicon{position:relative;top:1px;display:inline-block;font-family:'Glyphicons Halflings';font-style:normal;font-weight:normal;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.glyphicon-asterisk:before{content:\"\\2a\"}.glyphicon-plus:before{content:\"\\2b\"}.glyphicon-euro:before{content:\"\\20ac\"}.glyphicon-minus:before{content:\"\\2212\"}.glyphicon-cloud:before{content:\"\\2601\"}.glyphicon-envelope:before{content:\"\\2709\"}.glyphicon-pencil:before{content:\"\\270f\"}.glyphicon-glass:before{content:\"\\e001\"}.glyphicon-music:before{content:\"\\e002\"}.glyphicon-search:before{content:\"\\e003\"}.glyphicon-heart:before{content:\"\\e005\"}.glyphicon-star:before{content:\"\\e006\"}.glyphicon-star-empty:before{content:\"\\e007\"}.glyphicon-user:before{content:\"\\e008\"}.glyphicon-film:before{content:\"\\e009\"}.glyphicon-th-large:before{content:\"\\e010\"}.glyphicon-th:before{content:\"\\e011\"}.glyphicon-th-list:before{content:\"\\e012\"}.glyphicon-ok:before{content:\"\\e013\"}.glyphicon-remove:before{content:\"\\e014\"}.glyphicon-zoom-in:before{content:\"\\e015\"}.glyphicon-zoom-out:before{content:\"\\e016\"}.glyphicon-off:before{content:\"\\e017\"}.glyphicon-signal:before{content:\"\\e018\"}.glyphicon-cog:before{content:\"\\e019\"}.glyphicon-trash:before{content:\"\\e020\"}.glyphicon-home:before{content:\"\\e021\"}.glyphicon-file:before{content:\"\\e022\"}.glyphicon-time:before{content:\"\\e023\"}.glyphicon-road:before{content:\"\\e024\"}.glyphicon-download-alt:before{content:\"\\e025\"}.glyphicon-download:before{content:\"\\e026\"}.glyphicon-upload:before{content:\"\\e027\"}.glyphicon-inbox:before{content:\"\\e028\"}.glyphicon-play-circle:before{content:\"\\e029\"}.glyphicon-repeat:before{content:\"\\e030\"}.glyphicon-refresh:before{content:\"\\e031\"}.glyphicon-list-alt:before{content:\"\\e032\"}.glyphicon-lock:before{content:\"\\e033\"}.glyphicon-flag:before{content:\"\\e034\"}.glyphicon-headphones:before{content:\"\\e035\"}.glyphicon-volume-off:before{content:\"\\e036\"}.glyphicon-volume-down:before{content:\"\\e037\"}.glyphicon-volume-up:before{content:\"\\e038\"}.glyphicon-qrcode:before{content:\"\\e039\"}.glyphicon-barcode:before{content:\"\\e040\"}.glyphicon-tag:before{content:\"\\e041\"}.glyphicon-tags:before{content:\"\\e042\"}.glyphicon-book:before{content:\"\\e043\"}.glyphicon-bookmark:before{content:\"\\e044\"}.glyphicon-print:before{content:\"\\e045\"}.glyphicon-camera:before{content:\"\\e046\"}.glyphicon-font:before{content:\"\\e047\"}.glyphicon-bold:before{content:\"\\e048\"}.glyphicon-italic:before{content:\"\\e049\"}.glyphicon-text-height:before{content:\"\\e050\"}.glyphicon-text-width:before{content:\"\\e051\"}.glyphicon-align-left:before{content:\"\\e052\"}.glyphicon-align-center:before{content:\"\\e053\"}.glyphicon-align-right:before{content:\"\\e054\"}.glyphicon-align-justify:before{content:\"\\e055\"}.glyphicon-list:before{content:\"\\e056\"}.glyphicon-indent-left:before{content:\"\\e057\"}.glyphicon-indent-right:before{content:\"\\e058\"}.glyphicon-facetime-video:before{content:\"\\e059\"}.glyphicon-picture:before{content:\"\\e060\"}.glyphicon-map-marker:before{content:\"\\e062\"}.glyphicon-adjust:before{content:\"\\e063\"}.glyphicon-tint:before{content:\"\\e064\"}.glyphicon-edit:before{content:\"\\e065\"}.glyphicon-share:before{content:\"\\e066\"}.glyphicon-check:before{content:\"\\e067\"}.glyphicon-move:before{content:\"\\e068\"}.glyphicon-step-backward:before{content:\"\\e069\"}.glyphicon-fast-backward:before{content:\"\\e070\"}.glyphicon-backward:before{content:\"\\e071\"}.glyphicon-play:before{content:\"\\e072\"}.glyphicon-pause:before{content:\"\\e073\"}.glyphicon-stop:before{content:\"\\e074\"}.glyphicon-forward:before{content:\"\\e075\"}.glyphicon-fast-forward:before{content:\"\\e076\"}.glyphicon-step-forward:before{content:\"\\e077\"}.glyphicon-eject:before{content:\"\\e078\"}.glyphicon-chevron-left:before{content:\"\\e079\"}.glyphicon-chevron-right:before{content:\"\\e080\"}.glyphicon-plus-sign:before{content:\"\\e081\"}.glyphicon-minus-sign:before{content:\"\\e082\"}.glyphicon-remove-sign:before{content:\"\\e083\"}.glyphicon-ok-sign:before{content:\"\\e084\"}.glyphicon-question-sign:before{content:\"\\e085\"}.glyphicon-info-sign:before{content:\"\\e086\"}.glyphicon-screenshot:before{content:\"\\e087\"}.glyphicon-remove-circle:before{content:\"\\e088\"}.glyphicon-ok-circle:before{content:\"\\e089\"}.glyphicon-ban-circle:before{content:\"\\e090\"}.glyphicon-arrow-left:before{content:\"\\e091\"}.glyphicon-arrow-right:before{content:\"\\e092\"}.glyphicon-arrow-up:before{content:\"\\e093\"}.glyphicon-arrow-down:before{content:\"\\e094\"}.glyphicon-share-alt:before{content:\"\\e095\"}.glyphicon-resize-full:before{content:\"\\e096\"}.glyphicon-resize-small:before{content:\"\\e097\"}.glyphicon-exclamation-sign:before{content:\"\\e101\"}.glyphicon-gift:before{content:\"\\e102\"}.glyphicon-leaf:before{content:\"\\e103\"}.glyphicon-fire:before{content:\"\\e104\"}.glyphicon-eye-open:before{content:\"\\e105\"}.glyphicon-eye-close:before{content:\"\\e106\"}.glyphicon-warning-sign:before{content:\"\\e107\"}.glyphicon-plane:before{content:\"\\e108\"}.glyphicon-calendar:before{content:\"\\e109\"}.glyphicon-random:before{content:\"\\e110\"}.glyphicon-comment:before{content:\"\\e111\"}.glyphicon-magnet:before{content:\"\\e112\"}.glyphicon-chevron-up:before{content:\"\\e113\"}.glyphicon-chevron-down:before{content:\"\\e114\"}.glyphicon-retweet:before{content:\"\\e115\"}.glyphicon-shopping-cart:before{content:\"\\e116\"}.glyphicon-folder-close:before{content:\"\\e117\"}.glyphicon-folder-open:before{content:\"\\e118\"}.glyphicon-resize-vertical:before{content:\"\\e119\"}.glyphicon-resize-horizontal:before{content:\"\\e120\"}.glyphicon-hdd:before{content:\"\\e121\"}.glyphicon-bullhorn:before{content:\"\\e122\"}.glyphicon-bell:before{content:\"\\e123\"}.glyphicon-certificate:before{content:\"\\e124\"}.glyphicon-thumbs-up:before{content:\"\\e125\"}.glyphicon-thumbs-down:before{content:\"\\e126\"}.glyphicon-hand-right:before{content:\"\\e127\"}.glyphicon-hand-left:before{content:\"\\e128\"}.glyphicon-hand-up:before{content:\"\\e129\"}.glyphicon-hand-down:before{content:\"\\e130\"}.glyphicon-circle-arrow-right:before{content:\"\\e131\"}.glyphicon-circle-arrow-left:before{content:\"\\e132\"}.glyphicon-circle-arrow-up:before{content:\"\\e133\"}.glyphicon-circle-arrow-down:before{content:\"\\e134\"}.glyphicon-globe:before{content:\"\\e135\"}.glyphicon-wrench:before{content:\"\\e136\"}.glyphicon-tasks:before{content:\"\\e137\"}.glyphicon-filter:before{content:\"\\e138\"}.glyphicon-briefcase:before{content:\"\\e139\"}.glyphicon-fullscreen:before{content:\"\\e140\"}.glyphicon-dashboard:before{content:\"\\e141\"}.glyphicon-paperclip:before{content:\"\\e142\"}.glyphicon-heart-empty:before{content:\"\\e143\"}.glyphicon-link:before{content:\"\\e144\"}.glyphicon-phone:before{content:\"\\e145\"}.glyphicon-pushpin:before{content:\"\\e146\"}.glyphicon-usd:before{content:\"\\e148\"}.glyphicon-gbp:before{content:\"\\e149\"}.glyphicon-sort:before{content:\"\\e150\"}.glyphicon-sort-by-alphabet:before{content:\"\\e151\"}.glyphicon-sort-by-alphabet-alt:before{content:\"\\e152\"}.glyphicon-sort-by-order:before{content:\"\\e153\"}.glyphicon-sort-by-order-alt:before{content:\"\\e154\"}.glyphicon-sort-by-attributes:before{content:\"\\e155\"}.glyphicon-sort-by-attributes-alt:before{content:\"\\e156\"}.glyphicon-unchecked:before{content:\"\\e157\"}.glyphicon-expand:before{content:\"\\e158\"}.glyphicon-collapse-down:before{content:\"\\e159\"}.glyphicon-collapse-up:before{content:\"\\e160\"}.glyphicon-log-in:before{content:\"\\e161\"}.glyphicon-flash:before{content:\"\\e162\"}.glyphicon-log-out:before{content:\"\\e163\"}.glyphicon-new-window:before{content:\"\\e164\"}.glyphicon-record:before{content:\"\\e165\"}.glyphicon-save:before{content:\"\\e166\"}.glyphicon-open:before{content:\"\\e167\"}.glyphicon-saved:before{content:\"\\e168\"}.glyphicon-import:before{content:\"\\e169\"}.glyphicon-export:before{content:\"\\e170\"}.glyphicon-send:before{content:\"\\e171\"}.glyphicon-floppy-disk:before{content:\"\\e172\"}.glyphicon-floppy-saved:before{content:\"\\e173\"}.glyphicon-floppy-remove:before{content:\"\\e174\"}.glyphicon-floppy-save:before{content:\"\\e175\"}.glyphicon-floppy-open:before{content:\"\\e176\"}.glyphicon-credit-card:before{content:\"\\e177\"}.glyphicon-transfer:before{content:\"\\e178\"}.glyphicon-cutlery:before{content:\"\\e179\"}.glyphicon-header:before{content:\"\\e180\"}.glyphicon-compressed:before{content:\"\\e181\"}.glyphicon-earphone:before{content:\"\\e182\"}.glyphicon-phone-alt:before{content:\"\\e183\"}.glyphicon-tower:before{content:\"\\e184\"}.glyphicon-stats:before{content:\"\\e185\"}.glyphicon-sd-video:before{content:\"\\e186\"}.glyphicon-hd-video:before{content:\"\\e187\"}.glyphicon-subtitles:before{content:\"\\e188\"}.glyphicon-sound-stereo:before{content:\"\\e189\"}.glyphicon-sound-dolby:before{content:\"\\e190\"}.glyphicon-sound-5-1:before{content:\"\\e191\"}.glyphicon-sound-6-1:before{content:\"\\e192\"}.glyphicon-sound-7-1:before{content:\"\\e193\"}.glyphicon-copyright-mark:before{content:\"\\e194\"}.glyphicon-registration-mark:before{content:\"\\e195\"}.glyphicon-cloud-download:before{content:\"\\e197\"}.glyphicon-cloud-upload:before{content:\"\\e198\"}.glyphicon-tree-conifer:before{content:\"\\e199\"}.glyphicon-tree-deciduous:before{content:\"\\e200\"}*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}*:before,*:after{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}html{font-size:10px;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{font-family:\"Source Sans Pro\",Calibri,Candara,Arial,sans-serif;font-size:15px;line-height:1.42857143;color:#333333;background-color:#ffffff}input,button,select,textarea{font-family:inherit;font-size:inherit;line-height:inherit}a{color:#2780e3;text-decoration:none}a:hover,a:focus{color:#165ba8;text-decoration:underline}a:focus{outline:thin dotted;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}figure{margin:0}img{vertical-align:middle}.img-responsive,.thumbnail>img,.thumbnail a>img,.carousel-inner>.item>img,.carousel-inner>.item>a>img{display:block;width:100% \\9;max-width:100%;height:auto}.img-rounded{border-radius:0}.img-thumbnail{padding:4px;line-height:1.42857143;background-color:#ffffff;border:1px solid #dddddd;border-radius:0;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;display:inline-block;width:100% \\9;max-width:100%;height:auto}.img-circle{border-radius:50%}hr{margin-top:21px;margin-bottom:21px;border:0;border-top:1px solid #e6e6e6}.sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}h1,h2,h3,h4,h5,h6,.h1,.h2,.h3,.h4,.h5,.h6{font-family:\"Source Sans Pro\",Calibri,Candara,Arial,sans-serif;font-weight:300;line-height:1.1;color:inherit}h1 small,h2 small,h3 small,h4 small,h5 small,h6 small,.h1 small,.h2 small,.h3 small,.h4 small,.h5 small,.h6 small,h1 .small,h2 .small,h3 .small,h4 .small,h5 .small,h6 .small,.h1 .small,.h2 .small,.h3 .small,.h4 .small,.h5 .small,.h6 .small{font-weight:normal;line-height:1;color:#999999}h1,.h1,h2,.h2,h3,.h3{margin-top:21px;margin-bottom:10.5px}h1 small,.h1 small,h2 small,.h2 small,h3 small,.h3 small,h1 .small,.h1 .small,h2 .small,.h2 .small,h3 .small,.h3 .small{font-size:65%}h4,.h4,h5,.h5,h6,.h6{margin-top:10.5px;margin-bottom:10.5px}h4 small,.h4 small,h5 small,.h5 small,h6 small,.h6 small,h4 .small,.h4 .small,h5 .small,.h5 .small,h6 .small,.h6 .small{font-size:75%}h1,.h1{font-size:39px}h2,.h2{font-size:32px}h3,.h3{font-size:26px}h4,.h4{font-size:19px}h5,.h5{font-size:15px}h6,.h6{font-size:13px}p{margin:0 0 10.5px}.lead{margin-bottom:21px;font-size:17px;font-weight:300;line-height:1.4}@media (min-width:768px){.lead{font-size:22.5px}}small,.small{font-size:86%}cite{font-style:normal}mark,.mark{background-color:#ff7518;padding:.2em}.text-left{text-align:left}.text-right{text-align:right}.text-center{text-align:center}.text-justify{text-align:justify}.text-nowrap{white-space:nowrap}.text-lowercase{text-transform:lowercase}.text-uppercase{text-transform:uppercase}.text-capitalize{text-transform:capitalize}.text-muted{color:#999999}.text-primary{color:#2780e3}a.text-primary:hover{color:#1967be}.text-success{color:#ffffff}a.text-success:hover{color:#e6e6e6}.text-info{color:#ffffff}a.text-info:hover{color:#e6e6e6}.text-warning{color:#ffffff}a.text-warning:hover{color:#e6e6e6}.text-danger{color:#ffffff}a.text-danger:hover{color:#e6e6e6}.bg-primary{color:#fff;background-color:#2780e3}a.bg-primary:hover{background-color:#1967be}.bg-success{background-color:#3fb618}a.bg-success:hover{background-color:#2f8912}.bg-info{background-color:#9954bb}a.bg-info:hover{background-color:#7e3f9d}.bg-warning{background-color:#ff7518}a.bg-warning:hover{background-color:#e45c00}.bg-danger{background-color:#ff0039}a.bg-danger:hover{background-color:#cc002e}.page-header{padding-bottom:9.5px;margin:42px 0 21px;border-bottom:1px solid #e6e6e6}ul,ol{margin-top:0;margin-bottom:10.5px}ul ul,ol ul,ul ol,ol ol{margin-bottom:0}.list-unstyled{padding-left:0;list-style:none}.list-inline{padding-left:0;list-style:none;margin-left:-5px}.list-inline>li{display:inline-block;padding-left:5px;padding-right:5px}dl{margin-top:0;margin-bottom:21px}dt,dd{line-height:1.42857143}dt{font-weight:bold}dd{margin-left:0}@media (min-width:768px){.dl-horizontal dt{float:left;width:160px;clear:left;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dl-horizontal dd{margin-left:180px}}abbr[title],abbr[data-original-title]{cursor:help;border-bottom:1px dotted #999999}.initialism{font-size:90%;text-transform:uppercase}blockquote{padding:10.5px 21px;margin:0 0 21px;font-size:18.75px;border-left:5px solid #e6e6e6}blockquote p:last-child,blockquote ul:last-child,blockquote ol:last-child{margin-bottom:0}blockquote footer,blockquote small,blockquote .small{display:block;font-size:80%;line-height:1.42857143;color:#999999}blockquote footer:before,blockquote small:before,blockquote .small:before{content:'\\2014 \\00A0'}.blockquote-reverse,blockquote.pull-right{padding-right:15px;padding-left:0;border-right:5px solid #e6e6e6;border-left:0;text-align:right}.blockquote-reverse footer:before,blockquote.pull-right footer:before,.blockquote-reverse small:before,blockquote.pull-right small:before,.blockquote-reverse .small:before,blockquote.pull-right .small:before{content:''}.blockquote-reverse footer:after,blockquote.pull-right footer:after,.blockquote-reverse small:after,blockquote.pull-right small:after,.blockquote-reverse .small:after,blockquote.pull-right .small:after{content:'\\00A0 \\2014'}blockquote:before,blockquote:after{content:\"\"}address{margin-bottom:21px;font-style:normal;line-height:1.42857143}code,kbd,pre,samp{font-family:Menlo,Monaco,Consolas,\"Courier New\",monospace}code{padding:2px 4px;font-size:90%;color:#c7254e;background-color:#f9f2f4;border-radius:0}kbd{padding:2px 4px;font-size:90%;color:#ffffff;background-color:#333333;border-radius:0;box-shadow:inset 0 -1px 0 rgba(0,0,0,0.25)}kbd kbd{padding:0;font-size:100%;box-shadow:none}pre{display:block;padding:10px;margin:0 0 10.5px;font-size:14px;line-height:1.42857143;word-break:break-all;word-wrap:break-word;color:#333333;background-color:#f5f5f5;border:1px solid #cccccc;border-radius:0}pre code{padding:0;font-size:inherit;color:inherit;white-space:pre-wrap;background-color:transparent;border-radius:0}.pre-scrollable{max-height:340px;overflow-y:scroll}.container{margin-right:auto;margin-left:auto;padding-left:15px;padding-right:15px}@media (min-width:768px){.container{width:750px}}@media (min-width:992px){.container{width:970px}}@media (min-width:1200px){.container{width:1170px}}.container-fluid{margin-right:auto;margin-left:auto;padding-left:15px;padding-right:15px}.row{margin-left:-15px;margin-right:-15px}.col-xs-1,.col-sm-1,.col-md-1,.col-lg-1,.col-xs-2,.col-sm-2,.col-md-2,.col-lg-2,.col-xs-3,.col-sm-3,.col-md-3,.col-lg-3,.col-xs-4,.col-sm-4,.col-md-4,.col-lg-4,.col-xs-5,.col-sm-5,.col-md-5,.col-lg-5,.col-xs-6,.col-sm-6,.col-md-6,.col-lg-6,.col-xs-7,.col-sm-7,.col-md-7,.col-lg-7,.col-xs-8,.col-sm-8,.col-md-8,.col-lg-8,.col-xs-9,.col-sm-9,.col-md-9,.col-lg-9,.col-xs-10,.col-sm-10,.col-md-10,.col-lg-10,.col-xs-11,.col-sm-11,.col-md-11,.col-lg-11,.col-xs-12,.col-sm-12,.col-md-12,.col-lg-12{position:relative;min-height:1px;padding-left:15px;padding-right:15px}.col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12{float:left}.col-xs-12{width:100%}.col-xs-11{width:91.66666667%}.col-xs-10{width:83.33333333%}.col-xs-9{width:75%}.col-xs-8{width:66.66666667%}.col-xs-7{width:58.33333333%}.col-xs-6{width:50%}.col-xs-5{width:41.66666667%}.col-xs-4{width:33.33333333%}.col-xs-3{width:25%}.col-xs-2{width:16.66666667%}.col-xs-1{width:8.33333333%}.col-xs-pull-12{right:100%}.col-xs-pull-11{right:91.66666667%}.col-xs-pull-10{right:83.33333333%}.col-xs-pull-9{right:75%}.col-xs-pull-8{right:66.66666667%}.col-xs-pull-7{right:58.33333333%}.col-xs-pull-6{right:50%}.col-xs-pull-5{right:41.66666667%}.col-xs-pull-4{right:33.33333333%}.col-xs-pull-3{right:25%}.col-xs-pull-2{right:16.66666667%}.col-xs-pull-1{right:8.33333333%}.col-xs-pull-0{right:auto}.col-xs-push-12{left:100%}.col-xs-push-11{left:91.66666667%}.col-xs-push-10{left:83.33333333%}.col-xs-push-9{left:75%}.col-xs-push-8{left:66.66666667%}.col-xs-push-7{left:58.33333333%}.col-xs-push-6{left:50%}.col-xs-push-5{left:41.66666667%}.col-xs-push-4{left:33.33333333%}.col-xs-push-3{left:25%}.col-xs-push-2{left:16.66666667%}.col-xs-push-1{left:8.33333333%}.col-xs-push-0{left:auto}.col-xs-offset-12{margin-left:100%}.col-xs-offset-11{margin-left:91.66666667%}.col-xs-offset-10{margin-left:83.33333333%}.col-xs-offset-9{margin-left:75%}.col-xs-offset-8{margin-left:66.66666667%}.col-xs-offset-7{margin-left:58.33333333%}.col-xs-offset-6{margin-left:50%}.col-xs-offset-5{margin-left:41.66666667%}.col-xs-offset-4{margin-left:33.33333333%}.col-xs-offset-3{margin-left:25%}.col-xs-offset-2{margin-left:16.66666667%}.col-xs-offset-1{margin-left:8.33333333%}.col-xs-offset-0{margin-left:0%}@media (min-width:768px){.col-sm-1,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-sm-10,.col-sm-11,.col-sm-12{float:left}.col-sm-12{width:100%}.col-sm-11{width:91.66666667%}.col-sm-10{width:83.33333333%}.col-sm-9{width:75%}.col-sm-8{width:66.66666667%}.col-sm-7{width:58.33333333%}.col-sm-6{width:50%}.col-sm-5{width:41.66666667%}.col-sm-4{width:33.33333333%}.col-sm-3{width:25%}.col-sm-2{width:16.66666667%}.col-sm-1{width:8.33333333%}.col-sm-pull-12{right:100%}.col-sm-pull-11{right:91.66666667%}.col-sm-pull-10{right:83.33333333%}.col-sm-pull-9{right:75%}.col-sm-pull-8{right:66.66666667%}.col-sm-pull-7{right:58.33333333%}.col-sm-pull-6{right:50%}.col-sm-pull-5{right:41.66666667%}.col-sm-pull-4{right:33.33333333%}.col-sm-pull-3{right:25%}.col-sm-pull-2{right:16.66666667%}.col-sm-pull-1{right:8.33333333%}.col-sm-pull-0{right:auto}.col-sm-push-12{left:100%}.col-sm-push-11{left:91.66666667%}.col-sm-push-10{left:83.33333333%}.col-sm-push-9{left:75%}.col-sm-push-8{left:66.66666667%}.col-sm-push-7{left:58.33333333%}.col-sm-push-6{left:50%}.col-sm-push-5{left:41.66666667%}.col-sm-push-4{left:33.33333333%}.col-sm-push-3{left:25%}.col-sm-push-2{left:16.66666667%}.col-sm-push-1{left:8.33333333%}.col-sm-push-0{left:auto}.col-sm-offset-12{margin-left:100%}.col-sm-offset-11{margin-left:91.66666667%}.col-sm-offset-10{margin-left:83.33333333%}.col-sm-offset-9{margin-left:75%}.col-sm-offset-8{margin-left:66.66666667%}.col-sm-offset-7{margin-left:58.33333333%}.col-sm-offset-6{margin-left:50%}.col-sm-offset-5{margin-left:41.66666667%}.col-sm-offset-4{margin-left:33.33333333%}.col-sm-offset-3{margin-left:25%}.col-sm-offset-2{margin-left:16.66666667%}.col-sm-offset-1{margin-left:8.33333333%}.col-sm-offset-0{margin-left:0%}}@media (min-width:992px){.col-md-1,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-10,.col-md-11,.col-md-12{float:left}.col-md-12{width:100%}.col-md-11{width:91.66666667%}.col-md-10{width:83.33333333%}.col-md-9{width:75%}.col-md-8{width:66.66666667%}.col-md-7{width:58.33333333%}.col-md-6{width:50%}.col-md-5{width:41.66666667%}.col-md-4{width:33.33333333%}.col-md-3{width:25%}.col-md-2{width:16.66666667%}.col-md-1{width:8.33333333%}.col-md-pull-12{right:100%}.col-md-pull-11{right:91.66666667%}.col-md-pull-10{right:83.33333333%}.col-md-pull-9{right:75%}.col-md-pull-8{right:66.66666667%}.col-md-pull-7{right:58.33333333%}.col-md-pull-6{right:50%}.col-md-pull-5{right:41.66666667%}.col-md-pull-4{right:33.33333333%}.col-md-pull-3{right:25%}.col-md-pull-2{right:16.66666667%}.col-md-pull-1{right:8.33333333%}.col-md-pull-0{right:auto}.col-md-push-12{left:100%}.col-md-push-11{left:91.66666667%}.col-md-push-10{left:83.33333333%}.col-md-push-9{left:75%}.col-md-push-8{left:66.66666667%}.col-md-push-7{left:58.33333333%}.col-md-push-6{left:50%}.col-md-push-5{left:41.66666667%}.col-md-push-4{left:33.33333333%}.col-md-push-3{left:25%}.col-md-push-2{left:16.66666667%}.col-md-push-1{left:8.33333333%}.col-md-push-0{left:auto}.col-md-offset-12{margin-left:100%}.col-md-offset-11{margin-left:91.66666667%}.col-md-offset-10{margin-left:83.33333333%}.col-md-offset-9{margin-left:75%}.col-md-offset-8{margin-left:66.66666667%}.col-md-offset-7{margin-left:58.33333333%}.col-md-offset-6{margin-left:50%}.col-md-offset-5{margin-left:41.66666667%}.col-md-offset-4{margin-left:33.33333333%}.col-md-offset-3{margin-left:25%}.col-md-offset-2{margin-left:16.66666667%}.col-md-offset-1{margin-left:8.33333333%}.col-md-offset-0{margin-left:0%}}@media (min-width:1200px){.col-lg-1,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-lg-10,.col-lg-11,.col-lg-12{float:left}.col-lg-12{width:100%}.col-lg-11{width:91.66666667%}.col-lg-10{width:83.33333333%}.col-lg-9{width:75%}.col-lg-8{width:66.66666667%}.col-lg-7{width:58.33333333%}.col-lg-6{width:50%}.col-lg-5{width:41.66666667%}.col-lg-4{width:33.33333333%}.col-lg-3{width:25%}.col-lg-2{width:16.66666667%}.col-lg-1{width:8.33333333%}.col-lg-pull-12{right:100%}.col-lg-pull-11{right:91.66666667%}.col-lg-pull-10{right:83.33333333%}.col-lg-pull-9{right:75%}.col-lg-pull-8{right:66.66666667%}.col-lg-pull-7{right:58.33333333%}.col-lg-pull-6{right:50%}.col-lg-pull-5{right:41.66666667%}.col-lg-pull-4{right:33.33333333%}.col-lg-pull-3{right:25%}.col-lg-pull-2{right:16.66666667%}.col-lg-pull-1{right:8.33333333%}.col-lg-pull-0{right:auto}.col-lg-push-12{left:100%}.col-lg-push-11{left:91.66666667%}.col-lg-push-10{left:83.33333333%}.col-lg-push-9{left:75%}.col-lg-push-8{left:66.66666667%}.col-lg-push-7{left:58.33333333%}.col-lg-push-6{left:50%}.col-lg-push-5{left:41.66666667%}.col-lg-push-4{left:33.33333333%}.col-lg-push-3{left:25%}.col-lg-push-2{left:16.66666667%}.col-lg-push-1{left:8.33333333%}.col-lg-push-0{left:auto}.col-lg-offset-12{margin-left:100%}.col-lg-offset-11{margin-left:91.66666667%}.col-lg-offset-10{margin-left:83.33333333%}.col-lg-offset-9{margin-left:75%}.col-lg-offset-8{margin-left:66.66666667%}.col-lg-offset-7{margin-left:58.33333333%}.col-lg-offset-6{margin-left:50%}.col-lg-offset-5{margin-left:41.66666667%}.col-lg-offset-4{margin-left:33.33333333%}.col-lg-offset-3{margin-left:25%}.col-lg-offset-2{margin-left:16.66666667%}.col-lg-offset-1{margin-left:8.33333333%}.col-lg-offset-0{margin-left:0%}}table{background-color:transparent}th{text-align:left}.table{width:100%;max-width:100%;margin-bottom:21px}.table>thead>tr>th,.table>tbody>tr>th,.table>tfoot>tr>th,.table>thead>tr>td,.table>tbody>tr>td,.table>tfoot>tr>td{padding:8px;line-height:1.42857143;vertical-align:top;border-top:1px solid #dddddd}.table>thead>tr>th{vertical-align:bottom;border-bottom:2px solid #dddddd}.table>caption+thead>tr:first-child>th,.table>colgroup+thead>tr:first-child>th,.table>thead:first-child>tr:first-child>th,.table>caption+thead>tr:first-child>td,.table>colgroup+thead>tr:first-child>td,.table>thead:first-child>tr:first-child>td{border-top:0}.table>tbody+tbody{border-top:2px solid #dddddd}.table .table{background-color:#ffffff}.table-condensed>thead>tr>th,.table-condensed>tbody>tr>th,.table-condensed>tfoot>tr>th,.table-condensed>thead>tr>td,.table-condensed>tbody>tr>td,.table-condensed>tfoot>tr>td{padding:5px}.table-bordered{border:1px solid #dddddd}.table-bordered>thead>tr>th,.table-bordered>tbody>tr>th,.table-bordered>tfoot>tr>th,.table-bordered>thead>tr>td,.table-bordered>tbody>tr>td,.table-bordered>tfoot>tr>td{border:1px solid #dddddd}.table-bordered>thead>tr>th,.table-bordered>thead>tr>td{border-bottom-width:2px}.table-striped>tbody>tr:nth-child(odd)>td,.table-striped>tbody>tr:nth-child(odd)>th{background-color:#f9f9f9}.table-hover>tbody>tr:hover>td,.table-hover>tbody>tr:hover>th{background-color:#f5f5f5}table col[class*=\"col-\"]{position:static;float:none;display:table-column}table td[class*=\"col-\"],table th[class*=\"col-\"]{position:static;float:none;display:table-cell}.table>thead>tr>td.active,.table>tbody>tr>td.active,.table>tfoot>tr>td.active,.table>thead>tr>th.active,.table>tbody>tr>th.active,.table>tfoot>tr>th.active,.table>thead>tr.active>td,.table>tbody>tr.active>td,.table>tfoot>tr.active>td,.table>thead>tr.active>th,.table>tbody>tr.active>th,.table>tfoot>tr.active>th{background-color:#f5f5f5}.table-hover>tbody>tr>td.active:hover,.table-hover>tbody>tr>th.active:hover,.table-hover>tbody>tr.active:hover>td,.table-hover>tbody>tr:hover>.active,.table-hover>tbody>tr.active:hover>th{background-color:#e8e8e8}.table>thead>tr>td.success,.table>tbody>tr>td.success,.table>tfoot>tr>td.success,.table>thead>tr>th.success,.table>tbody>tr>th.success,.table>tfoot>tr>th.success,.table>thead>tr.success>td,.table>tbody>tr.success>td,.table>tfoot>tr.success>td,.table>thead>tr.success>th,.table>tbody>tr.success>th,.table>tfoot>tr.success>th{background-color:#3fb618}.table-hover>tbody>tr>td.success:hover,.table-hover>tbody>tr>th.success:hover,.table-hover>tbody>tr.success:hover>td,.table-hover>tbody>tr:hover>.success,.table-hover>tbody>tr.success:hover>th{background-color:#379f15}.table>thead>tr>td.info,.table>tbody>tr>td.info,.table>tfoot>tr>td.info,.table>thead>tr>th.info,.table>tbody>tr>th.info,.table>tfoot>tr>th.info,.table>thead>tr.info>td,.table>tbody>tr.info>td,.table>tfoot>tr.info>td,.table>thead>tr.info>th,.table>tbody>tr.info>th,.table>tfoot>tr.info>th{background-color:#9954bb}.table-hover>tbody>tr>td.info:hover,.table-hover>tbody>tr>th.info:hover,.table-hover>tbody>tr.info:hover>td,.table-hover>tbody>tr:hover>.info,.table-hover>tbody>tr.info:hover>th{background-color:#8d46b0}.table>thead>tr>td.warning,.table>tbody>tr>td.warning,.table>tfoot>tr>td.warning,.table>thead>tr>th.warning,.table>tbody>tr>th.warning,.table>tfoot>tr>th.warning,.table>thead>tr.warning>td,.table>tbody>tr.warning>td,.table>tfoot>tr.warning>td,.table>thead>tr.warning>th,.table>tbody>tr.warning>th,.table>tfoot>tr.warning>th{background-color:#ff7518}.table-hover>tbody>tr>td.warning:hover,.table-hover>tbody>tr>th.warning:hover,.table-hover>tbody>tr.warning:hover>td,.table-hover>tbody>tr:hover>.warning,.table-hover>tbody>tr.warning:hover>th{background-color:#fe6600}.table>thead>tr>td.danger,.table>tbody>tr>td.danger,.table>tfoot>tr>td.danger,.table>thead>tr>th.danger,.table>tbody>tr>th.danger,.table>tfoot>tr>th.danger,.table>thead>tr.danger>td,.table>tbody>tr.danger>td,.table>tfoot>tr.danger>td,.table>thead>tr.danger>th,.table>tbody>tr.danger>th,.table>tfoot>tr.danger>th{background-color:#ff0039}.table-hover>tbody>tr>td.danger:hover,.table-hover>tbody>tr>th.danger:hover,.table-hover>tbody>tr.danger:hover>td,.table-hover>tbody>tr:hover>.danger,.table-hover>tbody>tr.danger:hover>th{background-color:#e60033}@media screen and (max-width:767px){.table-responsive{width:100%;margin-bottom:15.75px;overflow-y:hidden;overflow-x:auto;-ms-overflow-style:-ms-autohiding-scrollbar;border:1px solid #dddddd;-webkit-overflow-scrolling:touch}.table-responsive>.table{margin-bottom:0}.table-responsive>.table>thead>tr>th,.table-responsive>.table>tbody>tr>th,.table-responsive>.table>tfoot>tr>th,.table-responsive>.table>thead>tr>td,.table-responsive>.table>tbody>tr>td,.table-responsive>.table>tfoot>tr>td{white-space:nowrap}.table-responsive>.table-bordered{border:0}.table-responsive>.table-bordered>thead>tr>th:first-child,.table-responsive>.table-bordered>tbody>tr>th:first-child,.table-responsive>.table-bordered>tfoot>tr>th:first-child,.table-responsive>.table-bordered>thead>tr>td:first-child,.table-responsive>.table-bordered>tbody>tr>td:first-child,.table-responsive>.table-bordered>tfoot>tr>td:first-child{border-left:0}.table-responsive>.table-bordered>thead>tr>th:last-child,.table-responsive>.table-bordered>tbody>tr>th:last-child,.table-responsive>.table-bordered>tfoot>tr>th:last-child,.table-responsive>.table-bordered>thead>tr>td:last-child,.table-responsive>.table-bordered>tbody>tr>td:last-child,.table-responsive>.table-bordered>tfoot>tr>td:last-child{border-right:0}.table-responsive>.table-bordered>tbody>tr:last-child>th,.table-responsive>.table-bordered>tfoot>tr:last-child>th,.table-responsive>.table-bordered>tbody>tr:last-child>td,.table-responsive>.table-bordered>tfoot>tr:last-child>td{border-bottom:0}}fieldset{padding:0;margin:0;border:0;min-width:0}legend{display:block;width:100%;padding:0;margin-bottom:21px;font-size:22.5px;line-height:inherit;color:#333333;border:0;border-bottom:1px solid #e5e5e5}label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:bold}input[type=\"search\"]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}input[type=\"radio\"],input[type=\"checkbox\"]{margin:4px 0 0;margin-top:1px \\9;line-height:normal}input[type=\"file\"]{display:block}input[type=\"range\"]{display:block;width:100%}select[multiple],select[size]{height:auto}input[type=\"file\"]:focus,input[type=\"radio\"]:focus,input[type=\"checkbox\"]:focus{outline:thin dotted;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}output{display:block;padding-top:11px;font-size:15px;line-height:1.42857143;color:#333333}.form-control{display:block;width:100%;height:43px;padding:10px 18px;font-size:15px;line-height:1.42857143;color:#333333;background-color:#ffffff;background-image:none;border:1px solid #cccccc;border-radius:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-webkit-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}.form-control:focus{border-color:#66afe9;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(102,175,233,0.6);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(102,175,233,0.6)}.form-control::-moz-placeholder{color:#999999;opacity:1}.form-control:-ms-input-placeholder{color:#999999}.form-control::-webkit-input-placeholder{color:#999999}.form-control[disabled],.form-control[readonly],fieldset[disabled] .form-control{cursor:not-allowed;background-color:#e6e6e6;opacity:1}textarea.form-control{height:auto}input[type=\"search\"]{-webkit-appearance:none}input[type=\"date\"],input[type=\"time\"],input[type=\"datetime-local\"],input[type=\"month\"]{line-height:43px;line-height:1.42857143 \\0}input[type=\"date\"].input-sm,input[type=\"time\"].input-sm,input[type=\"datetime-local\"].input-sm,input[type=\"month\"].input-sm{line-height:31px}input[type=\"date\"].input-lg,input[type=\"time\"].input-lg,input[type=\"datetime-local\"].input-lg,input[type=\"month\"].input-lg{line-height:64px}.form-group{margin-bottom:15px}.radio,.checkbox{position:relative;display:block;min-height:21px;margin-top:10px;margin-bottom:10px}.radio label,.checkbox label{padding-left:20px;margin-bottom:0;font-weight:normal;cursor:pointer}.radio input[type=\"radio\"],.radio-inline input[type=\"radio\"],.checkbox input[type=\"checkbox\"],.checkbox-inline input[type=\"checkbox\"]{position:absolute;margin-left:-20px;margin-top:4px \\9}.radio+.radio,.checkbox+.checkbox{margin-top:-5px}.radio-inline,.checkbox-inline{display:inline-block;padding-left:20px;margin-bottom:0;vertical-align:middle;font-weight:normal;cursor:pointer}.radio-inline+.radio-inline,.checkbox-inline+.checkbox-inline{margin-top:0;margin-left:10px}input[type=\"radio\"][disabled],input[type=\"checkbox\"][disabled],input[type=\"radio\"].disabled,input[type=\"checkbox\"].disabled,fieldset[disabled] input[type=\"radio\"],fieldset[disabled] input[type=\"checkbox\"]{cursor:not-allowed}.radio-inline.disabled,.checkbox-inline.disabled,fieldset[disabled] .radio-inline,fieldset[disabled] .checkbox-inline{cursor:not-allowed}.radio.disabled label,.checkbox.disabled label,fieldset[disabled] .radio label,fieldset[disabled] .checkbox label{cursor:not-allowed}.form-control-static{padding-top:11px;padding-bottom:11px;margin-bottom:0}.form-control-static.input-lg,.form-control-static.input-sm{padding-left:0;padding-right:0}.input-sm,.form-horizontal .form-group-sm .form-control{height:31px;padding:5px 10px;font-size:13px;line-height:1.5;border-radius:0}select.input-sm{height:31px;line-height:31px}textarea.input-sm,select[multiple].input-sm{height:auto}.input-lg,.form-horizontal .form-group-lg .form-control{height:64px;padding:18px 30px;font-size:19px;line-height:1.33;border-radius:0}select.input-lg{height:64px;line-height:64px}textarea.input-lg,select[multiple].input-lg{height:auto}.has-feedback{position:relative}.has-feedback .form-control{padding-right:53.75px}.form-control-feedback{position:absolute;top:26px;right:0;z-index:2;display:block;width:43px;height:43px;line-height:43px;text-align:center}.input-lg+.form-control-feedback{width:64px;height:64px;line-height:64px}.input-sm+.form-control-feedback{width:31px;height:31px;line-height:31px}.has-success .help-block,.has-success .control-label,.has-success .radio,.has-success .checkbox,.has-success .radio-inline,.has-success .checkbox-inline{color:#ffffff}.has-success .form-control{border-color:#ffffff;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075)}.has-success .form-control:focus{border-color:#e6e6e6;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff}.has-success .input-group-addon{color:#ffffff;border-color:#ffffff;background-color:#3fb618}.has-success .form-control-feedback{color:#ffffff}.has-warning .help-block,.has-warning .control-label,.has-warning .radio,.has-warning .checkbox,.has-warning .radio-inline,.has-warning .checkbox-inline{color:#ffffff}.has-warning .form-control{border-color:#ffffff;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075)}.has-warning .form-control:focus{border-color:#e6e6e6;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff}.has-warning .input-group-addon{color:#ffffff;border-color:#ffffff;background-color:#ff7518}.has-warning .form-control-feedback{color:#ffffff}.has-error .help-block,.has-error .control-label,.has-error .radio,.has-error .checkbox,.has-error .radio-inline,.has-error .checkbox-inline{color:#ffffff}.has-error .form-control{border-color:#ffffff;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075)}.has-error .form-control:focus{border-color:#e6e6e6;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff}.has-error .input-group-addon{color:#ffffff;border-color:#ffffff;background-color:#ff0039}.has-error .form-control-feedback{color:#ffffff}.has-feedback label.sr-only~.form-control-feedback{top:0}.help-block{display:block;margin-top:5px;margin-bottom:10px;color:#737373}@media (min-width:768px){.form-inline .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.form-inline .form-control{display:inline-block;width:auto;vertical-align:middle}.form-inline .input-group{display:inline-table;vertical-align:middle}.form-inline .input-group .input-group-addon,.form-inline .input-group .input-group-btn,.form-inline .input-group .form-control{width:auto}.form-inline .input-group>.form-control{width:100%}.form-inline .control-label{margin-bottom:0;vertical-align:middle}.form-inline .radio,.form-inline .checkbox{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.form-inline .radio label,.form-inline .checkbox label{padding-left:0}.form-inline .radio input[type=\"radio\"],.form-inline .checkbox input[type=\"checkbox\"]{position:relative;margin-left:0}.form-inline .has-feedback .form-control-feedback{top:0}}.form-horizontal .radio,.form-horizontal .checkbox,.form-horizontal .radio-inline,.form-horizontal .checkbox-inline{margin-top:0;margin-bottom:0;padding-top:11px}.form-horizontal .radio,.form-horizontal .checkbox{min-height:32px}.form-horizontal .form-group{margin-left:-15px;margin-right:-15px}@media (min-width:768px){.form-horizontal .control-label{text-align:right;margin-bottom:0;padding-top:11px}}.form-horizontal .has-feedback .form-control-feedback{top:0;right:15px}@media (min-width:768px){.form-horizontal .form-group-lg .control-label{padding-top:24.94px}}@media (min-width:768px){.form-horizontal .form-group-sm .control-label{padding-top:6px}}.btn{display:inline-block;margin-bottom:0;font-weight:normal;text-align:center;vertical-align:middle;cursor:pointer;background-image:none;border:1px solid transparent;white-space:nowrap;padding:10px 18px;font-size:15px;line-height:1.42857143;border-radius:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.btn:focus,.btn:active:focus,.btn.active:focus{outline:thin dotted;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.btn:hover,.btn:focus{color:#ffffff;text-decoration:none}.btn:active,.btn.active{outline:0;background-image:none;-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,0.125);box-shadow:inset 0 3px 5px rgba(0,0,0,0.125)}.btn.disabled,.btn[disabled],fieldset[disabled] .btn{cursor:not-allowed;pointer-events:none;opacity:0.65;filter:alpha(opacity=65);-webkit-box-shadow:none;box-shadow:none}.btn-default{color:#ffffff;background-color:#222222;border-color:#222222}.btn-default:hover,.btn-default:focus,.btn-default:active,.btn-default.active,.open>.dropdown-toggle.btn-default{color:#ffffff;background-color:#090909;border-color:#040404}.btn-default:active,.btn-default.active,.open>.dropdown-toggle.btn-default{background-image:none}.btn-default.disabled,.btn-default[disabled],fieldset[disabled] .btn-default,.btn-default.disabled:hover,.btn-default[disabled]:hover,fieldset[disabled] .btn-default:hover,.btn-default.disabled:focus,.btn-default[disabled]:focus,fieldset[disabled] .btn-default:focus,.btn-default.disabled:active,.btn-default[disabled]:active,fieldset[disabled] .btn-default:active,.btn-default.disabled.active,.btn-default[disabled].active,fieldset[disabled] .btn-default.active{background-color:#222222;border-color:#222222}.btn-default .badge{color:#222222;background-color:#ffffff}.btn-primary{color:#ffffff;background-color:#2780e3;border-color:#2780e3}.btn-primary:hover,.btn-primary:focus,.btn-primary:active,.btn-primary.active,.open>.dropdown-toggle.btn-primary{color:#ffffff;background-color:#1967be;border-color:#1862b5}.btn-primary:active,.btn-primary.active,.open>.dropdown-toggle.btn-primary{background-image:none}.btn-primary.disabled,.btn-primary[disabled],fieldset[disabled] .btn-primary,.btn-primary.disabled:hover,.btn-primary[disabled]:hover,fieldset[disabled] .btn-primary:hover,.btn-primary.disabled:focus,.btn-primary[disabled]:focus,fieldset[disabled] .btn-primary:focus,.btn-primary.disabled:active,.btn-primary[disabled]:active,fieldset[disabled] .btn-primary:active,.btn-primary.disabled.active,.btn-primary[disabled].active,fieldset[disabled] .btn-primary.active{background-color:#2780e3;border-color:#2780e3}.btn-primary .badge{color:#2780e3;background-color:#ffffff}.btn-success{color:#ffffff;background-color:#3fb618;border-color:#3fb618}.btn-success:hover,.btn-success:focus,.btn-success:active,.btn-success.active,.open>.dropdown-toggle.btn-success{color:#ffffff;background-color:#2f8912;border-color:#2c8011}.btn-success:active,.btn-success.active,.open>.dropdown-toggle.btn-success{background-image:none}.btn-success.disabled,.btn-success[disabled],fieldset[disabled] .btn-success,.btn-success.disabled:hover,.btn-success[disabled]:hover,fieldset[disabled] .btn-success:hover,.btn-success.disabled:focus,.btn-success[disabled]:focus,fieldset[disabled] .btn-success:focus,.btn-success.disabled:active,.btn-success[disabled]:active,fieldset[disabled] .btn-success:active,.btn-success.disabled.active,.btn-success[disabled].active,fieldset[disabled] .btn-success.active{background-color:#3fb618;border-color:#3fb618}.btn-success .badge{color:#3fb618;background-color:#ffffff}.btn-info{color:#ffffff;background-color:#9954bb;border-color:#9954bb}.btn-info:hover,.btn-info:focus,.btn-info:active,.btn-info.active,.open>.dropdown-toggle.btn-info{color:#ffffff;background-color:#7e3f9d;border-color:#783c96}.btn-info:active,.btn-info.active,.open>.dropdown-toggle.btn-info{background-image:none}.btn-info.disabled,.btn-info[disabled],fieldset[disabled] .btn-info,.btn-info.disabled:hover,.btn-info[disabled]:hover,fieldset[disabled] .btn-info:hover,.btn-info.disabled:focus,.btn-info[disabled]:focus,fieldset[disabled] .btn-info:focus,.btn-info.disabled:active,.btn-info[disabled]:active,fieldset[disabled] .btn-info:active,.btn-info.disabled.active,.btn-info[disabled].active,fieldset[disabled] .btn-info.active{background-color:#9954bb;border-color:#9954bb}.btn-info .badge{color:#9954bb;background-color:#ffffff}.btn-warning{color:#ffffff;background-color:#ff7518;border-color:#ff7518}.btn-warning:hover,.btn-warning:focus,.btn-warning:active,.btn-warning.active,.open>.dropdown-toggle.btn-warning{color:#ffffff;background-color:#e45c00;border-color:#da5800}.btn-warning:active,.btn-warning.active,.open>.dropdown-toggle.btn-warning{background-image:none}.btn-warning.disabled,.btn-warning[disabled],fieldset[disabled] .btn-warning,.btn-warning.disabled:hover,.btn-warning[disabled]:hover,fieldset[disabled] .btn-warning:hover,.btn-warning.disabled:focus,.btn-warning[disabled]:focus,fieldset[disabled] .btn-warning:focus,.btn-warning.disabled:active,.btn-warning[disabled]:active,fieldset[disabled] .btn-warning:active,.btn-warning.disabled.active,.btn-warning[disabled].active,fieldset[disabled] .btn-warning.active{background-color:#ff7518;border-color:#ff7518}.btn-warning .badge{color:#ff7518;background-color:#ffffff}.btn-danger{color:#ffffff;background-color:#ff0039;border-color:#ff0039}.btn-danger:hover,.btn-danger:focus,.btn-danger:active,.btn-danger.active,.open>.dropdown-toggle.btn-danger{color:#ffffff;background-color:#cc002e;border-color:#c2002b}.btn-danger:active,.btn-danger.active,.open>.dropdown-toggle.btn-danger{background-image:none}.btn-danger.disabled,.btn-danger[disabled],fieldset[disabled] .btn-danger,.btn-danger.disabled:hover,.btn-danger[disabled]:hover,fieldset[disabled] .btn-danger:hover,.btn-danger.disabled:focus,.btn-danger[disabled]:focus,fieldset[disabled] .btn-danger:focus,.btn-danger.disabled:active,.btn-danger[disabled]:active,fieldset[disabled] .btn-danger:active,.btn-danger.disabled.active,.btn-danger[disabled].active,fieldset[disabled] .btn-danger.active{background-color:#ff0039;border-color:#ff0039}.btn-danger .badge{color:#ff0039;background-color:#ffffff}.btn-link{color:#2780e3;font-weight:normal;cursor:pointer;border-radius:0}.btn-link,.btn-link:active,.btn-link[disabled],fieldset[disabled] .btn-link{background-color:transparent;-webkit-box-shadow:none;box-shadow:none}.btn-link,.btn-link:hover,.btn-link:focus,.btn-link:active{border-color:transparent}.btn-link:hover,.btn-link:focus{color:#165ba8;text-decoration:underline;background-color:transparent}.btn-link[disabled]:hover,fieldset[disabled] .btn-link:hover,.btn-link[disabled]:focus,fieldset[disabled] .btn-link:focus{color:#999999;text-decoration:none}.btn-lg,.btn-group-lg>.btn{padding:18px 30px;font-size:19px;line-height:1.33;border-radius:0}.btn-sm,.btn-group-sm>.btn{padding:5px 10px;font-size:13px;line-height:1.5;border-radius:0}.btn-xs,.btn-group-xs>.btn{padding:1px 5px;font-size:13px;line-height:1.5;border-radius:0}.btn-block{display:block;width:100%}.btn-block+.btn-block{margin-top:5px}input[type=\"submit\"].btn-block,input[type=\"reset\"].btn-block,input[type=\"button\"].btn-block{width:100%}.fade{opacity:0;-webkit-transition:opacity 0.15s linear;-o-transition:opacity 0.15s linear;transition:opacity 0.15s linear}.fade.in{opacity:1}.collapse{display:none}.collapse.in{display:block}tr.collapse.in{display:table-row}tbody.collapse.in{display:table-row-group}.collapsing{position:relative;height:0;overflow:hidden;-webkit-transition:height 0.35s ease;-o-transition:height 0.35s ease;transition:height 0.35s ease}.caret{display:inline-block;width:0;height:0;margin-left:2px;vertical-align:middle;border-top:4px solid;border-right:4px solid transparent;border-left:4px solid transparent}.dropdown{position:relative}.dropdown-toggle:focus{outline:0}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:160px;padding:5px 0;margin:2px 0 0;list-style:none;font-size:15px;text-align:left;background-color:#ffffff;border:1px solid #cccccc;border:1px solid rgba(0,0,0,0.15);border-radius:0;-webkit-box-shadow:0 6px 12px rgba(0,0,0,0.175);box-shadow:0 6px 12px rgba(0,0,0,0.175);background-clip:padding-box}.dropdown-menu.pull-right{right:0;left:auto}.dropdown-menu .divider{height:1px;margin:9.5px 0;overflow:hidden;background-color:#e5e5e5}.dropdown-menu>li>a{display:block;padding:3px 20px;clear:both;font-weight:normal;line-height:1.42857143;color:#333333;white-space:nowrap}.dropdown-menu>li>a:hover,.dropdown-menu>li>a:focus{text-decoration:none;color:#ffffff;background-color:#2780e3}.dropdown-menu>.active>a,.dropdown-menu>.active>a:hover,.dropdown-menu>.active>a:focus{color:#ffffff;text-decoration:none;outline:0;background-color:#2780e3}.dropdown-menu>.disabled>a,.dropdown-menu>.disabled>a:hover,.dropdown-menu>.disabled>a:focus{color:#999999}.dropdown-menu>.disabled>a:hover,.dropdown-menu>.disabled>a:focus{text-decoration:none;background-color:transparent;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);cursor:not-allowed}.open>.dropdown-menu{display:block}.open>a{outline:0}.dropdown-menu-right{left:auto;right:0}.dropdown-menu-left{left:0;right:auto}.dropdown-header{display:block;padding:3px 20px;font-size:13px;line-height:1.42857143;color:#999999;white-space:nowrap}.dropdown-backdrop{position:fixed;left:0;right:0;bottom:0;top:0;z-index:990}.pull-right>.dropdown-menu{right:0;left:auto}.dropup .caret,.navbar-fixed-bottom .dropdown .caret{border-top:0;border-bottom:4px solid;content:\"\"}.dropup .dropdown-menu,.navbar-fixed-bottom .dropdown .dropdown-menu{top:auto;bottom:100%;margin-bottom:1px}@media (min-width:768px){.navbar-right .dropdown-menu{left:auto;right:0}.navbar-right .dropdown-menu-left{left:0;right:auto}}.btn-group,.btn-group-vertical{position:relative;display:inline-block;vertical-align:middle}.btn-group>.btn,.btn-group-vertical>.btn{position:relative;float:left}.btn-group>.btn:hover,.btn-group-vertical>.btn:hover,.btn-group>.btn:focus,.btn-group-vertical>.btn:focus,.btn-group>.btn:active,.btn-group-vertical>.btn:active,.btn-group>.btn.active,.btn-group-vertical>.btn.active{z-index:2}.btn-group>.btn:focus,.btn-group-vertical>.btn:focus{outline:0}.btn-group .btn+.btn,.btn-group .btn+.btn-group,.btn-group .btn-group+.btn,.btn-group .btn-group+.btn-group{margin-left:-1px}.btn-toolbar{margin-left:-5px}.btn-toolbar .btn-group,.btn-toolbar .input-group{float:left}.btn-toolbar>.btn,.btn-toolbar>.btn-group,.btn-toolbar>.input-group{margin-left:5px}.btn-group>.btn:not(:first-child):not(:last-child):not(.dropdown-toggle){border-radius:0}.btn-group>.btn:first-child{margin-left:0}.btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle){border-bottom-right-radius:0;border-top-right-radius:0}.btn-group>.btn:last-child:not(:first-child),.btn-group>.dropdown-toggle:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.btn-group>.btn-group{float:left}.btn-group>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group>.btn-group:first-child>.btn:last-child,.btn-group>.btn-group:first-child>.dropdown-toggle{border-bottom-right-radius:0;border-top-right-radius:0}.btn-group>.btn-group:last-child>.btn:first-child{border-bottom-left-radius:0;border-top-left-radius:0}.btn-group .dropdown-toggle:active,.btn-group.open .dropdown-toggle{outline:0}.btn-group>.btn+.dropdown-toggle{padding-left:8px;padding-right:8px}.btn-group>.btn-lg+.dropdown-toggle{padding-left:12px;padding-right:12px}.btn-group.open .dropdown-toggle{-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,0.125);box-shadow:inset 0 3px 5px rgba(0,0,0,0.125)}.btn-group.open .dropdown-toggle.btn-link{-webkit-box-shadow:none;box-shadow:none}.btn .caret{margin-left:0}.btn-lg .caret{border-width:5px 5px 0;border-bottom-width:0}.dropup .btn-lg .caret{border-width:0 5px 5px}.btn-group-vertical>.btn,.btn-group-vertical>.btn-group,.btn-group-vertical>.btn-group>.btn{display:block;float:none;width:100%;max-width:100%}.btn-group-vertical>.btn-group>.btn{float:none}.btn-group-vertical>.btn+.btn,.btn-group-vertical>.btn+.btn-group,.btn-group-vertical>.btn-group+.btn,.btn-group-vertical>.btn-group+.btn-group{margin-top:-1px;margin-left:0}.btn-group-vertical>.btn:not(:first-child):not(:last-child){border-radius:0}.btn-group-vertical>.btn:first-child:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn:last-child:not(:first-child){border-bottom-left-radius:0;border-top-right-radius:0;border-top-left-radius:0}.btn-group-vertical>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group-vertical>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group-vertical>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn-group:last-child:not(:first-child)>.btn:first-child{border-top-right-radius:0;border-top-left-radius:0}.btn-group-justified{display:table;width:100%;table-layout:fixed;border-collapse:separate}.btn-group-justified>.btn,.btn-group-justified>.btn-group{float:none;display:table-cell;width:1%}.btn-group-justified>.btn-group .btn{width:100%}.btn-group-justified>.btn-group .dropdown-menu{left:auto}[data-toggle=\"buttons\"]>.btn>input[type=\"radio\"],[data-toggle=\"buttons\"]>.btn>input[type=\"checkbox\"]{position:absolute;z-index:-1;opacity:0;filter:alpha(opacity=0)}.input-group{position:relative;display:table;border-collapse:separate}.input-group[class*=\"col-\"]{float:none;padding-left:0;padding-right:0}.input-group .form-control{position:relative;z-index:2;float:left;width:100%;margin-bottom:0}.input-group-lg>.form-control,.input-group-lg>.input-group-addon,.input-group-lg>.input-group-btn>.btn{height:64px;padding:18px 30px;font-size:19px;line-height:1.33;border-radius:0}select.input-group-lg>.form-control,select.input-group-lg>.input-group-addon,select.input-group-lg>.input-group-btn>.btn{height:64px;line-height:64px}textarea.input-group-lg>.form-control,textarea.input-group-lg>.input-group-addon,textarea.input-group-lg>.input-group-btn>.btn,select[multiple].input-group-lg>.form-control,select[multiple].input-group-lg>.input-group-addon,select[multiple].input-group-lg>.input-group-btn>.btn{height:auto}.input-group-sm>.form-control,.input-group-sm>.input-group-addon,.input-group-sm>.input-group-btn>.btn{height:31px;padding:5px 10px;font-size:13px;line-height:1.5;border-radius:0}select.input-group-sm>.form-control,select.input-group-sm>.input-group-addon,select.input-group-sm>.input-group-btn>.btn{height:31px;line-height:31px}textarea.input-group-sm>.form-control,textarea.input-group-sm>.input-group-addon,textarea.input-group-sm>.input-group-btn>.btn,select[multiple].input-group-sm>.form-control,select[multiple].input-group-sm>.input-group-addon,select[multiple].input-group-sm>.input-group-btn>.btn{height:auto}.input-group-addon,.input-group-btn,.input-group .form-control{display:table-cell}.input-group-addon:not(:first-child):not(:last-child),.input-group-btn:not(:first-child):not(:last-child),.input-group .form-control:not(:first-child):not(:last-child){border-radius:0}.input-group-addon,.input-group-btn{width:1%;white-space:nowrap;vertical-align:middle}.input-group-addon{padding:10px 18px;font-size:15px;font-weight:normal;line-height:1;color:#333333;text-align:center;background-color:#e6e6e6;border:1px solid #cccccc;border-radius:0}.input-group-addon.input-sm{padding:5px 10px;font-size:13px;border-radius:0}.input-group-addon.input-lg{padding:18px 30px;font-size:19px;border-radius:0}.input-group-addon input[type=\"radio\"],.input-group-addon input[type=\"checkbox\"]{margin-top:0}.input-group .form-control:first-child,.input-group-addon:first-child,.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group>.btn,.input-group-btn:first-child>.dropdown-toggle,.input-group-btn:last-child>.btn:not(:last-child):not(.dropdown-toggle),.input-group-btn:last-child>.btn-group:not(:last-child)>.btn{border-bottom-right-radius:0;border-top-right-radius:0}.input-group-addon:first-child{border-right:0}.input-group .form-control:last-child,.input-group-addon:last-child,.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group>.btn,.input-group-btn:last-child>.dropdown-toggle,.input-group-btn:first-child>.btn:not(:first-child),.input-group-btn:first-child>.btn-group:not(:first-child)>.btn{border-bottom-left-radius:0;border-top-left-radius:0}.input-group-addon:last-child{border-left:0}.input-group-btn{position:relative;font-size:0;white-space:nowrap}.input-group-btn>.btn{position:relative}.input-group-btn>.btn+.btn{margin-left:-1px}.input-group-btn>.btn:hover,.input-group-btn>.btn:focus,.input-group-btn>.btn:active{z-index:2}.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group{margin-right:-1px}.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group{margin-left:-1px}.nav{margin-bottom:0;padding-left:0;list-style:none}.nav>li{position:relative;display:block}.nav>li>a{position:relative;display:block;padding:10px 15px}.nav>li>a:hover,.nav>li>a:focus{text-decoration:none;background-color:#e6e6e6}.nav>li.disabled>a{color:#999999}.nav>li.disabled>a:hover,.nav>li.disabled>a:focus{color:#999999;text-decoration:none;background-color:transparent;cursor:not-allowed}.nav .open>a,.nav .open>a:hover,.nav .open>a:focus{background-color:#e6e6e6;border-color:#2780e3}.nav .nav-divider{height:1px;margin:9.5px 0;overflow:hidden;background-color:#e5e5e5}.nav>li>a>img{max-width:none}.nav-tabs{border-bottom:1px solid #dddddd}.nav-tabs>li{float:left;margin-bottom:-1px}.nav-tabs>li>a{margin-right:2px;line-height:1.42857143;border:1px solid transparent;border-radius:0 0 0 0}.nav-tabs>li>a:hover{border-color:#e6e6e6 #e6e6e6 #dddddd}.nav-tabs>li.active>a,.nav-tabs>li.active>a:hover,.nav-tabs>li.active>a:focus{color:#555555;background-color:#ffffff;border:1px solid #dddddd;border-bottom-color:transparent;cursor:default}.nav-tabs.nav-justified{width:100%;border-bottom:0}.nav-tabs.nav-justified>li{float:none}.nav-tabs.nav-justified>li>a{text-align:center;margin-bottom:5px}.nav-tabs.nav-justified>.dropdown .dropdown-menu{top:auto;left:auto}@media (min-width:768px){.nav-tabs.nav-justified>li{display:table-cell;width:1%}.nav-tabs.nav-justified>li>a{margin-bottom:0}}.nav-tabs.nav-justified>li>a{margin-right:0;border-radius:0}.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:hover,.nav-tabs.nav-justified>.active>a:focus{border:1px solid #dddddd}@media (min-width:768px){.nav-tabs.nav-justified>li>a{border-bottom:1px solid #dddddd;border-radius:0 0 0 0}.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:hover,.nav-tabs.nav-justified>.active>a:focus{border-bottom-color:#ffffff}}.nav-pills>li{float:left}.nav-pills>li>a{border-radius:0}.nav-pills>li+li{margin-left:2px}.nav-pills>li.active>a,.nav-pills>li.active>a:hover,.nav-pills>li.active>a:focus{color:#ffffff;background-color:#2780e3}.nav-stacked>li{float:none}.nav-stacked>li+li{margin-top:2px;margin-left:0}.nav-justified{width:100%}.nav-justified>li{float:none}.nav-justified>li>a{text-align:center;margin-bottom:5px}.nav-justified>.dropdown .dropdown-menu{top:auto;left:auto}@media (min-width:768px){.nav-justified>li{display:table-cell;width:1%}.nav-justified>li>a{margin-bottom:0}}.nav-tabs-justified{border-bottom:0}.nav-tabs-justified>li>a{margin-right:0;border-radius:0}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:hover,.nav-tabs-justified>.active>a:focus{border:1px solid #dddddd}@media (min-width:768px){.nav-tabs-justified>li>a{border-bottom:1px solid #dddddd;border-radius:0 0 0 0}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:hover,.nav-tabs-justified>.active>a:focus{border-bottom-color:#ffffff}}.tab-content>.tab-pane{display:none}.tab-content>.active{display:block}.nav-tabs .dropdown-menu{margin-top:-1px;border-top-right-radius:0;border-top-left-radius:0}.navbar{position:relative;min-height:50px;margin-bottom:21px;border:1px solid transparent}@media (min-width:768px){.navbar{border-radius:0}}@media (min-width:768px){.navbar-header{float:left}}.navbar-collapse{overflow-x:visible;padding-right:15px;padding-left:15px;border-top:1px solid transparent;box-shadow:inset 0 1px 0 rgba(255,255,255,0.1);-webkit-overflow-scrolling:touch}.navbar-collapse.in{overflow-y:auto}@media (min-width:768px){.navbar-collapse{width:auto;border-top:0;box-shadow:none}.navbar-collapse.collapse{display:block !important;height:auto !important;padding-bottom:0;overflow:visible !important}.navbar-collapse.in{overflow-y:visible}.navbar-fixed-top .navbar-collapse,.navbar-static-top .navbar-collapse,.navbar-fixed-bottom .navbar-collapse{padding-left:0;padding-right:0}}.navbar-fixed-top .navbar-collapse,.navbar-fixed-bottom .navbar-collapse{max-height:340px}@media (max-width:480px) and (orientation:landscape){.navbar-fixed-top .navbar-collapse,.navbar-fixed-bottom .navbar-collapse{max-height:200px}}.container>.navbar-header,.container-fluid>.navbar-header,.container>.navbar-collapse,.container-fluid>.navbar-collapse{margin-right:-15px;margin-left:-15px}@media (min-width:768px){.container>.navbar-header,.container-fluid>.navbar-header,.container>.navbar-collapse,.container-fluid>.navbar-collapse{margin-right:0;margin-left:0}}.navbar-static-top{z-index:1000;border-width:0 0 1px}@media (min-width:768px){.navbar-static-top{border-radius:0}}.navbar-fixed-top,.navbar-fixed-bottom{position:fixed;right:0;left:0;z-index:1030;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}@media (min-width:768px){.navbar-fixed-top,.navbar-fixed-bottom{border-radius:0}}.navbar-fixed-top{top:0;border-width:0 0 1px}.navbar-fixed-bottom{bottom:0;margin-bottom:0;border-width:1px 0 0}.navbar-brand{float:left;padding:14.5px 15px;font-size:19px;line-height:21px;height:50px}.navbar-brand:hover,.navbar-brand:focus{text-decoration:none}@media (min-width:768px){.navbar>.container .navbar-brand,.navbar>.container-fluid .navbar-brand{margin-left:-15px}}.navbar-toggle{position:relative;float:right;margin-right:15px;padding:9px 10px;margin-top:8px;margin-bottom:8px;background-color:transparent;background-image:none;border:1px solid transparent;border-radius:0}.navbar-toggle:focus{outline:0}.navbar-toggle .icon-bar{display:block;width:22px;height:2px;border-radius:1px}.navbar-toggle .icon-bar+.icon-bar{margin-top:4px}@media (min-width:768px){.navbar-toggle{display:none}}.navbar-nav{margin:7.25px -15px}.navbar-nav>li>a{padding-top:10px;padding-bottom:10px;line-height:21px}@media (max-width:767px){.navbar-nav .open .dropdown-menu{position:static;float:none;width:auto;margin-top:0;background-color:transparent;border:0;box-shadow:none}.navbar-nav .open .dropdown-menu>li>a,.navbar-nav .open .dropdown-menu .dropdown-header{padding:5px 15px 5px 25px}.navbar-nav .open .dropdown-menu>li>a{line-height:21px}.navbar-nav .open .dropdown-menu>li>a:hover,.navbar-nav .open .dropdown-menu>li>a:focus{background-image:none}}@media (min-width:768px){.navbar-nav{float:left;margin:0}.navbar-nav>li{float:left}.navbar-nav>li>a{padding-top:14.5px;padding-bottom:14.5px}.navbar-nav.navbar-right:last-child{margin-right:-15px}}@media (min-width:768px){.navbar-left{float:left !important}.navbar-right{float:right !important}}.navbar-form{margin-left:-15px;margin-right:-15px;padding:10px 15px;border-top:1px solid transparent;border-bottom:1px solid transparent;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.1);box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.1);margin-top:3.5px;margin-bottom:3.5px}@media (min-width:768px){.navbar-form .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.navbar-form .form-control{display:inline-block;width:auto;vertical-align:middle}.navbar-form .input-group{display:inline-table;vertical-align:middle}.navbar-form .input-group .input-group-addon,.navbar-form .input-group .input-group-btn,.navbar-form .input-group .form-control{width:auto}.navbar-form .input-group>.form-control{width:100%}.navbar-form .control-label{margin-bottom:0;vertical-align:middle}.navbar-form .radio,.navbar-form .checkbox{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.navbar-form .radio label,.navbar-form .checkbox label{padding-left:0}.navbar-form .radio input[type=\"radio\"],.navbar-form .checkbox input[type=\"checkbox\"]{position:relative;margin-left:0}.navbar-form .has-feedback .form-control-feedback{top:0}}@media (max-width:767px){.navbar-form .form-group{margin-bottom:5px}}@media (min-width:768px){.navbar-form{width:auto;border:0;margin-left:0;margin-right:0;padding-top:0;padding-bottom:0;-webkit-box-shadow:none;box-shadow:none}.navbar-form.navbar-right:last-child{margin-right:-15px}}.navbar-nav>li>.dropdown-menu{margin-top:0;border-top-right-radius:0;border-top-left-radius:0}.navbar-fixed-bottom .navbar-nav>li>.dropdown-menu{border-bottom-right-radius:0;border-bottom-left-radius:0}.navbar-btn{margin-top:3.5px;margin-bottom:3.5px}.navbar-btn.btn-sm{margin-top:9.5px;margin-bottom:9.5px}.navbar-btn.btn-xs{margin-top:14px;margin-bottom:14px}.navbar-text{margin-top:14.5px;margin-bottom:14.5px}@media (min-width:768px){.navbar-text{float:left;margin-left:15px;margin-right:15px}.navbar-text.navbar-right:last-child{margin-right:0}}.navbar-default{background-color:#222222;border-color:#121212}.navbar-default .navbar-brand{color:#ffffff}.navbar-default .navbar-brand:hover,.navbar-default .navbar-brand:focus{color:#ffffff;background-color:none}.navbar-default .navbar-text{color:#ffffff}.navbar-default .navbar-nav>li>a{color:#ffffff}.navbar-default .navbar-nav>li>a:hover,.navbar-default .navbar-nav>li>a:focus{color:#ffffff;background-color:#090909}.navbar-default .navbar-nav>.active>a,.navbar-default .navbar-nav>.active>a:hover,.navbar-default .navbar-nav>.active>a:focus{color:#ffffff;background-color:#090909}.navbar-default .navbar-nav>.disabled>a,.navbar-default .navbar-nav>.disabled>a:hover,.navbar-default .navbar-nav>.disabled>a:focus{color:#cccccc;background-color:transparent}.navbar-default .navbar-toggle{border-color:transparent}.navbar-default .navbar-toggle:hover,.navbar-default .navbar-toggle:focus{background-color:#090909}.navbar-default .navbar-toggle .icon-bar{background-color:#ffffff}.navbar-default .navbar-collapse,.navbar-default .navbar-form{border-color:#121212}.navbar-default .navbar-nav>.open>a,.navbar-default .navbar-nav>.open>a:hover,.navbar-default .navbar-nav>.open>a:focus{background-color:#090909;color:#ffffff}@media (max-width:767px){.navbar-default .navbar-nav .open .dropdown-menu>li>a{color:#ffffff}.navbar-default .navbar-nav .open .dropdown-menu>li>a:hover,.navbar-default .navbar-nav .open .dropdown-menu>li>a:focus{color:#ffffff;background-color:#090909}.navbar-default .navbar-nav .open .dropdown-menu>.active>a,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:hover,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:focus{color:#ffffff;background-color:#090909}.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:hover,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:focus{color:#cccccc;background-color:transparent}}.navbar-default .navbar-link{color:#ffffff}.navbar-default .navbar-link:hover{color:#ffffff}.navbar-default .btn-link{color:#ffffff}.navbar-default .btn-link:hover,.navbar-default .btn-link:focus{color:#ffffff}.navbar-default .btn-link[disabled]:hover,fieldset[disabled] .navbar-default .btn-link:hover,.navbar-default .btn-link[disabled]:focus,fieldset[disabled] .navbar-default .btn-link:focus{color:#cccccc}.navbar-inverse{background-color:#2780e3;border-color:#1967be}.navbar-inverse .navbar-brand{color:#ffffff}.navbar-inverse .navbar-brand:hover,.navbar-inverse .navbar-brand:focus{color:#ffffff;background-color:none}.navbar-inverse .navbar-text{color:#ffffff}.navbar-inverse .navbar-nav>li>a{color:#ffffff}.navbar-inverse .navbar-nav>li>a:hover,.navbar-inverse .navbar-nav>li>a:focus{color:#ffffff;background-color:#1967be}.navbar-inverse .navbar-nav>.active>a,.navbar-inverse .navbar-nav>.active>a:hover,.navbar-inverse .navbar-nav>.active>a:focus{color:#ffffff;background-color:#1967be}.navbar-inverse .navbar-nav>.disabled>a,.navbar-inverse .navbar-nav>.disabled>a:hover,.navbar-inverse .navbar-nav>.disabled>a:focus{color:#ffffff;background-color:transparent}.navbar-inverse .navbar-toggle{border-color:transparent}.navbar-inverse .navbar-toggle:hover,.navbar-inverse .navbar-toggle:focus{background-color:#1967be}.navbar-inverse .navbar-toggle .icon-bar{background-color:#ffffff}.navbar-inverse .navbar-collapse,.navbar-inverse .navbar-form{border-color:#1a6ecc}.navbar-inverse .navbar-nav>.open>a,.navbar-inverse .navbar-nav>.open>a:hover,.navbar-inverse .navbar-nav>.open>a:focus{background-color:#1967be;color:#ffffff}@media (max-width:767px){.navbar-inverse .navbar-nav .open .dropdown-menu>.dropdown-header{border-color:#1967be}.navbar-inverse .navbar-nav .open .dropdown-menu .divider{background-color:#1967be}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a{color:#ffffff}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:hover,.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:focus{color:#ffffff;background-color:#1967be}.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:hover,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:focus{color:#ffffff;background-color:#1967be}.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:hover,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:focus{color:#ffffff;background-color:transparent}}.navbar-inverse .navbar-link{color:#ffffff}.navbar-inverse .navbar-link:hover{color:#ffffff}.navbar-inverse .btn-link{color:#ffffff}.navbar-inverse .btn-link:hover,.navbar-inverse .btn-link:focus{color:#ffffff}.navbar-inverse .btn-link[disabled]:hover,fieldset[disabled] .navbar-inverse .btn-link:hover,.navbar-inverse .btn-link[disabled]:focus,fieldset[disabled] .navbar-inverse .btn-link:focus{color:#ffffff}.breadcrumb{padding:8px 15px;margin-bottom:21px;list-style:none;background-color:#f5f5f5;border-radius:0}.breadcrumb>li{display:inline-block}.breadcrumb>li+li:before{content:\"/\\00a0\";padding:0 5px;color:#cccccc}.breadcrumb>.active{color:#999999}.pagination{display:inline-block;padding-left:0;margin:21px 0;border-radius:0}.pagination>li{display:inline}.pagination>li>a,.pagination>li>span{position:relative;float:left;padding:10px 18px;line-height:1.42857143;text-decoration:none;color:#2780e3;background-color:#ffffff;border:1px solid #dddddd;margin-left:-1px}.pagination>li:first-child>a,.pagination>li:first-child>span{margin-left:0;border-bottom-left-radius:0;border-top-left-radius:0}.pagination>li:last-child>a,.pagination>li:last-child>span{border-bottom-right-radius:0;border-top-right-radius:0}.pagination>li>a:hover,.pagination>li>span:hover,.pagination>li>a:focus,.pagination>li>span:focus{color:#165ba8;background-color:#e6e6e6;border-color:#dddddd}.pagination>.active>a,.pagination>.active>span,.pagination>.active>a:hover,.pagination>.active>span:hover,.pagination>.active>a:focus,.pagination>.active>span:focus{z-index:2;color:#999999;background-color:#f5f5f5;border-color:#dddddd;cursor:default}.pagination>.disabled>span,.pagination>.disabled>span:hover,.pagination>.disabled>span:focus,.pagination>.disabled>a,.pagination>.disabled>a:hover,.pagination>.disabled>a:focus{color:#999999;background-color:#ffffff;border-color:#dddddd;cursor:not-allowed}.pagination-lg>li>a,.pagination-lg>li>span{padding:18px 30px;font-size:19px}.pagination-lg>li:first-child>a,.pagination-lg>li:first-child>span{border-bottom-left-radius:0;border-top-left-radius:0}.pagination-lg>li:last-child>a,.pagination-lg>li:last-child>span{border-bottom-right-radius:0;border-top-right-radius:0}.pagination-sm>li>a,.pagination-sm>li>span{padding:5px 10px;font-size:13px}.pagination-sm>li:first-child>a,.pagination-sm>li:first-child>span{border-bottom-left-radius:0;border-top-left-radius:0}.pagination-sm>li:last-child>a,.pagination-sm>li:last-child>span{border-bottom-right-radius:0;border-top-right-radius:0}.pager{padding-left:0;margin:21px 0;list-style:none;text-align:center}.pager li{display:inline}.pager li>a,.pager li>span{display:inline-block;padding:5px 14px;background-color:#ffffff;border:1px solid #dddddd;border-radius:0}.pager li>a:hover,.pager li>a:focus{text-decoration:none;background-color:#e6e6e6}.pager .next>a,.pager .next>span{float:right}.pager .previous>a,.pager .previous>span{float:left}.pager .disabled>a,.pager .disabled>a:hover,.pager .disabled>a:focus,.pager .disabled>span{color:#999999;background-color:#ffffff;cursor:not-allowed}.label{display:inline;padding:.2em .6em .3em;font-size:75%;font-weight:bold;line-height:1;color:#ffffff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em}a.label:hover,a.label:focus{color:#ffffff;text-decoration:none;cursor:pointer}.label:empty{display:none}.btn .label{position:relative;top:-1px}.label-default{background-color:#222222}.label-default[href]:hover,.label-default[href]:focus{background-color:#090909}.label-primary{background-color:#2780e3}.label-primary[href]:hover,.label-primary[href]:focus{background-color:#1967be}.label-success{background-color:#3fb618}.label-success[href]:hover,.label-success[href]:focus{background-color:#2f8912}.label-info{background-color:#9954bb}.label-info[href]:hover,.label-info[href]:focus{background-color:#7e3f9d}.label-warning{background-color:#ff7518}.label-warning[href]:hover,.label-warning[href]:focus{background-color:#e45c00}.label-danger{background-color:#ff0039}.label-danger[href]:hover,.label-danger[href]:focus{background-color:#cc002e}.badge{display:inline-block;min-width:10px;padding:3px 7px;font-size:13px;font-weight:bold;color:#ffffff;line-height:1;vertical-align:baseline;white-space:nowrap;text-align:center;background-color:#2780e3;border-radius:10px}.badge:empty{display:none}.btn .badge{position:relative;top:-1px}.btn-xs .badge{top:0;padding:1px 5px}a.badge:hover,a.badge:focus{color:#ffffff;text-decoration:none;cursor:pointer}a.list-group-item.active>.badge,.nav-pills>.active>a>.badge{color:#2780e3;background-color:#ffffff}.nav-pills>li>a>.badge{margin-left:3px}.jumbotron{padding:30px;margin-bottom:30px;color:inherit;background-color:#e6e6e6}.jumbotron h1,.jumbotron .h1{color:inherit}.jumbotron p{margin-bottom:15px;font-size:23px;font-weight:200}.jumbotron>hr{border-top-color:#cccccc}.container .jumbotron{border-radius:0}.jumbotron .container{max-width:100%}@media screen and (min-width:768px){.jumbotron{padding-top:48px;padding-bottom:48px}.container .jumbotron{padding-left:60px;padding-right:60px}.jumbotron h1,.jumbotron .h1{font-size:67.5px}}.thumbnail{display:block;padding:4px;margin-bottom:21px;line-height:1.42857143;background-color:#ffffff;border:1px solid #dddddd;border-radius:0;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out}.thumbnail>img,.thumbnail a>img{margin-left:auto;margin-right:auto}a.thumbnail:hover,a.thumbnail:focus,a.thumbnail.active{border-color:#2780e3}.thumbnail .caption{padding:9px;color:#333333}.alert{padding:15px;margin-bottom:21px;border:1px solid transparent;border-radius:0}.alert h4{margin-top:0;color:inherit}.alert .alert-link{font-weight:bold}.alert>p,.alert>ul{margin-bottom:0}.alert>p+p{margin-top:5px}.alert-dismissable,.alert-dismissible{padding-right:35px}.alert-dismissable .close,.alert-dismissible .close{position:relative;top:-2px;right:-21px;color:inherit}.alert-success{background-color:#3fb618;border-color:#4e9f15;color:#ffffff}.alert-success hr{border-top-color:#438912}.alert-success .alert-link{color:#e6e6e6}.alert-info{background-color:#9954bb;border-color:#7643a8;color:#ffffff}.alert-info hr{border-top-color:#693c96}.alert-info .alert-link{color:#e6e6e6}.alert-warning{background-color:#ff7518;border-color:#ff4309;color:#ffffff}.alert-warning hr{border-top-color:#ee3800}.alert-warning .alert-link{color:#e6e6e6}.alert-danger{background-color:#ff0039;border-color:#f0005e;color:#ffffff}.alert-danger hr{border-top-color:#d60054}.alert-danger .alert-link{color:#e6e6e6}@-webkit-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}.progress{overflow:hidden;height:21px;margin-bottom:21px;background-color:#cccccc;border-radius:0;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,0.1);box-shadow:inset 0 1px 2px rgba(0,0,0,0.1)}.progress-bar{float:left;width:0%;height:100%;font-size:13px;line-height:21px;color:#ffffff;text-align:center;background-color:#2780e3;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,0.15);box-shadow:inset 0 -1px 0 rgba(0,0,0,0.15);-webkit-transition:width 0.6s ease;-o-transition:width 0.6s ease;transition:width 0.6s ease}.progress-striped .progress-bar,.progress-bar-striped{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-size:40px 40px}.progress.active .progress-bar,.progress-bar.active{-webkit-animation:progress-bar-stripes 2s linear infinite;-o-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}.progress-bar[aria-valuenow=\"1\"],.progress-bar[aria-valuenow=\"2\"]{min-width:30px}.progress-bar[aria-valuenow=\"0\"]{color:#999999;min-width:30px;background-color:transparent;background-image:none;box-shadow:none}.progress-bar-success{background-color:#3fb618}.progress-striped .progress-bar-success{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)}.progress-bar-info{background-color:#9954bb}.progress-striped .progress-bar-info{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)}.progress-bar-warning{background-color:#ff7518}.progress-striped .progress-bar-warning{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)}.progress-bar-danger{background-color:#ff0039}.progress-striped .progress-bar-danger{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)}.media,.media-body{overflow:hidden;zoom:1}.media,.media .media{margin-top:15px}.media:first-child{margin-top:0}.media-object{display:block}.media-heading{margin:0 0 5px}.media>.pull-left{margin-right:10px}.media>.pull-right{margin-left:10px}.media-list{padding-left:0;list-style:none}.list-group{margin-bottom:20px;padding-left:0}.list-group-item{position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#ffffff;border:1px solid #dddddd}.list-group-item:first-child{border-top-right-radius:0;border-top-left-radius:0}.list-group-item:last-child{margin-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.list-group-item>.badge{float:right}.list-group-item>.badge+.badge{margin-right:5px}a.list-group-item{color:#555555}a.list-group-item .list-group-item-heading{color:#333333}a.list-group-item:hover,a.list-group-item:focus{text-decoration:none;color:#555555;background-color:#f5f5f5}.list-group-item.disabled,.list-group-item.disabled:hover,.list-group-item.disabled:focus{background-color:#e6e6e6;color:#999999}.list-group-item.disabled .list-group-item-heading,.list-group-item.disabled:hover .list-group-item-heading,.list-group-item.disabled:focus .list-group-item-heading{color:inherit}.list-group-item.disabled .list-group-item-text,.list-group-item.disabled:hover .list-group-item-text,.list-group-item.disabled:focus .list-group-item-text{color:#999999}.list-group-item.active,.list-group-item.active:hover,.list-group-item.active:focus{z-index:2;color:#ffffff;background-color:#2780e3;border-color:#2780e3}.list-group-item.active .list-group-item-heading,.list-group-item.active:hover .list-group-item-heading,.list-group-item.active:focus .list-group-item-heading,.list-group-item.active .list-group-item-heading>small,.list-group-item.active:hover .list-group-item-heading>small,.list-group-item.active:focus .list-group-item-heading>small,.list-group-item.active .list-group-item-heading>.small,.list-group-item.active:hover .list-group-item-heading>.small,.list-group-item.active:focus .list-group-item-heading>.small{color:inherit}.list-group-item.active .list-group-item-text,.list-group-item.active:hover .list-group-item-text,.list-group-item.active:focus .list-group-item-text{color:#dceafa}.list-group-item-success{color:#ffffff;background-color:#3fb618}a.list-group-item-success{color:#ffffff}a.list-group-item-success .list-group-item-heading{color:inherit}a.list-group-item-success:hover,a.list-group-item-success:focus{color:#ffffff;background-color:#379f15}a.list-group-item-success.active,a.list-group-item-success.active:hover,a.list-group-item-success.active:focus{color:#fff;background-color:#ffffff;border-color:#ffffff}.list-group-item-info{color:#ffffff;background-color:#9954bb}a.list-group-item-info{color:#ffffff}a.list-group-item-info .list-group-item-heading{color:inherit}a.list-group-item-info:hover,a.list-group-item-info:focus{color:#ffffff;background-color:#8d46b0}a.list-group-item-info.active,a.list-group-item-info.active:hover,a.list-group-item-info.active:focus{color:#fff;background-color:#ffffff;border-color:#ffffff}.list-group-item-warning{color:#ffffff;background-color:#ff7518}a.list-group-item-warning{color:#ffffff}a.list-group-item-warning .list-group-item-heading{color:inherit}a.list-group-item-warning:hover,a.list-group-item-warning:focus{color:#ffffff;background-color:#fe6600}a.list-group-item-warning.active,a.list-group-item-warning.active:hover,a.list-group-item-warning.active:focus{color:#fff;background-color:#ffffff;border-color:#ffffff}.list-group-item-danger{color:#ffffff;background-color:#ff0039}a.list-group-item-danger{color:#ffffff}a.list-group-item-danger .list-group-item-heading{color:inherit}a.list-group-item-danger:hover,a.list-group-item-danger:focus{color:#ffffff;background-color:#e60033}a.list-group-item-danger.active,a.list-group-item-danger.active:hover,a.list-group-item-danger.active:focus{color:#fff;background-color:#ffffff;border-color:#ffffff}.list-group-item-heading{margin-top:0;margin-bottom:5px}.list-group-item-text{margin-bottom:0;line-height:1.3}.panel{margin-bottom:21px;background-color:#ffffff;border:1px solid transparent;border-radius:0;-webkit-box-shadow:0 1px 1px rgba(0,0,0,0.05);box-shadow:0 1px 1px rgba(0,0,0,0.05)}.panel-body{padding:15px}.panel-heading{padding:10px 15px;border-bottom:1px solid transparent;border-top-right-radius:-1;border-top-left-radius:-1}.panel-heading>.dropdown .dropdown-toggle{color:inherit}.panel-title{margin-top:0;margin-bottom:0;font-size:17px;color:inherit}.panel-title>a{color:inherit}.panel-footer{padding:10px 15px;background-color:#f5f5f5;border-top:1px solid #dddddd;border-bottom-right-radius:-1;border-bottom-left-radius:-1}.panel>.list-group{margin-bottom:0}.panel>.list-group .list-group-item{border-width:1px 0;border-radius:0}.panel>.list-group:first-child .list-group-item:first-child{border-top:0;border-top-right-radius:-1;border-top-left-radius:-1}.panel>.list-group:last-child .list-group-item:last-child{border-bottom:0;border-bottom-right-radius:-1;border-bottom-left-radius:-1}.panel-heading+.list-group .list-group-item:first-child{border-top-width:0}.list-group+.panel-footer{border-top-width:0}.panel>.table,.panel>.table-responsive>.table,.panel>.panel-collapse>.table{margin-bottom:0}.panel>.table:first-child,.panel>.table-responsive:first-child>.table:first-child{border-top-right-radius:-1;border-top-left-radius:-1}.panel>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table:first-child>thead:first-child>tr:first-child th:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:first-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:first-child{border-top-left-radius:-1}.panel>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table:first-child>thead:first-child>tr:first-child th:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:last-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:last-child{border-top-right-radius:-1}.panel>.table:last-child,.panel>.table-responsive:last-child>.table:last-child{border-bottom-right-radius:-1;border-bottom-left-radius:-1}.panel>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:first-child{border-bottom-left-radius:-1}.panel>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:last-child{border-bottom-right-radius:-1}.panel>.panel-body+.table,.panel>.panel-body+.table-responsive{border-top:1px solid #dddddd}.panel>.table>tbody:first-child>tr:first-child th,.panel>.table>tbody:first-child>tr:first-child td{border-top:0}.panel>.table-bordered,.panel>.table-responsive>.table-bordered{border:0}.panel>.table-bordered>thead>tr>th:first-child,.panel>.table-responsive>.table-bordered>thead>tr>th:first-child,.panel>.table-bordered>tbody>tr>th:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:first-child,.panel>.table-bordered>tfoot>tr>th:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:first-child,.panel>.table-bordered>thead>tr>td:first-child,.panel>.table-responsive>.table-bordered>thead>tr>td:first-child,.panel>.table-bordered>tbody>tr>td:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:first-child,.panel>.table-bordered>tfoot>tr>td:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:first-child{border-left:0}.panel>.table-bordered>thead>tr>th:last-child,.panel>.table-responsive>.table-bordered>thead>tr>th:last-child,.panel>.table-bordered>tbody>tr>th:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:last-child,.panel>.table-bordered>tfoot>tr>th:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:last-child,.panel>.table-bordered>thead>tr>td:last-child,.panel>.table-responsive>.table-bordered>thead>tr>td:last-child,.panel>.table-bordered>tbody>tr>td:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:last-child,.panel>.table-bordered>tfoot>tr>td:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:last-child{border-right:0}.panel>.table-bordered>thead>tr:first-child>td,.panel>.table-responsive>.table-bordered>thead>tr:first-child>td,.panel>.table-bordered>tbody>tr:first-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>td,.panel>.table-bordered>thead>tr:first-child>th,.panel>.table-responsive>.table-bordered>thead>tr:first-child>th,.panel>.table-bordered>tbody>tr:first-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>th{border-bottom:0}.panel>.table-bordered>tbody>tr:last-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>td,.panel>.table-bordered>tfoot>tr:last-child>td,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>td,.panel>.table-bordered>tbody>tr:last-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>th,.panel>.table-bordered>tfoot>tr:last-child>th,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>th{border-bottom:0}.panel>.table-responsive{border:0;margin-bottom:0}.panel-group{margin-bottom:21px}.panel-group .panel{margin-bottom:0;border-radius:0}.panel-group .panel+.panel{margin-top:5px}.panel-group .panel-heading{border-bottom:0}.panel-group .panel-heading+.panel-collapse>.panel-body{border-top:1px solid #dddddd}.panel-group .panel-footer{border-top:0}.panel-group .panel-footer+.panel-collapse .panel-body{border-bottom:1px solid #dddddd}.panel-default{border-color:#dddddd}.panel-default>.panel-heading{color:#333333;background-color:#f5f5f5;border-color:#dddddd}.panel-default>.panel-heading+.panel-collapse>.panel-body{border-top-color:#dddddd}.panel-default>.panel-heading .badge{color:#f5f5f5;background-color:#333333}.panel-default>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#dddddd}.panel-primary{border-color:#2780e3}.panel-primary>.panel-heading{color:#ffffff;background-color:#2780e3;border-color:#2780e3}.panel-primary>.panel-heading+.panel-collapse>.panel-body{border-top-color:#2780e3}.panel-primary>.panel-heading .badge{color:#2780e3;background-color:#ffffff}.panel-primary>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#2780e3}.panel-success{border-color:#4e9f15}.panel-success>.panel-heading{color:#ffffff;background-color:#3fb618;border-color:#4e9f15}.panel-success>.panel-heading+.panel-collapse>.panel-body{border-top-color:#4e9f15}.panel-success>.panel-heading .badge{color:#3fb618;background-color:#ffffff}.panel-success>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#4e9f15}.panel-info{border-color:#7643a8}.panel-info>.panel-heading{color:#ffffff;background-color:#9954bb;border-color:#7643a8}.panel-info>.panel-heading+.panel-collapse>.panel-body{border-top-color:#7643a8}.panel-info>.panel-heading .badge{color:#9954bb;background-color:#ffffff}.panel-info>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#7643a8}.panel-warning{border-color:#ff4309}.panel-warning>.panel-heading{color:#ffffff;background-color:#ff7518;border-color:#ff4309}.panel-warning>.panel-heading+.panel-collapse>.panel-body{border-top-color:#ff4309}.panel-warning>.panel-heading .badge{color:#ff7518;background-color:#ffffff}.panel-warning>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#ff4309}.panel-danger{border-color:#f0005e}.panel-danger>.panel-heading{color:#ffffff;background-color:#ff0039;border-color:#f0005e}.panel-danger>.panel-heading+.panel-collapse>.panel-body{border-top-color:#f0005e}.panel-danger>.panel-heading .badge{color:#ff0039;background-color:#ffffff}.panel-danger>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#f0005e}.embed-responsive{position:relative;display:block;height:0;padding:0;overflow:hidden}.embed-responsive .embed-responsive-item,.embed-responsive iframe,.embed-responsive embed,.embed-responsive object{position:absolute;top:0;left:0;bottom:0;height:100%;width:100%;border:0}.embed-responsive.embed-responsive-16by9{padding-bottom:56.25%}.embed-responsive.embed-responsive-4by3{padding-bottom:75%}.well{min-height:20px;padding:19px;margin-bottom:20px;background-color:#f5f5f5;border:1px solid #e3e3e3;border-radius:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.05);box-shadow:inset 0 1px 1px rgba(0,0,0,0.05)}.well blockquote{border-color:#ddd;border-color:rgba(0,0,0,0.15)}.well-lg{padding:24px;border-radius:0}.well-sm{padding:9px;border-radius:0}.close{float:right;font-size:22.5px;font-weight:bold;line-height:1;color:#ffffff;text-shadow:0 1px 0 #ffffff;opacity:0.2;filter:alpha(opacity=20)}.close:hover,.close:focus{color:#ffffff;text-decoration:none;cursor:pointer;opacity:0.5;filter:alpha(opacity=50)}button.close{padding:0;cursor:pointer;background:transparent;border:0;-webkit-appearance:none}.modal-open{overflow:hidden}.modal{display:none;overflow:hidden;position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;-webkit-overflow-scrolling:touch;outline:0}.modal.fade .modal-dialog{-webkit-transform:translate3d(0, -25%, 0);transform:translate3d(0, -25%, 0);-webkit-transition:-webkit-transform .3s ease-out;-moz-transition:-moz-transform .3s ease-out;-o-transition:-o-transform .3s ease-out;transition:transform .3s ease-out}.modal.in .modal-dialog{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}.modal-open .modal{overflow-x:hidden;overflow-y:auto}.modal-dialog{position:relative;width:auto;margin:10px}.modal-content{position:relative;background-color:#ffffff;border:1px solid #999999;border:1px solid transparent;border-radius:0;-webkit-box-shadow:0 3px 9px rgba(0,0,0,0.5);box-shadow:0 3px 9px rgba(0,0,0,0.5);background-clip:padding-box;outline:0}.modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:#000000}.modal-backdrop.fade{opacity:0;filter:alpha(opacity=0)}.modal-backdrop.in{opacity:0.5;filter:alpha(opacity=50)}.modal-header{padding:15px;border-bottom:1px solid #e5e5e5;min-height:16.42857143px}.modal-header .close{margin-top:-2px}.modal-title{margin:0;line-height:1.42857143}.modal-body{position:relative;padding:20px}.modal-footer{padding:20px;text-align:right;border-top:1px solid #e5e5e5}.modal-footer .btn+.btn{margin-left:5px;margin-bottom:0}.modal-footer .btn-group .btn+.btn{margin-left:-1px}.modal-footer .btn-block+.btn-block{margin-left:0}.modal-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}@media (min-width:768px){.modal-dialog{width:600px;margin:30px auto}.modal-content{-webkit-box-shadow:0 5px 15px rgba(0,0,0,0.5);box-shadow:0 5px 15px rgba(0,0,0,0.5)}.modal-sm{width:300px}}@media (min-width:992px){.modal-lg{width:900px}}.tooltip{position:absolute;z-index:1070;display:block;visibility:visible;font-size:13px;line-height:1.4;opacity:0;filter:alpha(opacity=0)}.tooltip.in{opacity:0.9;filter:alpha(opacity=90)}.tooltip.top{margin-top:-3px;padding:5px 0}.tooltip.right{margin-left:3px;padding:0 5px}.tooltip.bottom{margin-top:3px;padding:5px 0}.tooltip.left{margin-left:-3px;padding:0 5px}.tooltip-inner{max-width:200px;padding:3px 8px;color:#ffffff;text-align:center;text-decoration:none;background-color:rgba(0,0,0,0.9);border-radius:0}.tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.tooltip.top .tooltip-arrow{bottom:0;left:50%;margin-left:-5px;border-width:5px 5px 0;border-top-color:rgba(0,0,0,0.9)}.tooltip.top-left .tooltip-arrow{bottom:0;left:5px;border-width:5px 5px 0;border-top-color:rgba(0,0,0,0.9)}.tooltip.top-right .tooltip-arrow{bottom:0;right:5px;border-width:5px 5px 0;border-top-color:rgba(0,0,0,0.9)}.tooltip.right .tooltip-arrow{top:50%;left:0;margin-top:-5px;border-width:5px 5px 5px 0;border-right-color:rgba(0,0,0,0.9)}.tooltip.left .tooltip-arrow{top:50%;right:0;margin-top:-5px;border-width:5px 0 5px 5px;border-left-color:rgba(0,0,0,0.9)}.tooltip.bottom .tooltip-arrow{top:0;left:50%;margin-left:-5px;border-width:0 5px 5px;border-bottom-color:rgba(0,0,0,0.9)}.tooltip.bottom-left .tooltip-arrow{top:0;left:5px;border-width:0 5px 5px;border-bottom-color:rgba(0,0,0,0.9)}.tooltip.bottom-right .tooltip-arrow{top:0;right:5px;border-width:0 5px 5px;border-bottom-color:rgba(0,0,0,0.9)}.popover{position:absolute;top:0;left:0;z-index:1060;display:none;max-width:276px;padding:1px;text-align:left;background-color:#ffffff;background-clip:padding-box;border:1px solid #cccccc;border:1px solid rgba(0,0,0,0.2);border-radius:0;-webkit-box-shadow:0 5px 10px rgba(0,0,0,0.2);box-shadow:0 5px 10px rgba(0,0,0,0.2);white-space:normal}.popover.top{margin-top:-10px}.popover.right{margin-left:10px}.popover.bottom{margin-top:10px}.popover.left{margin-left:-10px}.popover-title{margin:0;padding:8px 14px;font-size:15px;font-weight:normal;line-height:18px;background-color:#f7f7f7;border-bottom:1px solid #ebebeb;border-radius:-1 -1 0 0}.popover-content{padding:9px 14px}.popover>.arrow,.popover>.arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.popover>.arrow{border-width:11px}.popover>.arrow:after{border-width:10px;content:\"\"}.popover.top>.arrow{left:50%;margin-left:-11px;border-bottom-width:0;border-top-color:#999999;border-top-color:rgba(0,0,0,0.25);bottom:-11px}.popover.top>.arrow:after{content:\" \";bottom:1px;margin-left:-10px;border-bottom-width:0;border-top-color:#ffffff}.popover.right>.arrow{top:50%;left:-11px;margin-top:-11px;border-left-width:0;border-right-color:#999999;border-right-color:rgba(0,0,0,0.25)}.popover.right>.arrow:after{content:\" \";left:1px;bottom:-10px;border-left-width:0;border-right-color:#ffffff}.popover.bottom>.arrow{left:50%;margin-left:-11px;border-top-width:0;border-bottom-color:#999999;border-bottom-color:rgba(0,0,0,0.25);top:-11px}.popover.bottom>.arrow:after{content:\" \";top:1px;margin-left:-10px;border-top-width:0;border-bottom-color:#ffffff}.popover.left>.arrow{top:50%;right:-11px;margin-top:-11px;border-right-width:0;border-left-color:#999999;border-left-color:rgba(0,0,0,0.25)}.popover.left>.arrow:after{content:\" \";right:1px;border-right-width:0;border-left-color:#ffffff;bottom:-10px}.carousel{position:relative}.carousel-inner{position:relative;overflow:hidden;width:100%}.carousel-inner>.item{display:none;position:relative;-webkit-transition:.6s ease-in-out left;-o-transition:.6s ease-in-out left;transition:.6s ease-in-out left}.carousel-inner>.item>img,.carousel-inner>.item>a>img{line-height:1}.carousel-inner>.active,.carousel-inner>.next,.carousel-inner>.prev{display:block}.carousel-inner>.active{left:0}.carousel-inner>.next,.carousel-inner>.prev{position:absolute;top:0;width:100%}.carousel-inner>.next{left:100%}.carousel-inner>.prev{left:-100%}.carousel-inner>.next.left,.carousel-inner>.prev.right{left:0}.carousel-inner>.active.left{left:-100%}.carousel-inner>.active.right{left:100%}.carousel-control{position:absolute;top:0;left:0;bottom:0;width:15%;opacity:0.5;filter:alpha(opacity=50);font-size:20px;color:#ffffff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,0.6)}.carousel-control.left{background-image:-webkit-linear-gradient(left, rgba(0,0,0,0.5) 0, rgba(0,0,0,0.0001) 100%);background-image:-o-linear-gradient(left, rgba(0,0,0,0.5) 0, rgba(0,0,0,0.0001) 100%);background-image:linear-gradient(to right, rgba(0,0,0,0.5) 0, rgba(0,0,0,0.0001) 100%);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1)}.carousel-control.right{left:auto;right:0;background-image:-webkit-linear-gradient(left, rgba(0,0,0,0.0001) 0, rgba(0,0,0,0.5) 100%);background-image:-o-linear-gradient(left, rgba(0,0,0,0.0001) 0, rgba(0,0,0,0.5) 100%);background-image:linear-gradient(to right, rgba(0,0,0,0.0001) 0, rgba(0,0,0,0.5) 100%);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1)}.carousel-control:hover,.carousel-control:focus{outline:0;color:#ffffff;text-decoration:none;opacity:0.9;filter:alpha(opacity=90)}.carousel-control .icon-prev,.carousel-control .icon-next,.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right{position:absolute;top:50%;z-index:5;display:inline-block}.carousel-control .icon-prev,.carousel-control .glyphicon-chevron-left{left:50%;margin-left:-10px}.carousel-control .icon-next,.carousel-control .glyphicon-chevron-right{right:50%;margin-right:-10px}.carousel-control .icon-prev,.carousel-control .icon-next{width:20px;height:20px;margin-top:-10px;font-family:serif}.carousel-control .icon-prev:before{content:'\\2039'}.carousel-control .icon-next:before{content:'\\203a'}.carousel-indicators{position:absolute;bottom:10px;left:50%;z-index:15;width:60%;margin-left:-30%;padding-left:0;list-style:none;text-align:center}.carousel-indicators li{display:inline-block;width:10px;height:10px;margin:1px;text-indent:-999px;border:1px solid #ffffff;border-radius:10px;cursor:pointer;background-color:#000 \\9;background-color:rgba(0,0,0,0)}.carousel-indicators .active{margin:0;width:12px;height:12px;background-color:#ffffff}.carousel-caption{position:absolute;left:15%;right:15%;bottom:20px;z-index:10;padding-top:20px;padding-bottom:20px;color:#ffffff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,0.6)}.carousel-caption .btn{text-shadow:none}@media screen and (min-width:768px){.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right,.carousel-control .icon-prev,.carousel-control .icon-next{width:30px;height:30px;margin-top:-15px;font-size:30px}.carousel-control .glyphicon-chevron-left,.carousel-control .icon-prev{margin-left:-15px}.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next{margin-right:-15px}.carousel-caption{left:20%;right:20%;padding-bottom:30px}.carousel-indicators{bottom:20px}}.clearfix:before,.clearfix:after,.dl-horizontal dd:before,.dl-horizontal dd:after,.container:before,.container:after,.container-fluid:before,.container-fluid:after,.row:before,.row:after,.form-horizontal .form-group:before,.form-horizontal .form-group:after,.btn-toolbar:before,.btn-toolbar:after,.btn-group-vertical>.btn-group:before,.btn-group-vertical>.btn-group:after,.nav:before,.nav:after,.navbar:before,.navbar:after,.navbar-header:before,.navbar-header:after,.navbar-collapse:before,.navbar-collapse:after,.pager:before,.pager:after,.panel-body:before,.panel-body:after,.modal-footer:before,.modal-footer:after{content:\" \";display:table}.clearfix:after,.dl-horizontal dd:after,.container:after,.container-fluid:after,.row:after,.form-horizontal .form-group:after,.btn-toolbar:after,.btn-group-vertical>.btn-group:after,.nav:after,.navbar:after,.navbar-header:after,.navbar-collapse:after,.pager:after,.panel-body:after,.modal-footer:after{clear:both}.center-block{display:block;margin-left:auto;margin-right:auto}.pull-right{float:right !important}.pull-left{float:left !important}.hide{display:none !important}.show{display:block !important}.invisible{visibility:hidden}.text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.hidden{display:none !important;visibility:hidden !important}.affix{position:fixed;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}@-ms-viewport{width:device-width}.visible-xs,.visible-sm,.visible-md,.visible-lg{display:none !important}.visible-xs-block,.visible-xs-inline,.visible-xs-inline-block,.visible-sm-block,.visible-sm-inline,.visible-sm-inline-block,.visible-md-block,.visible-md-inline,.visible-md-inline-block,.visible-lg-block,.visible-lg-inline,.visible-lg-inline-block{display:none !important}@media (max-width:767px){.visible-xs{display:block !important}table.visible-xs{display:table}tr.visible-xs{display:table-row !important}th.visible-xs,td.visible-xs{display:table-cell !important}}@media (max-width:767px){.visible-xs-block{display:block !important}}@media (max-width:767px){.visible-xs-inline{display:inline !important}}@media (max-width:767px){.visible-xs-inline-block{display:inline-block !important}}@media (min-width:768px) and (max-width:991px){.visible-sm{display:block !important}table.visible-sm{display:table}tr.visible-sm{display:table-row !important}th.visible-sm,td.visible-sm{display:table-cell !important}}@media (min-width:768px) and (max-width:991px){.visible-sm-block{display:block !important}}@media (min-width:768px) and (max-width:991px){.visible-sm-inline{display:inline !important}}@media (min-width:768px) and (max-width:991px){.visible-sm-inline-block{display:inline-block !important}}@media (min-width:992px) and (max-width:1199px){.visible-md{display:block !important}table.visible-md{display:table}tr.visible-md{display:table-row !important}th.visible-md,td.visible-md{display:table-cell !important}}@media (min-width:992px) and (max-width:1199px){.visible-md-block{display:block !important}}@media (min-width:992px) and (max-width:1199px){.visible-md-inline{display:inline !important}}@media (min-width:992px) and (max-width:1199px){.visible-md-inline-block{display:inline-block !important}}@media (min-width:1200px){.visible-lg{display:block !important}table.visible-lg{display:table}tr.visible-lg{display:table-row !important}th.visible-lg,td.visible-lg{display:table-cell !important}}@media (min-width:1200px){.visible-lg-block{display:block !important}}@media (min-width:1200px){.visible-lg-inline{display:inline !important}}@media (min-width:1200px){.visible-lg-inline-block{display:inline-block !important}}@media (max-width:767px){.hidden-xs{display:none !important}}@media (min-width:768px) and (max-width:991px){.hidden-sm{display:none !important}}@media (min-width:992px) and (max-width:1199px){.hidden-md{display:none !important}}@media (min-width:1200px){.hidden-lg{display:none !important}}.visible-print{display:none !important}@media print{.visible-print{display:block !important}table.visible-print{display:table}tr.visible-print{display:table-row !important}th.visible-print,td.visible-print{display:table-cell !important}}.visible-print-block{display:none !important}@media print{.visible-print-block{display:block !important}}.visible-print-inline{display:none !important}@media print{.visible-print-inline{display:inline !important}}.visible-print-inline-block{display:none !important}@media print{.visible-print-inline-block{display:inline-block !important}}@media print{.hidden-print{display:none !important}}.navbar-inverse .badge{background-color:#fff;color:#2780e3}body{-webkit-font-smoothing:antialiased}.text-primary,.text-primary:hover{color:#2780e3}.text-success,.text-success:hover{color:#3fb618}.text-danger,.text-danger:hover{color:#ff0039}.text-warning,.text-warning:hover{color:#ff7518}.text-info,.text-info:hover{color:#9954bb}table a:not(.btn),.table a:not(.btn){text-decoration:underline}table .success,.table .success,table .warning,.table .warning,table .danger,.table .danger,table .info,.table .info{color:#fff}table .success a,.table .success a,table .warning a,.table .warning a,table .danger a,.table .danger a,table .info a,.table .info a{color:#fff}.has-warning .help-block,.has-warning .control-label,.has-warning .form-control-feedback{color:#ff7518}.has-warning .form-control,.has-warning .form-control:focus,.has-warning .input-group-addon{border:1px solid #ff7518}.has-error .help-block,.has-error .control-label,.has-error .form-control-feedback{color:#ff0039}.has-error .form-control,.has-error .form-control:focus,.has-error .input-group-addon{border:1px solid #ff0039}.has-success .help-block,.has-success .control-label,.has-success .form-control-feedback{color:#3fb618}.has-success .form-control,.has-success .form-control:focus,.has-success .input-group-addon{border:1px solid #3fb618}.nav-pills>li>a{border-radius:0}.dropdown-menu>li>a:hover,.dropdown-menu>li>a:focus{background-image:none}.close{text-decoration:none;text-shadow:none;opacity:0.4}.close:hover,.close:focus{opacity:1}.alert{border:none}.alert .alert-link{text-decoration:underline;color:#fff}.label{border-radius:0}.progress{height:8px;-webkit-box-shadow:none;box-shadow:none}.progress .progress-bar{font-size:8px;line-height:8px}.panel-heading,.panel-footer{border-top-right-radius:0;border-top-left-radius:0}.panel-default .close{color:#333333}.modal .close{color:#333333}.popover{color:#333333}";

/***/ },
/* 5 */
/*!************************!*\
  !*** ./css/styles.css ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(/*! ../~/style-loader/addStyle.js */ 25)
		// The css code:
		(__webpack_require__(/*! !../~/css-loader!./css/styles.css */ 6));
	// Hot Module Replacement
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 6 */
/*!****************************************!*\
  !*** ../~/css-loader!./css/styles.css ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		"body, div {\n  font-family: \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif;\n  font-weight: bold;\n  /* prevent text selection */\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.back {\n  background: black;\n}\n\n.title {\n  text-align: center;\n  font-size: 18px;\n  line-height: 40px;\n  color: white;\n}\n\n.panel {\n  background-color: rgba(34, 34, 34, 0.7);\n}\n\n.layout-list-item {\n  padding-left: 10px;\n  line-height: 50px;\n  cursor: pointer;\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.layout-list-item.selected {\n  color: white;\n  background-color: rgba(255, 255, 255, 0.2);\n}\n\n.layout-detail-item-title {\n  color: #BBBBBB;\n  font-size: 13px;\n  text-align: center;\n}\n\n.layout-detail-item-input {\n  border: none;\n  color: white;\n  background: rgba(0, 0, 0, 0);\n  text-align: center;\n}\n\n";

/***/ },
/* 7 */
/*!********************!*\
  !*** ./index.html ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html"

/***/ },
/* 8 */
/*!***********************************!*\
  !*** ../~/famous/core/famous.css ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(/*! ../~/style-loader/addStyle.js */ 25)
		// The css code:
		(__webpack_require__(/*! !../~/css-loader!../~/famous/core/famous.css */ 9));
	// Hot Module Replacement
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 9 */
/*!***************************************************!*\
  !*** ../~/css-loader!../~/famous/core/famous.css ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		"/* This Source Code Form is subject to the terms of the Mozilla Public\n * License, v. 2.0. If a copy of the MPL was not distributed with this\n * file, You can obtain one at http://mozilla.org/MPL/2.0/.\n *\n * Owner: mark@famo.us\n * @license MPL 2.0\n * @copyright Famous Industries, Inc. 2015\n */\n\n.famous-root {\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    opacity: .999999; /* ios8 hotfix */\n    overflow: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\n.famous-container, .famous-group {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    bottom: 0px;\n    right: 0px;\n    overflow: visible;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-backface-visibility: visible;\n    backface-visibility: visible;\n    pointer-events: none;\n}\n\n.famous-group {\n    width: 0px;\n    height: 0px;\n    margin: 0px;\n    padding: 0px;\n}\n\n.famous-surface {\n    position: absolute;\n    -webkit-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    -webkit-tap-highlight-color: transparent;\n    pointer-events: auto;\n}\n\n.famous-container-group {\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n";

/***/ },
/* 10 */
/*!**********************************!*\
  !*** ../~/famous/core/Engine.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Context = __webpack_require__(/*! ./Context */ 29);
	var EventHandler = __webpack_require__(/*! ./EventHandler */ 30);
	var OptionsManager = __webpack_require__(/*! ./OptionsManager */ 31);
	var Engine = {};
	var contexts = [];
	var nextTickQueue = [];
	var currentFrame = 0;
	var nextTickFrame = 0;
	var deferQueue = [];
	var lastTime = Date.now();
	var frameTime;
	var frameTimeLimit;
	var loopEnabled = true;
	var eventForwarders = {};
	var eventHandler = new EventHandler();
	var options = {
	    containerType: 'div',
	    containerClass: 'famous-container',
	    fpsCap: undefined,
	    runLoop: true,
	    appMode: true
	};
	var optionsManager = new OptionsManager(options);
	var MAX_DEFER_FRAME_TIME = 10;
	Engine.step = function step() {
	    currentFrame++;
	    nextTickFrame = currentFrame;
	    var currentTime = Date.now();
	    if (frameTimeLimit && currentTime - lastTime < frameTimeLimit)
	        return;
	    var i = 0;
	    frameTime = currentTime - lastTime;
	    lastTime = currentTime;
	    eventHandler.emit('prerender');
	    var numFunctions = nextTickQueue.length;
	    while (numFunctions--)
	        nextTickQueue.shift()(currentFrame);
	    while (deferQueue.length && Date.now() - currentTime < MAX_DEFER_FRAME_TIME) {
	        deferQueue.shift().call(this);
	    }
	    for (i = 0; i < contexts.length; i++)
	        contexts[i].update();
	    eventHandler.emit('postrender');
	};
	function loop() {
	    if (options.runLoop) {
	        Engine.step();
	        window.requestAnimationFrame(loop);
	    } else
	        loopEnabled = false;
	}
	window.requestAnimationFrame(loop);
	function handleResize(event) {
	    for (var i = 0; i < contexts.length; i++) {
	        contexts[i].emit('resize');
	    }
	    eventHandler.emit('resize');
	}
	window.addEventListener('resize', handleResize, false);
	handleResize();
	function initialize() {
	    window.addEventListener('touchmove', function (event) {
	        event.preventDefault();
	    }, true);
	    addRootClasses();
	}
	var initialized = false;
	function addRootClasses() {
	    if (!document.body) {
	        Engine.nextTick(addRootClasses);
	        return;
	    }
	    document.body.classList.add('famous-root');
	    document.documentElement.classList.add('famous-root');
	}
	Engine.pipe = function pipe(target) {
	    if (target.subscribe instanceof Function)
	        return target.subscribe(Engine);
	    else
	        return eventHandler.pipe(target);
	};
	Engine.unpipe = function unpipe(target) {
	    if (target.unsubscribe instanceof Function)
	        return target.unsubscribe(Engine);
	    else
	        return eventHandler.unpipe(target);
	};
	Engine.on = function on(type, handler) {
	    if (!(type in eventForwarders)) {
	        eventForwarders[type] = eventHandler.emit.bind(eventHandler, type);
	        addEngineListener(type, eventForwarders[type]);
	    }
	    return eventHandler.on(type, handler);
	};
	function addEngineListener(type, forwarder) {
	    if (!document.body) {
	        Engine.nextTick(addEventListener.bind(this, type, forwarder));
	        return;
	    }
	    document.body.addEventListener(type, forwarder);
	}
	Engine.emit = function emit(type, event) {
	    return eventHandler.emit(type, event);
	};
	Engine.removeListener = function removeListener(type, handler) {
	    return eventHandler.removeListener(type, handler);
	};
	Engine.getFPS = function getFPS() {
	    return 1000 / frameTime;
	};
	Engine.setFPSCap = function setFPSCap(fps) {
	    frameTimeLimit = Math.floor(1000 / fps);
	};
	Engine.getOptions = function getOptions(key) {
	    return optionsManager.getOptions(key);
	};
	Engine.setOptions = function setOptions(options) {
	    return optionsManager.setOptions.apply(optionsManager, arguments);
	};
	Engine.createContext = function createContext(el) {
	    if (!initialized && options.appMode)
	        Engine.nextTick(initialize);
	    var needMountContainer = false;
	    if (!el) {
	        el = document.createElement(options.containerType);
	        el.classList.add(options.containerClass);
	        needMountContainer = true;
	    }
	    var context = new Context(el);
	    Engine.registerContext(context);
	    if (needMountContainer)
	        mount(context, el);
	    return context;
	};
	function mount(context, el) {
	    if (!document.body) {
	        Engine.nextTick(mount.bind(this, context, el));
	        return;
	    }
	    document.body.appendChild(el);
	    context.emit('resize');
	}
	Engine.registerContext = function registerContext(context) {
	    contexts.push(context);
	    return context;
	};
	Engine.getContexts = function getContexts() {
	    return contexts;
	};
	Engine.deregisterContext = function deregisterContext(context) {
	    var i = contexts.indexOf(context);
	    if (i >= 0)
	        contexts.splice(i, 1);
	};
	Engine.nextTick = function nextTick(fn) {
	    nextTickQueue.push(fn);
	};
	Engine.defer = function defer(fn) {
	    deferQueue.push(fn);
	};
	optionsManager.on('change', function (data) {
	    if (data.id === 'fpsCap')
	        Engine.setFPSCap(data.value);
	    else if (data.id === 'runLoop') {
	        if (!loopEnabled && data.value) {
	            loopEnabled = true;
	            window.requestAnimationFrame(loop);
	        }
	    }
	});
	module.exports = Engine;

/***/ },
/* 11 */
/*!***********************************!*\
  !*** ../~/famous/core/Surface.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var ElementOutput = __webpack_require__(/*! ./ElementOutput */ 32);
	function Surface(options) {
	    ElementOutput.call(this);
	    this.options = {};
	    this.properties = {};
	    this.attributes = {};
	    this.content = '';
	    this.classList = [];
	    this.size = null;
	    this._classesDirty = true;
	    this._stylesDirty = true;
	    this._attributesDirty = true;
	    this._sizeDirty = true;
	    this._contentDirty = true;
	    this._trueSizeCheck = true;
	    this._dirtyClasses = [];
	    if (options)
	        this.setOptions(options);
	    this._currentTarget = null;
	}
	Surface.prototype = Object.create(ElementOutput.prototype);
	Surface.prototype.constructor = Surface;
	Surface.prototype.elementType = 'div';
	Surface.prototype.elementClass = 'famous-surface';
	Surface.prototype.setAttributes = function setAttributes(attributes) {
	    for (var n in attributes) {
	        if (n === 'style')
	            throw new Error('Cannot set styles via "setAttributes" as it will break Famo.us.  Use "setProperties" instead.');
	        this.attributes[n] = attributes[n];
	    }
	    this._attributesDirty = true;
	};
	Surface.prototype.getAttributes = function getAttributes() {
	    return this.attributes;
	};
	Surface.prototype.setProperties = function setProperties(properties) {
	    for (var n in properties) {
	        this.properties[n] = properties[n];
	    }
	    this._stylesDirty = true;
	    return this;
	};
	Surface.prototype.getProperties = function getProperties() {
	    return this.properties;
	};
	Surface.prototype.addClass = function addClass(className) {
	    if (this.classList.indexOf(className) < 0) {
	        this.classList.push(className);
	        this._classesDirty = true;
	    }
	    return this;
	};
	Surface.prototype.removeClass = function removeClass(className) {
	    var i = this.classList.indexOf(className);
	    if (i >= 0) {
	        this._dirtyClasses.push(this.classList.splice(i, 1)[0]);
	        this._classesDirty = true;
	    }
	    return this;
	};
	Surface.prototype.toggleClass = function toggleClass(className) {
	    var i = this.classList.indexOf(className);
	    if (i >= 0) {
	        this.removeClass(className);
	    } else {
	        this.addClass(className);
	    }
	    return this;
	};
	Surface.prototype.setClasses = function setClasses(classList) {
	    var i = 0;
	    var removal = [];
	    for (i = 0; i < this.classList.length; i++) {
	        if (classList.indexOf(this.classList[i]) < 0)
	            removal.push(this.classList[i]);
	    }
	    for (i = 0; i < removal.length; i++)
	        this.removeClass(removal[i]);
	    for (i = 0; i < classList.length; i++)
	        this.addClass(classList[i]);
	    return this;
	};
	Surface.prototype.getClassList = function getClassList() {
	    return this.classList;
	};
	Surface.prototype.setContent = function setContent(content) {
	    if (this.content !== content) {
	        this.content = content;
	        this._contentDirty = true;
	    }
	    return this;
	};
	Surface.prototype.getContent = function getContent() {
	    return this.content;
	};
	Surface.prototype.setOptions = function setOptions(options) {
	    if (options.size)
	        this.setSize(options.size);
	    if (options.classes)
	        this.setClasses(options.classes);
	    if (options.properties)
	        this.setProperties(options.properties);
	    if (options.attributes)
	        this.setAttributes(options.attributes);
	    if (options.content)
	        this.setContent(options.content);
	    return this;
	};
	function _cleanupClasses(target) {
	    for (var i = 0; i < this._dirtyClasses.length; i++)
	        target.classList.remove(this._dirtyClasses[i]);
	    this._dirtyClasses = [];
	}
	function _applyStyles(target) {
	    for (var n in this.properties) {
	        target.style[n] = this.properties[n];
	    }
	}
	function _cleanupStyles(target) {
	    for (var n in this.properties) {
	        target.style[n] = '';
	    }
	}
	function _applyAttributes(target) {
	    for (var n in this.attributes) {
	        target.setAttribute(n, this.attributes[n]);
	    }
	}
	function _cleanupAttributes(target) {
	    for (var n in this.attributes) {
	        target.removeAttribute(n);
	    }
	}
	function _xyNotEquals(a, b) {
	    return a && b ? a[0] !== b[0] || a[1] !== b[1] : a !== b;
	}
	Surface.prototype.setup = function setup(allocator) {
	    var target = allocator.allocate(this.elementType);
	    if (this.elementClass) {
	        if (this.elementClass instanceof Array) {
	            for (var i = 0; i < this.elementClass.length; i++) {
	                target.classList.add(this.elementClass[i]);
	            }
	        } else {
	            target.classList.add(this.elementClass);
	        }
	    }
	    target.style.display = '';
	    this.attach(target);
	    this._opacity = null;
	    this._currentTarget = target;
	    this._stylesDirty = true;
	    this._classesDirty = true;
	    this._attributesDirty = true;
	    this._sizeDirty = true;
	    this._contentDirty = true;
	    this._originDirty = true;
	    this._transformDirty = true;
	};
	Surface.prototype.commit = function commit(context) {
	    if (!this._currentTarget)
	        this.setup(context.allocator);
	    var target = this._currentTarget;
	    var size = context.size;
	    if (this._classesDirty) {
	        _cleanupClasses.call(this, target);
	        var classList = this.getClassList();
	        for (var i = 0; i < classList.length; i++)
	            target.classList.add(classList[i]);
	        this._classesDirty = false;
	        this._trueSizeCheck = true;
	    }
	    if (this._stylesDirty) {
	        _applyStyles.call(this, target);
	        this._stylesDirty = false;
	        this._trueSizeCheck = true;
	    }
	    if (this._attributesDirty) {
	        _applyAttributes.call(this, target);
	        this._attributesDirty = false;
	        this._trueSizeCheck = true;
	    }
	    if (this.size) {
	        var origSize = context.size;
	        size = [
	            this.size[0],
	            this.size[1]
	        ];
	        if (size[0] === undefined)
	            size[0] = origSize[0];
	        if (size[1] === undefined)
	            size[1] = origSize[1];
	        if (size[0] === true || size[1] === true) {
	            if (size[0] === true) {
	                if (this._trueSizeCheck || this._size[0] === 0) {
	                    var width = target.offsetWidth;
	                    if (this._size && this._size[0] !== width) {
	                        this._size[0] = width;
	                        this._sizeDirty = true;
	                    }
	                    size[0] = width;
	                } else {
	                    if (this._size)
	                        size[0] = this._size[0];
	                }
	            }
	            if (size[1] === true) {
	                if (this._trueSizeCheck || this._size[1] === 0) {
	                    var height = target.offsetHeight;
	                    if (this._size && this._size[1] !== height) {
	                        this._size[1] = height;
	                        this._sizeDirty = true;
	                    }
	                    size[1] = height;
	                } else {
	                    if (this._size)
	                        size[1] = this._size[1];
	                }
	            }
	            this._trueSizeCheck = false;
	        }
	    }
	    if (_xyNotEquals(this._size, size)) {
	        if (!this._size)
	            this._size = [
	                0,
	                0
	            ];
	        this._size[0] = size[0];
	        this._size[1] = size[1];
	        this._sizeDirty = true;
	    }
	    if (this._sizeDirty) {
	        if (this._size) {
	            target.style.width = this.size && this.size[0] === true ? '' : this._size[0] + 'px';
	            target.style.height = this.size && this.size[1] === true ? '' : this._size[1] + 'px';
	        }
	        this._eventOutput.emit('resize');
	    }
	    if (this._contentDirty) {
	        this.deploy(target);
	        this._eventOutput.emit('deploy');
	        this._contentDirty = false;
	        this._trueSizeCheck = true;
	    }
	    ElementOutput.prototype.commit.call(this, context);
	};
	Surface.prototype.cleanup = function cleanup(allocator) {
	    var i = 0;
	    var target = this._currentTarget;
	    this._eventOutput.emit('recall');
	    this.recall(target);
	    target.style.display = 'none';
	    target.style.opacity = '';
	    target.style.width = '';
	    target.style.height = '';
	    _cleanupStyles.call(this, target);
	    _cleanupAttributes.call(this, target);
	    var classList = this.getClassList();
	    _cleanupClasses.call(this, target);
	    for (i = 0; i < classList.length; i++)
	        target.classList.remove(classList[i]);
	    if (this.elementClass) {
	        if (this.elementClass instanceof Array) {
	            for (i = 0; i < this.elementClass.length; i++) {
	                target.classList.remove(this.elementClass[i]);
	            }
	        } else {
	            target.classList.remove(this.elementClass);
	        }
	    }
	    this.detach(target);
	    this._currentTarget = null;
	    allocator.deallocate(target);
	};
	Surface.prototype.deploy = function deploy(target) {
	    var content = this.getContent();
	    if (content instanceof Node) {
	        while (target.hasChildNodes())
	            target.removeChild(target.firstChild);
	        target.appendChild(content);
	    } else
	        target.innerHTML = content;
	};
	Surface.prototype.recall = function recall(target) {
	    var df = document.createDocumentFragment();
	    while (target.hasChildNodes())
	        df.appendChild(target.firstChild);
	    this.setContent(df);
	};
	Surface.prototype.getSize = function getSize() {
	    return this._size ? this._size : this.size;
	};
	Surface.prototype.setSize = function setSize(size) {
	    this.size = size ? [
	        size[0],
	        size[1]
	    ] : null;
	    this._sizeDirty = true;
	    return this;
	};
	module.exports = Surface;

/***/ },
/* 12 */
/*!****************************************!*\
  !*** ../~/famous/core/ViewSequence.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function ViewSequence(options) {
	    if (!options)
	        options = [];
	    if (options instanceof Array)
	        options = { array: options };
	    this._ = null;
	    this.index = options.index || 0;
	    if (options.array)
	        this._ = new this.constructor.Backing(options.array);
	    else if (options._)
	        this._ = options._;
	    if (this.index === this._.firstIndex)
	        this._.firstNode = this;
	    if (this.index === this._.firstIndex + this._.array.length - 1)
	        this._.lastNode = this;
	    if (options.loop !== undefined)
	        this._.loop = options.loop;
	    if (options.trackSize !== undefined)
	        this._.trackSize = options.trackSize;
	    this._previousNode = null;
	    this._nextNode = null;
	}
	ViewSequence.Backing = function Backing(array) {
	    this.array = array;
	    this.firstIndex = 0;
	    this.loop = false;
	    this.firstNode = null;
	    this.lastNode = null;
	    this.cumulativeSizes = [[
	            0,
	            0
	        ]];
	    this.sizeDirty = true;
	    this.trackSize = false;
	};
	ViewSequence.Backing.prototype.getValue = function getValue(i) {
	    var _i = i - this.firstIndex;
	    if (_i < 0 || _i >= this.array.length)
	        return null;
	    return this.array[_i];
	};
	ViewSequence.Backing.prototype.setValue = function setValue(i, value) {
	    this.array[i - this.firstIndex] = value;
	};
	ViewSequence.Backing.prototype.getSize = function getSize(index) {
	    return this.cumulativeSizes[index];
	};
	ViewSequence.Backing.prototype.calculateSize = function calculateSize(index) {
	    index = index || this.array.length;
	    var size = [
	        0,
	        0
	    ];
	    for (var i = 0; i < index; i++) {
	        var nodeSize = this.array[i].getSize();
	        if (!nodeSize)
	            return undefined;
	        if (size[0] !== undefined) {
	            if (nodeSize[0] === undefined)
	                size[0] = undefined;
	            else
	                size[0] += nodeSize[0];
	        }
	        if (size[1] !== undefined) {
	            if (nodeSize[1] === undefined)
	                size[1] = undefined;
	            else
	                size[1] += nodeSize[1];
	        }
	        this.cumulativeSizes[i + 1] = size.slice();
	    }
	    this.sizeDirty = false;
	    return size;
	};
	ViewSequence.Backing.prototype.reindex = function reindex(start, removeCount, insertCount) {
	    if (!this.array[0])
	        return;
	    var i = 0;
	    var index = this.firstIndex;
	    var indexShiftAmount = insertCount - removeCount;
	    var node = this.firstNode;
	    while (index < start - 1) {
	        node = node.getNext();
	        index++;
	    }
	    var spliceStartNode = node;
	    for (i = 0; i < removeCount; i++) {
	        node = node.getNext();
	        if (node)
	            node._previousNode = spliceStartNode;
	    }
	    var spliceResumeNode = node ? node.getNext() : null;
	    spliceStartNode._nextNode = null;
	    node = spliceStartNode;
	    for (i = 0; i < insertCount; i++)
	        node = node.getNext();
	    index += insertCount;
	    if (node !== spliceResumeNode) {
	        node._nextNode = spliceResumeNode;
	        if (spliceResumeNode)
	            spliceResumeNode._previousNode = node;
	    }
	    if (spliceResumeNode) {
	        node = spliceResumeNode;
	        index++;
	        while (node && index < this.array.length + this.firstIndex) {
	            if (node._nextNode)
	                node.index += indexShiftAmount;
	            else
	                node.index = index;
	            node = node.getNext();
	            index++;
	        }
	    }
	    if (this.trackSize)
	        this.sizeDirty = true;
	};
	ViewSequence.prototype.getPrevious = function getPrevious() {
	    var len = this._.array.length;
	    if (!len) {
	        this._previousNode = null;
	    } else if (this.index === this._.firstIndex) {
	        if (this._.loop) {
	            this._previousNode = this._.lastNode || new this.constructor({
	                _: this._,
	                index: this._.firstIndex + len - 1
	            });
	            this._previousNode._nextNode = this;
	        } else {
	            this._previousNode = null;
	        }
	    } else if (!this._previousNode) {
	        this._previousNode = new this.constructor({
	            _: this._,
	            index: this.index - 1
	        });
	        this._previousNode._nextNode = this;
	    }
	    return this._previousNode;
	};
	ViewSequence.prototype.getNext = function getNext() {
	    var len = this._.array.length;
	    if (!len) {
	        this._nextNode = null;
	    } else if (this.index === this._.firstIndex + len - 1) {
	        if (this._.loop) {
	            this._nextNode = this._.firstNode || new this.constructor({
	                _: this._,
	                index: this._.firstIndex
	            });
	            this._nextNode._previousNode = this;
	        } else {
	            this._nextNode = null;
	        }
	    } else if (!this._nextNode) {
	        this._nextNode = new this.constructor({
	            _: this._,
	            index: this.index + 1
	        });
	        this._nextNode._previousNode = this;
	    }
	    return this._nextNode;
	};
	ViewSequence.prototype.indexOf = function indexOf(item) {
	    return this._.array.indexOf(item);
	};
	ViewSequence.prototype.getIndex = function getIndex() {
	    return this.index;
	};
	ViewSequence.prototype.toString = function toString() {
	    return '' + this.index;
	};
	ViewSequence.prototype.unshift = function unshift(value) {
	    this._.array.unshift.apply(this._.array, arguments);
	    this._.firstIndex -= arguments.length;
	    if (this._.trackSize)
	        this._.sizeDirty = true;
	};
	ViewSequence.prototype.push = function push(value) {
	    this._.array.push.apply(this._.array, arguments);
	    if (this._.trackSize)
	        this._.sizeDirty = true;
	};
	ViewSequence.prototype.splice = function splice(index, howMany) {
	    var values = Array.prototype.slice.call(arguments, 2);
	    this._.array.splice.apply(this._.array, [
	        index - this._.firstIndex,
	        howMany
	    ].concat(values));
	    this._.reindex(index, howMany, values.length);
	};
	ViewSequence.prototype.swap = function swap(other) {
	    var otherValue = other.get();
	    var myValue = this.get();
	    this._.setValue(this.index, otherValue);
	    this._.setValue(other.index, myValue);
	    var myPrevious = this._previousNode;
	    var myNext = this._nextNode;
	    var myIndex = this.index;
	    var otherPrevious = other._previousNode;
	    var otherNext = other._nextNode;
	    var otherIndex = other.index;
	    this.index = otherIndex;
	    this._previousNode = otherPrevious === this ? other : otherPrevious;
	    if (this._previousNode)
	        this._previousNode._nextNode = this;
	    this._nextNode = otherNext === this ? other : otherNext;
	    if (this._nextNode)
	        this._nextNode._previousNode = this;
	    other.index = myIndex;
	    other._previousNode = myPrevious === other ? this : myPrevious;
	    if (other._previousNode)
	        other._previousNode._nextNode = other;
	    other._nextNode = myNext === other ? this : myNext;
	    if (other._nextNode)
	        other._nextNode._previousNode = other;
	    if (this.index === this._.firstIndex)
	        this._.firstNode = this;
	    else if (this.index === this._.firstIndex + this._.array.length - 1)
	        this._.lastNode = this;
	    if (other.index === this._.firstIndex)
	        this._.firstNode = other;
	    else if (other.index === this._.firstIndex + this._.array.length - 1)
	        this._.lastNode = other;
	    if (this._.trackSize)
	        this._.sizeDirty = true;
	};
	ViewSequence.prototype.get = function get() {
	    return this._.getValue(this.index);
	};
	ViewSequence.prototype.getSize = function getSize() {
	    var target = this.get();
	    return target ? target.getSize() : null;
	};
	ViewSequence.prototype.render = function render() {
	    if (this._.trackSize && this._.sizeDirty)
	        this._.calculateSize();
	    var target = this.get();
	    return target ? target.render.apply(target, arguments) : null;
	};
	module.exports = ViewSequence;

/***/ },
/* 13 */
/*!************************************************!*\
  !*** ../~/famous/surfaces/ContainerSurface.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Surface = __webpack_require__(/*! ../core/Surface */ 11);
	var Context = __webpack_require__(/*! ../core/Context */ 29);
	function ContainerSurface(options) {
	    Surface.call(this, options);
	    this._container = document.createElement('div');
	    this._container.classList.add('famous-group');
	    this._container.classList.add('famous-container-group');
	    this._shouldRecalculateSize = false;
	    this.context = new Context(this._container);
	    this.setContent(this._container);
	}
	ContainerSurface.prototype = Object.create(Surface.prototype);
	ContainerSurface.prototype.constructor = ContainerSurface;
	ContainerSurface.prototype.elementType = 'div';
	ContainerSurface.prototype.elementClass = 'famous-surface';
	ContainerSurface.prototype.add = function add() {
	    return this.context.add.apply(this.context, arguments);
	};
	ContainerSurface.prototype.render = function render() {
	    if (this._sizeDirty)
	        this._shouldRecalculateSize = true;
	    return Surface.prototype.render.apply(this, arguments);
	};
	ContainerSurface.prototype.deploy = function deploy() {
	    this._shouldRecalculateSize = true;
	    return Surface.prototype.deploy.apply(this, arguments);
	};
	ContainerSurface.prototype.commit = function commit(context, transform, opacity, origin, size) {
	    var previousSize = this._size ? [
	        this._size[0],
	        this._size[1]
	    ] : null;
	    var result = Surface.prototype.commit.apply(this, arguments);
	    if (this._shouldRecalculateSize || previousSize && (this._size[0] !== previousSize[0] || this._size[1] !== previousSize[1])) {
	        this.context.setSize();
	        this._shouldRecalculateSize = false;
	    }
	    this.context.update();
	    return result;
	};
	module.exports = ContainerSurface;

/***/ },
/* 14 */
/*!********************************************!*\
  !*** ../~/famous/surfaces/InputSurface.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Surface = __webpack_require__(/*! ../core/Surface */ 11);
	function InputSurface(options) {
	    this._placeholder = options.placeholder || '';
	    this._value = options.value || '';
	    this._type = options.type || 'text';
	    this._name = options.name || '';
	    Surface.apply(this, arguments);
	    this.on('click', this.focus.bind(this));
	    window.addEventListener('click', function (event) {
	        if (event.target !== this._currentTarget)
	            this.blur();
	    }.bind(this));
	}
	InputSurface.prototype = Object.create(Surface.prototype);
	InputSurface.prototype.constructor = InputSurface;
	InputSurface.prototype.elementType = 'input';
	InputSurface.prototype.elementClass = 'famous-surface';
	InputSurface.prototype.setPlaceholder = function setPlaceholder(str) {
	    this._placeholder = str;
	    this._contentDirty = true;
	    return this;
	};
	InputSurface.prototype.focus = function focus() {
	    if (this._currentTarget)
	        this._currentTarget.focus();
	    return this;
	};
	InputSurface.prototype.blur = function blur() {
	    if (this._currentTarget)
	        this._currentTarget.blur();
	    return this;
	};
	InputSurface.prototype.setValue = function setValue(str) {
	    this._value = str;
	    this._contentDirty = true;
	    return this;
	};
	InputSurface.prototype.setType = function setType(str) {
	    this._type = str;
	    this._contentDirty = true;
	    return this;
	};
	InputSurface.prototype.getValue = function getValue() {
	    if (this._currentTarget) {
	        return this._currentTarget.value;
	    } else {
	        return this._value;
	    }
	};
	InputSurface.prototype.setName = function setName(str) {
	    this._name = str;
	    this._contentDirty = true;
	    return this;
	};
	InputSurface.prototype.getName = function getName() {
	    return this._name;
	};
	InputSurface.prototype.deploy = function deploy(target) {
	    if (this._placeholder !== '')
	        target.placeholder = this._placeholder;
	    target.value = this._value;
	    target.type = this._type;
	    target.name = this._name;
	};
	module.exports = InputSurface;

/***/ },
/* 15 */
/*!************************************************!*\
  !*** ../~/famous-flex/src/LayoutController.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014 - 2015
	 */
	
	/*global console*/
	/*eslint no-console: 0*/
	
	/**
	 * LayoutController lays out renderables according to a layout-
	 * function and a data-source.
	 *
	 * Events:
	 *
	 * |event      |description|
	 * |-----------|-----------|
	 * |layoutstart|Emitted before the layout function is executed.|
	 * |layoutend  |Emitted after the layout function has been executed.|
	 * |reflow     |Emitted after one or more renderables have been changed.|
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var Utility = __webpack_require__(/*! famous/utilities/Utility */ 34);
	    var Entity = __webpack_require__(/*! famous/core/Entity */ 35);
	    var ViewSequence = __webpack_require__(/*! famous/core/ViewSequence */ 12);
	    var OptionsManager = __webpack_require__(/*! famous/core/OptionsManager */ 31);
	    var EventHandler = __webpack_require__(/*! famous/core/EventHandler */ 30);
	    var LayoutUtility = __webpack_require__(/*! ./LayoutUtility */ 17);
	    var LayoutNodeManager = __webpack_require__(/*! ./LayoutNodeManager */ 36);
	    var LayoutNode = __webpack_require__(/*! ./LayoutNode */ 37);
	    var FlowLayoutNode = __webpack_require__(/*! ./FlowLayoutNode */ 38);
	    var Transform = __webpack_require__(/*! famous/core/Transform */ 39);
	    __webpack_require__(/*! ./helpers/LayoutDockHelper */ 18);
	
	    /**
	     * @class
	     * @param {Object} options Options.
	     * @param {Function|Object} [options.layout] Layout function or layout-literal.
	     * @param {Object} [options.layoutOptions] Options to pass in to the layout-function.
	     * @param {Array|ViewSequence|Object} [options.dataSource] Array, ViewSequence or Object with key/value pairs.
	     * @param {Utility.Direction} [options.direction] Direction to layout into (e.g. Utility.Direction.Y) (when omitted the default direction of the layout is used)
	     * @param {Bool} [options.flow] Enables flow animations when the layout changes (default: `false`).
	     * @param {Object} [options.flowOptions] Options used by nodes when reflowing.
	     * @param {Bool} [options.flowOptions.reflowOnResize] Smoothly reflows renderables on resize (only used when flow = true) (default: `true`).
	     * @param {Object} [options.flowOptions.spring] Spring options used by nodes when reflowing (default: `{dampingRatio: 0.8, period: 300}`).
	     * @param {Object} [options.flowOptions.properties] Properties which should be enabled or disabled for flowing.
	     * @param {Spec} [options.flowOptions.insertSpec] Size, transform, opacity... to use when inserting new renderables into the scene (default: `{}`).
	     * @param {Spec} [options.flowOptions.removeSpec] Size, transform, opacity... to use when removing renderables from the scene (default: `{}`).
	     * @param {Bool} [options.alwaysLayout] When set to true, always calls the layout function on every render-cycle (default: `false`).
	     * @param {Bool} [options.autoPipeEvents] When set to true, automatically calls .pipe on all renderables when inserted (default: `false`).
	     * @param {Object} [options.preallocateNodes] Optimisation option to improve initial scrolling/animation performance by pre-allocating nodes, e.g.: `{count: 50, spec: {size:[0, 0], transform: Transform.identity}}`.
	     * @alias module:LayoutController
	     */
	    function LayoutController(options, nodeManager) {
	
	        // Commit
	        this.id = Entity.register(this);
	        this._isDirty = true;
	        this._contextSizeCache = [0, 0];
	        this._commitOutput = {};
	
	        // Create an object to we can capture the famo.us cleanup call on
	        // LayoutController.
	        this._cleanupRegistration = {
	          commit: function() {
	              return undefined;
	          },
	          cleanup: function(context) {
	              this.cleanup(context);
	          }.bind(this)
	        };
	        this._cleanupRegistration.target = Entity.register(this._cleanupRegistration);
	        this._cleanupRegistration.render = function() {
	          return this.target;
	        }.bind(this._cleanupRegistration);
	
	        // Setup input event handler
	        this._eventInput = new EventHandler();
	        EventHandler.setInputHandler(this, this._eventInput);
	
	        // Setup event handlers
	        this._eventOutput = new EventHandler();
	        EventHandler.setOutputHandler(this, this._eventOutput);
	
	        // Data-source
	        //this._dataSource = undefined;
	        //this._nodesById = undefined;
	        //this._viewSequence = undefined;
	
	        // Layout
	        this._layout = {
	            //function: undefined,
	            //literal: undefined,
	            //capabilities: undefined,
	            options: Object.create({})
	        };
	        //this._direction = undefined;
	        this._layout.optionsManager = new OptionsManager(this._layout.options);
	        this._layout.optionsManager.on('change', function() {
	            this._isDirty = true;
	        }.bind(this));
	
	        // Create options
	        this.options = Object.create(LayoutController.DEFAULT_OPTIONS);
	        this._optionsManager = new OptionsManager(this.options);
	
	        // Create node manager that manages (Flow)LayoutNode instances
	        if (nodeManager) {
	            this._nodes = nodeManager;
	        }
	        else if (options && options.flow) {
	            this._nodes = new LayoutNodeManager(FlowLayoutNode, _initFlowLayoutNode.bind(this));
	        }
	        else {
	            this._nodes = new LayoutNodeManager(LayoutNode);
	        }
	
	        // Set options
	        this.setDirection(undefined);
	        if (options) {
	            this.setOptions(options);
	        }
	    }
	
	    LayoutController.DEFAULT_OPTIONS = {
	        flow: false,
	        flowOptions: {
	            reflowOnResize: true,
	            properties: {
	                opacity: true,
	                align: true,
	                origin: true,
	                size: true,
	                translate: true,
	                skew: true,
	                rotate: true,
	                scale: true
	            },
	            spring: {
	                dampingRatio: 0.8,
	                period: 300
	            }
	            /*insertSpec: {
	                opacity: undefined,
	                size: undefined,
	                transform: undefined,
	                origin: undefined,
	                align: undefined
	            },
	            removeSpec: {
	                opacity: undefined,
	                size: undefined,
	                transform: undefined,
	                origin: undefined,
	                align: undefined
	            }*/
	        }
	    };
	
	    /**
	     * Called whenever a layout-node is created/re-used. Initializes
	     * the node with the `insertSpec` if it has been defined.
	     */
	    function _initFlowLayoutNode(node, spec) {
	        if (!spec && this.options.flowOptions.insertSpec) {
	            node.setSpec(this.options.flowOptions.insertSpec);
	        }
	    }
	
	    /**
	     * Patches the LayoutController instance's options with the passed-in ones.
	     *
	     * @param {Options} options An object of configurable options for the LayoutController instance.
	     * @param {Function|Object} [options.layout] Layout function or layout-literal.
	     * @param {Object} [options.layoutOptions] Options to pass in to the layout-function.
	     * @param {Array|ViewSequence|Object} [options.dataSource] Array, ViewSequence or Object with key/value pairs.
	     * @param {Utility.Direction} [options.direction] Direction to layout into (e.g. Utility.Direction.Y) (when omitted the default direction of the layout is used)
	     * @param {Object} [options.flowOptions] Options used by nodes when reflowing.
	     * @param {Bool} [options.flowOptions.reflowOnResize] Smoothly reflows renderables on resize (only used when flow = true) (default: `true`).
	     * @param {Object} [options.flowOptions.spring] Spring options used by nodes when reflowing (default: `{dampingRatio: 0.8, period: 300}`).
	     * @param {Object} [options.flowOptions.properties] Properties which should be enabled or disabled for flowing.
	     * @param {Spec} [options.flowOptions.insertSpec] Size, transform, opacity... to use when inserting new renderables into the scene (default: `{}`).
	     * @param {Spec} [options.flowOptions.removeSpec] Size, transform, opacity... to use when removing renderables from the scene (default: `{}`).
	     * @param {Bool} [options.alwaysLayout] When set to true, always calls the layout function on every render-cycle (default: `false`).
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.setOptions = function(options) {
	        if ((options.alignment !== undefined) && (options.alignment !== this.options.alignment)) {
	            this._isDirty = true;
	        }
	        this._optionsManager.setOptions(options);
	        if (options.nodeSpring) {
	            console.warn('nodeSpring options have been moved inside `flowOptions`. Use `flowOptions.spring` instead.');
	            this._optionsManager.setOptions({
	                flowOptions: {
	                    spring: options.nodeSpring
	                }
	            });
	            this._nodes.setNodeOptions(this.options.flowOptions);
	        }
	        if (options.reflowOnResize !== undefined) {
	            console.warn('reflowOnResize options have been moved inside `flowOptions`. Use `flowOptions.reflowOnResize` instead.');
	            this._optionsManager.setOptions({
	                flowOptions: {
	                    reflowOnResize: options.reflowOnResize
	                }
	            });
	            this._nodes.setNodeOptions(this.options.flowOptions);
	        }
	        if (options.insertSpec) {
	            console.warn('insertSpec options have been moved inside `flowOptions`. Use `flowOptions.insertSpec` instead.');
	            this._optionsManager.setOptions({
	                flowOptions: {
	                    insertSpec: options.insertSpec
	                }
	            });
	            this._nodes.setNodeOptions(this.options.flowOptions);
	        }
	        if (options.removeSpec) {
	            console.warn('removeSpec options have been moved inside `flowOptions`. Use `flowOptions.removeSpec` instead.');
	            this._optionsManager.setOptions({
	                flowOptions: {
	                    removeSpec: options.removeSpec
	                }
	            });
	            this._nodes.setNodeOptions(this.options.flowOptions);
	        }
	        if (options.dataSource) {
	            this.setDataSource(options.dataSource);
	        }
	        if (options.layout) {
	            this.setLayout(options.layout, options.layoutOptions);
	        }
	        else if (options.layoutOptions) {
	            this.setLayoutOptions(options.layoutOptions);
	        }
	        if (options.direction !== undefined) {
	            this.setDirection(options.direction);
	        }
	        if (options.flowOptions && this.options.flow) {
	            this._nodes.setNodeOptions(this.options.flowOptions);
	        }
	        if (options.preallocateNodes) {
	            this._nodes.preallocateNodes(options.preallocateNodes.count || 0, options.preallocateNodes.spec);
	        }
	        return this;
	    };
	
	    /**
	     * Helper function to enumerate all the renderables in the datasource
	     */
	    function _forEachRenderable(callback) {
	        var dataSource = this._dataSource;
	        if (dataSource instanceof Array) {
	            for (var i = 0, j = dataSource.length; i < j; i++) {
	                callback(dataSource[i]);
	            }
	        }
	        else if (dataSource instanceof ViewSequence) {
	            var renderable;
	            while (dataSource) {
	                renderable = dataSource.get();
	                if (!renderable) {
	                    break;
	                }
	                callback(renderable);
	                dataSource = dataSource.getNext();
	            }
	        }
	        else {
	            for (var key in dataSource) {
	                callback(dataSource[key]);
	            }
	        }
	    }
	
	    /**
	     * Sets the collection of renderables which are layed out according to
	     * the layout-function.
	     *
	     * The data-source can be either an Array, ViewSequence or Object
	     * with key/value pairs.
	     *
	     * @param {Array|Object|ViewSequence} dataSource Array, ViewSequence or Object.
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.setDataSource = function(dataSource) {
	        this._dataSource = dataSource;
	        this._initialViewSequence = undefined;
	        this._nodesById = undefined;
	        if (dataSource instanceof Array) {
	            this._viewSequence = new ViewSequence(dataSource);
	            this._initialViewSequence = this._viewSequence;
	        }
	        else if ((dataSource instanceof ViewSequence) || dataSource.getNext) {
	            this._viewSequence = dataSource;
	            this._initialViewSequence = dataSource;
	        }
	        else if (dataSource instanceof Object){
	            this._nodesById = dataSource;
	        }
	        if (this.options.autoPipeEvents) {
	            if (this._dataSource.pipe) {
	                this._dataSource.pipe(this);
	                this._dataSource.pipe(this._eventOutput);
	            }
	            else {
	                _forEachRenderable.call(this, function(renderable) {
	                    if (renderable && renderable.pipe) {
	                        renderable.pipe(this);
	                        renderable.pipe(this._eventOutput);
	                    }
	                }.bind(this));
	            }
	        }
	        this._isDirty = true;
	        return this;
	    };
	
	    /**
	     * Get the data-source.
	     *
	     * @return {Array|ViewSequence|Object} data-source
	     */
	    LayoutController.prototype.getDataSource = function() {
	        return this._dataSource;
	    };
	
	    /**
	     * Set the new layout.
	     *
	     * @param {Function|Object} layout Layout function or layout-literal
	     * @param {Object} [options] Options to pass in to the layout-function
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.setLayout = function(layout, options) {
	
	        // Set new layout funtion
	        if (layout instanceof Function) {
	            this._layout._function = layout;
	            this._layout.capabilities = layout.Capabilities;
	            this._layout.literal = undefined;
	
	        // If the layout is an object, treat it as a layout-literal
	        }
	        else if (layout instanceof Object) {
	            this._layout.literal = layout;
	            this._layout.capabilities = undefined; // todo - derive from literal somehow?
	            var helperName = Object.keys(layout)[0];
	            var Helper = LayoutUtility.getRegisteredHelper(helperName);
	            this._layout._function = Helper ? function(context, options2) {
	                var helper = new Helper(context, options2);
	                helper.parse(layout[helperName]);
	            } : undefined;
	        }
	        else {
	            this._layout._function = undefined;
	            this._layout.capabilities = undefined;
	            this._layout.literal = undefined;
	        }
	
	        // Update options
	        if (options) {
	            this.setLayoutOptions(options);
	        }
	
	        // Update direction
	        this.setDirection(this._configuredDirection);
	        this._isDirty = true;
	        return this;
	    };
	
	    /**
	     * Get the current layout.
	     *
	     * @return {Function|Object} Layout function or layout literal
	     */
	    LayoutController.prototype.getLayout = function() {
	        return this._layout.literal || this._layout._function;
	    };
	
	    /**
	     * Set the options for the current layout. Use this function after
	     * `setLayout` to update one or more options for the layout-function.
	     *
	     * @param {Object} [options] Options to pass in to the layout-function
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.setLayoutOptions = function(options) {
	        this._layout.optionsManager.setOptions(options);
	        return this;
	    };
	
	    /**
	     * Get the current layout options.
	     *
	     * @return {Object} Layout options
	     */
	    LayoutController.prototype.getLayoutOptions = function() {
	        return this._layout.options;
	    };
	
	    /**
	     * Calculates the actual in-use direction based on the given direction
	     * and supported capabilities of the layout-function.
	     */
	    function _getActualDirection(direction) {
	
	        // When the direction is configured in the capabilities, look it up there
	        if (this._layout.capabilities && this._layout.capabilities.direction) {
	
	            // Multiple directions are supported
	            if (Array.isArray(this._layout.capabilities.direction)) {
	                for (var i = 0; i < this._layout.capabilities.direction.length; i++) {
	                    if (this._layout.capabilities.direction[i] === direction) {
	                        return direction;
	                    }
	                }
	                return this._layout.capabilities.direction[0];
	            }
	
	            // Only one direction is supported, we must use that
	            else {
	                return this._layout.capabilities.direction;
	            }
	        }
	
	        // Use Y-direction as a fallback
	        return (direction === undefined) ? Utility.Direction.Y : direction;
	    }
	
	    /**
	     * Set the direction of the layout. When no direction is set, the default
	     * direction of the layout function is used.
	     *
	     * @param {Utility.Direction} direction Direction (e.g. Utility.Direction.X)
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.setDirection = function(direction) {
	        this._configuredDirection = direction;
	        var newDirection = _getActualDirection.call(this, direction);
	        if (newDirection !== this._direction) {
	            this._direction = newDirection;
	            this._isDirty = true;
	        }
	    };
	
	    /**
	     * Get the direction (e.g. Utility.Direction.Y). By default, this function
	     * returns the direction that was configured by setting `setDirection`. When
	     * the direction has not been set, `undefined` is returned.
	     *
	     * When no direction has been set, the first direction is used that is specified
	     * in the capabilities of the layout-function. To obtain the actual in-use direction,
	     * use `getDirection(true)`. This method returns the actual in-use direction and
	     * never returns undefined.
	     *
	     * @param {Boolean} [actual] Set to true to obtain the actual in-use direction
	     * @return {Utility.Direction} Direction or undefined
	     */
	    LayoutController.prototype.getDirection = function(actual) {
	        return actual ? this._direction : this._configuredDirection;
	    };
	
	    /**
	     * Get the spec (size, transform, etc..) for the given renderable or
	     * Id.
	     *
	     * @param {Renderable|String} node Renderabe or Id to look for
	     * @param {Bool} [normalize] When set to `true` normalizes the origin/align into the transform translation (default: `false`).
	     * @param {Bool} [endState] When set to `true` returns the flowing end-state spec rather than the current spec.
	     * @return {Spec} spec or undefined
	     */
	    LayoutController.prototype.getSpec = function(node, normalize, endState) {
	        if (!node) {
	            return undefined;
	        }
	        if ((node instanceof String) || (typeof node === 'string')) {
	            if (!this._nodesById) {
	               return undefined;
	            }
	            node = this._nodesById[node];
	            if (!node) {
	                return undefined;
	            }
	
	            // If the result was an array, return that instead
	            if (node instanceof Array) {
	                return node;
	            }
	        }
	        if (this._specs) {
	            for (var i = 0; i < this._specs.length; i++) {
	                var spec = this._specs[i];
	                if (spec.renderNode === node) {
	                    if (endState && spec.endState) {
	                        spec = spec.endState;
	                    }
	                    // normalize align & origin into transform
	                    if (normalize && spec.transform && spec.size && (spec.align || spec.origin)) {
	                        var transform = spec.transform;
	                        if (spec.align && (spec.align[0] || spec.align[1])) {
	                            transform = Transform.thenMove(transform, [spec.align[0] * this._contextSizeCache[0], spec.align[1] * this._contextSizeCache[1], 0]);
	                        }
	                        if (spec.origin && (spec.origin[0] || spec.origin[1])) {
	                            transform = Transform.moveThen([-spec.origin[0] * spec.size[0], -spec.origin[1] * spec.size[1], 0], transform);
	                        }
	                        return {
	                            opacity: spec.opacity,
	                            size: spec.size,
	                            transform: transform
	                        };
	                    }
	                    return spec;
	                }
	            }
	        }
	        return undefined;
	    };
	
	    /**
	     * Forces a reflow of the layout the next render cycle.
	     *
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.reflowLayout = function() {
	        this._isDirty = true;
	        return this;
	    };
	
	    /**
	     * Resets the current flow state, so that all renderables
	     * are immediately displayed in their end-state.
	     *
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.resetFlowState = function() {
	        if (this.options.flow) {
	            this._resetFlowState = true;
	        }
	        return this;
	    };
	
	    /**
	     * Inserts a renderable into the data-source.
	     *
	     * The optional argument `insertSpec` is only used `flow` mode is enabled.
	     * When specified, the renderable is inserted using an animation starting with
	     * size, origin, opacity, transform, etc... as specified in `insertSpec'.
	     *
	     * @param {Number|String} indexOrId Index (0 = before first, -1 at end), within dataSource array or id (String)
	     * @param {Object} renderable Renderable to add to the data-source
	     * @param {Spec} [insertSpec] Size, transform, etc.. to start with when inserting
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.insert = function(indexOrId, renderable, insertSpec) {
	
	        // Add the renderable in case of an id (String)
	        if ((indexOrId instanceof String) || (typeof indexOrId === 'string')) {
	
	            // Create data-source if neccesary
	            if (this._dataSource === undefined) {
	                this._dataSource = {};
	                this._nodesById = this._dataSource;
	            }
	
	            // Insert renderable
	            if (this._nodesById[indexOrId] === renderable) {
	                return this;
	            }
	            this._nodesById[indexOrId] = renderable;
	        }
	
	        // Add the renderable using an index
	        else {
	
	            // Create data-source if neccesary
	            if (this._dataSource === undefined) {
	                this._dataSource = [];
	                this._viewSequence = new ViewSequence(this._dataSource);
	                this._initialViewSequence = this._viewSequence;
	            }
	
	            // Insert into array
	            var dataSource = this._viewSequence || this._dataSource;
	            var array = _getDataSourceArray.call(this);
	            if (array && (indexOrId === array.length)) {
	                indexOrId = -1;
	            }
	            if (indexOrId === -1) {
	                dataSource.push(renderable);
	            }
	            else if (indexOrId === 0) {
	                if (dataSource === this._viewSequence) {
	                    dataSource.splice(0, 0, renderable);
	                    if (this._viewSequence.getIndex() === 0) {
	                        var nextViewSequence = this._viewSequence.getNext();
	                        if (nextViewSequence && nextViewSequence.get()) {
	                            this._viewSequence = nextViewSequence;
	                        }
	                    }
	                }
	                else {
	                    dataSource.splice(0, 0, renderable);
	                }
	            }
	            else {
	                dataSource.splice(indexOrId, 0, renderable);
	            }
	        }
	
	        // When a custom insert-spec was specified, store that in the layout-node
	        if (insertSpec) {
	            this._nodes.insertNode(this._nodes.createNode(renderable, insertSpec));
	        }
	
	        // Auto pipe events
	        if (this.options.autoPipeEvents && renderable && renderable.pipe) {
	            renderable.pipe(this);
	            renderable.pipe(this._eventOutput);
	        }
	
	        // Force a reflow
	        this._isDirty = true;
	
	        return this;
	    };
	
	    /**
	     * Adds a renderable to the end of a sequential data-source.
	     *
	     * The optional argument `insertSpec` is only used `flow` mode is enabled.
	     * When specified, the renderable is inserted using an animation starting with
	     * size, origin, opacity, transform, etc... as specified in `insertSpec'.
	     *
	     * @param {Object} renderable Renderable to add to the data-source
	     * @param {Spec} [insertSpec] Size, transform, etc.. to start with when inserting
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.push = function(renderable, insertSpec) {
	        return this.insert(-1, renderable, insertSpec);
	    };
	
	    /**
	     * Helper function for finding the view-sequence node at the given position.
	     */
	    function _getViewSequenceAtIndex(index, startViewSequence) {
	        var viewSequence = startViewSequence || this._viewSequence;
	        var i = viewSequence ? viewSequence.getIndex() : index;
	        if (index > i) {
	            while (viewSequence) {
	                viewSequence = viewSequence.getNext();
	                if (!viewSequence) {
	                    return undefined;
	                }
	                i = viewSequence.getIndex();
	                if (i === index) {
	                    return viewSequence;
	                }
	                else if (index < i) {
	                    return undefined;
	                }
	            }
	        }
	        else if (index < i) {
	            while (viewSequence) {
	                viewSequence = viewSequence.getPrevious();
	                if (!viewSequence) {
	                    return undefined;
	                }
	                i = viewSequence.getIndex();
	                if (i === index) {
	                    return viewSequence;
	                }
	                else if (index > i) {
	                    return undefined;
	                }
	            }
	        }
	        return viewSequence;
	    }
	
	    /**
	     * Helper that return the underlying array datasource if available.
	     */
	    function _getDataSourceArray() {
	      if (Array.isArray(this._dataSource)) {
	        return this._dataSource;
	      }
	      else if (this._viewSequence || this._viewSequence._) {
	        return this._viewSequence._.array;
	      }
	      return undefined;
	    }
	
	    /**
	     * Get the renderable at the given index or Id.
	     *
	     * @param {Number|String} indexOrId Index within dataSource array or id (String)
	     * @return {Renderable} renderable or `undefined`
	     */
	    LayoutController.prototype.get = function(indexOrId) {
	      if (this._nodesById || (indexOrId instanceof String) || (typeof indexOrId === 'string')) {
	        return this._nodesById[indexOrId];
	      }
	      var viewSequence = _getViewSequenceAtIndex.call(this, indexOrId);
	      return viewSequence ? viewSequence.get() : undefined;
	    };
	
	    /**
	     * Swaps two renderables at the given positions.
	     *
	     * This method is only supported for dataSources of type Array or ViewSequence.
	     *
	     * @param {Number} index Index of the renderable to swap
	     * @param {Number} index2 Index of the renderable to swap with
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.swap = function(index, index2) {
	        var array = _getDataSourceArray.call(this);
	        if (!array) {
	            throw '.swap is only supported for dataSources of type Array or ViewSequence';
	        }
	        if (index === index2) {
	          return this;
	        }
	        if ((index < 0) || (index >= array.length)) {
	          throw 'Invalid index (' + index + ') specified to .swap';
	        }
	        if ((index2 < 0) || (index2 >= array.length)) {
	          throw 'Invalid second index (' + index2 + ') specified to .swap';
	        }
	        var renderNode = array[index];
	        array[index] = array[index2];
	        array[index2] = renderNode;
	        this._isDirty = true;
	        return this;
	    };
	
	    /**
	     * Replaces a renderable at the given index or id.
	     *
	     * @param {Number|String} indexOrId Index within dataSource array or id (String)
	     * @param {Renderable} renderable renderable to replace with
	     * @param {Bool} [noAnimation] When set to `true`, replaces the renderable without any flowing animation.
	     * @return {Renderable} old renderable that has been replaced
	     */
	    LayoutController.prototype.replace = function(indexOrId, renderable, noAnimation) {
	        var oldRenderable;
	        if (this._nodesById || (indexOrId instanceof String) || (typeof indexOrId === 'string')) {
	            oldRenderable = this._nodesById[indexOrId];
	            if (oldRenderable !== renderable) {
	                if (noAnimation && oldRenderable) {
	                    var node = this._nodes.getNodeByRenderNode(oldRenderable);
	                    if (node) {
	                        node.setRenderNode(renderable);
	                    }
	                }
	                this._nodesById[indexOrId] = renderable;
	                this._isDirty = true;
	            }
	            return oldRenderable;
	        }
	        var array = _getDataSourceArray.call(this);
	        if (!array) {
	          return undefined;
	        }
	        if ((indexOrId < 0) || (indexOrId >= array.length)) {
	          throw 'Invalid index (' + indexOrId + ') specified to .replace';
	        }
	        oldRenderable = array[indexOrId];
	        if (oldRenderable !== renderable) {
	          array[indexOrId] = renderable;
	          this._isDirty = true;
	        }
	        return oldRenderable;
	    };
	
	    /**
	     * Moves a renderable to a new index.
	     *
	     * This method is only supported for dataSources of type Array or ViewSequence.
	     *
	     * @param {Number} index Index of the renderable to move.
	     * @param {Number} newIndex New index of the renderable.
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.move = function(index, newIndex) {
	        var array = _getDataSourceArray.call(this);
	        if (!array) {
	            throw '.move is only supported for dataSources of type Array or ViewSequence';
	        }
	        if ((index < 0) || (index >= array.length)) {
	          throw 'Invalid index (' + index + ') specified to .move';
	        }
	        if ((newIndex < 0) || (newIndex >= array.length)) {
	          throw 'Invalid newIndex (' + newIndex + ') specified to .move';
	        }
	        var item = array.splice(index, 1)[0];
	        array.splice(newIndex, 0, item);
	        this._isDirty = true;
	        return this;
	    };
	
	    /**
	     * Removes a renderable from the data-source.
	     *
	     * The optional argument `removeSpec` is only used `flow` mode is enabled.
	     * When specified, the renderable is removed using an animation ending at
	     * the size, origin, opacity, transform, etc... as specified in `removeSpec'.
	     *
	     * @param {Number|String|Renderable} indexOrId Index, id (String) or renderable to remove.
	     * @param {Spec} [removeSpec] Size, transform, etc.. to end with when removing
	     * @return {Renderable} renderable that has been removed
	     */
	    LayoutController.prototype.remove = function(indexOrId, removeSpec) {
	        var renderNode;
	
	        // Remove the renderable in case of an id (String)
	        if (this._nodesById || (indexOrId instanceof String) || (typeof indexOrId === 'string')) {
	
	            // Find and remove renderable from data-source
	            if ((indexOrId instanceof String) || (typeof indexOrId === 'string')) {
	                renderNode = this._nodesById[indexOrId];
	                if (renderNode) {
	                    delete this._nodesById[indexOrId];
	                }
	            }
	            else {
	                for (var key in this._nodesById) {
	                    if (this._nodesById[key] === indexOrId) {
	                        delete this._nodesById[key];
	                        renderNode = indexOrId;
	                        break;
	                    }
	                }
	            }
	        }
	
	        // Remove the renderable using an index
	        else if ((indexOrId instanceof Number) || (typeof indexOrId === 'number')) {
	            var array = _getDataSourceArray.call(this);
	            if (!array || (indexOrId < 0) || (indexOrId >= array.length)) {
	                throw 'Invalid index (' + indexOrId + ') specified to .remove (or dataSource doesn\'t support remove)';
	            }
	            renderNode = array[indexOrId];
	            this._dataSource.splice(indexOrId, 1);
	        }
	
	        // Remove by renderable
	        else {
	            indexOrId = this._dataSource.indexOf(indexOrId);
	            if (indexOrId >= 0) {
	                this._dataSource.splice(indexOrId, 1);
	                renderNode = indexOrId;
	            }
	        }
	
	        // When a node is removed from the view-sequence, the current this._viewSequence
	        // node may not be part of the valid view-sequence anymore. This seems to be a bug
	        // in the famo.us ViewSequence implementation/concept. The following check was added
	        // to ensure that always a valid viewSequence node is selected into the ScrollView.
	        if (this._viewSequence && renderNode) {
	            var viewSequence = _getViewSequenceAtIndex.call(this, this._viewSequence.getIndex(), this._initialViewSequence);
	            viewSequence = viewSequence || _getViewSequenceAtIndex.call(this, this._viewSequence.getIndex() - 1, this._initialViewSequence);
	            viewSequence = viewSequence || this._dataSource;
	            this._viewSequence = viewSequence;
	        }
	
	        // When a custom remove-spec was specified, store that in the layout-node
	        if (renderNode && removeSpec) {
	            var node = this._nodes.getNodeByRenderNode(renderNode);
	            if (node) {
	                node.remove(removeSpec || this.options.flowOptions.removeSpec);
	            }
	        }
	
	        // Force a reflow
	        if (renderNode) {
	            this._isDirty = true;
	        }
	
	        return renderNode;
	    };
	
	    /**
	     * Removes all renderables from the data-source.
	     *
	     * The optional argument `removeSpec` is only used when `flow` mode is enabled.
	     * When specified, the renderables are removed using an animation ending at
	     * the size, origin, opacity, transform, etc... as specified in `removeSpec'.
	     *
	     * @param {Spec} [removeSpec] Size, transform, etc.. to end with when removing
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.removeAll = function(removeSpec) {
	        if (this._nodesById) {
	            var dirty = false;
	            for (var key in this._nodesById) {
	                delete this._nodesById[key];
	                dirty = true;
	            }
	            if (dirty) {
	                this._isDirty = true;
	            }
	        }
	        else if (this._dataSource){
	            this.setDataSource([]);
	        }
	        if (removeSpec) {
	            var node = this._nodes.getStartEnumNode();
	            while (node) {
	                node.remove(removeSpec || this.options.flowOptions.removeSpec);
	                node = node._next;
	            }
	        }
	        return this;
	    };
	
	    /**
	     * Return size of contained element or `undefined` when size is not defined.
	     *
	     * @return {Array.Number} [width, height]
	     */
	    LayoutController.prototype.getSize = function() {
	        return this._size || this.options.size;
	    };
	
	    /**
	     * Generate a render spec from the contents of this component.
	     *
	     * @private
	     * @method render
	     * @return {Object} Render spec for this component
	     */
	    LayoutController.prototype.render = function render() {
	        return this.id;
	    };
	
	    /**
	     * Apply changes from this component to the corresponding document element.
	     * This includes changes to classes, styles, size, content, opacity, origin,
	     * and matrix transforms.
	     *
	     * @private
	     * @method commit
	     * @param {Context} context commit context
	     */
	    LayoutController.prototype.commit = function commit(context) {
	        var transform = context.transform;
	        var origin = context.origin;
	        var size = context.size;
	        var opacity = context.opacity;
	
	        // Reset the flow-state when requested
	        if (this._resetFlowState) {
	            this._resetFlowState = false;
	            this._isDirty = true;
	            this._nodes.removeAll();
	        }
	
	        // When the size or layout function has changed, reflow the layout
	        if (size[0] !== this._contextSizeCache[0] ||
	            size[1] !== this._contextSizeCache[1] ||
	            this._isDirty ||
	            this._nodes._trueSizeRequested ||
	            this.options.alwaysLayout){
	
	            // Emit start event
	            var eventData = {
	                target: this,
	                oldSize: this._contextSizeCache,
	                size: size,
	                dirty: this._isDirty,
	                trueSizeRequested: this._nodes._trueSizeRequested
	            };
	            this._eventOutput.emit('layoutstart', eventData);
	
	            // When the layout has changed, and we are not just scrolling,
	            // disable the locked state of the layout-nodes so that they
	            // can freely transition between the old and new state.
	            if (this.options.flow) {
	                var lock = false;
	                if (!this.options.flowOptions.reflowOnResize) {
	                    if (!this._isDirty &&
	                        ((size[0] !== this._contextSizeCache[0]) ||
	                         (size[1] !== this._contextSizeCache[1]))) {
	                        lock = undefined;
	                    }
	                    else {
	                      lock = true;
	                    }
	                }
	                if (lock !== undefined) {
	                    var node = this._nodes.getStartEnumNode();
	                    while (node) {
	                        node.releaseLock(lock);
	                        node = node._next;
	                    }
	                }
	            }
	
	            // Update state
	            this._contextSizeCache[0] = size[0];
	            this._contextSizeCache[1] = size[1];
	            this._isDirty = false;
	
	            // Prepare for layout
	            var scrollEnd;
	            if (this.options.size && (this.options.size[this._direction] === true)) {
	                scrollEnd = 1000000; // calculate scroll-length
	            }
	            var layoutContext = this._nodes.prepareForLayout(
	                this._viewSequence,     // first node to layout
	                this._nodesById, {      // so we can do fast id lookups
	                    size: size,
	                    direction: this._direction,
	                    scrollEnd: scrollEnd
	                }
	            );
	
	            // Layout objects
	            if (this._layout._function) {
	                this._layout._function(
	                    layoutContext,          // context which the layout-function can use
	                    this._layout.options    // additional layout-options
	                );
	            }
	
	            // Mark non-invalidated nodes for removal
	            this._nodes.removeNonInvalidatedNodes(this.options.flowOptions.removeSpec);
	
	            // Cleanup any nodes in case of a VirtualViewSequence
	            this._nodes.removeVirtualViewSequenceNodes();
	
	            // Calculate scroll-length and use that as the true-size (height)
	            if (scrollEnd) {
	                scrollEnd = 0;
	                node = this._nodes.getStartEnumNode();
	                while (node) {
	                    if (node._invalidated && node.scrollLength) {
	                        scrollEnd += node.scrollLength;
	                    }
	                    node = node._next;
	                }
	                this._size = this._size || [0, 0];
	                this._size[0] = this.options.size[0];
	                this._size[1] = this.options.size[1];
	                this._size[this._direction] = scrollEnd;
	            }
	
	            // Update output and optionally emit event
	            var result = this._nodes.buildSpecAndDestroyUnrenderedNodes();
	            this._specs = result.specs;
	            this._commitOutput.target = result.specs;
	            this._eventOutput.emit('layoutend', eventData);
	            this._eventOutput.emit('reflow', {
	                target: this
	            });
	        }
	        else if (this.options.flow) {
	
	            // Update output and optionally emit event
	            result = this._nodes.buildSpecAndDestroyUnrenderedNodes();
	            this._specs = result.specs;
	            this._commitOutput.target = result.specs;
	            if (result.modified) {
	                this._eventOutput.emit('reflow', {
	                    target: this
	                });
	            }
	        }
	
	        // Render child-nodes every commit
	        var target = this._commitOutput.target;
	        for (var i = 0, j = target.length; i < j; i++) {
	            if (target[i].renderNode) {
	                target[i].target = target[i].renderNode.render();
	            }
	        }
	
	        // Add our cleanup-registration id also to the list, so that the
	        // cleanup function is called by famo.us when the LayoutController is
	        // removed from the render-tree.
	        if (!target.length || (target[target.length-1] !== this._cleanupRegistration)) {
	            target.push(this._cleanupRegistration);
	        }
	
	        // Translate dependent on origin
	        if (origin && ((origin[0] !== 0) || (origin[1] !== 0))) {
	            transform = Transform.moveThen([-size[0]*origin[0], -size[1]*origin[1], 0], transform);
	        }
	        this._commitOutput.size = size;
	        this._commitOutput.opacity = opacity;
	        this._commitOutput.transform = transform;
	        return this._commitOutput;
	    };
	
	    /**
	     * Called whenever the layout-controller is removed from the render-tree.
	     *
	     * @private
	     * @param {Context} context cleanup context
	     */
	    LayoutController.prototype.cleanup = function(context) {
	        if (this.options.flow) {
	            this._resetFlowState = true;
	        }
	    };
	
	    module.exports = LayoutController;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 16 */
/*!**********************************************!*\
  !*** ../~/famous-flex/src/FlexScrollView.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2015
	 */
	
	/**
	 * Flexible FlexScrollView for famo.us.
	 *
	 * Key features:
	 * -    Customizable layout (uses ListLayout by default)
	 * -    Insert/remove at any position using animations
	 * -    Support for `true` size renderables
	 * -    Pull to refresh (header & footer)
	 * -    Horizontal/vertical direction
	 * -    Top/left or bottom/right alignment
	 * -    Pagination
	 * -    Option to embed in a ContainerSurface
	 * -    FlexScrollView linking
	 *
	 * Inherited from: [ScrollController](./ScrollController.md)
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var LayoutUtility = __webpack_require__(/*! ./LayoutUtility */ 17);
	    var ScrollController = __webpack_require__(/*! ./ScrollController */ 33);
	    var ListLayout = __webpack_require__(/*! ./layouts/ListLayout */ 21);
	
	    //
	    // Pull to refresh states
	    //
	    var PullToRefreshState = {
	        HIDDEN: 0,
	        PULLING: 1,
	        ACTIVE: 2,
	        COMPLETED: 3,
	        HIDDING: 4
	    };
	
	    /**
	     * @class
	     * @extends ScrollController
	     * @param {Object} options Configurable options (see ScrollController for all inherited options).
	     * @param {Renderable} [options.pullToRefreshHeader] Pull to refresh renderable that is displayed when pulling down from the top.
	     * @param {Renderable} [options.pullToRefreshFooter] Pull to refresh renderable that is displayed when pulling up from the bottom.
	     * @param {FlexScrollView} [options.leadingScrollView] Leading scrollview into which input events are piped (see Tutorial)
	     * @param {FlexScrollView} [options.trailingScrollView] Trailing scrollview into which input events are piped (see Tutorial)
	     * @alias module:FlexScrollView
	     */
	    function FlexScrollView(options) {
	        ScrollController.call(this, LayoutUtility.combineOptions(FlexScrollView.DEFAULT_OPTIONS, options));
	        this._thisScrollViewDelta = 0;
	        this._leadingScrollViewDelta = 0;
	        this._trailingScrollViewDelta = 0;
	    }
	    FlexScrollView.prototype = Object.create(ScrollController.prototype);
	    FlexScrollView.prototype.constructor = FlexScrollView;
	    FlexScrollView.PullToRefreshState = PullToRefreshState;
	    FlexScrollView.Bounds = ScrollController.Bounds;
	    FlexScrollView.PaginationMode = ScrollController.PaginationMode;
	
	    FlexScrollView.DEFAULT_OPTIONS = {
	        layout: ListLayout,         // sequential layout, uses width/height from renderable
	        direction: undefined,       // 0 = X, 1 = Y, undefined = use default from layout
	        paginated: false,           // pagination on/off
	        alignment: 0,               // 0 = top/left, 1 = bottom/right
	        flow: false,                // allow renderables to flow between layouts when not scrolling
	        mouseMove: false,           // allow mouse to hold and move the view
	        useContainer: false,        // embeds inside a ContainerSurface for clipping and capturing input events
	        visibleItemThresshold: 0.5, // by default, when an item is 50% visible, it is considered visible by `getFirstVisibleItem`
	        pullToRefreshHeader: undefined, // assign pull-to-refresh renderable here (renderable must have a size)
	        pullToRefreshFooter: undefined, // assign pull-to-refresh renderable here (renderable must have a size)
	        leadingScrollView: undefined,
	        trailingScrollView: undefined
	        // see ScrollController for all other options
	    };
	
	    /**
	     * Patches the FlexScrollView instance's options with the passed-in ones.
	     *
	     * @param {Object} options Configurable options (see ScrollController for all inherited options).
	     * @param {Renderable} [options.pullToRefreshHeader] Pull to refresh renderable that is displayed when pulling down from the top.
	     * @param {Renderable} [options.pullToRefreshFooter] Pull to refresh renderable that is displayed when pulling up from the bottom.
	     * @param {FlexScrollView} [options.leadingScrollView] Leading scrollview into which input events are piped (see Tutorial).
	     * @param {FlexScrollView} [options.trailingScrollView] Trailing scrollview into which input events are piped (see Tutorial).
	     * @return {FlexScrollView} this
	     */
	    FlexScrollView.prototype.setOptions = function(options) {
	        ScrollController.prototype.setOptions.call(this, options);
	
	        // Update pull to refresh renderables
	        if (options.pullToRefreshHeader || options.pullToRefreshFooter || this._pullToRefresh) {
	            if (options.pullToRefreshHeader) {
	                this._pullToRefresh = this._pullToRefresh || [undefined, undefined];
	                if (!this._pullToRefresh[0]) {
	                    this._pullToRefresh[0] = {
	                        state: PullToRefreshState.HIDDEN,
	                        prevState: PullToRefreshState.HIDDEN,
	                        footer: false
	                    };
	                }
	                this._pullToRefresh[0].node = options.pullToRefreshHeader;
	            }
	            else if (!this.options.pullToRefreshHeader && this._pullToRefresh) {
	                this._pullToRefresh[0] = undefined;
	            }
	            if (options.pullToRefreshFooter) {
	                this._pullToRefresh = this._pullToRefresh || [undefined, undefined];
	                if (!this._pullToRefresh[1]) {
	                    this._pullToRefresh[1] = {
	                        state: PullToRefreshState.HIDDEN,
	                        prevState: PullToRefreshState.HIDDEN,
	                        footer: true
	                    };
	                }
	                this._pullToRefresh[1].node = options.pullToRefreshFooter;
	            }
	            else if (!this.options.pullToRefreshFooter && this._pullToRefresh) {
	                this._pullToRefresh[1] = undefined;
	            }
	            if (this._pullToRefresh && !this._pullToRefresh[0] && !this._pullToRefresh[1]) {
	                this._pullToRefresh = undefined;
	            }
	        }
	        return this;
	    };
	
	    /**
	     * Sets the data-source (alias for setDataSource).
	     *
	     * This function is a shim provided for compatibility with the stock famo.us Scrollview.
	     *
	     * @param {Array|ViewSequence} node Either an array of renderables or a Famous viewSequence.
	     * @return {FlexScrollView} this
	     */
	    FlexScrollView.prototype.sequenceFrom = function(node) {
	        return this.setDataSource(node);
	    };
	
	    /**
	     * Returns the index of the first visible renderable.
	     *
	     * This function is a shim provided for compatibility with the stock famo.us Scrollview.
	     *
	     * @return {Number} The current index of the ViewSequence
	     */
	    FlexScrollView.prototype.getCurrentIndex = function() {
	        var item = this.getFirstVisibleItem();
	        return item ? item.viewSequence.getIndex() : -1;
	    };
	
	    /**
	     * Paginates the Scrollview to an absolute page index. This function is a shim provided
	     * for compatibility with the stock famo.us Scrollview.
	     *
	     * @param {Number} index view-sequence index to go to.
	     * @param {Bool} [noAnimation] When set to true, immediately shows the node without scrolling animation.
	     * @return {FlexScrollView} this
	     */
	    FlexScrollView.prototype.goToPage = function(index, noAnimation) {
	        var viewSequence = this._viewSequence;
	        if (!viewSequence) {
	            return this;
	        }
	        while (viewSequence.getIndex() < index) {
	            viewSequence = viewSequence.getNext();
	            if (!viewSequence) {
	                return this;
	            }
	        }
	        while (viewSequence.getIndex() > index) {
	            viewSequence = viewSequence.getPrevious();
	            if (!viewSequence) {
	                return this;
	            }
	        }
	        this.goToRenderNode(viewSequence.get(), noAnimation);
	        return this;
	    };
	
	    /**
	     * Returns the offset associated with the Scrollview instance's current node
	     * (generally the node currently at the top).
	     *
	     * This function is a shim provided for compatibility with the stock famo.us Scrollview.
	     *
	     * @return {number} The position of either the specified node, or the Scrollview's current Node,
	     * in pixels translated.
	     */
	    FlexScrollView.prototype.getOffset = function() {
	        return this._scrollOffsetCache;
	    };
	
	    /**
	     * Returns the position associated with the Scrollview instance's current node
	     * (generally the node currently at the top).
	     *
	     * This function is a shim provided for compatibility with the stock famo.us Scrollview.
	     *
	     * @deprecated
	     * @param {number} [node] If specified, returns the position of the node at that index in the
	     * Scrollview instance's currently managed collection.
	     * @return {number} The position of either the specified node, or the Scrollview's current Node,
	     * in pixels translated.
	     */
	    FlexScrollView.prototype.getPosition = FlexScrollView.prototype.getOffset;
	
	    /**
	     * Returns the absolute position associated with the Scrollview instance.
	     *
	     * This function is a shim provided for compatibility with the stock famo.us Scrollview.
	     *
	     * @return {number} The position of the Scrollview's current Node, in pixels translated.
	     */
	    FlexScrollView.prototype.getAbsolutePosition = function() {
	        return -(this._scrollOffsetCache + this._scroll.groupStart);
	    };
	
	    /**
	     * Helper function for setting the pull-to-refresh status.
	     */
	    function _setPullToRefreshState(pullToRefresh, state) {
	        if (pullToRefresh.state !== state) {
	            pullToRefresh.state = state;
	            if (pullToRefresh.node && pullToRefresh.node.setPullToRefreshStatus) {
	                pullToRefresh.node.setPullToRefreshStatus(state);
	            }
	        }
	    }
	
	    /**
	     * Helper function for getting the pull-to-refresh data.
	     */
	    function _getPullToRefresh(footer) {
	        return this._pullToRefresh ? this._pullToRefresh[footer ? 1 : 0] : undefined;
	    }
	
	    /**
	     * Post-layout function that adds the pull-to-refresh renderables.
	     * @private
	     */
	    FlexScrollView.prototype._postLayout = function(size, scrollOffset) {
	
	        // Exit immediately when pull to refresh is not configured
	        if (!this._pullToRefresh) {
	            return;
	        }
	
	        // Adjust scroll-offset for alignment
	        if (this.options.alignment) {
	            scrollOffset += size[this._direction];
	        }
	
	        // Prepare
	        var prevHeight;
	        var nextHeight;
	        var totalHeight;
	
	        // Show/activate pull to refresh renderables
	        for (var i = 0; i < 2 ; i++) {
	            var pullToRefresh = this._pullToRefresh[i];
	            if (pullToRefresh) {
	
	                // Calculate offset
	                var length = pullToRefresh.node.getSize()[this._direction];
	                var pullLength = pullToRefresh.node.getPullToRefreshSize ? pullToRefresh.node.getPullToRefreshSize()[this._direction] : length;
	                var offset;
	                if (!pullToRefresh.footer) {
	                    // header
	                    prevHeight = this._calcScrollHeight(false);
	                    prevHeight = (prevHeight === undefined) ? -1 : prevHeight;
	                    offset = (prevHeight >= 0) ? (scrollOffset - prevHeight) : prevHeight;
	                    if (this.options.alignment) {
	                        nextHeight = this._calcScrollHeight(true);
	                        nextHeight = (nextHeight === undefined) ? -1 : nextHeight;
	                        totalHeight = ((prevHeight >= 0) && (nextHeight >= 0)) ? (prevHeight + nextHeight) : -1;
	                        if ((totalHeight >= 0) && (totalHeight < size[this._direction])) {
	                            offset = Math.round((scrollOffset - size[this._direction]) + nextHeight);
	                        }
	                    }
	                }
	                else {
	                    // footer
	                    nextHeight = (nextHeight === undefined) ? nextHeight = this._calcScrollHeight(true) : nextHeight;
	                    nextHeight = (nextHeight === undefined) ? -1 : nextHeight;
	                    offset = (nextHeight >= 0) ? (scrollOffset + nextHeight) : (size[this._direction] + 1);
	                    if (!this.options.alignment) {
	                        prevHeight = (prevHeight === undefined) ? this._calcScrollHeight(false) : prevHeight;
	                        prevHeight = (prevHeight === undefined) ? -1 : prevHeight;
	                        totalHeight = ((prevHeight >= 0) && (nextHeight >= 0)) ? (prevHeight + nextHeight) : -1;
	                        if ((totalHeight >= 0) && (totalHeight < size[this._direction])) {
	                            offset = Math.round((scrollOffset - prevHeight) + size[this._direction]);
	                        }
	                    }
	                    offset = -(offset - size[this._direction]);
	                }
	
	                // Determine current state
	                var visiblePerc = Math.max(Math.min(offset / pullLength, 1), 0);
	                switch (pullToRefresh.state) {
	                    case PullToRefreshState.HIDDEN:
	                        if (this._scroll.scrollForceCount) {
	                            if (visiblePerc >= 1) {
	                                _setPullToRefreshState(pullToRefresh, PullToRefreshState.ACTIVE);
	                            }
	                            else if (offset >= 0.2) {
	                                _setPullToRefreshState(pullToRefresh, PullToRefreshState.PULLING);
	                            }
	                        }
	                        break;
	                    case PullToRefreshState.PULLING:
	                        if (this._scroll.scrollForceCount && (visiblePerc >= 1)) {
	                            _setPullToRefreshState(pullToRefresh, PullToRefreshState.ACTIVE);
	                        }
	                        else if (offset < 0.2) {
	                            _setPullToRefreshState(pullToRefresh, PullToRefreshState.HIDDEN);
	                        }
	                        break;
	                    case PullToRefreshState.ACTIVE:
	                        // nothing to do, wait for completed
	                        break;
	                    case PullToRefreshState.COMPLETED:
	                        if (!this._scroll.scrollForceCount) {
	                            if (offset >= 0.2) {
	                                _setPullToRefreshState(pullToRefresh, PullToRefreshState.HIDDING);
	                            }
	                            else {
	                                _setPullToRefreshState(pullToRefresh, PullToRefreshState.HIDDEN);
	                            }
	                        }
	                        break;
	                    case PullToRefreshState.HIDDING:
	                        if (offset < 0.2) {
	                            _setPullToRefreshState(pullToRefresh, PullToRefreshState.HIDDEN);
	                        }
	                        break;
	                }
	
	                // Show pull to refresh node
	                if (pullToRefresh.state !== PullToRefreshState.HIDDEN) {
	                    var contextNode = {
	                        renderNode: pullToRefresh.node,
	                        prev: !pullToRefresh.footer,
	                        next: pullToRefresh.footer,
	                        index: !pullToRefresh.footer ? --this._nodes._contextState.prevGetIndex : ++this._nodes._contextState.nextGetIndex
	                    };
	                    var scrollLength;
	                    if (pullToRefresh.state === PullToRefreshState.ACTIVE) {
	                        scrollLength = length;
	                    }
	                    else if (this._scroll.scrollForceCount) {
	                        scrollLength = Math.min(offset, length);
	                    }
	                    var set = {
	                        size: [size[0], size[1]],
	                        translate: [0, 0, -1e-3], // transform.behind
	                        scrollLength: scrollLength
	                    };
	                    set.size[this._direction] = Math.max(Math.min(offset, pullLength), 0);
	                    set.translate[this._direction] = pullToRefresh.footer ? (size[this._direction] - length) : 0;
	                    this._nodes._context.set(contextNode, set);
	                }
	            }
	        }
	    };
	
	    /**
	     * Shows the pulls-to-refresh renderable indicating that a refresh is in progress.
	     *
	     * @param {Bool} [footer] set to true to show pull-to-refresh at the footer (default: false).
	     * @return {FlexScrollView} this
	     */
	    FlexScrollView.prototype.showPullToRefresh = function(footer) {
	        var pullToRefresh = _getPullToRefresh.call(this, footer);
	        if (pullToRefresh) {
	            _setPullToRefreshState(pullToRefresh, PullToRefreshState.ACTIVE);
	            this._scroll.scrollDirty = true;
	        }
	    };
	
	    /**
	     * Hides the pull-to-refresh renderable in case it was visible.
	     *
	     * @param {Bool} [footer] set to true to hide the pull-to-refresh at the footer (default: false).
	     * @return {FlexScrollView} this
	     */
	    FlexScrollView.prototype.hidePullToRefresh = function(footer) {
	        var pullToRefresh = _getPullToRefresh.call(this, footer);
	        if (pullToRefresh && (pullToRefresh.state === PullToRefreshState.ACTIVE)) {
	            _setPullToRefreshState(pullToRefresh, PullToRefreshState.COMPLETED);
	            this._scroll.scrollDirty = true;
	        }
	        return this;
	    };
	
	    /**
	     * Get the visible state of the pull-to-refresh renderable.
	     *
	     * @param {Bool} [footer] set to true to get the state of the pull-to-refresh footer (default: false).
	     */
	    FlexScrollView.prototype.isPullToRefreshVisible = function(footer) {
	        var pullToRefresh = _getPullToRefresh.call(this, footer);
	        return pullToRefresh ? (pullToRefresh.state === PullToRefreshState.ACTIVE) : false;
	    };
	
	    /**
	     * Delegates any scroll force to leading/trailing scrollviews.
	     * @private
	     */
	    FlexScrollView.prototype.applyScrollForce = function(delta) {
	        var leadingScrollView = this.options.leadingScrollView;
	        var trailingScrollView = this.options.trailingScrollView;
	        if (!leadingScrollView && !trailingScrollView) {
	            return ScrollController.prototype.applyScrollForce.call(this, delta);
	        }
	        var partialDelta;
	        if (delta < 0) {
	            if (leadingScrollView) {
	                partialDelta = leadingScrollView.canScroll(delta);
	                this._leadingScrollViewDelta += partialDelta;
	                leadingScrollView.applyScrollForce(partialDelta);
	                delta -= partialDelta;
	            }
	            if (trailingScrollView) {
	                partialDelta = this.canScroll(delta);
	                ScrollController.prototype.applyScrollForce.call(this, partialDelta);
	                this._thisScrollViewDelta += partialDelta;
	                delta -= partialDelta;
	                trailingScrollView.applyScrollForce(delta);
	                this._trailingScrollViewDelta += delta;
	            }
	            else {
	                ScrollController.prototype.applyScrollForce.call(this, delta);
	                this._thisScrollViewDelta += delta;
	            }
	        }
	        else {
	            if (trailingScrollView) {
	                partialDelta = trailingScrollView.canScroll(delta);
	                trailingScrollView.applyScrollForce(partialDelta);
	                this._trailingScrollViewDelta += partialDelta;
	                delta -= partialDelta;
	            }
	            if (leadingScrollView) {
	                partialDelta = this.canScroll(delta);
	                ScrollController.prototype.applyScrollForce.call(this, partialDelta);
	                this._thisScrollViewDelta += partialDelta;
	                delta -= partialDelta;
	                leadingScrollView.applyScrollForce(delta);
	                this._leadingScrollViewDelta += delta;
	            }
	            else {
	                ScrollController.prototype.applyScrollForce.call(this, delta);
	                this._thisScrollViewDelta += delta;
	            }
	        }
	        return this;
	    };
	
	    /**
	     * Delegates any scroll force to leading/trailing scrollviews.
	     * @private
	     */
	    FlexScrollView.prototype.updateScrollForce = function(prevDelta, newDelta) {
	        var leadingScrollView = this.options.leadingScrollView;
	        var trailingScrollView = this.options.trailingScrollView;
	        if (!leadingScrollView && !trailingScrollView) {
	            return ScrollController.prototype.updateScrollForce.call(this, prevDelta, newDelta);
	        }
	        var partialDelta;
	        var delta = newDelta - prevDelta;
	        if (delta < 0) {
	            if (leadingScrollView) {
	                partialDelta = leadingScrollView.canScroll(delta);
	                leadingScrollView.updateScrollForce(this._leadingScrollViewDelta, this._leadingScrollViewDelta + partialDelta);
	                this._leadingScrollViewDelta += partialDelta;
	                delta -= partialDelta;
	            }
	            if (trailingScrollView && delta) {
	                partialDelta = this.canScroll(delta);
	                ScrollController.prototype.updateScrollForce.call(this, this._thisScrollViewDelta, this._thisScrollViewDelta + partialDelta);
	                this._thisScrollViewDelta += partialDelta;
	                delta -= partialDelta;
	                this._trailingScrollViewDelta += delta;
	                trailingScrollView.updateScrollForce(this._trailingScrollViewDelta, this._trailingScrollViewDelta + delta);
	            }
	            else if (delta) {
	                ScrollController.prototype.updateScrollForce.call(this, this._thisScrollViewDelta, this._thisScrollViewDelta + delta);
	                this._thisScrollViewDelta += delta;
	            }
	        }
	        else {
	            if (trailingScrollView) {
	                partialDelta = trailingScrollView.canScroll(delta);
	                trailingScrollView.updateScrollForce(this._trailingScrollViewDelta, this._trailingScrollViewDelta + partialDelta);
	                this._trailingScrollViewDelta += partialDelta;
	                delta -= partialDelta;
	            }
	            if (leadingScrollView) {
	                partialDelta = this.canScroll(delta);
	                ScrollController.prototype.updateScrollForce.call(this, this._thisScrollViewDelta, this._thisScrollViewDelta + partialDelta);
	                this._thisScrollViewDelta += partialDelta;
	                delta -= partialDelta;
	                leadingScrollView.updateScrollForce(this._leadingScrollViewDelta, this._leadingScrollViewDelta + delta);
	                this._leadingScrollViewDelta += delta;
	            }
	            else {
	                ScrollController.prototype.updateScrollForce.call(this, this._thisScrollViewDelta, this._thisScrollViewDelta + delta);
	                this._thisScrollViewDelta += delta;
	            }
	        }
	        return this;
	    };
	
	    /**
	     * Delegates any scroll force to leading/trailing scrollviews.
	     * @private
	     */
	    FlexScrollView.prototype.releaseScrollForce = function(delta, velocity) {
	        var leadingScrollView = this.options.leadingScrollView;
	        var trailingScrollView = this.options.trailingScrollView;
	        if (!leadingScrollView && !trailingScrollView) {
	            return ScrollController.prototype.releaseScrollForce.call(this, delta, velocity);
	        }
	        var partialDelta;
	        if (delta < 0) {
	            if (leadingScrollView) {
	                partialDelta = Math.max(this._leadingScrollViewDelta, delta);
	                this._leadingScrollViewDelta -= partialDelta;
	                delta -= partialDelta;
	                leadingScrollView.releaseScrollForce(this._leadingScrollViewDelta, delta ? 0 : velocity);
	            }
	            if (trailingScrollView) {
	                partialDelta = Math.max(this._thisScrollViewDelta, delta);
	                this._thisScrollViewDelta -= partialDelta;
	                delta -= partialDelta;
	                ScrollController.prototype.releaseScrollForce.call(this, this._thisScrollViewDelta, delta ? 0 : velocity);
	                this._trailingScrollViewDelta -= delta;
	                trailingScrollView.releaseScrollForce(this._trailingScrollViewDelta, delta ? velocity : 0);
	            }
	            else {
	                this._thisScrollViewDelta -= delta;
	                ScrollController.prototype.releaseScrollForce.call(this, this._thisScrollViewDelta, delta ? velocity : 0);
	            }
	        }
	        else {
	            if (trailingScrollView) {
	                partialDelta = Math.min(this._trailingScrollViewDelta, delta);
	                this._trailingScrollViewDelta -= partialDelta;
	                delta -= partialDelta;
	                trailingScrollView.releaseScrollForce(this._trailingScrollViewDelta, delta ? 0 : velocity);
	            }
	            if (leadingScrollView) {
	                partialDelta = Math.min(this._thisScrollViewDelta, delta);
	                this._thisScrollViewDelta -= partialDelta;
	                delta -= partialDelta;
	                ScrollController.prototype.releaseScrollForce.call(this, this._thisScrollViewDelta, delta ? 0 : velocity);
	                this._leadingScrollViewDelta -= delta;
	                leadingScrollView.releaseScrollForce(this._leadingScrollViewDelta, delta ? velocity : 0);
	            }
	            else {
	                this._thisScrollViewDelta -= delta;
	                ScrollController.prototype.updateScrollForce.call(this, this._thisScrollViewDelta, delta ? velocity : 0);
	            }
	        }
	        return this;
	    };
	
	    /**
	     * Overriden commit, in order to emit pull-to-refresh event after
	     * all the rendering has been done.
	     * @private
	     */
	    FlexScrollView.prototype.commit = function(context) {
	
	        // Call base class
	        var result = ScrollController.prototype.commit.call(this, context);
	
	        // Emit pull to refresh events after the whole commit call has been executed
	        // so that when the refresh event is received, the FlexScrollView is in a valid state
	        // and can be queried.
	        if (this._pullToRefresh) {
	            for (var i = 0; i < 2; i++) {
	                var pullToRefresh = this._pullToRefresh[i];
	                if (pullToRefresh) {
	                    if ((pullToRefresh.state === PullToRefreshState.ACTIVE) &&
	                        (pullToRefresh.prevState !== PullToRefreshState.ACTIVE)) {
	                        this._eventOutput.emit('refresh', {
	                            target: this,
	                            footer: pullToRefresh.footer
	                        });
	                    }
	                    pullToRefresh.prevState = pullToRefresh.state;
	                }
	            }
	        }
	        return result;
	    };
	
	    module.exports = FlexScrollView;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 17 */
/*!*********************************************!*\
  !*** ../~/famous-flex/src/LayoutUtility.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014
	 */
	
	/*global console*/
	/*eslint no-console:0*/
	
	/**
	 * Utility class for famous-flex.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var Utility = __webpack_require__(/*! famous/utilities/Utility */ 34);
	
	    /**
	     * @class
	     * @alias module:LayoutUtility
	     */
	    function LayoutUtility() {
	    }
	    LayoutUtility.registeredHelpers = {};
	
	    var Capabilities = {
	        SEQUENCE: 1,
	        DIRECTION_X: 2,
	        DIRECTION_Y: 4,
	        SCROLLING: 8
	    };
	    LayoutUtility.Capabilities = Capabilities;
	
	    /**
	     *  Normalizes the margins argument.
	     *
	     *  @param {Array.Number} margins
	     */
	    LayoutUtility.normalizeMargins = function(margins) {
	        if (!margins) {
	            return [0, 0, 0, 0];
	        }
	        else if (!Array.isArray(margins)) {
	            return [margins, margins, margins, margins];
	        }
	        else if (margins.length === 0) {
	            return [0, 0, 0, 0];
	        }
	        else if (margins.length === 1) {
	            return [margins[0], margins[0], margins[0], margins[0]];
	        }
	        else if (margins.length === 2) {
	            return [margins[0], margins[1], margins[0], margins[1]];
	        }
	        else {
	            return margins;
	        }
	    };
	
	    /**
	     * Makes a (shallow) copy of a spec.
	     *
	     * @param {Spec} spec Spec to clone
	     * @return {Spec} cloned spec
	     */
	    LayoutUtility.cloneSpec = function(spec) {
	        var clone = {};
	        if (spec.opacity !== undefined) {
	            clone.opacity = spec.opacity;
	        }
	        if (spec.size !== undefined) {
	            clone.size = spec.size.slice(0);
	        }
	        if (spec.transform !== undefined) {
	            clone.transform = spec.transform.slice(0);
	        }
	        if (spec.origin !== undefined) {
	            clone.origin = spec.origin.slice(0);
	        }
	        if (spec.align !== undefined) {
	            clone.align = spec.align.slice(0);
	        }
	        return clone;
	    };
	
	    /**
	     * Compares two arrays for equality.
	     */
	    function _isEqualArray(a, b) {
	        if (a === b) {
	            return true;
	        }
	        if ((a === undefined) || (b === undefined)) {
	            return false;
	        }
	        var i = a.length;
	        if (i !== b.length){
	            return false;
	        }
	        while (i--) {
	            if (a[i] !== b[i]) {
	                return false;
	            }
	        }
	        return true;
	    }
	
	    /**
	     * Compares two specs for equality.
	     *
	     * @param {Spec} spec1 Spec to compare
	     * @param {Spec} spec2 Spec to compare
	     * @return {Boolean} true/false
	     */
	    LayoutUtility.isEqualSpec = function(spec1, spec2) {
	        if (spec1.opacity !== spec2.opacity) {
	            return false;
	        }
	        if (!_isEqualArray(spec1.size, spec2.size)) {
	            return false;
	        }
	        if (!_isEqualArray(spec1.transform, spec2.transform)) {
	            return false;
	        }
	        if (!_isEqualArray(spec1.origin, spec2.origin)) {
	            return false;
	        }
	        if (!_isEqualArray(spec1.align, spec2.align)) {
	            return false;
	        }
	        return true;
	    };
	
	    /**
	     * Helper function that returns a string containing the differences
	     * between two specs.
	     *
	     * @param {Spec} spec1 Spec to compare
	     * @param {Spec} spec2 Spec to compare
	     * @return {String} text
	     */
	    LayoutUtility.getSpecDiffText = function(spec1, spec2) {
	        var result = 'spec diff:';
	        if (spec1.opacity !== spec2.opacity) {
	            result += '\nopacity: ' + spec1.opacity + ' != ' + spec2.opacity;
	        }
	        if (!_isEqualArray(spec1.size, spec2.size)) {
	            result += '\nsize: ' + JSON.stringify(spec1.size) + ' != ' + JSON.stringify(spec2.size);
	        }
	        if (!_isEqualArray(spec1.transform, spec2.transform)) {
	            result += '\ntransform: ' + JSON.stringify(spec1.transform) + ' != ' + JSON.stringify(spec2.transform);
	        }
	        if (!_isEqualArray(spec1.origin, spec2.origin)) {
	            result += '\norigin: ' + JSON.stringify(spec1.origin) + ' != ' + JSON.stringify(spec2.origin);
	        }
	        if (!_isEqualArray(spec1.align, spec2.align)) {
	            result += '\nalign: ' + JSON.stringify(spec1.align) + ' != ' + JSON.stringify(spec2.align);
	        }
	        return result;
	    };
	
	    /**
	     * Helper function to call whenever a critical error has occurred.
	     *
	     * @param {String} message error-message
	     */
	    LayoutUtility.error = function(message) {
	        console.log('ERROR: ' + message);
	        throw message;
	    };
	
	    /**
	     * Helper function to call whenever a warning error has occurred.
	     *
	     * @param {String} message warning-message
	     */
	    LayoutUtility.warning = function(message) {
	        console.log('WARNING: ' + message);
	    };
	
	    /**
	     * Helper function to log 1 or more arguments. All the arguments
	     * are concatenated to produce a single string which is logged.
	     *
	     * @param {String|Array|Object} args arguments to stringify and concatenate
	     */
	    LayoutUtility.log = function(args) {
	        var message = '';
	        for (var i = 0; i < arguments.length; i++) {
	            var arg = arguments[i];
	            if ((arg instanceof Object) || (arg instanceof Array)) {
	                message += JSON.stringify(arg);
	            }
	            else {
	                message += arg;
	            }
	        }
	        console.log(message);
	    };
	
	    /**
	     * Combines two sets of options into a single set.
	     *
	     * @param {Object} options1 base set of options
	     * @param {Object} options2 set of options to merge into `options1`
	     * @param {Bool} [forceClone] ensures that a clone is returned rather that one of the original options objects
	     * @return {Object} Combined options
	     */
	    LayoutUtility.combineOptions = function(options1, options2, forceClone) {
	        if (options1 && !options2 && !forceClone) {
	            return options1;
	        }
	        else if (!options1 && options2 && !forceClone) {
	            return options2;
	        }
	        var options = Utility.clone(options1 || {});
	        if (options2) {
	            for (var key in options2) {
	                options[key] = options2[key];
	            }
	        }
	        return options;
	    };
	
	    /**
	     * Registers a layout-helper so it can be used as a layout-literal for
	     * a layout-controller. The LayoutHelper instance must support the `parse`
	     * function, which is fed the layout-literal content.
	     *
	     * **Example:**
	     *
	     * ```javascript
	     * Layout.registerHelper('dock', LayoutDockHelper);
	     *
	     * var layoutController = new LayoutController({
	     *   layout: { dock: [,
	     *     ['top', 'header', 50],
	     *     ['bottom', 'footer', 50],
	     *     ['fill', 'content'],
	     *   ]},
	     *   dataSource: {
	     *     header: new Surface({content: 'Header'}),
	     *     footer: new Surface({content: 'Footer'}),
	     *     content: new Surface({content: 'Content'}),
	     *   }
	     * })
	     * ```
	     *
	     * @param {String} name name of the helper (e.g. 'dock')
	     * @param {Function} Helper Helper to register (e.g. LayoutDockHelper)
	     */
	    LayoutUtility.registerHelper = function(name, Helper) {
	        if (!Helper.prototype.parse) {
	            LayoutUtility.error('The layout-helper for name "' + name + '" is required to support the "parse" method');
	        }
	        if (this.registeredHelpers[name] !== undefined) {
	            LayoutUtility.warning('A layout-helper with the name "' + name + '" is already registered and will be overwritten');
	        }
	        this.registeredHelpers[name] = Helper;
	    };
	
	    /**
	     * Unregisters a layout-helper.
	     *
	     * @param {String} name name of the layout-helper
	     */
	    LayoutUtility.unregisterHelper = function(name) {
	        delete this.registeredHelpers[name];
	    };
	
	    /**
	     * Gets a registered layout-helper by its name.
	     *
	     * @param {String} name name of the layout-helper
	     * @return {Function} layout-helper or undefined
	     */
	    LayoutUtility.getRegisteredHelper = function(name) {
	        return this.registeredHelpers[name];
	    };
	
	    // Layout function
	    module.exports = LayoutUtility;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 18 */
/*!********************************************************!*\
  !*** ../~/famous-flex/src/helpers/LayoutDockHelper.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014 - 2015
	 */
	
	/**
	 * LayoutDockHelper helps positioning nodes using docking principles.
	 *
	 * **Example:**
	 *
	 * ```javascript
	 * var LayoutDockHelper = require('famous-flex/helpers/LayoutDockHelper');
	 *
	 * function HeaderFooterLayout(context, options) {
	 *   var dock = new LayoutDockHelper(context);
	 *   dock.top('header', options.headerSize);
	 *   dock.bottom('footer', options.footerSize);
	 *   dock.fill('content');
	 * };
	 * ```
	 *
	 * You can also use layout-literals to create layouts using docking semantics:
	 *
	 * ```javascript
	 * var layoutController = new LayoutController({
	 *   layout: {dock: [
	 *     ['top', 'header', 40],
	 *     ['bottom', 'footer', 40, 1], // z-index +1
	 *     ['fill', 'content']
	 *   ]},
	 *   dataSource: {
	 *     header: new Surface({content: 'header'}),
	 *     footer: new Surface({content: 'footer'}),
	 *     content: new Surface({content: 'content'}),
	 *   }
	 * });
	 * ```
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var LayoutUtility = __webpack_require__(/*! ../LayoutUtility */ 17);
	
	    /**
	     * @class
	     * @param {LayoutContext} context layout-context
	     * @param {Object} [options] additional options
	     * @param {Object} [options.margins] margins to start out with (default: 0px)
	     * @param {Number} [options.translateZ] z-index to use when translating objects (default: 0)
	     * @alias module:LayoutDockHelper
	     */
	    function LayoutDockHelper(context, options) {
	        var size = context.size;
	        this._size = size;
	        this._context = context;
	        this._options = options;
	        this._z = (options && options.translateZ) ? options.translateZ : 0;
	        if (options && options.margins) {
	            var margins = LayoutUtility.normalizeMargins(options.margins);
	            this._left = margins[3];
	            this._top = margins[0];
	            this._right = size[0] - margins[1];
	            this._bottom = size[1] - margins[2];
	        }
	        else {
	            this._left = 0;
	            this._top = 0;
	            this._right = size[0];
	            this._bottom = size[1];
	        }
	    }
	
	    /**
	     * Parses the layout-rules based on a JSON data object.
	     * The object should be an array with the following syntax:
	     * `[[rule, node, value, z], [rule, node, value, z], ...]`
	     *
	     * **Example:**
	     *
	     * ```JSON
	     * [
	     *   ['top', 'header', 50],
	     *   ['bottom', 'footer', 50, 10], // z-index: 10
	     *   ['margins', [10, 5]], // marginate remaining space: 10px top/bottom, 5px left/right
	     *   ['fill', 'content']
	     * ]
	     * ```
	     *
	     * @param {Object} data JSON object
	     */
	    LayoutDockHelper.prototype.parse = function(data) {
	        for (var i = 0; i < data.length; i++) {
	            var rule = data[i];
	            var value = (rule.length >= 3) ? rule[2] : undefined;
	            if (rule[0] === 'top') {
	                this.top(rule[1], value, (rule.length >=4) ? rule[3] : undefined);
	            }
	            else if (rule[0] === 'left') {
	                this.left(rule[1], value, (rule.length >=4) ? rule[3] : undefined);
	            }
	            else if (rule[0] === 'right') {
	                this.right(rule[1], value, (rule.length >=4) ? rule[3] : undefined);
	            }
	            else if (rule[0] === 'bottom') {
	                this.bottom(rule[1], value, (rule.length >=4) ? rule[3] : undefined);
	            }
	            else if (rule[0] === 'fill') {
	                this.fill(rule[1], (rule.length >=3) ? rule[2] : undefined);
	            }
	            else if (rule[0] === 'margins') {
	                this.margins(rule[1]);
	            }
	        }
	    };
	
	    /**
	     * Dock the node to the top.
	     *
	     * @param {LayoutNode|String} [node] layout-node to dock, when omitted the `height` argument argument is used for padding
	     * @param {Number} [height] height of the layout-node, when omitted the height of the node is used
	     * @param {Number} [z] z-index to use for the node
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.top = function(node, height, z) {
	        if (height instanceof Array) {
	            height = height[1];
	        }
	        if (height === undefined) {
	            var size = this._context.resolveSize(node, [this._right - this._left, this._bottom - this._top]);
	            height = size[1];
	        }
	        this._context.set(node, {
	            size: [this._right - this._left, height],
	            origin: [0, 0],
	            align: [0, 0],
	            translate: [this._left, this._top, (z === undefined) ? this._z : z]
	        });
	        this._top += height;
	        return this;
	    };
	
	    /**
	     * Dock the node to the left
	     *
	     * @param {LayoutNode|String} [node] layout-node to dock, when omitted the `width` argument argument is used for padding
	     * @param {Number} [width] width of the layout-node, when omitted the width of the node is used
	     * @param {Number} [z] z-index to use for the node
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.left = function(node, width, z) {
	        if (width instanceof Array) {
	            width = width[0];
	        }
	        if (width === undefined) {
	            var size = this._context.resolveSize(node, [this._right - this._left, this._bottom - this._top]);
	            width = size[0];
	        }
	        this._context.set(node, {
	            size: [width, this._bottom - this._top],
	            origin: [0, 0],
	            align: [0, 0],
	            translate: [this._left, this._top, (z === undefined) ? this._z : z]
	        });
	        this._left += width;
	        return this;
	    };
	
	    /**
	     * Dock the node to the bottom
	     *
	     * @param {LayoutNode|String} [node] layout-node to dock, when omitted the `height` argument argument is used for padding
	     * @param {Number} [height] height of the layout-node, when omitted the height of the node is used
	     * @param {Number} [z] z-index to use for the node
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.bottom = function(node, height, z) {
	        if (height instanceof Array) {
	            height = height[1];
	        }
	        if (height === undefined) {
	            var size = this._context.resolveSize(node, [this._right - this._left, this._bottom - this._top]);
	            height = size[1];
	        }
	        this._context.set(node, {
	            size: [this._right - this._left, height],
	            origin: [0, 1],
	            align: [0, 1],
	            translate: [this._left, -(this._size[1] - this._bottom), (z === undefined) ? this._z : z]
	        });
	        this._bottom -= height;
	        return this;
	    };
	
	    /**
	     * Dock the node to the right.
	     *
	     * @param {LayoutNode|String} [node] layout-node to dock, when omitted the `width` argument argument is used for padding
	     * @param {Number} [width] width of the layout-node, when omitted the width of the node is used
	     * @param {Number} [z] z-index to use for the node
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.right = function(node, width, z) {
	        if (width instanceof Array) {
	            width = width[0];
	        }
	        if (node) {
	            if (width === undefined) {
	                var size = this._context.resolveSize(node, [this._right - this._left, this._bottom - this._top]);
	                width = size[0];
	            }
	            this._context.set(node, {
	                size: [width, this._bottom - this._top],
	                origin: [1, 0],
	                align: [1, 0],
	                translate: [-(this._size[0] - this._right), this._top, (z === undefined) ? this._z : z]
	            });
	        }
	        if (width) {
	            this._right -= width;
	        }
	        return this;
	    };
	
	    /**
	     * Fills the node to the remaining content.
	     *
	     * @param {LayoutNode|String} node layout-node to dock
	     * @param {Number} [z] z-index to use for the node
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.fill = function(node, z) {
	        this._context.set(node, {
	            size: [this._right - this._left, this._bottom - this._top],
	            translate: [this._left, this._top, (z === undefined) ? this._z : z]
	        });
	        return this;
	    };
	
	    /**
	     * Applies indent margins to the remaining content.
	     *
	     * @param {Number|Array} margins margins shorthand (e.g. '5', [10, 10], [5, 10, 5, 10])
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.margins = function(margins) {
	        margins = LayoutUtility.normalizeMargins(margins);
	        this._left += margins[3];
	        this._top += margins[0];
	        this._right -= margins[1];
	        this._bottom -= margins[2];
	        return this;
	    };
	
	    // Register the helper
	    LayoutUtility.registerHelper('dock', LayoutDockHelper);
	
	    module.exports = LayoutDockHelper;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 19 */
/*!**********************************************************!*\
  !*** ../~/famous-flex/src/layouts/ProportionalLayout.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2015
	 */
	
	/**
	 * Lays-out renderables sequentially based on size-ratios (similar to the stock famo.us FlexibleLayout view).
	 *
	 * |options|type|description|
	 * |---|---|---|
	 * |`ratios`|Array|Size-ratios of the renderables.|
	 *
	 * Example:
	 *
	 * ```javascript
	 * var ProportionalLayout = require('famous-flex/layouts/ProportionalLayout');
	 *
	 * var layoutController = new LayoutController({
	 *   layout: ProportionalLayout,
	 *   layoutOptions: {
	 *     ratios: [1, 1, 2, 1],      // total size: 5
	 *   },
	 *   dataSource: [
	 *     new Surface({content: 'item 1'}), // 20%
	 *     new Surface({content: 'item 2'}), // 20%
	 *     new Surface({content: 'item 3'}), // 40%
	 *     new Surface({content: 'item 4'})  // 20%
	 *   ]
	 * });
	 * ```
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var Utility = __webpack_require__(/*! famous/utilities/Utility */ 34);
	
	    // Define capabilities of this layout function
	    var capabilities = {
	        sequence: true,
	        direction: [Utility.Direction.Y, Utility.Direction.X],
	        scrolling: false
	    };
	
	    // data
	    var direction;
	    var size;
	    var ratios;
	    var total;
	    var offset;
	    var index;
	    var node;
	    var set = {
	        size: [0, 0],
	        translate: [0, 0, 0]
	    };
	
	    // Layout function
	    function ProportionalLayout(context, options) {
	
	        // init
	        size = context.size;
	        direction = context.direction;
	        ratios = options.ratios;
	        total = 0;
	
	        // Calculate total sum of ratios
	        for (index = 0; index < ratios.length; index++) {
	            total += ratios[index];
	        }
	
	        // Prepare
	        set.size[0] = size[0];
	        set.size[1] = size[1];
	        set.translate[0] = 0;
	        set.translate[1] = 0;
	
	        // Layout renderables
	        node = context.next();
	        offset = 0;
	        index = 0;
	        while (node && (index < ratios.length)) {
	
	            // Position renderable
	            set.size[direction] = ((size[direction] - offset) / total) * ratios[index];
	            set.translate[direction] = offset;
	            context.set(node, set);
	
	            // Move to next renderable
	            offset += set.size[direction];
	            total -= ratios[index];
	            index++;
	            node = context.next();
	        }
	    }
	
	    ProportionalLayout.Capabilities = capabilities;
	    module.exports = ProportionalLayout;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 20 */
/*!****************************************************!*\
  !*** ../~/famous-flex/src/layouts/NavBarLayout.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014
	 */
	
	/**
	 * Navigation-bar layout consisting of optionally left and right items and a
	 * title in the middle.
	 *
	 * When no item-width is specified, the width of the renderable itsself is used.
	 *
	 * |options|type|description|
	 * |---|---|---|
	 * |`[margins]`|Number/Array|Margins shorthand (e.g. 5, [10, 20], [2, 5, 2, 10])|
	 * |`[itemWidth]`|Number|Width of the left & right items|
	 * |`[leftItemWidth]`|Number|Width of the left items|
	 * |`[rightItemWidth]`|Number|Width of the right items|
	 * |`[itemSpacer]`|Number|Space in between items|
	 *
	 * Example:
	 *
	 * ```javascript
	 * var NavBarLayout = require('famous-flex/layouts/NavBarLayout');
	 *
	 * var layout = new LayoutController({
	 *   layout: NavBarLayout,
	 *   layoutOptions: {
	 *     margins: [5, 5, 5, 5], // margins to utilize
	 *     itemSpacer: 10,        // space in between items
	 *   },
	 *   dataSource: {
	 *     background: new Surface({properties: {backgroundColor: 'black'}}),
	 *     title: new Surface({content: 'My title'}),
	 *     leftItems:[
	 *       new Surface({
	 *         content: 'left1',
	 *         size: [100, undefined] // use fixed width
	 *       })
	 *     ],
	 *     rightItems: [
	 *       new Surface({
	 *         content: 'right1',
	 *         size: [true, undefined] // use actual width of DOM-node
	 *       }),
	 *       new Surface({
	 *         content: 'right2'
	 *         size: [true, undefined] // use actual width of DOM-node
	 *       })
	 *     ]
	 *   }
	 * });
	 * ```
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var LayoutDockHelper = __webpack_require__(/*! ../helpers/LayoutDockHelper */ 18);
	
	    // Layout function
	    module.exports = function NavBarLayout(context, options) {
	        var dock = new LayoutDockHelper(context, {
	            margins: options.margins,
	            translateZ: 1
	        });
	
	        // Position background
	        context.set('background', {size: context.size});
	
	        // Position right items
	        var node;
	        var i;
	        var rightItems = context.get('rightItems');
	        if (rightItems) {
	            for (i = 0; i < rightItems.length; i++) {
	                // dock node
	                node = context.get(rightItems[i]);
	                dock.right(node, options.rightItemWidth || options.itemWidth);
	                // spacer
	                dock.right(undefined, options.rightItemSpacer || options.itemSpacer);
	            }
	        }
	
	        // Position left item
	        var leftItems = context.get('leftItems');
	        if (leftItems) {
	            for (i = 0; i < leftItems.length; i++) {
	                // dock node
	                node = context.get(leftItems[i]);
	                dock.left(node, options.leftItemWidth || options.itemWidth);
	                // spacer
	                dock.left(undefined, options.leftItemSpacer || options.itemSpacer);
	            }
	        }
	
	        // Position title
	        dock.fill('title');
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 21 */
/*!**************************************************!*\
  !*** ../~/famous-flex/src/layouts/ListLayout.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014 - 2015
	 */
	
	/**
	 * Lays out items and optionally sticky sections from top to bottom or left to right.
	 *
	 * |options|type|description|
	 * |---|---|---|
	 * |`[itemSize]`|Number/Function|Height or width in pixels of an item (used when renderNode has no size)|
	 * |`[margins]`|Number/Array|Margins shorthand (e.g. 5, [10, 20], [2, 5, 2, 10])|
	 * |`[spacing]`|Number|Spacing between items|
	 * |`[isSectionCallback]`|Function|Callback that is called in order to check if a render-node is a section rather than a cell.|
	 *
	 * Example:
	 *
	 * ```javascript
	 * var FlexScrollView = require('famous-flex/FlexScrollView');
	 * var ListLayout = require('famous-flex/layouts/ListLayout');
	 *
	 * var scrollView = new FlexScrollView({
	 *   layout: ListLayout,
	 *   layoutOptions: {
	 *     margins: [20, 10, 20, 10],
	 *     spacing: 1,
	 *     isSectionCallback: function(renderNode) {
	 *       return renderNode.isSection;
	 *     },
	 *   },
	 *   dataSource: [
	 *     // first section
	 *     _createSection(),
	 *     _createCell(),
	 *     _createCell(),
	 *     // second section
	 *     _createSection(),
	 *     _createCell(),
	 *   ]
	 * });
	 * this.add(scrollView);
	 *
	 * function _createCell() {
	 *   return new Surface({
	 *     size: [undefined, 50],
	 *     content: 'my cell'
	 *   });
	 * }
	 *
	 * function _createSection() {
	 *   var section = new Surface({
	 *     size: [undefined, 30],
	 *     content: 'my sticky section'
	 *   });
	 *   section.isSection = true; // mark renderNode as section
	 *   return section;
	 * }
	 * ```
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var Utility = __webpack_require__(/*! famous/utilities/Utility */ 34);
	    var LayoutUtility = __webpack_require__(/*! ../LayoutUtility */ 17);
	
	    // Define capabilities of this layout function
	    var capabilities = {
	        sequence: true,
	        direction: [Utility.Direction.Y, Utility.Direction.X],
	        scrolling: true,
	        trueSize: true,
	        sequentialScrollingOptimized: true
	    };
	
	    // Data
	    var set = {
	        size: [0, 0],
	        translate: [0, 0, 0],
	        scrollLength: undefined
	    };
	    var margin = [0, 0];
	
	    // Layout function
	    function ListLayout(context, options) {
	
	        // Local data
	        var size = context.size;
	        var direction = context.direction;
	        var alignment = context.alignment;
	        var revDirection = direction ? 0 : 1;
	        var offset;
	        var margins = LayoutUtility.normalizeMargins(options.margins);
	        var spacing = options.spacing || 0;
	        var node;
	        var nodeSize;
	        var itemSize;
	        var getItemSize;
	        var lastSectionBeforeVisibleCell;
	        var lastSectionBeforeVisibleCellOffset;
	        var lastSectionBeforeVisibleCellLength;
	        var lastSectionBeforeVisibleCellScrollLength;
	        var lastSectionBeforeVisibleCellTopReached;
	        var firstVisibleCell;
	        var lastNode;
	        var lastCellOffsetInFirstVisibleSection;
	        var isSectionCallback = options.isSectionCallback;
	        var bound;
	
	        //
	        // reset size & translation
	        //
	        set.size[0] = size[0];
	        set.size[1] = size[1];
	        set.size[revDirection] -= (margins[1 - revDirection] + margins[3 - revDirection]);
	        set.translate[0] = 0;
	        set.translate[1] = 0;
	        set.translate[2] = 0;
	        set.translate[revDirection] = margins[direction ? 3 : 0];
	
	        //
	        // Determine item-size or use true=size
	        //
	        if ((options.itemSize === true) || !options.hasOwnProperty('itemSize')) {
	            itemSize = true;
	        }
	        else if (options.itemSize instanceof Function) {
	            getItemSize = options.itemSize;
	        }
	        else {
	            itemSize = (options.itemSize === undefined) ? size[direction] : options.itemSize;
	        }
	
	        //
	        // Determine leading/trailing margins
	        //
	        margin[0] = margins[direction ? 0 : 3];
	        margin[1] = -margins[direction ? 2 : 1];
	
	        //
	        // Process all next nodes
	        //
	        offset = context.scrollOffset + margin[alignment];
	        bound = context.scrollEnd + margin[alignment];
	        while (offset < (bound + spacing)) {
	            lastNode = node;
	            node = context.next();
	            if (!node) {
	                break;
	            }
	
	            //
	            // Get node size
	            //
	            nodeSize = getItemSize ? getItemSize(node.renderNode) : itemSize;
	            nodeSize = (nodeSize === true) ? context.resolveSize(node, size)[direction] : nodeSize;
	
	            //
	            // Position node
	            //
	            set.size[direction] = nodeSize;
	            set.translate[direction] = offset + (alignment ? spacing : 0);
	            set.scrollLength = nodeSize + spacing;
	            context.set(node, set);
	            offset += set.scrollLength;
	
	            //
	            // Keep track of the last section before the first visible cell
	            //
	            if (isSectionCallback && isSectionCallback(node.renderNode)) {
	                if ((set.translate[direction] <= margin[0]) && !lastSectionBeforeVisibleCellTopReached) {
	                    lastSectionBeforeVisibleCellTopReached = true;
	                    set.translate[direction] = margin[0];
	                    context.set(node, set);
	                }
	                if (!firstVisibleCell) {
	                    lastSectionBeforeVisibleCell = node;
	                    lastSectionBeforeVisibleCellOffset = offset - nodeSize;
	                    lastSectionBeforeVisibleCellLength = nodeSize;
	                    lastSectionBeforeVisibleCellScrollLength = nodeSize;
	                }
	                else if (lastCellOffsetInFirstVisibleSection === undefined) {
	                    lastCellOffsetInFirstVisibleSection = offset - nodeSize;
	                }
	            }
	            else if (!firstVisibleCell && (offset >= 0)) {
	                firstVisibleCell = node;
	            }
	        }
	        if (lastNode && !node && !alignment) {
	            set.scrollLength = nodeSize + margin[0] + -margin[1];
	            context.set(lastNode, set);
	        }
	
	        //
	        // Process previous nodes
	        //
	        lastNode = undefined;
	        node = undefined;
	        offset = context.scrollOffset + margin[alignment];
	        bound = context.scrollStart + margin[alignment];
	        while (offset > (bound - spacing)) {
	            lastNode = node;
	            node = context.prev();
	            if (!node) {
	                break;
	            }
	
	            //
	            // Get node size
	            //
	            nodeSize = getItemSize ? getItemSize(node.renderNode) : itemSize;
	            nodeSize = (nodeSize === true) ? context.resolveSize(node, size)[direction] : nodeSize;
	
	            //
	            // Position node
	            //
	            set.scrollLength = nodeSize + spacing;
	            offset -= set.scrollLength;
	            set.size[direction] = nodeSize;
	            set.translate[direction] = offset + (alignment ? spacing : 0);
	            context.set(node, set);
	
	            //
	            // Keep track of the last section before the first visible cell
	            //
	            if (isSectionCallback && isSectionCallback(node.renderNode)) {
	                if ((set.translate[direction] <= margin[0]) && !lastSectionBeforeVisibleCellTopReached) {
	                    lastSectionBeforeVisibleCellTopReached = true;
	                    set.translate[direction] = margin[0];
	                    context.set(node, set);
	                }
	                if (!lastSectionBeforeVisibleCell) {
	                    lastSectionBeforeVisibleCell = node;
	                    lastSectionBeforeVisibleCellOffset = offset;
	                    lastSectionBeforeVisibleCellLength = nodeSize;
	                    lastSectionBeforeVisibleCellScrollLength = set.scrollLength;
	                }
	            }
	            else if ((offset + nodeSize) >= 0) {
	                firstVisibleCell = node;
	                if (lastSectionBeforeVisibleCell) {
	                    lastCellOffsetInFirstVisibleSection = offset + nodeSize;
	                }
	                lastSectionBeforeVisibleCell = undefined;
	            }
	        }
	        if (lastNode && !node && alignment) {
	            set.scrollLength = nodeSize + margin[0] + -margin[1];
	            context.set(lastNode, set);
	            if (lastSectionBeforeVisibleCell === lastNode) {
	                lastSectionBeforeVisibleCellScrollLength = set.scrollLength;
	            }
	        }
	
	        //
	        // When no first section is in the scrollable range, then
	        // look back further in search for that section
	        //
	        if (isSectionCallback && !lastSectionBeforeVisibleCell) {
	            node = context.prev();
	            while (node) {
	                if (isSectionCallback(node.renderNode)) {
	                    lastSectionBeforeVisibleCell = node;
	                    nodeSize = options.itemSize || context.resolveSize(node, size)[direction];
	                    lastSectionBeforeVisibleCellOffset = offset - nodeSize;
	                    lastSectionBeforeVisibleCellLength = nodeSize;
	                    lastSectionBeforeVisibleCellScrollLength = undefined;
	                    break;
	                }
	                else {
	                    node = context.prev();
	                }
	            }
	        }
	
	        //
	        // Reposition "last section before first visible cell" to the top of the layout
	        //
	        if (lastSectionBeforeVisibleCell) {
	            var correctedOffset = Math.max(margin[0], lastSectionBeforeVisibleCellOffset);
	            if ((lastCellOffsetInFirstVisibleSection !== undefined) &&
	                (lastSectionBeforeVisibleCellLength > (lastCellOffsetInFirstVisibleSection - margin[0]))) {
	                correctedOffset = ((lastCellOffsetInFirstVisibleSection - lastSectionBeforeVisibleCellLength));
	            }
	            set.size[direction] = lastSectionBeforeVisibleCellLength;
	            set.translate[direction] = correctedOffset;
	            set.scrollLength = lastSectionBeforeVisibleCellScrollLength;
	            context.set(lastSectionBeforeVisibleCell, set);
	        }
	    }
	
	    ListLayout.Capabilities = capabilities;
	    ListLayout.Name = 'ListLayout';
	    ListLayout.Description = 'List-layout with margins, spacing and sticky headers';
	    module.exports = ListLayout;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 22 */
/*!********************************************************!*\
  !*** ../~/famous-flex/src/layouts/CollectionLayout.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014
	 */
	
	/*global console*/
	/*eslint no-console: 0*/
	
	/**
	 * Lays a collection of renderables from left to right or top to bottom, and when the right/bottom edge is reached,
	 * continues at the next column/row.
	 *
	 * |options|type|description|
	 * |---|---|---|
	 * |`[itemSize]`|Size/Function|Size of an item to layout or callback function which should return the size, e.g.: `function(renderNode, contextSize)`|
	 * |`[cells]`|Array.Number|Number of columns and rows: [columns, rows]. When used causes the itemSize to be calculated from the number of number of cells that should be displayed.|
	 * |`[margins]`|Number/Array|Margins shorthand (e.g. 5, [10, 20], [2, 5, 2, 10])|
	 * |`[spacing]`|Number/Array|Spacing between items (e.g. 5, [10, 10])|
	 * |`[justify]`|Bool/Array.Bool|Justify the renderables accross the width/height|
	 * |`[suppressWarnings]`|Bool|Suppresses any warnings generated by faulty configuration options|
	 *
	 * Example:
	 *
	 * ```javascript
	 * var CollectionLayout = require('famous-flex/layouts/CollectionLayout');
	 *
	 * // Create scrollable layout where items have a fixed width/height
	 * var scrollView = new FlexScrollView({
	 *   layout: CollectionLayout,
	 *   layoutOptions: {
	 *     itemSize: [100, 100],    // item has width and height of 100 pixels
	 *     margins: [10, 5, 10, 5], // outer margins
	 *     spacing: [10, 10]        // spacing between items
	 *   },
	 *   dataSource: [
	 *     new Surface({content: 'item 1'}),
	 *     new Surface({content: 'item 2'}),
	 *     new Surface({content: 'item 3'})
	 *   ]
	 * });
	 *
	 * // Create grid layout with a fixed number of columns and rows.
	 * var gridLayout = new LayoutController({
	 *   layout: CollectionLayout,
	 *   layoutOptions: {
	 *     cells: [3, 5],           // 3 columns and 5 rows
	 *     margins: [10, 5, 10, 5], // outer margins
	 *     spacing: [10, 10]        // spacing between items
	 *   },
	 *   dataSource: [
	 *     new Surface({content: 'item 1'}),
	 *     new Surface({content: 'item 2'}),
	 *     new Surface({content: 'item 3'})
	 *   ]
	 * });
	 * ```
	 *
	 * Notes:
	 *
	 * * Recall that the **`direction`** option is given to `FlexScrollView` and not
	 * the `ColllectionLayout`.  As such, it affects *scroll direction* and not
	 * *layout direction*.  With direction `Y`, items are *laid out horizontally*,
	 * but multiple rows *scroll vertically*, and this is the correct behaviour.
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var Utility = __webpack_require__(/*! famous/utilities/Utility */ 34);
	    var LayoutUtility = __webpack_require__(/*! ../LayoutUtility */ 17);
	
	    // Define capabilities of this layout function
	    var capabilities = {
	        sequence: true,
	        direction: [Utility.Direction.Y, Utility.Direction.X],
	        scrolling: true,
	        trueSize: true,
	        sequentialScrollingOptimized: true
	    };
	
	    // Prepare
	    var context;
	    var size;
	    var direction;
	    var alignment;
	    var lineDirection;
	    var lineLength;
	    var offset;
	    var margins;
	    var margin = [0, 0];
	    var spacing;
	    var justify;
	    var itemSize;
	    var getItemSize;
	    var lineNodes;
	
	    /**
	     * Lays out the renderables in a single line. Taking into account
	     * the following variables:
	     * - true-size
	     * - margins
	     * - spacing
	     * - justify
	     * - center align
	     */
	    function _layoutLine(next, endReached) {
	        if (!lineNodes.length) {
	            return 0;
	        }
	
	        // Determine size of the line
	        var i;
	        var lineSize = [0, 0];
	        var lineNode;
	        for (i = 0; i < lineNodes.length; i++) {
	            lineSize[direction] = Math.max(lineSize[direction], lineNodes[i].size[direction]);
	            lineSize[lineDirection] += ((i > 0) ? spacing[lineDirection] : 0) + lineNodes[i].size[lineDirection];
	        }
	
	        // Layout nodes from left to right or top to bottom
	        var justifyOffset = justify[lineDirection] ? ((lineLength - lineSize[lineDirection]) / (lineNodes.length * 2)) : 0;
	        var lineOffset = (direction ? margins[3] : margins[0]) + justifyOffset;
	        var scrollLength;
	        for (i = 0; i < lineNodes.length; i++) {
	            lineNode = lineNodes[i];
	            var translate = [0, 0, 0];
	            translate[lineDirection] = lineOffset;
	            translate[direction] = next ? offset : (offset - (lineSize[direction]));
	            scrollLength = 0;
	            if (i === 0) {
	                scrollLength = lineSize[direction];
	                if (endReached && ((next && !alignment) || (!next && alignment))) {
	                    scrollLength += direction ? (margins[0] + margins[2]) : (margins[3] + margins[1]);
	                }
	                else {
	                    scrollLength += spacing[direction];
	                }
	            }
	            lineNode.set = {
	                size: lineNode.size,
	                translate: translate,
	                scrollLength: scrollLength
	            };
	            lineOffset += lineNode.size[lineDirection] + spacing[lineDirection] + (justifyOffset * 2);
	        }
	
	        // Set nodes
	        for (i = 0; i < lineNodes.length; i++) {
	            lineNode = next ? lineNodes[i] : lineNodes[(lineNodes.length - 1) - i];
	            context.set(lineNode.node, lineNode.set);
	        }
	
	        // Prepare for next line
	        lineNodes = [];
	        return lineSize[direction] + spacing[direction];
	    }
	
	    /**
	     * Helper function to resolving the size of a node.
	     */
	    function _resolveNodeSize(node) {
	        var localItemSize = itemSize;
	        if (getItemSize) {
	            localItemSize = getItemSize(node.renderNode, size);
	        }
	        if ((localItemSize[0] === true) || (localItemSize[1] === true)) {
	            var result = context.resolveSize(node, size);
	            if (localItemSize[0] !== true) {
	                result[0] = itemSize[0];
	            }
	            if (localItemSize[1] !== true) {
	                result[1] = itemSize[1];
	            }
	            return result;
	        }
	        else {
	            return localItemSize;
	        }
	    }
	
	    /**
	     * Collection-layout
	     */
	    function CollectionLayout(context_, options) {
	
	        // Prepare
	        context = context_;
	        size = context.size;
	        direction = context.direction;
	        alignment = context.alignment;
	        lineDirection = (direction + 1) % 2;
	        if ((options.gutter !== undefined) && console.warn && !options.suppressWarnings) {
	            console.warn('option `gutter` has been deprecated for CollectionLayout, use margins & spacing instead');
	        }
	        if (options.gutter && !options.margins && !options.spacing) {
	            var gutter = Array.isArray(options.gutter) ? options.gutter : [options.gutter, options.gutter];
	            margins = [gutter[1], gutter[0], gutter[1], gutter[0]];
	            spacing = gutter;
	        }
	        else {
	            margins = LayoutUtility.normalizeMargins(options.margins);
	            spacing = options.spacing || 0;
	            spacing = Array.isArray(spacing) ? spacing : [spacing, spacing];
	        }
	        margin[0] = margins[direction ? 0 : 3];
	        margin[1] = -margins[direction ? 2 : 1];
	        justify = Array.isArray(options.justify) ? options.justify : (options.justify ? [true, true] : [false, false]);
	        lineLength = size[lineDirection] - (direction ? (margins[3] + margins[1]) : (margins[0] + margins[2]));
	        var node;
	        var nodeSize;
	        var lineOffset;
	        var bound;
	
	        //
	        // Prepare item-size
	        //
	        if (options.cells) {
	            if (options.itemSize && console.warn && !options.suppressWarnings) {
	                console.warn('options `cells` and `itemSize` cannot both be specified for CollectionLayout, only use one of the two');
	            }
	            itemSize = [
	                (size[0] - (margins[1] + margins[3] + (spacing[0] * (options.cells[0] - 1)))) / options.cells[0],
	                (size[1] - (margins[0] + margins[2] + (spacing[1] * (options.cells[1] - 1)))) / options.cells[1]
	            ];
	        }
	        else if (!options.itemSize) {
	            itemSize = [true, true]; // when no item-size specified, use size from renderables
	        }
	        else if (options.itemSize instanceof Function) {
	            getItemSize = options.itemSize;
	        }
	        else if ((options.itemSize[0] === undefined) || (options.itemSize[0] === undefined)){
	            // resolve 'undefined' into a fixed size
	            itemSize = [
	                (options.itemSize[0] === undefined) ? size[0] : options.itemSize[0],
	                (options.itemSize[1] === undefined) ? size[1] : options.itemSize[1]
	            ];
	        }
	        else {
	            itemSize = options.itemSize;
	        }
	
	        //
	        // Process all next nodes
	        //
	        offset = context.scrollOffset + (alignment ? 0 : margin[alignment]);
	        bound = context.scrollEnd + (alignment ? 0 : margin[alignment]);
	        lineOffset = 0;
	        lineNodes = [];
	        while (offset < bound) {
	            node = context.next();
	            if (!node) {
	                _layoutLine(true, true);
	                break;
	            }
	            nodeSize = _resolveNodeSize(node);
	            lineOffset += (lineNodes.length ? spacing[lineDirection] : 0) + nodeSize[lineDirection];
	            if (lineOffset > lineLength) {
	                offset += _layoutLine(true, !node);
	                lineOffset = nodeSize[lineDirection];
	            }
	            lineNodes.push({node: node, size: nodeSize});
	        }
	
	        //
	        // Process previous nodes
	        //
	        offset = context.scrollOffset + (alignment ? margin[alignment] : 0);
	        bound = context.scrollStart + (alignment ? margin[alignment] : 0);
	        lineOffset = 0;
	        lineNodes = [];
	        while (offset > bound) {
	            node = context.prev();
	            if (!node) {
	                _layoutLine(false, true);
	                break;
	            }
	            nodeSize = _resolveNodeSize(node);
	            lineOffset += (lineNodes.length ? spacing[lineDirection] : 0) + nodeSize[lineDirection];
	            if (lineOffset > lineLength) {
	                offset -= _layoutLine(false, !node);
	                lineOffset = nodeSize[lineDirection];
	            }
	            lineNodes.unshift({node: node, size: nodeSize});
	        }
	    }
	
	    CollectionLayout.Capabilities = capabilities;
	    CollectionLayout.Name = 'CollectionLayout';
	    CollectionLayout.Description = 'Multi-cell collection-layout with margins & spacing';
	    module.exports = CollectionLayout;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 23 */
/*!***************************************************!*\
  !*** ../~/famous-flex/src/layouts/WheelLayout.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014
	 */
	
	/**
	 * Lays out renderables in a spinner wheel (slot-machine wheel) formation.
	 *
	 * |options|type|description|
	 * |---|---|---|
	 * |`itemSize`|Size|Size (width or height) of an item to layout.|
	 * |`[diameter]`|Number|Diameter of the wheel in pixels (default: `3 x itemSize`).|
	 * |`[radialOpacity]`|Number|Opacity (0..1) at the diameter edges of the wheel (default: 1).|
	 *
	 * Example:
	 *
	 * ```javascript
	 * var ContainerSurface = require('famous/surfaces/ContainerSurface');
	 * var ScrollController = require('famous-flex/ScrollController');
	 * var WheelLayout = require('famous-flex/layouts/WheelLayout');
	 *
	 * // Create scroll-wheel
	 * var scrollWheel = new ScrollController({
	 *   layout: WheelLayout,
	 *   layoutOptions: {
	 *     itemSize: 100,      // item has height of 100 pixels
	 *     radialOpacity: 0.5  // make items at the edges more transparent
	 *   },
	 *   dataSource: [
	 *     new Surface({content: 'item 1'}),
	 *     new Surface({content: 'item 2'}),
	 *     new Surface({content: 'item 3'})
	 *   ]
	 * });
	 *
	 * // Create a container-surface for clipping and give it a nice perspective
	 * var container = new ContainerSurface({
	 *   properties: {
	 *     overflow: 'hidden'
	 *   }
	 * });
	 * container.context.setPerspective(1500);
	 * container.add(scrollWheel);
	 * ```
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var Utility = __webpack_require__(/*! famous/utilities/Utility */ 34);
	
	    // Define capabilities of this layout function
	    var capabilities = {
	        sequence: true,
	        direction: [Utility.Direction.Y, Utility.Direction.X],
	        scrolling: true,
	        trueSize: true
	    };
	
	    // Data
	    var size;
	    var direction;
	    var revDirection;
	    var node;
	    var itemSize;
	    var diameter;
	    var offset;
	    var bound;
	    var angle;
	    var radius;
	    var itemAngle;
	    var radialOpacity;
	    var set = {
	        opacity: 1,
	        size: [0, 0],
	        translate: [0, 0, 0],
	        rotate: [0, 0, 0],
	        origin: [0.5, 0.5],
	        align: [0.5, 0.5],
	        scrollLength: undefined
	    };
	
	    /**
	     * Wheel-layout
	     */
	    function WheelLayout(context, options) {
	
			//
			// Prepare
			//
			size = context.size;
			direction = context.direction;
			revDirection = direction ? 0 : 1;
			itemSize = options.itemSize || (size[direction] / 2);
			diameter = options.diameter || (itemSize * 3);
			radius = diameter / 2;
	        itemAngle = Math.atan2((itemSize / 2), radius) * 2;
	        radialOpacity = (options.radialOpacity === undefined) ? 1 : options.radialOpacity;
	
			//
	        // reset size & translation
	        //
	        set.opacity = 1;
	        set.size[0] = size[0];
	        set.size[1] = size[1];
	        set.size[revDirection] = size[revDirection];
	        set.size[direction] = itemSize;
	        set.translate[0] = 0;
	        set.translate[1] = 0;
	        set.translate[2] = 0;
	        set.rotate[0] = 0;
	        set.rotate[1] = 0;
	        set.rotate[2] = 0;
	        set.scrollLength = itemSize;
	
	        //
	        // process next nodes
	        //
	        offset = context.scrollOffset;
	        bound = (((Math.PI / 2) / itemAngle) * itemSize) + itemSize;
			while (offset <= bound) {
				node = context.next();
	            if (!node) {
					break;
	            }
	            if (offset >= -bound) {
					angle = (offset / itemSize) * itemAngle;
					set.translate[direction] = radius * Math.sin(angle);
					set.translate[2] = (radius * Math.cos(angle)) - radius;
					set.rotate[revDirection] = direction ? -angle : angle;
	                set.opacity = 1 - ((Math.abs(angle) / (Math.PI / 2)) * (1 - radialOpacity));
					context.set(node, set);
				}
				offset += itemSize;
			}
	
			//
			// process previous nodes
			//
			offset = context.scrollOffset - itemSize;
			while (offset >= -bound) {
				node = context.prev();
	            if (!node) {
					break;
	            }
	            if (offset <= bound) {
					angle = (offset / itemSize) * itemAngle;
					set.translate[direction] = radius * Math.sin(angle);
					set.translate[2] = (radius * Math.cos(angle)) - radius;
					set.rotate[revDirection] = direction ? -angle : angle;
	                set.opacity = 1 - ((Math.abs(angle) / (Math.PI / 2)) * (1 - radialOpacity));
					context.set(node, set);
				}
				offset -= itemSize;
			}
	    }
	
	    WheelLayout.Capabilities = capabilities;
	    WheelLayout.Name = 'WheelLayout';
	    WheelLayout.Description = 'Spinner-wheel/slot-machine layout';
	    module.exports = WheelLayout;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 24 */
/*!***************************************!*\
  !*** ../~/fastclick/lib/fastclick.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
		'use strict';
	
		/**
		 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
		 *
		 * @codingstandard ftlabs-jsv2
		 * @copyright The Financial Times Limited [All Rights Reserved]
		 * @license MIT License (see LICENSE.txt)
		 */
	
		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/
	
	
		/**
		 * Instantiate fast-clicking listeners on the specified layer.
		 *
		 * @constructor
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		function FastClick(layer, options) {
			var oldOnClick;
	
			options = options || {};
	
			/**
			 * Whether a click is currently being tracked.
			 *
			 * @type boolean
			 */
			this.trackingClick = false;
	
	
			/**
			 * Timestamp for when click tracking started.
			 *
			 * @type number
			 */
			this.trackingClickStart = 0;
	
	
			/**
			 * The element being tracked for a click.
			 *
			 * @type EventTarget
			 */
			this.targetElement = null;
	
	
			/**
			 * X-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartX = 0;
	
	
			/**
			 * Y-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartY = 0;
	
	
			/**
			 * ID of the last touch, retrieved from Touch.identifier.
			 *
			 * @type number
			 */
			this.lastTouchIdentifier = 0;
	
	
			/**
			 * Touchmove boundary, beyond which a click will be cancelled.
			 *
			 * @type number
			 */
			this.touchBoundary = options.touchBoundary || 10;
	
	
			/**
			 * The FastClick layer.
			 *
			 * @type Element
			 */
			this.layer = layer;
	
			/**
			 * The minimum time between tap(touchstart and touchend) events
			 *
			 * @type number
			 */
			this.tapDelay = options.tapDelay || 200;
	
			/**
			 * The maximum time for a tap
			 *
			 * @type number
			 */
			this.tapTimeout = options.tapTimeout || 700;
	
			if (FastClick.notNeeded(layer)) {
				return;
			}
	
			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function() { return method.apply(context, arguments); };
			}
	
	
			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}
	
			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}
	
			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);
	
			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function(type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};
	
				layer.addEventListener = function(type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}
	
			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {
	
				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function(event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}
	
		/**
		* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
		*
		* @type boolean
		*/
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
	
		/**
		 * Android requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS 4 requires an exception for select elements.
		 *
		 * @type boolean
		 */
		var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
	
	
		/**
		 * iOS 6.0-7.* requires the target element to be manually derived
		 *
		 * @type boolean
		 */
		var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);
	
		/**
		 * BlackBerry requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;
	
		/**
		 * Determine whether a given element requires a native click.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element needs a native click
		 */
		FastClick.prototype.needsClick = function(target) {
			switch (target.nodeName.toLowerCase()) {
	
			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}
	
				break;
			case 'input':
	
				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if ((deviceIsIOS && target.type === 'file') || target.disabled) {
					return true;
				}
	
				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
			}
	
			return (/\bneedsclick\b/).test(target.className);
		};
	
	
		/**
		 * Determine whether a given element requires a call to focus to simulate click into element.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
		 */
		FastClick.prototype.needsFocus = function(target) {
			switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
				}
	
				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/).test(target.className);
			}
		};
	
	
		/**
		 * Send a click event to the specified element.
		 *
		 * @param {EventTarget|Element} targetElement
		 * @param {Event} event
		 */
		FastClick.prototype.sendClick = function(targetElement, event) {
			var clickEvent, touch;
	
			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}
	
			touch = event.changedTouches[0];
	
			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};
	
		FastClick.prototype.determineEventType = function(targetElement) {
	
			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}
	
			return 'click';
		};
	
	
		/**
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.focus = function(targetElement) {
			var length;
	
			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};
	
	
		/**
		 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
		 *
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.updateScrollParent = function(targetElement) {
			var scrollParent, parentElement;
	
			scrollParent = targetElement.fastClickScrollParent;
	
			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}
	
					parentElement = parentElement.parentElement;
				} while (parentElement);
			}
	
			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};
	
	
		/**
		 * @param {EventTarget} targetElement
		 * @returns {Element|EventTarget}
		 */
		FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	
			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}
	
			return eventTarget;
		};
	
	
		/**
		 * On touch start, record the position and scroll offset.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchStart = function(event) {
			var targetElement, touch, selection;
	
			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}
	
			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];
	
			if (deviceIsIOS) {
	
				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}
	
				if (!deviceIsIOS4) {
	
					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}
	
					this.lastTouchIdentifier = touch.identifier;
	
					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}
	
			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;
	
			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				event.preventDefault();
			}
	
			return true;
		};
	
	
		/**
		 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.touchHasMoved = function(event) {
			var touch = event.changedTouches[0], boundary = this.touchBoundary;
	
			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Update the last position.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchMove = function(event) {
			if (!this.trackingClick) {
				return true;
			}
	
			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}
	
			return true;
		};
	
	
		/**
		 * Attempt to find the labelled control for the given label element.
		 *
		 * @param {EventTarget|HTMLLabelElement} labelElement
		 * @returns {Element|null}
		 */
		FastClick.prototype.findControl = function(labelElement) {
	
			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}
	
			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}
	
			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};
	
	
		/**
		 * On touch end, determine whether to send a click event at once.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchEnd = function(event) {
			var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
	
			if (!this.trackingClick) {
				return true;
			}
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}
	
			if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
				return true;
			}
	
			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;
	
			this.lastClickTime = event.timeStamp;
	
			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;
	
			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];
	
				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}
	
			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}
	
					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {
	
				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
					this.targetElement = null;
					return false;
				}
	
				this.focus(targetElement);
				this.sendClick(targetElement, event);
	
				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}
	
				return false;
			}
	
			if (deviceIsIOS && !deviceIsIOS4) {
	
				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}
	
			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}
	
			return false;
		};
	
	
		/**
		 * On touch cancel, stop tracking the click.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.onTouchCancel = function() {
			this.trackingClick = false;
			this.targetElement = null;
		};
	
	
		/**
		 * Determine mouse events which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onMouse = function(event) {
	
			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}
	
			if (event.forwardedTouchEvent) {
				return true;
			}
	
			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}
	
			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
	
				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {
	
					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}
	
				// Cancel the event
				event.stopPropagation();
				event.preventDefault();
	
				return false;
			}
	
			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};
	
	
		/**
		 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
		 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
		 * an actual click which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onClick = function(event) {
			var permitted;
	
			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}
	
			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}
	
			permitted = this.onMouse(event);
	
			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}
	
			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};
	
	
		/**
		 * Remove all FastClick's event listeners.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.destroy = function() {
			var layer = this.layer;
	
			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}
	
			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};
	
	
		/**
		 * Check whether FastClick is needed.
		 *
		 * @param {Element} layer The layer to listen on
		 */
		FastClick.notNeeded = function(layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;
	
			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}
	
			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (chromeVersion) {
	
				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
	
				// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}
	
			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
	
				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}
	
			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896
	
				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}
	
			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Factory method for creating a FastClick object
		 *
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		FastClick.attach = function(layer, options) {
			return new FastClick(layer, options);
		};
	
	
		if (true) {
	
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	}());


/***/ },
/* 25 */
/*!*************************************!*\
  !*** ../~/style-loader/addStyle.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function addStyle(cssCode) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(styleElement);
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = cssCode;
		} else {
			styleElement.appendChild(document.createTextNode(cssCode));
		}
		return function() {
			head.removeChild(styleElement);
		};
	}


/***/ },
/* 26 */
/*!******************************************!*\
  !*** ../~/famous-polyfills/classList.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	
	/*
	 * classList.js: Cross-browser full element.classList implementation.
	 * 2011-06-15
	 *
	 * By Eli Grey, http://eligrey.com
	 * Public Domain.
	 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	 */
	
	/*global self, document, DOMException */
	
	/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
	
	if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {
	
	(function (view) {
	
	"use strict";
	
	var
	      classListProp = "classList"
	    , protoProp = "prototype"
	    , elemCtrProto = (view.HTMLElement || view.Element)[protoProp]
	    , objCtr = Object
	    , strTrim = String[protoProp].trim || function () {
	        return this.replace(/^\s+|\s+$/g, "");
	    }
	    , arrIndexOf = Array[protoProp].indexOf || function (item) {
	        var
	              i = 0
	            , len = this.length
	        ;
	        for (; i < len; i++) {
	            if (i in this && this[i] === item) {
	                return i;
	            }
	        }
	        return -1;
	    }
	    // Vendors: please allow content code to instantiate DOMExceptions
	    , DOMEx = function (type, message) {
	        this.name = type;
	        this.code = DOMException[type];
	        this.message = message;
	    }
	    , checkTokenAndGetIndex = function (classList, token) {
	        if (token === "") {
	            throw new DOMEx(
	                  "SYNTAX_ERR"
	                , "An invalid or illegal string was specified"
	            );
	        }
	        if (/\s/.test(token)) {
	            throw new DOMEx(
	                  "INVALID_CHARACTER_ERR"
	                , "String contains an invalid character"
	            );
	        }
	        return arrIndexOf.call(classList, token);
	    }
	    , ClassList = function (elem) {
	        var
	              trimmedClasses = strTrim.call(elem.className)
	            , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
	            , i = 0
	            , len = classes.length
	        ;
	        for (; i < len; i++) {
	            this.push(classes[i]);
	        }
	        this._updateClassName = function () {
	            elem.className = this.toString();
	        };
	    }
	    , classListProto = ClassList[protoProp] = []
	    , classListGetter = function () {
	        return new ClassList(this);
	    }
	;
	// Most DOMException implementations don't allow calling DOMException's toString()
	// on non-DOMExceptions. Error's toString() is sufficient here.
	DOMEx[protoProp] = Error[protoProp];
	classListProto.item = function (i) {
	    return this[i] || null;
	};
	classListProto.contains = function (token) {
	    token += "";
	    return checkTokenAndGetIndex(this, token) !== -1;
	};
	classListProto.add = function (token) {
	    token += "";
	    if (checkTokenAndGetIndex(this, token) === -1) {
	        this.push(token);
	        this._updateClassName();
	    }
	};
	classListProto.remove = function (token) {
	    token += "";
	    var index = checkTokenAndGetIndex(this, token);
	    if (index !== -1) {
	        this.splice(index, 1);
	        this._updateClassName();
	    }
	};
	classListProto.toggle = function (token) {
	    token += "";
	    if (checkTokenAndGetIndex(this, token) === -1) {
	        this.add(token);
	    } else {
	        this.remove(token);
	    }
	};
	classListProto.toString = function () {
	    return this.join(" ");
	};
	
	if (objCtr.defineProperty) {
	    var classListPropDesc = {
	          get: classListGetter
	        , enumerable: true
	        , configurable: true
	    };
	    try {
	        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	    } catch (ex) { // IE 8 doesn't support enumerable:true
	        if (ex.number === -0x7FF5EC54) {
	            classListPropDesc.enumerable = false;
	            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	        }
	    }
	} else if (objCtr[protoProp].__defineGetter__) {
	    elemCtrProto.__defineGetter__(classListProp, classListGetter);
	}
	
	}(self));
	
	}


/***/ },
/* 27 */
/*!******************************************************!*\
  !*** ../~/famous-polyfills/functionPrototypeBind.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	if (!Function.prototype.bind) {
	    Function.prototype.bind = function (oThis) {
	        if (typeof this !== "function") {
	            // closest thing possible to the ECMAScript 5 internal IsCallable function
	            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	        }
	
	        var aArgs = Array.prototype.slice.call(arguments, 1),
	        fToBind = this,
	        fNOP = function () {},
	        fBound = function () {
	            return fToBind.apply(this instanceof fNOP && oThis
	                ? this
	                : oThis,
	                aArgs.concat(Array.prototype.slice.call(arguments)));
	        };
	
	        fNOP.prototype = this.prototype;
	        fBound.prototype = new fNOP();
	
	        return fBound;
	    };
	}


/***/ },
/* 28 */
/*!******************************************************!*\
  !*** ../~/famous-polyfills/requestAnimationFrame.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// adds requestAnimationFrame functionality
	// Source: http://strd6.com/2011/05/better-window-requestanimationframe-shim/
	
	window.requestAnimationFrame || (window.requestAnimationFrame =
	  window.webkitRequestAnimationFrame ||
	  window.mozRequestAnimationFrame    ||
	  window.oRequestAnimationFrame      ||
	  window.msRequestAnimationFrame     ||
	  function(callback, element) {
	    return window.setTimeout(function() {
	      callback(+new Date());
	  }, 1000 / 60);
	});


/***/ },
/* 29 */
/*!***********************************!*\
  !*** ../~/famous/core/Context.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var RenderNode = __webpack_require__(/*! ./RenderNode */ 44);
	var EventHandler = __webpack_require__(/*! ./EventHandler */ 30);
	var ElementAllocator = __webpack_require__(/*! ./ElementAllocator */ 45);
	var Transform = __webpack_require__(/*! ./Transform */ 39);
	var Transitionable = __webpack_require__(/*! ../transitions/Transitionable */ 46);
	var _zeroZero = [
	    0,
	    0
	];
	var usePrefix = !('perspective' in document.documentElement.style);
	function _getElementSize() {
	    var element = this.container;
	    return [
	        element.clientWidth,
	        element.clientHeight
	    ];
	}
	var _setPerspective = usePrefix ? function (element, perspective) {
	    element.style.webkitPerspective = perspective ? perspective.toFixed() + 'px' : '';
	} : function (element, perspective) {
	    element.style.perspective = perspective ? perspective.toFixed() + 'px' : '';
	};
	function Context(container) {
	    this.container = container;
	    this._allocator = new ElementAllocator(container);
	    this._node = new RenderNode();
	    this._eventOutput = new EventHandler();
	    this._size = _getElementSize.call(this);
	    this._perspectiveState = new Transitionable(0);
	    this._perspective = undefined;
	    this._nodeContext = {
	        allocator: this._allocator,
	        transform: Transform.identity,
	        opacity: 1,
	        origin: _zeroZero,
	        align: _zeroZero,
	        size: this._size
	    };
	    this._eventOutput.on('resize', function () {
	        this.setSize(_getElementSize.call(this));
	    }.bind(this));
	}
	Context.prototype.getAllocator = function getAllocator() {
	    return this._allocator;
	};
	Context.prototype.add = function add(obj) {
	    return this._node.add(obj);
	};
	Context.prototype.migrate = function migrate(container) {
	    if (container === this.container)
	        return;
	    this.container = container;
	    this._allocator.migrate(container);
	};
	Context.prototype.getSize = function getSize() {
	    return this._size;
	};
	Context.prototype.setSize = function setSize(size) {
	    if (!size)
	        size = _getElementSize.call(this);
	    this._size[0] = size[0];
	    this._size[1] = size[1];
	};
	Context.prototype.update = function update(contextParameters) {
	    if (contextParameters) {
	        if (contextParameters.transform)
	            this._nodeContext.transform = contextParameters.transform;
	        if (contextParameters.opacity)
	            this._nodeContext.opacity = contextParameters.opacity;
	        if (contextParameters.origin)
	            this._nodeContext.origin = contextParameters.origin;
	        if (contextParameters.align)
	            this._nodeContext.align = contextParameters.align;
	        if (contextParameters.size)
	            this._nodeContext.size = contextParameters.size;
	    }
	    var perspective = this._perspectiveState.get();
	    if (perspective !== this._perspective) {
	        _setPerspective(this.container, perspective);
	        this._perspective = perspective;
	    }
	    this._node.commit(this._nodeContext);
	};
	Context.prototype.getPerspective = function getPerspective() {
	    return this._perspectiveState.get();
	};
	Context.prototype.setPerspective = function setPerspective(perspective, transition, callback) {
	    return this._perspectiveState.set(perspective, transition, callback);
	};
	Context.prototype.emit = function emit(type, event) {
	    return this._eventOutput.emit(type, event);
	};
	Context.prototype.on = function on(type, handler) {
	    return this._eventOutput.on(type, handler);
	};
	Context.prototype.removeListener = function removeListener(type, handler) {
	    return this._eventOutput.removeListener(type, handler);
	};
	Context.prototype.pipe = function pipe(target) {
	    return this._eventOutput.pipe(target);
	};
	Context.prototype.unpipe = function unpipe(target) {
	    return this._eventOutput.unpipe(target);
	};
	module.exports = Context;

/***/ },
/* 30 */
/*!****************************************!*\
  !*** ../~/famous/core/EventHandler.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var EventEmitter = __webpack_require__(/*! ./EventEmitter */ 47);
	function EventHandler() {
	    EventEmitter.apply(this, arguments);
	    this.downstream = [];
	    this.downstreamFn = [];
	    this.upstream = [];
	    this.upstreamListeners = {};
	}
	EventHandler.prototype = Object.create(EventEmitter.prototype);
	EventHandler.prototype.constructor = EventHandler;
	EventHandler.setInputHandler = function setInputHandler(object, handler) {
	    object.trigger = handler.trigger.bind(handler);
	    if (handler.subscribe && handler.unsubscribe) {
	        object.subscribe = handler.subscribe.bind(handler);
	        object.unsubscribe = handler.unsubscribe.bind(handler);
	    }
	};
	EventHandler.setOutputHandler = function setOutputHandler(object, handler) {
	    if (handler instanceof EventHandler)
	        handler.bindThis(object);
	    object.pipe = handler.pipe.bind(handler);
	    object.unpipe = handler.unpipe.bind(handler);
	    object.on = handler.on.bind(handler);
	    object.addListener = object.on;
	    object.removeListener = handler.removeListener.bind(handler);
	};
	EventHandler.prototype.emit = function emit(type, event) {
	    EventEmitter.prototype.emit.apply(this, arguments);
	    var i = 0;
	    for (i = 0; i < this.downstream.length; i++) {
	        if (this.downstream[i].trigger)
	            this.downstream[i].trigger(type, event);
	    }
	    for (i = 0; i < this.downstreamFn.length; i++) {
	        this.downstreamFn[i](type, event);
	    }
	    return this;
	};
	EventHandler.prototype.trigger = EventHandler.prototype.emit;
	EventHandler.prototype.pipe = function pipe(target) {
	    if (target.subscribe instanceof Function)
	        return target.subscribe(this);
	    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
	    var index = downstreamCtx.indexOf(target);
	    if (index < 0)
	        downstreamCtx.push(target);
	    if (target instanceof Function)
	        target('pipe', null);
	    else if (target.trigger)
	        target.trigger('pipe', null);
	    return target;
	};
	EventHandler.prototype.unpipe = function unpipe(target) {
	    if (target.unsubscribe instanceof Function)
	        return target.unsubscribe(this);
	    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
	    var index = downstreamCtx.indexOf(target);
	    if (index >= 0) {
	        downstreamCtx.splice(index, 1);
	        if (target instanceof Function)
	            target('unpipe', null);
	        else if (target.trigger)
	            target.trigger('unpipe', null);
	        return target;
	    } else
	        return false;
	};
	EventHandler.prototype.on = function on(type, handler) {
	    EventEmitter.prototype.on.apply(this, arguments);
	    if (!(type in this.upstreamListeners)) {
	        var upstreamListener = this.trigger.bind(this, type);
	        this.upstreamListeners[type] = upstreamListener;
	        for (var i = 0; i < this.upstream.length; i++) {
	            this.upstream[i].on(type, upstreamListener);
	        }
	    }
	    return this;
	};
	EventHandler.prototype.addListener = EventHandler.prototype.on;
	EventHandler.prototype.subscribe = function subscribe(source) {
	    var index = this.upstream.indexOf(source);
	    if (index < 0) {
	        this.upstream.push(source);
	        for (var type in this.upstreamListeners) {
	            source.on(type, this.upstreamListeners[type]);
	        }
	    }
	    return this;
	};
	EventHandler.prototype.unsubscribe = function unsubscribe(source) {
	    var index = this.upstream.indexOf(source);
	    if (index >= 0) {
	        this.upstream.splice(index, 1);
	        for (var type in this.upstreamListeners) {
	            source.removeListener(type, this.upstreamListeners[type]);
	        }
	    }
	    return this;
	};
	module.exports = EventHandler;

/***/ },
/* 31 */
/*!******************************************!*\
  !*** ../~/famous/core/OptionsManager.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var EventHandler = __webpack_require__(/*! ./EventHandler */ 30);
	function OptionsManager(value) {
	    this._value = value;
	    this.eventOutput = null;
	}
	OptionsManager.patch = function patchObject(source, data) {
	    var manager = new OptionsManager(source);
	    for (var i = 1; i < arguments.length; i++)
	        manager.patch(arguments[i]);
	    return source;
	};
	function _createEventOutput() {
	    this.eventOutput = new EventHandler();
	    this.eventOutput.bindThis(this);
	    EventHandler.setOutputHandler(this, this.eventOutput);
	}
	OptionsManager.prototype.patch = function patch() {
	    var myState = this._value;
	    for (var i = 0; i < arguments.length; i++) {
	        var data = arguments[i];
	        for (var k in data) {
	            if (k in myState && (data[k] && data[k].constructor === Object) && (myState[k] && myState[k].constructor === Object)) {
	                if (!myState.hasOwnProperty(k))
	                    myState[k] = Object.create(myState[k]);
	                this.key(k).patch(data[k]);
	                if (this.eventOutput)
	                    this.eventOutput.emit('change', {
	                        id: k,
	                        value: this.key(k).value()
	                    });
	            } else
	                this.set(k, data[k]);
	        }
	    }
	    return this;
	};
	OptionsManager.prototype.setOptions = OptionsManager.prototype.patch;
	OptionsManager.prototype.key = function key(identifier) {
	    var result = new OptionsManager(this._value[identifier]);
	    if (!(result._value instanceof Object) || result._value instanceof Array)
	        result._value = {};
	    return result;
	};
	OptionsManager.prototype.get = function get(key) {
	    return key ? this._value[key] : this._value;
	};
	OptionsManager.prototype.getOptions = OptionsManager.prototype.get;
	OptionsManager.prototype.set = function set(key, value) {
	    var originalValue = this.get(key);
	    this._value[key] = value;
	    if (this.eventOutput && value !== originalValue)
	        this.eventOutput.emit('change', {
	            id: key,
	            value: value
	        });
	    return this;
	};
	OptionsManager.prototype.on = function on() {
	    _createEventOutput.call(this);
	    return this.on.apply(this, arguments);
	};
	OptionsManager.prototype.removeListener = function removeListener() {
	    _createEventOutput.call(this);
	    return this.removeListener.apply(this, arguments);
	};
	OptionsManager.prototype.pipe = function pipe() {
	    _createEventOutput.call(this);
	    return this.pipe.apply(this, arguments);
	};
	OptionsManager.prototype.unpipe = function unpipe() {
	    _createEventOutput.call(this);
	    return this.unpipe.apply(this, arguments);
	};
	module.exports = OptionsManager;

/***/ },
/* 32 */
/*!*****************************************!*\
  !*** ../~/famous/core/ElementOutput.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Entity = __webpack_require__(/*! ./Entity */ 35);
	var EventHandler = __webpack_require__(/*! ./EventHandler */ 30);
	var Transform = __webpack_require__(/*! ./Transform */ 39);
	var usePrefix = !('transform' in document.documentElement.style);
	var devicePixelRatio = window.devicePixelRatio || 1;
	function ElementOutput(element) {
	    this._matrix = null;
	    this._opacity = 1;
	    this._origin = null;
	    this._size = null;
	    this._eventOutput = new EventHandler();
	    this._eventOutput.bindThis(this);
	    this.eventForwarder = function eventForwarder(event) {
	        this._eventOutput.emit(event.type, event);
	    }.bind(this);
	    this.id = Entity.register(this);
	    this._element = null;
	    this._sizeDirty = false;
	    this._originDirty = false;
	    this._transformDirty = false;
	    this._invisible = false;
	    if (element)
	        this.attach(element);
	}
	ElementOutput.prototype.on = function on(type, fn) {
	    if (this._element)
	        this._element.addEventListener(type, this.eventForwarder);
	    this._eventOutput.on(type, fn);
	};
	ElementOutput.prototype.removeListener = function removeListener(type, fn) {
	    this._eventOutput.removeListener(type, fn);
	};
	ElementOutput.prototype.emit = function emit(type, event) {
	    if (event && !event.origin)
	        event.origin = this;
	    var handled = this._eventOutput.emit(type, event);
	    if (handled && event && event.stopPropagation)
	        event.stopPropagation();
	    return handled;
	};
	ElementOutput.prototype.pipe = function pipe(target) {
	    return this._eventOutput.pipe(target);
	};
	ElementOutput.prototype.unpipe = function unpipe(target) {
	    return this._eventOutput.unpipe(target);
	};
	ElementOutput.prototype.render = function render() {
	    return this.id;
	};
	function _addEventListeners(target) {
	    for (var i in this._eventOutput.listeners) {
	        target.addEventListener(i, this.eventForwarder);
	    }
	}
	function _removeEventListeners(target) {
	    for (var i in this._eventOutput.listeners) {
	        target.removeEventListener(i, this.eventForwarder);
	    }
	}
	function _formatCSSTransform(m) {
	    m[12] = Math.round(m[12] * devicePixelRatio) / devicePixelRatio;
	    m[13] = Math.round(m[13] * devicePixelRatio) / devicePixelRatio;
	    var result = 'matrix3d(';
	    for (var i = 0; i < 15; i++) {
	        result += m[i] < 0.000001 && m[i] > -0.000001 ? '0,' : m[i] + ',';
	    }
	    result += m[15] + ')';
	    return result;
	}
	var _setMatrix;
	if (usePrefix) {
	    _setMatrix = function (element, matrix) {
	        element.style.webkitTransform = _formatCSSTransform(matrix);
	    };
	} else {
	    _setMatrix = function (element, matrix) {
	        element.style.transform = _formatCSSTransform(matrix);
	    };
	}
	function _formatCSSOrigin(origin) {
	    return 100 * origin[0] + '% ' + 100 * origin[1] + '%';
	}
	var _setOrigin = usePrefix ? function (element, origin) {
	    element.style.webkitTransformOrigin = _formatCSSOrigin(origin);
	} : function (element, origin) {
	    element.style.transformOrigin = _formatCSSOrigin(origin);
	};
	var _setInvisible = usePrefix ? function (element) {
	    element.style.webkitTransform = 'scale3d(0.0001,0.0001,0.0001)';
	    element.style.opacity = 0;
	} : function (element) {
	    element.style.transform = 'scale3d(0.0001,0.0001,0.0001)';
	    element.style.opacity = 0;
	};
	function _xyNotEquals(a, b) {
	    return a && b ? a[0] !== b[0] || a[1] !== b[1] : a !== b;
	}
	ElementOutput.prototype.commit = function commit(context) {
	    var target = this._element;
	    if (!target)
	        return;
	    var matrix = context.transform;
	    var opacity = context.opacity;
	    var origin = context.origin;
	    var size = context.size;
	    if (!matrix && this._matrix) {
	        this._matrix = null;
	        this._opacity = 0;
	        _setInvisible(target);
	        return;
	    }
	    if (_xyNotEquals(this._origin, origin))
	        this._originDirty = true;
	    if (Transform.notEquals(this._matrix, matrix))
	        this._transformDirty = true;
	    if (this._invisible) {
	        this._invisible = false;
	        this._element.style.display = '';
	    }
	    if (this._opacity !== opacity) {
	        this._opacity = opacity;
	        target.style.opacity = opacity >= 1 ? '0.999999' : opacity;
	    }
	    if (this._transformDirty || this._originDirty || this._sizeDirty) {
	        if (this._sizeDirty)
	            this._sizeDirty = false;
	        if (this._originDirty) {
	            if (origin) {
	                if (!this._origin)
	                    this._origin = [
	                        0,
	                        0
	                    ];
	                this._origin[0] = origin[0];
	                this._origin[1] = origin[1];
	            } else
	                this._origin = null;
	            _setOrigin(target, this._origin);
	            this._originDirty = false;
	        }
	        if (!matrix)
	            matrix = Transform.identity;
	        this._matrix = matrix;
	        var aaMatrix = this._size ? Transform.thenMove(matrix, [
	            -this._size[0] * origin[0],
	            -this._size[1] * origin[1],
	            0
	        ]) : matrix;
	        _setMatrix(target, aaMatrix);
	        this._transformDirty = false;
	    }
	};
	ElementOutput.prototype.cleanup = function cleanup() {
	    if (this._element) {
	        this._invisible = true;
	        this._element.style.display = 'none';
	    }
	};
	ElementOutput.prototype.attach = function attach(target) {
	    this._element = target;
	    _addEventListeners.call(this, target);
	};
	ElementOutput.prototype.detach = function detach() {
	    var target = this._element;
	    if (target) {
	        _removeEventListeners.call(this, target);
	        if (this._invisible) {
	            this._invisible = false;
	            this._element.style.display = '';
	        }
	    }
	    this._element = null;
	    return target;
	};
	module.exports = ElementOutput;

/***/ },
/* 33 */
/*!************************************************!*\
  !*** ../~/famous-flex/src/ScrollController.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014 - 2015
	 */
	
	/**
	 * Scrollable layout-controller.
	 *
	 * Key features:
	 * -    Customizable layout
	 * -    Insert/remove renderables into the scene using animations/spec
	 * -    Support for `true` size renderables
	 * -    Horizontal/vertical direction
	 * -    Top/left or bottom/right alignment
	 * -    Pagination
	 * -    Option to embed in a ContainerSurface
	 *
	 * Events:
	 *
	 * |event      |description|
	 * |-----------|-----------|
	 * |scrollstart|Emitted when scrolling starts.|
	 * |scroll     |Emitted as the content scrolls (once for each frame the visible offset has changed).|
	 * |pagechange |Emitted whenever the visible page changes.|
	 * |scrollend  |Emitted after scrolling stops (when the scroll particle settles).|
	 *
	 * Inherited from: [LayoutController](./LayoutController.md)
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var LayoutUtility = __webpack_require__(/*! ./LayoutUtility */ 17);
	    var LayoutController = __webpack_require__(/*! ./LayoutController */ 15);
	    var LayoutNode = __webpack_require__(/*! ./LayoutNode */ 37);
	    var FlowLayoutNode = __webpack_require__(/*! ./FlowLayoutNode */ 38);
	    var LayoutNodeManager = __webpack_require__(/*! ./LayoutNodeManager */ 36);
	    var ContainerSurface = __webpack_require__(/*! famous/surfaces/ContainerSurface */ 13);
	    var Transform = __webpack_require__(/*! famous/core/Transform */ 39);
	    var EventHandler = __webpack_require__(/*! famous/core/EventHandler */ 30);
	    var Group = __webpack_require__(/*! famous/core/Group */ 48);
	    var Vector = __webpack_require__(/*! famous/math/Vector */ 49);
	    var PhysicsEngine = __webpack_require__(/*! famous/physics/PhysicsEngine */ 50);
	    var Particle = __webpack_require__(/*! famous/physics/bodies/Particle */ 51);
	    var Drag = __webpack_require__(/*! famous/physics/forces/Drag */ 52);
	    var Spring = __webpack_require__(/*! famous/physics/forces/Spring */ 53);
	    var ScrollSync = __webpack_require__(/*! famous/inputs/ScrollSync */ 54);
	    var ViewSequence = __webpack_require__(/*! famous/core/ViewSequence */ 12);
	
	    /**
	     * Boudary reached detection
	     */
	    var Bounds = {
	        NONE: 0,
	        PREV: 1, // top
	        NEXT: 2, // bottom
	        BOTH: 3
	    };
	
	    /**
	     * Source of the spring
	     */
	    var SpringSource = {
	        NONE: 'none',
	        NEXTBOUNDS: 'next-bounds', // top
	        PREVBOUNDS: 'prev-bounds', // bottom
	        MINSIZE: 'minimal-size',
	        GOTOSEQUENCE: 'goto-sequence',
	        ENSUREVISIBLE: 'ensure-visible',
	        GOTOPREVDIRECTION: 'goto-prev-direction',
	        GOTONEXTDIRECTION: 'goto-next-direction'
	    };
	
	    /**
	     * Pagination modes
	     */
	    var PaginationMode = {
	        PAGE: 0,
	        SCROLL: 1
	    };
	
	    /**
	     * @class
	     * @extends LayoutController
	     * @param {Object} options Configurable options (see LayoutController for all inherited options).
	     * @param {Bool} [options.useContainer] Embeds the view in a ContainerSurface to hide any overflow and capture input events (default: `false`).
	     * @param {String} [options.container] Options that are passed to the ContainerSurface in case `useContainer` is true.
	     * @param {Bool} [options.paginated] Enabled pagination when set to `true` (default: `false`).
	     * @param {Number} [options.paginationEnergyThresshold] Thresshold after which pagination kicks in (default: `0.01`).
	     * @param {PaginationMode} [options.paginationMode] Pagination-mode (either page-based or scroll-based) (default: `PaginationMode.PAGE`).
	     * @param {Number} [options.alignment] Alignment of the renderables (0 = top/left, 1 = bottom/right) (default: `0`).
	     * @param {Bool} [options.mouseMove] Enables scrolling by holding the mouse-button down and moving the mouse (default: `false`).
	     * @param {Bool} [options.enabled] Enables or disabled user input (default: `true`).
	     * @param {Bool} [options.overscroll] Enables or disables overscroll (default: `true`).
	     * @param {Object} [options.scrollParticle] Options for the scroll particle (default: `{}`)
	     * @param {Object} [options.scrollSpring] Spring-force options that are applied on the scroll particle when e.g. bounds is reached (default: `{dampingRatio: 1.0, period: 350}`)
	     * @param {Object} [options.scrollDrag] Drag-force options to apply on the scroll particle
	     * @param {Object} [options.scrollFriction] Friction-force options to apply on the scroll particle
	     * @param {Bool} [options.layoutAll] When set to true, always lays out all renderables in the datasource (default: `false`).
	     * @alias module:ScrollController
	     */
	    function ScrollController(options) {
	        options = LayoutUtility.combineOptions(ScrollController.DEFAULT_OPTIONS, options);
	        var layoutManager = new LayoutNodeManager(options.flow ? FlowLayoutNode : LayoutNode, _initLayoutNode.bind(this));
	        LayoutController.call(this, options, layoutManager);
	
	        // Scrolling
	        this._scroll = {
	            activeTouches: [],
	            // physics-engine to use for scrolling
	            pe: new PhysicsEngine(),
	            // particle that represents the scroll-offset
	            particle: new Particle(this.options.scrollParticle),
	            // drag-force that slows the particle down after a "flick"
	            dragForce: new Drag(this.options.scrollDrag),
	            frictionForce: new Drag(this.options.scrollFriction),
	            // spring
	            springValue: undefined,
	            springForce: new Spring(this.options.scrollSpring),
	            springEndState: new Vector([0, 0, 0]),
	            // group
	            groupStart: 0,
	            groupTranslate: [0, 0, 0],
	            // delta
	            scrollDelta: 0,
	            normalizedScrollDelta: 0,
	            scrollForce: 0,
	            scrollForceCount: 0,
	            unnormalizedScrollOffset: 0,
	            // state
	            isScrolling: false
	        };
	
	        // Diagnostics
	        this._debug = {
	            layoutCount: 0,
	            commitCount: 0
	        };
	
	        // Create groupt for faster rendering
	        this.group = new Group();
	        this.group.add({render: _innerRender.bind(this)});
	
	        // Configure physics engine with particle and drag
	        this._scroll.pe.addBody(this._scroll.particle);
	        if (!this.options.scrollDrag.disabled) {
	            this._scroll.dragForceId = this._scroll.pe.attach(this._scroll.dragForce, this._scroll.particle);
	        }
	        if (!this.options.scrollFriction.disabled) {
	            this._scroll.frictionForceId = this._scroll.pe.attach(this._scroll.frictionForce, this._scroll.particle);
	        }
	        this._scroll.springForce.setOptions({ anchor: this._scroll.springEndState });
	
	        // Listen to touch events
	        this._eventInput.on('touchstart', _touchStart.bind(this));
	        this._eventInput.on('touchmove', _touchMove.bind(this));
	        this._eventInput.on('touchend', _touchEnd.bind(this));
	        this._eventInput.on('touchcancel', _touchEnd.bind(this));
	
	        // Listen to mouse-move events
	        this._eventInput.on('mousedown', _mouseDown.bind(this));
	        this._eventInput.on('mouseup', _mouseUp.bind(this));
	        this._eventInput.on('mousemove', _mouseMove.bind(this));
	
	        // Listen to mouse-wheel events
	        this._scrollSync = new ScrollSync(this.options.scrollSync);
	        this._eventInput.pipe(this._scrollSync);
	        this._scrollSync.on('update', _scrollUpdate.bind(this));
	
	        // Embed in container surface if neccesary
	        if (this.options.useContainer) {
	            this.container = new ContainerSurface(this.options.container);
	
	            // Create container surface, which has one child, which just returns
	            // the entity-id of this scrollview. This causes the Commit function
	            // of this scrollview to be called
	            this.container.add({
	                render: function() {
	                    return this.id;
	                }.bind(this)
	            });
	
	            // Pipe events received in container to this scrollview
	            if (!this.options.autoPipeEvents) {
	                this.subscribe(this.container);
	                EventHandler.setInputHandler(this.container, this);
	                EventHandler.setOutputHandler(this.container, this);
	            }
	        }
	    }
	    ScrollController.prototype = Object.create(LayoutController.prototype);
	    ScrollController.prototype.constructor = ScrollController;
	    ScrollController.Bounds = Bounds;
	    ScrollController.PaginationMode = PaginationMode;
	
	    ScrollController.DEFAULT_OPTIONS = {
	        useContainer: false,    // when true embeds inside a ContainerSurface for capturing input events & clipping
	        container: {
	            properties: {
	                overflow: 'hidden' // overflow mode when useContainer is enabled
	            }
	        },
	        scrollParticle: {
	            // use defaults
	        },
	        scrollDrag: {
	            forceFunction: Drag.FORCE_FUNCTIONS.QUADRATIC,
	            strength: 0.001,
	            disabled: true
	        },
	        scrollFriction: {
	            forceFunction: Drag.FORCE_FUNCTIONS.LINEAR,
	            strength: 0.0025,
	            disabled: false
	        },
	        scrollSpring: {
	            dampingRatio: 1.0,
	            period: 350
	        },
	        scrollSync: {
	            scale: 0.2
	        },
	        overscroll: true,
	        paginated: false,
	        paginationMode: PaginationMode.PAGE,
	        paginationEnergyThresshold: 0.01,
	        alignment: 0,         // [0: top/left, 1: bottom/right]
	        touchMoveDirectionThresshold: undefined, // 0..1
	        touchMoveNoVelocityDuration: 100,
	        mouseMove: false,
	        enabled: true,          // set to false to disable scrolling
	        layoutAll: false,       // set to true is you want all renderables layed out/rendered
	        alwaysLayout: false,    // set to true to always call the layout function
	        extraBoundsSpace: [100, 100],
	        debug: false
	    };
	
	    /**
	     * Patches the ScrollController instance's options with the passed-in ones.
	     *
	     * @param {Object} options Configurable options (see LayoutController for all inherited options).
	     * @param {Bool} [options.paginated] Enabled pagination when set to `true` (default: `false`).
	     * @param {Number} [options.paginationEnergyThresshold] Thresshold after which pagination kicks in (default: `0.01`).
	     * @param {PaginationMode} [options.paginationMode] Pagination-mode (either page-based or scroll-based) (default: `PaginationMode.PAGE`).
	     * @param {Number} [options.alignment] Alignment of the renderables (0 = top/left, 1 = bottom/right) (default: `0`).
	     * @param {Bool} [options.mouseMove] Enables scrolling by holding the mouse-button down and moving the mouse (default: `false`).
	     * @param {Bool} [options.enabled] Enables or disables user input (default: `true`).
	     * @param {Bool} [options.overscroll] Enables or disables overscroll (default: `true`).
	     * @param {Object} [options.scrollParticle] Options for the scroll particle (default: `{}`)
	     * @param {Object} [options.scrollSpring] Spring-force options that are applied on the scroll particle when e.g. bounds is reached (default: `{dampingRatio: 1.0, period: 500}`)
	     * @param {Object} [options.scrollDrag] Drag-force options to apply on the scroll particle
	     * @param {Object} [options.scrollFriction] Friction-force options to apply on the scroll particle
	     * @param {Bool} [options.layoutAll] When set to true, always lays out all renderables in the datasource (default: `false`).
	     * @return {ScrollController} this
	     */
	    ScrollController.prototype.setOptions = function(options) {
	        LayoutController.prototype.setOptions.call(this, options);
	        if (this._scroll) {
	            if (options.scrollSpring) {
	                this._scroll.springForce.setOptions(options.scrollSpring);
	            }
	            if (options.scrollDrag) {
	                this._scroll.dragForce.setOptions(options.scrollDrag);
	            }
	        }
	        if (options.scrollSync && this._scrollSync) {
	            this._scrollSync.setOptions(options.scrollSync);
	        }
	        return this;
	    };
	
	    /**
	     * Called whenever a layout-node is created/re-used. Initializes
	     * the node with the `insertSpec` if it has been defined and enabled
	     * locking of the x/y translation so that the x/y position of the renderable
	     * is immediately updated when the user scrolls the view.
	     */
	    function _initLayoutNode(node, spec) {
	        if (!spec && this.options.flowOptions.insertSpec) {
	            node.setSpec(this.options.flowOptions.insertSpec);
	        }
	    }
	
	    /**
	     * Helper function for logging debug statements to the console.
	     */
	    /*function _log(args) {
	        if (!this.options.debug) {
	            return;
	        }
	        var message = this._debug.commitCount + ': ';
	        for (var i = 0, j = arguments.length; i < j; i++) {
	            var arg = arguments[i];
	            if ((arg instanceof Object) || (arg instanceof Array)) {
	                message += JSON.stringify(arg);
	            }
	            else {
	                message += arg;
	            }
	        }
	        console.log(message);
	    }*/
	
	    /**
	     * Sets the value for the spring, or set to `undefined` to disable the spring
	     */
	    function _updateSpring() {
	        var springValue = this._scroll.scrollForceCount ? undefined : this._scroll.springPosition;
	        if (this._scroll.springValue !== springValue) {
	            this._scroll.springValue = springValue;
	            if (springValue === undefined) {
	                if (this._scroll.springForceId !== undefined) {
	                    this._scroll.pe.detach(this._scroll.springForceId);
	                    this._scroll.springForceId = undefined;
	                    //_log.call(this, 'disabled spring');
	                }
	            }
	            else {
	                if (this._scroll.springForceId === undefined) {
	                    this._scroll.springForceId = this._scroll.pe.attach(this._scroll.springForce, this._scroll.particle);
	                }
	                this._scroll.springEndState.set1D(springValue);
	                this._scroll.pe.wake();
	                //_log.call(this, 'setting spring to: ', springValue, ' (', this._scroll.springSource, ')');
	            }
	        }
	    }
	
	    /**
	     * Returns the time from the given input event.
	     */
	    function _getEventTimestamp(event) {
	        return event.timeStamp || Date.now();
	    }
	
	    /**
	     * Called whenever the user presses the mouse button on the scrollview
	     */
	    function _mouseDown(event) {
	
	        // Check whether mouse-scrolling is enabled
	        if (!this.options.mouseMove) {
	            return;
	        }
	
	        // Reset any previous mouse-move operation that has not yet been
	        // cleared.
	        if (this._scroll.mouseMove) {
	            this.releaseScrollForce(this._scroll.mouseMove.delta);
	        }
	
	        // Calculate start of move operation
	        var current = [event.clientX, event.clientY];
	        var time = _getEventTimestamp(event);
	        this._scroll.mouseMove = {
	            delta: 0,
	            start: current,
	            current: current,
	            prev: current,
	            time: time,
	            prevTime: time
	        };
	
	        // Apply scroll force
	        this.applyScrollForce(this._scroll.mouseMove.delta);
	    }
	    function _mouseMove(event) {
	
	        // Check if any mouse-move is active
	        if (!this._scroll.mouseMove || !this.options.enabled) {
	            return;
	        }
	
	        // When a thresshold is configured, check whether the move operation (x/y ratio)
	        // lies within the thresshold. A move of 10 pixels x and 10 pixels y is considered 45 deg,
	        // which corresponds to a thresshold of 0.5.
	        var moveDirection = Math.atan2(
	            Math.abs(event.clientY - this._scroll.mouseMove.prev[1]),
	            Math.abs(event.clientX - this._scroll.mouseMove.prev[0])) / (Math.PI / 2.0);
	        var directionDiff = Math.abs(this._direction - moveDirection);
	        if ((this.options.touchMoveDirectionThresshold === undefined) || (directionDiff <= this.options.touchMoveDirectionThresshold)){
	            this._scroll.mouseMove.prev = this._scroll.mouseMove.current;
	            this._scroll.mouseMove.current = [event.clientX, event.clientY];
	            this._scroll.mouseMove.prevTime = this._scroll.mouseMove.time;
	            this._scroll.mouseMove.direction = moveDirection;
	            this._scroll.mouseMove.time = _getEventTimestamp(event);
	        }
	
	        // Update scroll-force
	        var delta = this._scroll.mouseMove.current[this._direction] - this._scroll.mouseMove.start[this._direction];
	        this.updateScrollForce(this._scroll.mouseMove.delta, delta);
	        this._scroll.mouseMove.delta = delta;
	    }
	    function _mouseUp(event) {
	
	        // Check if any mouse-move is active
	        if (!this._scroll.mouseMove) {
	            return;
	        }
	
	        // Calculate delta and velocity
	        var velocity = 0;
	        var diffTime = this._scroll.mouseMove.time - this._scroll.mouseMove.prevTime;
	        if ((diffTime > 0) && ((_getEventTimestamp(event) - this._scroll.mouseMove.time) <= this.options.touchMoveNoVelocityDuration)) {
	            var diffOffset = this._scroll.mouseMove.current[this._direction] - this._scroll.mouseMove.prev[this._direction];
	            velocity = diffOffset / diffTime;
	        }
	
	        // Release scroll force
	        this.releaseScrollForce(this._scroll.mouseMove.delta, velocity);
	        this._scroll.mouseMove = undefined;
	    }
	
	    /**
	     * Called whenever the user starts moving the scroll-view, using
	     * touch gestures.
	     */
	    function _touchStart(event) {
	
	        // Create touch-end event listener
	        if (!this._touchEndEventListener) {
	            this._touchEndEventListener = function(event2) {
	                event2.target.removeEventListener('touchend', this._touchEndEventListener);
	                _touchEnd.call(this, event2);
	            }.bind(this);
	        }
	
	        // Remove any touches that are no longer active
	        var oldTouchesCount = this._scroll.activeTouches.length;
	        var i = 0;
	        var j;
	        var touchFound;
	        while (i < this._scroll.activeTouches.length) {
	            var activeTouch = this._scroll.activeTouches[i];
	            touchFound = false;
	            for (j = 0; j < event.touches.length; j++) {
	                var touch = event.touches[j];
	                if (touch.identifier === activeTouch.id) {
	                    touchFound = true;
	                    break;
	                }
	            }
	            if (!touchFound) {
	                //_log.cal(this, 'removing touch with id: ', activeTouch.id);
	                this._scroll.activeTouches.splice(i, 1);
	            }
	            else {
	                i++;
	            }
	        }
	
	        // Process touch
	        for (i = 0; i < event.touches.length; i++) {
	            var changedTouch = event.touches[i];
	            touchFound = false;
	            for (j = 0; j < this._scroll.activeTouches.length; j++) {
	                if (this._scroll.activeTouches[j].id === changedTouch.identifier) {
	                    touchFound = true;
	                    break;
	                }
	            }
	            if (!touchFound) {
	                var current = [changedTouch.clientX, changedTouch.clientY];
	                var time = _getEventTimestamp(event);
	                this._scroll.activeTouches.push({
	                    id: changedTouch.identifier,
	                    start: current,
	                    current: current,
	                    prev: current,
	                    time: time,
	                    prevTime: time
	                });
	
	                // The following listener is automatically removed after touchend is received
	                // and ensures that the scrollview always received touchend.
	                changedTouch.target.addEventListener('touchend', this._touchEndEventListener);
	            }
	        }
	
	        // The first time a touch new touch gesture has arrived, emit event
	        if (!oldTouchesCount && this._scroll.activeTouches.length) {
	            this.applyScrollForce(0);
	            this._scroll.touchDelta = 0;
	        }
	    }
	
	    /**
	     * Called whenever the user is moving his/her fingers to scroll the view.
	     * Updates the moveOffset so that the scroll-offset on the view is updated.
	     */
	    function _touchMove(event) {
	        if (!this.options.enabled) {
	            return;
	        }
	
	        // Process the touch event
	        var primaryTouch;
	        for (var i = 0; i < event.changedTouches.length; i++) {
	            var changedTouch = event.changedTouches[i];
	            for (var j = 0; j < this._scroll.activeTouches.length; j++) {
	                var touch = this._scroll.activeTouches[j];
	                if (touch.id === changedTouch.identifier) {
	
	                    // When a thresshold is configured, check whether the move operation (x/y ratio)
	                    // lies within the thresshold. A move of 10 pixels x and 10 pixels y is considered 45 deg,
	                    // which corresponds to a thresshold of 0.5.
	                    var moveDirection = Math.atan2(
	                        Math.abs(changedTouch.clientY - touch.prev[1]),
	                        Math.abs(changedTouch.clientX - touch.prev[0])) / (Math.PI / 2.0);
	                    var directionDiff = Math.abs(this._direction - moveDirection);
	                    if ((this.options.touchMoveDirectionThresshold === undefined) || (directionDiff <= this.options.touchMoveDirectionThresshold)){
	                        touch.prev = touch.current;
	                        touch.current = [changedTouch.clientX, changedTouch.clientY];
	                        touch.prevTime = touch.time;
	                        touch.direction = moveDirection;
	                        touch.time = _getEventTimestamp(event);
	                        primaryTouch = (j === 0) ? touch : undefined;
	                    }
	                }
	            }
	        }
	
	        // Update move offset and emit event
	        if (primaryTouch) {
	            var delta = primaryTouch.current[this._direction] - primaryTouch.start[this._direction];
	            this.updateScrollForce(this._scroll.touchDelta, delta);
	            this._scroll.touchDelta = delta;
	        }
	    }
	
	    /**
	     * Called whenever the user releases his fingers and the touch gesture
	     * has completed. This will set the new position and if the user used a 'flick'
	     * gesture give the scroll-offset particle a velocity and momentum into a
	     * certain direction.
	     */
	    function _touchEnd(event) {
	
	        // Remove touch
	        var primaryTouch = this._scroll.activeTouches.length ? this._scroll.activeTouches[0] : undefined;
	        for (var i = 0; i < event.changedTouches.length; i++) {
	            var changedTouch = event.changedTouches[i];
	            for (var j = 0; j < this._scroll.activeTouches.length; j++) {
	                var touch = this._scroll.activeTouches[j];
	                if (touch.id === changedTouch.identifier) {
	
	                    // Remove touch from active-touches
	                    this._scroll.activeTouches.splice(j, 1);
	
	                    // When a different touch now becomes the primary touch, update
	                    // its start position to match the current move offset.
	                    if ((j === 0) && this._scroll.activeTouches.length) {
	                        var newPrimaryTouch = this._scroll.activeTouches[0];
	                        newPrimaryTouch.start[0] = newPrimaryTouch.current[0] - (touch.current[0] - touch.start[0]);
	                        newPrimaryTouch.start[1] = newPrimaryTouch.current[1] - (touch.current[1] - touch.start[1]);
	                    }
	                    break;
	                }
	            }
	        }
	
	        // Wait for all fingers to be released from the screen before resetting the move-spring
	        if (!primaryTouch || this._scroll.activeTouches.length) {
	            return;
	        }
	
	        // Determine velocity and add to particle
	        var velocity = 0;
	        var diffTime = primaryTouch.time - primaryTouch.prevTime;
	        if ((diffTime > 0) && ((_getEventTimestamp(event) - primaryTouch.time) <= this.options.touchMoveNoVelocityDuration)) {
	            var diffOffset = primaryTouch.current[this._direction] - primaryTouch.prev[this._direction];
	            velocity = diffOffset / diffTime;
	        }
	
	        // Release scroll force
	        var delta = this._scroll.touchDelta;
	        this.releaseScrollForce(delta, velocity);
	        this._scroll.touchDelta = 0;
	    }
	
	    /**
	     * Called whenever the user is scrolling the view using either a mouse
	     * scroll wheel or a track-pad.
	     */
	    function _scrollUpdate(event) {
	        if (!this.options.enabled) {
	            return;
	        }
	        var offset = Array.isArray(event.delta) ? event.delta[this._direction] : event.delta;
	        this.scroll(offset);
	    }
	
	    /**
	     * Updates the scroll offset particle.
	     */
	    function _setParticle(position, velocity, phase) {
	        if (position !== undefined) {
	            //var oldPosition = this._scroll.particle.getPosition1D();
	            this._scroll.particleValue = position;
	            this._scroll.particle.setPosition1D(position);
	            //_log.call(this, 'setParticle.position: ', position, ' (old: ', oldPosition, ', delta: ', position - oldPosition, ', phase: ', phase, ')');
	        }
	        if (velocity !== undefined) {
	            var oldVelocity = this._scroll.particle.getVelocity1D();
	            if (oldVelocity !== velocity) {
	                this._scroll.particle.setVelocity1D(velocity);
	                //_log.call(this, 'setParticle.velocity: ', velocity, ' (old: ', oldVelocity, ', delta: ', velocity - oldVelocity, ', phase: ', phase, ')');
	            }
	        }
	    }
	
	    /**
	     * Get the in-use scroll-offset.
	     */
	    function _calcScrollOffset(normalize, refreshParticle) {
	
	        // When moving using touch-gestures, make the offset stick to the
	        // finger. When the bounds is exceeded, decrease the scroll distance
	        // by two.
	        if (refreshParticle || (this._scroll.particleValue === undefined)) {
	            this._scroll.particleValue = this._scroll.particle.getPosition1D();
	            this._scroll.particleValue = Math.round(this._scroll.particleValue * 1000) / 1000;
	        }
	
	        // do stuff
	        var scrollOffset = this._scroll.particleValue;
	        if (this._scroll.scrollDelta || this._scroll.normalizedScrollDelta) {
	            scrollOffset += this._scroll.scrollDelta + this._scroll.normalizedScrollDelta;
	            if (((this._scroll.boundsReached & Bounds.PREV) && (scrollOffset > this._scroll.springPosition)) ||
	               ((this._scroll.boundsReached & Bounds.NEXT) && (scrollOffset < this._scroll.springPosition)) ||
	               (this._scroll.boundsReached === Bounds.BOTH)) {
	                scrollOffset = this._scroll.springPosition;
	            }
	            if (normalize) {
	                if (!this._scroll.scrollDelta) {
	                    this._scroll.normalizedScrollDelta = 0;
	                    _setParticle.call(this, scrollOffset, undefined, '_calcScrollOffset');
	                }
	                this._scroll.normalizedScrollDelta += this._scroll.scrollDelta;
	                this._scroll.scrollDelta = 0;
	            }
	        }
	
	        if (this._scroll.scrollForceCount && this._scroll.scrollForce) {
	            if (this._scroll.springPosition !== undefined) {
	                scrollOffset = (scrollOffset + this._scroll.scrollForce + this._scroll.springPosition) / 2.0;
	            }
	            else {
	                scrollOffset += this._scroll.scrollForce;
	            }
	        }
	
	        // Prevent the scroll position from exceeding the bounds when overscroll is disabled
	        if (!this.options.overscroll) {
	            if ((this._scroll.boundsReached === Bounds.BOTH) ||
	                ((this._scroll.boundsReached === Bounds.PREV) && (scrollOffset > this._scroll.springPosition)) ||
	                ((this._scroll.boundsReached === Bounds.NEXT) && (scrollOffset < this._scroll.springPosition))) {
	                scrollOffset = this._scroll.springPosition;
	            }
	        }
	
	        //_log.call(this, 'scrollOffset: ', scrollOffset, ', particle:', this._scroll.particle.getPosition1D(), ', moveToPosition: ', this._scroll.moveToPosition, ', springPosition: ', this._scroll.springPosition);
	        return scrollOffset;
	    }
	
	    /**
	     * Helper function that calculates the next/prev layed out height.
	     * @private
	     */
	    ScrollController.prototype._calcScrollHeight = function(next, lastNodeOnly) {
	        var calcedHeight = 0;
	        var node = this._nodes.getStartEnumNode(next);
	        while (node) {
	            if (node._invalidated) {
	                if (node.trueSizeRequested) {
	                    calcedHeight = undefined;
	                    break;
	                }
	                if (node.scrollLength !== undefined) {
	                    calcedHeight = lastNodeOnly ? node.scrollLength : (calcedHeight + node.scrollLength);
	                    if (!next && lastNodeOnly) {
	                        break;
	                    }
	                }
	            }
	            node = next ? node._next : node._prev;
	        }
	        return calcedHeight;
	    };
	
	    /**
	     * Calculates the scroll boundaries and sets the spring accordingly.
	     */
	    function _calcBounds(size, scrollOffset) {
	
	        // Local data
	        var prevHeight = this._calcScrollHeight(false);
	        var nextHeight = this._calcScrollHeight(true);
	        var enforeMinSize = this._layout.capabilities && this._layout.capabilities.sequentialScrollingOptimized;
	
	        // 1. When the rendered height is smaller than the total height,
	        //    then lock to the primary bounds
	        var totalHeight;
	        if (enforeMinSize) {
	            if ((nextHeight !== undefined) && (prevHeight !== undefined)) {
	                totalHeight = prevHeight + nextHeight;
	            }
	            if ((totalHeight !== undefined) && (totalHeight <= size[this._direction])) {
	                this._scroll.boundsReached = Bounds.BOTH;
	                this._scroll.springPosition = this.options.alignment ? -nextHeight : prevHeight;
	                this._scroll.springSource = SpringSource.MINSIZE;
	                return;
	            }
	        }
	
	        // 2. Check whether primary boundary has been reached
	        if (this.options.alignment) {
	            if (enforeMinSize) {
	                if ((nextHeight !== undefined) && ((scrollOffset + nextHeight) <= 0)) {
	                    this._scroll.boundsReached = Bounds.NEXT;
	                    this._scroll.springPosition = -nextHeight;
	                    this._scroll.springSource = SpringSource.NEXTBOUNDS;
	                    return;
	                }
	            }
	            else {
	                var firstPrevItemHeight = this._calcScrollHeight(false, true);
	                if ((nextHeight !== undefined) && firstPrevItemHeight && ((scrollOffset + nextHeight + size[this._direction]) <= firstPrevItemHeight)) {
	                    this._scroll.boundsReached = Bounds.NEXT;
	                    this._scroll.springPosition = nextHeight - (size[this._direction] - firstPrevItemHeight);
	                    this._scroll.springSource = SpringSource.NEXTBOUNDS;
	                    return;
	                }
	            }
	        }
	        else {
	            if ((prevHeight !== undefined) && ((scrollOffset - prevHeight) >= 0)) {
	                this._scroll.boundsReached = Bounds.PREV;
	                this._scroll.springPosition = prevHeight;
	                this._scroll.springSource = SpringSource.PREVBOUNDS;
	                return;
	            }
	        }
	
	        // 3. Check if secondary bounds has been reached
	        if (this.options.alignment) {
	            if ((prevHeight !== undefined) && ((scrollOffset - prevHeight) >= -size[this._direction])) {
	                this._scroll.boundsReached = Bounds.PREV;
	                this._scroll.springPosition = -size[this._direction] + prevHeight;
	                this._scroll.springSource = SpringSource.PREVBOUNDS;
	                return;
	            }
	        }
	        else {
	            var nextBounds = enforeMinSize ? size[this._direction] : this._calcScrollHeight(true, true);
	            if ((nextHeight !== undefined) && ((scrollOffset + nextHeight) <= nextBounds)){
	                this._scroll.boundsReached = Bounds.NEXT;
	                this._scroll.springPosition = nextBounds - nextHeight;
	                this._scroll.springSource = SpringSource.NEXTBOUNDS;
	                return;
	            }
	        }
	
	        // No bounds reached
	        this._scroll.boundsReached = Bounds.NONE;
	        this._scroll.springPosition = undefined;
	        this._scroll.springSource = SpringSource.NONE;
	    }
	
	    /**
	     * Calculates the scrollto-offset to which the spring is set.
	     */
	    function _calcScrollToOffset(size, scrollOffset) {
	        var scrollToRenderNode = this._scroll.scrollToRenderNode || this._scroll.ensureVisibleRenderNode;
	        if (!scrollToRenderNode) {
	            return;
	        }
	
	        // 1. When boundary is reached, stop scrolling in that direction
	        if ((this._scroll.boundsReached === Bounds.BOTH) ||
	            (!this._scroll.scrollToDirection && (this._scroll.boundsReached === Bounds.PREV)) ||
	            (this._scroll.scrollToDirection && (this._scroll.boundsReached === Bounds.NEXT))) {
	            return;
	        }
	
	        // 2. Find the node to scroll to
	        var foundNode;
	        var scrollToOffset = 0;
	        var node = this._nodes.getStartEnumNode(true);
	        var count = 0;
	        while (node) {
	            count++;
	            if (!node._invalidated || (node.scrollLength === undefined)) {
	                break;
	            }
	            if (this.options.alignment) {
	                scrollToOffset -= node.scrollLength;
	            }
	            if (node.renderNode === scrollToRenderNode) {
	                foundNode = node;
	                break;
	            }
	            if (!this.options.alignment) {
	                scrollToOffset -= node.scrollLength;
	            }
	            node = node._next;
	        }
	        if (!foundNode) {
	            scrollToOffset = 0;
	            node = this._nodes.getStartEnumNode(false);
	            while (node) {
	                if (!node._invalidated || (node.scrollLength === undefined)) {
	                   break;
	                }
	                if (!this.options.alignment) {
	                    scrollToOffset += node.scrollLength;
	                }
	                if (node.renderNode === scrollToRenderNode) {
	                    foundNode = node;
	                    break;
	                }
	                if (this.options.alignment) {
	                    scrollToOffset += node.scrollLength;
	                }
	                node = node._prev;
	            }
	        }
	
	        // 3. Update springs
	        if (foundNode) {
	            if (this._scroll.ensureVisibleRenderNode) {
	                if (this.options.alignment) {
	                    if ((scrollToOffset - foundNode.scrollLength) < 0) {
	                        this._scroll.springPosition = scrollToOffset;
	                        this._scroll.springSource = SpringSource.ENSUREVISIBLE;
	                    }
	                    else if (scrollToOffset > size[this._direction]) {
	                        this._scroll.springPosition = size[this._direction] - scrollToOffset;
	                        this._scroll.springSource = SpringSource.ENSUREVISIBLE;
	                    }
	                    else {
	                        if (!foundNode.trueSizeRequested) {
	                            this._scroll.ensureVisibleRenderNode = undefined;
	                        }
	                    }
	                }
	                else {
	                    scrollToOffset = -scrollToOffset;
	                    if (scrollToOffset < 0) {
	                        this._scroll.springPosition = scrollToOffset;
	                        this._scroll.springSource = SpringSource.ENSUREVISIBLE;
	                    }
	                    else if ((scrollToOffset + foundNode.scrollLength) > size[this._direction]) {
	                        this._scroll.springPosition = size[this._direction] - (scrollToOffset + foundNode.scrollLength);
	                        this._scroll.springSource = SpringSource.ENSUREVISIBLE;
	                    }
	                    else {
	                        if (!foundNode.trueSizeRequested) {
	                          this._scroll.ensureVisibleRenderNode = undefined;
	                        }
	                    }
	                }
	            }
	            else { // scrollToSequence
	                this._scroll.springPosition = scrollToOffset;
	                this._scroll.springSource = SpringSource.GOTOSEQUENCE;
	            }
	            return;
	        }
	
	        // 4. When node not found, keep searching
	        if (this._scroll.scrollToDirection) {
	            this._scroll.springPosition = scrollOffset - size[this._direction];
	            this._scroll.springSource = SpringSource.GOTONEXTDIRECTION;
	
	        }
	        else {
	            this._scroll.springPosition = scrollOffset + size[this._direction];
	            this._scroll.springSource = SpringSource.GOTOPREVDIRECTION;
	        }
	
	        // 5. In case of a VirtualViewSequnce, make sure all the view-sequence nodes are touched, so
	        //    that they are not cleaned up.
	        if (this._viewSequence.cleanup) {
	            var viewSequence = this._viewSequence;
	            while (viewSequence.get() !== scrollToRenderNode) {
	                viewSequence = this._scroll.scrollToDirection ? viewSequence.getNext(true) : viewSequence.getPrevious(true);
	                if (!viewSequence) {
	                    break;
	                }
	            }
	        }
	    }
	
	    /**
	     * Snaps to a page when pagination is enabled.
	     */
	    function _snapToPage() {
	
	        // Check whether pagination is active
	        if (!this.options.paginated ||
	            this._scroll.scrollForceCount || //don't paginate while moving
	            (this._scroll.springPosition !== undefined)) {
	            return;
	        }
	
	        // When the energy is below the thresshold, paginate to the current page
	        var item;
	        switch (this.options.paginationMode) {
	            case PaginationMode.SCROLL:
	                if (!this.options.paginationEnergyThresshold || (Math.abs(this._scroll.particle.getEnergy()) <= this.options.paginationEnergyThresshold)) {
	                    item = this.options.alignment ? this.getLastVisibleItem() : this.getFirstVisibleItem();
	                    if (item && item.renderNode) {
	                        this.goToRenderNode(item.renderNode);
	                    }
	                }
	                break;
	            case PaginationMode.PAGE:
	                item = this.options.alignment ? this.getLastVisibleItem() : this.getFirstVisibleItem();
	                if (item && item.renderNode) {
	                    this.goToRenderNode(item.renderNode);
	                }
	                break;
	        }
	    }
	
	    /**
	     * Normalizes the view-sequence node so that the view-sequence is near to 0.
	     */
	    function _normalizePrevViewSequence(scrollOffset) {
	        var count = 0;
	        var normalizedScrollOffset = scrollOffset;
	        var normalizeNextPrev = false;
	        var node = this._nodes.getStartEnumNode(false);
	        while (node) {
	            if (!node._invalidated || !node._viewSequence) {
	                break;
	            }
	            if (normalizeNextPrev) {
	                this._viewSequence = node._viewSequence;
	                normalizedScrollOffset = scrollOffset;
	                normalizeNextPrev = false;
	            }
	            if ((node.scrollLength === undefined) || node.trueSizeRequested || (scrollOffset < 0)) {
	                break;
	            }
	            scrollOffset -= node.scrollLength;
	            count++;
	            if (node.scrollLength) {
	                if (this.options.alignment) {
	                    normalizeNextPrev = (scrollOffset >= 0);
	                }
	                else {
	                    this._viewSequence = node._viewSequence;
	                    normalizedScrollOffset = scrollOffset;
	                }
	            }
	            node = node._prev;
	        }
	        return normalizedScrollOffset;
	    }
	    function _normalizeNextViewSequence(scrollOffset) {
	        var count = 0;
	        var normalizedScrollOffset = scrollOffset;
	        var node = this._nodes.getStartEnumNode(true);
	        while (node) {
	            if (!node._invalidated || (node.scrollLength === undefined) || node.trueSizeRequested || !node._viewSequence ||
	                ((scrollOffset > 0) && (!this.options.alignment || (node.scrollLength !== 0)))) {
	                break;
	            }
	            if (this.options.alignment) {
	                scrollOffset += node.scrollLength;
	                count++;
	            }
	            if (node.scrollLength || this.options.alignment) {
	                this._viewSequence = node._viewSequence;
	                normalizedScrollOffset = scrollOffset;
	            }
	            if (!this.options.alignment) {
	                scrollOffset += node.scrollLength;
	                count++;
	            }
	            node = node._next;
	        }
	        return normalizedScrollOffset;
	    }
	    function _normalizeViewSequence(size, scrollOffset) {
	
	        // Check whether normalisation is disabled
	        var caps = this._layout.capabilities;
	        if (caps && caps.debug &&
	            (caps.debug.normalize !== undefined) &&
	            !caps.debug.normalize) {
	            return scrollOffset;
	        }
	
	        // Don't normalize when forces are at work
	        if (this._scroll.scrollForceCount) {
	            return scrollOffset;
	        }
	
	        // 1. Normalize in primary direction
	        var normalizedScrollOffset = scrollOffset;
	        if (this.options.alignment && (scrollOffset < 0)) {
	            normalizedScrollOffset = _normalizeNextViewSequence.call(this, scrollOffset);
	        }
	        else if (!this.options.alignment && (scrollOffset > 0)){
	            normalizedScrollOffset = _normalizePrevViewSequence.call(this, scrollOffset);
	        }
	
	        // 2. Normalize in secondary direction
	        if (normalizedScrollOffset === scrollOffset) {
	            if (this.options.alignment && (scrollOffset > 0)) {
	                normalizedScrollOffset = _normalizePrevViewSequence.call(this, scrollOffset);
	            }
	            else if (!this.options.alignment && (scrollOffset < 0)) {
	                normalizedScrollOffset = _normalizeNextViewSequence.call(this, scrollOffset);
	            }
	        }
	
	        // Adjust particle and springs
	        if (normalizedScrollOffset !== scrollOffset) {
	            var delta = normalizedScrollOffset - scrollOffset;
	
	            // Adjust particle
	            var particleValue = this._scroll.particle.getPosition1D();
	            //var particleValue = this._scroll.particleValue;
	            _setParticle.call(this, particleValue + delta, undefined, 'normalize');
	            //_log.call(this, 'normalized scrollOffset: ', normalizedScrollOffset, ', old: ', scrollOffset, ', particle: ', particleValue + delta);
	
	            // Adjust scroll spring
	            if (this._scroll.springPosition !== undefined) {
	                this._scroll.springPosition += delta;
	            }
	
	            // Adjust group offset
	            if (caps && caps.sequentialScrollingOptimized) {
	                this._scroll.groupStart -= delta;
	            }
	        }
	        return normalizedScrollOffset;
	    }
	
	    /**
	     * Get all items that are partly or completely visible.
	     *
	     * The returned result is an array of objects containing the
	     * following properties. Example:
	     * ```javascript
	     * {
	     *   viewSequence: {ViewSequence},
	     *   index: {Number},
	     *   renderNode: {renderable},
	     *   visiblePerc: {Number} 0..1
	     * }
	     * ```
	     * @return {Array} array of items
	     */
	    ScrollController.prototype.getVisibleItems = function() {
	        var size = this._contextSizeCache;
	        var scrollOffset = this.options.alignment ? (this._scroll.unnormalizedScrollOffset + size[this._direction]) : this._scroll.unnormalizedScrollOffset;
	        var result = [];
	        var node = this._nodes.getStartEnumNode(true);
	        while (node) {
	            if (!node._invalidated || (node.scrollLength === undefined) || (scrollOffset > size[this._direction])) {
	                break;
	            }
	            scrollOffset += node.scrollLength;
	            if ((scrollOffset >= 0) && node._viewSequence){
	                result.push({
	                    index: node._viewSequence.getIndex(),
	                    viewSequence: node._viewSequence,
	                    renderNode: node.renderNode,
	                    visiblePerc: node.scrollLength ? ((Math.min(scrollOffset, size[this._direction]) - Math.max(scrollOffset - node.scrollLength, 0)) / node.scrollLength) : 1,
	                    scrollOffset: scrollOffset - node.scrollLength,
	                    scrollLength: node.scrollLength,
	                    _node: node
	                });
	            }
	            node = node._next;
	        }
	        scrollOffset = this.options.alignment ? (this._scroll.unnormalizedScrollOffset + size[this._direction]) : this._scroll.unnormalizedScrollOffset;
	        node = this._nodes.getStartEnumNode(false);
	        while (node) {
	            if (!node._invalidated || (node.scrollLength === undefined) || (scrollOffset < 0)) {
	                break;
	            }
	            scrollOffset -= node.scrollLength;
	            if ((scrollOffset < size[this._direction]) && node._viewSequence) {
	                result.unshift({
	                    index: node._viewSequence.getIndex(),
	                    viewSequence: node._viewSequence,
	                    renderNode: node.renderNode,
	                    visiblePerc: node.scrollLength ? ((Math.min(scrollOffset + node.scrollLength, size[this._direction]) - Math.max(scrollOffset, 0)) / node.scrollLength) : 1,
	                    scrollOffset: scrollOffset,
	                    scrollLength: node.scrollLength,
	                    _node: node
	                });
	            }
	            node = node._prev;
	        }
	        return result;
	    };
	
	    /**
	     * Get the first or last visible item in the view.
	     */
	    function _getVisibleItem(first) {
	        var result = {};
	        var diff;
	        var prevDiff = 10000000;
	        var diffDelta = (first && this.options.alignment) ? -this._contextSizeCache[this._direction] : ((!first && !this.options.alignment) ? this._contextSizeCache[this._direction] : 0);
	        var scrollOffset = this._scroll.unnormalizedScrollOffset;
	        var node = this._nodes.getStartEnumNode(true);
	        while (node) {
	            if (!node._invalidated || (node.scrollLength === undefined)) {
	                break;
	            }
	            if (node._viewSequence) {
	                diff = Math.abs(diffDelta - (scrollOffset + (!first ? node.scrollLength : 0)));
	                if (diff >= prevDiff) {
	                    break;
	                }
	                prevDiff = diff;
	                result.scrollOffset = scrollOffset;
	                result._node = node;
	                scrollOffset += node.scrollLength;
	            }
	            node = node._next;
	        }
	        scrollOffset = this._scroll.unnormalizedScrollOffset;
	        node = this._nodes.getStartEnumNode(false);
	        while (node) {
	            if (!node._invalidated || (node.scrollLength === undefined)) {
	                break;
	            }
	            if (node._viewSequence) {
	                scrollOffset -= node.scrollLength;
	                diff = Math.abs(diffDelta - (scrollOffset + (!first ? node.scrollLength : 0)));
	                if (diff >= prevDiff) {
	                    break;
	                }
	                prevDiff = diff;
	                result.scrollOffset = scrollOffset;
	                result._node = node;
	            }
	            node = node._prev;
	        }
	        if (!result._node) {
	            return undefined;
	        }
	        result.scrollLength = result._node.scrollLength;
	        if (this.options.alignment) {
	            result.visiblePerc = (Math.min(result.scrollOffset + result.scrollLength, 0) - Math.max(result.scrollOffset, -this._contextSizeCache[this._direction])) / result.scrollLength;
	        }
	        else {
	            result.visiblePerc = (Math.min(result.scrollOffset + result.scrollLength, this._contextSizeCache[this._direction]) - Math.max(result.scrollOffset, 0)) / result.scrollLength;
	        }
	        result.index = result._node._viewSequence.getIndex();
	        result.viewSequence = result._node._viewSequence;
	        result.renderNode = result._node.renderNode;
	        return result;
	    }
	
	    /**
	     * Get the first visible item in the view.
	     *
	     * @return {Object} item or `undefined`
	     */
	    ScrollController.prototype.getFirstVisibleItem = function() {
	        return _getVisibleItem.call(this, true);
	    };
	
	    /**
	     * Get the last visible item in the view.
	     *
	     * @return {Object} item or `undefined`
	     */
	    ScrollController.prototype.getLastVisibleItem = function() {
	        return _getVisibleItem.call(this, false);
	    };
	
	    /**
	     * Helper function that goes to a view-sequence either by scrolling
	     * or immediately without any scrolling animation.
	     */
	    function _goToSequence(viewSequence, next, noAnimation) {
	        if (noAnimation) {
	            this._viewSequence = viewSequence;
	            this._scroll.springPosition = undefined;
	            _updateSpring.call(this);
	            this.halt();
	            this._scroll.scrollDelta = 0;
	            _setParticle.call(this, 0, 0, '_goToSequence');
	            this._isDirty = true;
	        }
	        else {
	            this._scroll.scrollToSequence = viewSequence;
	            this._scroll.scrollToRenderNode = viewSequence.get();
	            this._scroll.ensureVisibleRenderNode = undefined;
	            this._scroll.scrollToDirection = next;
	            this._scroll.scrollDirty = true;
	        }
	    }
	
	    /**
	     * Helper function that scrolls the view towards a view-sequence node.
	     */
	    function _ensureVisibleSequence(viewSequence, next) {
	        this._scroll.scrollToSequence = undefined;
	        this._scroll.scrollToRenderNode = undefined;
	        this._scroll.ensureVisibleRenderNode = viewSequence.get();
	        this._scroll.scrollToDirection = next;
	        this._scroll.scrollDirty = true;
	    }
	
	    /**
	     * Moves to the next node in the viewSequence.
	     *
	     * @param {Number} [amount] Amount of nodes to move
	     * @param {Bool} [noAnimation] When set to true, immediately shows the node without any scrolling animation.
	     */
	    function _goToPage(amount, noAnimation) {
	
	        // Get current scroll-position. When a previous call was made to
	        // `scroll' or `scrollTo` and that node has not yet been reached, then
	        // the amount is accumalated onto that scroll target.
	        var viewSequence = (!noAnimation ? this._scroll.scrollToSequence : undefined) || this._viewSequence;
	        if (!this._scroll.scrollToSequence && !noAnimation) {
	            var firstVisibleItem = this.getFirstVisibleItem();
	            if (firstVisibleItem) {
	                viewSequence = firstVisibleItem.viewSequence;
	                if (((amount < 0) && (firstVisibleItem.scrollOffset < 0)) ||
	                    ((amount > 0) && (firstVisibleItem.scrollOffset > 0))) {
	                    amount = 0;
	                }
	            }
	        }
	        if (!viewSequence) {
	            return;
	        }
	
	        // Find scroll target
	        for (var i = 0; i < Math.abs(amount); i++) {
	            var nextViewSequence = (amount > 0) ? viewSequence.getNext() : viewSequence.getPrevious();
	            if (nextViewSequence) {
	                viewSequence = nextViewSequence;
	            }
	            else {
	                break;
	            }
	        }
	        _goToSequence.call(this, viewSequence, amount >= 0, noAnimation);
	    }
	
	    /**
	     * Goes to the first page, making it visible.
	     *
	     * NOTE: This function does not work on ViewSequences that have the `loop` property enabled.
	     *
	     * @param {Bool} [noAnimation] When set to true, immediately shows the node without any scrolling animation.
	     * @return {ScrollController} this
	     */
	    ScrollController.prototype.goToFirstPage = function(noAnimation) {
	        if (!this._viewSequence) {
	            return this;
	        }
	        if (this._viewSequence._ && this._viewSequence._.loop) {
	            LayoutUtility.error('Unable to go to first item of looped ViewSequence');
	            return this;
	        }
	        var viewSequence = this._viewSequence;
	        while (viewSequence) {
	            var prev = viewSequence.getPrevious();
	            if (prev && prev.get()) {
	                viewSequence = prev;
	            }
	            else {
	                break;
	            }
	        }
	        _goToSequence.call(this, viewSequence, false, noAnimation);
	        return this;
	    };
	
	    /**
	     * Goes to the previous page, making it visible.
	     *
	     * @param {Bool} [noAnimation] When set to true, immediately shows the node without any scrolling animation.
	     * @return {ScrollController} this
	     */
	    ScrollController.prototype.goToPreviousPage = function(noAnimation) {
	        _goToPage.call(this, -1, noAnimation);
	        return this;
	    };
	
	    /**
	     * Goes to the next page, making it visible.
	     *
	     * @param {Bool} [noAnimation] When set to true, immediately shows the node without any scrolling animation.
	     * @return {ScrollController} this
	     */
	    ScrollController.prototype.goToNextPage = function(noAnimation) {
	        _goToPage.call(this, 1, noAnimation);
	        return this;
	    };
	
	    /**
	     * Goes to the last page, making it visible.
	     *
	     * NOTE: This function does not work on ViewSequences that have the `loop` property enabled.
	     *
	     * @param {Bool} [noAnimation] When set to true, immediately shows the node without any scrolling animation.
	     * @return {ScrollController} this
	     */
	    ScrollController.prototype.goToLastPage = function(noAnimation) {
	        if (!this._viewSequence) {
	            return this;
	        }
	        if (this._viewSequence._ && this._viewSequence._.loop) {
	            LayoutUtility.error('Unable to go to last item of looped ViewSequence');
	            return this;
	        }
	        var viewSequence = this._viewSequence;
	        while (viewSequence) {
	            var next = viewSequence.getNext();
	            if (next && next.get()) {
	                viewSequence = next;
	            }
	            else {
	                break;
	            }
	        }
	        _goToSequence.call(this, viewSequence, true, noAnimation);
	        return this;
	    };
	
	    /**
	     * Goes to the given renderable in the datasource.
	     *
	     * @param {RenderNode} node renderable to scroll to.
	     * @param {Bool} [noAnimation] When set to true, immediately shows the node without scrolling animation.
	     * @return {ScrollController} this
	     */
	    ScrollController.prototype.goToRenderNode = function(node, noAnimation) {
	
	        // Verify arguments and state
	        if (!this._viewSequence || !node) {
	            return this;
	        }
	
	        // Check current node
	        if (this._viewSequence.get() === node) {
	            var next = _calcScrollOffset.call(this) >= 0;
	            _goToSequence.call(this, this._viewSequence, next, noAnimation);
	            return this;
	        }
	
	        // Find the sequence-node that we want to scroll to.
	        // We look at both directions at the same time.
	        // The first match that is encountered, that direction is chosen.
	        var nextSequence = this._viewSequence.getNext();
	        var prevSequence = this._viewSequence.getPrevious();
	        while ((nextSequence || prevSequence) && (nextSequence !== this._viewSequence)){
	            var nextNode = nextSequence ? nextSequence.get() : undefined;
	            if (nextNode === node) {
	                _goToSequence.call(this, nextSequence, true, noAnimation);
	                break;
	            }
	            var prevNode = prevSequence ? prevSequence.get() : undefined;
	            if (prevNode === node) {
	                _goToSequence.call(this, prevSequence, false, noAnimation);
	                break;
	            }
	            nextSequence = nextNode ? nextSequence.getNext() : undefined;
	            prevSequence = prevNode ? prevSequence.getPrevious() : undefined;
	        }
	        return this;
	    };
	
	    /**
	     * Ensures that a render-node is entirely visible.
	     *
	     * When the node is already visible, nothing happens. If the node is not entirely visible
	     * the view is scrolled as much as needed to make it entirely visibl.
	     *
	     * @param {Number|ViewSequence|Renderable} node index, renderNode or ViewSequence
	     * @return {ScrollController} this
	     */
	    ScrollController.prototype.ensureVisible = function(node) {
	
	        // Convert argument into renderNode
	        if (node instanceof ViewSequence) {
	            node = node.get();
	        }
	        else if ((node instanceof Number) || (typeof node === 'number')) {
	            var viewSequence = this._viewSequence;
	            while (viewSequence.getIndex() < node) {
	                viewSequence = viewSequence.getNext();
	                if (!viewSequence) {
	                    return this;
	                }
	            }
	            while (viewSequence.getIndex() > node) {
	                viewSequence = viewSequence.getPrevious();
	                if (!viewSequence) {
	                    return this;
	                }
	            }
	        }
	
	        // Check current node
	        if (this._viewSequence.get() === node) {
	            var next = _calcScrollOffset.call(this) >= 0;
	            _ensureVisibleSequence.call(this, this._viewSequence, next);
	            return this;
	        }
	
	        // Find the sequence-node that we want to scroll to.
	        // We look at both directions at the same time.
	        // The first match that is encountered, that direction is chosen.
	        var nextSequence = this._viewSequence.getNext();
	        var prevSequence = this._viewSequence.getPrevious();
	        while ((nextSequence || prevSequence) && (nextSequence !== this._viewSequence)){
	            var nextNode = nextSequence ? nextSequence.get() : undefined;
	            if (nextNode === node) {
	                _ensureVisibleSequence.call(this, nextSequence, true);
	                break;
	            }
	            var prevNode = prevSequence ? prevSequence.get() : undefined;
	            if (prevNode === node) {
	                _ensureVisibleSequence.call(this, prevSequence, false);
	                break;
	            }
	            nextSequence = nextNode ? nextSequence.getNext() : undefined;
	            prevSequence = prevNode ? prevSequence.getPrevious() : undefined;
	        }
	
	        return this;
	    };
	
	    /**
	     * Scrolls the view by the specified number of pixels.
	     *
	     * @param {Number} delta Delta in pixels (< 0 = down/right, > 0 = top/left).
	     * @return {ScrollController} this
	     */
	    ScrollController.prototype.scroll = function(delta) {
	        this.halt();
	        this._scroll.scrollDelta += delta;
	        return this;
	    };
	
	    /**
	     * Checks whether the scrollview can scroll the given delta.
	     * When the scrollView can scroll the whole delta, then
	     * the return value is the same as the delta. If it cannot
	     * scroll the entire delta, the return value is the number of
	     * pixels that can be scrolled.
	     *
	     * @param {Number} delta Delta to test
	     * @return {Number} Number of pixels the view is allowed to scroll
	     */
	    ScrollController.prototype.canScroll = function(delta) {
	
	        // Calculate height in both directions
	        var scrollOffset = _calcScrollOffset.call(this);
	        var prevHeight = this._calcScrollHeight(false);
	        var nextHeight = this._calcScrollHeight(true);
	
	        // When the rendered height is smaller than the total height,
	        // then no scrolling whatsover is allowed.
	        var totalHeight;
	        if ((nextHeight !== undefined) && (prevHeight !== undefined)) {
	            totalHeight = prevHeight + nextHeight;
	        }
	        if ((totalHeight !== undefined) && (totalHeight <= this._contextSizeCache[this._direction])) {
	            return 0; // no scrolling at all allowed
	        }
	
	        // Determine the offset that we can scroll
	        if ((delta < 0) && (nextHeight !== undefined)) {
	            var nextOffset = this._contextSizeCache[this._direction] - (scrollOffset + nextHeight);
	            return Math.max(nextOffset, delta);
	        }
	        else if ((delta > 0) && (prevHeight !== undefined)) {
	            var prevOffset = -(scrollOffset - prevHeight);
	            return Math.min(prevOffset, delta);
	        }
	        return delta;
	    };
	
	    /**
	     * Halts all scrolling going on. In essence this function sets
	     * the velocity to 0 and cancels any `goToXxx` operation that
	     * was applied.
	     *
	     * @return {ScrollController} this
	     */
	    ScrollController.prototype.halt = function() {
	        this._scroll.scrollToSequence = undefined;
	        this._scroll.scrollToRenderNode = undefined;
	        this._scroll.ensureVisibleRenderNode = undefined;
	        _setParticle.call(this, undefined, 0, 'halt');
	        return this;
	    };
	
	    /**
	     * Checks whether scrolling is in progress or not.
	     *
	     * @return {Bool} true when scrolling is active
	     */
	    ScrollController.prototype.isScrolling = function() {
	        return this._scroll.isScrolling;
	    };
	
	    /**
	     * Checks whether any boundaries have been reached.
	     *
	     * @return {ScrollController.Bounds} Either, Bounds.PREV, Bounds.NEXT, Bounds.BOTH or Bounds.NONE
	     */
	    ScrollController.prototype.getBoundsReached = function() {
	        return this._scroll.boundsReached;
	    };
	
	    /**
	     * Get the current scrolling velocity.
	     *
	     * @return {Number} Scroll velocity
	     */
	    ScrollController.prototype.getVelocity = function() {
	        return this._scroll.particle.getVelocity1D();
	    };
	
	    /**
	     * Get the current energy of the scrolling particle.
	     *
	     * @return {Number} Energy
	     */
	    ScrollController.prototype.getEnergy = function() {
	        return this._scroll.particle.getEnergy();
	    };
	
	    /**
	     * Set the scrolling velocity.
	     *
	     * @param {Number} velocity New scroll velocity
	     * @return {ScrollController} this
	     */
	    ScrollController.prototype.setVelocity = function(velocity) {
	        return this._scroll.particle.setVelocity1D(velocity);
	    };
	
	    /**
	     * Applies a permanent scroll-force (delta) until it is released.
	     * When the cumulative scroll-offset lies outside the allowed bounds
	     * a strech effect is used, and the offset beyond the bounds is
	     * substracted by halve. This function should always be accompanied
	     * by a call to `releaseScrollForce`.
	     *
	     * This method is used for instance when using touch gestures to move
	     * the scroll offset and corresponds to the `touchstart` event.
	     *
	     * @param {Number} delta Starting scroll-delta force to apply
	     * @return {ScrollController} this
	     */
	    ScrollController.prototype.applyScrollForce = function(delta) {
	        this.halt();
	        if (this._scroll.scrollForceCount === 0) {
	            this._scroll.scrollForceStartItem = this.options.alignment ? this.getLastVisibleItem() : this.getFirstVisibleItem();
	        }
	        this._scroll.scrollForceCount++;
	        this._scroll.scrollForce += delta;
	        return this;
	    };
	
	    /**
	     * Updates a existing scroll-force previously applied by calling
	     * `applyScrollForce`.
	     *
	     * This method is used for instance when using touch gestures to move
	     * the scroll offset and corresponds to the `touchmove` event.
	     *
	     * @param {Number} prevDelta Previous delta
	     * @param {Number} newDelta New delta
	     * @return {ScrollController} this
	     */
	    ScrollController.prototype.updateScrollForce = function(prevDelta, newDelta) {
	        this.halt();
	        newDelta -= prevDelta;
	        this._scroll.scrollForce += newDelta;
	        return this;
	    };
	
	    /**
	     * Releases a scroll-force and sets the velocity.
	     *
	     * This method is used for instance when using touch gestures to move
	     * the scroll offset and corresponds to the `touchend` event.
	     *
	     * @param {Number} delta Scroll delta to release
	     * @param {Number} [velocity] Velocity to apply after which the view keeps scrolling
	     * @return {ScrollController} this
	     */
	    ScrollController.prototype.releaseScrollForce = function(delta, velocity) {
	        this.halt();
	        if (this._scroll.scrollForceCount === 1) {
	            var scrollOffset = _calcScrollOffset.call(this);
	            _setParticle.call(this, scrollOffset, velocity, 'releaseScrollForce');
	            this._scroll.pe.wake();
	            this._scroll.scrollForce = 0;
	            this._scroll.scrollDirty = true;
	            if (this._scroll.scrollForceStartItem && this.options.paginated && (this.options.paginationMode === PaginationMode.PAGE)) {
	                var item = this.options.alignment ? this.getLastVisibleItem(true) : this.getFirstVisibleItem(true);
	                if (item) {
	                    if (item.renderNode !== this._scroll.scrollForceStartItem.renderNode) {
	                        this.goToRenderNode(item.renderNode);
	                    }
	                    else if (this.options.paginationEnergyThresshold && (Math.abs(this._scroll.particle.getEnergy()) >= this.options.paginationEnergyThresshold)) {
	                        velocity = velocity || 0;
	                        if ((velocity < 0) && item._node._next && item._node._next.renderNode) {
	                            this.goToRenderNode(item._node._next.renderNode);
	                        }
	                        else if ((velocity >= 0) && item._node._prev && item._node._prev.renderNode) {
	                            this.goToRenderNode(item._node._prev.renderNode);
	                        }
	                    }
	                    else {
	                        this.goToRenderNode(item.renderNode);
	                    }
	                }
	            }
	            this._scroll.scrollForceStartItem = undefined;
	        }
	        else {
	            this._scroll.scrollForce -= delta;
	        }
	        this._scroll.scrollForceCount--;
	        return this;
	    };
	
	     /**
	     * Get the spec (size, transform, etc..) for the given renderable or
	     * Id.
	     *
	     * @param {Renderable|String} node Renderabe or Id to look for.
	     * @param {Bool} normalize When set to `true` normalizes the origin/align into the transform translation (default: `false`).
	     * @return {Spec} spec or undefined
	     */
	    ScrollController.prototype.getSpec = function(node, normalize) {
	        var spec = LayoutController.prototype.getSpec.apply(this, arguments);
	        if (spec && this._layout.capabilities && this._layout.capabilities.sequentialScrollingOptimized) {
	            spec = {
	                origin: spec.origin,
	                align: spec.align,
	                opacity: spec.opacity,
	                size: spec.size,
	                renderNode: spec.renderNode,
	                transform: spec.transform
	            };
	            var translate = [0, 0, 0];
	            translate[this._direction] = this._scrollOffsetCache + this._scroll.groupStart;
	            spec.transform = Transform.thenMove(spec.transform, translate);
	        }
	        return spec;
	    };
	
	    /**
	     * Executes the layout and updates the state of the scrollview.
	     */
	    function _layout(size, scrollOffset, nested) {
	
	        // Track the number of times the layout-function was executed
	        this._debug.layoutCount++;
	        //_log.call(this, 'Layout, scrollOffset: ', scrollOffset, ', particle: ', this._scroll.particle.getPosition1D());
	
	        // Determine start & end
	        var scrollStart = 0 - Math.max(this.options.extraBoundsSpace[0], 1);
	        var scrollEnd = size[this._direction] + Math.max(this.options.extraBoundsSpace[1], 1);
	        if (this.options.layoutAll) {
	            scrollStart = -1000000;
	            scrollEnd = 1000000;
	        }
	
	        // Prepare for layout
	        var layoutContext = this._nodes.prepareForLayout(
	            this._viewSequence,     // first node to layout
	            this._nodesById, {      // so we can do fast id lookups
	                size: size,
	                direction: this._direction,
	                reverse: this.options.alignment ? true : false,
	                scrollOffset: this.options.alignment ? (scrollOffset + size[this._direction]) : scrollOffset,
	                scrollStart: scrollStart,
	                scrollEnd: scrollEnd
	            }
	        );
	
	        // Layout objects
	        if (this._layout._function) {
	            this._layout._function(
	                layoutContext,          // context which the layout-function can use
	                this._layout.options    // additional layout-options
	            );
	        }
	        this._scroll.unnormalizedScrollOffset = scrollOffset;
	
	        // Call post-layout function
	        if (this._postLayout) {
	            this._postLayout(size, scrollOffset);
	        }
	
	        // Mark non-invalidated nodes for removal
	        this._nodes.removeNonInvalidatedNodes(this.options.flowOptions.removeSpec);
	
	        // Check whether the bounds have been reached
	        //var oldBoundsReached = this._scroll.boundsReached;
	        _calcBounds.call(this, size, scrollOffset);
	        //if (oldBoundsReached !== this._scroll.boundsReached) {
	        //    _log.call(this, 'bounds reached changed (', oldBoundsReached, ' != ', this._scroll.boundsReached, ')');
	        //}
	
	        // Update scroll-to spring
	        _calcScrollToOffset.call(this, size, scrollOffset);
	
	        // When pagination is enabled, snap to page
	        _snapToPage.call(this);
	
	        // If the bounds have changed, and the scroll-offset would be different
	        // than before, then re-layout entirely using the new offset.
	        var newScrollOffset = _calcScrollOffset.call(this, true);
	        if (!nested && (newScrollOffset !== scrollOffset)) {
	            //_log.call(this, 'offset changed, re-layouting... (', scrollOffset, ' != ', newScrollOffset, ')');
	            return _layout.call(this, size, newScrollOffset, true);
	        }
	
	        // Normalize scroll offset so that the current viewsequence node is as close to the
	        // top as possible and the layout function will need to process the least amount
	        // of renderables.
	        scrollOffset = _normalizeViewSequence.call(this, size, scrollOffset);
	
	        // Update spring
	        _updateSpring.call(this);
	
	        // Cleanup any nodes in case of a VirtualViewSequence
	        this._nodes.removeVirtualViewSequenceNodes();
	
	        // Calculate scroll-length and use that as the true-size (height)
	        if (this.options.size && (this.options.size[this._direction] === true)) {
	            var scrollLength = 0;
	            var node = this._nodes.getStartEnumNode();
	            while (node) {
	                if (node._invalidated && node.scrollLength) {
	                    scrollLength += node.scrollLength;
	                }
	                node = node._next;
	            }
	            this._size = this._size || [0, 0];
	            this._size[0] = this.options.size[0];
	            this._size[1] = this.options.size[1];
	            this._size[this._direction] = scrollLength;
	        }
	
	        return scrollOffset;
	    }
	
	    /**
	     * Inner render function of the Group
	     */
	    function _innerRender() {
	        var specs = this._specs;
	        for (var i3 = 0, j3 = specs.length; i3 < j3; i3++) {
	            if (specs[i3].renderNode) {
	                specs[i3].target = specs[i3].renderNode.render();
	            }
	        }
	
	        // Add our cleanup-registration id also to the list, so that the
	        // cleanup function is called by famo.us when the LayoutController is
	        // removed from the render-tree.
	        if (!specs.length || (specs[specs.length-1] !== this._cleanupRegistration)) {
	            specs.push(this._cleanupRegistration);
	        }
	        return specs;
	    }
	
	    /**
	     * Apply changes from this component to the corresponding document element.
	     * This includes changes to classes, styles, size, content, opacity, origin,
	     * and matrix transforms.
	     *
	     * @private
	     * @method commit
	     * @param {Context} context commit context
	     */
	    ScrollController.prototype.commit = function commit(context) {
	        var size = context.size;
	
	        // Update debug info
	        this._debug.commitCount++;
	
	        // Reset the flow-state when requested
	        if (this._resetFlowState) {
	            this._resetFlowState = false;
	            this._isDirty = true;
	            this._nodes.removeAll();
	        }
	
	        // Calculate scroll offset
	        var scrollOffset = _calcScrollOffset.call(this, true, true);
	        if (this._scrollOffsetCache === undefined) {
	            this._scrollOffsetCache = scrollOffset;
	        }
	
	        // When the size or layout function has changed, reflow the layout
	        var emitEndScrollingEvent = false;
	        var emitScrollEvent = false;
	        var eventData;
	        if (size[0] !== this._contextSizeCache[0] ||
	            size[1] !== this._contextSizeCache[1] ||
	            this._isDirty ||
	            this._scroll.scrollDirty ||
	            this._nodes._trueSizeRequested ||
	            this.options.alwaysLayout ||
	            this._scrollOffsetCache !== scrollOffset) {
	
	            // Prepare event data
	            eventData = {
	                target: this,
	                oldSize: this._contextSizeCache,
	                size: size,
	                oldScrollOffset: -(this._scrollOffsetCache + this._scroll.groupStart),
	                scrollOffset: -(scrollOffset + this._scroll.groupStart)
	            };
	
	            // When scroll-offset has changed, emit scroll-start and scroll events
	            if (this._scrollOffsetCache !== scrollOffset) {
	                if (!this._scroll.isScrolling) {
	                    this._scroll.isScrolling = true;
	                    this._eventOutput.emit('scrollstart', eventData);
	                }
	                emitScrollEvent = true;
	            }
	            else if (this._scroll.isScrolling && !this._scroll.scrollForceCount) {
	                emitEndScrollingEvent = true;
	            }
	
	            this._eventOutput.emit('layoutstart', eventData);
	
	            // When the layout has changed, and we are not just scrolling,
	            // disable the locked state of the layout-nodes so that they
	            // can freely transition between the old and new state.
	            if (this.options.flow && (this._isDirty ||
	                (this.options.flowOptions.reflowOnResize &&
	                ((size[0] !== this._contextSizeCache[0]) ||
	                 (size[1] !== this._contextSizeCache[1]))))) {
	                var node = this._nodes.getStartEnumNode();
	                while (node) {
	                    node.releaseLock(true);
	                    node = node._next;
	                }
	            }
	
	            // Update state
	            this._contextSizeCache[0] = size[0];
	            this._contextSizeCache[1] = size[1];
	            this._isDirty = false;
	            this._scroll.scrollDirty = false;
	
	            // Perform layout
	            scrollOffset = _layout.call(this, size, scrollOffset);
	            this._scrollOffsetCache = scrollOffset;
	
	            // Emit end event
	            eventData.scrollOffset = -(this._scrollOffsetCache + this._scroll.groupStart);
	        }
	        else if (this._scroll.isScrolling && !this._scroll.scrollForceCount) {
	            emitEndScrollingEvent = true;
	        }
	
	        // Update output and optionally emit event
	        var groupTranslate = this._scroll.groupTranslate;
	        groupTranslate[0] = 0;
	        groupTranslate[1] = 0;
	        groupTranslate[2] = 0;
	        groupTranslate[this._direction] = -this._scroll.groupStart - scrollOffset;
	        var sequentialScrollingOptimized = this._layout.capabilities ? this._layout.capabilities.sequentialScrollingOptimized : false;
	        var result = this._nodes.buildSpecAndDestroyUnrenderedNodes(sequentialScrollingOptimized ? groupTranslate : undefined);
	        this._specs = result.specs;
	        if (!this._specs.length) {
	          this._scroll.groupStart = 0;
	        }
	        if (eventData) { // eventData is only used here to check whether there has been a re-layout
	            this._eventOutput.emit('layoutend', eventData);
	        }
	        if (result.modified) {
	            this._eventOutput.emit('reflow', {
	                target: this
	            });
	        }
	
	        // View has been scrolled, emit event
	        if (emitScrollEvent) {
	            this._eventOutput.emit('scroll', eventData);
	        }
	
	        // Check whether the current page has changed
	        if (eventData) { // eventData is only used here to check whether there has been a re-layout
	            var visibleItem = this.options.alignment ? this.getLastVisibleItem() : this.getFirstVisibleItem();
	            if ((visibleItem && !this._visibleItemCache) || (!visibleItem && this._visibleItemCache) ||
	                (visibleItem && this._visibleItemCache && (visibleItem.renderNode !== this._visibleItemCache.renderNode))) {
	                this._eventOutput.emit('pagechange', {
	                    target: this,
	                    oldViewSequence: this._visibleItemCache ? this._visibleItemCache.viewSequence : undefined,
	                    viewSequence: visibleItem ? visibleItem.viewSequence : undefined,
	                    oldIndex: this._visibleItemCache ? this._visibleItemCache.index : undefined,
	                    index: visibleItem ? visibleItem.index : undefined,
	                    renderNode: visibleItem ? visibleItem.renderNode : undefined,
	                    oldRenderNode: this._visibleItemCache ? this._visibleItemCache.renderNode : undefined
	                });
	                this._visibleItemCache = visibleItem;
	            }
	        }
	
	        // Emit end scrolling event
	        if (emitEndScrollingEvent) {
	            this._scroll.isScrolling = false;
	            eventData = {
	                target: this,
	                oldSize: size,
	                size: size,
	                oldScrollOffset: -(this._scroll.groupStart + scrollOffset),
	                scrollOffset: -(this._scroll.groupStart + scrollOffset)
	            };
	            this._eventOutput.emit('scrollend', eventData);
	        }
	
	        // When renderables are layed out sequentiall (e.g. a ListLayout or
	        // CollectionLayout), then offset the renderables onto the Group
	        // and move the group offset instead. This creates a very big performance gain
	        // as the renderables don't have to be repositioned for every change
	        // to the scrollOffset. For layouts that don't layout sequence, disable
	        // this behavior as it will be decremental to the performance.
	        var transform = context.transform;
	        if (sequentialScrollingOptimized) {
	            var windowOffset = scrollOffset + this._scroll.groupStart;
	            var translate = [0, 0, 0];
	            translate[this._direction] = windowOffset;
	            transform = Transform.thenMove(transform, translate);
	        }
	
	        // Return the spec
	        return {
	            transform: transform,
	            size: size,
	            opacity: context.opacity,
	            origin: context.origin,
	            target: this.group.render()
	        };
	    };
	
	    /**
	     * Generate a render spec from the contents of this component.
	     *
	     * @private
	     * @method render
	     * @return {number} Render spec for this component
	     */
	    ScrollController.prototype.render = function render() {
	        if (this.container) {
	            return this.container.render.apply(this.container, arguments);
	        }
	        else {
	            return this.id;
	        }
	    };
	
	    module.exports = ScrollController;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 34 */
/*!****************************************!*\
  !*** ../~/famous/utilities/Utility.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Utility = {};
	Utility.Direction = {
	    X: 0,
	    Y: 1,
	    Z: 2
	};
	Utility.after = function after(count, callback) {
	    var counter = count;
	    return function () {
	        counter--;
	        if (counter === 0)
	            callback.apply(this, arguments);
	    };
	};
	Utility.loadURL = function loadURL(url, callback) {
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function onreadystatechange() {
	        if (this.readyState === 4) {
	            if (callback)
	                callback(this.responseText);
	        }
	    };
	    xhr.open('GET', url);
	    xhr.send();
	};
	Utility.createDocumentFragmentFromHTML = function createDocumentFragmentFromHTML(html) {
	    var element = document.createElement('div');
	    element.innerHTML = html;
	    var result = document.createDocumentFragment();
	    while (element.hasChildNodes())
	        result.appendChild(element.firstChild);
	    return result;
	};
	Utility.clone = function clone(b) {
	    var a;
	    if (typeof b === 'object') {
	        a = b instanceof Array ? [] : {};
	        for (var key in b) {
	            if (typeof b[key] === 'object' && b[key] !== null) {
	                if (b[key] instanceof Array) {
	                    a[key] = new Array(b[key].length);
	                    for (var i = 0; i < b[key].length; i++) {
	                        a[key][i] = Utility.clone(b[key][i]);
	                    }
	                } else {
	                    a[key] = Utility.clone(b[key]);
	                }
	            } else {
	                a[key] = b[key];
	            }
	        }
	    } else {
	        a = b;
	    }
	    return a;
	};
	module.exports = Utility;

/***/ },
/* 35 */
/*!**********************************!*\
  !*** ../~/famous/core/Entity.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var entities = [];
	function get(id) {
	    return entities[id];
	}
	function set(id, entity) {
	    entities[id] = entity;
	}
	function register(entity) {
	    var id = entities.length;
	    set(id, entity);
	    return id;
	}
	function unregister(id) {
	    set(id, null);
	}
	module.exports = {
	    register: register,
	    unregister: unregister,
	    get: get,
	    set: set
	};

/***/ },
/* 36 */
/*!*************************************************!*\
  !*** ../~/famous-flex/src/LayoutNodeManager.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014 - 2015
	 */
	
	/**
	 * LayoutNodeManager is a private class used internally by LayoutController, ScrollController
	 * and ScrollView. It manages the layout-nodes that are rendered and exposes the layout-context
	 * which is passed along to the layout-function.
	 *
	 * LayoutNodeManager keeps track of every rendered node through an ordered double-linked
	 * list. The first time the layout-function is called, the linked list is created.
	 * After that, the linked list is updated to reflect the output of the layout-function.
	 * When the layout is unchanged, then the linked-list exactly matches the order of the
	 * accessed nodes in the layout-function, and no layout-nodes need to be created or
	 * re-ordered.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var LayoutContext = __webpack_require__(/*! ./LayoutContext */ 55);
	    var LayoutUtility = __webpack_require__(/*! ./LayoutUtility */ 17);
	
	    var MAX_POOL_SIZE = 100;
	
	    /**
	     * @class
	     * @param {LayoutNode} LayoutNode Layout-nodes to create
	     * @param {Function} initLayoutNodeFn function to use when initializing new nodes
	     * @alias module:LayoutNodeManager
	     */
	    function LayoutNodeManager(LayoutNode, initLayoutNodeFn) {
	        this.LayoutNode = LayoutNode;
	        this._initLayoutNodeFn = initLayoutNodeFn;
	        this._layoutCount = 0;
	        this._context = new LayoutContext({
	            next: _contextNext.bind(this),
	            prev: _contextPrev.bind(this),
	            get: _contextGet.bind(this),
	            set: _contextSet.bind(this),
	            resolveSize: _contextResolveSize.bind(this),
	            size: [0, 0]
	            //,cycle: 0
	        });
	        this._contextState = {
	            // enumation state for the context
	            //nextSequence: undefined,
	            //prevSequence: undefined,
	            //next: undefined
	            //prev: undefined
	            //start: undefined
	        };
	        this._pool = {
	            layoutNodes: {
	                size: 0
	                //first: undefined
	            },
	            resolveSize: [0, 0]
	        };
	        //this._first = undefined; // first item in the linked list
	        //this._nodesById = undefined;
	        //this._trueSizeRequested = false;
	    }
	
	    /**
	     * Prepares the manager for a new layout iteration, after which it returns the
	     * context which can be used by the layout-function.
	     *
	     * @param {ViewSequence} viewSequence first node to layout
	     * @param {Object} [nodesById] dictionary to use when looking up nodes by id
	     * @return {LayoutContext} context which can be passed to the layout-function
	     */
	    LayoutNodeManager.prototype.prepareForLayout = function(viewSequence, nodesById, contextData) {
	
	        // Reset all nodes
	        var node = this._first;
	        while (node) {
	            node.reset();
	            node = node._next;
	        }
	
	        // Prepare data
	        var context = this._context;
	        this._layoutCount++;
	        this._nodesById = nodesById;
	        this._trueSizeRequested = false;
	        this._reevalTrueSize =
	            contextData.reevalTrueSize ||
	            !context.size ||
	            (context.size[0] !== contextData.size[0]) ||
	            (context.size[1] !== contextData.size[1]);
	
	        // Prepare context for enumation
	        var contextState = this._contextState;
	        contextState.startSequence = viewSequence;
	        contextState.nextSequence = viewSequence;
	        contextState.prevSequence = viewSequence;
	        contextState.start = undefined;
	        contextState.nextGetIndex = 0;
	        contextState.prevGetIndex = 0;
	        contextState.nextSetIndex = 0;
	        contextState.prevSetIndex = 0;
	        contextState.addCount = 0;
	        contextState.removeCount = 0;
	        contextState.lastRenderNode = undefined;
	
	        // Prepare content
	        context.size[0] = contextData.size[0];
	        context.size[1] = contextData.size[1];
	        context.direction = contextData.direction;
	        context.reverse = contextData.reverse;
	        context.alignment = contextData.reverse ? 1 : 0;
	        context.scrollOffset = contextData.scrollOffset || 0;
	        context.scrollStart = contextData.scrollStart || 0;
	        context.scrollEnd = contextData.scrollEnd || context.size[context.direction];
	        //context.cycle++;
	        return context;
	    };
	
	    /**
	     * When the layout-function no longer lays-out the node, then it is not longer
	     * being invalidated. In this case the destination is set to the removeSpec
	     * after which the node is animated towards the remove-spec.
	     *
	     * @param {Spec} [removeSpec] spec towards which the no longer layed-out nodes are animated
	     */
	    LayoutNodeManager.prototype.removeNonInvalidatedNodes = function(removeSpec) {
	        var node = this._first;
	        while (node) {
	
	            // If a node existed, but it is no longer being layed out,
	            // then set it to the '_removing' state.
	            if (!node._invalidated && !node._removing) {
	                node.remove(removeSpec);
	            }
	
	            // Move to next node
	            node = node._next;
	        }
	    };
	
	    /**
	     * Cleans up any unaccessed virtual nodes that have been created by a VirtualViewSequence.
	     */
	    LayoutNodeManager.prototype.removeVirtualViewSequenceNodes = function() {
	        if (this._contextState.startSequence && this._contextState.startSequence.cleanup) {
	            this._contextState.startSequence.cleanup();
	        }
	    };
	
	    /**
	     * Builds the render-spec and destroy any layout-nodes that no longer
	     * return a render-spec.
	     *
	     * @return {Array.Spec} array of Specs
	     */
	    LayoutNodeManager.prototype.buildSpecAndDestroyUnrenderedNodes = function(translate) {
	        var specs = [];
	        var result = {
	            specs: specs,
	            modified: false
	        };
	        var node = this._first;
	        while (node) {
	            var modified = node._specModified;
	            var spec = node.getSpec();
	            if (spec.removed) {
	
	                // Destroy node
	                var destroyNode = node;
	                node = node._next;
	                _destroyNode.call(this, destroyNode);
	
	                // Mark as modified
	                result.modified = true;
	            }
	            else {
	
	                // Update stats
	                if (modified) {
	                    if (spec.transform && translate) {
	                        spec.transform[12] += translate[0];
	                        spec.transform[13] += translate[1];
	                        spec.transform[14] += translate[2];
	                        spec.transform[12] = Math.round(spec.transform[12] * 100000) / 100000;
	                        spec.transform[13] = Math.round(spec.transform[13] * 100000) / 100000;
	                        if (spec.endState) {
	                            spec.endState.transform[12] += translate[0];
	                            spec.endState.transform[13] += translate[1];
	                            spec.endState.transform[14] += translate[2];
	                            spec.endState.transform[12] = Math.round(spec.endState.transform[12] * 100000) / 100000;
	                            spec.endState.transform[13] = Math.round(spec.endState.transform[13] * 100000) / 100000;
	                        }
	                    }
	                    result.modified = true;
	                }
	
	                // Add node to result output
	                specs.push(spec);
	                node = node._next;
	            }
	        }
	        this._contextState.addCount = 0;
	        this._contextState.removeCount = 0;
	        return result;
	    };
	
	    /**
	     * Get the layout-node by its renderable.
	     *
	     * @param {Object} renderable renderable
	     * @return {LayoutNode} layout-node or undefined
	     */
	    LayoutNodeManager.prototype.getNodeByRenderNode = function(renderable) {
	        var node = this._first;
	        while (node) {
	            if (node.renderNode === renderable) {
	                return node;
	            }
	            node = node._next;
	        }
	        return undefined;
	    };
	
	    /**
	     * Inserts a layout-node into the linked-list.
	     *
	     * @param {LayoutNode} node layout-node to insert
	     */
	    LayoutNodeManager.prototype.insertNode = function(node) {
	        node._next = this._first;
	        if (this._first) {
	            this._first._prev = node;
	        }
	        this._first = node;
	    };
	
	    /**
	     * Sets the options for all nodes.
	     *
	     * @param {Object} options node options
	     */
	    LayoutNodeManager.prototype.setNodeOptions = function(options) {
	        this._nodeOptions = options;
	        var node = this._first;
	        while (node) {
	            node.setOptions(options);
	            node = node._next;
	        }
	        node = this._pool.layoutNodes.first;
	        while (node) {
	            node.setOptions(options);
	            node = node._next;
	        }
	    };
	
	    /**
	     * Pre-allocate layout-nodes ahead of using them.
	     *
	     * @param {Number} count number of nodes to pre-allocate with the given spec
	     * @param {Spec} [spec] render-spec (defined the node properties which to pre-allocate)
	     */
	    LayoutNodeManager.prototype.preallocateNodes = function(count, spec) {
	        var nodes = [];
	        for (var i = 0; i < count ; i++) {
	            nodes.push(this.createNode(undefined, spec));
	        }
	        for (i = 0; i < count ; i++) {
	            _destroyNode.call(this, nodes[i]);
	        }
	    };
	
	    /**
	     * Creates a layout-node
	     *
	     * @param {Object} renderNode render-node for whom to create a layout-node for
	     * @return {LayoutNode} layout-node
	     */
	    LayoutNodeManager.prototype.createNode = function(renderNode, spec) {
	        var node;
	        if (this._pool.layoutNodes.first) {
	            node = this._pool.layoutNodes.first;
	            this._pool.layoutNodes.first = node._next;
	            this._pool.layoutNodes.size--;
	            node.constructor.apply(node, arguments);
	        }
	        else {
	            node = new this.LayoutNode(renderNode, spec);
	            if (this._nodeOptions) {
	                node.setOptions(this._nodeOptions);
	            }
	        }
	        node._prev = undefined;
	        node._next = undefined;
	        node._viewSequence = undefined;
	        node._layoutCount = 0;
	        if (this._initLayoutNodeFn) {
	            this._initLayoutNodeFn.call(this, node, spec);
	        }
	        return node;
	    };
	
	    /**
	     * Removes all nodes.
	     */
	    LayoutNodeManager.prototype.removeAll = function() {
	        var node = this._first;
	        while (node) {
	          var next = node._next;
	          _destroyNode.call(this, node);
	          node = next;
	        }
	        this._first = undefined;
	    };
	
	    /**
	     * Destroys a layout-node
	     */
	    function _destroyNode(node) {
	
	        // Remove node from linked-list
	        if (node._next) {
	            node._next._prev = node._prev;
	        }
	        if (node._prev) {
	            node._prev._next = node._next;
	        }
	        else {
	            this._first = node._next;
	        }
	
	        // Destroy the node
	        node.destroy();
	
	        // Add node to pool
	        if (this._pool.layoutNodes.size < MAX_POOL_SIZE) {
	            this._pool.layoutNodes.size++;
	            node._prev = undefined;
	            node._next = this._pool.layoutNodes.first;
	            this._pool.layoutNodes.first = node;
	        }
	    }
	
	    /**
	     * Gets start layout-node for enumeration.
	     *
	     * @param {Bool} [next] undefined = all, true = all next, false = all previous
	     * @return {LayoutNode} layout-node or undefined
	     */
	    LayoutNodeManager.prototype.getStartEnumNode = function(next) {
	        if (next === undefined) {
	            return this._first;
	        }
	        else if (next === true) {
	            return (this._contextState.start && this._contextState.startPrev) ? this._contextState.start._next : this._contextState.start;
	        }
	        else if (next === false) {
	            return (this._contextState.start && !this._contextState.startPrev) ? this._contextState.start._prev : this._contextState.start;
	        }
	    };
	
	    /**
	     * Checks the integrity of the linked-list.
	     */
	    /*function _checkIntegrity() {
	        var node = this._first;
	        var count = 0;
	        var prevNode;
	        while (node) {
	            if (!node._prev && (node !== this._first)) {
	                throw 'No prev but not first';
	            }
	            if (node._prev !== prevNode) {
	                throw 'Bork';
	            }
	            prevNode = node;
	            node = node._next;
	            count++;
	        }
	    }
	
	    function _checkContextStateIntegrity() {
	        var node = this._contextState.start;
	        while (node) {
	            if (node === this._contextState.next) {
	                break;
	            }
	            if (!node._invalidated) {
	                throw 'WTF';
	            }
	            node = node._next;
	        }
	        node = this._contextState.start;
	        while (node) {
	            if (node === this._contextState.prev) {
	                break;
	            }
	            if (!node._invalidated) {
	                throw 'WTF';
	            }
	            node = node._prev;
	        }
	    }*/
	
	    /**
	     * Creates or gets a layout node.
	     */
	    function _contextGetCreateAndOrderNodes(renderNode, prev) {
	
	        // The first time this function is called, the current
	        // prev/next position is obtained.
	        var node;
	        var state = this._contextState;
	        if (!state.start) {
	            node = this._first;
	            while (node) {
	                if (node.renderNode === renderNode) {
	                    break;
	                }
	                node = node._next;
	            }
	            if (!node) {
	                node = this.createNode(renderNode);
	                node._next = this._first;
	                if (this._first) {
	                    this._first._prev = node;
	                }
	                this._first = node;
	            }
	            state.start = node;
	            state.startPrev = prev;
	            state.prev = node;
	            state.next = node;
	            return node;
	        }
	
	        // Check whether node already exist at the correct position
	        // in the linked-list. If so, return that node immediately
	        // and advance the prev/next pointer for the next/prev
	        // lookup operation.
	        if (prev) {
	            if (state.prev._prev && (state.prev._prev.renderNode === renderNode)) {
	                state.prev = state.prev._prev;
	                return state.prev;
	            }
	        }
	        else {
	            if (state.next._next && (state.next._next.renderNode === renderNode)) {
	                state.next = state.next._next;
	                return state.next;
	            }
	        }
	
	        // Lookup the node anywhere in the list..
	        node = this._first;
	        while (node) {
	            if (node.renderNode === renderNode) {
	                break;
	            }
	            node = node._next;
	        }
	
	        // Create new node if neccessary
	        if (!node) {
	            node = this.createNode(renderNode);
	        }
	
	        // Node existed, remove from linked-list
	        else {
	            if (node._next) {
	                node._next._prev = node._prev;
	            }
	            if (node._prev) {
	                node._prev._next = node._next;
	            }
	            else {
	                this._first = node._next;
	            }
	            node._next = undefined;
	            node._prev = undefined;
	        }
	
	        // Insert node into the linked list
	        if (prev) {
	            if (state.prev._prev) {
	                node._prev = state.prev._prev;
	                state.prev._prev._next = node;
	            }
	            else {
	                this._first = node;
	            }
	            state.prev._prev = node;
	            node._next = state.prev;
	            state.prev = node;
	        }
	        else {
	            if (state.next._next) {
	                node._next = state.next._next;
	                state.next._next._prev = node;
	            }
	            state.next._next = node;
	            node._prev = state.next;
	            state.next = node;
	        }
	
	        return node;
	    }
	
	    /**
	     * Get the next render-node
	     */
	    function _contextNext() {
	
	        // Get the next node from the sequence
	        if (!this._contextState.nextSequence) {
	            return undefined;
	        }
	        if (this._context.reverse) {
	            this._contextState.nextSequence = this._contextState.nextSequence.getNext();
	            if (!this._contextState.nextSequence) {
	                return undefined;
	            }
	        }
	        var renderNode = this._contextState.nextSequence.get();
	        if (!renderNode) {
	            this._contextState.nextSequence = undefined;
	            return undefined;
	        }
	        var nextSequence = this._contextState.nextSequence;
	        if (!this._context.reverse) {
	            this._contextState.nextSequence = this._contextState.nextSequence.getNext();
	        }
	        if (this._contextState.lastRenderNode === renderNode) {
	          throw 'ViewSequence is corrupted, should never contain the same renderNode twice, index: ' + nextSequence.getIndex();
	        }
	        this._contextState.lastRenderNode = renderNode;
	        return {
	            renderNode: renderNode,
	            viewSequence: nextSequence,
	            next: true,
	            index: ++this._contextState.nextGetIndex
	        };
	    }
	
	    /**
	     * Get the previous render-node
	     */
	    function _contextPrev() {
	
	        // Get the previous node from the sequence
	        if (!this._contextState.prevSequence) {
	            return undefined;
	        }
	        if (!this._context.reverse) {
	            this._contextState.prevSequence = this._contextState.prevSequence.getPrevious();
	            if (!this._contextState.prevSequence) {
	                return undefined;
	            }
	        }
	        var renderNode = this._contextState.prevSequence.get();
	        if (!renderNode) {
	            this._contextState.prevSequence = undefined;
	            return undefined;
	        }
	        var prevSequence = this._contextState.prevSequence;
	        if (this._context.reverse) {
	            this._contextState.prevSequence = this._contextState.prevSequence.getPrevious();
	        }
	        if (this._contextState.lastRenderNode === renderNode) {
	          throw 'ViewSequence is corrupted, should never contain the same renderNode twice, index: ' + prevSequence.getIndex();
	        }
	        this._contextState.lastRenderNode = renderNode;
	        return {
	            renderNode: renderNode,
	            viewSequence: prevSequence,
	            prev: true,
	            index: --this._contextState.prevGetIndex
	        };
	    }
	
	    /**
	     * Resolve id into a context-node.
	     */
	     function _contextGet(contextNodeOrId) {
	        if (this._nodesById && ((contextNodeOrId instanceof String) || (typeof contextNodeOrId === 'string'))) {
	            var renderNode = this._nodesById[contextNodeOrId];
	            if (!renderNode) {
	                return undefined;
	            }
	
	            // Return array
	            if (renderNode instanceof Array) {
	                var result = [];
	                for (var i = 0, j = renderNode.length; i < j; i++) {
	                    result.push({
	                        renderNode: renderNode[i],
	                        arrayElement: true
	                    });
	                }
	                return result;
	            }
	
	            // Create context node
	            return {
	                renderNode: renderNode,
	                byId: true
	            };
	        }
	        else {
	            return contextNodeOrId;
	        }
	    }
	
	    /**
	     * Set the node content
	     */
	    function _contextSet(contextNodeOrId, set) {
	        var contextNode = this._nodesById ? _contextGet.call(this, contextNodeOrId) : contextNodeOrId;
	        if (contextNode) {
	            var node = contextNode.node;
	            if (!node) {
	                if (contextNode.next) {
	                     if (contextNode.index < this._contextState.nextSetIndex) {
	                        LayoutUtility.error('Nodes must be layed out in the same order as they were requested!');
	                     }
	                     this._contextState.nextSetIndex = contextNode.index;
	                }
	                else if (contextNode.prev) {
	                     if (contextNode.index > this._contextState.prevSetIndex) {
	                        LayoutUtility.error('Nodes must be layed out in the same order as they were requested!');
	                     }
	                     this._contextState.prevSetIndex = contextNode.index;
	                }
	                node = _contextGetCreateAndOrderNodes.call(this, contextNode.renderNode, contextNode.prev);
	                node._viewSequence = contextNode.viewSequence;
	                node._layoutCount++;
	                if (node._layoutCount === 1) {
	                    this._contextState.addCount++;
	                }
	                contextNode.node = node;
	            }
	            node.usesTrueSize = contextNode.usesTrueSize;
	            node.trueSizeRequested = contextNode.trueSizeRequested;
	            node.set(set, this._context.size);
	            contextNode.set = set;
	        }
	        return set;
	    }
	
	    /**
	     * Resolve the size of the layout-node from the renderable itsself
	     */
	    function _contextResolveSize(contextNodeOrId, parentSize) {
	        var contextNode = this._nodesById ? _contextGet.call(this, contextNodeOrId) : contextNodeOrId;
	        var resolveSize = this._pool.resolveSize;
	        if (!contextNode) {
	            resolveSize[0] = 0;
	            resolveSize[1] = 0;
	            return resolveSize;
	        }
	
	        // Get in use size
	        var renderNode = contextNode.renderNode;
	        var size = renderNode.getSize();
	        if (!size) {
	            return parentSize;
	        }
	
	        // Check if true-size is used and it must be reavaluated.
	        // This particular piece of code specifically handles true-size Surfaces in famo.us.
	        // It contains portions that ensure that the true-size of a Surface is re-evaluated
	        // and also workaround code that backs up the size of a Surface, so that when the surface
	        // is re-added to the DOM (e.g. when scrolling) it doesn't temporarily have a size of 0.
	        var configSize = renderNode.size && (renderNode._trueSizeCheck !== undefined) ? renderNode.size : undefined;
	        if (configSize && ((configSize[0] === true) || (configSize[1] === true))) {
	            contextNode.usesTrueSize = true;
	            var backupSize = renderNode._backupSize;
	            if (renderNode._contentDirty || renderNode._trueSizeCheck) {
	              this._trueSizeRequested = true;
	              contextNode.trueSizeRequested = true;
	            }
	            if (renderNode._trueSizeCheck) {
	
	                // Fix for true-size renderables. When true-size is used, the size
	                // is incorrect for one render-cycle due to the fact that Surface.commit
	                // updates the content after asking the DOM for the offsetHeight/offsetWidth.
	                // The code below backs the size up, and re-uses that when this scenario
	                // occurs.
	                if (backupSize && (configSize !== size)) {
	                    var newWidth = (configSize[0] === true) ? Math.max(backupSize[0], size[0]) : size[0];
	                    var newHeight = (configSize[1] === true) ? Math.max(backupSize[1], size[1]) : size[1];
	                    backupSize[0] = newWidth;
	                    backupSize[1] = newHeight;
	                    size = backupSize;
	                    renderNode._backupSize = undefined;
	                    backupSize = undefined;
	                }
	            }
	            if (this._reevalTrueSize || (backupSize && ((backupSize[0] !== size[0]) || (backupSize[1] !== size[1])))) {
	                renderNode._trueSizeCheck = true; // force request of true-size from DOM
	                renderNode._sizeDirty = true;
	                this._trueSizeRequested = true;
	            }
	
	            // Backup the size of the node
	            if (!backupSize) {
	                renderNode._backupSize = [0, 0];
	                backupSize = renderNode._backupSize;
	            }
	            backupSize[0] = size[0];
	            backupSize[1] = size[1];
	        }
	
	        // Ensure re-layout when a child layout-controller is using true-size and it
	        // has ben changed.
	        configSize = renderNode._nodes ? renderNode.options.size : undefined;
	        if (configSize && ((configSize[0] === true) || (configSize[1] === true))) {
	            if (this._reevalTrueSize || renderNode._nodes._trueSizeRequested) {
	                contextNode.usesTrueSize = true;
	                contextNode.trueSizeRequested = true;
	                this._trueSizeRequested = true;
	            }
	        }
	
	        // Resolve 'undefined' to parent-size and true to 0
	        if ((size[0] === undefined) || (size[0] === true) || (size[1] === undefined) || (size[1] === true)) {
	            resolveSize[0] = size[0];
	            resolveSize[1] = size[1];
	            size = resolveSize;
	            if (size[0] === undefined) {
	                size[0] = parentSize[0];
	            }
	            else if (size[0] === true) {
	                size[0] = 0;
	                this._trueSizeRequested = true;
	                contextNode.trueSizeRequested = true;
	            }
	            if (size[1] === undefined) {
	                size[1] = parentSize[1];
	            }
	            else if (size[1] === true) {
	                size[1] = 0;
	                this._trueSizeRequested = true;
	                contextNode.trueSizeRequested = true;
	            }
	        }
	        return size;
	    }
	
	    module.exports = LayoutNodeManager;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 37 */
/*!******************************************!*\
  !*** ../~/famous-flex/src/LayoutNode.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014
	 */
	
	/**
	 * Internal LayoutNode class used by `LayoutController`.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var Transform = __webpack_require__(/*! famous/core/Transform */ 39);
	    var LayoutUtility = __webpack_require__(/*! ./LayoutUtility */ 17);
	
	    /**
	     * @class
	     * @param {Object} renderNode Render-node which this layout-node represents
	     * @alias module:LayoutNode
	     */
	    function LayoutNode(renderNode, spec) {
	        this.renderNode = renderNode;
	        this._spec = spec ? LayoutUtility.cloneSpec(spec) : {};
	        this._spec.renderNode = renderNode; // also store in spec
	        this._specModified = true;
	        this._invalidated = false;
	        this._removing = false;
	        //this.scrollLength = undefined;
	        //this.trueSizeRequested = false;
	    }
	
	    /**
	     * Called to update the underlying render-node
	     */
	    LayoutNode.prototype.setRenderNode = function(renderNode) {
	        this.renderNode = renderNode;
	        this._spec.renderNode = renderNode;
	    };
	
	    /**
	     * Called to update the options for the node
	     */
	    LayoutNode.prototype.setOptions = function(options) {
	        // override to implement
	    };
	
	    /**
	     * Called when the node is destroyed
	     */
	    LayoutNode.prototype.destroy = function() {
	        this.renderNode = undefined;
	        this._spec.renderNode = undefined;
	        this._viewSequence = undefined;
	    };
	
	    /**
	     * Reset the end-state. This function is called on all layout-nodes prior to
	     * calling the layout-function. So that the layout-function starts with a clean slate.
	     */
	    LayoutNode.prototype.reset = function() {
	        this._invalidated = false;
	        this.trueSizeRequested = false;
	    };
	
	    /**
	     * Set the spec of the node
	     *
	     * @param {Object} spec
	     */
	    LayoutNode.prototype.setSpec = function(spec) {
	        this._specModified = true;
	        if (spec.align) {
	            if (!spec.align) {
	                this._spec.align = [0, 0];
	            }
	            this._spec.align[0] = spec.align[0];
	            this._spec.align[1] = spec.align[1];
	        }
	        else {
	            this._spec.align = undefined;
	        }
	        if (spec.origin) {
	            if (!spec.origin) {
	                this._spec.origin = [0, 0];
	            }
	            this._spec.origin[0] = spec.origin[0];
	            this._spec.origin[1] = spec.origin[1];
	        }
	        else {
	            this._spec.origin = undefined;
	        }
	        if (spec.size) {
	            if (!spec.size) {
	                this._spec.size = [0, 0];
	            }
	            this._spec.size[0] = spec.size[0];
	            this._spec.size[1] = spec.size[1];
	        }
	        else {
	            this._spec.size = undefined;
	        }
	        if (spec.transform) {
	            if (!spec.transform) {
	                this._spec.transform = spec.transform.slice(0);
	            }
	            else {
	                for (var i = 0; i < 16; i++) {
	                    this._spec.transform[i] = spec.transform[i];
	                }
	            }
	        }
	        else {
	            this._spec.transform = undefined;
	        }
	        this._spec.opacity = spec.opacity;
	    };
	
	    /**
	     * Set the content of the node
	     *
	     * @param {Object} set
	     */
	    LayoutNode.prototype.set = function(set, size) {
	        this._invalidated = true;
	        this._specModified = true;
	        this._removing = false;
	        var spec = this._spec;
	        spec.opacity = set.opacity;
	        if (set.size) {
	            if (!spec.size) {
	                spec.size = [0, 0];
	            }
	            spec.size[0] = set.size[0];
	            spec.size[1] = set.size[1];
	        }
	        else {
	            spec.size = undefined;
	        }
	        if (set.origin) {
	            if (!spec.origin) {
	                spec.origin = [0, 0];
	            }
	            spec.origin[0] = set.origin[0];
	            spec.origin[1] = set.origin[1];
	        }
	        else {
	            spec.origin = undefined;
	        }
	        if (set.align) {
	            if (!spec.align) {
	                spec.align = [0, 0];
	            }
	            spec.align[0] = set.align[0];
	            spec.align[1] = set.align[1];
	        }
	        else {
	            spec.align = undefined;
	        }
	
	        if (set.skew || set.rotate || set.scale) {
	            this._spec.transform = Transform.build({
	                translate: set.translate || [0, 0, 0],
	                skew: set.skew || [0, 0, 0],
	                scale: set.scale || [1, 1, 1],
	                rotate: set.rotate || [0, 0, 0]
	            });
	        }
	        else if (set.translate) {
	            this._spec.transform = Transform.translate(set.translate[0], set.translate[1], set.translate[2]);
	        }
	        else {
	            this._spec.transform = undefined;
	        }
	        this.scrollLength = set.scrollLength;
	    };
	
	    /**
	     * Creates the render-spec
	     */
	    LayoutNode.prototype.getSpec = function() {
	        this._specModified = false;
	        this._spec.removed = !this._invalidated;
	        return this._spec;
	    };
	
	    /**
	     * Marks the node for removal
	     */
	    LayoutNode.prototype.remove = function(removeSpec) {
	        this._removing = true;
	    };
	
	    module.exports = LayoutNode;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 38 */
/*!**********************************************!*\
  !*** ../~/famous-flex/src/FlowLayoutNode.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014 - 2015
	 */
	
	/**
	 * Internal LayoutNode class used by `LayoutNodeManager`.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    // import dependencies
	    var OptionsManager = __webpack_require__(/*! famous/core/OptionsManager */ 31);
	    var Transform = __webpack_require__(/*! famous/core/Transform */ 39);
	    var Vector = __webpack_require__(/*! famous/math/Vector */ 49);
	    var Particle = __webpack_require__(/*! famous/physics/bodies/Particle */ 51);
	    var Spring = __webpack_require__(/*! famous/physics/forces/Spring */ 53);
	    var PhysicsEngine = __webpack_require__(/*! famous/physics/PhysicsEngine */ 50);
	    var LayoutNode = __webpack_require__(/*! ./LayoutNode */ 37);
	    var Transitionable = __webpack_require__(/*! famous/transitions/Transitionable */ 46);
	
	    /**
	     * @class
	     * @extends LayoutNode
	     * @param {Object} renderNode Render-node which this layout-node represents
	     * @param {Spec} spec Initial state
	     * @param {Object} physicsEngines physics-engines to use
	     * @alias module:FlowLayoutNode
	     */
	    function FlowLayoutNode(renderNode, spec) {
	        LayoutNode.apply(this, arguments);
	
	        if (!this.options) {
	            this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
	            this._optionsManager = new OptionsManager(this.options);
	        }
	
	        if (!this._pe) {
	            this._pe = new PhysicsEngine();
	            this._pe.sleep();
	        }
	
	        if (!this._properties) {
	            this._properties = {};
	        }
	        else {
	            for (var propName in this._properties) {
	                this._properties[propName].init = false;
	            }
	        }
	
	        if (!this._lockTransitionable) {
	            this._lockTransitionable = new Transitionable(1);
	        }
	        else {
	            this._lockTransitionable.halt();
	            this._lockTransitionable.reset(1);
	        }
	
	        this._specModified = true;
	        this._initial = true;
	        this._spec.endState = {};
	        if (spec) {
	            this.setSpec(spec);
	        }
	    }
	    FlowLayoutNode.prototype = Object.create(LayoutNode.prototype);
	    FlowLayoutNode.prototype.constructor = FlowLayoutNode;
	
	    FlowLayoutNode.DEFAULT_OPTIONS = {
	        spring: {
	            dampingRatio: 0.8,
	            period: 300
	        },
	        properties: {
	            opacity: true,
	            align: true,
	            origin: true,
	            size: true,
	            translate: true,
	            skew: true,
	            rotate: true,
	            scale: true
	        },
	        particleRounding: 0.001
	    };
	
	    /**
	     * Defaults
	     */
	    var DEFAULT = {
	        opacity: 1,
	        opacity2D: [1, 0],
	        size: [0, 0],
	        origin: [0, 0],
	        align: [0, 0],
	        scale: [1, 1, 1],
	        translate: [0, 0, 0],
	        rotate: [0, 0, 0],
	        skew: [0, 0, 0]
	    };
	
	    /**
	     * Verifies that the integrity of the layout-node is oke.
	     */
	    /*function _verifyIntegrity() {
	        var i;
	        for (var propName in this._properties) {
	            var prop = this._properties[propName];
	            if (prop.particle) {
	                if (isNaN(prop.particle.getEnergy())) {
	                    throw 'invalid particle energy: ' + propName;
	                }
	                var value = prop.particle.getPosition();
	                for (i = 0; i < value.length; i++) {
	                    if (isNaN(value[i])) {
	                       throw 'invalid particle value: ' + propName + '(' + i + ')';
	                    }
	                }
	                value = prop.endState.get();
	                for (i = 0; i < value.length; i++) {
	                    if (isNaN(value[i])) {
	                       throw 'invalid endState value: ' + propName + '(' + i + ')';
	                    }
	                }
	            }
	        }
	    }*/
	
	    /**
	     * Sets the configuration options
	     */
	    FlowLayoutNode.prototype.setOptions = function(options) {
	        this._optionsManager.setOptions(options);
	        var wasSleeping = this._pe.isSleeping();
	        for (var propName in this._properties) {
	            var prop = this._properties[propName];
	            if (options.spring && prop.force) {
	                prop.force.setOptions(this.options.spring);
	            }
	            if (options.properties && (options.properties[propName] !== undefined)) {
	                if (this.options.properties[propName].length) {
	                    prop.enabled = this.options.properties[propName];
	                }
	                else {
	                    prop.enabled = [
	                        this.options.properties[propName],
	                        this.options.properties[propName],
	                        this.options.properties[propName]
	                    ];
	                }
	            }
	        }
	        if (wasSleeping) {
	            this._pe.sleep();
	        }
	        return this;
	    };
	
	    /**
	     * Set the properties from a spec.
	     */
	    FlowLayoutNode.prototype.setSpec = function(spec) {
	        var set;
	        if (spec.transform) {
	            set = Transform.interpret(spec.transform);
	        }
	        if (!set) {
	            set = {};
	        }
	        set.opacity = spec.opacity;
	        set.size = spec.size;
	        set.align = spec.align;
	        set.origin = spec.origin;
	
	        var oldRemoving = this._removing;
	        var oldInvalidated = this._invalidated;
	        this.set(set);
	        this._removing = oldRemoving;
	        this._invalidated = oldInvalidated;
	    };
	
	    /**
	     * Reset the end-state. This function is called on all layout-nodes prior to
	     * calling the layout-function. So that the layout-function starts with a clean slate.
	     */
	    FlowLayoutNode.prototype.reset = function() {
	        if (this._invalidated) {
	            for (var propName in this._properties) {
	                this._properties[propName].invalidated = false;
	            }
	            this._invalidated = false;
	        }
	        this.trueSizeRequested = false;
	        this.usesTrueSize = false;
	    };
	
	    /**
	     * Markes the node for removal.
	     */
	    FlowLayoutNode.prototype.remove = function(removeSpec) {
	
	        // Transition to the remove-spec state
	        this._removing = true;
	        if (removeSpec) {
	            this.setSpec(removeSpec);
	        }
	        else {
	            this._pe.sleep();
	            this._specModified = false;
	        }
	
	        // Mark for removal
	        this._invalidated = false;
	    };
	
	    /**
	     * Temporarily releases the flowing-lock that is applied to the node.
	     * E.g., when changing position, resizing, the lock should be released so that
	     * the renderables can smoothly transition to their new positions.
	     */
	    FlowLayoutNode.prototype.releaseLock = function(enable) {
	        this._lockTransitionable.halt();
	        this._lockTransitionable.reset(0);
	        if (enable) {
	          this._lockTransitionable.set(1, {
	              duration: this.options.spring.period || 1000
	          });
	        }
	    };
	
	    /**
	     * Helper function for getting the property value.
	     */
	    function _getRoundedValue3D(prop, def, precision, lockValue) {
	        if (!prop || !prop.init) {
	            return def;
	        }
	        return [
	            prop.enabled[0] ? (Math.round((prop.curState.x + ((prop.endState.x - prop.curState.x) * lockValue)) / precision) * precision) : prop.endState.x,
	            prop.enabled[1] ? (Math.round((prop.curState.y + ((prop.endState.y - prop.curState.y) * lockValue)) / precision) * precision) : prop.endState.y,
	            prop.enabled[2] ? (Math.round((prop.curState.z + ((prop.endState.z - prop.curState.z) * lockValue)) / precision) * precision) : prop.endState.z
	        ];
	    }
	
	    /**
	     * Creates the render-spec
	     */
	    FlowLayoutNode.prototype.getSpec = function() {
	
	        // When the end state was reached, return the previous spec
	        var endStateReached = this._pe.isSleeping();
	        if (!this._specModified && endStateReached) {
	            this._spec.removed = !this._invalidated;
	            return this._spec;
	        }
	        this._initial = false;
	        this._specModified = !endStateReached;
	        this._spec.removed = false;
	
	        // Step physics engine when not sleeping
	        if (!endStateReached) {
	            this._pe.step();
	        }
	
	        // Build fresh spec
	        var spec = this._spec;
	        var precision = this.options.particleRounding;
	        var lockValue = this._lockTransitionable.get();
	
	        // opacity
	        var prop = this._properties.opacity;
	        if (prop && prop.init) {
	            spec.opacity = prop.enabled[0] ? (Math.round(Math.max(0, Math.min(1, prop.curState.x)) / precision) * precision) : prop.endState.x;
	            spec.endState.opacity = prop.endState.x;
	        }
	        else {
	            spec.opacity = undefined;
	            spec.endState.opacity = undefined;
	        }
	
	        // size
	        prop = this._properties.size;
	        if (prop && prop.init) {
	            spec.size = spec.size || [0, 0];
	            spec.size[0] = prop.enabled[0] ? (Math.round((prop.curState.x + ((prop.endState.x - prop.curState.x) * lockValue)) / 0.1) * 0.1) : prop.endState.x;
	            spec.size[1] = prop.enabled[1] ? (Math.round((prop.curState.y + ((prop.endState.y - prop.curState.y) * lockValue)) / 0.1) * 0.1) : prop.endState.y;
	            spec.endState.size = spec.endState.size || [0, 0];
	            spec.endState.size[0] = prop.endState.x;
	            spec.endState.size[1] = prop.endState.y;
	        }
	        else {
	            spec.size = undefined;
	            spec.endState.size = undefined;
	        }
	
	        // align
	        prop = this._properties.align;
	        if (prop && prop.init) {
	            spec.align = spec.align || [0, 0];
	            spec.align[0] = prop.enabled[0] ? (Math.round((prop.curState.x + ((prop.endState.x - prop.curState.x) * lockValue)) / 0.1) * 0.1) : prop.endState.x;
	            spec.align[1] = prop.enabled[1] ? (Math.round((prop.curState.y + ((prop.endState.y - prop.curState.y) * lockValue)) / 0.1) * 0.1) : prop.endState.y;
	            spec.endState.align = spec.endState.align || [0, 0];
	            spec.endState.align[0] = prop.endState.x;
	            spec.endState.align[1] = prop.endState.y;
	        }
	        else {
	            spec.align = undefined;
	            spec.endState.align = undefined;
	        }
	
	        // origin
	        prop = this._properties.origin;
	        if (prop && prop.init) {
	            spec.origin = spec.origin || [0, 0];
	            spec.origin[0] = prop.enabled[0] ? (Math.round((prop.curState.x + ((prop.endState.x - prop.curState.x) * lockValue)) / 0.1) * 0.1) : prop.endState.x;
	            spec.origin[1] = prop.enabled[1] ? (Math.round((prop.curState.y + ((prop.endState.y - prop.curState.y) * lockValue)) / 0.1) * 0.1) : prop.endState.y;
	            spec.endState.origin = spec.endState.origin || [0, 0];
	            spec.endState.origin[0] = prop.endState.x;
	            spec.endState.origin[1] = prop.endState.y;
	        }
	        else {
	            spec.origin = undefined;
	            spec.endState.origin = undefined;
	        }
	
	        // translate
	        var translate = this._properties.translate;
	        var translateX;
	        var translateY;
	        var translateZ;
	        if (translate && translate.init) {
	            translateX = translate.enabled[0] ? (Math.round((translate.curState.x + ((translate.endState.x - translate.curState.x) * lockValue)) / precision) * precision) : translate.endState.x;
	            translateY = translate.enabled[1] ? (Math.round((translate.curState.y + ((translate.endState.y - translate.curState.y) * lockValue)) / precision) * precision) : translate.endState.y;
	            translateZ = translate.enabled[2] ? (Math.round((translate.curState.z + ((translate.endState.z - translate.curState.z) * lockValue)) / precision) * precision) : translate.endState.z;
	        }
	        else {
	            translateX = 0;
	            translateY = 0;
	            translateZ = 0;
	        }
	
	        // scale, skew, scale
	        var scale = this._properties.scale;
	        var skew = this._properties.skew;
	        var rotate = this._properties.rotate;
	        if (scale || skew || rotate) {
	            spec.transform = Transform.build({
	                translate: [translateX, translateY, translateZ],
	                skew: _getRoundedValue3D.call(this, skew, DEFAULT.skew, this.options.particleRounding, lockValue),
	                scale: _getRoundedValue3D.call(this, scale, DEFAULT.scale, this.options.particleRounding, lockValue),
	                rotate: _getRoundedValue3D.call(this, rotate, DEFAULT.rotate, this.options.particleRounding, lockValue)
	            });
	            spec.endState.transform = Transform.build({
	                translate: translate ? [translate.endState.x, translate.endState.y, translate.endState.z] : DEFAULT.translate,
	                scale: scale ? [scale.endState.x, scale.endState.y, scale.endState.z] : DEFAULT.scale,
	                skew: skew ? [skew.endState.x, skew.endState.y, skew.endState.z] : DEFAULT.skew,
	                rotate: rotate ? [rotate.endState.x, rotate.endState.y, rotate.endState.z] : DEFAULT.rotate
	            });
	        }
	        else if (translate) {
	            if (!spec.transform) {
	                spec.transform = Transform.translate(translateX, translateY, translateZ);
	            }
	            else {
	                spec.transform[12] = translateX;
	                spec.transform[13] = translateY;
	                spec.transform[14] = translateZ;
	            }
	            if (!spec.endState.transform) {
	                spec.endState.transform = Transform.translate(translate.endState.x, translate.endState.y, translate.endState.z);
	            }
	            else {
	                spec.endState.transform[12] = translate.endState.x;
	                spec.endState.transform[13] = translate.endState.y;
	                spec.endState.transform[14] = translate.endState.z;
	            }
	        }
	        else {
	            spec.transform = undefined;
	            spec.endState.transform = undefined;
	        }
	        return this._spec;
	    };
	
	    /**
	     * Helper function to set the property of a node (e.g. opacity, translate, etc..)
	     */
	    function _setPropertyValue(prop, propName, endState, defaultValue, immediate, isTranslate) {
	
	        // Get property
	        prop = prop || this._properties[propName];
	
	        // Update the property
	        if (prop && prop.init) {
	            prop.invalidated = true;
	            var value = defaultValue;
	            if (endState !== undefined) {
	                value = endState;
	            }
	            else if (this._removing) {
	                value = prop.particle.getPosition();
	            }
	            //if (isTranslate && (this._lockDirection !== undefined) && (this._lockTransitionable.get() === 1)) {
	            //    immediate = true; // this is a bit dirty, it should check !_lockDirection for non changes as well before setting immediate to true
	            //}
	            // set new end state (the quick way)
	            prop.endState.x = value[0];
	            prop.endState.y = (value.length > 1) ? value[1] : 0;
	            prop.endState.z = (value.length > 2) ? value[2] : 0;
	            if (immediate) {
	                // set current state (the quick way)
	                prop.curState.x = prop.endState.x;
	                prop.curState.y = prop.endState.y;
	                prop.curState.z = prop.endState.z;
	                // reset velocity (the quick way)
	                prop.velocity.x = 0;
	                prop.velocity.y = 0;
	                prop.velocity.z = 0;
	            }
	            else if ((prop.endState.x !== prop.curState.x) ||
	                     (prop.endState.y !== prop.curState.y) ||
	                     (prop.endState.z !== prop.curState.z)) {
	                this._pe.wake();
	            }
	            return;
	        }
	        else {
	
	            // Create property if neccesary
	            var wasSleeping = this._pe.isSleeping();
	            if (!prop) {
	                prop = {
	                    particle: new Particle({
	                        position: (this._initial || immediate) ? endState : defaultValue
	                    }),
	                    endState: new Vector(endState)
	                };
	                prop.curState = prop.particle.position;
	                prop.velocity = prop.particle.velocity;
	                prop.force = new Spring(this.options.spring);
	                prop.force.setOptions({
	                    anchor: prop.endState
	                });
	                this._pe.addBody(prop.particle);
	                prop.forceId = this._pe.attach(prop.force, prop.particle);
	                this._properties[propName] = prop;
	            }
	            else {
	                prop.particle.setPosition((this._initial || immediate) ? endState : defaultValue);
	                prop.endState.set(endState);
	            }
	            if (!this._initial && !immediate) {
	                this._pe.wake();
	            }
	            else if (wasSleeping) {
	                this._pe.sleep(); // nothing has changed, put back to sleep
	            }
	            if (this.options.properties[propName] && this.options.properties[propName].length) {
	                prop.enabled = this.options.properties[propName];
	            }
	            else {
	                prop.enabled = [
	                  this.options.properties[propName],
	                  this.options.properties[propName],
	                  this.options.properties[propName]
	                ];
	            }
	            prop.init = true;
	            prop.invalidated = true;
	        }
	    }
	
	    /**
	     * Get value if not equals.
	     */
	    function _getIfNE2D(a1, a2) {
	        return ((a1[0] === a2[0]) && (a1[1] === a2[1])) ? undefined : a1;
	    }
	    function _getIfNE3D(a1, a2) {
	        return ((a1[0] === a2[0]) && (a1[1] === a2[1]) && (a1[2] === a2[2])) ? undefined : a1;
	    }
	
	    /**
	     * context.set(..)
	     */
	    FlowLayoutNode.prototype.set = function(set, defaultSize) {
	        if (defaultSize) {
	            this._removing = false;
	        }
	        this._invalidated = true;
	        this.scrollLength = set.scrollLength;
	        this._specModified = true;
	
	        // opacity
	        var prop = this._properties.opacity;
	        var value = (set.opacity === DEFAULT.opacity) ? undefined : set.opacity;
	        if ((value !== undefined) || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'opacity', (value === undefined) ? undefined : [value, 0], DEFAULT.opacity2D);
	        }
	
	        // set align
	        prop = this._properties.align;
	        value = set.align ? _getIfNE2D(set.align, DEFAULT.align) : undefined;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'align', value, DEFAULT.align);
	        }
	
	        // set orgin
	        prop = this._properties.origin;
	        value = set.origin ? _getIfNE2D(set.origin, DEFAULT.origin) : undefined;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'origin', value, DEFAULT.origin);
	        }
	
	        // set size
	        prop = this._properties.size;
	        value = set.size || defaultSize;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'size', value, defaultSize, this.usesTrueSize);
	        }
	
	        // set translate
	        prop = this._properties.translate;
	        value = set.translate;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'translate', value, DEFAULT.translate, undefined, true);
	        }
	
	        // set scale
	        prop = this._properties.scale;
	        value = set.scale ? _getIfNE3D(set.scale, DEFAULT.scale) : undefined;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'scale', value, DEFAULT.scale);
	        }
	
	        // set rotate
	        prop = this._properties.rotate;
	        value = set.rotate ? _getIfNE3D(set.rotate, DEFAULT.rotate) : undefined;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'rotate', value, DEFAULT.rotate);
	        }
	
	        // set skew
	        prop = this._properties.skew;
	        value = set.skew ? _getIfNE3D(set.skew, DEFAULT.skew) : undefined;
	        if (value || (prop && prop.init)) {
	            _setPropertyValue.call(this, prop, 'skew', value, DEFAULT.skew);
	        }
	    };
	
	    module.exports = FlowLayoutNode;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 39 */
/*!*************************************!*\
  !*** ../~/famous/core/Transform.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Transform = {};
	Transform.precision = 0.000001;
	Transform.identity = [
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0,
	    1
	];
	Transform.multiply4x4 = function multiply4x4(a, b) {
	    return [
	        a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
	        a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
	        a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
	        a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],
	        a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
	        a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
	        a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
	        a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],
	        a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
	        a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
	        a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
	        a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],
	        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
	        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
	        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
	        a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
	    ];
	};
	Transform.multiply = function multiply(a, b) {
	    return [
	        a[0] * b[0] + a[4] * b[1] + a[8] * b[2],
	        a[1] * b[0] + a[5] * b[1] + a[9] * b[2],
	        a[2] * b[0] + a[6] * b[1] + a[10] * b[2],
	        0,
	        a[0] * b[4] + a[4] * b[5] + a[8] * b[6],
	        a[1] * b[4] + a[5] * b[5] + a[9] * b[6],
	        a[2] * b[4] + a[6] * b[5] + a[10] * b[6],
	        0,
	        a[0] * b[8] + a[4] * b[9] + a[8] * b[10],
	        a[1] * b[8] + a[5] * b[9] + a[9] * b[10],
	        a[2] * b[8] + a[6] * b[9] + a[10] * b[10],
	        0,
	        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12],
	        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13],
	        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14],
	        1
	    ];
	};
	Transform.thenMove = function thenMove(m, t) {
	    if (!t[2])
	        t[2] = 0;
	    return [
	        m[0],
	        m[1],
	        m[2],
	        0,
	        m[4],
	        m[5],
	        m[6],
	        0,
	        m[8],
	        m[9],
	        m[10],
	        0,
	        m[12] + t[0],
	        m[13] + t[1],
	        m[14] + t[2],
	        1
	    ];
	};
	Transform.moveThen = function moveThen(v, m) {
	    if (!v[2])
	        v[2] = 0;
	    var t0 = v[0] * m[0] + v[1] * m[4] + v[2] * m[8];
	    var t1 = v[0] * m[1] + v[1] * m[5] + v[2] * m[9];
	    var t2 = v[0] * m[2] + v[1] * m[6] + v[2] * m[10];
	    return Transform.thenMove(m, [
	        t0,
	        t1,
	        t2
	    ]);
	};
	Transform.translate = function translate(x, y, z) {
	    if (z === undefined)
	        z = 0;
	    return [
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        x,
	        y,
	        z,
	        1
	    ];
	};
	Transform.thenScale = function thenScale(m, s) {
	    return [
	        s[0] * m[0],
	        s[1] * m[1],
	        s[2] * m[2],
	        0,
	        s[0] * m[4],
	        s[1] * m[5],
	        s[2] * m[6],
	        0,
	        s[0] * m[8],
	        s[1] * m[9],
	        s[2] * m[10],
	        0,
	        s[0] * m[12],
	        s[1] * m[13],
	        s[2] * m[14],
	        1
	    ];
	};
	Transform.scale = function scale(x, y, z) {
	    if (z === undefined)
	        z = 1;
	    if (y === undefined)
	        y = x;
	    return [
	        x,
	        0,
	        0,
	        0,
	        0,
	        y,
	        0,
	        0,
	        0,
	        0,
	        z,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.rotateX = function rotateX(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [
	        1,
	        0,
	        0,
	        0,
	        0,
	        cosTheta,
	        sinTheta,
	        0,
	        0,
	        -sinTheta,
	        cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.rotateY = function rotateY(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [
	        cosTheta,
	        0,
	        -sinTheta,
	        0,
	        0,
	        1,
	        0,
	        0,
	        sinTheta,
	        0,
	        cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.rotateZ = function rotateZ(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [
	        cosTheta,
	        sinTheta,
	        0,
	        0,
	        -sinTheta,
	        cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.rotate = function rotate(phi, theta, psi) {
	    var cosPhi = Math.cos(phi);
	    var sinPhi = Math.sin(phi);
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    var cosPsi = Math.cos(psi);
	    var sinPsi = Math.sin(psi);
	    var result = [
	        cosTheta * cosPsi,
	        cosPhi * sinPsi + sinPhi * sinTheta * cosPsi,
	        sinPhi * sinPsi - cosPhi * sinTheta * cosPsi,
	        0,
	        -cosTheta * sinPsi,
	        cosPhi * cosPsi - sinPhi * sinTheta * sinPsi,
	        sinPhi * cosPsi + cosPhi * sinTheta * sinPsi,
	        0,
	        sinTheta,
	        -sinPhi * cosTheta,
	        cosPhi * cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    return result;
	};
	Transform.rotateAxis = function rotateAxis(v, theta) {
	    var sinTheta = Math.sin(theta);
	    var cosTheta = Math.cos(theta);
	    var verTheta = 1 - cosTheta;
	    var xxV = v[0] * v[0] * verTheta;
	    var xyV = v[0] * v[1] * verTheta;
	    var xzV = v[0] * v[2] * verTheta;
	    var yyV = v[1] * v[1] * verTheta;
	    var yzV = v[1] * v[2] * verTheta;
	    var zzV = v[2] * v[2] * verTheta;
	    var xs = v[0] * sinTheta;
	    var ys = v[1] * sinTheta;
	    var zs = v[2] * sinTheta;
	    var result = [
	        xxV + cosTheta,
	        xyV + zs,
	        xzV - ys,
	        0,
	        xyV - zs,
	        yyV + cosTheta,
	        yzV + xs,
	        0,
	        xzV + ys,
	        yzV - xs,
	        zzV + cosTheta,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    return result;
	};
	Transform.aboutOrigin = function aboutOrigin(v, m) {
	    var t0 = v[0] - (v[0] * m[0] + v[1] * m[4] + v[2] * m[8]);
	    var t1 = v[1] - (v[0] * m[1] + v[1] * m[5] + v[2] * m[9]);
	    var t2 = v[2] - (v[0] * m[2] + v[1] * m[6] + v[2] * m[10]);
	    return Transform.thenMove(m, [
	        t0,
	        t1,
	        t2
	    ]);
	};
	Transform.skew = function skew(phi, theta, psi) {
	    return [
	        1,
	        Math.tan(theta),
	        0,
	        0,
	        Math.tan(psi),
	        1,
	        0,
	        0,
	        0,
	        Math.tan(phi),
	        1,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.skewX = function skewX(angle) {
	    return [
	        1,
	        0,
	        0,
	        0,
	        Math.tan(angle),
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.skewY = function skewY(angle) {
	    return [
	        1,
	        Math.tan(angle),
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.perspective = function perspective(focusZ) {
	    return [
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        0,
	        0,
	        0,
	        0,
	        1,
	        -1 / focusZ,
	        0,
	        0,
	        0,
	        1
	    ];
	};
	Transform.getTranslate = function getTranslate(m) {
	    return [
	        m[12],
	        m[13],
	        m[14]
	    ];
	};
	Transform.inverse = function inverse(m) {
	    var c0 = m[5] * m[10] - m[6] * m[9];
	    var c1 = m[4] * m[10] - m[6] * m[8];
	    var c2 = m[4] * m[9] - m[5] * m[8];
	    var c4 = m[1] * m[10] - m[2] * m[9];
	    var c5 = m[0] * m[10] - m[2] * m[8];
	    var c6 = m[0] * m[9] - m[1] * m[8];
	    var c8 = m[1] * m[6] - m[2] * m[5];
	    var c9 = m[0] * m[6] - m[2] * m[4];
	    var c10 = m[0] * m[5] - m[1] * m[4];
	    var detM = m[0] * c0 - m[1] * c1 + m[2] * c2;
	    var invD = 1 / detM;
	    var result = [
	        invD * c0,
	        -invD * c4,
	        invD * c8,
	        0,
	        -invD * c1,
	        invD * c5,
	        -invD * c9,
	        0,
	        invD * c2,
	        -invD * c6,
	        invD * c10,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    result[12] = -m[12] * result[0] - m[13] * result[4] - m[14] * result[8];
	    result[13] = -m[12] * result[1] - m[13] * result[5] - m[14] * result[9];
	    result[14] = -m[12] * result[2] - m[13] * result[6] - m[14] * result[10];
	    return result;
	};
	Transform.transpose = function transpose(m) {
	    return [
	        m[0],
	        m[4],
	        m[8],
	        m[12],
	        m[1],
	        m[5],
	        m[9],
	        m[13],
	        m[2],
	        m[6],
	        m[10],
	        m[14],
	        m[3],
	        m[7],
	        m[11],
	        m[15]
	    ];
	};
	function _normSquared(v) {
	    return v.length === 2 ? v[0] * v[0] + v[1] * v[1] : v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
	}
	function _norm(v) {
	    return Math.sqrt(_normSquared(v));
	}
	function _sign(n) {
	    return n < 0 ? -1 : 1;
	}
	Transform.interpret = function interpret(M) {
	    var x = [
	        M[0],
	        M[1],
	        M[2]
	    ];
	    var sgn = _sign(x[0]);
	    var xNorm = _norm(x);
	    var v = [
	        x[0] + sgn * xNorm,
	        x[1],
	        x[2]
	    ];
	    var mult = 2 / _normSquared(v);
	    if (mult >= Infinity) {
	        return {
	            translate: Transform.getTranslate(M),
	            rotate: [
	                0,
	                0,
	                0
	            ],
	            scale: [
	                0,
	                0,
	                0
	            ],
	            skew: [
	                0,
	                0,
	                0
	            ]
	        };
	    }
	    var Q1 = [
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    Q1[0] = 1 - mult * v[0] * v[0];
	    Q1[5] = 1 - mult * v[1] * v[1];
	    Q1[10] = 1 - mult * v[2] * v[2];
	    Q1[1] = -mult * v[0] * v[1];
	    Q1[2] = -mult * v[0] * v[2];
	    Q1[6] = -mult * v[1] * v[2];
	    Q1[4] = Q1[1];
	    Q1[8] = Q1[2];
	    Q1[9] = Q1[6];
	    var MQ1 = Transform.multiply(Q1, M);
	    var x2 = [
	        MQ1[5],
	        MQ1[6]
	    ];
	    var sgn2 = _sign(x2[0]);
	    var x2Norm = _norm(x2);
	    var v2 = [
	        x2[0] + sgn2 * x2Norm,
	        x2[1]
	    ];
	    var mult2 = 2 / _normSquared(v2);
	    var Q2 = [
	        1,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        0,
	        1
	    ];
	    Q2[5] = 1 - mult2 * v2[0] * v2[0];
	    Q2[10] = 1 - mult2 * v2[1] * v2[1];
	    Q2[6] = -mult2 * v2[0] * v2[1];
	    Q2[9] = Q2[6];
	    var Q = Transform.multiply(Q2, Q1);
	    var R = Transform.multiply(Q, M);
	    var remover = Transform.scale(R[0] < 0 ? -1 : 1, R[5] < 0 ? -1 : 1, R[10] < 0 ? -1 : 1);
	    R = Transform.multiply(R, remover);
	    Q = Transform.multiply(remover, Q);
	    var result = {};
	    result.translate = Transform.getTranslate(M);
	    result.rotate = [
	        Math.atan2(-Q[6], Q[10]),
	        Math.asin(Q[2]),
	        Math.atan2(-Q[1], Q[0])
	    ];
	    if (!result.rotate[0]) {
	        result.rotate[0] = 0;
	        result.rotate[2] = Math.atan2(Q[4], Q[5]);
	    }
	    result.scale = [
	        R[0],
	        R[5],
	        R[10]
	    ];
	    result.skew = [
	        Math.atan2(R[9], result.scale[2]),
	        Math.atan2(R[8], result.scale[2]),
	        Math.atan2(R[4], result.scale[0])
	    ];
	    if (Math.abs(result.rotate[0]) + Math.abs(result.rotate[2]) > 1.5 * Math.PI) {
	        result.rotate[1] = Math.PI - result.rotate[1];
	        if (result.rotate[1] > Math.PI)
	            result.rotate[1] -= 2 * Math.PI;
	        if (result.rotate[1] < -Math.PI)
	            result.rotate[1] += 2 * Math.PI;
	        if (result.rotate[0] < 0)
	            result.rotate[0] += Math.PI;
	        else
	            result.rotate[0] -= Math.PI;
	        if (result.rotate[2] < 0)
	            result.rotate[2] += Math.PI;
	        else
	            result.rotate[2] -= Math.PI;
	    }
	    return result;
	};
	Transform.average = function average(M1, M2, t) {
	    t = t === undefined ? 0.5 : t;
	    var specM1 = Transform.interpret(M1);
	    var specM2 = Transform.interpret(M2);
	    var specAvg = {
	        translate: [
	            0,
	            0,
	            0
	        ],
	        rotate: [
	            0,
	            0,
	            0
	        ],
	        scale: [
	            0,
	            0,
	            0
	        ],
	        skew: [
	            0,
	            0,
	            0
	        ]
	    };
	    for (var i = 0; i < 3; i++) {
	        specAvg.translate[i] = (1 - t) * specM1.translate[i] + t * specM2.translate[i];
	        specAvg.rotate[i] = (1 - t) * specM1.rotate[i] + t * specM2.rotate[i];
	        specAvg.scale[i] = (1 - t) * specM1.scale[i] + t * specM2.scale[i];
	        specAvg.skew[i] = (1 - t) * specM1.skew[i] + t * specM2.skew[i];
	    }
	    return Transform.build(specAvg);
	};
	Transform.build = function build(spec) {
	    var scaleMatrix = Transform.scale(spec.scale[0], spec.scale[1], spec.scale[2]);
	    var skewMatrix = Transform.skew(spec.skew[0], spec.skew[1], spec.skew[2]);
	    var rotateMatrix = Transform.rotate(spec.rotate[0], spec.rotate[1], spec.rotate[2]);
	    return Transform.thenMove(Transform.multiply(Transform.multiply(rotateMatrix, skewMatrix), scaleMatrix), spec.translate);
	};
	Transform.equals = function equals(a, b) {
	    return !Transform.notEquals(a, b);
	};
	Transform.notEquals = function notEquals(a, b) {
	    if (a === b)
	        return false;
	    return !(a && b) || a[12] !== b[12] || a[13] !== b[13] || a[14] !== b[14] || a[0] !== b[0] || a[1] !== b[1] || a[2] !== b[2] || a[4] !== b[4] || a[5] !== b[5] || a[6] !== b[6] || a[8] !== b[8] || a[9] !== b[9] || a[10] !== b[10];
	};
	Transform.normalizeRotation = function normalizeRotation(rotation) {
	    var result = rotation.slice(0);
	    if (result[0] === Math.PI * 0.5 || result[0] === -Math.PI * 0.5) {
	        result[0] = -result[0];
	        result[1] = Math.PI - result[1];
	        result[2] -= Math.PI;
	    }
	    if (result[0] > Math.PI * 0.5) {
	        result[0] = result[0] - Math.PI;
	        result[1] = Math.PI - result[1];
	        result[2] -= Math.PI;
	    }
	    if (result[0] < -Math.PI * 0.5) {
	        result[0] = result[0] + Math.PI;
	        result[1] = -Math.PI - result[1];
	        result[2] -= Math.PI;
	    }
	    while (result[1] < -Math.PI)
	        result[1] += 2 * Math.PI;
	    while (result[1] >= Math.PI)
	        result[1] -= 2 * Math.PI;
	    while (result[2] < -Math.PI)
	        result[2] += 2 * Math.PI;
	    while (result[2] >= Math.PI)
	        result[2] -= 2 * Math.PI;
	    return result;
	};
	Transform.inFront = [
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0.001,
	    1
	];
	Transform.behind = [
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    0,
	    1,
	    0,
	    0,
	    0,
	    -0.001,
	    1
	];
	module.exports = Transform;

/***/ },
/* 40 */
/*!************************************************!*\
  !*** ./fonts/glyphicons-halflings-regular.eot ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/glyphicons-halflings-regular.eot"

/***/ },
/* 41 */
/*!*************************************************!*\
  !*** ./fonts/glyphicons-halflings-regular.woff ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/glyphicons-halflings-regular.woff"

/***/ },
/* 42 */
/*!************************************************!*\
  !*** ./fonts/glyphicons-halflings-regular.ttf ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/glyphicons-halflings-regular.ttf"

/***/ },
/* 43 */
/*!************************************************!*\
  !*** ./fonts/glyphicons-halflings-regular.svg ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/glyphicons-halflings-regular.svg"

/***/ },
/* 44 */
/*!**************************************!*\
  !*** ../~/famous/core/RenderNode.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Entity = __webpack_require__(/*! ./Entity */ 35);
	var SpecParser = __webpack_require__(/*! ./SpecParser */ 56);
	function RenderNode(object) {
	    this._object = null;
	    this._child = null;
	    this._hasMultipleChildren = false;
	    this._isRenderable = false;
	    this._isModifier = false;
	    this._resultCache = {};
	    this._prevResults = {};
	    this._childResult = null;
	    if (object)
	        this.set(object);
	}
	RenderNode.prototype.add = function add(child) {
	    var childNode = child instanceof RenderNode ? child : new RenderNode(child);
	    if (this._child instanceof Array)
	        this._child.push(childNode);
	    else if (this._child) {
	        this._child = [
	            this._child,
	            childNode
	        ];
	        this._hasMultipleChildren = true;
	        this._childResult = [];
	    } else
	        this._child = childNode;
	    return childNode;
	};
	RenderNode.prototype.get = function get() {
	    return this._object || (this._hasMultipleChildren ? null : this._child ? this._child.get() : null);
	};
	RenderNode.prototype.set = function set(child) {
	    this._childResult = null;
	    this._hasMultipleChildren = false;
	    this._isRenderable = child.render ? true : false;
	    this._isModifier = child.modify ? true : false;
	    this._object = child;
	    this._child = null;
	    if (child instanceof RenderNode)
	        return child;
	    else
	        return this;
	};
	RenderNode.prototype.getSize = function getSize() {
	    var result = null;
	    var target = this.get();
	    if (target && target.getSize)
	        result = target.getSize();
	    if (!result && this._child && this._child.getSize)
	        result = this._child.getSize();
	    return result;
	};
	function _applyCommit(spec, context, cacheStorage) {
	    var result = SpecParser.parse(spec, context);
	    var keys = Object.keys(result);
	    for (var i = 0; i < keys.length; i++) {
	        var id = keys[i];
	        var childNode = Entity.get(id);
	        var commitParams = result[id];
	        commitParams.allocator = context.allocator;
	        var commitResult = childNode.commit(commitParams);
	        if (commitResult)
	            _applyCommit(commitResult, context, cacheStorage);
	        else
	            cacheStorage[id] = commitParams;
	    }
	}
	RenderNode.prototype.commit = function commit(context) {
	    var prevKeys = Object.keys(this._prevResults);
	    for (var i = 0; i < prevKeys.length; i++) {
	        var id = prevKeys[i];
	        if (this._resultCache[id] === undefined) {
	            var object = Entity.get(id);
	            if (object.cleanup)
	                object.cleanup(context.allocator);
	        }
	    }
	    this._prevResults = this._resultCache;
	    this._resultCache = {};
	    _applyCommit(this.render(), context, this._resultCache);
	};
	RenderNode.prototype.render = function render() {
	    if (this._isRenderable)
	        return this._object.render();
	    var result = null;
	    if (this._hasMultipleChildren) {
	        result = this._childResult;
	        var children = this._child;
	        for (var i = 0; i < children.length; i++) {
	            result[i] = children[i].render();
	        }
	    } else if (this._child)
	        result = this._child.render();
	    return this._isModifier ? this._object.modify(result) : result;
	};
	module.exports = RenderNode;

/***/ },
/* 45 */
/*!********************************************!*\
  !*** ../~/famous/core/ElementAllocator.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function ElementAllocator(container) {
	    if (!container)
	        container = document.createDocumentFragment();
	    this.container = container;
	    this.detachedNodes = {};
	    this.nodeCount = 0;
	}
	ElementAllocator.prototype.migrate = function migrate(container) {
	    var oldContainer = this.container;
	    if (container === oldContainer)
	        return;
	    if (oldContainer instanceof DocumentFragment) {
	        container.appendChild(oldContainer);
	    } else {
	        while (oldContainer.hasChildNodes()) {
	            container.appendChild(oldContainer.firstChild);
	        }
	    }
	    this.container = container;
	};
	ElementAllocator.prototype.allocate = function allocate(type) {
	    type = type.toLowerCase();
	    if (!(type in this.detachedNodes))
	        this.detachedNodes[type] = [];
	    var nodeStore = this.detachedNodes[type];
	    var result;
	    if (nodeStore.length > 0) {
	        result = nodeStore.pop();
	    } else {
	        result = document.createElement(type);
	        this.container.appendChild(result);
	    }
	    this.nodeCount++;
	    return result;
	};
	ElementAllocator.prototype.deallocate = function deallocate(element) {
	    var nodeType = element.nodeName.toLowerCase();
	    var nodeStore = this.detachedNodes[nodeType];
	    nodeStore.push(element);
	    this.nodeCount--;
	};
	ElementAllocator.prototype.getNodeCount = function getNodeCount() {
	    return this.nodeCount;
	};
	module.exports = ElementAllocator;

/***/ },
/* 46 */
/*!*************************************************!*\
  !*** ../~/famous/transitions/Transitionable.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var MultipleTransition = __webpack_require__(/*! ./MultipleTransition */ 57);
	var TweenTransition = __webpack_require__(/*! ./TweenTransition */ 58);
	function Transitionable(start) {
	    this.currentAction = null;
	    this.actionQueue = [];
	    this.callbackQueue = [];
	    this.state = 0;
	    this.velocity = undefined;
	    this._callback = undefined;
	    this._engineInstance = null;
	    this._currentMethod = null;
	    this.set(start);
	}
	var transitionMethods = {};
	Transitionable.register = function register(methods) {
	    var success = true;
	    for (var method in methods) {
	        if (!Transitionable.registerMethod(method, methods[method]))
	            success = false;
	    }
	    return success;
	};
	Transitionable.registerMethod = function registerMethod(name, engineClass) {
	    if (!(name in transitionMethods)) {
	        transitionMethods[name] = engineClass;
	        return true;
	    } else
	        return false;
	};
	Transitionable.unregisterMethod = function unregisterMethod(name) {
	    if (name in transitionMethods) {
	        delete transitionMethods[name];
	        return true;
	    } else
	        return false;
	};
	function _loadNext() {
	    if (this._callback) {
	        var callback = this._callback;
	        this._callback = undefined;
	        callback();
	    }
	    if (this.actionQueue.length <= 0) {
	        this.set(this.get());
	        return;
	    }
	    this.currentAction = this.actionQueue.shift();
	    this._callback = this.callbackQueue.shift();
	    var method = null;
	    var endValue = this.currentAction[0];
	    var transition = this.currentAction[1];
	    if (transition instanceof Object && transition.method) {
	        method = transition.method;
	        if (typeof method === 'string')
	            method = transitionMethods[method];
	    } else {
	        method = TweenTransition;
	    }
	    if (this._currentMethod !== method) {
	        if (!(endValue instanceof Object) || method.SUPPORTS_MULTIPLE === true || endValue.length <= method.SUPPORTS_MULTIPLE) {
	            this._engineInstance = new method();
	        } else {
	            this._engineInstance = new MultipleTransition(method);
	        }
	        this._currentMethod = method;
	    }
	    this._engineInstance.reset(this.state, this.velocity);
	    if (this.velocity !== undefined)
	        transition.velocity = this.velocity;
	    this._engineInstance.set(endValue, transition, _loadNext.bind(this));
	}
	Transitionable.prototype.set = function set(endState, transition, callback) {
	    if (!transition) {
	        this.reset(endState);
	        if (callback)
	            callback();
	        return this;
	    }
	    var action = [
	        endState,
	        transition
	    ];
	    this.actionQueue.push(action);
	    this.callbackQueue.push(callback);
	    if (!this.currentAction)
	        _loadNext.call(this);
	    return this;
	};
	Transitionable.prototype.reset = function reset(startState, startVelocity) {
	    this._currentMethod = null;
	    this._engineInstance = null;
	    this._callback = undefined;
	    this.state = startState;
	    this.velocity = startVelocity;
	    this.currentAction = null;
	    this.actionQueue = [];
	    this.callbackQueue = [];
	};
	Transitionable.prototype.delay = function delay(duration, callback) {
	    var endValue;
	    if (this.actionQueue.length)
	        endValue = this.actionQueue[this.actionQueue.length - 1][0];
	    else if (this.currentAction)
	        endValue = this.currentAction[0];
	    else
	        endValue = this.get();
	    return this.set(endValue, {
	        duration: duration,
	        curve: function () {
	            return 0;
	        }
	    }, callback);
	};
	Transitionable.prototype.get = function get(timestamp) {
	    if (this._engineInstance) {
	        if (this._engineInstance.getVelocity)
	            this.velocity = this._engineInstance.getVelocity();
	        this.state = this._engineInstance.get(timestamp);
	    }
	    return this.state;
	};
	Transitionable.prototype.isActive = function isActive() {
	    return !!this.currentAction;
	};
	Transitionable.prototype.halt = function halt() {
	    return this.set(this.get());
	};
	module.exports = Transitionable;

/***/ },
/* 47 */
/*!****************************************!*\
  !*** ../~/famous/core/EventEmitter.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function EventEmitter() {
	    this.listeners = {};
	    this._owner = this;
	}
	EventEmitter.prototype.emit = function emit(type, event) {
	    var handlers = this.listeners[type];
	    if (handlers) {
	        for (var i = 0; i < handlers.length; i++) {
	            handlers[i].call(this._owner, event);
	        }
	    }
	    return this;
	};
	EventEmitter.prototype.on = function on(type, handler) {
	    if (!(type in this.listeners))
	        this.listeners[type] = [];
	    var index = this.listeners[type].indexOf(handler);
	    if (index < 0)
	        this.listeners[type].push(handler);
	    return this;
	};
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	EventEmitter.prototype.removeListener = function removeListener(type, handler) {
	    var listener = this.listeners[type];
	    if (listener !== undefined) {
	        var index = listener.indexOf(handler);
	        if (index >= 0)
	            listener.splice(index, 1);
	    }
	    return this;
	};
	EventEmitter.prototype.bindThis = function bindThis(owner) {
	    this._owner = owner;
	};
	module.exports = EventEmitter;

/***/ },
/* 48 */
/*!*********************************!*\
  !*** ../~/famous/core/Group.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Context = __webpack_require__(/*! ./Context */ 29);
	var Transform = __webpack_require__(/*! ./Transform */ 39);
	var Surface = __webpack_require__(/*! ./Surface */ 11);
	function Group(options) {
	    Surface.call(this, options);
	    this._shouldRecalculateSize = false;
	    this._container = document.createDocumentFragment();
	    this.context = new Context(this._container);
	    this.setContent(this._container);
	    this._groupSize = [
	        undefined,
	        undefined
	    ];
	}
	Group.SIZE_ZERO = [
	    0,
	    0
	];
	Group.prototype = Object.create(Surface.prototype);
	Group.prototype.elementType = 'div';
	Group.prototype.elementClass = 'famous-group';
	Group.prototype.add = function add() {
	    return this.context.add.apply(this.context, arguments);
	};
	Group.prototype.render = function render() {
	    return Surface.prototype.render.call(this);
	};
	Group.prototype.deploy = function deploy(target) {
	    this.context.migrate(target);
	};
	Group.prototype.recall = function recall(target) {
	    this._container = document.createDocumentFragment();
	    this.context.migrate(this._container);
	};
	Group.prototype.commit = function commit(context) {
	    var transform = context.transform;
	    var origin = context.origin;
	    var opacity = context.opacity;
	    var size = context.size;
	    var result = Surface.prototype.commit.call(this, {
	        allocator: context.allocator,
	        transform: Transform.thenMove(transform, [
	            -origin[0] * size[0],
	            -origin[1] * size[1],
	            0
	        ]),
	        opacity: opacity,
	        origin: origin,
	        size: Group.SIZE_ZERO
	    });
	    if (size[0] !== this._groupSize[0] || size[1] !== this._groupSize[1]) {
	        this._groupSize[0] = size[0];
	        this._groupSize[1] = size[1];
	        this.context.setSize(size);
	    }
	    this.context.update({
	        transform: Transform.translate(-origin[0] * size[0], -origin[1] * size[1], 0),
	        origin: origin,
	        size: size
	    });
	    return result;
	};
	module.exports = Group;

/***/ },
/* 49 */
/*!**********************************!*\
  !*** ../~/famous/math/Vector.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function Vector(x, y, z) {
	    if (arguments.length === 1 && x !== undefined)
	        this.set(x);
	    else {
	        this.x = x || 0;
	        this.y = y || 0;
	        this.z = z || 0;
	    }
	    return this;
	}
	var _register = new Vector(0, 0, 0);
	Vector.prototype.add = function add(v) {
	    return _setXYZ.call(_register, this.x + v.x, this.y + v.y, this.z + v.z);
	};
	Vector.prototype.sub = function sub(v) {
	    return _setXYZ.call(_register, this.x - v.x, this.y - v.y, this.z - v.z);
	};
	Vector.prototype.mult = function mult(r) {
	    return _setXYZ.call(_register, r * this.x, r * this.y, r * this.z);
	};
	Vector.prototype.div = function div(r) {
	    return this.mult(1 / r);
	};
	Vector.prototype.cross = function cross(v) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;
	    var vx = v.x;
	    var vy = v.y;
	    var vz = v.z;
	    return _setXYZ.call(_register, z * vy - y * vz, x * vz - z * vx, y * vx - x * vy);
	};
	Vector.prototype.equals = function equals(v) {
	    return v.x === this.x && v.y === this.y && v.z === this.z;
	};
	Vector.prototype.rotateX = function rotateX(theta) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return _setXYZ.call(_register, x, y * cosTheta - z * sinTheta, y * sinTheta + z * cosTheta);
	};
	Vector.prototype.rotateY = function rotateY(theta) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return _setXYZ.call(_register, z * sinTheta + x * cosTheta, y, z * cosTheta - x * sinTheta);
	};
	Vector.prototype.rotateZ = function rotateZ(theta) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return _setXYZ.call(_register, x * cosTheta - y * sinTheta, x * sinTheta + y * cosTheta, z);
	};
	Vector.prototype.dot = function dot(v) {
	    return this.x * v.x + this.y * v.y + this.z * v.z;
	};
	Vector.prototype.normSquared = function normSquared() {
	    return this.dot(this);
	};
	Vector.prototype.norm = function norm() {
	    return Math.sqrt(this.normSquared());
	};
	Vector.prototype.normalize = function normalize(length) {
	    if (arguments.length === 0)
	        length = 1;
	    var norm = this.norm();
	    if (norm > 1e-7)
	        return _setFromVector.call(_register, this.mult(length / norm));
	    else
	        return _setXYZ.call(_register, length, 0, 0);
	};
	Vector.prototype.clone = function clone() {
	    return new Vector(this);
	};
	Vector.prototype.isZero = function isZero() {
	    return !(this.x || this.y || this.z);
	};
	function _setXYZ(x, y, z) {
	    this.x = x;
	    this.y = y;
	    this.z = z;
	    return this;
	}
	function _setFromArray(v) {
	    return _setXYZ.call(this, v[0], v[1], v[2] || 0);
	}
	function _setFromVector(v) {
	    return _setXYZ.call(this, v.x, v.y, v.z);
	}
	function _setFromNumber(x) {
	    return _setXYZ.call(this, x, 0, 0);
	}
	Vector.prototype.set = function set(v) {
	    if (v instanceof Array)
	        return _setFromArray.call(this, v);
	    if (typeof v === 'number')
	        return _setFromNumber.call(this, v);
	    return _setFromVector.call(this, v);
	};
	Vector.prototype.setXYZ = function (x, y, z) {
	    return _setXYZ.apply(this, arguments);
	};
	Vector.prototype.set1D = function (x) {
	    return _setFromNumber.call(this, x);
	};
	Vector.prototype.put = function put(v) {
	    if (this === _register)
	        _setFromVector.call(v, _register);
	    else
	        _setFromVector.call(v, this);
	};
	Vector.prototype.clear = function clear() {
	    return _setXYZ.call(this, 0, 0, 0);
	};
	Vector.prototype.cap = function cap(cap) {
	    if (cap === Infinity)
	        return _setFromVector.call(_register, this);
	    var norm = this.norm();
	    if (norm > cap)
	        return _setFromVector.call(_register, this.mult(cap / norm));
	    else
	        return _setFromVector.call(_register, this);
	};
	Vector.prototype.project = function project(n) {
	    return n.mult(this.dot(n));
	};
	Vector.prototype.reflectAcross = function reflectAcross(n) {
	    n.normalize().put(n);
	    return _setFromVector(_register, this.sub(this.project(n).mult(2)));
	};
	Vector.prototype.get = function get() {
	    return [
	        this.x,
	        this.y,
	        this.z
	    ];
	};
	Vector.prototype.get1D = function () {
	    return this.x;
	};
	module.exports = Vector;

/***/ },
/* 50 */
/*!********************************************!*\
  !*** ../~/famous/physics/PhysicsEngine.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var EventHandler = __webpack_require__(/*! ../core/EventHandler */ 30);
	function PhysicsEngine(options) {
	    this.options = Object.create(PhysicsEngine.DEFAULT_OPTIONS);
	    if (options)
	        this.setOptions(options);
	    this._particles = [];
	    this._bodies = [];
	    this._agentData = {};
	    this._forces = [];
	    this._constraints = [];
	    this._buffer = 0;
	    this._prevTime = now();
	    this._isSleeping = false;
	    this._eventHandler = null;
	    this._currAgentId = 0;
	    this._hasBodies = false;
	    this._eventHandler = null;
	}
	var TIMESTEP = 17;
	var MIN_TIME_STEP = 1000 / 120;
	var MAX_TIME_STEP = 17;
	var now = Date.now;
	var _events = {
	    start: 'start',
	    update: 'update',
	    end: 'end'
	};
	PhysicsEngine.DEFAULT_OPTIONS = {
	    constraintSteps: 1,
	    sleepTolerance: 1e-7,
	    velocityCap: undefined,
	    angularVelocityCap: undefined
	};
	PhysicsEngine.prototype.setOptions = function setOptions(opts) {
	    for (var key in opts)
	        if (this.options[key])
	            this.options[key] = opts[key];
	};
	PhysicsEngine.prototype.addBody = function addBody(body) {
	    body._engine = this;
	    if (body.isBody) {
	        this._bodies.push(body);
	        this._hasBodies = true;
	    } else
	        this._particles.push(body);
	    body.on('start', this.wake.bind(this));
	    return body;
	};
	PhysicsEngine.prototype.removeBody = function removeBody(body) {
	    var array = body.isBody ? this._bodies : this._particles;
	    var index = array.indexOf(body);
	    if (index > -1) {
	        for (var agentKey in this._agentData) {
	            if (this._agentData.hasOwnProperty(agentKey)) {
	                this.detachFrom(this._agentData[agentKey].id, body);
	            }
	        }
	        array.splice(index, 1);
	    }
	    if (this.getBodies().length === 0)
	        this._hasBodies = false;
	};
	function _mapAgentArray(agent) {
	    if (agent.applyForce)
	        return this._forces;
	    if (agent.applyConstraint)
	        return this._constraints;
	}
	function _attachOne(agent, targets, source) {
	    if (targets === undefined)
	        targets = this.getParticlesAndBodies();
	    if (!(targets instanceof Array))
	        targets = [targets];
	    agent.on('change', this.wake.bind(this));
	    this._agentData[this._currAgentId] = {
	        agent: agent,
	        id: this._currAgentId,
	        targets: targets,
	        source: source
	    };
	    _mapAgentArray.call(this, agent).push(this._currAgentId);
	    return this._currAgentId++;
	}
	PhysicsEngine.prototype.attach = function attach(agents, targets, source) {
	    this.wake();
	    if (agents instanceof Array) {
	        var agentIDs = [];
	        for (var i = 0; i < agents.length; i++)
	            agentIDs[i] = _attachOne.call(this, agents[i], targets, source);
	        return agentIDs;
	    } else
	        return _attachOne.call(this, agents, targets, source);
	};
	PhysicsEngine.prototype.attachTo = function attachTo(agentID, target) {
	    _getAgentData.call(this, agentID).targets.push(target);
	};
	PhysicsEngine.prototype.detach = function detach(id) {
	    var agent = this.getAgent(id);
	    var agentArray = _mapAgentArray.call(this, agent);
	    var index = agentArray.indexOf(id);
	    agentArray.splice(index, 1);
	    delete this._agentData[id];
	};
	PhysicsEngine.prototype.detachFrom = function detachFrom(id, target) {
	    var boundAgent = _getAgentData.call(this, id);
	    if (boundAgent.source === target)
	        this.detach(id);
	    else {
	        var targets = boundAgent.targets;
	        var index = targets.indexOf(target);
	        if (index > -1)
	            targets.splice(index, 1);
	    }
	};
	PhysicsEngine.prototype.detachAll = function detachAll() {
	    this._agentData = {};
	    this._forces = [];
	    this._constraints = [];
	    this._currAgentId = 0;
	};
	function _getAgentData(id) {
	    return this._agentData[id];
	}
	PhysicsEngine.prototype.getAgent = function getAgent(id) {
	    return _getAgentData.call(this, id).agent;
	};
	PhysicsEngine.prototype.getParticles = function getParticles() {
	    return this._particles;
	};
	PhysicsEngine.prototype.getBodies = function getBodies() {
	    return this._bodies;
	};
	PhysicsEngine.prototype.getParticlesAndBodies = function getParticlesAndBodies() {
	    return this.getParticles().concat(this.getBodies());
	};
	PhysicsEngine.prototype.forEachParticle = function forEachParticle(fn, dt) {
	    var particles = this.getParticles();
	    for (var index = 0, len = particles.length; index < len; index++)
	        fn.call(this, particles[index], dt);
	};
	PhysicsEngine.prototype.forEachBody = function forEachBody(fn, dt) {
	    if (!this._hasBodies)
	        return;
	    var bodies = this.getBodies();
	    for (var index = 0, len = bodies.length; index < len; index++)
	        fn.call(this, bodies[index], dt);
	};
	PhysicsEngine.prototype.forEach = function forEach(fn, dt) {
	    this.forEachParticle(fn, dt);
	    this.forEachBody(fn, dt);
	};
	function _updateForce(index) {
	    var boundAgent = _getAgentData.call(this, this._forces[index]);
	    boundAgent.agent.applyForce(boundAgent.targets, boundAgent.source);
	}
	function _updateForces() {
	    for (var index = this._forces.length - 1; index > -1; index--)
	        _updateForce.call(this, index);
	}
	function _updateConstraint(index, dt) {
	    var boundAgent = this._agentData[this._constraints[index]];
	    return boundAgent.agent.applyConstraint(boundAgent.targets, boundAgent.source, dt);
	}
	function _updateConstraints(dt) {
	    var iteration = 0;
	    while (iteration < this.options.constraintSteps) {
	        for (var index = this._constraints.length - 1; index > -1; index--)
	            _updateConstraint.call(this, index, dt);
	        iteration++;
	    }
	}
	function _updateVelocities(body, dt) {
	    body.integrateVelocity(dt);
	    if (this.options.velocityCap)
	        body.velocity.cap(this.options.velocityCap).put(body.velocity);
	}
	function _updateAngularVelocities(body, dt) {
	    body.integrateAngularMomentum(dt);
	    body.updateAngularVelocity();
	    if (this.options.angularVelocityCap)
	        body.angularVelocity.cap(this.options.angularVelocityCap).put(body.angularVelocity);
	}
	function _updateOrientations(body, dt) {
	    body.integrateOrientation(dt);
	}
	function _updatePositions(body, dt) {
	    body.integratePosition(dt);
	    body.emit(_events.update, body);
	}
	function _integrate(dt) {
	    _updateForces.call(this, dt);
	    this.forEach(_updateVelocities, dt);
	    this.forEachBody(_updateAngularVelocities, dt);
	    _updateConstraints.call(this, dt);
	    this.forEachBody(_updateOrientations, dt);
	    this.forEach(_updatePositions, dt);
	}
	function _getParticlesEnergy() {
	    var energy = 0;
	    var particleEnergy = 0;
	    this.forEach(function (particle) {
	        particleEnergy = particle.getEnergy();
	        energy += particleEnergy;
	    });
	    return energy;
	}
	function _getAgentsEnergy() {
	    var energy = 0;
	    for (var id in this._agentData)
	        energy += this.getAgentEnergy(id);
	    return energy;
	}
	PhysicsEngine.prototype.getAgentEnergy = function (agentId) {
	    var agentData = _getAgentData.call(this, agentId);
	    return agentData.agent.getEnergy(agentData.targets, agentData.source);
	};
	PhysicsEngine.prototype.getEnergy = function getEnergy() {
	    return _getParticlesEnergy.call(this) + _getAgentsEnergy.call(this);
	};
	PhysicsEngine.prototype.step = function step() {
	    if (this.isSleeping())
	        return;
	    var currTime = now();
	    var dtFrame = currTime - this._prevTime;
	    this._prevTime = currTime;
	    if (dtFrame < MIN_TIME_STEP)
	        return;
	    if (dtFrame > MAX_TIME_STEP)
	        dtFrame = MAX_TIME_STEP;
	    _integrate.call(this, TIMESTEP);
	    this.emit(_events.update, this);
	    if (this.getEnergy() < this.options.sleepTolerance)
	        this.sleep();
	};
	PhysicsEngine.prototype.isSleeping = function isSleeping() {
	    return this._isSleeping;
	};
	PhysicsEngine.prototype.isActive = function isSleeping() {
	    return !this._isSleeping;
	};
	PhysicsEngine.prototype.sleep = function sleep() {
	    if (this._isSleeping)
	        return;
	    this.forEach(function (body) {
	        body.sleep();
	    });
	    this.emit(_events.end, this);
	    this._isSleeping = true;
	};
	PhysicsEngine.prototype.wake = function wake() {
	    if (!this._isSleeping)
	        return;
	    this._prevTime = now();
	    this.emit(_events.start, this);
	    this._isSleeping = false;
	};
	PhysicsEngine.prototype.emit = function emit(type, data) {
	    if (this._eventHandler === null)
	        return;
	    this._eventHandler.emit(type, data);
	};
	PhysicsEngine.prototype.on = function on(event, fn) {
	    if (this._eventHandler === null)
	        this._eventHandler = new EventHandler();
	    this._eventHandler.on(event, fn);
	};
	module.exports = PhysicsEngine;

/***/ },
/* 51 */
/*!**********************************************!*\
  !*** ../~/famous/physics/bodies/Particle.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Vector = __webpack_require__(/*! ../../math/Vector */ 49);
	var Transform = __webpack_require__(/*! ../../core/Transform */ 39);
	var EventHandler = __webpack_require__(/*! ../../core/EventHandler */ 30);
	var Integrator = __webpack_require__(/*! ../integrators/SymplecticEuler */ 59);
	function Particle(options) {
	    options = options || {};
	    var defaults = Particle.DEFAULT_OPTIONS;
	    this.position = new Vector();
	    this.velocity = new Vector();
	    this.force = new Vector();
	    this._engine = null;
	    this._isSleeping = true;
	    this._eventOutput = null;
	    this.mass = options.mass !== undefined ? options.mass : defaults.mass;
	    this.inverseMass = 1 / this.mass;
	    this.setPosition(options.position || defaults.position);
	    this.setVelocity(options.velocity || defaults.velocity);
	    this.force.set(options.force || [
	        0,
	        0,
	        0
	    ]);
	    this.transform = Transform.identity.slice();
	    this._spec = {
	        size: [
	            true,
	            true
	        ],
	        target: {
	            transform: this.transform,
	            origin: [
	                0.5,
	                0.5
	            ],
	            target: null
	        }
	    };
	}
	Particle.DEFAULT_OPTIONS = {
	    position: [
	        0,
	        0,
	        0
	    ],
	    velocity: [
	        0,
	        0,
	        0
	    ],
	    mass: 1
	};
	var _events = {
	    start: 'start',
	    update: 'update',
	    end: 'end'
	};
	var now = Date.now;
	Particle.prototype.isBody = false;
	Particle.prototype.isActive = function isActive() {
	    return !this._isSleeping;
	};
	Particle.prototype.sleep = function sleep() {
	    if (this._isSleeping)
	        return;
	    this.emit(_events.end, this);
	    this._isSleeping = true;
	};
	Particle.prototype.wake = function wake() {
	    if (!this._isSleeping)
	        return;
	    this.emit(_events.start, this);
	    this._isSleeping = false;
	    this._prevTime = now();
	    if (this._engine)
	        this._engine.wake();
	};
	Particle.prototype.setPosition = function setPosition(position) {
	    this.position.set(position);
	};
	Particle.prototype.setPosition1D = function setPosition1D(x) {
	    this.position.x = x;
	};
	Particle.prototype.getPosition = function getPosition() {
	    this._engine.step();
	    return this.position.get();
	};
	Particle.prototype.getPosition1D = function getPosition1D() {
	    this._engine.step();
	    return this.position.x;
	};
	Particle.prototype.setVelocity = function setVelocity(velocity) {
	    this.velocity.set(velocity);
	    if (!(velocity[0] === 0 && velocity[1] === 0 && velocity[2] === 0))
	        this.wake();
	};
	Particle.prototype.setVelocity1D = function setVelocity1D(x) {
	    this.velocity.x = x;
	    if (x !== 0)
	        this.wake();
	};
	Particle.prototype.getVelocity = function getVelocity() {
	    return this.velocity.get();
	};
	Particle.prototype.setForce = function setForce(force) {
	    this.force.set(force);
	    this.wake();
	};
	Particle.prototype.getVelocity1D = function getVelocity1D() {
	    return this.velocity.x;
	};
	Particle.prototype.setMass = function setMass(mass) {
	    this.mass = mass;
	    this.inverseMass = 1 / mass;
	};
	Particle.prototype.getMass = function getMass() {
	    return this.mass;
	};
	Particle.prototype.reset = function reset(position, velocity) {
	    this.setPosition(position || [
	        0,
	        0,
	        0
	    ]);
	    this.setVelocity(velocity || [
	        0,
	        0,
	        0
	    ]);
	};
	Particle.prototype.applyForce = function applyForce(force) {
	    if (force.isZero())
	        return;
	    this.force.add(force).put(this.force);
	    this.wake();
	};
	Particle.prototype.applyImpulse = function applyImpulse(impulse) {
	    if (impulse.isZero())
	        return;
	    var velocity = this.velocity;
	    velocity.add(impulse.mult(this.inverseMass)).put(velocity);
	};
	Particle.prototype.integrateVelocity = function integrateVelocity(dt) {
	    Integrator.integrateVelocity(this, dt);
	};
	Particle.prototype.integratePosition = function integratePosition(dt) {
	    Integrator.integratePosition(this, dt);
	};
	Particle.prototype._integrate = function _integrate(dt) {
	    this.integrateVelocity(dt);
	    this.integratePosition(dt);
	};
	Particle.prototype.getEnergy = function getEnergy() {
	    return 0.5 * this.mass * this.velocity.normSquared();
	};
	Particle.prototype.getTransform = function getTransform() {
	    this._engine.step();
	    var position = this.position;
	    var transform = this.transform;
	    transform[12] = position.x;
	    transform[13] = position.y;
	    transform[14] = position.z;
	    return transform;
	};
	Particle.prototype.modify = function modify(target) {
	    var _spec = this._spec.target;
	    _spec.transform = this.getTransform();
	    _spec.target = target;
	    return this._spec;
	};
	function _createEventOutput() {
	    this._eventOutput = new EventHandler();
	    this._eventOutput.bindThis(this);
	    EventHandler.setOutputHandler(this, this._eventOutput);
	}
	Particle.prototype.emit = function emit(type, data) {
	    if (!this._eventOutput)
	        return;
	    this._eventOutput.emit(type, data);
	};
	Particle.prototype.on = function on() {
	    _createEventOutput.call(this);
	    return this.on.apply(this, arguments);
	};
	Particle.prototype.removeListener = function removeListener() {
	    _createEventOutput.call(this);
	    return this.removeListener.apply(this, arguments);
	};
	Particle.prototype.pipe = function pipe() {
	    _createEventOutput.call(this);
	    return this.pipe.apply(this, arguments);
	};
	Particle.prototype.unpipe = function unpipe() {
	    _createEventOutput.call(this);
	    return this.unpipe.apply(this, arguments);
	};
	module.exports = Particle;

/***/ },
/* 52 */
/*!******************************************!*\
  !*** ../~/famous/physics/forces/Drag.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Force = __webpack_require__(/*! ./Force */ 60);
	function Drag(options) {
	    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
	    if (options)
	        this.setOptions(options);
	    Force.call(this);
	}
	Drag.prototype = Object.create(Force.prototype);
	Drag.prototype.constructor = Drag;
	Drag.FORCE_FUNCTIONS = {
	    LINEAR: function (velocity) {
	        return velocity;
	    },
	    QUADRATIC: function (velocity) {
	        return velocity.mult(velocity.norm());
	    }
	};
	Drag.DEFAULT_OPTIONS = {
	    strength: 0.01,
	    forceFunction: Drag.FORCE_FUNCTIONS.LINEAR
	};
	Drag.prototype.applyForce = function applyForce(targets) {
	    var strength = this.options.strength;
	    var forceFunction = this.options.forceFunction;
	    var force = this.force;
	    var index;
	    var particle;
	    for (index = 0; index < targets.length; index++) {
	        particle = targets[index];
	        forceFunction(particle.velocity).mult(-strength).put(force);
	        particle.applyForce(force);
	    }
	};
	Drag.prototype.setOptions = function setOptions(options) {
	    for (var key in options)
	        this.options[key] = options[key];
	};
	module.exports = Drag;

/***/ },
/* 53 */
/*!********************************************!*\
  !*** ../~/famous/physics/forces/Spring.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Force = __webpack_require__(/*! ./Force */ 60);
	var Vector = __webpack_require__(/*! ../../math/Vector */ 49);
	function Spring(options) {
	    Force.call(this);
	    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
	    if (options)
	        this.setOptions(options);
	    this.disp = new Vector(0, 0, 0);
	    _init.call(this);
	}
	Spring.prototype = Object.create(Force.prototype);
	Spring.prototype.constructor = Spring;
	var pi = Math.PI;
	var MIN_PERIOD = 150;
	Spring.FORCE_FUNCTIONS = {
	    FENE: function (dist, rMax) {
	        var rMaxSmall = rMax * 0.99;
	        var r = Math.max(Math.min(dist, rMaxSmall), -rMaxSmall);
	        return r / (1 - r * r / (rMax * rMax));
	    },
	    HOOK: function (dist) {
	        return dist;
	    }
	};
	Spring.DEFAULT_OPTIONS = {
	    period: 300,
	    dampingRatio: 0.1,
	    length: 0,
	    maxLength: Infinity,
	    anchor: undefined,
	    forceFunction: Spring.FORCE_FUNCTIONS.HOOK
	};
	function _calcStiffness() {
	    var options = this.options;
	    options.stiffness = Math.pow(2 * pi / options.period, 2);
	}
	function _calcDamping() {
	    var options = this.options;
	    options.damping = 4 * pi * options.dampingRatio / options.period;
	}
	function _init() {
	    _calcStiffness.call(this);
	    _calcDamping.call(this);
	}
	Spring.prototype.setOptions = function setOptions(options) {
	    if (options.anchor !== undefined) {
	        if (options.anchor.position instanceof Vector)
	            this.options.anchor = options.anchor.position;
	        if (options.anchor instanceof Vector)
	            this.options.anchor = options.anchor;
	        if (options.anchor instanceof Array)
	            this.options.anchor = new Vector(options.anchor);
	    }
	    if (options.period !== undefined) {
	        if (options.period < MIN_PERIOD) {
	            options.period = MIN_PERIOD;
	            console.warn('The period of a SpringTransition is capped at ' + MIN_PERIOD + ' ms. Use a SnapTransition for faster transitions');
	        }
	        this.options.period = options.period;
	    }
	    if (options.dampingRatio !== undefined)
	        this.options.dampingRatio = options.dampingRatio;
	    if (options.length !== undefined)
	        this.options.length = options.length;
	    if (options.forceFunction !== undefined)
	        this.options.forceFunction = options.forceFunction;
	    if (options.maxLength !== undefined)
	        this.options.maxLength = options.maxLength;
	    _init.call(this);
	    Force.prototype.setOptions.call(this, options);
	};
	Spring.prototype.applyForce = function applyForce(targets, source) {
	    var force = this.force;
	    var disp = this.disp;
	    var options = this.options;
	    var stiffness = options.stiffness;
	    var damping = options.damping;
	    var restLength = options.length;
	    var maxLength = options.maxLength;
	    var anchor = options.anchor || source.position;
	    var forceFunction = options.forceFunction;
	    var i;
	    var target;
	    var p2;
	    var v2;
	    var dist;
	    var m;
	    for (i = 0; i < targets.length; i++) {
	        target = targets[i];
	        p2 = target.position;
	        v2 = target.velocity;
	        anchor.sub(p2).put(disp);
	        dist = disp.norm() - restLength;
	        if (dist === 0)
	            return;
	        m = target.mass;
	        stiffness *= m;
	        damping *= m;
	        disp.normalize(stiffness * forceFunction(dist, maxLength)).put(force);
	        if (damping)
	            if (source)
	                force.add(v2.sub(source.velocity).mult(-damping)).put(force);
	            else
	                force.add(v2.mult(-damping)).put(force);
	        target.applyForce(force);
	        if (source)
	            source.applyForce(force.mult(-1));
	    }
	};
	Spring.prototype.getEnergy = function getEnergy(targets, source) {
	    var options = this.options;
	    var restLength = options.length;
	    var anchor = source ? source.position : options.anchor;
	    var strength = options.stiffness;
	    var energy = 0;
	    for (var i = 0; i < targets.length; i++) {
	        var target = targets[i];
	        var dist = anchor.sub(target.position).norm() - restLength;
	        energy += 0.5 * strength * dist * dist;
	    }
	    return energy;
	};
	module.exports = Spring;

/***/ },
/* 54 */
/*!****************************************!*\
  !*** ../~/famous/inputs/ScrollSync.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var EventHandler = __webpack_require__(/*! ../core/EventHandler */ 30);
	var Engine = __webpack_require__(/*! ../core/Engine */ 10);
	var OptionsManager = __webpack_require__(/*! ../core/OptionsManager */ 31);
	function ScrollSync(options) {
	    this.options = Object.create(ScrollSync.DEFAULT_OPTIONS);
	    this._optionsManager = new OptionsManager(this.options);
	    if (options)
	        this.setOptions(options);
	    this._payload = {
	        delta: null,
	        position: null,
	        velocity: null,
	        slip: true
	    };
	    this._eventInput = new EventHandler();
	    this._eventOutput = new EventHandler();
	    EventHandler.setInputHandler(this, this._eventInput);
	    EventHandler.setOutputHandler(this, this._eventOutput);
	    this._position = this.options.direction === undefined ? [
	        0,
	        0
	    ] : 0;
	    this._prevTime = undefined;
	    this._prevVel = undefined;
	    this._eventInput.on('mousewheel', _handleMove.bind(this));
	    this._eventInput.on('wheel', _handleMove.bind(this));
	    this._inProgress = false;
	    this._loopBound = false;
	}
	ScrollSync.DEFAULT_OPTIONS = {
	    direction: undefined,
	    minimumEndSpeed: Infinity,
	    rails: false,
	    scale: 1,
	    stallTime: 50,
	    lineHeight: 40,
	    preventDefault: true
	};
	ScrollSync.DIRECTION_X = 0;
	ScrollSync.DIRECTION_Y = 1;
	var MINIMUM_TICK_TIME = 8;
	var _now = Date.now;
	function _newFrame() {
	    if (this._inProgress && _now() - this._prevTime > this.options.stallTime) {
	        this._inProgress = false;
	        var finalVel = Math.abs(this._prevVel) >= this.options.minimumEndSpeed ? this._prevVel : 0;
	        var payload = this._payload;
	        payload.position = this._position;
	        payload.velocity = finalVel;
	        payload.slip = true;
	        this._eventOutput.emit('end', payload);
	    }
	}
	function _handleMove(event) {
	    if (this.options.preventDefault)
	        event.preventDefault();
	    if (!this._inProgress) {
	        this._inProgress = true;
	        this._position = this.options.direction === undefined ? [
	            0,
	            0
	        ] : 0;
	        payload = this._payload;
	        payload.slip = true;
	        payload.position = this._position;
	        payload.clientX = event.clientX;
	        payload.clientY = event.clientY;
	        payload.offsetX = event.offsetX;
	        payload.offsetY = event.offsetY;
	        this._eventOutput.emit('start', payload);
	        if (!this._loopBound) {
	            Engine.on('prerender', _newFrame.bind(this));
	            this._loopBound = true;
	        }
	    }
	    var currTime = _now();
	    var prevTime = this._prevTime || currTime;
	    var diffX = event.wheelDeltaX !== undefined ? event.wheelDeltaX : -event.deltaX;
	    var diffY = event.wheelDeltaY !== undefined ? event.wheelDeltaY : -event.deltaY;
	    if (event.deltaMode === 1) {
	        diffX *= this.options.lineHeight;
	        diffY *= this.options.lineHeight;
	    }
	    if (this.options.rails) {
	        if (Math.abs(diffX) > Math.abs(diffY))
	            diffY = 0;
	        else
	            diffX = 0;
	    }
	    var diffTime = Math.max(currTime - prevTime, MINIMUM_TICK_TIME);
	    var velX = diffX / diffTime;
	    var velY = diffY / diffTime;
	    var scale = this.options.scale;
	    var nextVel;
	    var nextDelta;
	    if (this.options.direction === ScrollSync.DIRECTION_X) {
	        nextDelta = scale * diffX;
	        nextVel = scale * velX;
	        this._position += nextDelta;
	    } else if (this.options.direction === ScrollSync.DIRECTION_Y) {
	        nextDelta = scale * diffY;
	        nextVel = scale * velY;
	        this._position += nextDelta;
	    } else {
	        nextDelta = [
	            scale * diffX,
	            scale * diffY
	        ];
	        nextVel = [
	            scale * velX,
	            scale * velY
	        ];
	        this._position[0] += nextDelta[0];
	        this._position[1] += nextDelta[1];
	    }
	    var payload = this._payload;
	    payload.delta = nextDelta;
	    payload.velocity = nextVel;
	    payload.position = this._position;
	    payload.slip = true;
	    this._eventOutput.emit('update', payload);
	    this._prevTime = currTime;
	    this._prevVel = nextVel;
	}
	ScrollSync.prototype.getOptions = function getOptions() {
	    return this.options;
	};
	ScrollSync.prototype.setOptions = function setOptions(options) {
	    return this._optionsManager.setOptions(options);
	};
	module.exports = ScrollSync;

/***/ },
/* 55 */
/*!*********************************************!*\
  !*** ../~/famous-flex/src/LayoutContext.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * This Source Code is licensed under the MIT license. If a copy of the
	 * MIT-license was not distributed with this file, You can obtain one at:
	 * http://opensource.org/licenses/mit-license.html.
	 *
	 * @author: Hein Rutjes (IjzerenHein)
	 * @license MIT
	 * @copyright Gloey Apps, 2014
	 */
	
	/**
	 * LayoutContext is the interface for a layout-function to access
	 * renderables in the data-source and set their size, position, tranformation, etc...
	 *
	 * The `next`, `prev` and `get` functions return an opaque object which represents
	 * the renderable that is to be layed out. To access the actual renderable, use the
	 * `.renderNode` property of this opaque object.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    /**
	     * @class
	     * @alias module:LayoutContext
	     */
	    function LayoutContext(methods) {
	        for (var n in methods) {
	            this[n] = methods[n];
	        }
	    }
	
	    /**
	     * {Property} Size in which to layout the renderables.
	     */
	    LayoutContext.prototype.size = undefined;
	
	    /**
	     * {Property} Direction in which to layout the renderables (0 = X, 1 = Y).
	     */
	    LayoutContext.prototype.direction = undefined;
	
	    /**
	     * {Property} {Number} Scrolling offset at which to start laying out next/prev renderables.
	     */
	    LayoutContext.prototype.scrollOffset = undefined;
	
	    /**
	     * {Property} {Number} Top/left boundary to which to layout renderables (default: 0).
	     */
	    LayoutContext.prototype.scrollStart = undefined;
	
	    /**
	     * {Property} {Number} Bottom/right boundary to which to continue laying out renderables.
	     */
	    LayoutContext.prototype.scrollEnd = undefined;
	
	    /**
	     * Get the context-node for the next renderable in the data-source. When
	     * the end of the data-source is reached, `undefined` is returned.
	     * Use this function to enumerate the contents of a data-source that is
	     * either an Array or a ViewSequence.
	     *
	     * **Example:**
	     *
	     * ```javascript
	     * function MyLayoutFunction(context, options) {
	     *   var height = 0;
	     *   var node = context.next(); // get first next node
	     *   while (node) {
	     *     context.set(node, {
	     *       size: [context.size[0], 100],
	     *       translate: [0, height, 0]
	     *     });
	     *     height += 100;
	     *     node = context.next(); // get next node
	     *   }
	     * }
	     * ```
	     *
	     * @return {Object} context-node or undefined
	     */
	    LayoutContext.prototype.next = function() {
	        // dummy implementation, override in constructor
	    };
	
	    /**
	     * Get the context-node for the previous renderable in the data-source. When
	     * the start of the data-source is reached, `undefined` is returned.
	     * Use this function to enumerate the contents of a data-source that is
	     * either an Array or a ViewSequence.
	     *
	     * **Example:**
	     *
	     * ```javascript
	     * function MyLayoutFunction(context, options) {
	     *   var height = 0;
	     *   var node = context.prev(); // get first previous
	     *   while (node) {
	     *     height -= 100;
	     *     context.set(node, {
	     *       size: [context.size[0], 100],
	     *       translate: [0, height, 0]
	     *     });
	     *     node = context.prev(); // get prev node
	     *   }
	     * }
	     * ```
	     *
	     * @return {Object} context-node or undefined
	     */
	    LayoutContext.prototype.prev = function() {
	        // dummy implementation, override in constructor
	    };
	
	    /**
	     * Get the context-node for a renderable with a specific id. This function
	     * should be used to access data-sources which are key-value collections.
	     * When a data-source is an Array or a ViewSequence, use `next()`.
	     * In many cases it is not neccesary to use `get()`, instead you can pass
	     * the id of the renderable straight to the `set` function.
	     *
	     * **Example:**
	     *
	     * ```javascript
	     * var layoutController = new LayoutController({
	     *   layout: function (context, options) {
	     *     var size = context.size;
	     *     var left = context.get('left');
	     *     context.set(left, { size: [100, size[1]] });
	     *
	     *     var right = context.get('right');
	     *     context.set(right, {
	     *       size: [100, size[1]],
	     *       translate: [size[1] - 100, 0, 0]
	     *     });
	     *
	     *     var middle = context.get('middle');
	     *     context.set(middle, {
	     *       size: [size[0] - 200, size[1]],
	     *       translate: [100, 0, 0]
	     *     });
	     *   },
	     *   dataSource: {
	     *     left: new Surface({content: 'left'}),
	     *     right: new Surface({content: 'right'}),
	     *     middle: new Surface({content: 'middle'})
	     *   }
	     * });
	     * ```
	     *
	     * **Arrays:**
	     *
	     * A value at a specific id in the datasource can also be an array. To access the
	     * context-nodes in the array use `get()` to get the array and the elements in the
	     * array:
	     *
	     * ```javascript
	     * var layoutController = new LayoutController({
	     *   layout: function (context, options) {
	     *     var size = context.size;
	     *     var left = 0;
	     *
	     *     // Position title
	     *     context.set('title', { size: [100, size[1]] });
	     *     left += 100;
	     *
	     *     // Position left-items (array)
	     *     var leftItems = context.get('leftItems');
	     *     for (var i = 0; i < leftItems.length; i++) {
	     *       var leftItem = context.get(leftItems[i]);
	     *       context.set(leftItem, {
	     *         size: [100, size[1]],
	     *         translate: [left, 0, 0]
	     *       });
	     *       left += 100;
	     *     }
	     *   },
	     *   dataSource: {
	     *     title: new Surface({content: 'title'}),
	     *     leftItems: [
	     *       new Surface({content: 'item1'}),
	     *       new Surface({content: 'item2'})
	     *     ]
	     *   }
	     * });
	     * ```
	     *
	     * @param {Object|String} node context-node or node-id
	     * @return {Object} context-node or undefined
	     */
	    LayoutContext.prototype.get = function(node) {
	        // dummy implementation, override in constructor
	    };
	
	    /**
	     * Set the size, origin, align, translation, scale, rotate, skew & opacity for a context-node.
	     *
	     * **Overview of all supported properties:**
	     *
	     * ```javascript
	     * function MyLayoutFunction(context, options) {
	     *   context.set('mynode', {
	     *     size: [100, 20],
	     *     origin: [0.5, 0.5],
	     *     align: [0.5, 0.5],
	     *     translate: [50, 10, 0],
	     *     scale: [1, 1, 1],
	     *     skew: [0, 0, 0],
	     *     rotate: [Math.PI, 0, 0],
	     *     opacity: 1
	     *   })
	     * }
	     * ```
	     *
	     * @param {Object|String} node context-node or node-id
	     * @param {Object} set properties: size, origin, align, translate, scale, rotate, skew & opacity
	     */
	    LayoutContext.prototype.set = function(node, set) {
	        // dummy implementation, override in constructor
	    };
	
	    /**
	     * Resolve the size of a context-node by accessing the `getSize` function
	     * of the renderable.
	     *
	     * **Example:**
	     *
	     * ```javascript
	     * var layoutController = new LayoutController({
	     *   layout: function (context, options) {
	     *     var centerSize = context.resolveSize('center');
	     *     context.set('center', {origin: [0.5, 0.5]});
	     *     context.set('centerRight', {
	     *       origin: [0.5, 0.5],
	     *       translate: [centerSize[0] / 2, 0, 0]
	     *     });
	     *   },
	     *   dataSource: {
	     *     center: new Surface({content: 'center'}),
	     *     centerRight: new Surface({content: 'centerRight'}),
	     *   }
	     * });
	     * ```
	     *
	     * **When the size of the renderable is calculated by the DOM (`true` size)**
	     *
	     * When the layout-function performs its layout for the first time, it is
	     * possible that the renderable has not yet been rendered and its size
	     * is unknown. In this case, the LayoutController will cause a second
	     * reflow of the layout the next render-cycle, ensuring that the renderables
	     * are layed out as expected.
	     *
	     * @param {Object|String} node context-node, node-id or array-element
	     * @return {Size} size of the node
	     */
	    LayoutContext.prototype.resolveSize = function(node) {
	        // dummy implementation, override in constructor
	    };
	
	    module.exports = LayoutContext;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 56 */
/*!**************************************!*\
  !*** ../~/famous/core/SpecParser.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Transform = __webpack_require__(/*! ./Transform */ 39);
	function SpecParser() {
	    this.result = {};
	}
	SpecParser._instance = new SpecParser();
	SpecParser.parse = function parse(spec, context) {
	    return SpecParser._instance.parse(spec, context);
	};
	SpecParser.prototype.parse = function parse(spec, context) {
	    this.reset();
	    this._parseSpec(spec, context, Transform.identity);
	    return this.result;
	};
	SpecParser.prototype.reset = function reset() {
	    this.result = {};
	};
	function _vecInContext(v, m) {
	    return [
	        v[0] * m[0] + v[1] * m[4] + v[2] * m[8],
	        v[0] * m[1] + v[1] * m[5] + v[2] * m[9],
	        v[0] * m[2] + v[1] * m[6] + v[2] * m[10]
	    ];
	}
	var _zeroZero = [
	    0,
	    0
	];
	SpecParser.prototype._parseSpec = function _parseSpec(spec, parentContext, sizeContext) {
	    var id;
	    var target;
	    var transform;
	    var opacity;
	    var origin;
	    var align;
	    var size;
	    if (typeof spec === 'number') {
	        id = spec;
	        transform = parentContext.transform;
	        align = parentContext.align || _zeroZero;
	        if (parentContext.size && align && (align[0] || align[1])) {
	            var alignAdjust = [
	                align[0] * parentContext.size[0],
	                align[1] * parentContext.size[1],
	                0
	            ];
	            transform = Transform.thenMove(transform, _vecInContext(alignAdjust, sizeContext));
	        }
	        this.result[id] = {
	            transform: transform,
	            opacity: parentContext.opacity,
	            origin: parentContext.origin || _zeroZero,
	            align: parentContext.align || _zeroZero,
	            size: parentContext.size
	        };
	    } else if (!spec) {
	        return;
	    } else if (spec instanceof Array) {
	        for (var i = 0; i < spec.length; i++) {
	            this._parseSpec(spec[i], parentContext, sizeContext);
	        }
	    } else {
	        target = spec.target;
	        transform = parentContext.transform;
	        opacity = parentContext.opacity;
	        origin = parentContext.origin;
	        align = parentContext.align;
	        size = parentContext.size;
	        var nextSizeContext = sizeContext;
	        if (spec.opacity !== undefined)
	            opacity = parentContext.opacity * spec.opacity;
	        if (spec.transform)
	            transform = Transform.multiply(parentContext.transform, spec.transform);
	        if (spec.origin) {
	            origin = spec.origin;
	            nextSizeContext = parentContext.transform;
	        }
	        if (spec.align)
	            align = spec.align;
	        if (spec.size || spec.proportions) {
	            var parentSize = size;
	            size = [
	                size[0],
	                size[1]
	            ];
	            if (spec.size) {
	                if (spec.size[0] !== undefined)
	                    size[0] = spec.size[0];
	                if (spec.size[1] !== undefined)
	                    size[1] = spec.size[1];
	            }
	            if (spec.proportions) {
	                if (spec.proportions[0] !== undefined)
	                    size[0] = size[0] * spec.proportions[0];
	                if (spec.proportions[1] !== undefined)
	                    size[1] = size[1] * spec.proportions[1];
	            }
	            if (parentSize) {
	                if (align && (align[0] || align[1]))
	                    transform = Transform.thenMove(transform, _vecInContext([
	                        align[0] * parentSize[0],
	                        align[1] * parentSize[1],
	                        0
	                    ], sizeContext));
	                if (origin && (origin[0] || origin[1]))
	                    transform = Transform.moveThen([
	                        -origin[0] * size[0],
	                        -origin[1] * size[1],
	                        0
	                    ], transform);
	            }
	            nextSizeContext = parentContext.transform;
	            origin = null;
	            align = null;
	        }
	        this._parseSpec(target, {
	            transform: transform,
	            opacity: opacity,
	            origin: origin,
	            align: align,
	            size: size
	        }, nextSizeContext);
	    }
	};
	module.exports = SpecParser;

/***/ },
/* 57 */
/*!*****************************************************!*\
  !*** ../~/famous/transitions/MultipleTransition.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Utility = __webpack_require__(/*! ../utilities/Utility */ 34);
	function MultipleTransition(method) {
	    this.method = method;
	    this._instances = [];
	    this.state = [];
	}
	MultipleTransition.SUPPORTS_MULTIPLE = true;
	MultipleTransition.prototype.get = function get() {
	    for (var i = 0; i < this._instances.length; i++) {
	        this.state[i] = this._instances[i].get();
	    }
	    return this.state;
	};
	MultipleTransition.prototype.set = function set(endState, transition, callback) {
	    var _allCallback = Utility.after(endState.length, callback);
	    for (var i = 0; i < endState.length; i++) {
	        if (!this._instances[i])
	            this._instances[i] = new this.method();
	        this._instances[i].set(endState[i], transition, _allCallback);
	    }
	};
	MultipleTransition.prototype.reset = function reset(startState) {
	    for (var i = 0; i < startState.length; i++) {
	        if (!this._instances[i])
	            this._instances[i] = new this.method();
	        this._instances[i].reset(startState[i]);
	    }
	};
	module.exports = MultipleTransition;

/***/ },
/* 58 */
/*!**************************************************!*\
  !*** ../~/famous/transitions/TweenTransition.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	function TweenTransition(options) {
	    this.options = Object.create(TweenTransition.DEFAULT_OPTIONS);
	    if (options)
	        this.setOptions(options);
	    this._startTime = 0;
	    this._startValue = 0;
	    this._updateTime = 0;
	    this._endValue = 0;
	    this._curve = undefined;
	    this._duration = 0;
	    this._active = false;
	    this._callback = undefined;
	    this.state = 0;
	    this.velocity = undefined;
	}
	TweenTransition.Curves = {
	    linear: function (t) {
	        return t;
	    },
	    easeIn: function (t) {
	        return t * t;
	    },
	    easeOut: function (t) {
	        return t * (2 - t);
	    },
	    easeInOut: function (t) {
	        if (t <= 0.5)
	            return 2 * t * t;
	        else
	            return -2 * t * t + 4 * t - 1;
	    },
	    easeOutBounce: function (t) {
	        return t * (3 - 2 * t);
	    },
	    spring: function (t) {
	        return (1 - t) * Math.sin(6 * Math.PI * t) + t;
	    }
	};
	TweenTransition.SUPPORTS_MULTIPLE = true;
	TweenTransition.DEFAULT_OPTIONS = {
	    curve: TweenTransition.Curves.linear,
	    duration: 500,
	    speed: 0
	};
	var registeredCurves = {};
	TweenTransition.registerCurve = function registerCurve(curveName, curve) {
	    if (!registeredCurves[curveName]) {
	        registeredCurves[curveName] = curve;
	        return true;
	    } else {
	        return false;
	    }
	};
	TweenTransition.unregisterCurve = function unregisterCurve(curveName) {
	    if (registeredCurves[curveName]) {
	        delete registeredCurves[curveName];
	        return true;
	    } else {
	        return false;
	    }
	};
	TweenTransition.getCurve = function getCurve(curveName) {
	    var curve = registeredCurves[curveName];
	    if (curve !== undefined)
	        return curve;
	    else
	        throw new Error('curve not registered');
	};
	TweenTransition.getCurves = function getCurves() {
	    return registeredCurves;
	};
	function _interpolate(a, b, t) {
	    return (1 - t) * a + t * b;
	}
	function _clone(obj) {
	    if (obj instanceof Object) {
	        if (obj instanceof Array)
	            return obj.slice(0);
	        else
	            return Object.create(obj);
	    } else
	        return obj;
	}
	function _normalize(transition, defaultTransition) {
	    var result = { curve: defaultTransition.curve };
	    if (defaultTransition.duration)
	        result.duration = defaultTransition.duration;
	    if (defaultTransition.speed)
	        result.speed = defaultTransition.speed;
	    if (transition instanceof Object) {
	        if (transition.duration !== undefined)
	            result.duration = transition.duration;
	        if (transition.curve)
	            result.curve = transition.curve;
	        if (transition.speed)
	            result.speed = transition.speed;
	    }
	    if (typeof result.curve === 'string')
	        result.curve = TweenTransition.getCurve(result.curve);
	    return result;
	}
	TweenTransition.prototype.setOptions = function setOptions(options) {
	    if (options.curve !== undefined)
	        this.options.curve = options.curve;
	    if (options.duration !== undefined)
	        this.options.duration = options.duration;
	    if (options.speed !== undefined)
	        this.options.speed = options.speed;
	};
	TweenTransition.prototype.set = function set(endValue, transition, callback) {
	    if (!transition) {
	        this.reset(endValue);
	        if (callback)
	            callback();
	        return;
	    }
	    this._startValue = _clone(this.get());
	    transition = _normalize(transition, this.options);
	    if (transition.speed) {
	        var startValue = this._startValue;
	        if (startValue instanceof Object) {
	            var variance = 0;
	            for (var i in startValue)
	                variance += (endValue[i] - startValue[i]) * (endValue[i] - startValue[i]);
	            transition.duration = Math.sqrt(variance) / transition.speed;
	        } else {
	            transition.duration = Math.abs(endValue - startValue) / transition.speed;
	        }
	    }
	    this._startTime = Date.now();
	    this._endValue = _clone(endValue);
	    this._startVelocity = _clone(transition.velocity);
	    this._duration = transition.duration;
	    this._curve = transition.curve;
	    this._active = true;
	    this._callback = callback;
	};
	TweenTransition.prototype.reset = function reset(startValue, startVelocity) {
	    if (this._callback) {
	        var callback = this._callback;
	        this._callback = undefined;
	        callback();
	    }
	    this.state = _clone(startValue);
	    this.velocity = _clone(startVelocity);
	    this._startTime = 0;
	    this._duration = 0;
	    this._updateTime = 0;
	    this._startValue = this.state;
	    this._startVelocity = this.velocity;
	    this._endValue = this.state;
	    this._active = false;
	};
	TweenTransition.prototype.getVelocity = function getVelocity() {
	    return this.velocity;
	};
	TweenTransition.prototype.get = function get(timestamp) {
	    this.update(timestamp);
	    return this.state;
	};
	function _calculateVelocity(current, start, curve, duration, t) {
	    var velocity;
	    var eps = 1e-7;
	    var speed = (curve(t) - curve(t - eps)) / eps;
	    if (current instanceof Array) {
	        velocity = [];
	        for (var i = 0; i < current.length; i++) {
	            if (typeof current[i] === 'number')
	                velocity[i] = speed * (current[i] - start[i]) / duration;
	            else
	                velocity[i] = 0;
	        }
	    } else
	        velocity = speed * (current - start) / duration;
	    return velocity;
	}
	function _calculateState(start, end, t) {
	    var state;
	    if (start instanceof Array) {
	        state = [];
	        for (var i = 0; i < start.length; i++) {
	            if (typeof start[i] === 'number')
	                state[i] = _interpolate(start[i], end[i], t);
	            else
	                state[i] = start[i];
	        }
	    } else
	        state = _interpolate(start, end, t);
	    return state;
	}
	TweenTransition.prototype.update = function update(timestamp) {
	    if (!this._active) {
	        if (this._callback) {
	            var callback = this._callback;
	            this._callback = undefined;
	            callback();
	        }
	        return;
	    }
	    if (!timestamp)
	        timestamp = Date.now();
	    if (this._updateTime >= timestamp)
	        return;
	    this._updateTime = timestamp;
	    var timeSinceStart = timestamp - this._startTime;
	    if (timeSinceStart >= this._duration) {
	        this.state = this._endValue;
	        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, 1);
	        this._active = false;
	    } else if (timeSinceStart < 0) {
	        this.state = this._startValue;
	        this.velocity = this._startVelocity;
	    } else {
	        var t = timeSinceStart / this._duration;
	        this.state = _calculateState(this._startValue, this._endValue, this._curve(t));
	        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, t);
	    }
	};
	TweenTransition.prototype.isActive = function isActive() {
	    return this._active;
	};
	TweenTransition.prototype.halt = function halt() {
	    this.reset(this.get());
	};
	TweenTransition.registerCurve('linear', TweenTransition.Curves.linear);
	TweenTransition.registerCurve('easeIn', TweenTransition.Curves.easeIn);
	TweenTransition.registerCurve('easeOut', TweenTransition.Curves.easeOut);
	TweenTransition.registerCurve('easeInOut', TweenTransition.Curves.easeInOut);
	TweenTransition.registerCurve('easeOutBounce', TweenTransition.Curves.easeOutBounce);
	TweenTransition.registerCurve('spring', TweenTransition.Curves.spring);
	TweenTransition.customCurve = function customCurve(v1, v2) {
	    v1 = v1 || 0;
	    v2 = v2 || 0;
	    return function (t) {
	        return v1 * t + (-2 * v1 - v2 + 3) * t * t + (v1 + v2 - 2) * t * t * t;
	    };
	};
	module.exports = TweenTransition;

/***/ },
/* 59 */
/*!**********************************************************!*\
  !*** ../~/famous/physics/integrators/SymplecticEuler.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var SymplecticEuler = {};
	SymplecticEuler.integrateVelocity = function integrateVelocity(body, dt) {
	    var v = body.velocity;
	    var w = body.inverseMass;
	    var f = body.force;
	    if (f.isZero())
	        return;
	    v.add(f.mult(dt * w)).put(v);
	    f.clear();
	};
	SymplecticEuler.integratePosition = function integratePosition(body, dt) {
	    var p = body.position;
	    var v = body.velocity;
	    p.add(v.mult(dt)).put(p);
	};
	SymplecticEuler.integrateAngularMomentum = function integrateAngularMomentum(body, dt) {
	    var L = body.angularMomentum;
	    var t = body.torque;
	    if (t.isZero())
	        return;
	    L.add(t.mult(dt)).put(L);
	    t.clear();
	};
	SymplecticEuler.integrateOrientation = function integrateOrientation(body, dt) {
	    var q = body.orientation;
	    var w = body.angularVelocity;
	    if (w.isZero())
	        return;
	    q.add(q.multiply(w).scalarMultiply(0.5 * dt)).put(q);
	};
	module.exports = SymplecticEuler;

/***/ },
/* 60 */
/*!*******************************************!*\
  !*** ../~/famous/physics/forces/Force.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2015
	 */
	var Vector = __webpack_require__(/*! ../../math/Vector */ 49);
	var EventHandler = __webpack_require__(/*! ../../core/EventHandler */ 30);
	function Force(force) {
	    this.force = new Vector(force);
	    this._eventOutput = new EventHandler();
	    EventHandler.setOutputHandler(this, this._eventOutput);
	}
	Force.prototype.setOptions = function setOptions(options) {
	    this._eventOutput.emit('change', options);
	};
	Force.prototype.applyForce = function applyForce(targets) {
	    var length = targets.length;
	    while (length--) {
	        targets[length].applyForce(this.force);
	    }
	};
	Force.prototype.getEnergy = function getEnergy() {
	    return 0;
	};
	module.exports = Force;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map