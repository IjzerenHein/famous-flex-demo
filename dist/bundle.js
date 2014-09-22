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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
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

	/*global define, Please, console*/
	/*eslint no-console:0 no-use-before-define:0*/

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    //<webpack>
	    __webpack_require__(2);
	    __webpack_require__(6);
	    __webpack_require__(22);
	    __webpack_require__(8);
	    __webpack_require__(3);
	    //</webpack>

	    // please-js
	    __webpack_require__(4);

	    // Fast-click
	    var FastClick = __webpack_require__(20);
	    FastClick.attach(document.body);

	    // import dependencies
	    var Engine = __webpack_require__(26);
	    var Modifier = __webpack_require__(24);
	    var Transform = __webpack_require__(25);
	    var Surface = __webpack_require__(27);
	    var InputSurface = __webpack_require__(28);
	    var LayoutController = __webpack_require__(10);
	    var FlowLayoutController = __webpack_require__(11);
	    var ScrollView = __webpack_require__(12);
	    var LayoutUtility = __webpack_require__(13);
	    //var NewYork = require('./data/newyork/collection');
	    var LayoutDockHelper = __webpack_require__(14);
	    //var BkImageSurface = require('famous-bkimagesurface/BkImageSurface');
	    // layouts
	    var GridLayout = __webpack_require__(15);
	    var NavBarLayout = __webpack_require__(16);
	    var ListLayout = __webpack_require__(17);
	    var CollectionLayout = __webpack_require__(18);
	    var CoverLayout = __webpack_require__(19);
	    //var CubeLayout = require('famous-flex/layouts/CubeLayout');
	    // lagometer
	    var Lagometer = __webpack_require__(5);

	    // create the main context
	    var mainContext = Engine.createContext();

	    // Create the shell
	    var layoutListRenderables = [];
	    var layoutDetailsRenderables = [];
	    var collection = [];
	    var layouts = [];
	    var layoutDetailsView;
	    var navbar = _createNavbar();
	    var sidebar = _createSidebar();
	    var collectionView = _createCollectionView();
	    var shell = _createShell({
	        navbar: navbar,
	        sidebar: sidebar,
	        content: collectionView
	    });
	    mainContext.add(shell);

	    /**
	     * Shell
	     */
	    function ShellLayout(context, options) {
	        var size = context.size;
	        context.set('navbar', {
	            size: [size[0], options.navBarHeight]
	        });
	        context.set('content', {
	            size: [size[0], size[1] - options.navBarHeight],
	            translate: [0, options.navBarHeight, 0],
	            origin: [1, 0],
	            rotate: options.showSideBar ? [0, (Math.PI/180) * -20, 0] : [0, 0, 0]
	        });
	        context.set('sidebar', {
	            size: [options.sideBarWidth, size[1] - options.navBarHeight],
	            translate: [0, options.navBarHeight, 100],
	            origin: [0, 0],
	            rotate: options.showSideBar ? [0, (Math.PI/180) * 10, 0] : [0, (Math.PI/180) * 90, 0]
	        });
	    }
	    function _createShell(renderables) {
	        return new FlowLayoutController({
	            layout: ShellLayout,
	            layoutOptions: {
	                navBarHeight: 58,
	                sideBarWidth: 160
	            },
	            dataSource: renderables
	        });
	    }
	    function _createSidebar() {
	        layoutDetailsView = _createLayoutDetailsView();
	        return new LayoutController({
	            layout: function(context) {
	                var size = context.size;
	                var dock = new LayoutDockHelper(context, {
	                    translateZ: 1
	                });
	                context.set('back', {size: size});
	                if (size[0] < 300) {
	                    dock.bottom('details', 140);
	                }
	                else {
	                    dock.right('details', 200);
	                }
	                dock.fill('list');
	            },
	            dataSource: {
	                'list': _createLayoutListView(),
	                'details': layoutDetailsView,
	                'back': new Surface({classes:['panel']})
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
	        collectionView.scroll(1);
	    }
	    function _movePrevItem() {
	        _hideSidebar.call(this);
	        collectionView.scroll(-1);
	    }
	    function _rotateLayout() {
	        _hideSidebar.call(this);
	        var direction = collectionView.getDirection(true);
	        collectionView.setDirection((direction + 1) % 2);
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
	        /*var imageUrl = NewYork[collection.length % NewYork.length];
	        return new BkImageSurface({
	            classes: ['image-frame'],
	            content: imageUrl,
	            sizeMode: 'cover',
	            properties: {
	                backgroundColor: 'black'
	            }
	        });*/
	        return new Surface({
	            properties: {
	                backgroundColor: window.Please.make_color()
	            }
	        });
	    }
	    function _addCollectionItem() {
	        if (collectionView && collectionView.insert) {
	            var rightItems = navbar.getSpec('rightItems');
	            var insertSpec = LayoutUtility.cloneSpec(navbar.getSpec(rightItems[1]));
	            insertSpec.opacity = 0;
	            insertSpec.origin = [1, 0];
	            insertSpec.align = [1, 0];
	            var pos = Math.floor(Math.random() * (Math.min(collection.length, 5) + 1));
	            collectionView.insert(pos, _createCollectionItem(), insertSpec);
	        }
	        else {
	            collection.unshift(_createCollectionItem());
	        }
	    }
	    function _removeCollectionItem() {
	        if (collectionView && collectionView.remove) {
	            var rightItems = navbar.getSpec('rightItems');
	            var removeSpec = LayoutUtility.cloneSpec(navbar.getSpec(rightItems[0]));
	            removeSpec.opacity = 0;
	            removeSpec.origin = [1, 0];
	            removeSpec.align = [1, 0];
	            var pos = Math.floor(Math.random() * Math.min(collection.length, 5));
	            collectionView.remove(pos, removeSpec);
	        }
	    }
	    function _createCollectionView() {
	        for (var i = 0; i < 3; i++) {
	            _addCollectionItem();
	        }
	        /*return new FlowLayoutController({
	            dataSource: collection
	        });*/
	        return new ScrollView({
	            dataSource: collection,
	            useContainer: true
	        });
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
	        return new LayoutController({
	            layout: ListLayout,
	            layoutOptions: { itemSize: 40 },
	            dataSource: layoutDetailsRenderables
	        });
	    }

	    function _incrementLayoutOption(option, value, input) {
	        if (Array.isArray(option.value)) {
	            var newValue = [];
	            for (var i = 0; i < option.value.length; i++) {
	                newValue.push(Math.max(Math.min(option.value[i] + value, option.max[i]), option.min[i]));
	            }
	            option.value = newValue;
	        }
	        else {
	            option.value = Math.max(Math.min(option.value + value, option.max), option.min);
	        }
	        input.setValue(JSON.stringify(option.value));
	        var layoutOptions = {};
	        layoutOptions[option.name] = option.value;
	        collectionView.setLayoutOptions(layoutOptions);
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
	        collectionView.setLayoutOptions(layoutOptions);
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
	        layoutDetailsRenderables = [];
	        var layout = _findLayout(name);
	        for (var i = 0; i < layout.options.length; i++) {
	            if ((layout.options.editable === undefined) || layout.options.editable) {
	                layoutDetailsRenderables.push(_createLayoutDetailItem(layout.options[i]));
	            }
	        }
	        layoutDetailsView.setDataSource(layoutDetailsRenderables);
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
	        collectionView.setLayout(layout.layout, layoutOptions);

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
	        _addLayout('GridLayout', GridLayout, [
	            {name: 'cells',      value: [3, 3], min: [1, 1], max: [50, 50]},
	            {name: 'gutter',     value: [20, 20], min: [0, 0], max: [100, 100]}
	        ]);
	        _addLayout('ListLayout', ListLayout, [
	            {name: 'itemSize',   value: 50, min: 0, max: 1000}
	        ]);
	        _addLayout('CollectionLayout', CollectionLayout, [
	            {name: 'itemSize',   value: [100, 100], min: [0, 0], max: [1000, 1000]},
	            {name: 'justify',    value: [1, 1], min: [0, 0], max: [1, 1]},
	            {name: 'gutter',     value: [10, 10], min: [0, 0], max: [100, 100]}
	        ]);
	        _addLayout('CoverLayout', CoverLayout, [
	            {name: 'itemSize',   value: [260, 200], min: [0, 0], max: [1000, 1000]}
	        ]);
	        _addLayout('FullScreen', ListLayout, [
	            {name: 'itemSize',   value: undefined, editable:false}
	        ]);
	        /*_addLayout('CubeLayout', CubeLayout, [
	            {name: 'itemSize',   value: [100, 100], min: [0, 0], max: [1000, 1000]}
	        ]);*/
	    }
	    _addLayouts();
	    _selectLayout('CollectionLayout');

	    /**
	     * Lagometer
	     */
	    var lagometerModifier = new Modifier({
	        size: [100, 100],
	        align: [1.0, 0.0],
	        origin: [1.0, 0.0],
	        transform: Transform.translate(-10, 70, 1000)
	    });
	    var lagometer = new Lagometer({
	        size: lagometerModifier.getSize()
	    });
	    mainContext.add(lagometerModifier).add(lagometer);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(29);
	__webpack_require__(30);
	__webpack_require__(31);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html"

/***/ },
/* 4 */
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
/* 5 */
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

	/*jslint browser:true, nomen:true, vars:true, plusplus:true*/
	/*global define*/

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    'use strict';

	    // import dependencies
	    var Engine = __webpack_require__(26);
	    var CanvasSurface = __webpack_require__(32);
	    var View = __webpack_require__(33);

	    /**
	     * @class Lagometer
	     * @extends View
	     * @constructor
	     * @param {Object} [options] Configuration options
	     */
	    function Lagometer(options) {
	        View.apply(this, arguments);

	        // Create sample-buffer
	        this.samples = [];
	        this.sampleIndex = 0;
	        this.Samples = this.options.size[0];

	        // Install render-handlers
	        Engine.on('prerender', this._onEngineRender.bind(this, true));
	        Engine.on('postrender', this._onEngineRender.bind(this, false));

	        // Create drawing canvas
	        this.canvas = new CanvasSurface(this.options.canvasSurface);
	        this.add(this.canvas);
	    }
	    Lagometer.prototype = Object.create(View.prototype);
	    Lagometer.prototype.constructor = Lagometer;

	    Lagometer.DEFAULT_OPTIONS = {
	        size: [100, 100],
	        min: 0,
	        max: 34,
	        backgroundColor: 'rgba(200, 0, 0, 0.8)',
	        borderColor: 'rgba(255, 0, 0, 0.8)',
	        textColor: 'rgba(255, 255, 255, 0.8)',
	        font: '28px Arial',
	        frameColor: '#00FF00',
	        scriptColor: '#BBBBFF',
	        canvasSurface: {
	            properties: {
	                'pointer-events': 'none'
	            }
	        }
	    };

	    /**
	     * @method _onEngineRender
	     */
	    Lagometer.prototype._onEngineRender = function(pre) {
	        var currentTime = Date.now();
	        if (pre) {

	            // Determine the time that was spent between two 'animation-frames'
	            if (this.lastTime !== undefined) {
	                this.frameTime = currentTime - this.lastTime;
	                if (this.maxFrameTime === undefined) {
	                    this.maxFrameTime = this.frameTime;
	                }
	                this.maxFrameTime = Math.max(this.frameTime, this.maxFrameTime);
	                if (this.minFrameTime === undefined) {
	                    this.minFrameTime = this.frameTime;
	                }
	                this.minFrameTime = Math.min(this.frameTime, this.minFrameTime);
	            }
	            this.lastTime = currentTime;

	        } else if (this.frameTime !== undefined) {

	            // Determine the time that was spent in the script
	            this.scriptTime = currentTime - this.lastTime;
	            if (this.maxScriptTime === undefined) {
	                this.maxScriptTime = this.scriptTime;
	            }
	            this.maxScriptTime = Math.max(this.scriptTime, this.maxScriptTime);
	            if (this.minScriptTime === undefined) {
	                this.minScriptTime = this.scriptTime;
	            }
	            this.minScriptTime = Math.min(this.scriptTime, this.minScriptTime);

	            // Create sample
	            var sample = {
	                lastTime: this.lastTime,
	                frameTime: this.frameTime,
	                scriptTime: this.scriptTime
	            };
	            var maxSamples = this.options.size[0] * 2;
	            if (this.samples.length < maxSamples) {
	                this.sampleIndex = this.samples.length;
	                this.samples.push(sample);
	            }
	            else {
	                this.sampleIndex = (this.sampleIndex + 1) % maxSamples;
	                this.samples[this.sampleIndex] = sample;
	            }
	        }
	    };

	    /**
	     * @method _drawSamples
	     */
	    Lagometer.prototype._drawSamples = function(draw) {

	        draw.context.beginPath();
	        var i;
	        var bufferIndex = draw.index;
	        var size = draw.size;
	        var yScale =  size[1] / (draw.max - draw.min);
	        for (i = 0; i < draw.buffer.length; i++) {
	            var x = size[0] - i;
	            var sample = draw.buffer[bufferIndex][draw.property];
	            var y = size[1] - ((sample - draw.min) * yScale);
	            if (i === 0) {
	                draw.context.moveTo(x, y);
	            }
	            else {
	                draw.context.lineTo(x, y);
	            }
	            bufferIndex--;
	            if (bufferIndex < 0) {
	                bufferIndex = draw.buffer.length - 1;
	                }
	        }
	        draw.context.lineWidth = 1;
	        draw.context.strokeStyle = draw.color;
	        draw.context.stroke();
	    };

	    /**
	     * @method _getFPS
	     */
	    Lagometer.prototype._getFPS = function(count) {
	        count = Math.min(count, this.samples.length);
	        var bufferIndex = this.sampleIndex;
	        var i;
	        var fps = 0;
	        for (i = 0; i < count; i++) {
	            var sample = this.samples[bufferIndex];
	            fps += sample.frameTime;
	            bufferIndex--;
	            if (bufferIndex < 0) {
	                bufferIndex = this.samples.length - 1;
	            }
	        }
	        return 1000 / (fps / count);
	    };

	    /**
	     * Renders the view.
	     *
	     * @method render
	     * @private
	     * @ignore
	     */
	    Lagometer.prototype.render = function render() {
	        var context = this.canvas.getContext('2d');
	        var size = this.getSize();
	        var canvasSize = [size[0] * 2, size[1] * 2];
	        this.canvas.setSize(size, canvasSize);

	        // Clear background
	        context.clearRect(0, 0, canvasSize[0], canvasSize[1]);
	        context.fillStyle = this.options.backgroundColor;
	        context.fillRect(0, 0, canvasSize[0], canvasSize[1]);
	        context.lineWidth = 1;
	        context.strokeStyle = this.options.borderColor;
	        context.strokeRect(0, 0, canvasSize[0], canvasSize[1]);

	        // Calculate min/max
	        var min = this.options.min;
	        var max = this.options.max;
	        //var min = Math.min(this.minFrameTime, this.minScriptTime);
	        //var max = Math.max(this.maxFrameTime, this.maxScriptTime);
	        /*var range = max - min;
	        var i;
	        if (this.samples.length) {
	            min = this.samples[0].frameTime;
	            max = this.samples[0].frameTime;
	            for (i = 0; i < this.samples.length; i++) {
	                min = Math.min(min, this.samples[i].frameTime);
	                max = Math.max(max, this.samples[i].frameTime);
	            }
	            min = 0;
	        }*/

	        // Prepare text drawing
	        context.fillStyle = this.options.textColor;
	        context.font = this.options.font;

	        // Draw fps (calculated over last 20 frames)
	        var fps = Math.round(this._getFPS(20));
	        context.fillText(fps + ' fps', canvasSize[0] - 84, 26);

	        // Draw frame-times
	        this._drawSamples({
	            context: context,
	            size: canvasSize,
	            buffer: this.samples,
	            index: this.sampleIndex,
	            min: min,
	            max: max,
	            property: 'frameTime',
	            color: this.options.frameColor
	        });

	        // Draw script-times
	        this._drawSamples({
	            context: context,
	            size: canvasSize,
	            buffer: this.samples,
	            index: this.sampleIndex,
	            min: min,
	            max: max,
	            property: 'scriptTime',
	            color: this.options.scriptColor
	        });

	        // Call super
	        return this._node.render();
	    };

	    module.exports = Lagometer;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(21)
		// The css code:
		(__webpack_require__(7));
	// Hot Module Replacement
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		"@import url(//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700);" +
		"/*!\n * bootswatch v3.2.0\n * Homepage: http://bootswatch.com\n * Copyright 2012-2014 Thomas Park\n * Licensed under MIT\n * Based on Bootstrap\n*//*! normalize.css v3.0.1 | MIT License | git.io/normalize */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:bold}dfn{font-style:italic}h1{font-size:2em;margin:0.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace, monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=\"button\"],input[type=\"reset\"],input[type=\"submit\"]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=\"checkbox\"],input[type=\"radio\"]{box-sizing:border-box;padding:0}input[type=\"number\"]::-webkit-inner-spin-button,input[type=\"number\"]::-webkit-outer-spin-button{height:auto}input[type=\"search\"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type=\"search\"]::-webkit-search-cancel-button,input[type=\"search\"]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:0.35em 0.625em 0.75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:bold}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}@media print{*{text-shadow:none !important;color:#000 !important;background:transparent !important;box-shadow:none !important}a,a:visited{text-decoration:underline}a[href]:after{content:\" (\" attr(href) \")\"}abbr[title]:after{content:\" (\" attr(title) \")\"}a[href^=\"javascript:\"]:after,a[href^=\"#\"]:after{content:\"\"}pre,blockquote{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}tr,img{page-break-inside:avoid}img{max-width:100% !important}p,h2,h3{orphans:3;widows:3}h2,h3{page-break-after:avoid}select{background:#fff !important}.navbar{display:none}.table td,.table th{background-color:#fff !important}.btn>.caret,.dropup>.btn>.caret{border-top-color:#000 !important}.label{border:1px solid #000}.table{border-collapse:collapse !important}.table-bordered th,.table-bordered td{border:1px solid #ddd !important}}@font-face{font-family:'Glyphicons Halflings';src:url("+__webpack_require__(53)+");src:url("+__webpack_require__(53)+"?#iefix) format('embedded-opentype'),url("+__webpack_require__(54)+") format('woff'),url("+__webpack_require__(55)+") format('truetype'),url("+__webpack_require__(56)+"#glyphicons_halflingsregular) format('svg')}.glyphicon{position:relative;top:1px;display:inline-block;font-family:'Glyphicons Halflings';font-style:normal;font-weight:normal;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.glyphicon-asterisk:before{content:\"\\2a\"}.glyphicon-plus:before{content:\"\\2b\"}.glyphicon-euro:before{content:\"\\20ac\"}.glyphicon-minus:before{content:\"\\2212\"}.glyphicon-cloud:before{content:\"\\2601\"}.glyphicon-envelope:before{content:\"\\2709\"}.glyphicon-pencil:before{content:\"\\270f\"}.glyphicon-glass:before{content:\"\\e001\"}.glyphicon-music:before{content:\"\\e002\"}.glyphicon-search:before{content:\"\\e003\"}.glyphicon-heart:before{content:\"\\e005\"}.glyphicon-star:before{content:\"\\e006\"}.glyphicon-star-empty:before{content:\"\\e007\"}.glyphicon-user:before{content:\"\\e008\"}.glyphicon-film:before{content:\"\\e009\"}.glyphicon-th-large:before{content:\"\\e010\"}.glyphicon-th:before{content:\"\\e011\"}.glyphicon-th-list:before{content:\"\\e012\"}.glyphicon-ok:before{content:\"\\e013\"}.glyphicon-remove:before{content:\"\\e014\"}.glyphicon-zoom-in:before{content:\"\\e015\"}.glyphicon-zoom-out:before{content:\"\\e016\"}.glyphicon-off:before{content:\"\\e017\"}.glyphicon-signal:before{content:\"\\e018\"}.glyphicon-cog:before{content:\"\\e019\"}.glyphicon-trash:before{content:\"\\e020\"}.glyphicon-home:before{content:\"\\e021\"}.glyphicon-file:before{content:\"\\e022\"}.glyphicon-time:before{content:\"\\e023\"}.glyphicon-road:before{content:\"\\e024\"}.glyphicon-download-alt:before{content:\"\\e025\"}.glyphicon-download:before{content:\"\\e026\"}.glyphicon-upload:before{content:\"\\e027\"}.glyphicon-inbox:before{content:\"\\e028\"}.glyphicon-play-circle:before{content:\"\\e029\"}.glyphicon-repeat:before{content:\"\\e030\"}.glyphicon-refresh:before{content:\"\\e031\"}.glyphicon-list-alt:before{content:\"\\e032\"}.glyphicon-lock:before{content:\"\\e033\"}.glyphicon-flag:before{content:\"\\e034\"}.glyphicon-headphones:before{content:\"\\e035\"}.glyphicon-volume-off:before{content:\"\\e036\"}.glyphicon-volume-down:before{content:\"\\e037\"}.glyphicon-volume-up:before{content:\"\\e038\"}.glyphicon-qrcode:before{content:\"\\e039\"}.glyphicon-barcode:before{content:\"\\e040\"}.glyphicon-tag:before{content:\"\\e041\"}.glyphicon-tags:before{content:\"\\e042\"}.glyphicon-book:before{content:\"\\e043\"}.glyphicon-bookmark:before{content:\"\\e044\"}.glyphicon-print:before{content:\"\\e045\"}.glyphicon-camera:before{content:\"\\e046\"}.glyphicon-font:before{content:\"\\e047\"}.glyphicon-bold:before{content:\"\\e048\"}.glyphicon-italic:before{content:\"\\e049\"}.glyphicon-text-height:before{content:\"\\e050\"}.glyphicon-text-width:before{content:\"\\e051\"}.glyphicon-align-left:before{content:\"\\e052\"}.glyphicon-align-center:before{content:\"\\e053\"}.glyphicon-align-right:before{content:\"\\e054\"}.glyphicon-align-justify:before{content:\"\\e055\"}.glyphicon-list:before{content:\"\\e056\"}.glyphicon-indent-left:before{content:\"\\e057\"}.glyphicon-indent-right:before{content:\"\\e058\"}.glyphicon-facetime-video:before{content:\"\\e059\"}.glyphicon-picture:before{content:\"\\e060\"}.glyphicon-map-marker:before{content:\"\\e062\"}.glyphicon-adjust:before{content:\"\\e063\"}.glyphicon-tint:before{content:\"\\e064\"}.glyphicon-edit:before{content:\"\\e065\"}.glyphicon-share:before{content:\"\\e066\"}.glyphicon-check:before{content:\"\\e067\"}.glyphicon-move:before{content:\"\\e068\"}.glyphicon-step-backward:before{content:\"\\e069\"}.glyphicon-fast-backward:before{content:\"\\e070\"}.glyphicon-backward:before{content:\"\\e071\"}.glyphicon-play:before{content:\"\\e072\"}.glyphicon-pause:before{content:\"\\e073\"}.glyphicon-stop:before{content:\"\\e074\"}.glyphicon-forward:before{content:\"\\e075\"}.glyphicon-fast-forward:before{content:\"\\e076\"}.glyphicon-step-forward:before{content:\"\\e077\"}.glyphicon-eject:before{content:\"\\e078\"}.glyphicon-chevron-left:before{content:\"\\e079\"}.glyphicon-chevron-right:before{content:\"\\e080\"}.glyphicon-plus-sign:before{content:\"\\e081\"}.glyphicon-minus-sign:before{content:\"\\e082\"}.glyphicon-remove-sign:before{content:\"\\e083\"}.glyphicon-ok-sign:before{content:\"\\e084\"}.glyphicon-question-sign:before{content:\"\\e085\"}.glyphicon-info-sign:before{content:\"\\e086\"}.glyphicon-screenshot:before{content:\"\\e087\"}.glyphicon-remove-circle:before{content:\"\\e088\"}.glyphicon-ok-circle:before{content:\"\\e089\"}.glyphicon-ban-circle:before{content:\"\\e090\"}.glyphicon-arrow-left:before{content:\"\\e091\"}.glyphicon-arrow-right:before{content:\"\\e092\"}.glyphicon-arrow-up:before{content:\"\\e093\"}.glyphicon-arrow-down:before{content:\"\\e094\"}.glyphicon-share-alt:before{content:\"\\e095\"}.glyphicon-resize-full:before{content:\"\\e096\"}.glyphicon-resize-small:before{content:\"\\e097\"}.glyphicon-exclamation-sign:before{content:\"\\e101\"}.glyphicon-gift:before{content:\"\\e102\"}.glyphicon-leaf:before{content:\"\\e103\"}.glyphicon-fire:before{content:\"\\e104\"}.glyphicon-eye-open:before{content:\"\\e105\"}.glyphicon-eye-close:before{content:\"\\e106\"}.glyphicon-warning-sign:before{content:\"\\e107\"}.glyphicon-plane:before{content:\"\\e108\"}.glyphicon-calendar:before{content:\"\\e109\"}.glyphicon-random:before{content:\"\\e110\"}.glyphicon-comment:before{content:\"\\e111\"}.glyphicon-magnet:before{content:\"\\e112\"}.glyphicon-chevron-up:before{content:\"\\e113\"}.glyphicon-chevron-down:before{content:\"\\e114\"}.glyphicon-retweet:before{content:\"\\e115\"}.glyphicon-shopping-cart:before{content:\"\\e116\"}.glyphicon-folder-close:before{content:\"\\e117\"}.glyphicon-folder-open:before{content:\"\\e118\"}.glyphicon-resize-vertical:before{content:\"\\e119\"}.glyphicon-resize-horizontal:before{content:\"\\e120\"}.glyphicon-hdd:before{content:\"\\e121\"}.glyphicon-bullhorn:before{content:\"\\e122\"}.glyphicon-bell:before{content:\"\\e123\"}.glyphicon-certificate:before{content:\"\\e124\"}.glyphicon-thumbs-up:before{content:\"\\e125\"}.glyphicon-thumbs-down:before{content:\"\\e126\"}.glyphicon-hand-right:before{content:\"\\e127\"}.glyphicon-hand-left:before{content:\"\\e128\"}.glyphicon-hand-up:before{content:\"\\e129\"}.glyphicon-hand-down:before{content:\"\\e130\"}.glyphicon-circle-arrow-right:before{content:\"\\e131\"}.glyphicon-circle-arrow-left:before{content:\"\\e132\"}.glyphicon-circle-arrow-up:before{content:\"\\e133\"}.glyphicon-circle-arrow-down:before{content:\"\\e134\"}.glyphicon-globe:before{content:\"\\e135\"}.glyphicon-wrench:before{content:\"\\e136\"}.glyphicon-tasks:before{content:\"\\e137\"}.glyphicon-filter:before{content:\"\\e138\"}.glyphicon-briefcase:before{content:\"\\e139\"}.glyphicon-fullscreen:before{content:\"\\e140\"}.glyphicon-dashboard:before{content:\"\\e141\"}.glyphicon-paperclip:before{content:\"\\e142\"}.glyphicon-heart-empty:before{content:\"\\e143\"}.glyphicon-link:before{content:\"\\e144\"}.glyphicon-phone:before{content:\"\\e145\"}.glyphicon-pushpin:before{content:\"\\e146\"}.glyphicon-usd:before{content:\"\\e148\"}.glyphicon-gbp:before{content:\"\\e149\"}.glyphicon-sort:before{content:\"\\e150\"}.glyphicon-sort-by-alphabet:before{content:\"\\e151\"}.glyphicon-sort-by-alphabet-alt:before{content:\"\\e152\"}.glyphicon-sort-by-order:before{content:\"\\e153\"}.glyphicon-sort-by-order-alt:before{content:\"\\e154\"}.glyphicon-sort-by-attributes:before{content:\"\\e155\"}.glyphicon-sort-by-attributes-alt:before{content:\"\\e156\"}.glyphicon-unchecked:before{content:\"\\e157\"}.glyphicon-expand:before{content:\"\\e158\"}.glyphicon-collapse-down:before{content:\"\\e159\"}.glyphicon-collapse-up:before{content:\"\\e160\"}.glyphicon-log-in:before{content:\"\\e161\"}.glyphicon-flash:before{content:\"\\e162\"}.glyphicon-log-out:before{content:\"\\e163\"}.glyphicon-new-window:before{content:\"\\e164\"}.glyphicon-record:before{content:\"\\e165\"}.glyphicon-save:before{content:\"\\e166\"}.glyphicon-open:before{content:\"\\e167\"}.glyphicon-saved:before{content:\"\\e168\"}.glyphicon-import:before{content:\"\\e169\"}.glyphicon-export:before{content:\"\\e170\"}.glyphicon-send:before{content:\"\\e171\"}.glyphicon-floppy-disk:before{content:\"\\e172\"}.glyphicon-floppy-saved:before{content:\"\\e173\"}.glyphicon-floppy-remove:before{content:\"\\e174\"}.glyphicon-floppy-save:before{content:\"\\e175\"}.glyphicon-floppy-open:before{content:\"\\e176\"}.glyphicon-credit-card:before{content:\"\\e177\"}.glyphicon-transfer:before{content:\"\\e178\"}.glyphicon-cutlery:before{content:\"\\e179\"}.glyphicon-header:before{content:\"\\e180\"}.glyphicon-compressed:before{content:\"\\e181\"}.glyphicon-earphone:before{content:\"\\e182\"}.glyphicon-phone-alt:before{content:\"\\e183\"}.glyphicon-tower:before{content:\"\\e184\"}.glyphicon-stats:before{content:\"\\e185\"}.glyphicon-sd-video:before{content:\"\\e186\"}.glyphicon-hd-video:before{content:\"\\e187\"}.glyphicon-subtitles:before{content:\"\\e188\"}.glyphicon-sound-stereo:before{content:\"\\e189\"}.glyphicon-sound-dolby:before{content:\"\\e190\"}.glyphicon-sound-5-1:before{content:\"\\e191\"}.glyphicon-sound-6-1:before{content:\"\\e192\"}.glyphicon-sound-7-1:before{content:\"\\e193\"}.glyphicon-copyright-mark:before{content:\"\\e194\"}.glyphicon-registration-mark:before{content:\"\\e195\"}.glyphicon-cloud-download:before{content:\"\\e197\"}.glyphicon-cloud-upload:before{content:\"\\e198\"}.glyphicon-tree-conifer:before{content:\"\\e199\"}.glyphicon-tree-deciduous:before{content:\"\\e200\"}*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}*:before,*:after{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}html{font-size:10px;-webkit-tap-highlight-color:rgba(0,0,0,0)}body{font-family:\"Source Sans Pro\",Calibri,Candara,Arial,sans-serif;font-size:15px;line-height:1.42857143;color:#333333;background-color:#ffffff}input,button,select,textarea{font-family:inherit;font-size:inherit;line-height:inherit}a{color:#2780e3;text-decoration:none}a:hover,a:focus{color:#165ba8;text-decoration:underline}a:focus{outline:thin dotted;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}figure{margin:0}img{vertical-align:middle}.img-responsive,.thumbnail>img,.thumbnail a>img,.carousel-inner>.item>img,.carousel-inner>.item>a>img{display:block;width:100% \\9;max-width:100%;height:auto}.img-rounded{border-radius:0}.img-thumbnail{padding:4px;line-height:1.42857143;background-color:#ffffff;border:1px solid #dddddd;border-radius:0;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;display:inline-block;width:100% \\9;max-width:100%;height:auto}.img-circle{border-radius:50%}hr{margin-top:21px;margin-bottom:21px;border:0;border-top:1px solid #e6e6e6}.sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}h1,h2,h3,h4,h5,h6,.h1,.h2,.h3,.h4,.h5,.h6{font-family:\"Source Sans Pro\",Calibri,Candara,Arial,sans-serif;font-weight:300;line-height:1.1;color:inherit}h1 small,h2 small,h3 small,h4 small,h5 small,h6 small,.h1 small,.h2 small,.h3 small,.h4 small,.h5 small,.h6 small,h1 .small,h2 .small,h3 .small,h4 .small,h5 .small,h6 .small,.h1 .small,.h2 .small,.h3 .small,.h4 .small,.h5 .small,.h6 .small{font-weight:normal;line-height:1;color:#999999}h1,.h1,h2,.h2,h3,.h3{margin-top:21px;margin-bottom:10.5px}h1 small,.h1 small,h2 small,.h2 small,h3 small,.h3 small,h1 .small,.h1 .small,h2 .small,.h2 .small,h3 .small,.h3 .small{font-size:65%}h4,.h4,h5,.h5,h6,.h6{margin-top:10.5px;margin-bottom:10.5px}h4 small,.h4 small,h5 small,.h5 small,h6 small,.h6 small,h4 .small,.h4 .small,h5 .small,.h5 .small,h6 .small,.h6 .small{font-size:75%}h1,.h1{font-size:39px}h2,.h2{font-size:32px}h3,.h3{font-size:26px}h4,.h4{font-size:19px}h5,.h5{font-size:15px}h6,.h6{font-size:13px}p{margin:0 0 10.5px}.lead{margin-bottom:21px;font-size:17px;font-weight:300;line-height:1.4}@media (min-width:768px){.lead{font-size:22.5px}}small,.small{font-size:86%}cite{font-style:normal}mark,.mark{background-color:#ff7518;padding:.2em}.text-left{text-align:left}.text-right{text-align:right}.text-center{text-align:center}.text-justify{text-align:justify}.text-nowrap{white-space:nowrap}.text-lowercase{text-transform:lowercase}.text-uppercase{text-transform:uppercase}.text-capitalize{text-transform:capitalize}.text-muted{color:#999999}.text-primary{color:#2780e3}a.text-primary:hover{color:#1967be}.text-success{color:#ffffff}a.text-success:hover{color:#e6e6e6}.text-info{color:#ffffff}a.text-info:hover{color:#e6e6e6}.text-warning{color:#ffffff}a.text-warning:hover{color:#e6e6e6}.text-danger{color:#ffffff}a.text-danger:hover{color:#e6e6e6}.bg-primary{color:#fff;background-color:#2780e3}a.bg-primary:hover{background-color:#1967be}.bg-success{background-color:#3fb618}a.bg-success:hover{background-color:#2f8912}.bg-info{background-color:#9954bb}a.bg-info:hover{background-color:#7e3f9d}.bg-warning{background-color:#ff7518}a.bg-warning:hover{background-color:#e45c00}.bg-danger{background-color:#ff0039}a.bg-danger:hover{background-color:#cc002e}.page-header{padding-bottom:9.5px;margin:42px 0 21px;border-bottom:1px solid #e6e6e6}ul,ol{margin-top:0;margin-bottom:10.5px}ul ul,ol ul,ul ol,ol ol{margin-bottom:0}.list-unstyled{padding-left:0;list-style:none}.list-inline{padding-left:0;list-style:none;margin-left:-5px}.list-inline>li{display:inline-block;padding-left:5px;padding-right:5px}dl{margin-top:0;margin-bottom:21px}dt,dd{line-height:1.42857143}dt{font-weight:bold}dd{margin-left:0}@media (min-width:768px){.dl-horizontal dt{float:left;width:160px;clear:left;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dl-horizontal dd{margin-left:180px}}abbr[title],abbr[data-original-title]{cursor:help;border-bottom:1px dotted #999999}.initialism{font-size:90%;text-transform:uppercase}blockquote{padding:10.5px 21px;margin:0 0 21px;font-size:18.75px;border-left:5px solid #e6e6e6}blockquote p:last-child,blockquote ul:last-child,blockquote ol:last-child{margin-bottom:0}blockquote footer,blockquote small,blockquote .small{display:block;font-size:80%;line-height:1.42857143;color:#999999}blockquote footer:before,blockquote small:before,blockquote .small:before{content:'\\2014 \\00A0'}.blockquote-reverse,blockquote.pull-right{padding-right:15px;padding-left:0;border-right:5px solid #e6e6e6;border-left:0;text-align:right}.blockquote-reverse footer:before,blockquote.pull-right footer:before,.blockquote-reverse small:before,blockquote.pull-right small:before,.blockquote-reverse .small:before,blockquote.pull-right .small:before{content:''}.blockquote-reverse footer:after,blockquote.pull-right footer:after,.blockquote-reverse small:after,blockquote.pull-right small:after,.blockquote-reverse .small:after,blockquote.pull-right .small:after{content:'\\00A0 \\2014'}blockquote:before,blockquote:after{content:\"\"}address{margin-bottom:21px;font-style:normal;line-height:1.42857143}code,kbd,pre,samp{font-family:Menlo,Monaco,Consolas,\"Courier New\",monospace}code{padding:2px 4px;font-size:90%;color:#c7254e;background-color:#f9f2f4;border-radius:0}kbd{padding:2px 4px;font-size:90%;color:#ffffff;background-color:#333333;border-radius:0;box-shadow:inset 0 -1px 0 rgba(0,0,0,0.25)}kbd kbd{padding:0;font-size:100%;box-shadow:none}pre{display:block;padding:10px;margin:0 0 10.5px;font-size:14px;line-height:1.42857143;word-break:break-all;word-wrap:break-word;color:#333333;background-color:#f5f5f5;border:1px solid #cccccc;border-radius:0}pre code{padding:0;font-size:inherit;color:inherit;white-space:pre-wrap;background-color:transparent;border-radius:0}.pre-scrollable{max-height:340px;overflow-y:scroll}.container{margin-right:auto;margin-left:auto;padding-left:15px;padding-right:15px}@media (min-width:768px){.container{width:750px}}@media (min-width:992px){.container{width:970px}}@media (min-width:1200px){.container{width:1170px}}.container-fluid{margin-right:auto;margin-left:auto;padding-left:15px;padding-right:15px}.row{margin-left:-15px;margin-right:-15px}.col-xs-1,.col-sm-1,.col-md-1,.col-lg-1,.col-xs-2,.col-sm-2,.col-md-2,.col-lg-2,.col-xs-3,.col-sm-3,.col-md-3,.col-lg-3,.col-xs-4,.col-sm-4,.col-md-4,.col-lg-4,.col-xs-5,.col-sm-5,.col-md-5,.col-lg-5,.col-xs-6,.col-sm-6,.col-md-6,.col-lg-6,.col-xs-7,.col-sm-7,.col-md-7,.col-lg-7,.col-xs-8,.col-sm-8,.col-md-8,.col-lg-8,.col-xs-9,.col-sm-9,.col-md-9,.col-lg-9,.col-xs-10,.col-sm-10,.col-md-10,.col-lg-10,.col-xs-11,.col-sm-11,.col-md-11,.col-lg-11,.col-xs-12,.col-sm-12,.col-md-12,.col-lg-12{position:relative;min-height:1px;padding-left:15px;padding-right:15px}.col-xs-1,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-10,.col-xs-11,.col-xs-12{float:left}.col-xs-12{width:100%}.col-xs-11{width:91.66666667%}.col-xs-10{width:83.33333333%}.col-xs-9{width:75%}.col-xs-8{width:66.66666667%}.col-xs-7{width:58.33333333%}.col-xs-6{width:50%}.col-xs-5{width:41.66666667%}.col-xs-4{width:33.33333333%}.col-xs-3{width:25%}.col-xs-2{width:16.66666667%}.col-xs-1{width:8.33333333%}.col-xs-pull-12{right:100%}.col-xs-pull-11{right:91.66666667%}.col-xs-pull-10{right:83.33333333%}.col-xs-pull-9{right:75%}.col-xs-pull-8{right:66.66666667%}.col-xs-pull-7{right:58.33333333%}.col-xs-pull-6{right:50%}.col-xs-pull-5{right:41.66666667%}.col-xs-pull-4{right:33.33333333%}.col-xs-pull-3{right:25%}.col-xs-pull-2{right:16.66666667%}.col-xs-pull-1{right:8.33333333%}.col-xs-pull-0{right:auto}.col-xs-push-12{left:100%}.col-xs-push-11{left:91.66666667%}.col-xs-push-10{left:83.33333333%}.col-xs-push-9{left:75%}.col-xs-push-8{left:66.66666667%}.col-xs-push-7{left:58.33333333%}.col-xs-push-6{left:50%}.col-xs-push-5{left:41.66666667%}.col-xs-push-4{left:33.33333333%}.col-xs-push-3{left:25%}.col-xs-push-2{left:16.66666667%}.col-xs-push-1{left:8.33333333%}.col-xs-push-0{left:auto}.col-xs-offset-12{margin-left:100%}.col-xs-offset-11{margin-left:91.66666667%}.col-xs-offset-10{margin-left:83.33333333%}.col-xs-offset-9{margin-left:75%}.col-xs-offset-8{margin-left:66.66666667%}.col-xs-offset-7{margin-left:58.33333333%}.col-xs-offset-6{margin-left:50%}.col-xs-offset-5{margin-left:41.66666667%}.col-xs-offset-4{margin-left:33.33333333%}.col-xs-offset-3{margin-left:25%}.col-xs-offset-2{margin-left:16.66666667%}.col-xs-offset-1{margin-left:8.33333333%}.col-xs-offset-0{margin-left:0%}@media (min-width:768px){.col-sm-1,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-sm-10,.col-sm-11,.col-sm-12{float:left}.col-sm-12{width:100%}.col-sm-11{width:91.66666667%}.col-sm-10{width:83.33333333%}.col-sm-9{width:75%}.col-sm-8{width:66.66666667%}.col-sm-7{width:58.33333333%}.col-sm-6{width:50%}.col-sm-5{width:41.66666667%}.col-sm-4{width:33.33333333%}.col-sm-3{width:25%}.col-sm-2{width:16.66666667%}.col-sm-1{width:8.33333333%}.col-sm-pull-12{right:100%}.col-sm-pull-11{right:91.66666667%}.col-sm-pull-10{right:83.33333333%}.col-sm-pull-9{right:75%}.col-sm-pull-8{right:66.66666667%}.col-sm-pull-7{right:58.33333333%}.col-sm-pull-6{right:50%}.col-sm-pull-5{right:41.66666667%}.col-sm-pull-4{right:33.33333333%}.col-sm-pull-3{right:25%}.col-sm-pull-2{right:16.66666667%}.col-sm-pull-1{right:8.33333333%}.col-sm-pull-0{right:auto}.col-sm-push-12{left:100%}.col-sm-push-11{left:91.66666667%}.col-sm-push-10{left:83.33333333%}.col-sm-push-9{left:75%}.col-sm-push-8{left:66.66666667%}.col-sm-push-7{left:58.33333333%}.col-sm-push-6{left:50%}.col-sm-push-5{left:41.66666667%}.col-sm-push-4{left:33.33333333%}.col-sm-push-3{left:25%}.col-sm-push-2{left:16.66666667%}.col-sm-push-1{left:8.33333333%}.col-sm-push-0{left:auto}.col-sm-offset-12{margin-left:100%}.col-sm-offset-11{margin-left:91.66666667%}.col-sm-offset-10{margin-left:83.33333333%}.col-sm-offset-9{margin-left:75%}.col-sm-offset-8{margin-left:66.66666667%}.col-sm-offset-7{margin-left:58.33333333%}.col-sm-offset-6{margin-left:50%}.col-sm-offset-5{margin-left:41.66666667%}.col-sm-offset-4{margin-left:33.33333333%}.col-sm-offset-3{margin-left:25%}.col-sm-offset-2{margin-left:16.66666667%}.col-sm-offset-1{margin-left:8.33333333%}.col-sm-offset-0{margin-left:0%}}@media (min-width:992px){.col-md-1,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-10,.col-md-11,.col-md-12{float:left}.col-md-12{width:100%}.col-md-11{width:91.66666667%}.col-md-10{width:83.33333333%}.col-md-9{width:75%}.col-md-8{width:66.66666667%}.col-md-7{width:58.33333333%}.col-md-6{width:50%}.col-md-5{width:41.66666667%}.col-md-4{width:33.33333333%}.col-md-3{width:25%}.col-md-2{width:16.66666667%}.col-md-1{width:8.33333333%}.col-md-pull-12{right:100%}.col-md-pull-11{right:91.66666667%}.col-md-pull-10{right:83.33333333%}.col-md-pull-9{right:75%}.col-md-pull-8{right:66.66666667%}.col-md-pull-7{right:58.33333333%}.col-md-pull-6{right:50%}.col-md-pull-5{right:41.66666667%}.col-md-pull-4{right:33.33333333%}.col-md-pull-3{right:25%}.col-md-pull-2{right:16.66666667%}.col-md-pull-1{right:8.33333333%}.col-md-pull-0{right:auto}.col-md-push-12{left:100%}.col-md-push-11{left:91.66666667%}.col-md-push-10{left:83.33333333%}.col-md-push-9{left:75%}.col-md-push-8{left:66.66666667%}.col-md-push-7{left:58.33333333%}.col-md-push-6{left:50%}.col-md-push-5{left:41.66666667%}.col-md-push-4{left:33.33333333%}.col-md-push-3{left:25%}.col-md-push-2{left:16.66666667%}.col-md-push-1{left:8.33333333%}.col-md-push-0{left:auto}.col-md-offset-12{margin-left:100%}.col-md-offset-11{margin-left:91.66666667%}.col-md-offset-10{margin-left:83.33333333%}.col-md-offset-9{margin-left:75%}.col-md-offset-8{margin-left:66.66666667%}.col-md-offset-7{margin-left:58.33333333%}.col-md-offset-6{margin-left:50%}.col-md-offset-5{margin-left:41.66666667%}.col-md-offset-4{margin-left:33.33333333%}.col-md-offset-3{margin-left:25%}.col-md-offset-2{margin-left:16.66666667%}.col-md-offset-1{margin-left:8.33333333%}.col-md-offset-0{margin-left:0%}}@media (min-width:1200px){.col-lg-1,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-lg-10,.col-lg-11,.col-lg-12{float:left}.col-lg-12{width:100%}.col-lg-11{width:91.66666667%}.col-lg-10{width:83.33333333%}.col-lg-9{width:75%}.col-lg-8{width:66.66666667%}.col-lg-7{width:58.33333333%}.col-lg-6{width:50%}.col-lg-5{width:41.66666667%}.col-lg-4{width:33.33333333%}.col-lg-3{width:25%}.col-lg-2{width:16.66666667%}.col-lg-1{width:8.33333333%}.col-lg-pull-12{right:100%}.col-lg-pull-11{right:91.66666667%}.col-lg-pull-10{right:83.33333333%}.col-lg-pull-9{right:75%}.col-lg-pull-8{right:66.66666667%}.col-lg-pull-7{right:58.33333333%}.col-lg-pull-6{right:50%}.col-lg-pull-5{right:41.66666667%}.col-lg-pull-4{right:33.33333333%}.col-lg-pull-3{right:25%}.col-lg-pull-2{right:16.66666667%}.col-lg-pull-1{right:8.33333333%}.col-lg-pull-0{right:auto}.col-lg-push-12{left:100%}.col-lg-push-11{left:91.66666667%}.col-lg-push-10{left:83.33333333%}.col-lg-push-9{left:75%}.col-lg-push-8{left:66.66666667%}.col-lg-push-7{left:58.33333333%}.col-lg-push-6{left:50%}.col-lg-push-5{left:41.66666667%}.col-lg-push-4{left:33.33333333%}.col-lg-push-3{left:25%}.col-lg-push-2{left:16.66666667%}.col-lg-push-1{left:8.33333333%}.col-lg-push-0{left:auto}.col-lg-offset-12{margin-left:100%}.col-lg-offset-11{margin-left:91.66666667%}.col-lg-offset-10{margin-left:83.33333333%}.col-lg-offset-9{margin-left:75%}.col-lg-offset-8{margin-left:66.66666667%}.col-lg-offset-7{margin-left:58.33333333%}.col-lg-offset-6{margin-left:50%}.col-lg-offset-5{margin-left:41.66666667%}.col-lg-offset-4{margin-left:33.33333333%}.col-lg-offset-3{margin-left:25%}.col-lg-offset-2{margin-left:16.66666667%}.col-lg-offset-1{margin-left:8.33333333%}.col-lg-offset-0{margin-left:0%}}table{background-color:transparent}th{text-align:left}.table{width:100%;max-width:100%;margin-bottom:21px}.table>thead>tr>th,.table>tbody>tr>th,.table>tfoot>tr>th,.table>thead>tr>td,.table>tbody>tr>td,.table>tfoot>tr>td{padding:8px;line-height:1.42857143;vertical-align:top;border-top:1px solid #dddddd}.table>thead>tr>th{vertical-align:bottom;border-bottom:2px solid #dddddd}.table>caption+thead>tr:first-child>th,.table>colgroup+thead>tr:first-child>th,.table>thead:first-child>tr:first-child>th,.table>caption+thead>tr:first-child>td,.table>colgroup+thead>tr:first-child>td,.table>thead:first-child>tr:first-child>td{border-top:0}.table>tbody+tbody{border-top:2px solid #dddddd}.table .table{background-color:#ffffff}.table-condensed>thead>tr>th,.table-condensed>tbody>tr>th,.table-condensed>tfoot>tr>th,.table-condensed>thead>tr>td,.table-condensed>tbody>tr>td,.table-condensed>tfoot>tr>td{padding:5px}.table-bordered{border:1px solid #dddddd}.table-bordered>thead>tr>th,.table-bordered>tbody>tr>th,.table-bordered>tfoot>tr>th,.table-bordered>thead>tr>td,.table-bordered>tbody>tr>td,.table-bordered>tfoot>tr>td{border:1px solid #dddddd}.table-bordered>thead>tr>th,.table-bordered>thead>tr>td{border-bottom-width:2px}.table-striped>tbody>tr:nth-child(odd)>td,.table-striped>tbody>tr:nth-child(odd)>th{background-color:#f9f9f9}.table-hover>tbody>tr:hover>td,.table-hover>tbody>tr:hover>th{background-color:#f5f5f5}table col[class*=\"col-\"]{position:static;float:none;display:table-column}table td[class*=\"col-\"],table th[class*=\"col-\"]{position:static;float:none;display:table-cell}.table>thead>tr>td.active,.table>tbody>tr>td.active,.table>tfoot>tr>td.active,.table>thead>tr>th.active,.table>tbody>tr>th.active,.table>tfoot>tr>th.active,.table>thead>tr.active>td,.table>tbody>tr.active>td,.table>tfoot>tr.active>td,.table>thead>tr.active>th,.table>tbody>tr.active>th,.table>tfoot>tr.active>th{background-color:#f5f5f5}.table-hover>tbody>tr>td.active:hover,.table-hover>tbody>tr>th.active:hover,.table-hover>tbody>tr.active:hover>td,.table-hover>tbody>tr:hover>.active,.table-hover>tbody>tr.active:hover>th{background-color:#e8e8e8}.table>thead>tr>td.success,.table>tbody>tr>td.success,.table>tfoot>tr>td.success,.table>thead>tr>th.success,.table>tbody>tr>th.success,.table>tfoot>tr>th.success,.table>thead>tr.success>td,.table>tbody>tr.success>td,.table>tfoot>tr.success>td,.table>thead>tr.success>th,.table>tbody>tr.success>th,.table>tfoot>tr.success>th{background-color:#3fb618}.table-hover>tbody>tr>td.success:hover,.table-hover>tbody>tr>th.success:hover,.table-hover>tbody>tr.success:hover>td,.table-hover>tbody>tr:hover>.success,.table-hover>tbody>tr.success:hover>th{background-color:#379f15}.table>thead>tr>td.info,.table>tbody>tr>td.info,.table>tfoot>tr>td.info,.table>thead>tr>th.info,.table>tbody>tr>th.info,.table>tfoot>tr>th.info,.table>thead>tr.info>td,.table>tbody>tr.info>td,.table>tfoot>tr.info>td,.table>thead>tr.info>th,.table>tbody>tr.info>th,.table>tfoot>tr.info>th{background-color:#9954bb}.table-hover>tbody>tr>td.info:hover,.table-hover>tbody>tr>th.info:hover,.table-hover>tbody>tr.info:hover>td,.table-hover>tbody>tr:hover>.info,.table-hover>tbody>tr.info:hover>th{background-color:#8d46b0}.table>thead>tr>td.warning,.table>tbody>tr>td.warning,.table>tfoot>tr>td.warning,.table>thead>tr>th.warning,.table>tbody>tr>th.warning,.table>tfoot>tr>th.warning,.table>thead>tr.warning>td,.table>tbody>tr.warning>td,.table>tfoot>tr.warning>td,.table>thead>tr.warning>th,.table>tbody>tr.warning>th,.table>tfoot>tr.warning>th{background-color:#ff7518}.table-hover>tbody>tr>td.warning:hover,.table-hover>tbody>tr>th.warning:hover,.table-hover>tbody>tr.warning:hover>td,.table-hover>tbody>tr:hover>.warning,.table-hover>tbody>tr.warning:hover>th{background-color:#fe6600}.table>thead>tr>td.danger,.table>tbody>tr>td.danger,.table>tfoot>tr>td.danger,.table>thead>tr>th.danger,.table>tbody>tr>th.danger,.table>tfoot>tr>th.danger,.table>thead>tr.danger>td,.table>tbody>tr.danger>td,.table>tfoot>tr.danger>td,.table>thead>tr.danger>th,.table>tbody>tr.danger>th,.table>tfoot>tr.danger>th{background-color:#ff0039}.table-hover>tbody>tr>td.danger:hover,.table-hover>tbody>tr>th.danger:hover,.table-hover>tbody>tr.danger:hover>td,.table-hover>tbody>tr:hover>.danger,.table-hover>tbody>tr.danger:hover>th{background-color:#e60033}@media screen and (max-width:767px){.table-responsive{width:100%;margin-bottom:15.75px;overflow-y:hidden;overflow-x:auto;-ms-overflow-style:-ms-autohiding-scrollbar;border:1px solid #dddddd;-webkit-overflow-scrolling:touch}.table-responsive>.table{margin-bottom:0}.table-responsive>.table>thead>tr>th,.table-responsive>.table>tbody>tr>th,.table-responsive>.table>tfoot>tr>th,.table-responsive>.table>thead>tr>td,.table-responsive>.table>tbody>tr>td,.table-responsive>.table>tfoot>tr>td{white-space:nowrap}.table-responsive>.table-bordered{border:0}.table-responsive>.table-bordered>thead>tr>th:first-child,.table-responsive>.table-bordered>tbody>tr>th:first-child,.table-responsive>.table-bordered>tfoot>tr>th:first-child,.table-responsive>.table-bordered>thead>tr>td:first-child,.table-responsive>.table-bordered>tbody>tr>td:first-child,.table-responsive>.table-bordered>tfoot>tr>td:first-child{border-left:0}.table-responsive>.table-bordered>thead>tr>th:last-child,.table-responsive>.table-bordered>tbody>tr>th:last-child,.table-responsive>.table-bordered>tfoot>tr>th:last-child,.table-responsive>.table-bordered>thead>tr>td:last-child,.table-responsive>.table-bordered>tbody>tr>td:last-child,.table-responsive>.table-bordered>tfoot>tr>td:last-child{border-right:0}.table-responsive>.table-bordered>tbody>tr:last-child>th,.table-responsive>.table-bordered>tfoot>tr:last-child>th,.table-responsive>.table-bordered>tbody>tr:last-child>td,.table-responsive>.table-bordered>tfoot>tr:last-child>td{border-bottom:0}}fieldset{padding:0;margin:0;border:0;min-width:0}legend{display:block;width:100%;padding:0;margin-bottom:21px;font-size:22.5px;line-height:inherit;color:#333333;border:0;border-bottom:1px solid #e5e5e5}label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:bold}input[type=\"search\"]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}input[type=\"radio\"],input[type=\"checkbox\"]{margin:4px 0 0;margin-top:1px \\9;line-height:normal}input[type=\"file\"]{display:block}input[type=\"range\"]{display:block;width:100%}select[multiple],select[size]{height:auto}input[type=\"file\"]:focus,input[type=\"radio\"]:focus,input[type=\"checkbox\"]:focus{outline:thin dotted;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}output{display:block;padding-top:11px;font-size:15px;line-height:1.42857143;color:#333333}.form-control{display:block;width:100%;height:43px;padding:10px 18px;font-size:15px;line-height:1.42857143;color:#333333;background-color:#ffffff;background-image:none;border:1px solid #cccccc;border-radius:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-webkit-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}.form-control:focus{border-color:#66afe9;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(102,175,233,0.6);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(102,175,233,0.6)}.form-control::-moz-placeholder{color:#999999;opacity:1}.form-control:-ms-input-placeholder{color:#999999}.form-control::-webkit-input-placeholder{color:#999999}.form-control[disabled],.form-control[readonly],fieldset[disabled] .form-control{cursor:not-allowed;background-color:#e6e6e6;opacity:1}textarea.form-control{height:auto}input[type=\"search\"]{-webkit-appearance:none}input[type=\"date\"],input[type=\"time\"],input[type=\"datetime-local\"],input[type=\"month\"]{line-height:43px;line-height:1.42857143 \\0}input[type=\"date\"].input-sm,input[type=\"time\"].input-sm,input[type=\"datetime-local\"].input-sm,input[type=\"month\"].input-sm{line-height:31px}input[type=\"date\"].input-lg,input[type=\"time\"].input-lg,input[type=\"datetime-local\"].input-lg,input[type=\"month\"].input-lg{line-height:64px}.form-group{margin-bottom:15px}.radio,.checkbox{position:relative;display:block;min-height:21px;margin-top:10px;margin-bottom:10px}.radio label,.checkbox label{padding-left:20px;margin-bottom:0;font-weight:normal;cursor:pointer}.radio input[type=\"radio\"],.radio-inline input[type=\"radio\"],.checkbox input[type=\"checkbox\"],.checkbox-inline input[type=\"checkbox\"]{position:absolute;margin-left:-20px;margin-top:4px \\9}.radio+.radio,.checkbox+.checkbox{margin-top:-5px}.radio-inline,.checkbox-inline{display:inline-block;padding-left:20px;margin-bottom:0;vertical-align:middle;font-weight:normal;cursor:pointer}.radio-inline+.radio-inline,.checkbox-inline+.checkbox-inline{margin-top:0;margin-left:10px}input[type=\"radio\"][disabled],input[type=\"checkbox\"][disabled],input[type=\"radio\"].disabled,input[type=\"checkbox\"].disabled,fieldset[disabled] input[type=\"radio\"],fieldset[disabled] input[type=\"checkbox\"]{cursor:not-allowed}.radio-inline.disabled,.checkbox-inline.disabled,fieldset[disabled] .radio-inline,fieldset[disabled] .checkbox-inline{cursor:not-allowed}.radio.disabled label,.checkbox.disabled label,fieldset[disabled] .radio label,fieldset[disabled] .checkbox label{cursor:not-allowed}.form-control-static{padding-top:11px;padding-bottom:11px;margin-bottom:0}.form-control-static.input-lg,.form-control-static.input-sm{padding-left:0;padding-right:0}.input-sm,.form-horizontal .form-group-sm .form-control{height:31px;padding:5px 10px;font-size:13px;line-height:1.5;border-radius:0}select.input-sm{height:31px;line-height:31px}textarea.input-sm,select[multiple].input-sm{height:auto}.input-lg,.form-horizontal .form-group-lg .form-control{height:64px;padding:18px 30px;font-size:19px;line-height:1.33;border-radius:0}select.input-lg{height:64px;line-height:64px}textarea.input-lg,select[multiple].input-lg{height:auto}.has-feedback{position:relative}.has-feedback .form-control{padding-right:53.75px}.form-control-feedback{position:absolute;top:26px;right:0;z-index:2;display:block;width:43px;height:43px;line-height:43px;text-align:center}.input-lg+.form-control-feedback{width:64px;height:64px;line-height:64px}.input-sm+.form-control-feedback{width:31px;height:31px;line-height:31px}.has-success .help-block,.has-success .control-label,.has-success .radio,.has-success .checkbox,.has-success .radio-inline,.has-success .checkbox-inline{color:#ffffff}.has-success .form-control{border-color:#ffffff;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075)}.has-success .form-control:focus{border-color:#e6e6e6;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff}.has-success .input-group-addon{color:#ffffff;border-color:#ffffff;background-color:#3fb618}.has-success .form-control-feedback{color:#ffffff}.has-warning .help-block,.has-warning .control-label,.has-warning .radio,.has-warning .checkbox,.has-warning .radio-inline,.has-warning .checkbox-inline{color:#ffffff}.has-warning .form-control{border-color:#ffffff;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075)}.has-warning .form-control:focus{border-color:#e6e6e6;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff}.has-warning .input-group-addon{color:#ffffff;border-color:#ffffff;background-color:#ff7518}.has-warning .form-control-feedback{color:#ffffff}.has-error .help-block,.has-error .control-label,.has-error .radio,.has-error .checkbox,.has-error .radio-inline,.has-error .checkbox-inline{color:#ffffff}.has-error .form-control{border-color:#ffffff;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075)}.has-error .form-control:focus{border-color:#e6e6e6;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #fff}.has-error .input-group-addon{color:#ffffff;border-color:#ffffff;background-color:#ff0039}.has-error .form-control-feedback{color:#ffffff}.has-feedback label.sr-only~.form-control-feedback{top:0}.help-block{display:block;margin-top:5px;margin-bottom:10px;color:#737373}@media (min-width:768px){.form-inline .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.form-inline .form-control{display:inline-block;width:auto;vertical-align:middle}.form-inline .input-group{display:inline-table;vertical-align:middle}.form-inline .input-group .input-group-addon,.form-inline .input-group .input-group-btn,.form-inline .input-group .form-control{width:auto}.form-inline .input-group>.form-control{width:100%}.form-inline .control-label{margin-bottom:0;vertical-align:middle}.form-inline .radio,.form-inline .checkbox{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.form-inline .radio label,.form-inline .checkbox label{padding-left:0}.form-inline .radio input[type=\"radio\"],.form-inline .checkbox input[type=\"checkbox\"]{position:relative;margin-left:0}.form-inline .has-feedback .form-control-feedback{top:0}}.form-horizontal .radio,.form-horizontal .checkbox,.form-horizontal .radio-inline,.form-horizontal .checkbox-inline{margin-top:0;margin-bottom:0;padding-top:11px}.form-horizontal .radio,.form-horizontal .checkbox{min-height:32px}.form-horizontal .form-group{margin-left:-15px;margin-right:-15px}@media (min-width:768px){.form-horizontal .control-label{text-align:right;margin-bottom:0;padding-top:11px}}.form-horizontal .has-feedback .form-control-feedback{top:0;right:15px}@media (min-width:768px){.form-horizontal .form-group-lg .control-label{padding-top:24.94px}}@media (min-width:768px){.form-horizontal .form-group-sm .control-label{padding-top:6px}}.btn{display:inline-block;margin-bottom:0;font-weight:normal;text-align:center;vertical-align:middle;cursor:pointer;background-image:none;border:1px solid transparent;white-space:nowrap;padding:10px 18px;font-size:15px;line-height:1.42857143;border-radius:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.btn:focus,.btn:active:focus,.btn.active:focus{outline:thin dotted;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.btn:hover,.btn:focus{color:#ffffff;text-decoration:none}.btn:active,.btn.active{outline:0;background-image:none;-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,0.125);box-shadow:inset 0 3px 5px rgba(0,0,0,0.125)}.btn.disabled,.btn[disabled],fieldset[disabled] .btn{cursor:not-allowed;pointer-events:none;opacity:0.65;filter:alpha(opacity=65);-webkit-box-shadow:none;box-shadow:none}.btn-default{color:#ffffff;background-color:#222222;border-color:#222222}.btn-default:hover,.btn-default:focus,.btn-default:active,.btn-default.active,.open>.dropdown-toggle.btn-default{color:#ffffff;background-color:#090909;border-color:#040404}.btn-default:active,.btn-default.active,.open>.dropdown-toggle.btn-default{background-image:none}.btn-default.disabled,.btn-default[disabled],fieldset[disabled] .btn-default,.btn-default.disabled:hover,.btn-default[disabled]:hover,fieldset[disabled] .btn-default:hover,.btn-default.disabled:focus,.btn-default[disabled]:focus,fieldset[disabled] .btn-default:focus,.btn-default.disabled:active,.btn-default[disabled]:active,fieldset[disabled] .btn-default:active,.btn-default.disabled.active,.btn-default[disabled].active,fieldset[disabled] .btn-default.active{background-color:#222222;border-color:#222222}.btn-default .badge{color:#222222;background-color:#ffffff}.btn-primary{color:#ffffff;background-color:#2780e3;border-color:#2780e3}.btn-primary:hover,.btn-primary:focus,.btn-primary:active,.btn-primary.active,.open>.dropdown-toggle.btn-primary{color:#ffffff;background-color:#1967be;border-color:#1862b5}.btn-primary:active,.btn-primary.active,.open>.dropdown-toggle.btn-primary{background-image:none}.btn-primary.disabled,.btn-primary[disabled],fieldset[disabled] .btn-primary,.btn-primary.disabled:hover,.btn-primary[disabled]:hover,fieldset[disabled] .btn-primary:hover,.btn-primary.disabled:focus,.btn-primary[disabled]:focus,fieldset[disabled] .btn-primary:focus,.btn-primary.disabled:active,.btn-primary[disabled]:active,fieldset[disabled] .btn-primary:active,.btn-primary.disabled.active,.btn-primary[disabled].active,fieldset[disabled] .btn-primary.active{background-color:#2780e3;border-color:#2780e3}.btn-primary .badge{color:#2780e3;background-color:#ffffff}.btn-success{color:#ffffff;background-color:#3fb618;border-color:#3fb618}.btn-success:hover,.btn-success:focus,.btn-success:active,.btn-success.active,.open>.dropdown-toggle.btn-success{color:#ffffff;background-color:#2f8912;border-color:#2c8011}.btn-success:active,.btn-success.active,.open>.dropdown-toggle.btn-success{background-image:none}.btn-success.disabled,.btn-success[disabled],fieldset[disabled] .btn-success,.btn-success.disabled:hover,.btn-success[disabled]:hover,fieldset[disabled] .btn-success:hover,.btn-success.disabled:focus,.btn-success[disabled]:focus,fieldset[disabled] .btn-success:focus,.btn-success.disabled:active,.btn-success[disabled]:active,fieldset[disabled] .btn-success:active,.btn-success.disabled.active,.btn-success[disabled].active,fieldset[disabled] .btn-success.active{background-color:#3fb618;border-color:#3fb618}.btn-success .badge{color:#3fb618;background-color:#ffffff}.btn-info{color:#ffffff;background-color:#9954bb;border-color:#9954bb}.btn-info:hover,.btn-info:focus,.btn-info:active,.btn-info.active,.open>.dropdown-toggle.btn-info{color:#ffffff;background-color:#7e3f9d;border-color:#783c96}.btn-info:active,.btn-info.active,.open>.dropdown-toggle.btn-info{background-image:none}.btn-info.disabled,.btn-info[disabled],fieldset[disabled] .btn-info,.btn-info.disabled:hover,.btn-info[disabled]:hover,fieldset[disabled] .btn-info:hover,.btn-info.disabled:focus,.btn-info[disabled]:focus,fieldset[disabled] .btn-info:focus,.btn-info.disabled:active,.btn-info[disabled]:active,fieldset[disabled] .btn-info:active,.btn-info.disabled.active,.btn-info[disabled].active,fieldset[disabled] .btn-info.active{background-color:#9954bb;border-color:#9954bb}.btn-info .badge{color:#9954bb;background-color:#ffffff}.btn-warning{color:#ffffff;background-color:#ff7518;border-color:#ff7518}.btn-warning:hover,.btn-warning:focus,.btn-warning:active,.btn-warning.active,.open>.dropdown-toggle.btn-warning{color:#ffffff;background-color:#e45c00;border-color:#da5800}.btn-warning:active,.btn-warning.active,.open>.dropdown-toggle.btn-warning{background-image:none}.btn-warning.disabled,.btn-warning[disabled],fieldset[disabled] .btn-warning,.btn-warning.disabled:hover,.btn-warning[disabled]:hover,fieldset[disabled] .btn-warning:hover,.btn-warning.disabled:focus,.btn-warning[disabled]:focus,fieldset[disabled] .btn-warning:focus,.btn-warning.disabled:active,.btn-warning[disabled]:active,fieldset[disabled] .btn-warning:active,.btn-warning.disabled.active,.btn-warning[disabled].active,fieldset[disabled] .btn-warning.active{background-color:#ff7518;border-color:#ff7518}.btn-warning .badge{color:#ff7518;background-color:#ffffff}.btn-danger{color:#ffffff;background-color:#ff0039;border-color:#ff0039}.btn-danger:hover,.btn-danger:focus,.btn-danger:active,.btn-danger.active,.open>.dropdown-toggle.btn-danger{color:#ffffff;background-color:#cc002e;border-color:#c2002b}.btn-danger:active,.btn-danger.active,.open>.dropdown-toggle.btn-danger{background-image:none}.btn-danger.disabled,.btn-danger[disabled],fieldset[disabled] .btn-danger,.btn-danger.disabled:hover,.btn-danger[disabled]:hover,fieldset[disabled] .btn-danger:hover,.btn-danger.disabled:focus,.btn-danger[disabled]:focus,fieldset[disabled] .btn-danger:focus,.btn-danger.disabled:active,.btn-danger[disabled]:active,fieldset[disabled] .btn-danger:active,.btn-danger.disabled.active,.btn-danger[disabled].active,fieldset[disabled] .btn-danger.active{background-color:#ff0039;border-color:#ff0039}.btn-danger .badge{color:#ff0039;background-color:#ffffff}.btn-link{color:#2780e3;font-weight:normal;cursor:pointer;border-radius:0}.btn-link,.btn-link:active,.btn-link[disabled],fieldset[disabled] .btn-link{background-color:transparent;-webkit-box-shadow:none;box-shadow:none}.btn-link,.btn-link:hover,.btn-link:focus,.btn-link:active{border-color:transparent}.btn-link:hover,.btn-link:focus{color:#165ba8;text-decoration:underline;background-color:transparent}.btn-link[disabled]:hover,fieldset[disabled] .btn-link:hover,.btn-link[disabled]:focus,fieldset[disabled] .btn-link:focus{color:#999999;text-decoration:none}.btn-lg,.btn-group-lg>.btn{padding:18px 30px;font-size:19px;line-height:1.33;border-radius:0}.btn-sm,.btn-group-sm>.btn{padding:5px 10px;font-size:13px;line-height:1.5;border-radius:0}.btn-xs,.btn-group-xs>.btn{padding:1px 5px;font-size:13px;line-height:1.5;border-radius:0}.btn-block{display:block;width:100%}.btn-block+.btn-block{margin-top:5px}input[type=\"submit\"].btn-block,input[type=\"reset\"].btn-block,input[type=\"button\"].btn-block{width:100%}.fade{opacity:0;-webkit-transition:opacity 0.15s linear;-o-transition:opacity 0.15s linear;transition:opacity 0.15s linear}.fade.in{opacity:1}.collapse{display:none}.collapse.in{display:block}tr.collapse.in{display:table-row}tbody.collapse.in{display:table-row-group}.collapsing{position:relative;height:0;overflow:hidden;-webkit-transition:height 0.35s ease;-o-transition:height 0.35s ease;transition:height 0.35s ease}.caret{display:inline-block;width:0;height:0;margin-left:2px;vertical-align:middle;border-top:4px solid;border-right:4px solid transparent;border-left:4px solid transparent}.dropdown{position:relative}.dropdown-toggle:focus{outline:0}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:160px;padding:5px 0;margin:2px 0 0;list-style:none;font-size:15px;text-align:left;background-color:#ffffff;border:1px solid #cccccc;border:1px solid rgba(0,0,0,0.15);border-radius:0;-webkit-box-shadow:0 6px 12px rgba(0,0,0,0.175);box-shadow:0 6px 12px rgba(0,0,0,0.175);background-clip:padding-box}.dropdown-menu.pull-right{right:0;left:auto}.dropdown-menu .divider{height:1px;margin:9.5px 0;overflow:hidden;background-color:#e5e5e5}.dropdown-menu>li>a{display:block;padding:3px 20px;clear:both;font-weight:normal;line-height:1.42857143;color:#333333;white-space:nowrap}.dropdown-menu>li>a:hover,.dropdown-menu>li>a:focus{text-decoration:none;color:#ffffff;background-color:#2780e3}.dropdown-menu>.active>a,.dropdown-menu>.active>a:hover,.dropdown-menu>.active>a:focus{color:#ffffff;text-decoration:none;outline:0;background-color:#2780e3}.dropdown-menu>.disabled>a,.dropdown-menu>.disabled>a:hover,.dropdown-menu>.disabled>a:focus{color:#999999}.dropdown-menu>.disabled>a:hover,.dropdown-menu>.disabled>a:focus{text-decoration:none;background-color:transparent;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);cursor:not-allowed}.open>.dropdown-menu{display:block}.open>a{outline:0}.dropdown-menu-right{left:auto;right:0}.dropdown-menu-left{left:0;right:auto}.dropdown-header{display:block;padding:3px 20px;font-size:13px;line-height:1.42857143;color:#999999;white-space:nowrap}.dropdown-backdrop{position:fixed;left:0;right:0;bottom:0;top:0;z-index:990}.pull-right>.dropdown-menu{right:0;left:auto}.dropup .caret,.navbar-fixed-bottom .dropdown .caret{border-top:0;border-bottom:4px solid;content:\"\"}.dropup .dropdown-menu,.navbar-fixed-bottom .dropdown .dropdown-menu{top:auto;bottom:100%;margin-bottom:1px}@media (min-width:768px){.navbar-right .dropdown-menu{left:auto;right:0}.navbar-right .dropdown-menu-left{left:0;right:auto}}.btn-group,.btn-group-vertical{position:relative;display:inline-block;vertical-align:middle}.btn-group>.btn,.btn-group-vertical>.btn{position:relative;float:left}.btn-group>.btn:hover,.btn-group-vertical>.btn:hover,.btn-group>.btn:focus,.btn-group-vertical>.btn:focus,.btn-group>.btn:active,.btn-group-vertical>.btn:active,.btn-group>.btn.active,.btn-group-vertical>.btn.active{z-index:2}.btn-group>.btn:focus,.btn-group-vertical>.btn:focus{outline:0}.btn-group .btn+.btn,.btn-group .btn+.btn-group,.btn-group .btn-group+.btn,.btn-group .btn-group+.btn-group{margin-left:-1px}.btn-toolbar{margin-left:-5px}.btn-toolbar .btn-group,.btn-toolbar .input-group{float:left}.btn-toolbar>.btn,.btn-toolbar>.btn-group,.btn-toolbar>.input-group{margin-left:5px}.btn-group>.btn:not(:first-child):not(:last-child):not(.dropdown-toggle){border-radius:0}.btn-group>.btn:first-child{margin-left:0}.btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle){border-bottom-right-radius:0;border-top-right-radius:0}.btn-group>.btn:last-child:not(:first-child),.btn-group>.dropdown-toggle:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.btn-group>.btn-group{float:left}.btn-group>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group>.btn-group:first-child>.btn:last-child,.btn-group>.btn-group:first-child>.dropdown-toggle{border-bottom-right-radius:0;border-top-right-radius:0}.btn-group>.btn-group:last-child>.btn:first-child{border-bottom-left-radius:0;border-top-left-radius:0}.btn-group .dropdown-toggle:active,.btn-group.open .dropdown-toggle{outline:0}.btn-group>.btn+.dropdown-toggle{padding-left:8px;padding-right:8px}.btn-group>.btn-lg+.dropdown-toggle{padding-left:12px;padding-right:12px}.btn-group.open .dropdown-toggle{-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,0.125);box-shadow:inset 0 3px 5px rgba(0,0,0,0.125)}.btn-group.open .dropdown-toggle.btn-link{-webkit-box-shadow:none;box-shadow:none}.btn .caret{margin-left:0}.btn-lg .caret{border-width:5px 5px 0;border-bottom-width:0}.dropup .btn-lg .caret{border-width:0 5px 5px}.btn-group-vertical>.btn,.btn-group-vertical>.btn-group,.btn-group-vertical>.btn-group>.btn{display:block;float:none;width:100%;max-width:100%}.btn-group-vertical>.btn-group>.btn{float:none}.btn-group-vertical>.btn+.btn,.btn-group-vertical>.btn+.btn-group,.btn-group-vertical>.btn-group+.btn,.btn-group-vertical>.btn-group+.btn-group{margin-top:-1px;margin-left:0}.btn-group-vertical>.btn:not(:first-child):not(:last-child){border-radius:0}.btn-group-vertical>.btn:first-child:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn:last-child:not(:first-child){border-bottom-left-radius:0;border-top-right-radius:0;border-top-left-radius:0}.btn-group-vertical>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group-vertical>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group-vertical>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn-group:last-child:not(:first-child)>.btn:first-child{border-top-right-radius:0;border-top-left-radius:0}.btn-group-justified{display:table;width:100%;table-layout:fixed;border-collapse:separate}.btn-group-justified>.btn,.btn-group-justified>.btn-group{float:none;display:table-cell;width:1%}.btn-group-justified>.btn-group .btn{width:100%}.btn-group-justified>.btn-group .dropdown-menu{left:auto}[data-toggle=\"buttons\"]>.btn>input[type=\"radio\"],[data-toggle=\"buttons\"]>.btn>input[type=\"checkbox\"]{position:absolute;z-index:-1;opacity:0;filter:alpha(opacity=0)}.input-group{position:relative;display:table;border-collapse:separate}.input-group[class*=\"col-\"]{float:none;padding-left:0;padding-right:0}.input-group .form-control{position:relative;z-index:2;float:left;width:100%;margin-bottom:0}.input-group-lg>.form-control,.input-group-lg>.input-group-addon,.input-group-lg>.input-group-btn>.btn{height:64px;padding:18px 30px;font-size:19px;line-height:1.33;border-radius:0}select.input-group-lg>.form-control,select.input-group-lg>.input-group-addon,select.input-group-lg>.input-group-btn>.btn{height:64px;line-height:64px}textarea.input-group-lg>.form-control,textarea.input-group-lg>.input-group-addon,textarea.input-group-lg>.input-group-btn>.btn,select[multiple].input-group-lg>.form-control,select[multiple].input-group-lg>.input-group-addon,select[multiple].input-group-lg>.input-group-btn>.btn{height:auto}.input-group-sm>.form-control,.input-group-sm>.input-group-addon,.input-group-sm>.input-group-btn>.btn{height:31px;padding:5px 10px;font-size:13px;line-height:1.5;border-radius:0}select.input-group-sm>.form-control,select.input-group-sm>.input-group-addon,select.input-group-sm>.input-group-btn>.btn{height:31px;line-height:31px}textarea.input-group-sm>.form-control,textarea.input-group-sm>.input-group-addon,textarea.input-group-sm>.input-group-btn>.btn,select[multiple].input-group-sm>.form-control,select[multiple].input-group-sm>.input-group-addon,select[multiple].input-group-sm>.input-group-btn>.btn{height:auto}.input-group-addon,.input-group-btn,.input-group .form-control{display:table-cell}.input-group-addon:not(:first-child):not(:last-child),.input-group-btn:not(:first-child):not(:last-child),.input-group .form-control:not(:first-child):not(:last-child){border-radius:0}.input-group-addon,.input-group-btn{width:1%;white-space:nowrap;vertical-align:middle}.input-group-addon{padding:10px 18px;font-size:15px;font-weight:normal;line-height:1;color:#333333;text-align:center;background-color:#e6e6e6;border:1px solid #cccccc;border-radius:0}.input-group-addon.input-sm{padding:5px 10px;font-size:13px;border-radius:0}.input-group-addon.input-lg{padding:18px 30px;font-size:19px;border-radius:0}.input-group-addon input[type=\"radio\"],.input-group-addon input[type=\"checkbox\"]{margin-top:0}.input-group .form-control:first-child,.input-group-addon:first-child,.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group>.btn,.input-group-btn:first-child>.dropdown-toggle,.input-group-btn:last-child>.btn:not(:last-child):not(.dropdown-toggle),.input-group-btn:last-child>.btn-group:not(:last-child)>.btn{border-bottom-right-radius:0;border-top-right-radius:0}.input-group-addon:first-child{border-right:0}.input-group .form-control:last-child,.input-group-addon:last-child,.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group>.btn,.input-group-btn:last-child>.dropdown-toggle,.input-group-btn:first-child>.btn:not(:first-child),.input-group-btn:first-child>.btn-group:not(:first-child)>.btn{border-bottom-left-radius:0;border-top-left-radius:0}.input-group-addon:last-child{border-left:0}.input-group-btn{position:relative;font-size:0;white-space:nowrap}.input-group-btn>.btn{position:relative}.input-group-btn>.btn+.btn{margin-left:-1px}.input-group-btn>.btn:hover,.input-group-btn>.btn:focus,.input-group-btn>.btn:active{z-index:2}.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group{margin-right:-1px}.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group{margin-left:-1px}.nav{margin-bottom:0;padding-left:0;list-style:none}.nav>li{position:relative;display:block}.nav>li>a{position:relative;display:block;padding:10px 15px}.nav>li>a:hover,.nav>li>a:focus{text-decoration:none;background-color:#e6e6e6}.nav>li.disabled>a{color:#999999}.nav>li.disabled>a:hover,.nav>li.disabled>a:focus{color:#999999;text-decoration:none;background-color:transparent;cursor:not-allowed}.nav .open>a,.nav .open>a:hover,.nav .open>a:focus{background-color:#e6e6e6;border-color:#2780e3}.nav .nav-divider{height:1px;margin:9.5px 0;overflow:hidden;background-color:#e5e5e5}.nav>li>a>img{max-width:none}.nav-tabs{border-bottom:1px solid #dddddd}.nav-tabs>li{float:left;margin-bottom:-1px}.nav-tabs>li>a{margin-right:2px;line-height:1.42857143;border:1px solid transparent;border-radius:0 0 0 0}.nav-tabs>li>a:hover{border-color:#e6e6e6 #e6e6e6 #dddddd}.nav-tabs>li.active>a,.nav-tabs>li.active>a:hover,.nav-tabs>li.active>a:focus{color:#555555;background-color:#ffffff;border:1px solid #dddddd;border-bottom-color:transparent;cursor:default}.nav-tabs.nav-justified{width:100%;border-bottom:0}.nav-tabs.nav-justified>li{float:none}.nav-tabs.nav-justified>li>a{text-align:center;margin-bottom:5px}.nav-tabs.nav-justified>.dropdown .dropdown-menu{top:auto;left:auto}@media (min-width:768px){.nav-tabs.nav-justified>li{display:table-cell;width:1%}.nav-tabs.nav-justified>li>a{margin-bottom:0}}.nav-tabs.nav-justified>li>a{margin-right:0;border-radius:0}.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:hover,.nav-tabs.nav-justified>.active>a:focus{border:1px solid #dddddd}@media (min-width:768px){.nav-tabs.nav-justified>li>a{border-bottom:1px solid #dddddd;border-radius:0 0 0 0}.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:hover,.nav-tabs.nav-justified>.active>a:focus{border-bottom-color:#ffffff}}.nav-pills>li{float:left}.nav-pills>li>a{border-radius:0}.nav-pills>li+li{margin-left:2px}.nav-pills>li.active>a,.nav-pills>li.active>a:hover,.nav-pills>li.active>a:focus{color:#ffffff;background-color:#2780e3}.nav-stacked>li{float:none}.nav-stacked>li+li{margin-top:2px;margin-left:0}.nav-justified{width:100%}.nav-justified>li{float:none}.nav-justified>li>a{text-align:center;margin-bottom:5px}.nav-justified>.dropdown .dropdown-menu{top:auto;left:auto}@media (min-width:768px){.nav-justified>li{display:table-cell;width:1%}.nav-justified>li>a{margin-bottom:0}}.nav-tabs-justified{border-bottom:0}.nav-tabs-justified>li>a{margin-right:0;border-radius:0}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:hover,.nav-tabs-justified>.active>a:focus{border:1px solid #dddddd}@media (min-width:768px){.nav-tabs-justified>li>a{border-bottom:1px solid #dddddd;border-radius:0 0 0 0}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:hover,.nav-tabs-justified>.active>a:focus{border-bottom-color:#ffffff}}.tab-content>.tab-pane{display:none}.tab-content>.active{display:block}.nav-tabs .dropdown-menu{margin-top:-1px;border-top-right-radius:0;border-top-left-radius:0}.navbar{position:relative;min-height:50px;margin-bottom:21px;border:1px solid transparent}@media (min-width:768px){.navbar{border-radius:0}}@media (min-width:768px){.navbar-header{float:left}}.navbar-collapse{overflow-x:visible;padding-right:15px;padding-left:15px;border-top:1px solid transparent;box-shadow:inset 0 1px 0 rgba(255,255,255,0.1);-webkit-overflow-scrolling:touch}.navbar-collapse.in{overflow-y:auto}@media (min-width:768px){.navbar-collapse{width:auto;border-top:0;box-shadow:none}.navbar-collapse.collapse{display:block !important;height:auto !important;padding-bottom:0;overflow:visible !important}.navbar-collapse.in{overflow-y:visible}.navbar-fixed-top .navbar-collapse,.navbar-static-top .navbar-collapse,.navbar-fixed-bottom .navbar-collapse{padding-left:0;padding-right:0}}.navbar-fixed-top .navbar-collapse,.navbar-fixed-bottom .navbar-collapse{max-height:340px}@media (max-width:480px) and (orientation:landscape){.navbar-fixed-top .navbar-collapse,.navbar-fixed-bottom .navbar-collapse{max-height:200px}}.container>.navbar-header,.container-fluid>.navbar-header,.container>.navbar-collapse,.container-fluid>.navbar-collapse{margin-right:-15px;margin-left:-15px}@media (min-width:768px){.container>.navbar-header,.container-fluid>.navbar-header,.container>.navbar-collapse,.container-fluid>.navbar-collapse{margin-right:0;margin-left:0}}.navbar-static-top{z-index:1000;border-width:0 0 1px}@media (min-width:768px){.navbar-static-top{border-radius:0}}.navbar-fixed-top,.navbar-fixed-bottom{position:fixed;right:0;left:0;z-index:1030;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}@media (min-width:768px){.navbar-fixed-top,.navbar-fixed-bottom{border-radius:0}}.navbar-fixed-top{top:0;border-width:0 0 1px}.navbar-fixed-bottom{bottom:0;margin-bottom:0;border-width:1px 0 0}.navbar-brand{float:left;padding:14.5px 15px;font-size:19px;line-height:21px;height:50px}.navbar-brand:hover,.navbar-brand:focus{text-decoration:none}@media (min-width:768px){.navbar>.container .navbar-brand,.navbar>.container-fluid .navbar-brand{margin-left:-15px}}.navbar-toggle{position:relative;float:right;margin-right:15px;padding:9px 10px;margin-top:8px;margin-bottom:8px;background-color:transparent;background-image:none;border:1px solid transparent;border-radius:0}.navbar-toggle:focus{outline:0}.navbar-toggle .icon-bar{display:block;width:22px;height:2px;border-radius:1px}.navbar-toggle .icon-bar+.icon-bar{margin-top:4px}@media (min-width:768px){.navbar-toggle{display:none}}.navbar-nav{margin:7.25px -15px}.navbar-nav>li>a{padding-top:10px;padding-bottom:10px;line-height:21px}@media (max-width:767px){.navbar-nav .open .dropdown-menu{position:static;float:none;width:auto;margin-top:0;background-color:transparent;border:0;box-shadow:none}.navbar-nav .open .dropdown-menu>li>a,.navbar-nav .open .dropdown-menu .dropdown-header{padding:5px 15px 5px 25px}.navbar-nav .open .dropdown-menu>li>a{line-height:21px}.navbar-nav .open .dropdown-menu>li>a:hover,.navbar-nav .open .dropdown-menu>li>a:focus{background-image:none}}@media (min-width:768px){.navbar-nav{float:left;margin:0}.navbar-nav>li{float:left}.navbar-nav>li>a{padding-top:14.5px;padding-bottom:14.5px}.navbar-nav.navbar-right:last-child{margin-right:-15px}}@media (min-width:768px){.navbar-left{float:left !important}.navbar-right{float:right !important}}.navbar-form{margin-left:-15px;margin-right:-15px;padding:10px 15px;border-top:1px solid transparent;border-bottom:1px solid transparent;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.1);box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.1);margin-top:3.5px;margin-bottom:3.5px}@media (min-width:768px){.navbar-form .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.navbar-form .form-control{display:inline-block;width:auto;vertical-align:middle}.navbar-form .input-group{display:inline-table;vertical-align:middle}.navbar-form .input-group .input-group-addon,.navbar-form .input-group .input-group-btn,.navbar-form .input-group .form-control{width:auto}.navbar-form .input-group>.form-control{width:100%}.navbar-form .control-label{margin-bottom:0;vertical-align:middle}.navbar-form .radio,.navbar-form .checkbox{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.navbar-form .radio label,.navbar-form .checkbox label{padding-left:0}.navbar-form .radio input[type=\"radio\"],.navbar-form .checkbox input[type=\"checkbox\"]{position:relative;margin-left:0}.navbar-form .has-feedback .form-control-feedback{top:0}}@media (max-width:767px){.navbar-form .form-group{margin-bottom:5px}}@media (min-width:768px){.navbar-form{width:auto;border:0;margin-left:0;margin-right:0;padding-top:0;padding-bottom:0;-webkit-box-shadow:none;box-shadow:none}.navbar-form.navbar-right:last-child{margin-right:-15px}}.navbar-nav>li>.dropdown-menu{margin-top:0;border-top-right-radius:0;border-top-left-radius:0}.navbar-fixed-bottom .navbar-nav>li>.dropdown-menu{border-bottom-right-radius:0;border-bottom-left-radius:0}.navbar-btn{margin-top:3.5px;margin-bottom:3.5px}.navbar-btn.btn-sm{margin-top:9.5px;margin-bottom:9.5px}.navbar-btn.btn-xs{margin-top:14px;margin-bottom:14px}.navbar-text{margin-top:14.5px;margin-bottom:14.5px}@media (min-width:768px){.navbar-text{float:left;margin-left:15px;margin-right:15px}.navbar-text.navbar-right:last-child{margin-right:0}}.navbar-default{background-color:#222222;border-color:#121212}.navbar-default .navbar-brand{color:#ffffff}.navbar-default .navbar-brand:hover,.navbar-default .navbar-brand:focus{color:#ffffff;background-color:none}.navbar-default .navbar-text{color:#ffffff}.navbar-default .navbar-nav>li>a{color:#ffffff}.navbar-default .navbar-nav>li>a:hover,.navbar-default .navbar-nav>li>a:focus{color:#ffffff;background-color:#090909}.navbar-default .navbar-nav>.active>a,.navbar-default .navbar-nav>.active>a:hover,.navbar-default .navbar-nav>.active>a:focus{color:#ffffff;background-color:#090909}.navbar-default .navbar-nav>.disabled>a,.navbar-default .navbar-nav>.disabled>a:hover,.navbar-default .navbar-nav>.disabled>a:focus{color:#cccccc;background-color:transparent}.navbar-default .navbar-toggle{border-color:transparent}.navbar-default .navbar-toggle:hover,.navbar-default .navbar-toggle:focus{background-color:#090909}.navbar-default .navbar-toggle .icon-bar{background-color:#ffffff}.navbar-default .navbar-collapse,.navbar-default .navbar-form{border-color:#121212}.navbar-default .navbar-nav>.open>a,.navbar-default .navbar-nav>.open>a:hover,.navbar-default .navbar-nav>.open>a:focus{background-color:#090909;color:#ffffff}@media (max-width:767px){.navbar-default .navbar-nav .open .dropdown-menu>li>a{color:#ffffff}.navbar-default .navbar-nav .open .dropdown-menu>li>a:hover,.navbar-default .navbar-nav .open .dropdown-menu>li>a:focus{color:#ffffff;background-color:#090909}.navbar-default .navbar-nav .open .dropdown-menu>.active>a,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:hover,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:focus{color:#ffffff;background-color:#090909}.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:hover,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:focus{color:#cccccc;background-color:transparent}}.navbar-default .navbar-link{color:#ffffff}.navbar-default .navbar-link:hover{color:#ffffff}.navbar-default .btn-link{color:#ffffff}.navbar-default .btn-link:hover,.navbar-default .btn-link:focus{color:#ffffff}.navbar-default .btn-link[disabled]:hover,fieldset[disabled] .navbar-default .btn-link:hover,.navbar-default .btn-link[disabled]:focus,fieldset[disabled] .navbar-default .btn-link:focus{color:#cccccc}.navbar-inverse{background-color:#2780e3;border-color:#1967be}.navbar-inverse .navbar-brand{color:#ffffff}.navbar-inverse .navbar-brand:hover,.navbar-inverse .navbar-brand:focus{color:#ffffff;background-color:none}.navbar-inverse .navbar-text{color:#ffffff}.navbar-inverse .navbar-nav>li>a{color:#ffffff}.navbar-inverse .navbar-nav>li>a:hover,.navbar-inverse .navbar-nav>li>a:focus{color:#ffffff;background-color:#1967be}.navbar-inverse .navbar-nav>.active>a,.navbar-inverse .navbar-nav>.active>a:hover,.navbar-inverse .navbar-nav>.active>a:focus{color:#ffffff;background-color:#1967be}.navbar-inverse .navbar-nav>.disabled>a,.navbar-inverse .navbar-nav>.disabled>a:hover,.navbar-inverse .navbar-nav>.disabled>a:focus{color:#ffffff;background-color:transparent}.navbar-inverse .navbar-toggle{border-color:transparent}.navbar-inverse .navbar-toggle:hover,.navbar-inverse .navbar-toggle:focus{background-color:#1967be}.navbar-inverse .navbar-toggle .icon-bar{background-color:#ffffff}.navbar-inverse .navbar-collapse,.navbar-inverse .navbar-form{border-color:#1a6ecc}.navbar-inverse .navbar-nav>.open>a,.navbar-inverse .navbar-nav>.open>a:hover,.navbar-inverse .navbar-nav>.open>a:focus{background-color:#1967be;color:#ffffff}@media (max-width:767px){.navbar-inverse .navbar-nav .open .dropdown-menu>.dropdown-header{border-color:#1967be}.navbar-inverse .navbar-nav .open .dropdown-menu .divider{background-color:#1967be}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a{color:#ffffff}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:hover,.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:focus{color:#ffffff;background-color:#1967be}.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:hover,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:focus{color:#ffffff;background-color:#1967be}.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:hover,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:focus{color:#ffffff;background-color:transparent}}.navbar-inverse .navbar-link{color:#ffffff}.navbar-inverse .navbar-link:hover{color:#ffffff}.navbar-inverse .btn-link{color:#ffffff}.navbar-inverse .btn-link:hover,.navbar-inverse .btn-link:focus{color:#ffffff}.navbar-inverse .btn-link[disabled]:hover,fieldset[disabled] .navbar-inverse .btn-link:hover,.navbar-inverse .btn-link[disabled]:focus,fieldset[disabled] .navbar-inverse .btn-link:focus{color:#ffffff}.breadcrumb{padding:8px 15px;margin-bottom:21px;list-style:none;background-color:#f5f5f5;border-radius:0}.breadcrumb>li{display:inline-block}.breadcrumb>li+li:before{content:\"/\\00a0\";padding:0 5px;color:#cccccc}.breadcrumb>.active{color:#999999}.pagination{display:inline-block;padding-left:0;margin:21px 0;border-radius:0}.pagination>li{display:inline}.pagination>li>a,.pagination>li>span{position:relative;float:left;padding:10px 18px;line-height:1.42857143;text-decoration:none;color:#2780e3;background-color:#ffffff;border:1px solid #dddddd;margin-left:-1px}.pagination>li:first-child>a,.pagination>li:first-child>span{margin-left:0;border-bottom-left-radius:0;border-top-left-radius:0}.pagination>li:last-child>a,.pagination>li:last-child>span{border-bottom-right-radius:0;border-top-right-radius:0}.pagination>li>a:hover,.pagination>li>span:hover,.pagination>li>a:focus,.pagination>li>span:focus{color:#165ba8;background-color:#e6e6e6;border-color:#dddddd}.pagination>.active>a,.pagination>.active>span,.pagination>.active>a:hover,.pagination>.active>span:hover,.pagination>.active>a:focus,.pagination>.active>span:focus{z-index:2;color:#999999;background-color:#f5f5f5;border-color:#dddddd;cursor:default}.pagination>.disabled>span,.pagination>.disabled>span:hover,.pagination>.disabled>span:focus,.pagination>.disabled>a,.pagination>.disabled>a:hover,.pagination>.disabled>a:focus{color:#999999;background-color:#ffffff;border-color:#dddddd;cursor:not-allowed}.pagination-lg>li>a,.pagination-lg>li>span{padding:18px 30px;font-size:19px}.pagination-lg>li:first-child>a,.pagination-lg>li:first-child>span{border-bottom-left-radius:0;border-top-left-radius:0}.pagination-lg>li:last-child>a,.pagination-lg>li:last-child>span{border-bottom-right-radius:0;border-top-right-radius:0}.pagination-sm>li>a,.pagination-sm>li>span{padding:5px 10px;font-size:13px}.pagination-sm>li:first-child>a,.pagination-sm>li:first-child>span{border-bottom-left-radius:0;border-top-left-radius:0}.pagination-sm>li:last-child>a,.pagination-sm>li:last-child>span{border-bottom-right-radius:0;border-top-right-radius:0}.pager{padding-left:0;margin:21px 0;list-style:none;text-align:center}.pager li{display:inline}.pager li>a,.pager li>span{display:inline-block;padding:5px 14px;background-color:#ffffff;border:1px solid #dddddd;border-radius:0}.pager li>a:hover,.pager li>a:focus{text-decoration:none;background-color:#e6e6e6}.pager .next>a,.pager .next>span{float:right}.pager .previous>a,.pager .previous>span{float:left}.pager .disabled>a,.pager .disabled>a:hover,.pager .disabled>a:focus,.pager .disabled>span{color:#999999;background-color:#ffffff;cursor:not-allowed}.label{display:inline;padding:.2em .6em .3em;font-size:75%;font-weight:bold;line-height:1;color:#ffffff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em}a.label:hover,a.label:focus{color:#ffffff;text-decoration:none;cursor:pointer}.label:empty{display:none}.btn .label{position:relative;top:-1px}.label-default{background-color:#222222}.label-default[href]:hover,.label-default[href]:focus{background-color:#090909}.label-primary{background-color:#2780e3}.label-primary[href]:hover,.label-primary[href]:focus{background-color:#1967be}.label-success{background-color:#3fb618}.label-success[href]:hover,.label-success[href]:focus{background-color:#2f8912}.label-info{background-color:#9954bb}.label-info[href]:hover,.label-info[href]:focus{background-color:#7e3f9d}.label-warning{background-color:#ff7518}.label-warning[href]:hover,.label-warning[href]:focus{background-color:#e45c00}.label-danger{background-color:#ff0039}.label-danger[href]:hover,.label-danger[href]:focus{background-color:#cc002e}.badge{display:inline-block;min-width:10px;padding:3px 7px;font-size:13px;font-weight:bold;color:#ffffff;line-height:1;vertical-align:baseline;white-space:nowrap;text-align:center;background-color:#2780e3;border-radius:10px}.badge:empty{display:none}.btn .badge{position:relative;top:-1px}.btn-xs .badge{top:0;padding:1px 5px}a.badge:hover,a.badge:focus{color:#ffffff;text-decoration:none;cursor:pointer}a.list-group-item.active>.badge,.nav-pills>.active>a>.badge{color:#2780e3;background-color:#ffffff}.nav-pills>li>a>.badge{margin-left:3px}.jumbotron{padding:30px;margin-bottom:30px;color:inherit;background-color:#e6e6e6}.jumbotron h1,.jumbotron .h1{color:inherit}.jumbotron p{margin-bottom:15px;font-size:23px;font-weight:200}.jumbotron>hr{border-top-color:#cccccc}.container .jumbotron{border-radius:0}.jumbotron .container{max-width:100%}@media screen and (min-width:768px){.jumbotron{padding-top:48px;padding-bottom:48px}.container .jumbotron{padding-left:60px;padding-right:60px}.jumbotron h1,.jumbotron .h1{font-size:67.5px}}.thumbnail{display:block;padding:4px;margin-bottom:21px;line-height:1.42857143;background-color:#ffffff;border:1px solid #dddddd;border-radius:0;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out}.thumbnail>img,.thumbnail a>img{margin-left:auto;margin-right:auto}a.thumbnail:hover,a.thumbnail:focus,a.thumbnail.active{border-color:#2780e3}.thumbnail .caption{padding:9px;color:#333333}.alert{padding:15px;margin-bottom:21px;border:1px solid transparent;border-radius:0}.alert h4{margin-top:0;color:inherit}.alert .alert-link{font-weight:bold}.alert>p,.alert>ul{margin-bottom:0}.alert>p+p{margin-top:5px}.alert-dismissable,.alert-dismissible{padding-right:35px}.alert-dismissable .close,.alert-dismissible .close{position:relative;top:-2px;right:-21px;color:inherit}.alert-success{background-color:#3fb618;border-color:#4e9f15;color:#ffffff}.alert-success hr{border-top-color:#438912}.alert-success .alert-link{color:#e6e6e6}.alert-info{background-color:#9954bb;border-color:#7643a8;color:#ffffff}.alert-info hr{border-top-color:#693c96}.alert-info .alert-link{color:#e6e6e6}.alert-warning{background-color:#ff7518;border-color:#ff4309;color:#ffffff}.alert-warning hr{border-top-color:#ee3800}.alert-warning .alert-link{color:#e6e6e6}.alert-danger{background-color:#ff0039;border-color:#f0005e;color:#ffffff}.alert-danger hr{border-top-color:#d60054}.alert-danger .alert-link{color:#e6e6e6}@-webkit-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}.progress{overflow:hidden;height:21px;margin-bottom:21px;background-color:#cccccc;border-radius:0;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,0.1);box-shadow:inset 0 1px 2px rgba(0,0,0,0.1)}.progress-bar{float:left;width:0%;height:100%;font-size:13px;line-height:21px;color:#ffffff;text-align:center;background-color:#2780e3;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,0.15);box-shadow:inset 0 -1px 0 rgba(0,0,0,0.15);-webkit-transition:width 0.6s ease;-o-transition:width 0.6s ease;transition:width 0.6s ease}.progress-striped .progress-bar,.progress-bar-striped{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-size:40px 40px}.progress.active .progress-bar,.progress-bar.active{-webkit-animation:progress-bar-stripes 2s linear infinite;-o-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}.progress-bar[aria-valuenow=\"1\"],.progress-bar[aria-valuenow=\"2\"]{min-width:30px}.progress-bar[aria-valuenow=\"0\"]{color:#999999;min-width:30px;background-color:transparent;background-image:none;box-shadow:none}.progress-bar-success{background-color:#3fb618}.progress-striped .progress-bar-success{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)}.progress-bar-info{background-color:#9954bb}.progress-striped .progress-bar-info{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)}.progress-bar-warning{background-color:#ff7518}.progress-striped .progress-bar-warning{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)}.progress-bar-danger{background-color:#ff0039}.progress-striped .progress-bar-danger{background-image:-webkit-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:-o-linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);background-image:linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)}.media,.media-body{overflow:hidden;zoom:1}.media,.media .media{margin-top:15px}.media:first-child{margin-top:0}.media-object{display:block}.media-heading{margin:0 0 5px}.media>.pull-left{margin-right:10px}.media>.pull-right{margin-left:10px}.media-list{padding-left:0;list-style:none}.list-group{margin-bottom:20px;padding-left:0}.list-group-item{position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#ffffff;border:1px solid #dddddd}.list-group-item:first-child{border-top-right-radius:0;border-top-left-radius:0}.list-group-item:last-child{margin-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.list-group-item>.badge{float:right}.list-group-item>.badge+.badge{margin-right:5px}a.list-group-item{color:#555555}a.list-group-item .list-group-item-heading{color:#333333}a.list-group-item:hover,a.list-group-item:focus{text-decoration:none;color:#555555;background-color:#f5f5f5}.list-group-item.disabled,.list-group-item.disabled:hover,.list-group-item.disabled:focus{background-color:#e6e6e6;color:#999999}.list-group-item.disabled .list-group-item-heading,.list-group-item.disabled:hover .list-group-item-heading,.list-group-item.disabled:focus .list-group-item-heading{color:inherit}.list-group-item.disabled .list-group-item-text,.list-group-item.disabled:hover .list-group-item-text,.list-group-item.disabled:focus .list-group-item-text{color:#999999}.list-group-item.active,.list-group-item.active:hover,.list-group-item.active:focus{z-index:2;color:#ffffff;background-color:#2780e3;border-color:#2780e3}.list-group-item.active .list-group-item-heading,.list-group-item.active:hover .list-group-item-heading,.list-group-item.active:focus .list-group-item-heading,.list-group-item.active .list-group-item-heading>small,.list-group-item.active:hover .list-group-item-heading>small,.list-group-item.active:focus .list-group-item-heading>small,.list-group-item.active .list-group-item-heading>.small,.list-group-item.active:hover .list-group-item-heading>.small,.list-group-item.active:focus .list-group-item-heading>.small{color:inherit}.list-group-item.active .list-group-item-text,.list-group-item.active:hover .list-group-item-text,.list-group-item.active:focus .list-group-item-text{color:#dceafa}.list-group-item-success{color:#ffffff;background-color:#3fb618}a.list-group-item-success{color:#ffffff}a.list-group-item-success .list-group-item-heading{color:inherit}a.list-group-item-success:hover,a.list-group-item-success:focus{color:#ffffff;background-color:#379f15}a.list-group-item-success.active,a.list-group-item-success.active:hover,a.list-group-item-success.active:focus{color:#fff;background-color:#ffffff;border-color:#ffffff}.list-group-item-info{color:#ffffff;background-color:#9954bb}a.list-group-item-info{color:#ffffff}a.list-group-item-info .list-group-item-heading{color:inherit}a.list-group-item-info:hover,a.list-group-item-info:focus{color:#ffffff;background-color:#8d46b0}a.list-group-item-info.active,a.list-group-item-info.active:hover,a.list-group-item-info.active:focus{color:#fff;background-color:#ffffff;border-color:#ffffff}.list-group-item-warning{color:#ffffff;background-color:#ff7518}a.list-group-item-warning{color:#ffffff}a.list-group-item-warning .list-group-item-heading{color:inherit}a.list-group-item-warning:hover,a.list-group-item-warning:focus{color:#ffffff;background-color:#fe6600}a.list-group-item-warning.active,a.list-group-item-warning.active:hover,a.list-group-item-warning.active:focus{color:#fff;background-color:#ffffff;border-color:#ffffff}.list-group-item-danger{color:#ffffff;background-color:#ff0039}a.list-group-item-danger{color:#ffffff}a.list-group-item-danger .list-group-item-heading{color:inherit}a.list-group-item-danger:hover,a.list-group-item-danger:focus{color:#ffffff;background-color:#e60033}a.list-group-item-danger.active,a.list-group-item-danger.active:hover,a.list-group-item-danger.active:focus{color:#fff;background-color:#ffffff;border-color:#ffffff}.list-group-item-heading{margin-top:0;margin-bottom:5px}.list-group-item-text{margin-bottom:0;line-height:1.3}.panel{margin-bottom:21px;background-color:#ffffff;border:1px solid transparent;border-radius:0;-webkit-box-shadow:0 1px 1px rgba(0,0,0,0.05);box-shadow:0 1px 1px rgba(0,0,0,0.05)}.panel-body{padding:15px}.panel-heading{padding:10px 15px;border-bottom:1px solid transparent;border-top-right-radius:-1;border-top-left-radius:-1}.panel-heading>.dropdown .dropdown-toggle{color:inherit}.panel-title{margin-top:0;margin-bottom:0;font-size:17px;color:inherit}.panel-title>a{color:inherit}.panel-footer{padding:10px 15px;background-color:#f5f5f5;border-top:1px solid #dddddd;border-bottom-right-radius:-1;border-bottom-left-radius:-1}.panel>.list-group{margin-bottom:0}.panel>.list-group .list-group-item{border-width:1px 0;border-radius:0}.panel>.list-group:first-child .list-group-item:first-child{border-top:0;border-top-right-radius:-1;border-top-left-radius:-1}.panel>.list-group:last-child .list-group-item:last-child{border-bottom:0;border-bottom-right-radius:-1;border-bottom-left-radius:-1}.panel-heading+.list-group .list-group-item:first-child{border-top-width:0}.list-group+.panel-footer{border-top-width:0}.panel>.table,.panel>.table-responsive>.table,.panel>.panel-collapse>.table{margin-bottom:0}.panel>.table:first-child,.panel>.table-responsive:first-child>.table:first-child{border-top-right-radius:-1;border-top-left-radius:-1}.panel>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table:first-child>thead:first-child>tr:first-child th:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:first-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:first-child{border-top-left-radius:-1}.panel>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table:first-child>thead:first-child>tr:first-child th:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:last-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:last-child{border-top-right-radius:-1}.panel>.table:last-child,.panel>.table-responsive:last-child>.table:last-child{border-bottom-right-radius:-1;border-bottom-left-radius:-1}.panel>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:first-child{border-bottom-left-radius:-1}.panel>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:last-child{border-bottom-right-radius:-1}.panel>.panel-body+.table,.panel>.panel-body+.table-responsive{border-top:1px solid #dddddd}.panel>.table>tbody:first-child>tr:first-child th,.panel>.table>tbody:first-child>tr:first-child td{border-top:0}.panel>.table-bordered,.panel>.table-responsive>.table-bordered{border:0}.panel>.table-bordered>thead>tr>th:first-child,.panel>.table-responsive>.table-bordered>thead>tr>th:first-child,.panel>.table-bordered>tbody>tr>th:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:first-child,.panel>.table-bordered>tfoot>tr>th:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:first-child,.panel>.table-bordered>thead>tr>td:first-child,.panel>.table-responsive>.table-bordered>thead>tr>td:first-child,.panel>.table-bordered>tbody>tr>td:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:first-child,.panel>.table-bordered>tfoot>tr>td:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:first-child{border-left:0}.panel>.table-bordered>thead>tr>th:last-child,.panel>.table-responsive>.table-bordered>thead>tr>th:last-child,.panel>.table-bordered>tbody>tr>th:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:last-child,.panel>.table-bordered>tfoot>tr>th:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:last-child,.panel>.table-bordered>thead>tr>td:last-child,.panel>.table-responsive>.table-bordered>thead>tr>td:last-child,.panel>.table-bordered>tbody>tr>td:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:last-child,.panel>.table-bordered>tfoot>tr>td:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:last-child{border-right:0}.panel>.table-bordered>thead>tr:first-child>td,.panel>.table-responsive>.table-bordered>thead>tr:first-child>td,.panel>.table-bordered>tbody>tr:first-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>td,.panel>.table-bordered>thead>tr:first-child>th,.panel>.table-responsive>.table-bordered>thead>tr:first-child>th,.panel>.table-bordered>tbody>tr:first-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>th{border-bottom:0}.panel>.table-bordered>tbody>tr:last-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>td,.panel>.table-bordered>tfoot>tr:last-child>td,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>td,.panel>.table-bordered>tbody>tr:last-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>th,.panel>.table-bordered>tfoot>tr:last-child>th,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>th{border-bottom:0}.panel>.table-responsive{border:0;margin-bottom:0}.panel-group{margin-bottom:21px}.panel-group .panel{margin-bottom:0;border-radius:0}.panel-group .panel+.panel{margin-top:5px}.panel-group .panel-heading{border-bottom:0}.panel-group .panel-heading+.panel-collapse>.panel-body{border-top:1px solid #dddddd}.panel-group .panel-footer{border-top:0}.panel-group .panel-footer+.panel-collapse .panel-body{border-bottom:1px solid #dddddd}.panel-default{border-color:#dddddd}.panel-default>.panel-heading{color:#333333;background-color:#f5f5f5;border-color:#dddddd}.panel-default>.panel-heading+.panel-collapse>.panel-body{border-top-color:#dddddd}.panel-default>.panel-heading .badge{color:#f5f5f5;background-color:#333333}.panel-default>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#dddddd}.panel-primary{border-color:#2780e3}.panel-primary>.panel-heading{color:#ffffff;background-color:#2780e3;border-color:#2780e3}.panel-primary>.panel-heading+.panel-collapse>.panel-body{border-top-color:#2780e3}.panel-primary>.panel-heading .badge{color:#2780e3;background-color:#ffffff}.panel-primary>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#2780e3}.panel-success{border-color:#4e9f15}.panel-success>.panel-heading{color:#ffffff;background-color:#3fb618;border-color:#4e9f15}.panel-success>.panel-heading+.panel-collapse>.panel-body{border-top-color:#4e9f15}.panel-success>.panel-heading .badge{color:#3fb618;background-color:#ffffff}.panel-success>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#4e9f15}.panel-info{border-color:#7643a8}.panel-info>.panel-heading{color:#ffffff;background-color:#9954bb;border-color:#7643a8}.panel-info>.panel-heading+.panel-collapse>.panel-body{border-top-color:#7643a8}.panel-info>.panel-heading .badge{color:#9954bb;background-color:#ffffff}.panel-info>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#7643a8}.panel-warning{border-color:#ff4309}.panel-warning>.panel-heading{color:#ffffff;background-color:#ff7518;border-color:#ff4309}.panel-warning>.panel-heading+.panel-collapse>.panel-body{border-top-color:#ff4309}.panel-warning>.panel-heading .badge{color:#ff7518;background-color:#ffffff}.panel-warning>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#ff4309}.panel-danger{border-color:#f0005e}.panel-danger>.panel-heading{color:#ffffff;background-color:#ff0039;border-color:#f0005e}.panel-danger>.panel-heading+.panel-collapse>.panel-body{border-top-color:#f0005e}.panel-danger>.panel-heading .badge{color:#ff0039;background-color:#ffffff}.panel-danger>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#f0005e}.embed-responsive{position:relative;display:block;height:0;padding:0;overflow:hidden}.embed-responsive .embed-responsive-item,.embed-responsive iframe,.embed-responsive embed,.embed-responsive object{position:absolute;top:0;left:0;bottom:0;height:100%;width:100%;border:0}.embed-responsive.embed-responsive-16by9{padding-bottom:56.25%}.embed-responsive.embed-responsive-4by3{padding-bottom:75%}.well{min-height:20px;padding:19px;margin-bottom:20px;background-color:#f5f5f5;border:1px solid #e3e3e3;border-radius:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.05);box-shadow:inset 0 1px 1px rgba(0,0,0,0.05)}.well blockquote{border-color:#ddd;border-color:rgba(0,0,0,0.15)}.well-lg{padding:24px;border-radius:0}.well-sm{padding:9px;border-radius:0}.close{float:right;font-size:22.5px;font-weight:bold;line-height:1;color:#ffffff;text-shadow:0 1px 0 #ffffff;opacity:0.2;filter:alpha(opacity=20)}.close:hover,.close:focus{color:#ffffff;text-decoration:none;cursor:pointer;opacity:0.5;filter:alpha(opacity=50)}button.close{padding:0;cursor:pointer;background:transparent;border:0;-webkit-appearance:none}.modal-open{overflow:hidden}.modal{display:none;overflow:hidden;position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;-webkit-overflow-scrolling:touch;outline:0}.modal.fade .modal-dialog{-webkit-transform:translate3d(0, -25%, 0);transform:translate3d(0, -25%, 0);-webkit-transition:-webkit-transform .3s ease-out;-moz-transition:-moz-transform .3s ease-out;-o-transition:-o-transform .3s ease-out;transition:transform .3s ease-out}.modal.in .modal-dialog{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}.modal-open .modal{overflow-x:hidden;overflow-y:auto}.modal-dialog{position:relative;width:auto;margin:10px}.modal-content{position:relative;background-color:#ffffff;border:1px solid #999999;border:1px solid transparent;border-radius:0;-webkit-box-shadow:0 3px 9px rgba(0,0,0,0.5);box-shadow:0 3px 9px rgba(0,0,0,0.5);background-clip:padding-box;outline:0}.modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:#000000}.modal-backdrop.fade{opacity:0;filter:alpha(opacity=0)}.modal-backdrop.in{opacity:0.5;filter:alpha(opacity=50)}.modal-header{padding:15px;border-bottom:1px solid #e5e5e5;min-height:16.42857143px}.modal-header .close{margin-top:-2px}.modal-title{margin:0;line-height:1.42857143}.modal-body{position:relative;padding:20px}.modal-footer{padding:20px;text-align:right;border-top:1px solid #e5e5e5}.modal-footer .btn+.btn{margin-left:5px;margin-bottom:0}.modal-footer .btn-group .btn+.btn{margin-left:-1px}.modal-footer .btn-block+.btn-block{margin-left:0}.modal-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}@media (min-width:768px){.modal-dialog{width:600px;margin:30px auto}.modal-content{-webkit-box-shadow:0 5px 15px rgba(0,0,0,0.5);box-shadow:0 5px 15px rgba(0,0,0,0.5)}.modal-sm{width:300px}}@media (min-width:992px){.modal-lg{width:900px}}.tooltip{position:absolute;z-index:1070;display:block;visibility:visible;font-size:13px;line-height:1.4;opacity:0;filter:alpha(opacity=0)}.tooltip.in{opacity:0.9;filter:alpha(opacity=90)}.tooltip.top{margin-top:-3px;padding:5px 0}.tooltip.right{margin-left:3px;padding:0 5px}.tooltip.bottom{margin-top:3px;padding:5px 0}.tooltip.left{margin-left:-3px;padding:0 5px}.tooltip-inner{max-width:200px;padding:3px 8px;color:#ffffff;text-align:center;text-decoration:none;background-color:rgba(0,0,0,0.9);border-radius:0}.tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.tooltip.top .tooltip-arrow{bottom:0;left:50%;margin-left:-5px;border-width:5px 5px 0;border-top-color:rgba(0,0,0,0.9)}.tooltip.top-left .tooltip-arrow{bottom:0;left:5px;border-width:5px 5px 0;border-top-color:rgba(0,0,0,0.9)}.tooltip.top-right .tooltip-arrow{bottom:0;right:5px;border-width:5px 5px 0;border-top-color:rgba(0,0,0,0.9)}.tooltip.right .tooltip-arrow{top:50%;left:0;margin-top:-5px;border-width:5px 5px 5px 0;border-right-color:rgba(0,0,0,0.9)}.tooltip.left .tooltip-arrow{top:50%;right:0;margin-top:-5px;border-width:5px 0 5px 5px;border-left-color:rgba(0,0,0,0.9)}.tooltip.bottom .tooltip-arrow{top:0;left:50%;margin-left:-5px;border-width:0 5px 5px;border-bottom-color:rgba(0,0,0,0.9)}.tooltip.bottom-left .tooltip-arrow{top:0;left:5px;border-width:0 5px 5px;border-bottom-color:rgba(0,0,0,0.9)}.tooltip.bottom-right .tooltip-arrow{top:0;right:5px;border-width:0 5px 5px;border-bottom-color:rgba(0,0,0,0.9)}.popover{position:absolute;top:0;left:0;z-index:1060;display:none;max-width:276px;padding:1px;text-align:left;background-color:#ffffff;background-clip:padding-box;border:1px solid #cccccc;border:1px solid rgba(0,0,0,0.2);border-radius:0;-webkit-box-shadow:0 5px 10px rgba(0,0,0,0.2);box-shadow:0 5px 10px rgba(0,0,0,0.2);white-space:normal}.popover.top{margin-top:-10px}.popover.right{margin-left:10px}.popover.bottom{margin-top:10px}.popover.left{margin-left:-10px}.popover-title{margin:0;padding:8px 14px;font-size:15px;font-weight:normal;line-height:18px;background-color:#f7f7f7;border-bottom:1px solid #ebebeb;border-radius:-1 -1 0 0}.popover-content{padding:9px 14px}.popover>.arrow,.popover>.arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.popover>.arrow{border-width:11px}.popover>.arrow:after{border-width:10px;content:\"\"}.popover.top>.arrow{left:50%;margin-left:-11px;border-bottom-width:0;border-top-color:#999999;border-top-color:rgba(0,0,0,0.25);bottom:-11px}.popover.top>.arrow:after{content:\" \";bottom:1px;margin-left:-10px;border-bottom-width:0;border-top-color:#ffffff}.popover.right>.arrow{top:50%;left:-11px;margin-top:-11px;border-left-width:0;border-right-color:#999999;border-right-color:rgba(0,0,0,0.25)}.popover.right>.arrow:after{content:\" \";left:1px;bottom:-10px;border-left-width:0;border-right-color:#ffffff}.popover.bottom>.arrow{left:50%;margin-left:-11px;border-top-width:0;border-bottom-color:#999999;border-bottom-color:rgba(0,0,0,0.25);top:-11px}.popover.bottom>.arrow:after{content:\" \";top:1px;margin-left:-10px;border-top-width:0;border-bottom-color:#ffffff}.popover.left>.arrow{top:50%;right:-11px;margin-top:-11px;border-right-width:0;border-left-color:#999999;border-left-color:rgba(0,0,0,0.25)}.popover.left>.arrow:after{content:\" \";right:1px;border-right-width:0;border-left-color:#ffffff;bottom:-10px}.carousel{position:relative}.carousel-inner{position:relative;overflow:hidden;width:100%}.carousel-inner>.item{display:none;position:relative;-webkit-transition:.6s ease-in-out left;-o-transition:.6s ease-in-out left;transition:.6s ease-in-out left}.carousel-inner>.item>img,.carousel-inner>.item>a>img{line-height:1}.carousel-inner>.active,.carousel-inner>.next,.carousel-inner>.prev{display:block}.carousel-inner>.active{left:0}.carousel-inner>.next,.carousel-inner>.prev{position:absolute;top:0;width:100%}.carousel-inner>.next{left:100%}.carousel-inner>.prev{left:-100%}.carousel-inner>.next.left,.carousel-inner>.prev.right{left:0}.carousel-inner>.active.left{left:-100%}.carousel-inner>.active.right{left:100%}.carousel-control{position:absolute;top:0;left:0;bottom:0;width:15%;opacity:0.5;filter:alpha(opacity=50);font-size:20px;color:#ffffff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,0.6)}.carousel-control.left{background-image:-webkit-linear-gradient(left, rgba(0,0,0,0.5) 0, rgba(0,0,0,0.0001) 100%);background-image:-o-linear-gradient(left, rgba(0,0,0,0.5) 0, rgba(0,0,0,0.0001) 100%);background-image:linear-gradient(to right, rgba(0,0,0,0.5) 0, rgba(0,0,0,0.0001) 100%);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1)}.carousel-control.right{left:auto;right:0;background-image:-webkit-linear-gradient(left, rgba(0,0,0,0.0001) 0, rgba(0,0,0,0.5) 100%);background-image:-o-linear-gradient(left, rgba(0,0,0,0.0001) 0, rgba(0,0,0,0.5) 100%);background-image:linear-gradient(to right, rgba(0,0,0,0.0001) 0, rgba(0,0,0,0.5) 100%);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1)}.carousel-control:hover,.carousel-control:focus{outline:0;color:#ffffff;text-decoration:none;opacity:0.9;filter:alpha(opacity=90)}.carousel-control .icon-prev,.carousel-control .icon-next,.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right{position:absolute;top:50%;z-index:5;display:inline-block}.carousel-control .icon-prev,.carousel-control .glyphicon-chevron-left{left:50%;margin-left:-10px}.carousel-control .icon-next,.carousel-control .glyphicon-chevron-right{right:50%;margin-right:-10px}.carousel-control .icon-prev,.carousel-control .icon-next{width:20px;height:20px;margin-top:-10px;font-family:serif}.carousel-control .icon-prev:before{content:'\\2039'}.carousel-control .icon-next:before{content:'\\203a'}.carousel-indicators{position:absolute;bottom:10px;left:50%;z-index:15;width:60%;margin-left:-30%;padding-left:0;list-style:none;text-align:center}.carousel-indicators li{display:inline-block;width:10px;height:10px;margin:1px;text-indent:-999px;border:1px solid #ffffff;border-radius:10px;cursor:pointer;background-color:#000 \\9;background-color:rgba(0,0,0,0)}.carousel-indicators .active{margin:0;width:12px;height:12px;background-color:#ffffff}.carousel-caption{position:absolute;left:15%;right:15%;bottom:20px;z-index:10;padding-top:20px;padding-bottom:20px;color:#ffffff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,0.6)}.carousel-caption .btn{text-shadow:none}@media screen and (min-width:768px){.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right,.carousel-control .icon-prev,.carousel-control .icon-next{width:30px;height:30px;margin-top:-15px;font-size:30px}.carousel-control .glyphicon-chevron-left,.carousel-control .icon-prev{margin-left:-15px}.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next{margin-right:-15px}.carousel-caption{left:20%;right:20%;padding-bottom:30px}.carousel-indicators{bottom:20px}}.clearfix:before,.clearfix:after,.dl-horizontal dd:before,.dl-horizontal dd:after,.container:before,.container:after,.container-fluid:before,.container-fluid:after,.row:before,.row:after,.form-horizontal .form-group:before,.form-horizontal .form-group:after,.btn-toolbar:before,.btn-toolbar:after,.btn-group-vertical>.btn-group:before,.btn-group-vertical>.btn-group:after,.nav:before,.nav:after,.navbar:before,.navbar:after,.navbar-header:before,.navbar-header:after,.navbar-collapse:before,.navbar-collapse:after,.pager:before,.pager:after,.panel-body:before,.panel-body:after,.modal-footer:before,.modal-footer:after{content:\" \";display:table}.clearfix:after,.dl-horizontal dd:after,.container:after,.container-fluid:after,.row:after,.form-horizontal .form-group:after,.btn-toolbar:after,.btn-group-vertical>.btn-group:after,.nav:after,.navbar:after,.navbar-header:after,.navbar-collapse:after,.pager:after,.panel-body:after,.modal-footer:after{clear:both}.center-block{display:block;margin-left:auto;margin-right:auto}.pull-right{float:right !important}.pull-left{float:left !important}.hide{display:none !important}.show{display:block !important}.invisible{visibility:hidden}.text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.hidden{display:none !important;visibility:hidden !important}.affix{position:fixed;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}@-ms-viewport{width:device-width}.visible-xs,.visible-sm,.visible-md,.visible-lg{display:none !important}.visible-xs-block,.visible-xs-inline,.visible-xs-inline-block,.visible-sm-block,.visible-sm-inline,.visible-sm-inline-block,.visible-md-block,.visible-md-inline,.visible-md-inline-block,.visible-lg-block,.visible-lg-inline,.visible-lg-inline-block{display:none !important}@media (max-width:767px){.visible-xs{display:block !important}table.visible-xs{display:table}tr.visible-xs{display:table-row !important}th.visible-xs,td.visible-xs{display:table-cell !important}}@media (max-width:767px){.visible-xs-block{display:block !important}}@media (max-width:767px){.visible-xs-inline{display:inline !important}}@media (max-width:767px){.visible-xs-inline-block{display:inline-block !important}}@media (min-width:768px) and (max-width:991px){.visible-sm{display:block !important}table.visible-sm{display:table}tr.visible-sm{display:table-row !important}th.visible-sm,td.visible-sm{display:table-cell !important}}@media (min-width:768px) and (max-width:991px){.visible-sm-block{display:block !important}}@media (min-width:768px) and (max-width:991px){.visible-sm-inline{display:inline !important}}@media (min-width:768px) and (max-width:991px){.visible-sm-inline-block{display:inline-block !important}}@media (min-width:992px) and (max-width:1199px){.visible-md{display:block !important}table.visible-md{display:table}tr.visible-md{display:table-row !important}th.visible-md,td.visible-md{display:table-cell !important}}@media (min-width:992px) and (max-width:1199px){.visible-md-block{display:block !important}}@media (min-width:992px) and (max-width:1199px){.visible-md-inline{display:inline !important}}@media (min-width:992px) and (max-width:1199px){.visible-md-inline-block{display:inline-block !important}}@media (min-width:1200px){.visible-lg{display:block !important}table.visible-lg{display:table}tr.visible-lg{display:table-row !important}th.visible-lg,td.visible-lg{display:table-cell !important}}@media (min-width:1200px){.visible-lg-block{display:block !important}}@media (min-width:1200px){.visible-lg-inline{display:inline !important}}@media (min-width:1200px){.visible-lg-inline-block{display:inline-block !important}}@media (max-width:767px){.hidden-xs{display:none !important}}@media (min-width:768px) and (max-width:991px){.hidden-sm{display:none !important}}@media (min-width:992px) and (max-width:1199px){.hidden-md{display:none !important}}@media (min-width:1200px){.hidden-lg{display:none !important}}.visible-print{display:none !important}@media print{.visible-print{display:block !important}table.visible-print{display:table}tr.visible-print{display:table-row !important}th.visible-print,td.visible-print{display:table-cell !important}}.visible-print-block{display:none !important}@media print{.visible-print-block{display:block !important}}.visible-print-inline{display:none !important}@media print{.visible-print-inline{display:inline !important}}.visible-print-inline-block{display:none !important}@media print{.visible-print-inline-block{display:inline-block !important}}@media print{.hidden-print{display:none !important}}.navbar-inverse .badge{background-color:#fff;color:#2780e3}body{-webkit-font-smoothing:antialiased}.text-primary,.text-primary:hover{color:#2780e3}.text-success,.text-success:hover{color:#3fb618}.text-danger,.text-danger:hover{color:#ff0039}.text-warning,.text-warning:hover{color:#ff7518}.text-info,.text-info:hover{color:#9954bb}table a:not(.btn),.table a:not(.btn){text-decoration:underline}table .success,.table .success,table .warning,.table .warning,table .danger,.table .danger,table .info,.table .info{color:#fff}table .success a,.table .success a,table .warning a,.table .warning a,table .danger a,.table .danger a,table .info a,.table .info a{color:#fff}.has-warning .help-block,.has-warning .control-label,.has-warning .form-control-feedback{color:#ff7518}.has-warning .form-control,.has-warning .form-control:focus,.has-warning .input-group-addon{border:1px solid #ff7518}.has-error .help-block,.has-error .control-label,.has-error .form-control-feedback{color:#ff0039}.has-error .form-control,.has-error .form-control:focus,.has-error .input-group-addon{border:1px solid #ff0039}.has-success .help-block,.has-success .control-label,.has-success .form-control-feedback{color:#3fb618}.has-success .form-control,.has-success .form-control:focus,.has-success .input-group-addon{border:1px solid #3fb618}.nav-pills>li>a{border-radius:0}.dropdown-menu>li>a:hover,.dropdown-menu>li>a:focus{background-image:none}.close{text-decoration:none;text-shadow:none;opacity:0.4}.close:hover,.close:focus{opacity:1}.alert{border:none}.alert .alert-link{text-decoration:underline;color:#fff}.label{border-radius:0}.progress{height:8px;-webkit-box-shadow:none;box-shadow:none}.progress .progress-bar{font-size:8px;line-height:8px}.panel-heading,.panel-footer{border-top-right-radius:0;border-top-left-radius:0}.panel-default .close{color:#333333}.modal .close{color:#333333}.popover{color:#333333}";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(21)
		// The css code:
		(__webpack_require__(9));
	// Hot Module Replacement
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		"body, div {\n    font-family: \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif;\n    font-weight: bold;\n}\nbody {\n  background: black;\n}\n\n\n.title {\n  text-align: center;\n  font-size: 18px;\n  line-height: 40px;\n  color: white;\n}\n\n.panel {\n  background-color: rgba(34, 34, 34, 0.7);\n}\n\n.layout-list-item {\n  padding-left: 10px;\n  line-height: 50px;\n  cursor: pointer;\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.layout-list-item.selected {\n  color: white;\n  background-color: rgba(255, 255, 255, 0.2);\n}\n\n.layout-detail-item-title {\n  color: #BBBBBB;\n  font-size: 13px;\n  text-align: center;\n}\n\n.layout-detail-item-input {\n  border: none;\n  color: white;\n  background: rgba(0, 0, 0, 0);\n  text-align: center;\n}\n\n.image-frame {\n  background-color: #fbfbfb;\n  text-align: center;\n  -border: 1px solid #CCC;\n  border-radius: 3px;\n}\n";

/***/ },
/* 10 */
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

	/*global define*/
	/*eslint no-use-before-define:0 */

	/**
	 * LayoutController lays out renderables according to a layout-
	 * function and a data-source.
	 *
	 * The LayoutController is the most basic and lightweight version
	 * of a controller/view laying out renderables according to a
	 * layout-function.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {

	    // import dependencies
	    var Utility = __webpack_require__(50);
	    var Entity = __webpack_require__(37);
	    var ViewSequence = __webpack_require__(41);
	    var OptionsManager = __webpack_require__(34);
	    var LayoutUtility = __webpack_require__(13);
	    var LayoutNodeManager = __webpack_require__(38);
	    var LayoutNode = __webpack_require__(39);
	    var Transform = __webpack_require__(25);

	    /**
	     * @class
	     * @param {Object} options Options.
	     * @param {Function} [options.layout] Layout function to use.
	     * @param {Array|ViewSequence|Object} [options.dataSource] Array, ViewSequence or Object.
	     * @param {Utility.Direction} [options.direction] Direction to layout into (e.g. Utility.Direction.Y) (when ommited the default direction of the layout is used)
	     * @alias module:LayoutController
	     */
	    function LayoutController(options, createNodeFn) {

	        // Commit
	        this.id = Entity.register(this);
	        this._isDirty = true;
	        this._contextSizeCache = [0, 0];
	        this._commitOutput = {};

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

	        // Create node manager that manages result LayoutNode instances
	        this._nodes = new LayoutNodeManager(createNodeFn || function(renderNode) {
	            return new LayoutNode(renderNode);
	        });

	        // Apply options
	        if (options && options.dataSource) {
	            this.setDataSource(options.dataSource);
	        }
	        if (options && (options.layout || options.layoutOptions)) {
	            this.setLayout(options.layout, options.layoutOptions);
	        }
	        if (options && (options.direction !== undefined)) {
	            this.setDirection(options.direction);
	        }
	        else {
	            this.setDirection(undefined);
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
	        this._nodesById = undefined;
	        if (dataSource instanceof Array) {
	            this._viewSequence = new ViewSequence(dataSource);
	        } else if (dataSource instanceof ViewSequence) {
	            this._viewSequence = dataSource;
	        } else if (dataSource instanceof Object){
	            this._nodesById = dataSource;
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
	            this._layout.function = layout;
	            this._layout.capabilities = layout.Capabilities;
	            this._layout.literal = undefined;

	        // If the layout is an object, treat it as a layout-literal
	        } else if (layout instanceof Object) {
	            this._layout.literal = layout;
	            this._layout.capabilities = undefined; // todo - derive from literal somehow?
	            var helperName = Object.keys(layout)[0];
	            var Helper = LayoutUtility.getRegisteredHelper(helperName);
	            this._layout.function = Helper ? function(context, options) {
	                var helper = new Helper(context, options);
	                helper.parse(layout[helperName]);
	            } : undefined;
	        }
	        else {
	            this._layout.function = undefined;
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
	        return this._layout.literal || this._layout.function;
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
	     * Moves to the next node in the viewSequence.
	     *
	     * @param {Number} [amount] Amount of nodes to move
	     * @return {LayoutController} this
	     */
	    LayoutController.prototype.scroll = function(amount) {
	        if (this._viewSequence) {
	            for (var i = 0; i < Math.abs(amount); i++) {
	                var viewSequence = (amount > 0) ? this._viewSequence.getNext() : this._viewSequence.getPrevious();
	                if (viewSequence) {
	                    this._viewSequence = viewSequence;
	                    this._isDirty = true;
	                }
	                else {
	                    break;
	                }
	            }
	        }
	        return this;
	    };

	    /**
	     * Get the spec (size, transform, etc..) for the given renderable or
	     * Id.
	     *
	     * @param {Renderable|String} node Renderabe or Id to look for
	     * @return {Spec} spec or undefined
	     */
	    LayoutController.prototype.getSpec = function(node) {
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
	        for (var i = 0; i < this._commitOutput.target.length; i++) {
	            var spec = this._commitOutput.target[i];
	            if (spec.renderNode === node) {
	                return spec;
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

	        // When the size or layout function has changed, reflow the layout
	        if (size[0] !== this._contextSizeCache[0] ||
	            size[1] !== this._contextSizeCache[1] ||
	            this._isDirty ||
	            this._nodes._trueSizeRequested){

	            // Update state
	            this._contextSizeCache[0] = size[0];
	            this._contextSizeCache[1] = size[1];
	            this._isDirty = false;

	            // Prepare for layout
	            var layoutContext = this._nodes.prepareForLayout(
	                this._viewSequence,     // first node to layout
	                this._nodesById, {      // so we can do fast id lookups
	                    size: size,
	                    direction: this._direction
	                }
	            );

	            // Layout objects
	            if (this._layout.function) {
	                this._layout.function(
	                    layoutContext,          // context which the layout-function can use
	                    this._layout.options    // additional layout-options
	                );
	            }

	            // Update output
	            this._commitOutput.target = this._nodes.buildSpecAndDestroyUnrenderedNodes();
	        }

	        // Render child-nodes every commit
	        for (var i = 0; i < this._commitOutput.target.length; i++) {
	            this._commitOutput.target[i].target = this._commitOutput.target[i].renderNode.render();
	        }

	        // Return
	        if (size) {
	            transform = Transform.moveThen([-size[0]*origin[0], -size[1]*origin[1], 0], transform);
	        }
	        this._commitOutput.size = size;
	        this._commitOutput.opacity = opacity;
	        this._commitOutput.transform = transform;
	        return this._commitOutput;
	    };

	    module.exports = LayoutController;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 11 */
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

	/*global define*/
	/*eslint no-use-before-define:0 */

	/**
	 * FlowLayoutController transitions renderables smoothly from one
	 * layout to another. When the data-source or layout is changed,
	 * the renderables are transitioned from their old state (size,
	 * transform, origin, etc..) to the new state.
	 *
	 * Inherited from: [LayoutController](./LayoutController.md)
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {

	    // import dependencies
	    var LayoutController = __webpack_require__(10);
	    var OptionsManager = __webpack_require__(34);
	    var ViewSequence = __webpack_require__(41);
	    var FlowLayoutNode = __webpack_require__(35);
	    var LayoutUtility = __webpack_require__(13);
	    var Transform = __webpack_require__(25);

	    /**
	     * @class
	     * @extends LayoutController
	     * @param {Object} options Options.
	     * @param {Function} [options.layout] Layout function to use.
	     * @param {Array|ViewSequence|Object} [options.dataSource] Array, ViewSequence or Object.
	     * @param {Utility.Direction} [options.direction] Direction to layout into (e.g. Utility.Direction.Y) (when ommited the default direction of the layout is used)
	     * @param {Number} [options.showOpacity] Opacity to use when showing renderables (default: 1)
	     * @param {Spec} [options.insertSpec] Default spec to use when animating renderables into the scene (default: opacity=0)
	     * @param {Spec} [options.removeSpec] Default spec to use when animating renderables out of the scene (default: opacity=0)
	     * @alias module:FlowLayoutController
	     */
	    function FlowLayoutController(options) {
	        LayoutController.call(this, options, function(renderNode, spec) {
	            return new FlowLayoutNode(renderNode, spec || this.options.insertSpec);
	        }.bind(this));

	        // Set options
	        this.options = Object.create(this.constructor.DEFAULT_OPTIONS || FlowLayoutController.DEFAULT_OPTIONS);
	        this._optionsManager = new OptionsManager(this.options);
	        if (options) {
	            this.setOptions(options);
	        }
	    }
	    FlowLayoutController.prototype = Object.create(LayoutController.prototype);
	    FlowLayoutController.prototype.constructor = FlowLayoutController;

	    FlowLayoutController.DEFAULT_OPTIONS = {
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
	    };

	    /**
	     * Patches the FlowLayoutController instance's options with the passed-in ones.
	     *
	     * @param {Options} options An object of configurable options for the FlowLayoutController instance.
	     * @param {Number} [options.showOpacity] Opacity to use when showing renderables (default: 1)
	     * @param {Spec} [options.insertSpec] Default spec to use when animating renderables into the scene (default: opacity=0)
	     * @param {Spec} [options.removeSpec] Default spec to use when animating renderables out of the scene (default: opacity=0)
	     * @return {FlowLayoutController} this
	     */
	    FlowLayoutController.prototype.setOptions = function setOptions(options) {
	        this._optionsManager.setOptions(options);
	        return this;
	    };

	    /**
	     * Inserts a renderable into the data-source. If the renderable is visible
	     * then it is inserted using an animation.
	     *
	     * @param {Number|String} indexOrId Index within dataSource array or id (String)
	     * @param {Object} renderable Rendeable to add to the data-source
	     * @param {Spec} [spec] Size, transform, etc.. to start with when inserting
	     * @return {FlowLayoutController} this
	     */
	    FlowLayoutController.prototype.insert = function(indexOrId, renderable, spec) {

	        // Add the renderable in case of an id (String)
	        if ((indexOrId instanceof String) || (typeof indexOrId === 'string')) {

	            // Create data-source if neccesary
	            if (this._dataSource === undefined) {
	                this._dataSource = {};
	                this._nodesById = this._dataSource._dataSource;
	            }

	            // Insert renderable
	            this._nodesById[indexOrId] = renderable;
	        }

	        // Add the renderable using an index
	        else {

	            // Create data-source if neccesary
	            if (this._dataSource === undefined) {
	                this._dataSource = [];
	                this._viewSequence = new ViewSequence(this._dataSource);
	            }

	            // Using insert in this way, only works when the data-source is an array
	            if (!(this._dataSource instanceof Array)) {
	                LayoutUtility.error('FlowLayoutController.insert(index) only works when the dataSource is an array');
	                return this;
	            }

	            // Insert into array
	            if (indexOrId < 0) {
	                this._dataSource.push(renderable);
	            }
	            else {
	                this._dataSource.splice(indexOrId, 0, renderable);
	            }
	        }

	        // When a custom insert-spec was specified, store that in the layout-node
	        if (spec) {
	            this._nodes.insertNode(this._nodes.createNode(renderable, spec));
	        }

	        // Force a reflow
	        this._isDirty = true;

	        return this;
	    };

	    /**
	     * Removes a renderable from the data-source. If the renderable is visible
	     * then it will be removed using an animation.
	     *
	     * @param {Number|String} indexOrId Index within dataSource array or id (String)
	     * @param {Spec} [spec] Size, transform, etc.. to end with when removing
	     * @return {FlowLayoutController} this
	     */
	    FlowLayoutController.prototype.remove = function(indexOrId, spec) {

	        // Remove the renderable in case of an id (String)
	        var renderNode;
	        if ((indexOrId instanceof String) || (typeof indexOrId === 'string')) {

	            // Find and remove renderable from data-source
	            renderNode = this._nodesById[indexOrId];
	            if (renderNode) {
	                delete this._nodesById[indexOrId];
	            }
	        }

	        // Remove the renderable using an index
	        else {

	            // Using remove in this way, only works when the data-source is an array
	            if (!(this._dataSource instanceof Array)) {
	                LayoutUtility.error('FlowLayoutController.remove(index) only works when the dataSource is an array');
	                return this;
	            }

	            // Remove from array
	            renderNode = this._dataSource.splice(indexOrId, 1)[0];
	        }

	        // When a custom remove-spec was specified, store that in the layout-node
	        if (renderNode && spec) {
	            var layoutNode = this._nodes.getNodeByRenderNode(renderNode);
	            if (layoutNode) {
	                layoutNode.remove(spec || this.options.removeSpec);
	            }
	        }

	        // Force a reflow
	        if (renderNode) {
	            this._isDirty = true;
	        }

	        return this;
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
	    FlowLayoutController.prototype.commit = function commit(context) {
	        var transform = context.transform;
	        var origin = context.origin;
	        var size = context.size;
	        var opacity = context.opacity;

	        // When the size or layout function has changed, reflow the layout
	        if (size[0] !== this._contextSizeCache[0] ||
	            size[1] !== this._contextSizeCache[1] ||
	            this._isDirty ||
	            this._nodes._trueSizeRequested) {

	            // Update state
	            this._contextSizeCache[0] = size[0];
	            this._contextSizeCache[1] = size[1];
	            this._isDirty = false;

	            // Prepare for layout
	            var layoutContext = this._nodes.prepareForLayout(
	                this._viewSequence,     // first node to layout
	                this._nodesById, {      // so we can do fast id lookups
	                    size: size,
	                    direction: this._direction
	                }
	            );

	            // Layout objects
	            if (this._layout.function) {
	                this._layout.function(
	                    layoutContext,          // context which the layout-function can use
	                    this._layout.options    // additional layout-options
	                );
	            }

	            // Mark non-invalidated nodes for removal
	            this._nodes.removeNonInvalidatedNodes(this.options.removeSpec);
	        }

	        // Update output
	        this._commitOutput.target = this._nodes.buildSpecAndDestroyUnrenderedNodes();

	        // Render child-nodes every commit
	        for (var i = 0; i < this._commitOutput.target.length; i++) {
	            this._commitOutput.target[i].target = this._commitOutput.target[i].renderNode.render();
	        }

	        // Return
	        if (size) {
	            transform = Transform.moveThen([-size[0]*origin[0], -size[1]*origin[1], 0], transform);
	        }
	        this._commitOutput.size = size;
	        this._commitOutput.opacity = opacity;
	        this._commitOutput.transform = transform;
	        return this._commitOutput;
	    };

	    module.exports = FlowLayoutController;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 12 */
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

	/*global define, console*/
	/*eslint no-use-before-define:0, no-console:0 */

	/**
	 * TODO
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {

	    // import dependencies
	    var LayoutController = __webpack_require__(11);
	    var ContainerSurface = __webpack_require__(42);
	    var Transform = __webpack_require__(25);
	    var EventHandler = __webpack_require__(36);
	    var Vector = __webpack_require__(43);
	    var PhysicsEngine = __webpack_require__(44);
	    var Particle = __webpack_require__(45);
	    var Drag = __webpack_require__(46);
	    var Spring = __webpack_require__(47);
	    var ScrollSync = __webpack_require__(48);
	    var TouchSync = __webpack_require__(49);

	    /**
	     * Boudary reached detection
	     */
	    var Bounds = {
	        NONE: 0,
	        FIRST: 1,
	        LAST: 2,
	        BOTH: 3
	    };

	    /**
	     * @class
	     * @param {Object} options Options.
	     * @alias module:ScrollView
	     */
	    function ScrollView(options, createNodeFn) {
	        LayoutController.call(this, options);

	        // Scrolling
	        this._scroll = {
	            moveOffset: 0,
	            scrollDelta: 0,
	            // physics-engine to use for scrolling
	            pe: new PhysicsEngine(),
	            // particle that represents the scroll-offset
	            particle: new Particle({
	                axis: Particle.AXES.X,
	                position: [0, 0]
	            }),
	            // drag-force that slows the particle down after a "flick"
	            dragForce: new Drag(this.options.scrollDrag),
	            // spring-force that acts upon the particle to ensure that
	            // the particle doesn't scroll past the edges
	            edgeSpringVector: new Vector([0, 0, 0]),
	            edgeSpringForce: new Spring(this.options.edgeSpring)
	        };

	        // Configure physics engine with particle and drag
	        this._scroll.pe.addBody(this._scroll.particle);
	        this._scroll.dragForceId = this._scroll.pe.attach(this._scroll.dragForce, this._scroll.particle);
	        this._scroll.edgeSpringForce.setOptions({ anchor: this._scroll.edgeSpringVector });

	        // Setup event handlers
	        this._eventInput = new EventHandler();
	        this._eventOutput = new EventHandler();
	        EventHandler.setInputHandler(this, this._eventInput);
	        EventHandler.setOutputHandler(this, this._eventOutput);

	        // Listen to scroll and touch events
	        this._touchSync = new TouchSync(this.options.touchSync);
	        this._eventInput.pipe(this._touchSync);
	        //this._touchSync.pipe(this._eventInput);
	        this._touchSync.on('start', _moveStart.bind(this, this._touchSync));
	        this._touchSync.on('update', _moveUpdate.bind(this, this._touchSync));
	        this._touchSync.on('end', _moveEnd.bind(this, this._touchSync));

	        // Listen to mouse-wheel events
	        this._scrollSync = new ScrollSync(this.options.scrollSync);
	        this._eventInput.pipe(this._scrollSync);
	        //this._scrollSync.on('start', _moveStart.bind(this, this._scrollSync));
	        this._scrollSync.on('update', _moveUpdate.bind(this, this._scrollSync));
	        //this._scrollSync.on('end', _moveEnd.bind(this, this._scrollSync));

	        // Embed in container surface if neccesary
	        if (this.options.useContainer) {
	            this.container = new ContainerSurface({
	                properties: {overflow : 'hidden'}
	            });

	            // Create container surface, which has one child, which just returns
	            // the entity-id of this scrollview. This causes the Commit function
	            // of this scrollview to be called
	            this.container.add({
	                render: function() {
	                    return this.id;
	                }.bind(this)
	            });

	            // Pipe events received in container to this scrollview
	            this.subscribe(this.container);
	            EventHandler.setInputHandler(this.container, this);
	            EventHandler.setOutputHandler(this.container, this);
	        }
	    }
	    ScrollView.prototype = Object.create(LayoutController.prototype);
	    ScrollView.prototype.constructor = ScrollView;

	    ScrollView.DEFAULT_OPTIONS = {
	        offsetRounding: 0.2,
	        scrollDrag: {
	            strength : 0.002
	        },
	        edgeSpring: {
	            dampingRatio: 0.8,
	            period: 300
	        },
	        scrollSync: {
	            scale: 0.1
	        }
	        //touchSync: {}
	    };

	    /*function _verifyIntegrity() {
	        if ((this._scroll.moveStart !== undefined) && isNaN(this._scroll.moveStart)) {
	            throw 'moveStart';
	        }
	        if ((this._scroll.moveOffset !== undefined) && isNaN(this._scroll.moveOffset)) {
	            throw 'hey goffer';
	        }
	        if ((this._scroll.scrollDelta !== undefined) && isNaN(this._scroll.scrollDelta)) {
	            throw 'hey goffer';
	        }
	        if ((this._scroll.edgeSpringOffset !== undefined) && isNaN(this._scroll.edgeSpringOffset)) {
	            throw 'hey goffer';
	        }
	        if (isNaN(this._scroll.particle.getVelocity1D(0))) {
	            throw 'hey goffer';
	        }
	        if (isNaN(this._scroll.particle.getPosition1D(0))) {
	            throw 'hey goffer';
	        }
	    }*/

	    /**
	     * Called whenever the user starts moving the scroll-view, using either
	     * touch-gestures, mouse-drags or mouse-scroll.
	     */
	    function _moveStart(sync, event) {
	        if (sync === this._touchSync) {
	            this._scroll.moveStart = Array.isArray(event.position) ? event.position[this._direction] : event.position;
	        } else if (sync === this._scrollSync) {
	            this._scroll.scrollDelta += Array.isArray(event.delta) ? event.delta[this._direction] : event.delta;
	        }
	        this._scroll.particle.setVelocity1D(0);
	    }

	    /**
	     * Called whenever the user is moving the scroll-view, using either
	     * touch-gestures, mouse-drags or mouse-scroll.
	     */
	    function _moveUpdate(sync, event) {
	        if (sync === this._touchSync) {
	            this._scroll.moveOffset = event.position[this._direction] - this._scroll.moveStart;
	        } else if (sync === this._scrollSync) {
	            this._scroll.scrollDelta += Array.isArray(event.delta) ? event.delta[this._direction] : event.delta;
	            this._scroll.particle.setVelocity1D(0);
	        }
	    }

	    /**
	     * Called whenever the user has stopped moving the scroll-view, using either
	     * touch-gestures, mouse-drags or mouse-scroll.
	     */
	    function _moveEnd(sync, event) {
	        if (sync === this._touchSync) {
	            this._scroll.particle.setPosition1D(this._scroll.particle.getPosition1D() + this._scroll.moveOffset);
	            if (event.velocity !== undefined) {
	                this._scroll.particle.setVelocity1D(Array.isArray(event.velocity) ? event.velocity[this._direction] : event.velocity);
	            }
	            this._scroll.moveOffset = 0;
	            this._scroll.moveStart = undefined;
	        } else if (sync === this._scrollSync) {
	            this._scroll.scrollDelta += Array.isArray(event.delta) ? event.delta[this._direction] : event.delta;
	            this._scroll.particle.setVelocity1D(0);
	        }
	    }

	    function _roundScrollOffset(scrollOffset) {
	        return Math.round(scrollOffset / this.options.offsetRounding) * this.options.offsetRounding;
	    }

	    /**
	     * Get the scroll position particle position. The position is rounded according to
	     * the `options.scrollRounding` option.
	     */
	    function _getParticlePosition() {
	        return _roundScrollOffset.call(this, this._scroll.particle.getPosition1D());
	    }

	    /**
	     * Get the in-use scroll-offset.
	     */
	    function _getScrollOffset() {

	        // When scrolling using the mouse-wheel, halt at the boundary entirely
	        if ((this._scroll.scrollDelta > 0) && (this._scroll.boundsReached & Bounds.FIRST)) {
	            //console.log('ignoring scroll-delta, top-reached: ' + this._scroll.scrollDelta);
	            this._scroll.scrollDelta = 0;
	        } else if ((this._scroll.scrollDelta < 0) && (this._scroll.boundsReached & Bounds.LAST)) {
	            //console.log('ignoring scroll-delta, bottom-reached: ' + this._scroll.scrollDelta);
	            this._scroll.scrollDelta = 0;
	        }

	        // Calculate new offset
	        return _getParticlePosition.call(this) + this._scroll.moveOffset + this._scroll.scrollDelta;
	    }

	    /**
	     * Helper function that looks up a spec/index for a view-sequence node
	     * in the given specs-array.
	     */
	    function _lookupSpecByViewSequence(specs, viewSequence, getIndex, startIndex) {
	        // todo - use start-index
	        if (!viewSequence) {
	            return getIndex ? -1 : undefined;
	        }
	        var renderNode = viewSequence.get();
	        if (!renderNode) {
	            return getIndex ? -1 : undefined;
	        }
	        for (var i = 0; i < specs.length; i++) {
	            if (specs[i].renderNode === renderNode) {
	                return getIndex ? i : specs[i];
	            }
	        }
	        return getIndex ? -1 : undefined;
	    }

	    /**
	     * Normalizes the scroll-offset so that scroll-offset is as close
	     * to 0 as can be. This function modifies the scrollOffset and the
	     * viewSeuqnce so that the least possible view-sequence nodes
	     * need to be rendered.
	     *
	     * I.e., when the scroll-offset is changed, e.g. by scrolling up
	     * or down, then renderables may end-up outside the visible range.
	     */
	    function _normalizeScrollOffset(size, scrollOffset) {
	        if (!this._viewSequence) {
	            return scrollOffset;
	        }

	        // Prepare
	        var specs = this._commitOutput.target;
	        var startSpecIndex = _lookupSpecByViewSequence(specs, this._viewSequence, true);
	        var sequenceNode;
	        if (scrollOffset >= 0) {

	            // Move scroll-offset up as long as view-sequence nodes
	            // are not visible.
	            sequenceNode = this._viewSequence.getPrevious();
	            while (sequenceNode && sequenceNode.get()) {

	                // Get previous spec and check whether it can be normalized
	                var spec = _lookupSpecByViewSequence(specs, sequenceNode, false, startSpecIndex);
	                if (!spec || spec.trueSizeRequested) {
	                    return scrollOffset;
	                }

	                // Check whether previous node is still visible
	                var specOffset = spec.transform[12 + this._direction];
	                var specSize = spec.size[this._direction];
	                if ((specOffset + specSize) < 0) {
	                    return scrollOffset; // previous is not visible, stop normalize
	                }

	                // Normalize and make this the first visible node
	                this._viewSequence = sequenceNode;
	                this._scroll.particle.setPosition1D(this._scroll.particle.getPosition1D() - specSize);
	                scrollOffset -= specSize;
	                //console.log('normalized prev-node with size: ' + specSize);

	                // Move to previous node
	                sequenceNode = this._viewSequence.getPrevious();
	            }
	        }
	        else {

	            // Don't normalize when the end has been reached
	            var lastSpec = this._commitOutput.target[this._commitOutput.target.length - 1];
	            var lastSpecOffset = lastSpec.transform[12 + this._direction];
	            var lastSpecSize = lastSpec.size[this._direction];
	            if ((lastSpecOffset + lastSpecSize) < size[this._direction]) {
	                return scrollOffset;
	            }

	            // Move scroll-offset down as long as view-sequence nodes
	            // are not visible.
	            var prevSequenceNode = this._viewSequence;
	            sequenceNode = prevSequenceNode.getNext();
	            while (sequenceNode && sequenceNode.get()) {

	                // Get previous spec and check whether it can be normalized
	                var prevSpec = _lookupSpecByViewSequence(specs, prevSequenceNode, false, startSpecIndex);
	                if (!prevSpec || prevSpec.trueSizeRequested) {
	                    return scrollOffset;
	                }

	                // Check whether previous node is still visible
	                var prevSpecOffset = prevSpec.transform[12 + this._direction];
	                var prevSpecSize = prevSpec.size[this._direction];
	                if ((prevSpecOffset + prevSpecSize) >= 0) {
	                    return scrollOffset; // yes it is visible, stop normalize
	                }

	                // Normalize and make this the first visible node
	                this._viewSequence = sequenceNode;
	                this._scroll.particle.setPosition1D(this._scroll.particle.getPosition1D() + prevSpecSize);
	                scrollOffset += prevSpecSize;
	                //console.log('normalized next-node with size: ' + prevSpecSize);

	                // Move to next node
	                prevSequenceNode = sequenceNode;
	                sequenceNode = this._viewSequence.getNext();
	            }
	        }

	        return scrollOffset;
	    }

	    /**
	     * Calculates whether a boundary exists for either the prev or next direction.
	     * When no boundary exists, undefined is returned. When a boundary does exist,
	     * 0 is returned for the prev-direction and (size - size-of-last-renderable)
	     * is returned for the next direction.
	     *
	     * NOTE: This function assumes that the scroll-offset/current view-sequence
	     *       has been normalized.
	     */
	    function _calculateBoundsReached(size, scrollOffset) {

	        // Prepare
	        var specs = this._commitOutput.target;
	        var spec;
	        var specSize;
	        var specOffset;

	        // Check whether the top was reached
	        var prevReached = this._nodes.endReached(true);
	        this._scroll.boundsReached = !this._viewSequence ? Bounds.FIRST : Bounds.NONE;
	        if (specs.length && (prevReached && (scrollOffset >= 0))) {
	            spec = specs[0];
	            specOffset = spec.transform[12 + this._direction];
	            if (specOffset >= 0) {
	                this._scroll.boundsReached |= Bounds.FIRST;
	            }
	        }

	        // Check whether the bottom was reached
	        var startSpecIndex = _lookupSpecByViewSequence(specs, this._viewSequence, true);
	        var sequenceNode = this._viewSequence;
	        while (sequenceNode && sequenceNode.get()) {
	            spec = _lookupSpecByViewSequence(specs, sequenceNode, false, startSpecIndex);
	            if (!spec || spec.trueSizeRequested) {
	                return;
	            }
	            sequenceNode = sequenceNode.getNext();
	        }

	        // When the last item is still partially visible, then the end is not
	        // yet reached.
	        specOffset = spec.transform[12 + this._direction];
	        specSize = spec.size[this._direction];
	        if ((specOffset + specSize) > size[this._direction]) {
	            return;
	        }
	        if (prevReached) {
	            this._scroll.boundsReached |= Bounds.FIRST;
	        }

	        // End reached
	        this._scroll.lastScrollOffset = (size[this._direction] - (specOffset + specSize)) + scrollOffset;
	        this._scroll.boundsReached |= Bounds.LAST;
	    }

	    /**
	     * When the boundaries are reached, set a spring which pulls on the particle
	     * and ensures that the boundary is not exceeded.
	     */
	    function _updateEdgeSpring(edgeSpringOffset, scrollOffset) {

	        // Update edge-spring
	        if (edgeSpringOffset === this._scroll.edgeSpringOffset) {
	            return;
	        }
	        this._scroll.edgeSpringOffset = edgeSpringOffset;
	        if (edgeSpringOffset === undefined) {
	            if (this._scroll.edgeSpringForceId) {
	                this._scroll.pe.detach(this._scroll.edgeSpringForceId);
	                this._scroll.edgeSpringForceId = undefined;
	                //console.log('disabled edge-spring');
	            }
	        }
	        else {
	            if (!this._scroll.edgeSpringForceId) {
	                this._scroll.edgeSpringForceId = this._scroll.pe.attach(this._scroll.edgeSpringForce, this._scroll.particle);
	            }
	            this._scroll.edgeSpringVector.set([edgeSpringOffset, 0, 0]);
	            //console.log('setting edge-spring to: ' + edgeSpringOffset);

	            // Integrate move-offset into particle, so that the particle matches the same
	            // position as the edge-spring.
	            if (this._scroll.moveStart !== undefined) {
	                var particleOffset = scrollOffset - (this._scroll.moveOffset + this._scroll.scrollDelta);
	                var diff = particleOffset - edgeSpringOffset;
	                this._scroll.particle.setPosition1D(edgeSpringOffset);
	                this._scroll.moveStart -= diff;
	                this._scroll.moveOffset -= diff;
	            }
	        }
	    }

	    /**
	     * When the boundaries are reached, set a spring which pulls on the particle
	     * and ensures that the boundary is not exceeded.
	     */
	    function _updateBounds(size, scrollOffset) {

	        // Check whether the top or bottom has been reached (0: top, 1: bottom)
	        var boundsReached = this._scroll.boundsReached;
	        _calculateBoundsReached.call(this, size, scrollOffset);
	        if (this._scroll.boundsReached !== boundsReached) {
	            //console.log('bounds reached changed: ' + this._scroll.boundsReached);
	        }

	        // Calculate new edge spring offset
	        var edgeSpringOffset;
	        if (this._scroll.boundsReached & Bounds.FIRST) {
	            edgeSpringOffset = 0;
	        } else if (this._scroll.boundsReached & Bounds.LAST) {
	            edgeSpringOffset = this._scroll.lastScrollOffset;
	        }

	        // Update the edge spring
	        _updateEdgeSpring.call(this, edgeSpringOffset, scrollOffset);
	    }

	    /**
	     * Integrates the scroll-delta (mouse-wheel) ino the particle position.
	     */
	    function _integrateScrollDelta(scrollOffset) {

	        // Check if we need to integrate
	        if (!this._scroll.scrollDelta) {
	            return scrollOffset;
	        }

	        // Ensure that the new position doesn't exceed the boundaries
	        var newOffset = scrollOffset - this._scroll.moveOffset;
	        if (this._scroll.boundsReached & Bounds.FIRST){
	            newOffset = 0;
	        } else if (this._scroll.boundsReached & Bounds.LAST){
	            newOffset = Math.max(this._scroll.lastScrollOffset, newOffset);
	        }

	        // Integrate delta and update particle
	        this._scroll.particle.setPosition1D(newOffset);
	        this._scroll.particle.setVelocity1D(0);
	        this._scroll.scrollDelta = 0;

	        // When the offset as adjusted (because a boundary was reached), return
	        // true so that the layout-function re-layouts.
	        return newOffset + this._scroll.moveOffset;
	    }

	    /**
	     * Executes the layout and updates the state of the scrollview.
	     */
	    function _layout(size, scrollOffset) {
	        //console.log('doing layout, particle: ' + _getParticlePosition.call(this), ', moveOffset: ' + this._scroll.moveOffset + ', delta: ' + this._scroll.scrollDelta);

	        // Prepare for layout
	        var layoutContext = this._nodes.prepareForLayout(
	            this._viewSequence,     // first node to layout
	            this._nodesById, {      // so we can do fast id lookups
	                size: size,
	                direction: this._direction,
	                scrollOffset: scrollOffset
	            }
	        );

	        // Layout objects
	        if (this._layout.function) {
	            this._layout.function(
	                layoutContext,          // context which the layout-function can use
	                this._layout.options    // additional layout-options
	            );
	        }

	        // Mark non-invalidated nodes for removal
	        this._nodes.removeNonInvalidatedNodes(this.options.removeSpec);

	        // Calculate the spec-output
	        this._commitOutput.target = this._nodes.buildSpecAndDestroyUnrenderedNodes(this._direction);

	        // Normalize scroll offset so that the current viewsequence node is as close to the
	        // top as possible and the layout function will need to process the least amount
	        // of renderables.
	        scrollOffset = _normalizeScrollOffset.call(this, size, scrollOffset);

	        // Update bounds
	        _updateBounds.call(this, size, scrollOffset);

	        // Integrate the scroll-delta into the particle position.
	        var newOffset = _integrateScrollDelta.call(this, scrollOffset);
	        if (newOffset !== scrollOffset) {
	            //console.log('re-layout after delta integration: ' + scrollOffset + ' != ' + newOffset);
	            _layout.call(this, size, newOffset);
	        }
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
	    ScrollView.prototype.commit = function commit(context) {
	        var transform = context.transform;
	        var origin = context.origin;
	        var size = context.size;
	        var opacity = context.opacity;
	        var scrollOffset = _getScrollOffset.call(this);

	        // When the size or layout function has changed, reflow the layout
	        if (size[0] !== this._contextSizeCache[0] ||
	            size[1] !== this._contextSizeCache[1] ||
	            this._isDirty ||
	            this._nodes._trueSizeRequested ||
	            this._scrollOffsetCache !== scrollOffset) {

	            // Update state
	            this._contextSizeCache[0] = size[0];
	            this._contextSizeCache[1] = size[1];
	            this._scrollOffsetCache = scrollOffset;
	            this._isDirty = false;

	            // Perform layout
	            _layout.call(this, size, scrollOffset);
	        }
	        else {
	            this._commitOutput.target = this._nodes.buildSpecAndDestroyUnrenderedNodes(this._direction);
	        }

	        // Render child-nodes every commit
	        for (var i = 0; i < this._commitOutput.target.length; i++) {
	            this._commitOutput.target[i].target = this._commitOutput.target[i].renderNode.render();
	        }

	        // Return
	        if (size) {
	            transform = Transform.moveThen([-size[0]*origin[0], -size[1]*origin[1], 0], transform);
	        }
	        this._commitOutput.size = size;
	        this._commitOutput.opacity = opacity;
	        this._commitOutput.transform = transform;
	        return this._commitOutput;
	    };

	    /**
	     * Generate a render spec from the contents of this component.
	     *
	     * @private
	     * @method render
	     * @return {number} Render spec for this component
	     */
	    ScrollView.prototype.render = function render() {
	        if (this.container) {
	            return this.container.render.apply(this.container, arguments);
	        }
	        else {
	            return this.id;
	        }
	    };

	    module.exports = ScrollView;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 13 */
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

	/*global define, console*/
	/*eslint no-console:0*/

	/**
	 * Utility class for famous-flex.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {

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
	    var zeroMargins = [0, 0, 0, 0];
	    LayoutUtility.normalizeMargins = function(margins) {
	        if (!margins || (margins.length === 0)) {
	            return zeroMargins;
	        } else if (margins.length === 1) {
	            return [margins[0], margins[0], margins[0], margins[0]];
	        } else if (margins.length === 2) {
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
	     * Clears the contents of a spec.
	     *
	     * @param {Spec} spec Spec to clear
	     * @return {Spec} spec
	     */
	    LayoutUtility.clearSpec = function(spec) {
	        delete spec.opacity;
	        delete spec.size;
	        delete spec.transform;
	        delete spec.origin;
	        delete spec.align;
	        return spec;
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
	     * @param {String|Array|Object} arguments arguments to stringify and concatenate
	     */
	    LayoutUtility.log = function() {
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
/* 14 */
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

	/*global define*/

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
	 *   dock.top('header', options.headerHeight);
	 *   dock.bottom('footer', options.footerHeight);
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
	 *     ['bottom', 'footer', 40],
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
	    var LayoutUtility = __webpack_require__(13);

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
	     * `[[rule, node, value], [rule, node, value], ...]`
	     *
	     * **Example:**
	     *
	     * ```JSON
	     * [
	     *   ['top': 'header', 50],
	     *   ['bottom': 'footer', 50],
	     *   ['fill', 'content']
	     * ]
	     * ```
	     *
	     * @param {Object} data JSON object
	     */
	    LayoutDockHelper.prototype.parse = function(data) {
	        for (var i = 0; i < data.length; i++) {
	            var rule = data[i];
	            var value = (data.length >= 3) ? rule[2] : undefined;
	            if (rule[0] === 'top') {
	                this.top(rule[1], value);
	            } else if (rule[0] === 'left') {
	                this.left(rule[1], value);
	            } else if (rule[0] === 'right') {
	                this.right(rule[1], value);
	            } else if (rule[0] === 'bottom') {
	                this.bottom(rule[1], value);
	            } else if (rule[0] === 'fill') {
	                this.fill(rule[1]);
	            }
	        }
	    };

	    /**
	     * Dock the node to the top.
	     *
	     * @param {LayoutNode|String} [node] layout-node to dock
	     * @param {Number} [height] height of the layout-node, when ommited the height of the node is used
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.top = function(node, height) {
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
	            translate: [this._left, this._top, this._z]
	        });
	        this._top += height;
	        return this;
	    };

	    /**
	     * Dock the node to the left
	     *
	     * @param {LayoutNode|String} [node] layout-node to dock
	     * @param {Number} [width] width of the layout-node, when ommited the width of the node is used
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.left = function(node, width) {
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
	            translate: [this._left, this._top, this._z]
	        });
	        this._left += width;
	        return this;
	    };

	    /**
	     * Dock the node to the bottom
	     *
	     * @param {LayoutNode|String} [node] layout-node to dock
	     * @param {Number} [height] height of the layout-node, when ommited the height of the node is used
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.bottom = function(node, height) {
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
	            translate: [this._left, -(this._size[1] - this._bottom), this._z]
	        });
	        this._bottom -= height;
	        return this;
	    };

	    /**
	     * Dock the node to the right.
	     *
	     * @param {LayoutNode|String} [node] layout-node to dock
	     * @param {Number} [width] width of the layout-node, when ommited the width of the node is used
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.right = function(node, width) {
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
	                translate: [-(this._size[0] - this._right), this._top, this._z]
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
	     * @return {LayoutDockHelper} this
	     */
	    LayoutDockHelper.prototype.fill = function(node) {
	        this._context.set(node, {
	            size: [this._right - this._left, this._bottom - this._top],
	            translate: [this._left, this._top, this._z]
	        });
	        return this;
	    };

	    // Register the helper
	    LayoutUtility.registerHelper('dock', LayoutDockHelper);

	    module.exports = LayoutDockHelper;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 15 */
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

	/*global define*/

	/**
	 * Lays-out renderables from left to right, in a grid with fixed number of
	 * columns and rows.
	 *
	 * |options|type|description|
	 * |---|---|---|
	 * |`cells`|Size|Number of cells: [columns, rows]|
	 * |`[gutter]`|Size|Gutter-space between renderables|
	 *
	 * Example:
	 *
	 * ```javascript
	 * var GridLayout = require('famous-flex/layouts/GridLayout');
	 *
	 * new LayoutController({
	 *   layout: GridLayout,
	 *   layoutOptions: {
	 *     cells: [10, 5],    // 10 columns, 5 rows
	 *     gutter: [20, 20],  // gutter of 20 pixels in between cells
	 *   },
	 *   dataSource: [
	 *     new Surface({content: 'item 1'}),
	 *     new Surface({content: 'item 2'}),
	 *     new Surface({content: 'item 3'})
	 *   ]
	 * })
	 * ```
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {

	    // import dependencies
	    var Utility = __webpack_require__(50);

	    // Define capabilities of this layout function
	    var capabilities = {
	        sequence: true,
	        direction: [Utility.Direction.Y, Utility.Direction.X],
	        scrolling: true
	    };

	    // Layout function
	    function GridLayout(context, options) {

	        // Do one-time stuff
	        var size = context.size;
	        var gutter = options.gutter || [0, 0];
	        var nodeSize = [
	            ((size[0] - gutter[0]) / options.cells[0]) - gutter[0],
	            ((size[1] - gutter[1]) / options.cells[1]) - gutter[1]
	        ];

	        // Define size and position of grid-item
	        function _layoutNode(node, col, row) {
	            context.set(node, {
	                size: nodeSize,
	                translate: [
	                    ((nodeSize[0] + gutter[0]) * col) + gutter[0],
	                    ((nodeSize[1] + gutter[1]) * row) + gutter[1],
	                    0
	                ]
	            });
	        }

	        // Create rows & columns
	        var row;
	        var col;
	        var node;
	        if (context.direction === Utility.Direction.Y) {
	            for (col = 0; col < options.cells[0]; col++) {
	                for (row = 0; row < options.cells[1]; row++) {
	                    node = context.next();
	                    if (!node) {
	                        return;
	                    }
	                    _layoutNode(node, col, row);
	                }
	            }
	        }
	        else {
	            for (row = 0; row < options.cells[1]; row++) {
	                for (col = 0; col < options.cells[0]; col++) {
	                    node = context.next();
	                    if (!node) {
	                        return;
	                    }
	                    _layoutNode(node, col, row);
	                }
	            }
	        }
	    }

	    GridLayout.Capabilities = capabilities;
	    module.exports = GridLayout;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 16 */
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

	/*global define*/

	/**
	 * Navigation-bar layout consisting of optionaly left and right items and a
	 * title in the middle.
	 *
	 * When no item-width is specified, the width of the renderable itsself is used.
	 *
	 * |options|type|description|
	 * |---|---|---|
	 * |`[margins]`|Margins|Margins to use (see Margins)|
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
	 * new LayoutController({
	 *   layout: NavBarLayout,
	 *   layoutOptions: {
	 *     margins: [5, 5, 5, 5], // margins to utilize
	 *     itemSpacer: 10,        // space in between items
	 *   },
	 *   dataSource: {
	 *     background: new Surface({properties: {backgroundColor: 'black'}}),
	 *     title: new Surface({content: 'My title'}),
	 *     leftItems:[
	 *       new Surface({content: 'left1'})
	 *     ],
	 *     rightItems: [
	 *       new Surface({content: 'rght1'}),
	 *       new Surface({content: 'rght2'})
	 *     ]
	 *   }
	 * })
	 * ```
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {

	    // import dependencies
	    var LayoutDockHelper = __webpack_require__(14);

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
/* 17 */
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

	/*global define*/

	/**
	 * Lays out a collection of renderables from top to bottom or left to right.
	 *
	 * |options|type|description|
	 * |---|---|---|
	 * |`[itemSize]`|Number|Height or width in pixels of the list-item|
	 *
	 * Example:
	 *
	 * ```javascript
	 * var ListLayout = require('famous-flex/layouts/ListLayout');
	 *
	 * new LayoutController({
	 *   layout: ListLayout,
	 *   layoutOptions: {
	 *     itemSize: 40,         // item has height of 40 pixels
	 *   },
	 *   dataSource: [
	 *     new Surface({content: 'item 1'}),
	 *     new Surface({content: 'item 2'}),
	 *     new Surface({content: 'item 3'})
	 *   ]
	 * })
	 * ```
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {

	    // import dependencies
	    var Utility = __webpack_require__(50);

	    // Define capabilities of this layout function
	    var capabilities = {
	        sequence: true,
	        direction: [Utility.Direction.Y, Utility.Direction.X],
	        scrolling: true,
	        trueSize: true
	    };

	    // Layout function
	    function ListLayout(context, options) {

	        // Prepare
	        var size = context.size;
	        var direction = context.direction;
	        var offset = context.scrollOffset;
	        var node;
	        var nodeSize;
	        var itemSize;

	        // Determine item-size or use true=size
	        if ((options.itemSize === true) || !options.hasOwnProperty('itemSize')) {
	            itemSize = true;
	        }
	        else {
	            itemSize = (options.itemSize === undefined) ? size[direction] : options.itemSize;
	        }

	        // Process all next nodes
	        while (offset < size[direction]) {
	            node = context.next();
	            if (!node) {
	                break;
	            }
	            nodeSize = (itemSize === true) ? context.resolveSize(node, size)[direction] : itemSize;
	            context.set(node, {
	                size: direction ? [size[0], nodeSize] : [nodeSize, size[1]],
	                translate: direction ? [0, offset, 0] : [offset, 0, 0]
	            });
	            offset += nodeSize;
	        }

	        // Process previous nodes
	        offset = context.scrollOffset;
	        while (offset > 0) {
	            node = context.prev();
	            if (!node) {
	                break;
	            }
	            nodeSize = options.itemSize || context.resolveSize(node, size)[direction];
	            context.set(node, {
	                size: direction ? [size[0], nodeSize] : [nodeSize, size[1]],
	                translate: direction ? [0, offset - nodeSize, 0] : [offset - nodeSize, 0, 0]
	            });
	            offset -= nodeSize;
	        }
	    }

	    ListLayout.Capabilities = capabilities;
	    module.exports = ListLayout;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 18 */
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

	/*global define*/

	/**
	 * Lays a collection of renderables from left to right, and when the right edge is reached,
	 * continues at the left of the next line.
	 *
	 * |options|type|description|
	 * |---|---|---|
	 * |`itemSize`|Size|Size of an item to layout|
	 * |`[gutter]`|Size|Gutter-space between renderables|
	 * |`[justify]`|Bool/Array.Bool|Justify the renderables accross the width/height|
	 *
	 * Example:
	 *
	 * ```javascript
	 * var CollectionLayout = require('famous-flex/layouts/CollectionLayout');
	 *
	 * new LayoutController({
	 *   layout: CollectionLayout,
	 *   layoutOptions: {
	 *     itemSize: [100, 100],  // item has width and height of 100 pixels
	 *     gutter: [5, 5],        // gutter of 5 pixels in between cells
	 *     justify: true          // justify the items neatly across the whole width and height
	 *   },
	 *   dataSource: [
	 *     new Surface({content: 'item 1'}),
	 *     new Surface({content: 'item 2'}),
	 *     new Surface({content: 'item 3'})
	 *   ]
	 * })
	 * ```
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {

	    // import dependencies
	    var Utility = __webpack_require__(50);

	    // Define capabilities of this layout function
	    var capabilities = {
	        sequence: true,
	        direction: [Utility.Direction.Y, Utility.Direction.X],
	        scrolling: true,
	        trueSize: true
	    };

	    function CollectionLayout(context, options) {

	        // Prepare
	        var size = context.size;
	        var direction = context.direction;
	        var lineDirection = (direction + 1) % 2;
	        var offset = context.scrollOffset;
	        var gutter = options.gutter || [0, 0];
	        var justify = Array.isArray(options.justify) ? options.justify : (options.justify ? [true, true] : [false, false]);
	        var node;
	        var nodeSize;
	        var itemSize;
	        var lineLength;
	        var lineNodes = [];

	        // Prepare item-size
	        if (!options.itemSize) {
	            itemSize = [true, true]; // when no item-size specified, use size from renderables
	        } else if ((options.itemSize[0] === undefined) || (options.itemSize[0] === undefined)){
	            // resolve 'undefined' into a fixed size
	            itemSize = [
	                (options.itemSize[0] === undefined) ? size[0] : options.itemSize[0],
	                (options.itemSize[1] === undefined) ? size[1] : options.itemSize[1]
	            ];
	        }
	        else {
	            itemSize = options.itemSize;
	        }

	        /**
	         * Lays out the renderables in a single line. Taking into account
	         * the following variables:
	         * - true-size
	         * - gutter
	         * - justify
	         * - center align
	         */
	        function _layoutLine() {

	            // Determine size of the line
	            var i;
	            var lineSize = [0, 0];
	            lineSize[lineDirection] = gutter[lineDirection];
	            for (i = 0; i < lineNodes.length; i++) {
	                lineSize[direction] = Math.max(lineSize[direction], lineNodes[i].size[direction]);
	                lineSize[lineDirection] += lineNodes[i].size[lineDirection] + gutter[lineDirection];
	            }

	            // Layout nodes from left to right or top to bottom
	            var translate = [0, 0, 0];
	            var justifyOffset = justify[lineDirection] ? ((size[lineDirection] - lineSize[lineDirection]) / (lineNodes.length * 2)) : 0;
	            var lineOffset = gutter[lineDirection] + justifyOffset;
	            for (i = 0; i < lineNodes.length; i++) {
	                var lineNode = lineNodes[i];
	                translate[lineDirection] = lineOffset;
	                translate[direction] = offset; // TODO
	                context.set(lineNode.node, {
	                    size: lineNode.size,
	                    translate: translate
	                });
	                lineOffset += lineNode.size[lineDirection] + gutter[lineDirection] + (justifyOffset * 2);
	            }

	            // Prepare for next line
	            lineNodes = [];
	            return lineSize[direction] + gutter[direction];
	        }

	        /**
	         * Helper function to resolving the size of a node.
	         */
	        function _resolveNodeSize(node) {
	            if ((itemSize[0] === true) || (itemSize[1] === true)) {
	                var result = context.resolveSize(node, size);
	                if (itemSize[0] !== true) {
	                    result[0] = itemSize[0];
	                }
	                if (itemSize[1] !== true) {
	                    result[1] = itemSize[1];
	                }
	                return result;
	            }
	            else {
	                return itemSize;
	            }
	        }

	        /**
	         * Process all next nodes
	         */
	        lineLength = gutter[lineDirection];
	        while (offset < size[direction]) {
	            node = context.next();
	            if (!node) {
	                _layoutLine();
	                break;
	            }
	            nodeSize = _resolveNodeSize(node);
	            lineLength += nodeSize[lineDirection] + gutter[lineDirection];
	            if (lineLength > size[lineDirection]) {
	                offset += _layoutLine();
	                lineLength = gutter[lineDirection] + nodeSize[lineDirection] + gutter[lineDirection];
	            }
	            lineNodes.push({node: node, size: nodeSize});
	        }

	        /**
	         * Process previous nodes
	         */
	        offset = context.scrollOffset;
	        lineLength = gutter[lineDirection];
	        while (offset > 0) {
	            node = context.prev();
	            if (!node) {
	                _layoutLine();
	                break;
	            }
	            nodeSize = _resolveNodeSize(node);
	            lineLength += nodeSize[lineDirection] + gutter[lineDirection];
	            if (lineLength > size[lineDirection]) {
	                offset -= _layoutLine();
	                lineLength = gutter[lineDirection] + nodeSize[lineDirection] + gutter[lineDirection];
	            }
	            lineNodes.unshift({node: node, size: nodeSize});
	        }
	    }

	    CollectionLayout.Capabilities = capabilities;
	    module.exports = CollectionLayout;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 19 */
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

	/*global define*/

	/**
	 * Lays a collection of renderables from left to right, and when the right edge is reached,
	 * continues at the left of the next line.
	 *
	 * |options|type|description|
	 * |---|---|---|
	 * |`itemSize`|Size|Size of an item to layout|
	 * |`[gutter]`|Size|Gutter-space between renderables|
	 * |`[justify]`|Bool|Justifies the renderables accross the width & height|
	 * |`[justifyHorizontal]`|Bool|Justifies the renderables accross the width|
	 * |`[justifyVertical]`|Bool|Justifies the renderables accross the height|
	 *
	 * Example:
	 *
	 * ```javascript
	 * var CollectionLayout = require('famous-flex/layouts/CollectionLayout');
	 *
	 * new LayoutController({
	 *   layout: CollectionLayout,
	 *   layoutOptions: {
	 *     itemSize: [100, 100],  // item has width and height of 100 pixels
	 *     gutter: [5, 5],        // gutter of 5 pixels in between cells
	 *     justify: true          // justify the items neatly across the whole width and height
	 *   },
	 *   dataSource: [
	 *     new Surface({content: 'item 1'}),
	 *     new Surface({content: 'item 2'}),
	 *     new Surface({content: 'item 3'})
	 *   ]
	 * })
	 * ```
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {

	    // import dependencies
	    var Utility = __webpack_require__(50);

	    // Define capabilities of this layout function
	    var capabilities = {
	        sequence: true,
	        direction: [Utility.Direction.X, Utility.Direction.Y],
	        scrolling: true
	    };

	    function CoverLayout(context, options) {

	        // Get first renderable
	        var node = context.next();
	        if (!node) {
	            return;
	        }

	        // Prepare
	        var size = context.size;
	        var direction = context.direction;
	        var itemSize = options.itemSize;
	        var opacityStep = 0.2;
	        var scaleStep = 0.1;
	        var translateStep = 30;
	        var zStart = 100;

	        // Layout the first renderable in the center
	        context.set(node, {
	            size: itemSize,
	            origin: [0.5, 0.5],
	            align: [0.5, 0.5],
	            translate: [0, 0, zStart]
	        });

	        // Layout renderables
	        var translate = itemSize[0] / 2;
	        var opacity = 1 - opacityStep;
	        var zIndex = zStart - 1;
	        var scale = 1 - scaleStep;
	        var prev = false;
	        var endReached = false;
	        node = context.next();
	        if (!node) {
	            node = context.prev();
	            prev = true;
	        }
	        while (node) {

	            // Layout next node
	            context.set(node, {
	                size: itemSize,
	                origin: [0.5, 0.5],
	                align: [0.5, 0.5],
	                translate: direction ? [0, prev ? -translate : translate, zIndex] : [prev ? -translate : translate, 0, zIndex],
	                scale: [scale, scale, 1],
	                opacity: opacity
	            });
	            opacity -= opacityStep;
	            scale -= scaleStep;
	            translate += translateStep;
	            zIndex--;

	            // Check if the end is reached
	            if (translate >= (size[direction]/2)) {
	                endReached = true;
	            }
	            else {
	                node = prev ? context.prev() : context.next();
	                endReached = !node;
	            }

	            // When end is reached for next, start processing prev
	            if (endReached) {
	                if (prev) {
	                    break;
	                }
	                endReached = false;
	                prev = true;
	                node = context.prev();
	                if (node) {
	                    translate = (itemSize[direction] / 2);
	                    opacity = 1 - opacityStep;
	                    zIndex = zStart - 1;
	                    scale = 1 - scaleStep;
	                }
	            }
	        }
	    }

	    CoverLayout.Capabilities = capabilities;
	    module.exports = CoverLayout;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @version 1.0.3
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
	 * @param {Object} options The options to override the defaults
	 */
	function FastClick(layer, options) {
		'use strict';
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
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0(+?) requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);

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
		'use strict';
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
		'use strict';
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
		'use strict';
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
		'use strict';

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
		'use strict';
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time') {
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
		'use strict';
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
		'use strict';

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
		'use strict';
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
		'use strict';
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
		'use strict';
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
		'use strict';

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
		'use strict';
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
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
		'use strict';
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
		'use strict';

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
		'use strict';
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
		'use strict';
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
		'use strict';
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;

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

		// IE10 with -ms-touch-action: none, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} options The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		'use strict';
		return new FastClick(layer, options);
	};


	if (true) {

		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			'use strict';
			return FastClick;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function addStyle(cssCode) {
		if(false) {
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	var dispose = __webpack_require__(21)
		// The css code:
		(__webpack_require__(23));
	// Hot Module Replacement
	if(false) {
		module.hot.accept();
		module.hot.dispose(dispose);
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		"/* This Source Code Form is subject to the terms of the Mozilla Public\n * License, v. 2.0. If a copy of the MPL was not distributed with this\n * file, You can obtain one at http://mozilla.org/MPL/2.0/.\n *\n * Owner: mark@famo.us\n * @license MPL 2.0\n * @copyright Famous Industries, Inc. 2014\n */\n\n\nhtml {\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    overflow: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\nbody {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-font-smoothing: antialiased;\n    -webkit-tap-highlight-color: transparent;\n    -webkit-perspective: 0;\n    perspective: none;\n    overflow: hidden;\n}\n\n.famous-container, .famous-group {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    bottom: 0px;\n    right: 0px;\n    overflow: visible;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-backface-visibility: visible;\n    backface-visibility: visible;\n    pointer-events: none;\n}\n\n.famous-group {\n    width: 0px;\n    height: 0px;\n    margin: 0px;\n    padding: 0px;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\n.famous-surface {\n    position: absolute;\n    -webkit-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transform-style: flat;\n    transform-style: preserve-3d; /* performance */\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-tap-highlight-color: transparent;\n    pointer-events: auto;\n}\n\n.famous-container-group {\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Transform = __webpack_require__(25);
	var Transitionable = __webpack_require__(51);
	var TransitionableTransform = __webpack_require__(52);

	/**
	 *
	 *  A collection of visual changes to be
	 *    applied to another renderable component. This collection includes a
	 *    transform matrix, an opacity constant, a size, an origin specifier.
	 *    Modifier objects can be added to any RenderNode or object
	 *    capable of displaying renderables.  The Modifier's children and descendants
	 *    are transformed by the amounts specified in the Modifier's properties.
	 *
	 * @class Modifier
	 * @constructor
	 * @param {Object} [options] overrides of default options
	 * @param {Transform} [options.transform] affine transformation matrix
	 * @param {Number} [options.opacity]
	 * @param {Array.Number} [options.origin] origin adjustment
	 * @param {Array.Number} [options.size] size to apply to descendants
	 */
	function Modifier(options) {
	    this._transformGetter = null;
	    this._opacityGetter = null;
	    this._originGetter = null;
	    this._alignGetter = null;
	    this._sizeGetter = null;

	    /* TODO: remove this when deprecation complete */
	    this._legacyStates = {};

	    this._output = {
	        transform: Transform.identity,
	        opacity: 1,
	        origin: null,
	        align: null,
	        size: null,
	        target: null
	    };

	    if (options) {
	        if (options.transform) this.transformFrom(options.transform);
	        if (options.opacity !== undefined) this.opacityFrom(options.opacity);
	        if (options.origin) this.originFrom(options.origin);
	        if (options.align) this.alignFrom(options.align);
	        if (options.size) this.sizeFrom(options.size);
	    }
	}

	/**
	 * Function, object, or static transform matrix which provides the transform.
	 *   This is evaluated on every tick of the engine.
	 *
	 * @method transformFrom
	 *
	 * @param {Object} transform transform provider object
	 * @return {Modifier} this
	 */
	Modifier.prototype.transformFrom = function transformFrom(transform) {
	    if (transform instanceof Function) this._transformGetter = transform;
	    else if (transform instanceof Object && transform.get) this._transformGetter = transform.get.bind(transform);
	    else {
	        this._transformGetter = null;
	        this._output.transform = transform;
	    }
	    return this;
	};

	/**
	 * Set function, object, or number to provide opacity, in range [0,1].
	 *
	 * @method opacityFrom
	 *
	 * @param {Object} opacity provider object
	 * @return {Modifier} this
	 */
	Modifier.prototype.opacityFrom = function opacityFrom(opacity) {
	    if (opacity instanceof Function) this._opacityGetter = opacity;
	    else if (opacity instanceof Object && opacity.get) this._opacityGetter = opacity.get.bind(opacity);
	    else {
	        this._opacityGetter = null;
	        this._output.opacity = opacity;
	    }
	    return this;
	};

	/**
	 * Set function, object, or numerical array to provide origin, as [x,y],
	 *   where x and y are in the range [0,1].
	 *
	 * @method originFrom
	 *
	 * @param {Object} origin provider object
	 * @return {Modifier} this
	 */
	Modifier.prototype.originFrom = function originFrom(origin) {
	    if (origin instanceof Function) this._originGetter = origin;
	    else if (origin instanceof Object && origin.get) this._originGetter = origin.get.bind(origin);
	    else {
	        this._originGetter = null;
	        this._output.origin = origin;
	    }
	    return this;
	};

	/**
	 * Set function, object, or numerical array to provide align, as [x,y],
	 *   where x and y are in the range [0,1].
	 *
	 * @method alignFrom
	 *
	 * @param {Object} align provider object
	 * @return {Modifier} this
	 */
	Modifier.prototype.alignFrom = function alignFrom(align) {
	    if (align instanceof Function) this._alignGetter = align;
	    else if (align instanceof Object && align.get) this._alignGetter = align.get.bind(align);
	    else {
	        this._alignGetter = null;
	        this._output.align = align;
	    }
	    return this;
	};

	/**
	 * Set function, object, or numerical array to provide size, as [width, height].
	 *
	 * @method sizeFrom
	 *
	 * @param {Object} size provider object
	 * @return {Modifier} this
	 */
	Modifier.prototype.sizeFrom = function sizeFrom(size) {
	    if (size instanceof Function) this._sizeGetter = size;
	    else if (size instanceof Object && size.get) this._sizeGetter = size.get.bind(size);
	    else {
	        this._sizeGetter = null;
	        this._output.size = size;
	    }
	    return this;
	};

	 /**
	 * Deprecated: Prefer transformFrom with static Transform, or use a TransitionableTransform.
	 * @deprecated
	 * @method setTransform
	 *
	 * @param {Transform} transform Transform to transition to
	 * @param {Transitionable} transition Valid transitionable object
	 * @param {Function} callback callback to call after transition completes
	 * @return {Modifier} this
	 */
	Modifier.prototype.setTransform = function setTransform(transform, transition, callback) {
	    if (transition || this._legacyStates.transform) {
	        if (!this._legacyStates.transform) {
	            this._legacyStates.transform = new TransitionableTransform(this._output.transform);
	        }
	        if (!this._transformGetter) this.transformFrom(this._legacyStates.transform);

	        this._legacyStates.transform.set(transform, transition, callback);
	        return this;
	    }
	    else return this.transformFrom(transform);
	};

	/**
	 * Deprecated: Prefer opacityFrom with static opacity array, or use a Transitionable with that opacity.
	 * @deprecated
	 * @method setOpacity
	 *
	 * @param {Number} opacity Opacity value to transition to.
	 * @param {Transitionable} transition Valid transitionable object
	 * @param {Function} callback callback to call after transition completes
	 * @return {Modifier} this
	 */
	Modifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
	    if (transition || this._legacyStates.opacity) {
	        if (!this._legacyStates.opacity) {
	            this._legacyStates.opacity = new Transitionable(this._output.opacity);
	        }
	        if (!this._opacityGetter) this.opacityFrom(this._legacyStates.opacity);

	        return this._legacyStates.opacity.set(opacity, transition, callback);
	    }
	    else return this.opacityFrom(opacity);
	};

	/**
	 * Deprecated: Prefer originFrom with static origin array, or use a Transitionable with that origin.
	 * @deprecated
	 * @method setOrigin
	 *
	 * @param {Array.Number} origin two element array with values between 0 and 1.
	 * @param {Transitionable} transition Valid transitionable object
	 * @param {Function} callback callback to call after transition completes
	 * @return {Modifier} this
	 */
	Modifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {
	    /* TODO: remove this if statement when deprecation complete */
	    if (transition || this._legacyStates.origin) {

	        if (!this._legacyStates.origin) {
	            this._legacyStates.origin = new Transitionable(this._output.origin || [0, 0]);
	        }
	        if (!this._originGetter) this.originFrom(this._legacyStates.origin);

	        this._legacyStates.origin.set(origin, transition, callback);
	        return this;
	    }
	    else return this.originFrom(origin);
	};

	/**
	 * Deprecated: Prefer alignFrom with static align array, or use a Transitionable with that align.
	 * @deprecated
	 * @method setAlign
	 *
	 * @param {Array.Number} align two element array with values between 0 and 1.
	 * @param {Transitionable} transition Valid transitionable object
	 * @param {Function} callback callback to call after transition completes
	 * @return {Modifier} this
	 */
	Modifier.prototype.setAlign = function setAlign(align, transition, callback) {
	    /* TODO: remove this if statement when deprecation complete */
	    if (transition || this._legacyStates.align) {

	        if (!this._legacyStates.align) {
	            this._legacyStates.align = new Transitionable(this._output.align || [0, 0]);
	        }
	        if (!this._alignGetter) this.alignFrom(this._legacyStates.align);

	        this._legacyStates.align.set(align, transition, callback);
	        return this;
	    }
	    else return this.alignFrom(align);
	};

	/**
	 * Deprecated: Prefer sizeFrom with static origin array, or use a Transitionable with that size.
	 * @deprecated
	 * @method setSize
	 * @param {Array.Number} size two element array of [width, height]
	 * @param {Transitionable} transition Valid transitionable object
	 * @param {Function} callback callback to call after transition completes
	 * @return {Modifier} this
	 */
	Modifier.prototype.setSize = function setSize(size, transition, callback) {
	    if (size && (transition || this._legacyStates.size)) {
	        if (!this._legacyStates.size) {
	            this._legacyStates.size = new Transitionable(this._output.size || [0, 0]);
	        }
	        if (!this._sizeGetter) this.sizeFrom(this._legacyStates.size);

	        this._legacyStates.size.set(size, transition, callback);
	        return this;
	    }
	    else return this.sizeFrom(size);
	};

	/**
	 * Deprecated: Prefer to stop transform in your provider object.
	 * @deprecated
	 * @method halt
	 */
	Modifier.prototype.halt = function halt() {
	    if (this._legacyStates.transform) this._legacyStates.transform.halt();
	    if (this._legacyStates.opacity) this._legacyStates.opacity.halt();
	    if (this._legacyStates.origin) this._legacyStates.origin.halt();
	    if (this._legacyStates.align) this._legacyStates.align.halt();
	    if (this._legacyStates.size) this._legacyStates.size.halt();
	    this._transformGetter = null;
	    this._opacityGetter = null;
	    this._originGetter = null;
	    this._alignGetter = null;
	    this._sizeGetter = null;
	};

	/**
	 * Deprecated: Prefer to use your provided transform or output of your transform provider.
	 * @deprecated
	 * @method getTransform
	 * @return {Object} transform provider object
	 */
	Modifier.prototype.getTransform = function getTransform() {
	    return this._transformGetter();
	};

	/**
	 * Deprecated: Prefer to determine the end state of your transform from your transform provider
	 * @deprecated
	 * @method getFinalTransform
	 * @return {Transform} transform matrix
	 */
	Modifier.prototype.getFinalTransform = function getFinalTransform() {
	    return this._legacyStates.transform ? this._legacyStates.transform.getFinal() : this._output.transform;
	};

	/**
	 * Deprecated: Prefer to use your provided opacity or output of your opacity provider.
	 * @deprecated
	 * @method getOpacity
	 * @return {Object} opacity provider object
	 */
	Modifier.prototype.getOpacity = function getOpacity() {
	    return this._opacityGetter();
	};

	/**
	 * Deprecated: Prefer to use your provided origin or output of your origin provider.
	 * @deprecated
	 * @method getOrigin
	 * @return {Object} origin provider object
	 */
	Modifier.prototype.getOrigin = function getOrigin() {
	    return this._originGetter();
	};

	/**
	 * Deprecated: Prefer to use your provided align or output of your align provider.
	 * @deprecated
	 * @method getAlign
	 * @return {Object} align provider object
	 */
	Modifier.prototype.getAlign = function getAlign() {
	    return this._alignGetter();
	};

	/**
	 * Deprecated: Prefer to use your provided size or output of your size provider.
	 * @deprecated
	 * @method getSize
	 * @return {Object} size provider object
	 */
	Modifier.prototype.getSize = function getSize() {
	    return this._sizeGetter ? this._sizeGetter() : this._output.size;
	};

	// call providers on tick to receive render spec elements to apply
	function _update() {
	    if (this._transformGetter) this._output.transform = this._transformGetter();
	    if (this._opacityGetter) this._output.opacity = this._opacityGetter();
	    if (this._originGetter) this._output.origin = this._originGetter();
	    if (this._alignGetter) this._output.align = this._alignGetter();
	    if (this._sizeGetter) this._output.size = this._sizeGetter();
	}

	/**
	 * Return render spec for this Modifier, applying to the provided
	 *    target component.  This is similar to render() for Surfaces.
	 *
	 * @private
	 * @method modify
	 *
	 * @param {Object} target (already rendered) render spec to
	 *    which to apply the transform.
	 * @return {Object} render spec for this Modifier, including the
	 *    provided target
	 */
	Modifier.prototype.modify = function modify(target) {
	    _update.call(this);
	    this._output.target = target;
	    return this._output;
	};

	module.exports = Modifier;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */




	/**
	 *  A high-performance static matrix math library used to calculate
	 *    affine transforms on surfaces and other renderables.
	 *    Famo.us uses 4x4 matrices corresponding directly to
	 *    WebKit matrices (column-major order).
	 *
	 *    The internal "type" of a Matrix is a 16-long float array in
	 *    row-major order, with:
	 *    elements [0],[1],[2],[4],[5],[6],[8],[9],[10] forming the 3x3
	 *          transformation matrix;
	 *    elements [12], [13], [14] corresponding to the t_x, t_y, t_z
	 *           translation;
	 *    elements [3], [7], [11] set to 0;
	 *    element [15] set to 1.
	 *    All methods are static.
	 *
	 * @static
	 *
	 * @class Transform
	 */
	var Transform = {};

	// WARNING: these matrices correspond to WebKit matrices, which are
	//    transposed from their math counterparts
	Transform.precision = 1e-6;
	Transform.identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	/**
	 * Multiply two or more Transform matrix types to return a Transform matrix.
	 *
	 * @method multiply4x4
	 * @static
	 * @param {Transform} a left Transform
	 * @param {Transform} b right Transform
	 * @return {Transform}
	 */
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

	/**
	 * Fast-multiply two or more Transform matrix types to return a
	 *    Matrix, assuming bottom row on each is [0 0 0 1].
	 *
	 * @method multiply
	 * @static
	 * @param {Transform} a left Transform
	 * @param {Transform} b right Transform
	 * @return {Transform}
	 */
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

	/**
	 * Return a Transform translated by additional amounts in each
	 *    dimension. This is equivalent to the result of
	 *
	 *    Transform.multiply(Matrix.translate(t[0], t[1], t[2]), m).
	 *
	 * @method thenMove
	 * @static
	 * @param {Transform} m a Transform
	 * @param {Array.Number} t floats delta vector of length 2 or 3
	 * @return {Transform}
	 */
	Transform.thenMove = function thenMove(m, t) {
	    if (!t[2]) t[2] = 0;
	    return [m[0], m[1], m[2], 0, m[4], m[5], m[6], 0, m[8], m[9], m[10], 0, m[12] + t[0], m[13] + t[1], m[14] + t[2], 1];
	};

	/**
	 * Return a Transform atrix which represents the result of a transform matrix
	 *    applied after a move. This is faster than the equivalent multiply.
	 *    This is equivalent to the result of:
	 *
	 *    Transform.multiply(m, Transform.translate(t[0], t[1], t[2])).
	 *
	 * @method moveThen
	 * @static
	 * @param {Array.Number} v vector representing initial movement
	 * @param {Transform} m matrix to apply afterwards
	 * @return {Transform} the resulting matrix
	 */
	Transform.moveThen = function moveThen(v, m) {
	    if (!v[2]) v[2] = 0;
	    var t0 = v[0] * m[0] + v[1] * m[4] + v[2] * m[8];
	    var t1 = v[0] * m[1] + v[1] * m[5] + v[2] * m[9];
	    var t2 = v[0] * m[2] + v[1] * m[6] + v[2] * m[10];
	    return Transform.thenMove(m, [t0, t1, t2]);
	};

	/**
	 * Return a Transform which represents a translation by specified
	 *    amounts in each dimension.
	 *
	 * @method translate
	 * @static
	 * @param {Number} x x translation
	 * @param {Number} y y translation
	 * @param {Number} z z translation
	 * @return {Transform}
	 */
	Transform.translate = function translate(x, y, z) {
	    if (z === undefined) z = 0;
	    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
	};

	/**
	 * Return a Transform scaled by a vector in each
	 *    dimension. This is a more performant equivalent to the result of
	 *
	 *    Transform.multiply(Transform.scale(s[0], s[1], s[2]), m).
	 *
	 * @method thenScale
	 * @static
	 * @param {Transform} m a matrix
	 * @param {Array.Number} s delta vector (array of floats &&
	 *    array.length == 3)
	 * @return {Transform}
	 */
	Transform.thenScale = function thenScale(m, s) {
	    return [
	        s[0] * m[0], s[1] * m[1], s[2] * m[2], 0,
	        s[0] * m[4], s[1] * m[5], s[2] * m[6], 0,
	        s[0] * m[8], s[1] * m[9], s[2] * m[10], 0,
	        s[0] * m[12], s[1] * m[13], s[2] * m[14], 1
	    ];
	};

	/**
	 * Return a Transform which represents a scale by specified amounts
	 *    in each dimension.
	 *
	 * @method scale
	 * @static
	 * @param {Number} x x scale factor
	 * @param {Number} y y scale factor
	 * @param {Number} z z scale factor
	 * @return {Transform}
	 */
	Transform.scale = function scale(x, y, z) {
	    if (z === undefined) z = 1;
	    return [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1];
	};

	/**
	 * Return a Transform which represents a clockwise
	 *    rotation around the x axis.
	 *
	 * @method rotateX
	 * @static
	 * @param {Number} theta radians
	 * @return {Transform}
	 */
	Transform.rotateX = function rotateX(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [1, 0, 0, 0, 0, cosTheta, sinTheta, 0, 0, -sinTheta, cosTheta, 0, 0, 0, 0, 1];
	};

	/**
	 * Return a Transform which represents a clockwise
	 *    rotation around the y axis.
	 *
	 * @method rotateY
	 * @static
	 * @param {Number} theta radians
	 * @return {Transform}
	 */
	Transform.rotateY = function rotateY(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [cosTheta, 0, -sinTheta, 0, 0, 1, 0, 0, sinTheta, 0, cosTheta, 0, 0, 0, 0, 1];
	};

	/**
	 * Return a Transform which represents a clockwise
	 *    rotation around the z axis.
	 *
	 * @method rotateZ
	 * @static
	 * @param {Number} theta radians
	 * @return {Transform}
	 */
	Transform.rotateZ = function rotateZ(theta) {
	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);
	    return [cosTheta, sinTheta, 0, 0, -sinTheta, cosTheta, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	};

	/**
	 * Return a Transform which represents composed clockwise
	 *    rotations along each of the axes. Equivalent to the result of
	 *    Matrix.multiply(rotateX(phi), rotateY(theta), rotateZ(psi)).
	 *
	 * @method rotate
	 * @static
	 * @param {Number} phi radians to rotate about the positive x axis
	 * @param {Number} theta radians to rotate about the positive y axis
	 * @param {Number} psi radians to rotate about the positive z axis
	 * @return {Transform}
	 */
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
	        0, 0, 0, 1
	    ];
	    return result;
	};

	/**
	 * Return a Transform which represents an axis-angle rotation
	 *
	 * @method rotateAxis
	 * @static
	 * @param {Array.Number} v unit vector representing the axis to rotate about
	 * @param {Number} theta radians to rotate clockwise about the axis
	 * @return {Transform}
	 */
	Transform.rotateAxis = function rotateAxis(v, theta) {
	    var sinTheta = Math.sin(theta);
	    var cosTheta = Math.cos(theta);
	    var verTheta = 1 - cosTheta; // versine of theta

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
	        xxV + cosTheta, xyV + zs, xzV - ys, 0,
	        xyV - zs, yyV + cosTheta, yzV + xs, 0,
	        xzV + ys, yzV - xs, zzV + cosTheta, 0,
	        0, 0, 0, 1
	    ];
	    return result;
	};

	/**
	 * Return a Transform which represents a transform matrix applied about
	 * a separate origin point.
	 *
	 * @method aboutOrigin
	 * @static
	 * @param {Array.Number} v origin point to apply matrix
	 * @param {Transform} m matrix to apply
	 * @return {Transform}
	 */
	Transform.aboutOrigin = function aboutOrigin(v, m) {
	    var t0 = v[0] - (v[0] * m[0] + v[1] * m[4] + v[2] * m[8]);
	    var t1 = v[1] - (v[0] * m[1] + v[1] * m[5] + v[2] * m[9]);
	    var t2 = v[2] - (v[0] * m[2] + v[1] * m[6] + v[2] * m[10]);
	    return Transform.thenMove(m, [t0, t1, t2]);
	};

	/**
	 * Return a Transform representation of a skew transformation
	 *
	 * @method skew
	 * @static
	 * @param {Number} phi scale factor skew in the x axis
	 * @param {Number} theta scale factor skew in the y axis
	 * @param {Number} psi scale factor skew in the z axis
	 * @return {Transform}
	 */
	Transform.skew = function skew(phi, theta, psi) {
	    return [1, 0, 0, 0, Math.tan(psi), 1, 0, 0, Math.tan(theta), Math.tan(phi), 1, 0, 0, 0, 0, 1];
	};

	/**
	 * Return a Transform representation of a skew in the x-direction
	 *
	 * @method skewX
	 * @static
	 * @param {Number} angle the angle between the top and left sides
	 * @return {Transform}
	 */
	Transform.skewX = function skewX(angle) {
	    return [1, 0, 0, 0, Math.tan(angle), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	};

	/**
	 * Return a Transform representation of a skew in the y-direction
	 *
	 * @method skewY
	 * @static
	 * @param {Number} angle the angle between the top and right sides
	 * @return {Transform}
	 */
	Transform.skewY = function skewY(angle) {
	    return [1, Math.tan(angle), 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	};

	/**
	 * Returns a perspective Transform matrix
	 *
	 * @method perspective
	 * @static
	 * @param {Number} focusZ z position of focal point
	 * @return {Transform}
	 */
	Transform.perspective = function perspective(focusZ) {
	    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -1 / focusZ, 0, 0, 0, 1];
	};

	/**
	 * Return translation vector component of given Transform
	 *
	 * @method getTranslate
	 * @static
	 * @param {Transform} m Transform
	 * @return {Array.Number} the translation vector [t_x, t_y, t_z]
	 */
	Transform.getTranslate = function getTranslate(m) {
	    return [m[12], m[13], m[14]];
	};

	/**
	 * Return inverse affine transform for given Transform.
	 *   Note: This assumes m[3] = m[7] = m[11] = 0, and m[15] = 1.
	 *   Will provide incorrect results if not invertible or preconditions not met.
	 *
	 * @method inverse
	 * @static
	 * @param {Transform} m Transform
	 * @return {Transform}
	 */
	Transform.inverse = function inverse(m) {
	    // only need to consider 3x3 section for affine
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
	        invD * c0, -invD * c4, invD * c8, 0,
	        -invD * c1, invD * c5, -invD * c9, 0,
	        invD * c2, -invD * c6, invD * c10, 0,
	        0, 0, 0, 1
	    ];
	    result[12] = -m[12] * result[0] - m[13] * result[4] - m[14] * result[8];
	    result[13] = -m[12] * result[1] - m[13] * result[5] - m[14] * result[9];
	    result[14] = -m[12] * result[2] - m[13] * result[6] - m[14] * result[10];
	    return result;
	};

	/**
	 * Returns the transpose of a 4x4 matrix
	 *
	 * @method transpose
	 * @static
	 * @param {Transform} m matrix
	 * @return {Transform} the resulting transposed matrix
	 */
	Transform.transpose = function transpose(m) {
	    return [m[0], m[4], m[8], m[12], m[1], m[5], m[9], m[13], m[2], m[6], m[10], m[14], m[3], m[7], m[11], m[15]];
	};

	function _normSquared(v) {
	    return (v.length === 2) ? v[0] * v[0] + v[1] * v[1] : v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
	}
	function _norm(v) {
	    return Math.sqrt(_normSquared(v));
	}
	function _sign(n) {
	    return (n < 0) ? -1 : 1;
	}

	/**
	 * Decompose Transform into separate .translate, .rotate, .scale,
	 *    and .skew components.
	 *
	 * @method interpret
	 * @static
	 * @param {Transform} M transform matrix
	 * @return {Object} matrix spec object with component matrices .translate,
	 *    .rotate, .scale, .skew
	 */
	Transform.interpret = function interpret(M) {

	    // QR decomposition via Householder reflections
	    //FIRST ITERATION

	    //default Q1 to the identity matrix;
	    var x = [M[0], M[1], M[2]];                // first column vector
	    var sgn = _sign(x[0]);                     // sign of first component of x (for stability)
	    var xNorm = _norm(x);                      // norm of first column vector
	    var v = [x[0] + sgn * xNorm, x[1], x[2]];  // v = x + sign(x[0])|x|e1
	    var mult = 2 / _normSquared(v);            // mult = 2/v'v

	    //bail out if our Matrix is singular
	    if (mult >= Infinity) {
	        return {translate: Transform.getTranslate(M), rotate: [0, 0, 0], scale: [0, 0, 0], skew: [0, 0, 0]};
	    }

	    //evaluate Q1 = I - 2vv'/v'v
	    var Q1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];

	    //diagonals
	    Q1[0]  = 1 - mult * v[0] * v[0];    // 0,0 entry
	    Q1[5]  = 1 - mult * v[1] * v[1];    // 1,1 entry
	    Q1[10] = 1 - mult * v[2] * v[2];    // 2,2 entry

	    //upper diagonal
	    Q1[1] = -mult * v[0] * v[1];        // 0,1 entry
	    Q1[2] = -mult * v[0] * v[2];        // 0,2 entry
	    Q1[6] = -mult * v[1] * v[2];        // 1,2 entry

	    //lower diagonal
	    Q1[4] = Q1[1];                      // 1,0 entry
	    Q1[8] = Q1[2];                      // 2,0 entry
	    Q1[9] = Q1[6];                      // 2,1 entry

	    //reduce first column of M
	    var MQ1 = Transform.multiply(Q1, M);

	    //SECOND ITERATION on (1,1) minor
	    var x2 = [MQ1[5], MQ1[6]];
	    var sgn2 = _sign(x2[0]);                    // sign of first component of x (for stability)
	    var x2Norm = _norm(x2);                     // norm of first column vector
	    var v2 = [x2[0] + sgn2 * x2Norm, x2[1]];    // v = x + sign(x[0])|x|e1
	    var mult2 = 2 / _normSquared(v2);           // mult = 2/v'v

	    //evaluate Q2 = I - 2vv'/v'v
	    var Q2 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];

	    //diagonal
	    Q2[5]  = 1 - mult2 * v2[0] * v2[0]; // 1,1 entry
	    Q2[10] = 1 - mult2 * v2[1] * v2[1]; // 2,2 entry

	    //off diagonals
	    Q2[6] = -mult2 * v2[0] * v2[1];     // 2,1 entry
	    Q2[9] = Q2[6];                      // 1,2 entry

	    //calc QR decomposition. Q = Q1*Q2, R = Q'*M
	    var Q = Transform.multiply(Q2, Q1);      //note: really Q transpose
	    var R = Transform.multiply(Q, M);

	    //remove negative scaling
	    var remover = Transform.scale(R[0] < 0 ? -1 : 1, R[5] < 0 ? -1 : 1, R[10] < 0 ? -1 : 1);
	    R = Transform.multiply(R, remover);
	    Q = Transform.multiply(remover, Q);

	    //decompose into rotate/scale/skew matrices
	    var result = {};
	    result.translate = Transform.getTranslate(M);
	    result.rotate = [Math.atan2(-Q[6], Q[10]), Math.asin(Q[2]), Math.atan2(-Q[1], Q[0])];
	    if (!result.rotate[0]) {
	        result.rotate[0] = 0;
	        result.rotate[2] = Math.atan2(Q[4], Q[5]);
	    }
	    result.scale = [R[0], R[5], R[10]];
	    result.skew = [Math.atan2(R[9], result.scale[2]), Math.atan2(R[8], result.scale[2]), Math.atan2(R[4], result.scale[0])];

	    //double rotation workaround
	    if (Math.abs(result.rotate[0]) + Math.abs(result.rotate[2]) > 1.5 * Math.PI) {
	        result.rotate[1] = Math.PI - result.rotate[1];
	        if (result.rotate[1] > Math.PI) result.rotate[1] -= 2 * Math.PI;
	        if (result.rotate[1] < -Math.PI) result.rotate[1] += 2 * Math.PI;
	        if (result.rotate[0] < 0) result.rotate[0] += Math.PI;
	        else result.rotate[0] -= Math.PI;
	        if (result.rotate[2] < 0) result.rotate[2] += Math.PI;
	        else result.rotate[2] -= Math.PI;
	    }

	    return result;
	};

	/**
	 * Weighted average between two matrices by averaging their
	 *     translation, rotation, scale, skew components.
	 *     f(M1,M2,t) = (1 - t) * M1 + t * M2
	 *
	 * @method average
	 * @static
	 * @param {Transform} M1 f(M1,M2,0) = M1
	 * @param {Transform} M2 f(M1,M2,1) = M2
	 * @param {Number} t
	 * @return {Transform}
	 */
	Transform.average = function average(M1, M2, t) {
	    t = (t === undefined) ? 0.5 : t;
	    var specM1 = Transform.interpret(M1);
	    var specM2 = Transform.interpret(M2);

	    var specAvg = {
	        translate: [0, 0, 0],
	        rotate: [0, 0, 0],
	        scale: [0, 0, 0],
	        skew: [0, 0, 0]
	    };

	    for (var i = 0; i < 3; i++) {
	        specAvg.translate[i] = (1 - t) * specM1.translate[i] + t * specM2.translate[i];
	        specAvg.rotate[i] = (1 - t) * specM1.rotate[i] + t * specM2.rotate[i];
	        specAvg.scale[i] = (1 - t) * specM1.scale[i] + t * specM2.scale[i];
	        specAvg.skew[i] = (1 - t) * specM1.skew[i] + t * specM2.skew[i];
	    }
	    return Transform.build(specAvg);
	};

	/**
	 * Compose .translate, .rotate, .scale, .skew components into
	 * Transform matrix
	 *
	 * @method build
	 * @static
	 * @param {matrixSpec} spec object with component matrices .translate,
	 *    .rotate, .scale, .skew
	 * @return {Transform} composed transform
	 */
	Transform.build = function build(spec) {
	    var scaleMatrix = Transform.scale(spec.scale[0], spec.scale[1], spec.scale[2]);
	    var skewMatrix = Transform.skew(spec.skew[0], spec.skew[1], spec.skew[2]);
	    var rotateMatrix = Transform.rotate(spec.rotate[0], spec.rotate[1], spec.rotate[2]);
	    return Transform.thenMove(Transform.multiply(Transform.multiply(rotateMatrix, skewMatrix), scaleMatrix), spec.translate);
	};

	/**
	 * Determine if two Transforms are component-wise equal
	 *   Warning: breaks on perspective Transforms
	 *
	 * @method equals
	 * @static
	 * @param {Transform} a matrix
	 * @param {Transform} b matrix
	 * @return {boolean}
	 */
	Transform.equals = function equals(a, b) {
	    return !Transform.notEquals(a, b);
	};

	/**
	 * Determine if two Transforms are component-wise unequal
	 *   Warning: breaks on perspective Transforms
	 *
	 * @method notEquals
	 * @static
	 * @param {Transform} a matrix
	 * @param {Transform} b matrix
	 * @return {boolean}
	 */
	Transform.notEquals = function notEquals(a, b) {
	    if (a === b) return false;

	    // shortci
	    return !(a && b) ||
	        a[12] !== b[12] || a[13] !== b[13] || a[14] !== b[14] ||
	        a[0] !== b[0] || a[1] !== b[1] || a[2] !== b[2] ||
	        a[4] !== b[4] || a[5] !== b[5] || a[6] !== b[6] ||
	        a[8] !== b[8] || a[9] !== b[9] || a[10] !== b[10];
	};

	/**
	 * Constrain angle-trio components to range of [-pi, pi).
	 *
	 * @method normalizeRotation
	 * @static
	 * @param {Array.Number} rotation phi, theta, psi (array of floats
	 *    && array.length == 3)
	 * @return {Array.Number} new phi, theta, psi triplet
	 *    (array of floats && array.length == 3)
	 */
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
	    while (result[1] < -Math.PI) result[1] += 2 * Math.PI;
	    while (result[1] >= Math.PI) result[1] -= 2 * Math.PI;
	    while (result[2] < -Math.PI) result[2] += 2 * Math.PI;
	    while (result[2] >= Math.PI) result[2] -= 2 * Math.PI;
	    return result;
	};

	/**
	 * (Property) Array defining a translation forward in z by 1
	 *
	 * @property {array} inFront
	 * @static
	 * @final
	 */
	Transform.inFront = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1e-3, 1];

	/**
	 * (Property) Array defining a translation backwards in z by 1
	 *
	 * @property {array} behind
	 * @static
	 * @final
	 */
	Transform.behind = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -1e-3, 1];

	module.exports = Transform;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	/**
	 * The singleton object initiated upon process
	 *   startup which manages all active Context instances, runs
	 *   the render dispatch loop, and acts as a listener and dispatcher
	 *   for events.  All methods are therefore static.
	 *
	 *   On static initialization, window.requestAnimationFrame is called with
	 *     the event loop function.
	 *
	 *   Note: Any window in which Engine runs will prevent default
	 *     scrolling behavior on the 'touchmove' event.
	 *
	 * @static
	 * @class Engine
	 */
	var Context = __webpack_require__(40);
	var EventHandler = __webpack_require__(36);
	var OptionsManager = __webpack_require__(34);

	var Engine = {};

	var contexts = [];
	var nextTickQueue = [];
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
	    runLoop: true
	};
	var optionsManager = new OptionsManager(options);

	/** @const */
	var MAX_DEFER_FRAME_TIME = 10;

	/**
	 * Inside requestAnimationFrame loop, step() is called, which:
	 *   calculates current FPS (throttling loop if it is over limit set in setFPSCap),
	 *   emits dataless 'prerender' event on start of loop,
	 *   calls in order any one-shot functions registered by nextTick on last loop,
	 *   calls Context.update on all Context objects registered,
	 *   and emits dataless 'postrender' event on end of loop.
	 *
	 * @static
	 * @private
	 * @method step
	 */
	Engine.step = function step() {
	    var currentTime = Date.now();

	    // skip frame if we're over our framerate cap
	    if (frameTimeLimit && currentTime - lastTime < frameTimeLimit) return;

	    var i = 0;

	    frameTime = currentTime - lastTime;
	    lastTime = currentTime;

	    eventHandler.emit('prerender');

	    // empty the queue
	    for (i = 0; i < nextTickQueue.length; i++) nextTickQueue[i].call(this);
	    nextTickQueue.splice(0);

	    // limit total execution time for deferrable functions
	    while (deferQueue.length && (Date.now() - currentTime) < MAX_DEFER_FRAME_TIME) {
	        deferQueue.shift().call(this);
	    }

	    for (i = 0; i < contexts.length; i++) contexts[i].update();

	    eventHandler.emit('postrender');
	};

	// engage requestAnimationFrame
	function loop() {
	    if (options.runLoop) {
	        Engine.step();
	        window.requestAnimationFrame(loop);
	    }
	    else loopEnabled = false;
	}
	window.requestAnimationFrame(loop);

	//
	// Upon main document window resize (unless on an "input" HTML element):
	//   scroll to the top left corner of the window,
	//   and for each managed Context: emit the 'resize' event and update its size.
	// @param {Object=} event document event
	//
	function handleResize(event) {
	    for (var i = 0; i < contexts.length; i++) {
	        contexts[i].emit('resize');
	    }
	    eventHandler.emit('resize');
	}
	window.addEventListener('resize', handleResize, false);
	handleResize();

	// prevent scrolling via browser
	window.addEventListener('touchmove', function(event) {
	    event.preventDefault();
	}, true);

	/**
	 * Add event handler object to set of downstream handlers.
	 *
	 * @method pipe
	 *
	 * @param {EventHandler} target event handler target object
	 * @return {EventHandler} passed event handler
	 */
	Engine.pipe = function pipe(target) {
	    if (target.subscribe instanceof Function) return target.subscribe(Engine);
	    else return eventHandler.pipe(target);
	};

	/**
	 * Remove handler object from set of downstream handlers.
	 *   Undoes work of "pipe".
	 *
	 * @method unpipe
	 *
	 * @param {EventHandler} target target handler object
	 * @return {EventHandler} provided target
	 */
	Engine.unpipe = function unpipe(target) {
	    if (target.unsubscribe instanceof Function) return target.unsubscribe(Engine);
	    else return eventHandler.unpipe(target);
	};

	/**
	 * Bind a callback function to an event type handled by this object.
	 *
	 * @static
	 * @method "on"
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {function(string, Object)} handler callback
	 * @return {EventHandler} this
	 */
	Engine.on = function on(type, handler) {
	    if (!(type in eventForwarders)) {
	        eventForwarders[type] = eventHandler.emit.bind(eventHandler, type);
	        if (document.body) {
	            document.body.addEventListener(type, eventForwarders[type]);
	        }
	        else {
	            Engine.nextTick(function(type, forwarder) {
	                document.body.addEventListener(type, forwarder);
	            }.bind(this, type, eventForwarders[type]));
	        }
	    }
	    return eventHandler.on(type, handler);
	};

	/**
	 * Trigger an event, sending to all downstream handlers
	 *   listening for provided 'type' key.
	 *
	 * @method emit
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {Object} event event data
	 * @return {EventHandler} this
	 */
	Engine.emit = function emit(type, event) {
	    return eventHandler.emit(type, event);
	};

	/**
	 * Unbind an event by type and handler.
	 *   This undoes the work of "on".
	 *
	 * @static
	 * @method removeListener
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {function} handler function object to remove
	 * @return {EventHandler} internal event handler object (for chaining)
	 */
	Engine.removeListener = function removeListener(type, handler) {
	    return eventHandler.removeListener(type, handler);
	};

	/**
	 * Return the current calculated frames per second of the Engine.
	 *
	 * @static
	 * @method getFPS
	 *
	 * @return {Number} calculated fps
	 */
	Engine.getFPS = function getFPS() {
	    return 1000 / frameTime;
	};

	/**
	 * Set the maximum fps at which the system should run. If internal render
	 *    loop is called at a greater frequency than this FPSCap, Engine will
	 *    throttle render and update until this rate is achieved.
	 *
	 * @static
	 * @method setFPSCap
	 *
	 * @param {Number} fps maximum frames per second
	 */
	Engine.setFPSCap = function setFPSCap(fps) {
	    frameTimeLimit = Math.floor(1000 / fps);
	};

	/**
	 * Return engine options.
	 *
	 * @static
	 * @method getOptions
	 * @param {string} key
	 * @return {Object} engine options
	 */
	Engine.getOptions = function getOptions() {
	    return optionsManager.getOptions.apply(optionsManager, arguments);
	};

	/**
	 * Set engine options
	 *
	 * @static
	 * @method setOptions
	 *
	 * @param {Object} [options] overrides of default options
	 * @param {Number} [options.fpsCap]  maximum fps at which the system should run
	 * @param {boolean} [options.runLoop=true] whether the run loop should continue
	 * @param {string} [options.containerType="div"] type of container element.  Defaults to 'div'.
	 * @param {string} [options.containerClass="famous-container"] type of container element.  Defaults to 'famous-container'.
	 */
	Engine.setOptions = function setOptions(options) {
	    return optionsManager.setOptions.apply(optionsManager, arguments);
	};

	/**
	 * Creates a new Context for rendering and event handling with
	 *    provided document element as top of each tree. This will be tracked by the
	 *    process-wide Engine.
	 *
	 * @static
	 * @method createContext
	 *
	 * @param {Node} el will be top of Famo.us document element tree
	 * @return {Context} new Context within el
	 */
	Engine.createContext = function createContext(el) {
	    var needMountContainer = false;
	    if (!el) {
	        el = document.createElement(options.containerType);
	        el.classList.add(options.containerClass);
	        needMountContainer = true;
	    }
	    var context = new Context(el);
	    Engine.registerContext(context);
	    if (needMountContainer) {
	        Engine.nextTick(function(context, el) {
	            document.body.appendChild(el);
	            context.emit('resize');
	        }.bind(this, context, el));
	    }
	    return context;
	};

	/**
	 * Registers an existing context to be updated within the run loop.
	 *
	 * @static
	 * @method registerContext
	 *
	 * @param {Context} context Context to register
	 * @return {FamousContext} provided context
	 */
	Engine.registerContext = function registerContext(context) {
	    contexts.push(context);
	    return context;
	};

	/**
	 * Queue a function to be executed on the next tick of the
	 *    Engine.
	 *
	 * @static
	 * @method nextTick
	 *
	 * @param {function(Object)} fn function accepting window object
	 */
	Engine.nextTick = function nextTick(fn) {
	    nextTickQueue.push(fn);
	};

	/**
	 * Queue a function to be executed sometime soon, at a time that is
	 *    unlikely to affect frame rate.
	 *
	 * @static
	 * @method defer
	 *
	 * @param {Function} fn
	 */
	Engine.defer = function defer(fn) {
	    deferQueue.push(fn);
	};

	optionsManager.on('change', function(data) {
	    if (data.id === 'fpsCap') Engine.setFPSCap(data.value);
	    else if (data.id === 'runLoop') {
	        // kick off the loop only if it was stopped
	        if (!loopEnabled && data.value) {
	            loopEnabled = true;
	            window.requestAnimationFrame(loop);
	        }
	    }
	});

	module.exports = Engine;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Entity = __webpack_require__(37);
	var EventHandler = __webpack_require__(36);
	var Transform = __webpack_require__(25);

	var devicePixelRatio = window.devicePixelRatio || 1;
	var usePrefix = document.createElement('div').style.webkitTransform !== undefined;

	/**
	 * A base class for viewable content and event
	 *   targets inside a Famo.us application, containing a renderable document
	 *   fragment. Like an HTML div, it can accept internal markup,
	 *   properties, classes, and handle events.
	 *
	 * @class Surface
	 * @constructor
	 *
	 * @param {Object} [options] default option overrides
	 * @param {Array.Number} [options.size] [width, height] in pixels
	 * @param {Array.string} [options.classes] CSS classes to set on inner content
	 * @param {Array} [options.properties] string dictionary of HTML attributes to set on target div
	 * @param {string} [options.content] inner (HTML) content of surface
	 */
	function Surface(options) {
	    this.options = {};

	    this.properties = {};
	    this.content = '';
	    this.classList = [];
	    this.size = null;

	    this._classesDirty = true;
	    this._stylesDirty = true;
	    this._sizeDirty = true;
	    this._contentDirty = true;

	    this._dirtyClasses = [];

	    this._matrix = null;
	    this._opacity = 1;
	    this._origin = null;
	    this._size = null;

	    /** @ignore */
	    this.eventForwarder = function eventForwarder(event) {
	        this.emit(event.type, event);
	    }.bind(this);
	    this.eventHandler = new EventHandler();
	    this.eventHandler.bindThis(this);

	    this.id = Entity.register(this);

	    if (options) this.setOptions(options);

	    this._currTarget = null;
	}
	Surface.prototype.elementType = 'div';
	Surface.prototype.elementClass = 'famous-surface';

	/**
	 * Bind a callback function to an event type handled by this object.
	 *
	 * @method "on"
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {function(string, Object)} fn handler callback
	 * @return {EventHandler} this
	 */
	Surface.prototype.on = function on(type, fn) {
	    if (this._currTarget) this._currTarget.addEventListener(type, this.eventForwarder);
	    this.eventHandler.on(type, fn);
	};

	/**
	 * Unbind an event by type and handler.
	 *   This undoes the work of "on"
	 *
	 * @method removeListener
	 * @param {string} type event type key (for example, 'click')
	 * @param {function(string, Object)} fn handler
	 */
	Surface.prototype.removeListener = function removeListener(type, fn) {
	    this.eventHandler.removeListener(type, fn);
	};

	/**
	 * Trigger an event, sending to all downstream handlers
	 *   listening for provided 'type' key.
	 *
	 * @method emit
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {Object} [event] event data
	 * @return {EventHandler} this
	 */
	Surface.prototype.emit = function emit(type, event) {
	    if (event && !event.origin) event.origin = this;
	    var handled = this.eventHandler.emit(type, event);
	    if (handled && event && event.stopPropagation) event.stopPropagation();
	    return handled;
	};

	/**
	 * Add event handler object to set of downstream handlers.
	 *
	 * @method pipe
	 *
	 * @param {EventHandler} target event handler target object
	 * @return {EventHandler} passed event handler
	 */
	Surface.prototype.pipe = function pipe(target) {
	    return this.eventHandler.pipe(target);
	};

	/**
	 * Remove handler object from set of downstream handlers.
	 *   Undoes work of "pipe"
	 *
	 * @method unpipe
	 *
	 * @param {EventHandler} target target handler object
	 * @return {EventHandler} provided target
	 */
	Surface.prototype.unpipe = function unpipe(target) {
	    return this.eventHandler.unpipe(target);
	};

	/**
	 * Return spec for this surface. Note that for a base surface, this is
	 *    simply an id.
	 *
	 * @method render
	 * @private
	 * @return {Object} render spec for this surface (spec id)
	 */
	Surface.prototype.render = function render() {
	    return this.id;
	};

	/**
	 * Set CSS-style properties on this Surface. Note that this will cause
	 *    dirtying and thus re-rendering, even if values do not change.
	 *
	 * @method setProperties
	 * @param {Object} properties property dictionary of "key" => "value"
	 */
	Surface.prototype.setProperties = function setProperties(properties) {
	    for (var n in properties) {
	        this.properties[n] = properties[n];
	    }
	    this._stylesDirty = true;
	};

	/**
	 * Get CSS-style properties on this Surface.
	 *
	 * @method getProperties
	 *
	 * @return {Object} Dictionary of this Surface's properties.
	 */
	Surface.prototype.getProperties = function getProperties() {
	    return this.properties;
	};

	/**
	 * Add CSS-style class to the list of classes on this Surface. Note
	 *   this will map directly to the HTML property of the actual
	 *   corresponding rendered <div>.
	 *
	 * @method addClass
	 * @param {string} className name of class to add
	 */
	Surface.prototype.addClass = function addClass(className) {
	    if (this.classList.indexOf(className) < 0) {
	        this.classList.push(className);
	        this._classesDirty = true;
	    }
	};

	/**
	 * Remove CSS-style class from the list of classes on this Surface.
	 *   Note this will map directly to the HTML property of the actual
	 *   corresponding rendered <div>.
	 *
	 * @method removeClass
	 * @param {string} className name of class to remove
	 */
	Surface.prototype.removeClass = function removeClass(className) {
	    var i = this.classList.indexOf(className);
	    if (i >= 0) {
	        this._dirtyClasses.push(this.classList.splice(i, 1)[0]);
	        this._classesDirty = true;
	    }
	};

	/**
	 * Reset class list to provided dictionary.
	 * @method setClasses
	 * @param {Array.string} classList
	 */
	Surface.prototype.setClasses = function setClasses(classList) {
	    var i = 0;
	    var removal = [];
	    for (i = 0; i < this.classList.length; i++) {
	        if (classList.indexOf(this.classList[i]) < 0) removal.push(this.classList[i]);
	    }
	    for (i = 0; i < removal.length; i++) this.removeClass(removal[i]);
	    // duplicates are already checked by addClass()
	    for (i = 0; i < classList.length; i++) this.addClass(classList[i]);
	};

	/**
	 * Get array of CSS-style classes attached to this div.
	 *
	 * @method getClasslist
	 * @return {Array.string} array of class names
	 */
	Surface.prototype.getClassList = function getClassList() {
	    return this.classList;
	};

	/**
	 * Set or overwrite inner (HTML) content of this surface. Note that this
	 *    causes a re-rendering if the content has changed.
	 *
	 * @method setContent
	 * @param {string|Document Fragment} content HTML content
	 */
	Surface.prototype.setContent = function setContent(content) {
	    if (this.content !== content) {
	        this.content = content;
	        this._contentDirty = true;
	    }
	};

	/**
	 * Return inner (HTML) content of this surface.
	 *
	 * @method getContent
	 *
	 * @return {string} inner (HTML) content
	 */
	Surface.prototype.getContent = function getContent() {
	    return this.content;
	};

	/**
	 * Set options for this surface
	 *
	 * @method setOptions
	 * @param {Object} [options] overrides for default options.  See constructor.
	 */
	Surface.prototype.setOptions = function setOptions(options) {
	    if (options.size) this.setSize(options.size);
	    if (options.classes) this.setClasses(options.classes);
	    if (options.properties) this.setProperties(options.properties);
	    if (options.content) this.setContent(options.content);
	};

	//  Attach Famous event handling to document events emanating from target
	//    document element.  This occurs just after deployment to the document.
	//    Calling this enables methods like #on and #pipe.
	function _addEventListeners(target) {
	    for (var i in this.eventHandler.listeners) {
	        target.addEventListener(i, this.eventForwarder);
	    }
	}

	//  Detach Famous event handling from document events emanating from target
	//  document element.  This occurs just before recall from the document.
	function _removeEventListeners(target) {
	    for (var i in this.eventHandler.listeners) {
	        target.removeEventListener(i, this.eventForwarder);
	    }
	}

	 //  Apply to document all changes from removeClass() since last setup().
	function _cleanupClasses(target) {
	    for (var i = 0; i < this._dirtyClasses.length; i++) target.classList.remove(this._dirtyClasses[i]);
	    this._dirtyClasses = [];
	}

	// Apply values of all Famous-managed styles to the document element.
	//  These will be deployed to the document on call to #setup().
	function _applyStyles(target) {
	    for (var n in this.properties) {
	        target.style[n] = this.properties[n];
	    }
	}

	// Clear all Famous-managed styles from the document element.
	// These will be deployed to the document on call to #setup().
	function _cleanupStyles(target) {
	    for (var n in this.properties) {
	        target.style[n] = '';
	    }
	}

	/**
	 * Return a Matrix's webkit css representation to be used with the
	 *    CSS3 -webkit-transform style.
	 *    Example: -webkit-transform: matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,716,243,0,1)
	 *
	 * @method _formatCSSTransform
	 * @private
	 * @param {FamousMatrix} m matrix
	 * @return {string} matrix3d CSS style representation of the transform
	 */
	function _formatCSSTransform(m) {
	    m[12] = Math.round(m[12] * devicePixelRatio) / devicePixelRatio;
	    m[13] = Math.round(m[13] * devicePixelRatio) / devicePixelRatio;

	    var result = 'matrix3d(';
	    for (var i = 0; i < 15; i++) {
	        result += (m[i] < 0.000001 && m[i] > -0.000001) ? '0,' : m[i] + ',';
	    }
	    result += m[15] + ')';
	    return result;
	}

	/**
	 * Directly apply given FamousMatrix to the document element as the
	 *   appropriate webkit CSS style.
	 *
	 * @method setMatrix
	 *
	 * @static
	 * @private
	 * @param {Element} element document element
	 * @param {FamousMatrix} matrix
	 */

	var _setMatrix;
	if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
	    _setMatrix = function(element, matrix) {
	        element.style.zIndex = (matrix[14] * 1000000) | 0;    // fix for Firefox z-buffer issues
	        element.style.transform = _formatCSSTransform(matrix);
	    };
	}
	else if (usePrefix) {
	    _setMatrix = function(element, matrix) {
	        element.style.webkitTransform = _formatCSSTransform(matrix);
	    };
	}
	else {
	    _setMatrix = function(element, matrix) {
	        element.style.transform = _formatCSSTransform(matrix);
	    };
	}

	// format origin as CSS percentage string
	function _formatCSSOrigin(origin) {
	    return (100 * origin[0]) + '% ' + (100 * origin[1]) + '%';
	}

	 // Directly apply given origin coordinates to the document element as the
	 // appropriate webkit CSS style.
	var _setOrigin = usePrefix ? function(element, origin) {
	    element.style.webkitTransformOrigin = _formatCSSOrigin(origin);
	} : function(element, origin) {
	    element.style.transformOrigin = _formatCSSOrigin(origin);
	};

	 // Shrink given document element until it is effectively invisible.
	var _setInvisible = usePrefix ? function(element) {
	    element.style.webkitTransform = 'scale3d(0.0001,0.0001,1)';
	    element.style.opacity = 0;
	} : function(element) {
	    element.style.transform = 'scale3d(0.0001,0.0001,1)';
	    element.style.opacity = 0;
	};

	function _xyNotEquals(a, b) {
	    return (a && b) ? (a[0] !== b[0] || a[1] !== b[1]) : a !== b;
	}

	/**
	 * One-time setup for an element to be ready for commits to document.
	 *
	 * @private
	 * @method setup
	 *
	 * @param {ElementAllocator} allocator document element pool for this context
	 */
	Surface.prototype.setup = function setup(allocator) {
	    var target = allocator.allocate(this.elementType);
	    if (this.elementClass) {
	        if (this.elementClass instanceof Array) {
	            for (var i = 0; i < this.elementClass.length; i++) {
	                target.classList.add(this.elementClass[i]);
	            }
	        }
	        else {
	            target.classList.add(this.elementClass);
	        }
	    }
	    target.style.display = '';
	    _addEventListeners.call(this, target);
	    this._currTarget = target;
	    this._stylesDirty = true;
	    this._classesDirty = true;
	    this._sizeDirty = true;
	    this._contentDirty = true;
	    this._matrix = null;
	    this._opacity = undefined;
	    this._origin = null;
	    this._size = null;
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
	Surface.prototype.commit = function commit(context) {
	    if (!this._currTarget) this.setup(context.allocator);
	    var target = this._currTarget;

	    var matrix = context.transform;
	    var opacity = context.opacity;
	    var origin = context.origin;
	    var size = context.size;

	    if (this._classesDirty) {
	        _cleanupClasses.call(this, target);
	        var classList = this.getClassList();
	        for (var i = 0; i < classList.length; i++) target.classList.add(classList[i]);
	        this._classesDirty = false;
	    }

	    if (this._stylesDirty) {
	        _applyStyles.call(this, target);
	        this._stylesDirty = false;
	    }

	    if (this._contentDirty) {
	        this.deploy(target);
	        this.eventHandler.emit('deploy');
	        this._contentDirty = false;
	    }

	    if (this.size) {
	        var origSize = size;
	        size = [this.size[0], this.size[1]];
	        if (size[0] === undefined && origSize[0]) size[0] = origSize[0];
	        if (size[1] === undefined && origSize[1]) size[1] = origSize[1];
	    }

	    if (size[0] === true) size[0] = target.clientWidth;
	    if (size[1] === true) size[1] = target.clientHeight;

	    if (_xyNotEquals(this._size, size)) {
	        if (!this._size) this._size = [0, 0];
	        this._size[0] = size[0];
	        this._size[1] = size[1];
	        this._sizeDirty = true;
	    }

	    if (!matrix && this._matrix) {
	        this._matrix = null;
	        this._opacity = 0;
	        _setInvisible(target);
	        return;
	    }

	    if (this._opacity !== opacity) {
	        this._opacity = opacity;
	        target.style.opacity = (opacity >= 1) ? '0.999999' : opacity;
	    }

	    if (_xyNotEquals(this._origin, origin) || Transform.notEquals(this._matrix, matrix) || this._sizeDirty) {
	        if (!matrix) matrix = Transform.identity;
	        this._matrix = matrix;
	        var aaMatrix = matrix;
	        if (origin) {
	            if (!this._origin) this._origin = [0, 0];
	            this._origin[0] = origin[0];
	            this._origin[1] = origin[1];
	            aaMatrix = Transform.thenMove(matrix, [-this._size[0] * origin[0], -this._size[1] * origin[1], 0]);
	            _setOrigin(target, origin);
	        }
	        _setMatrix(target, aaMatrix);
	    }

	    if (this._sizeDirty) {
	        if (this._size) {
	            target.style.width = (this.size && this.size[0] === true) ? '' : this._size[0] + 'px';
	            target.style.height = (this.size && this.size[1] === true) ?  '' : this._size[1] + 'px';
	        }
	        this._sizeDirty = false;
	    }
	};

	/**
	 *  Remove all Famous-relevant attributes from a document element.
	 *    This is called by SurfaceManager's detach().
	 *    This is in some sense the reverse of .deploy().
	 *
	 * @private
	 * @method cleanup
	 * @param {ElementAllocator} allocator
	 */
	Surface.prototype.cleanup = function cleanup(allocator) {
	    var i = 0;
	    var target = this._currTarget;
	    this.eventHandler.emit('recall');
	    this.recall(target);
	    target.style.display = 'none';
	    target.style.width = '';
	    target.style.height = '';
	    this._size = null;
	    _cleanupStyles.call(this, target);
	    var classList = this.getClassList();
	    _cleanupClasses.call(this, target);
	    for (i = 0; i < classList.length; i++) target.classList.remove(classList[i]);
	    if (this.elementClass) {
	        if (this.elementClass instanceof Array) {
	            for (i = 0; i < this.elementClass.length; i++) {
	                target.classList.remove(this.elementClass[i]);
	            }
	        }
	        else {
	            target.classList.remove(this.elementClass);
	        }
	    }
	    _removeEventListeners.call(this, target);
	    this._currTarget = null;
	    allocator.deallocate(target);
	    _setInvisible(target);
	};

	/**
	 * Place the document element that this component manages into the document.
	 *
	 * @private
	 * @method deploy
	 * @param {Node} target document parent of this container
	 */
	Surface.prototype.deploy = function deploy(target) {
	    var content = this.getContent();
	    if (content instanceof Node) {
	        while (target.hasChildNodes()) target.removeChild(target.firstChild);
	        target.appendChild(content);
	    }
	    else target.innerHTML = content;
	};

	/**
	 * Remove any contained document content associated with this surface
	 *   from the actual document.
	 *
	 * @private
	 * @method recall
	 */
	Surface.prototype.recall = function recall(target) {
	    var df = document.createDocumentFragment();
	    while (target.hasChildNodes()) df.appendChild(target.firstChild);
	    this.setContent(df);
	};

	/**
	 *  Get the x and y dimensions of the surface.
	 *
	 * @method getSize
	 * @param {boolean} actual return computed size rather than provided
	 * @return {Array.Number} [x,y] size of surface
	 */
	Surface.prototype.getSize = function getSize(actual) {
	    return actual ? this._size : (this.size || this._size);
	};

	/**
	 * Set x and y dimensions of the surface.
	 *
	 * @method setSize
	 * @param {Array.Number} size as [width, height]
	 */
	Surface.prototype.setSize = function setSize(size) {
	    this.size = size ? [size[0], size[1]] : null;
	    this._sizeDirty = true;
	};

	module.exports = Surface;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Surface = __webpack_require__(27);

	/**
	 * A Famo.us surface in the form of an HTML input element.
	 *   This extends the Surface class.
	 *
	 * @class InputSurface
	 * @extends Surface
	 * @constructor
	 * @param {Object} [options] overrides of default options
	 * @param {string} [options.placeholder] placeholder text hint that describes the expected value of an <input> element
	 * @param {string} [options.type] specifies the type of element to display (e.g. 'datetime', 'text', 'button', etc.)
	 * @param {string} [options.value] value of text
	 */
	function InputSurface(options) {
	    this._placeholder = options.placeholder || '';
	    this._value       = options.value || '';
	    this._type        = options.type || 'text';
	    this._name        = options.name || '';

	    Surface.apply(this, arguments);

	    this.on('click', this.focus.bind(this));
	    window.addEventListener('click', function(event) {
	        if (event.target !== this._currTarget) this.blur();
	    }.bind(this));
	}
	InputSurface.prototype = Object.create(Surface.prototype);
	InputSurface.prototype.constructor = InputSurface;

	InputSurface.prototype.elementType = 'input';
	InputSurface.prototype.elementClass = 'famous-surface';

	/**
	 * Set placeholder text.  Note: Triggers a repaint.
	 *
	 * @method setPlaceholder
	 * @param {string} str Value to set the placeholder to.
	 * @return {InputSurface} this, allowing method chaining.
	 */
	InputSurface.prototype.setPlaceholder = function setPlaceholder(str) {
	    this._placeholder = str;
	    this._contentDirty = true;
	    return this;
	};

	/**
	 * Focus on the current input, pulling up the keyboard on mobile.
	 *
	 * @method focus
	 * @return {InputSurface} this, allowing method chaining.
	 */
	InputSurface.prototype.focus = function focus() {
	    if (this._currTarget) this._currTarget.focus();
	    return this;
	};

	/**
	 * Blur the current input, hiding the keyboard on mobile.
	 *
	 * @method blur
	 * @return {InputSurface} this, allowing method chaining.
	 */
	InputSurface.prototype.blur = function blur() {
	    if (this._currTarget) this._currTarget.blur();
	    return this;
	};

	/**
	 * Set the placeholder conent.
	 *   Note: Triggers a repaint next tick.
	 *
	 * @method setValue
	 * @param {string} str Value to set the main input value to.
	 * @return {InputSurface} this, allowing method chaining.
	 */
	InputSurface.prototype.setValue = function setValue(str) {
	    this._value = str;
	    this._contentDirty = true;
	    return this;
	};

	/**
	 * Set the type of element to display conent.
	 *   Note: Triggers a repaint next tick.
	 *
	 * @method setType
	 * @param {string} str type of the input surface (e.g. 'button', 'text')
	 * @return {InputSurface} this, allowing method chaining.
	 */
	InputSurface.prototype.setType = function setType(str) {
	    this._type = str;
	    this._contentDirty = true;
	    return this;
	};

	/**
	 * Get the value of the inner content of the element (e.g. the entered text)
	 *
	 * @method getValue
	 * @return {string} value of element
	 */
	InputSurface.prototype.getValue = function getValue() {
	    if (this._currTarget) {
	        return this._currTarget.value;
	    }
	    else {
	        return this._value;
	    }
	};

	/**
	 * Set the name attribute of the element.
	 *   Note: Triggers a repaint next tick.
	 *
	 * @method setName
	 * @param {string} str element name
	 * @return {InputSurface} this, allowing method chaining.
	 */
	InputSurface.prototype.setName = function setName(str) {
	    this._name = str;
	    this._contentDirty = true;
	    return this;
	};

	/**
	 * Get the name attribute of the element.
	 *
	 * @method getName
	 * @return {string} name of element
	 */
	InputSurface.prototype.getName = function getName() {
	    return this._name;
	};

	/**
	 * Place the document element this component manages into the document.
	 *
	 * @private
	 * @method deploy
	 * @param {Node} target document parent of this container
	 */
	InputSurface.prototype.deploy = function deploy(target) {
	    if (this._placeholder !== '') target.placeholder = this._placeholder;
	    target.value = this._value;
	    target.type = this._type;
	    target.name = this._name;
	};

	module.exports = InputSurface;

/***/ },
/* 29 */
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
/* 30 */
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
/* 31 */
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Surface = __webpack_require__(27);

	/**
	 * A surface containing an HTML5 Canvas element.
	 *   This extends the Surface class.
	 *
	 * @class CanvasSurface
	 * @extends Surface
	 * @constructor
	 * @param {Object} [options] overrides of default options
	 * @param {Array.Number} [options.canvasSize] [width, height] for document element
	 */
	function CanvasSurface(options) {
	    if (options && options.canvasSize) this._canvasSize = options.canvasSize;
	    Surface.apply(this, arguments);
	    if (!this._canvasSize) this._canvasSize = this.getSize();
	    this._backBuffer = document.createElement('canvas');
	    if (this._canvasSize) {
	        this._backBuffer.width = this._canvasSize[0];
	        this._backBuffer.height = this._canvasSize[1];
	    }
	    this._contextId = undefined;
	}

	CanvasSurface.prototype = Object.create(Surface.prototype);
	CanvasSurface.prototype.constructor = CanvasSurface;
	CanvasSurface.prototype.elementType = 'canvas';
	CanvasSurface.prototype.elementClass = 'famous-surface';

	/**
	 * Set inner document content.  Note that this is a noop for CanvasSurface.
	 *
	 * @method setContent
	 *
	 */
	CanvasSurface.prototype.setContent = function setContent() {};

	/**
	 * Place the document element this component manages into the document.
	 *    This will draw the content to the document.
	 *
	 * @private
	 * @method deploy
	 * @param {Node} target document parent of this container
	 */
	CanvasSurface.prototype.deploy = function deploy(target) {
	    if (this._canvasSize) {
	        target.width = this._canvasSize[0];
	        target.height = this._canvasSize[1];
	    }
	    if (this._contextId === '2d') {
	        target.getContext(this._contextId).drawImage(this._backBuffer, 0, 0);
	        this._backBuffer.width = 0;
	        this._backBuffer.height = 0;
	    }
	};

	/**
	 * Remove this component and contained content from the document
	 *
	 * @private
	 * @method recall
	 *
	 * @param {Node} target node to which the component was deployed
	 */
	CanvasSurface.prototype.recall = function recall(target) {
	    var size = this.getSize();

	    this._backBuffer.width = target.width;
	    this._backBuffer.height = target.height;

	    if (this._contextId === '2d') {
	        this._backBuffer.getContext(this._contextId).drawImage(target, 0, 0);
	        target.width = 0;
	        target.height = 0;
	    }
	};

	/**
	 * Returns the canvas element's context
	 *
	 * @method getContext
	 * @param {string} contextId context identifier
	 */
	CanvasSurface.prototype.getContext = function getContext(contextId) {
	    this._contextId = contextId;
	    return this._currTarget ? this._currTarget.getContext(contextId) : this._backBuffer.getContext(contextId);
	};

	/**
	 *  Set the size of the surface and canvas element.
	 *
	 *  @method setSize
	 *  @param {Array.number} size [width, height] of surface
	 *  @param {Array.number} canvasSize [width, height] of canvas surface
	 */
	CanvasSurface.prototype.setSize = function setSize(size, canvasSize) {
	    Surface.prototype.setSize.apply(this, arguments);
	    if (canvasSize) this._canvasSize = [canvasSize[0], canvasSize[1]];
	    if (this._currTarget) {
	        this._currTarget.width = this._canvasSize[0];
	        this._currTarget.height = this._canvasSize[1];
	    }
	};

	module.exports = CanvasSurface;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var EventHandler = __webpack_require__(36);
	var OptionsManager = __webpack_require__(34);
	var RenderNode = __webpack_require__(57);

	/**
	 * Useful for quickly creating elements within applications
	 *   with large event systems.  Consists of a RenderNode paired with
	 *   an input EventHandler and an output EventHandler.
	 *   Meant to be extended by the developer.
	 *
	 * @class View
	 * @uses EventHandler
	 * @uses OptionsManager
	 * @uses RenderNode
	 * @constructor
	 */
	function View(options) {
	    this._node = new RenderNode();

	    this._eventInput = new EventHandler();
	    this._eventOutput = new EventHandler();
	    EventHandler.setInputHandler(this, this._eventInput);
	    EventHandler.setOutputHandler(this, this._eventOutput);

	    this.options = Object.create(this.constructor.DEFAULT_OPTIONS || View.DEFAULT_OPTIONS);
	    this._optionsManager = new OptionsManager(this.options);

	    if (options) this.setOptions(options);
	}

	View.DEFAULT_OPTIONS = {}; // no defaults

	/**
	 * Look up options value by key
	 * @method getOptions
	 *
	 * @param {string} key key
	 * @return {Object} associated object
	 */
	View.prototype.getOptions = function getOptions() {
	    return this._optionsManager.value();
	};

	/*
	 *  Set internal options.
	 *  No defaults options are set in View.
	 *
	 *  @method setOptions
	 *  @param {Object} options
	 */
	View.prototype.setOptions = function setOptions(options) {
	    this._optionsManager.patch(options);
	};

	/**
	 * Add a child renderable to the view.
	 *   Note: This is meant to be used by an inheriting class
	 *   rather than from outside the prototype chain.
	 *
	 * @method add
	 * @return {RenderNode}
	 * @protected
	 */
	View.prototype.add = function add() {
	    return this._node.add.apply(this._node, arguments);
	};

	/**
	 * Alias for add
	 * @method _add
	 */
	View.prototype._add = View.prototype.add;

	/**
	 * Generate a render spec from the contents of this component.
	 *
	 * @private
	 * @method render
	 * @return {number} Render spec for this component
	 */
	View.prototype.render = function render() {
	    return this._node.render();
	};

	/**
	 * Return size of contained element.
	 *
	 * @method getSize
	 * @return {Array.Number} [width, height]
	 */
	View.prototype.getSize = function getSize() {
	    if (this._node && this._node.getSize) {
	        return this._node.getSize.apply(this._node, arguments) || this.options.size;
	    }
	    else return this.options.size;
	};

	module.exports = View;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var EventHandler = __webpack_require__(36);

	/**
	 *  A collection of methods for setting options which can be extended
	 *  onto other classes.
	 *
	 *
	 *  **** WARNING ****
	 *  You can only pass through objects that will compile into valid JSON.
	 *
	 *  Valid options:
	 *      Strings,
	 *      Arrays,
	 *      Objects,
	 *      Numbers,
	 *      Nested Objects,
	 *      Nested Arrays.
	 *
	 *    This excludes:
	 *        Document Fragments,
	 *        Functions
	 * @class OptionsManager
	 * @constructor
	 * @param {Object} value options dictionary
	 */
	function OptionsManager(value) {
	    this._value = value;
	    this.eventOutput = null;
	}

	/**
	 * Create options manager from source dictionary with arguments overriden by patch dictionary.
	 *
	 * @static
	 * @method OptionsManager.patch
	 *
	 * @param {Object} source source arguments
	 * @param {...Object} data argument additions and overwrites
	 * @return {Object} source object
	 */
	OptionsManager.patch = function patchObject(source, data) {
	    var manager = new OptionsManager(source);
	    for (var i = 1; i < arguments.length; i++) manager.patch(arguments[i]);
	    return source;
	};

	function _createEventOutput() {
	    this.eventOutput = new EventHandler();
	    this.eventOutput.bindThis(this);
	    EventHandler.setOutputHandler(this, this.eventOutput);
	}

	/**
	 * Create OptionsManager from source with arguments overriden by patches.
	 *   Triggers 'change' event on this object's event handler if the state of
	 *   the OptionsManager changes as a result.
	 *
	 * @method patch
	 *
	 * @param {...Object} arguments list of patch objects
	 * @return {OptionsManager} this
	 */
	OptionsManager.prototype.patch = function patch() {
	    var myState = this._value;
	    for (var i = 0; i < arguments.length; i++) {
	        var data = arguments[i];
	        for (var k in data) {
	            if ((k in myState) && (data[k] && data[k].constructor === Object) && (myState[k] && myState[k].constructor === Object)) {
	                if (!myState.hasOwnProperty(k)) myState[k] = Object.create(myState[k]);
	                this.key(k).patch(data[k]);
	                if (this.eventOutput) this.eventOutput.emit('change', {id: k, value: this.key(k).value()});
	            }
	            else this.set(k, data[k]);
	        }
	    }
	    return this;
	};

	/**
	 * Alias for patch
	 *
	 * @method setOptions
	 *
	 */
	OptionsManager.prototype.setOptions = OptionsManager.prototype.patch;

	/**
	 * Return OptionsManager based on sub-object retrieved by key
	 *
	 * @method key
	 *
	 * @param {string} identifier key
	 * @return {OptionsManager} new options manager with the value
	 */
	OptionsManager.prototype.key = function key(identifier) {
	    var result = new OptionsManager(this._value[identifier]);
	    if (!(result._value instanceof Object) || result._value instanceof Array) result._value = {};
	    return result;
	};

	/**
	 * Look up value by key
	 * @method get
	 *
	 * @param {string} key key
	 * @return {Object} associated object
	 */
	OptionsManager.prototype.get = function get(key) {
	    return this._value[key];
	};

	/**
	 * Alias for get
	 * @method getOptions
	 */
	OptionsManager.prototype.getOptions = OptionsManager.prototype.get;

	/**
	 * Set key to value.  Outputs 'change' event if a value is overwritten.
	 *
	 * @method set
	 *
	 * @param {string} key key string
	 * @param {Object} value value object
	 * @return {OptionsManager} new options manager based on the value object
	 */
	OptionsManager.prototype.set = function set(key, value) {
	    var originalValue = this.get(key);
	    this._value[key] = value;
	    if (this.eventOutput && value !== originalValue) this.eventOutput.emit('change', {id: key, value: value});
	    return this;
	};

	/**
	 * Return entire object contents of this OptionsManager.
	 *
	 * @method value
	 *
	 * @return {Object} current state of options
	 */
	OptionsManager.prototype.value = function value() {
	    return this._value;
	};

	/**
	 * Bind a callback function to an event type handled by this object.
	 *
	 * @method "on"
	 *
	 * @param {string} type event type key (for example, 'change')
	 * @param {function(string, Object)} handler callback
	 * @return {EventHandler} this
	 */
	OptionsManager.prototype.on = function on() {
	    _createEventOutput.call(this);
	    return this.on.apply(this, arguments);
	};

	/**
	 * Unbind an event by type and handler.
	 *   This undoes the work of "on".
	 *
	 * @method removeListener
	 *
	 * @param {string} type event type key (for example, 'change')
	 * @param {function} handler function object to remove
	 * @return {EventHandler} internal event handler object (for chaining)
	 */
	OptionsManager.prototype.removeListener = function removeListener() {
	    _createEventOutput.call(this);
	    return this.removeListener.apply(this, arguments);
	};

	/**
	 * Add event handler object to set of downstream handlers.
	 *
	 * @method pipe
	 *
	 * @param {EventHandler} target event handler target object
	 * @return {EventHandler} passed event handler
	 */
	OptionsManager.prototype.pipe = function pipe() {
	    _createEventOutput.call(this);
	    return this.pipe.apply(this, arguments);
	};

	/**
	 * Remove handler object from set of downstream handlers.
	 * Undoes work of "pipe"
	 *
	 * @method unpipe
	 *
	 * @param {EventHandler} target target handler object
	 * @return {EventHandler} provided target
	 */
	OptionsManager.prototype.unpipe = function unpipe() {
	    _createEventOutput.call(this);
	    return this.unpipe.apply(this, arguments);
	};

	module.exports = OptionsManager;

/***/ },
/* 35 */
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

	/*global define*/
	/*eslint no-use-before-define:0 */

	/**
	 * Internal LayoutNode class used by `FlowLayoutController`.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {

	    // import dependencies
	    var Transform = __webpack_require__(25);
	    var Vector = __webpack_require__(43);
	    var Particle = __webpack_require__(45);
	    var Spring = __webpack_require__(47);
	    var PhysicsEngine = __webpack_require__(44);
	    var LayoutNode = __webpack_require__(39);

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

	        if (!this._pe) {
	            this._pe = new PhysicsEngine();
	        }

	        if (!this._properties) {
	            this._properties = {
	                /*opacity: undefined,
	                size: undefined,
	                origin: undefined,
	                align: undefined,
	                translate: undefined,
	                skew: undefined,
	                rotate: undefined,
	                scale: undefined*/
	            };
	        }
	        else {
	            for (var propName in this._properties) {
	                this._properties[propName].init = false;
	            }
	        }

	        this._initial = true;
	        this._endstatereached = false;
	        if (spec) {
	            _setFromSpec.call(this, spec);
	        }
	    }
	    FlowLayoutNode.prototype = Object.create(LayoutNode.prototype);
	    FlowLayoutNode.prototype.constructor = FlowLayoutNode;

	    /**
	     * Defaults
	     */
	    var DEFAULT = {
	        opacity: 1,
	        size: [0, 0],
	        origin: [0, 0],
	        align: [0, 0],
	        scale: [1, 1, 1],
	        translate: [0, 0, 0],
	        rotate: [0, 0, 0],
	        skew: [0, 0, 0]
	    };

	    /**
	     * Set the properties from a spec.
	     */
	    function _equalsXYZ(ar1, ar2) {
	        return (ar1[0] === ar2[0]) && (ar1[1] === ar2[1]) && (ar1[2] === ar2[2]);
	    }
	    function _setFromSpec(spec) {
	        var set = {};
	        if (spec.opacity !== undefined) {
	            set.opacity = spec.opacity;
	        }
	        if (spec.size !== undefined) {
	            set.size = spec.size;
	        }
	        if (spec.align !== undefined) {
	            set.align = spec.align;
	        }
	        if (spec.origin !== undefined) {
	            set.origin = spec.origin;
	        }
	        if (spec.transform) {
	            var transform = Transform.interpret(spec.transform);
	            if (!_equalsXYZ(transform.translate, DEFAULT.translate)) {
	                set.translate = transform.translate;
	            }
	            if (!_equalsXYZ(transform.scale, DEFAULT.scale)) {
	                set.scale = transform.scale;
	            }
	            if (!_equalsXYZ(transform.skew, DEFAULT.skew)) {
	                set.skew = transform.skew;
	            }
	            if (!_equalsXYZ(transform.rotate, DEFAULT.rotate)) {
	                set.rotate = transform.rotate;
	            }
	        }
	        this.set(set);
	        return set;
	    }

	    /**
	     * Reset the end-state. This function is called on all layout-nodes prior to
	     * calling the layout-function. So that the layout-function starts with a clean slate.
	     */
	    FlowLayoutNode.prototype.reset = function() {
	        if (this._invalidated) {
	            for (var propName in this._properties) {
	                this._properties[propName].endState.set(DEFAULT[propName]);
	            }
	            this._invalidated = false;
	        }
	        this._spec.trueSizeRequested = false;
	    };

	    /**
	     * Markes the node for removal.
	     */
	    FlowLayoutNode.prototype.remove = function(removeSpec) {

	        // Transition to the remove-spec state
	        if (removeSpec) {

	            // Stop the particle from moving by setting the end-state
	            // to the current particle state
	            for (var propName in this._properties) {
	                if (removeSpec[propName] === undefined) {
	                    this._properties[propName].endState.set(
	                        this._properties[propName].particle.position.get()
	                    );
	                }
	            }

	            // Set end-state
	            _setFromSpec.call(this, removeSpec);
	        }
	        else {

	            // No end-state specified, remove immediately
	            this._endstatereached = true;
	        }

	        // Mark for removal
	        this._removing = true;
	        this._invalidated = false;
	    };

	    /**
	     * Destroys the layout-node by removing all the particles and
	     * forces from the physics-engine.
	     */
	    FlowLayoutNode.prototype.destroy = function() {
	        /*for (var propName in this._properties) {
	            var prop = this._properties[propName];
	            if (prop.particle) {
	                var pe = this._physicsEngines[propName];
	                pe.removeBody(prop.particle);
	                delete prop.particle;
	                delete prop.force;
	                delete prop.endstate;
	            }
	            delete this._properties[propName];
	        }*/
	    };

	    /**
	     * Creates the render-spec
	     */
	    var ENERGY_RESTTOLERANCE = 1e-10;
	    var VALUE_RESTTOLERANCE = 1e-6;
	    FlowLayoutNode.prototype.getSpec = function(lockDirection) {

	        // Check whether the any property is still animating
	        if (!this._endstatereached &&
	            !(!this._invalidated && this._initial)) { // when a node was added (e.g. using insert), but it was immediately not layed-out, then remove it
	            this._endstatereached = true;
	            for (var propName in this._properties) {
	                var prop = this._properties[propName];
	                if (prop.init) {
	                    var energy = prop.particle.getEnergy();
	                    if (energy > ENERGY_RESTTOLERANCE) {
	                        this._endstatereached = false;
	                        break;
	                    }
	                    else {
	                        var curState = prop.particle.getPosition();
	                        var endState = prop.endState.get();
	                        if (endState.length !== curState.length) {
	                            this._endstatereached = false;
	                            break;
	                        }
	                        for (var i = 0; i < curState.length; i++) {
	                            if (Math.abs(curState[i] - endState[i]) > VALUE_RESTTOLERANCE) {
	                                this._endstatereached = false;
	                                break;
	                            }
	                        }
	                    }
	                }
	            }
	        }
	        else {

	            // Animations have stopped
	            //return !this._invalidated ? undefined : this._spec;
	            if (this._invalidated) {
	                return this._spec;
	            }
	            else {
	                return undefined;
	            }
	        }

	        // Animations are still going, build new spec
	        this._initial = false;
	        this._spec.opacity = (this._properties.opacity && this._properties.opacity.init) ? Math.max(0,Math.min(1, this._properties.opacity.particle.getPosition1D())) : undefined;
	        this._spec.size = (this._properties.size && this._properties.size.init) ? this._properties.size.particle.getPosition() : undefined;
	        this._spec.align = (this._properties.align && this._properties.align.init) ? this._properties.align.particle.getPosition() : undefined;
	        this._spec.origin = (this._properties.origin && this._properties.origin.init) ? this._properties.origin.particle.getPosition() : undefined;
	        this._spec.transform = Transform.build({
	            translate: (this._properties.translate && this._properties.translate.init) ? this._properties.translate.particle.getPosition() : DEFAULT.translate,
	            skew: (this._properties.skew && this._properties.skew.init) ? this._properties.skew.particle.getPosition() : DEFAULT.skew,
	            scale: (this._properties.scale && this._properties.scale.init) ? this._properties.scale.particle.getPosition() : DEFAULT.scale,
	            rotate: (this._properties.rotate && this._properties.rotate.init) ? this._properties.rotate.particle.getPosition() : DEFAULT.rotate
	        });

	        // For scrolling views, lock the x/y position to the end-state.
	        // This ensures that the layout-nodes instantly update their x/y position
	        // whenever the view is scrolled, as opposed to updating smoothly using
	        // a spring, which makes it feel laggy when scrolling.
	        if (this._properties.translate && this._properties.translate.init && (lockDirection !== undefined)) {
	            this._spec.transform[12 + lockDirection] = this._properties.translate.endState.get()[lockDirection];
	        }

	        /*console.log(JSON.stringify({
	            opacity: this._spec.opacity,
	            size: this._spec.size,
	            align: this._spec.align,
	            origin: this._spec.origin,
	            transform: this._spec.transform
	        }));*/

	        return this._spec;
	    };

	    /**
	     * Set the content of the node
	     *
	     * @param {Object} set
	     */
	     var AXES = {
	        opacity:    Particle.AXES.X,
	        size:       Particle.AXES.X | Particle.AXES.Y,
	        origin:     Particle.AXES.X | Particle.AXES.Y,
	        align:      Particle.AXES.X | Particle.AXES.Y,
	        scale:      Particle.AXES.X | Particle.AXES.Y | Particle.AXES.Z,
	        translate:  Particle.AXES.X | Particle.AXES.Y | Particle.AXES.Z,
	        rotate:     Particle.AXES.X | Particle.AXES.Y | Particle.AXES.Z,
	        skew:       Particle.AXES.X | Particle.AXES.Y | Particle.AXES.Z
	    };
	    FlowLayoutNode.prototype.set = function(set) {
	        for (var propName in set) {
	            var value = set[propName];
	            if (value !== undefined) {
	                var prop = this._properties[propName];
	                if (!prop) {
	                    prop = {
	                        particle: new Particle({
	                            axis: AXES[propName],
	                            position: this._initial ? value : DEFAULT[propName]
	                        }),
	                        endState: new Vector(value)
	                    };
	                    prop.force = new Spring({
	                        dampingRatio: 0.8,
	                        period: 300,
	                        anchor : prop.endState
	                    });
	                    this._pe.addBody(prop.particle);
	                    prop.forceId = this._pe.attach(prop.force, prop.particle);
	                    this._properties[propName] = prop;
	                }
	                else {
	                    prop.endState.set(value);
	                }
	                prop.init = true;
	                this._invalidated = true;
	                this._removing = false;
	                this._endstatereached = false;
	            }
	        }
	    };

	    module.exports = FlowLayoutNode;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var EventEmitter = __webpack_require__(58);

	/**
	 * EventHandler forwards received events to a set of provided callback functions.
	 * It allows events to be captured, processed, and optionally piped through to other event handlers.
	 *
	 * @class EventHandler
	 * @extends EventEmitter
	 * @constructor
	 */
	function EventHandler() {
	    EventEmitter.apply(this, arguments);

	    this.downstream = []; // downstream event handlers
	    this.downstreamFn = []; // downstream functions

	    this.upstream = []; // upstream event handlers
	    this.upstreamListeners = {}; // upstream listeners
	}
	EventHandler.prototype = Object.create(EventEmitter.prototype);
	EventHandler.prototype.constructor = EventHandler;

	/**
	 * Assign an event handler to receive an object's input events.
	 *
	 * @method setInputHandler
	 * @static
	 *
	 * @param {Object} object object to mix trigger, subscribe, and unsubscribe functions into
	 * @param {EventHandler} handler assigned event handler
	 */
	EventHandler.setInputHandler = function setInputHandler(object, handler) {
	    object.trigger = handler.trigger.bind(handler);
	    if (handler.subscribe && handler.unsubscribe) {
	        object.subscribe = handler.subscribe.bind(handler);
	        object.unsubscribe = handler.unsubscribe.bind(handler);
	    }
	};

	/**
	 * Assign an event handler to receive an object's output events.
	 *
	 * @method setOutputHandler
	 * @static
	 *
	 * @param {Object} object object to mix pipe, unpipe, on, addListener, and removeListener functions into
	 * @param {EventHandler} handler assigned event handler
	 */
	EventHandler.setOutputHandler = function setOutputHandler(object, handler) {
	    if (handler instanceof EventHandler) handler.bindThis(object);
	    object.pipe = handler.pipe.bind(handler);
	    object.unpipe = handler.unpipe.bind(handler);
	    object.on = handler.on.bind(handler);
	    object.addListener = object.on;
	    object.removeListener = handler.removeListener.bind(handler);
	};

	/**
	 * Trigger an event, sending to all downstream handlers
	 *   listening for provided 'type' key.
	 *
	 * @method emit
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {Object} event event data
	 * @return {EventHandler} this
	 */
	EventHandler.prototype.emit = function emit(type, event) {
	    EventEmitter.prototype.emit.apply(this, arguments);
	    var i = 0;
	    for (i = 0; i < this.downstream.length; i++) {
	        if (this.downstream[i].trigger) this.downstream[i].trigger(type, event);
	    }
	    for (i = 0; i < this.downstreamFn.length; i++) {
	        this.downstreamFn[i](type, event);
	    }
	    return this;
	};

	/**
	 * Alias for emit
	 * @method addListener
	 */
	EventHandler.prototype.trigger = EventHandler.prototype.emit;

	/**
	 * Add event handler object to set of downstream handlers.
	 *
	 * @method pipe
	 *
	 * @param {EventHandler} target event handler target object
	 * @return {EventHandler} passed event handler
	 */
	EventHandler.prototype.pipe = function pipe(target) {
	    if (target.subscribe instanceof Function) return target.subscribe(this);

	    var downstreamCtx = (target instanceof Function) ? this.downstreamFn : this.downstream;
	    var index = downstreamCtx.indexOf(target);
	    if (index < 0) downstreamCtx.push(target);

	    if (target instanceof Function) target('pipe', null);
	    else if (target.trigger) target.trigger('pipe', null);

	    return target;
	};

	/**
	 * Remove handler object from set of downstream handlers.
	 *   Undoes work of "pipe".
	 *
	 * @method unpipe
	 *
	 * @param {EventHandler} target target handler object
	 * @return {EventHandler} provided target
	 */
	EventHandler.prototype.unpipe = function unpipe(target) {
	    if (target.unsubscribe instanceof Function) return target.unsubscribe(this);

	    var downstreamCtx = (target instanceof Function) ? this.downstreamFn : this.downstream;
	    var index = downstreamCtx.indexOf(target);
	    if (index >= 0) {
	        downstreamCtx.splice(index, 1);
	        if (target instanceof Function) target('unpipe', null);
	        else if (target.trigger) target.trigger('unpipe', null);
	        return target;
	    }
	    else return false;
	};

	/**
	 * Bind a callback function to an event type handled by this object.
	 *
	 * @method "on"
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {function(string, Object)} handler callback
	 * @return {EventHandler} this
	 */
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

	/**
	 * Alias for "on"
	 * @method addListener
	 */
	EventHandler.prototype.addListener = EventHandler.prototype.on;

	/**
	 * Listen for events from an upstream event handler.
	 *
	 * @method subscribe
	 *
	 * @param {EventEmitter} source source emitter object
	 * @return {EventHandler} this
	 */
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

	/**
	 * Stop listening to events from an upstream event handler.
	 *
	 * @method unsubscribe
	 *
	 * @param {EventEmitter} source source emitter object
	 * @return {EventHandler} this
	 */
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */



	/**
	 * A singleton that maintains a global registry of Surfaces.
	 *   Private.
	 *
	 * @private
	 * @static
	 * @class Entity
	 */

	var entities = [];

	/**
	 * Get entity from global index.
	 *
	 * @private
	 * @method get
	 * @param {Number} id entity reigstration id
	 * @return {Surface} entity in the global index
	 */
	function get(id) {
	    return entities[id];
	}

	/**
	 * Overwrite entity in the global index
	 *
	 * @private
	 * @method set
	 * @param {Number} id entity reigstration id
	 * @return {Surface} entity to add to the global index
	 */
	function set(id, entity) {
	    entities[id] = entity;
	}

	/**
	 * Add entity to global index
	 *
	 * @private
	 * @method register
	 * @param {Surface} entity to add to global index
	 * @return {Number} new id
	 */
	function register(entity) {
	    var id = entities.length;
	    set(id, entity);
	    return id;
	}

	/**
	 * Remove entity from global index
	 *
	 * @private
	 * @method unregister
	 * @param {Number} id entity reigstration id
	 */
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
/* 38 */
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

	/*global define*/
	/*eslint no-use-before-define:0 */

	/**
	 * LayoutNodeManager is a private class used internally by the LayoutControllers and
	 * ScrollViews. It manages the layout-nodes that are rendered exposes the layout-context
	 * which is passed along to the layout-function.
	 *
	 * LayoutNodeManager keept track of every rendered node through an ordered single-linked
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
	    var LayoutNode = __webpack_require__(39);
	    var LayoutContext = __webpack_require__(59);

	    var MAX_POOL_SIZE = 10;

	    /**
	     * @class
	     * @param {Function} createLayoutNodeFunction function to use when creating new nodes
	     * @alias module:LayoutNodeManager
	     */
	    function LayoutNodeManager(createLayoutNodeFunction) {
	        this._createLayoutNodeFunction = createLayoutNodeFunction;
	        this._context = new LayoutContext({
	            next: _contextNextNode.bind(this),
	            prev: _contextPrevNode.bind(this),
	            get: _contextGetNode.bind(this),
	            set: _contextSetNode.bind(this),
	            resolveSize: _contextResolveSize.bind(this)
	        });
	        this._contextState = {
	            // enumation state for the context
	            //nextSequence: undefined,
	            //prevSequence: undefined,
	            //next: undefined,
	            //prev: undefined
	        };
	        this._pool = {
	            size: 0
	            //first: undefined
	        };
	        //this._first = undefined; // first item in the linked list
	        //this._currentRenderNode = undefined; // first node in the view-sequence
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
	        this._nodesById = nodesById;
	        this._trueSizeRequested = false;
	        this._currentRenderNode = viewSequence ? viewSequence.get() : undefined;

	        // Prepare context for enumation
	        this._contextState.nextSequence = viewSequence;
	        this._contextState.prevSequence = viewSequence;
	        this._contextState.next = undefined;
	        this._contextState.prev = undefined;

	        // Prepare content
	        this._context.size = contextData.size;
	        this._context.direction = contextData.direction;
	        this._context.scrollOffset = contextData.scrollOffset || 0;
	        return this._context;
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
	            if (!node._invalidated && !node._removing) {
	                node.remove(removeSpec);
	            }
	            node = node._next;
	        }
	    };

	    /**
	     * Builds the render-spec and destroy any layout-nodes that no longer
	     * return a render-spec.
	     *
	     * @return {Array.Spec} array of Specs
	     */
	    LayoutNodeManager.prototype.buildSpecAndDestroyUnrenderedNodes = function(lockDirection) {
	        var result = [];
	        var node = this._first;
	        while (node) {
	            var spec = node.getSpec(lockDirection);
	            if (!spec) {

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
	                var destroyNode = node;
	                node = node._next;
	                destroyNode.destroy();
	                if (this._current === destroyNode) {
	                    this._current = undefined;
	                }

	                // Add node to pool
	                if (this._pool.size < MAX_POOL_SIZE) {
	                    this._pool.size++;
	                    destroyNode._next = this._pool.first;
	                    this._pool.first = destroyNode;
	                }

	                _checkIntegrity.call(this);
	            }
	            else {

	                // Add node to result output
	                result.push(spec);
	                node = node._next;
	            }
	        }
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
	            if (node._spec.renderNode === renderable) {
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
	        _checkIntegrity.call(this);
	    };

	    /**
	     * Creates a layout-node
	     *
	     * @param {Object} renderNode render-node for whom to create a layout-node for
	     * @return {LayoutNode} layout-node
	     */
	    LayoutNodeManager.prototype.createNode = function(renderNode) {
	        if (this._pool.first) {
	            var layoutNode = this._pool.first;
	            this._pool.first = layoutNode._next;
	            this._pool.size--;
	            layoutNode._prev = undefined;
	            layoutNode._next = undefined;
	            layoutNode.constructor.apply(layoutNode, arguments);
	            return layoutNode;
	        }
	        else {
	            return this._createLayoutNodeFunction.apply(this, arguments);
	        }
	    };

	    /**
	     * Checks whether the end of was reached when using next/prev
	     * to enumerate the nodes.
	     *
	     * @param {Boolean} prev prev or next direction
	     */
	    LayoutNodeManager.prototype.endReached = function(prev) {
	        if (prev) {
	            if (!this._contextState.prevSequence) {
	                return true;
	            }
	            var prevSequence = this._contextState.prevSequence.getPrevious();
	            return !(prevSequence && prevSequence.get());
	        }
	        else {
	            return !(this._contextState.nextSequence && this._contextState.nextSequence.get());
	        }
	    };

	    function _checkIntegrity() {
	        /*var node = this._first;
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
	        }*/
	    }

	    function _contextGetCreateAndOrderNodes(renderNode, prev) {

	        // The first time this function is called, the current
	        // prev/next position is obtained.
	        var node;
	        if (!this._contextState.next) {
	            var currentRenderNode = this._currentRenderNode || renderNode;
	            if (this._current && (this._current._spec.renderNode === currentRenderNode)) {
	                node = this._current;
	            }
	            else {
	                node = this._first;
	                while (node) {
	                    if (node._spec.renderNode === currentRenderNode) {
	                        break;
	                    }
	                    node = node._next;
	                }
	                if (!node) {
	                    node = this.createNode(currentRenderNode);
	                    node._next = this._first;
	                    if (this._first) {
	                        this._first._prev = node;
	                    }
	                    this._first = node;
	                }
	                this._current = node;
	            }
	            this._contextState.next = node;
	            this._contextState.prev = node;

	            _checkIntegrity.call(this);
	        }

	        // Check whether node already exist at the correct position
	        // in the linked-list. If so, return that node immediately
	        // and advanced the prev/next pointer for the next/prev
	        // lookup operation.
	        if (prev) {
	            if (this._contextState.prev) {
	                var prevNode = this._contextState.prev._prev;
	                if (prevNode && (prevNode._spec.renderNode === renderNode)) {
	                    this._contextState.prev = prevNode;
	                    _checkIntegrity.call(this);
	                    return prevNode;
	                }
	            }
	        }
	        else {
	            var nextNode = this._contextState.next;
	            if (nextNode && (nextNode._spec.renderNode === renderNode)) {
	                if (nextNode._next) {
	                    this._contextState.next = nextNode._next;
	                }
	                _checkIntegrity.call(this);
	                return nextNode;
	            }
	        }

	        // Lookup the node anywhere in the list..
	        node = this._first;
	        while (node) {
	            if (node._spec.renderNode === renderNode) {
	                break;
	            }
	            node = node._next;
	        }

	        // Create new node if neccessary
	        if (!node) {
	            node = this.createNode(renderNode);
	            node._next = undefined;
	            node._prev = undefined;
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
	            _checkIntegrity.call(this);
	        }

	        // Insert node into the linked list
	        if (prev) {
	            if (this._contextState.prev._prev) {
	                node._prev = this._contextState.prev._prev;
	                this._contextState.prev._prev._next = node;
	            }
	            else {
	                this._first = node;
	            }
	            this._contextState.prev._prev = node;
	            node._next = this._contextState.prev;
	            this._contextState.prev = node;
	        }
	        else {
	            if (this._contextState.next._next) {
	                node._next = this._contextState.next._next;
	                this._contextState.next._next._prev = node;
	            }
	            this._contextState.next._next = node;
	            node._prev = this._contextState.next;
	            this._contextState.next = node;
	        }
	        _checkIntegrity.call(this);

	        return node;
	    }

	    /**
	     * Get the next layout-node
	     */
	    function _contextNextNode() {

	        // Get the next node from the sequence
	        if (!this._contextState.nextSequence) {
	            return undefined;
	        }
	        var renderNode = this._contextState.nextSequence.get();
	        if (!renderNode) {
	            this._contextState.nextSequence = undefined;
	            return undefined;
	        }
	        this._contextState.nextSequence = this._contextState.nextSequence.getNext();

	        // Get the layout-node by its render-node
	        return _contextGetCreateAndOrderNodes.call(this, renderNode, false);
	    }

	    /**
	     * Get the next layout-node
	     */
	    function _contextPrevNode() {

	        // Get the previous node from the sequence
	        if (!this._contextState.prevSequence) {
	            return undefined;
	        }
	        this._contextState.prevSequence = this._contextState.prevSequence.getPrevious();
	        if (!this._contextState.prevSequence) {
	            return undefined;
	        }
	        var renderNode = this._contextState.prevSequence.get();
	        if (!renderNode) {
	            this._contextState.prevSequence = undefined;
	            return undefined;
	        }

	        // Get the layout-node by its render-node
	        return _contextGetCreateAndOrderNodes.call(this, renderNode, true);
	    }

	    /**
	     * Get the layout-node by id.
	     */
	     function _contextGetNode(nodeId) {
	        if (!nodeId) {
	            return undefined;
	        }
	        if (nodeId instanceof LayoutNode) {
	            return nodeId;
	        }
	        var renderNode;
	        if ((nodeId instanceof String) || (typeof nodeId === 'string')) {
	            if (!this._nodesById) {
	               return undefined;
	            }
	            renderNode = this._nodesById[nodeId];
	            if (!renderNode) {
	                return undefined;
	            }

	            // If the result was an array, return that instead
	            if (renderNode instanceof Array) {
	                return renderNode;
	            }
	        }
	        else {
	            renderNode = nodeId;
	        }

	        // Get the layout-node by its render-node
	        return _contextGetCreateAndOrderNodes.call(this, renderNode);
	    }

	    /**
	     * Set the node content
	     */
	    function _contextSetNode(node, set) {
	        node = _contextGetNode.call(this, node);
	        if (!node) {
	            return this;
	        }
	        else {
	            node.set(set);
	        }
	    }

	    /**
	     * Resolve the size of the layout-node from the renderable itsself
	     */
	    function _contextResolveSize(node, parentSize) {
	        node = _contextGetNode.call(this, node);
	        if (!node) {
	            return this;
	        }
	        var size = node._spec.renderNode.getSize(true);
	        if (!size) {
	            size = node._spec.renderNode.getSize(false);
	            if (!size) {
	                size = parentSize;
	            }
	            else {
	                var newSize = [size[0], size[1]];
	                if (size[0] === true) {
	                   newSize[0] = 0; // true cannot be resolved at this stage, try again next render-cycle
	                   this._trueSizeRequested = true;
	                   node._spec.trueSizeRequested = true;
	                }
	                else if (size[0] === undefined) {
	                    newSize[0] = parentSize[0];
	                }
	                if (size[1] === true) {
	                   newSize[1] = 0; // true cannot be resolved at this stage, try again next render-cycle
	                   this._trueSizeRequested = true;
	                   node._spec.trueSizeRequested = true;
	                }
	                else if (size[1] === undefined) {
	                    newSize[1] = parentSize[1];
	                }
	                size = newSize;
	            }
	        }
	        return size;
	    }

	    module.exports = LayoutNodeManager;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 39 */
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

	/*global define*/
	/*eslint no-use-before-define:0 */

	/**
	 * Internal LayoutNode class used by `LayoutController`.
	 *
	 * @module
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {

	    // import dependencies
	    var Transform = __webpack_require__(25);
	    var LayoutUtility = __webpack_require__(13);

	    /**
	     * @class
	     * @param {Object} renderNode Render-node which this layout-node represents
	     * @alias module:LayoutNode
	     */
	    function LayoutNode(renderNode, spec) {
	        this._spec = spec ? LayoutUtility.cloneSpec(spec) : {};
	        this._spec.renderNode = renderNode;
	        this._invalidated = false;
	        this._removing = false;
	    }

	    /**
	     * Called when the node is destroyed
	     */
	    LayoutNode.prototype.destroy = function() {
	        // override to implement
	    };

	    /**
	     * Reset the end-state. This function is called on all layout-nodes prior to
	     * calling the layout-function. So that the layout-function starts with a clean slate.
	     */
	    LayoutNode.prototype.reset = function() {
	        this._invalidated = false;
	        this._spec.trueSizeRequested = false;
	    };

	    /**
	     * Set the content of the node
	     *
	     * @param {Object} set
	     */
	    LayoutNode.prototype.set = function(set) {
	        this._invalidated = true;
	        this._removing = false;
	        var spec = this._spec;
	        if (set.size) {
	            spec.size = set.size;
	        }
	        if (set.origin) {
	            spec.origin = set.origin;
	        }
	        if (set.align) {
	            spec.align = set.align;
	        }
	        if (set.translate) {
	            var xyz = set.translate;
	            if (!spec.transform) {
	                spec.transform = Transform.translate(xyz[0], xyz[1], xyz[2]);
	            }
	            else {
	                spec.transform[12] = xyz[0];
	                spec.transform[13] = xyz[1];
	                spec.transform[14] = xyz[2];
	            }
	        }
	        // todo skew, scale, rotate
	    };

	    /**
	     * Creates the render-spec
	     */
	    LayoutNode.prototype.getSpec = function() {
	        return this._invalidated ? this._spec : undefined;
	    };

	    /**
	     * Creates the render-spec
	     */
	    LayoutNode.prototype.getRenderNode = function() {
	        return this._spec.renderNode;
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var RenderNode = __webpack_require__(57);
	var EventHandler = __webpack_require__(36);
	var ElementAllocator = __webpack_require__(60);
	var Transform = __webpack_require__(25);
	var Transitionable = __webpack_require__(51);

	var _originZeroZero = [0, 0];

	function _getElementSize(element) {
	    return [element.clientWidth, element.clientHeight];
	}

	/**
	 * The top-level container for a Famous-renderable piece of the document.
	 *   It is directly updated by the process-wide Engine object, and manages one
	 *   render tree root, which can contain other renderables.
	 *
	 * @class Context
	 * @constructor
	 * @private
	 * @param {Node} container Element in which content will be inserted
	 */
	function Context(container) {
	    this.container = container;
	    this._allocator = new ElementAllocator(container);

	    this._node = new RenderNode();
	    this._eventOutput = new EventHandler();
	    this._size = _getElementSize(this.container);

	    this._perspectiveState = new Transitionable(0);
	    this._perspective = undefined;

	    this._nodeContext = {
	        allocator: this._allocator,
	        transform: Transform.identity,
	        opacity: 1,
	        origin: _originZeroZero,
	        align: null,
	        size: this._size
	    };

	    this._eventOutput.on('resize', function() {
	        this.setSize(_getElementSize(this.container));
	    }.bind(this));

	}

	// Note: Unused
	Context.prototype.getAllocator = function getAllocator() {
	    return this._allocator;
	};

	/**
	 * Add renderables to this Context's render tree.
	 *
	 * @method add
	 *
	 * @param {Object} obj renderable object
	 * @return {RenderNode} RenderNode wrapping this object, if not already a RenderNode
	 */
	Context.prototype.add = function add(obj) {
	    return this._node.add(obj);
	};

	/**
	 * Move this Context to another containing document element.
	 *
	 * @method migrate
	 *
	 * @param {Node} container Element to which content will be migrated
	 */
	Context.prototype.migrate = function migrate(container) {
	    if (container === this.container) return;
	    this.container = container;
	    this._allocator.migrate(container);
	};

	/**
	 * Gets viewport size for Context.
	 *
	 * @method getSize
	 *
	 * @return {Array.Number} viewport size as [width, height]
	 */
	Context.prototype.getSize = function getSize() {
	    return this._size;
	};

	/**
	 * Sets viewport size for Context.
	 *
	 * @method setSize
	 *
	 * @param {Array.Number} size [width, height].  If unspecified, use size of root document element.
	 */
	Context.prototype.setSize = function setSize(size) {
	    if (!size) size = _getElementSize(this.container);
	    this._size[0] = size[0];
	    this._size[1] = size[1];
	};

	/**
	 * Commit this Context's content changes to the document.
	 *
	 * @private
	 * @method update
	 * @param {Object} contextParameters engine commit specification
	 */
	Context.prototype.update = function update(contextParameters) {
	    if (contextParameters) {
	        if (contextParameters.transform) this._nodeContext.transform = contextParameters.transform;
	        if (contextParameters.opacity) this._nodeContext.opacity = contextParameters.opacity;
	        if (contextParameters.origin) this._nodeContext.origin = contextParameters.origin;
	        if (contextParameters.align) this._nodeContext.align = contextParameters.align;
	        if (contextParameters.size) this._nodeContext.size = contextParameters.size;
	    }
	    var perspective = this._perspectiveState.get();
	    if (perspective !== this._perspective) {
	        this.container.style.perspective = perspective ? perspective.toFixed() + 'px' : '';
	        this.container.style.webkitPerspective = perspective ? perspective.toFixed() : '';
	        this._perspective = perspective;
	    }

	    this._node.commit(this._nodeContext);
	};

	/**
	 * Get current perspective of this context in pixels.
	 *
	 * @method getPerspective
	 * @return {Number} depth perspective in pixels
	 */
	Context.prototype.getPerspective = function getPerspective() {
	    return this._perspectiveState.get();
	};

	/**
	 * Set current perspective of this context in pixels.
	 *
	 * @method setPerspective
	 * @param {Number} perspective in pixels
	 * @param {Object} [transition] Transitionable object for applying the change
	 * @param {function(Object)} callback function called on completion of transition
	 */
	Context.prototype.setPerspective = function setPerspective(perspective, transition, callback) {
	    return this._perspectiveState.set(perspective, transition, callback);
	};

	/**
	 * Trigger an event, sending to all downstream handlers
	 *   listening for provided 'type' key.
	 *
	 * @method emit
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {Object} event event data
	 * @return {EventHandler} this
	 */
	Context.prototype.emit = function emit(type, event) {
	    return this._eventOutput.emit(type, event);
	};

	/**
	 * Bind a callback function to an event type handled by this object.
	 *
	 * @method "on"
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {function(string, Object)} handler callback
	 * @return {EventHandler} this
	 */
	Context.prototype.on = function on(type, handler) {
	    return this._eventOutput.on(type, handler);
	};

	/**
	 * Unbind an event by type and handler.
	 *   This undoes the work of "on".
	 *
	 * @method removeListener
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {function} handler function object to remove
	 * @return {EventHandler} internal event handler object (for chaining)
	 */
	Context.prototype.removeListener = function removeListener(type, handler) {
	    return this._eventOutput.removeListener(type, handler);
	};

	/**
	 * Add event handler object to set of downstream handlers.
	 *
	 * @method pipe
	 *
	 * @param {EventHandler} target event handler target object
	 * @return {EventHandler} passed event handler
	 */
	Context.prototype.pipe = function pipe(target) {
	    return this._eventOutput.pipe(target);
	};

	/**
	 * Remove handler object from set of downstream handlers.
	 *   Undoes work of "pipe".
	 *
	 * @method unpipe
	 *
	 * @param {EventHandler} target target handler object
	 * @return {EventHandler} provided target
	 */
	Context.prototype.unpipe = function unpipe(target) {
	    return this._eventOutput.unpipe(target);
	};

	module.exports = Context;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */




	/**
	 * Helper object used to iterate through items sequentially. Used in
	 *   views that deal with layout.  A ViewSequence object conceptually points
	 *   to a node in a linked list.
	 *
	 * @class ViewSequence
	 *
	 * @constructor
	 * @param {Object|Array} options Options object, or content array.
	 * @param {Number} [options.index] starting index.
	 * @param {Number} [options.array] Array of elements to populate the ViewSequence
	 * @param {Object} [options._] Optional backing store (internal
	 * @param {Boolean} [options.loop] Whether to wrap when accessing elements just past the end
	 *   (or beginning) of the sequence.
	 */
	function ViewSequence(options) {
	    if (!options) options = [];
	    if (options instanceof Array) options = {array: options};

	    this._ = null;
	    this.index = options.index || 0;

	    if (options.array) this._ = new (this.constructor.Backing)(options.array);
	    else if (options._) this._ = options._;

	    if (this.index === this._.firstIndex) this._.firstNode = this;
	    if (this.index === this._.firstIndex + this._.array.length - 1) this._.lastNode = this;

	    if (options.loop !== undefined) this._.loop = options.loop;

	    this._previousNode = null;
	    this._nextNode = null;
	}

	// constructor for internal storage
	ViewSequence.Backing = function Backing(array) {
	    this.array = array;
	    this.firstIndex = 0;
	    this.loop = false;
	    this.firstNode = null;
	    this.lastNode = null;
	};

	// Get value "i" slots away from the first index.
	ViewSequence.Backing.prototype.getValue = function getValue(i) {
	    var _i = i - this.firstIndex;
	    if (_i < 0 || _i >= this.array.length) return null;
	    return this.array[_i];
	};

	// Set value "i" slots away from the first index.
	ViewSequence.Backing.prototype.setValue = function setValue(i, value) {
	    this.array[i - this.firstIndex] = value;
	};

	// After splicing into the backing store, restore the indexes of each node correctly.
	ViewSequence.Backing.prototype.reindex = function reindex(start, removeCount, insertCount) {
	    if (!this.array[0]) return;

	    var i = 0;
	    var index = this.firstIndex;
	    var indexShiftAmount = insertCount - removeCount;
	    var node = this.firstNode;

	    // find node to begin
	    while (index < start - 1) {
	        node = node.getNext();
	        index++;
	    }
	    // skip removed nodes
	    var spliceStartNode = node;
	    for (i = 0; i < removeCount; i++) {
	        node = node.getNext();
	        if (node) node._previousNode = spliceStartNode;
	    }
	    var spliceResumeNode = node ? node.getNext() : null;
	    // generate nodes for inserted items
	    spliceStartNode._nextNode = null;
	    node = spliceStartNode;
	    for (i = 0; i < insertCount; i++) node = node.getNext();
	    index += insertCount;
	    // resume the chain
	    if (node !== spliceResumeNode) {
	        node._nextNode = spliceResumeNode;
	        if (spliceResumeNode) spliceResumeNode._previousNode = node;
	    }
	    if (spliceResumeNode) {
	        node = spliceResumeNode;
	        index++;
	        while (node && index < this.array.length + this.firstIndex) {
	            if (node._nextNode) node.index += indexShiftAmount;
	            else node.index = index;
	            node = node.getNext();
	            index++;
	        }
	    }
	};

	/**
	 * Return ViewSequence node previous to this node in the list, respecting looping if applied.
	 *
	 * @method getPrevious
	 * @return {ViewSequence} previous node.
	 */
	ViewSequence.prototype.getPrevious = function getPrevious() {
	    if (this.index === this._.firstIndex) {
	        if (this._.loop) {
	            this._previousNode = this._.lastNode || new (this.constructor)({_: this._, index: this._.firstIndex + this._.array.length - 1});
	            this._previousNode._nextNode = this;
	        }
	        else {
	            this._previousNode = null;
	        }
	    }
	    else if (!this._previousNode) {
	        this._previousNode = new (this.constructor)({_: this._, index: this.index - 1});
	        this._previousNode._nextNode = this;
	    }
	    return this._previousNode;
	};

	/**
	 * Return ViewSequence node next after this node in the list, respecting looping if applied.
	 *
	 * @method getNext
	 * @return {ViewSequence} previous node.
	 */
	ViewSequence.prototype.getNext = function getNext() {
	    if (this.index === this._.firstIndex + this._.array.length - 1) {
	        if (this._.loop) {
	            this._nextNode = this._.firstNode || new (this.constructor)({_: this._, index: this._.firstIndex});
	            this._nextNode._previousNode = this;
	        }
	        else {
	            this._nextNode = null;
	        }
	    }
	    else if (!this._nextNode) {
	        this._nextNode = new (this.constructor)({_: this._, index: this.index + 1});
	        this._nextNode._previousNode = this;
	    }
	    return this._nextNode;
	};

	/**
	 * Return index of this ViewSequence node.
	 *
	 * @method getIndex
	 * @return {Number} index
	 */
	ViewSequence.prototype.getIndex = function getIndex() {
	    return this.index;
	};

	/**
	 * Return printable version of this ViewSequence node.
	 *
	 * @method toString
	 * @return {string} this index as a string
	 */
	ViewSequence.prototype.toString = function toString() {
	    return '' + this.index;
	};

	/**
	 * Add one or more objects to the beginning of the sequence.
	 *
	 * @method unshift
	 * @param {...Object} value arguments array of objects
	 */
	ViewSequence.prototype.unshift = function unshift(value) {
	    this._.array.unshift.apply(this._.array, arguments);
	    this._.firstIndex -= arguments.length;
	};

	/**
	 * Add one or more objects to the end of the sequence.
	 *
	 * @method push
	 * @param {...Object} value arguments array of objects
	 */
	ViewSequence.prototype.push = function push(value) {
	    this._.array.push.apply(this._.array, arguments);
	};

	/**
	 * Remove objects from the sequence
	 *
	 * @method splice
	 * @param {Number} index starting index for removal
	 * @param {Number} howMany how many elements to remove
	 * @param {...Object} value arguments array of objects
	 */
	ViewSequence.prototype.splice = function splice(index, howMany) {
	    var values = Array.prototype.slice.call(arguments, 2);
	    this._.array.splice.apply(this._.array, [index - this._.firstIndex, howMany].concat(values));
	    this._.reindex(index, howMany, values.length);
	};

	/**
	 * Exchange this element's sequence position with another's.
	 *
	 * @method swap
	 * @param {ViewSequence} other element to swap with.
	 */
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
	    this._previousNode = (otherPrevious === this) ? other : otherPrevious;
	    if (this._previousNode) this._previousNode._nextNode = this;
	    this._nextNode = (otherNext === this) ? other : otherNext;
	    if (this._nextNode) this._nextNode._previousNode = this;

	    other.index = myIndex;
	    other._previousNode = (myPrevious === other) ? this : myPrevious;
	    if (other._previousNode) other._previousNode._nextNode = other;
	    other._nextNode = (myNext === other) ? this : myNext;
	    if (other._nextNode) other._nextNode._previousNode = other;

	    if (this.index === this._.firstIndex) this._.firstNode = this;
	    else if (this.index === this._.firstIndex + this._.array.length - 1) this._.lastNode = this;
	    if (other.index === this._.firstIndex) this._.firstNode = other;
	    else if (other.index === this._.firstIndex + this._.array.length - 1) this._.lastNode = other;
	};

	   /**
	 * Return value of this ViewSequence node.
	 *
	 * @method get
	 * @return {Object} value of thiss
	 */
	ViewSequence.prototype.get = function get() {
	    return this._.getValue(this.index);
	};

	   /**
	 * Call getSize() on the contained View.
	 *
	 * @method getSize
	 * @return {Array.Number} [width, height]
	 */
	ViewSequence.prototype.getSize = function getSize() {
	    var target = this.get();
	    return target ? target.getSize() : null;
	};

	/**
	 * Generate a render spec from the contents of this component.
	 * Specifically, this will render the value at the current index.
	 * @private
	 * @method render
	 * @return {number} Render spec for this component
	 */
	ViewSequence.prototype.render = function render() {
	    var target = this.get();
	    return target ? target.render.apply(target, arguments) : null;
	};

	module.exports = ViewSequence;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Surface = __webpack_require__(27);
	var Context = __webpack_require__(40);

	/**
	 * ContainerSurface is an object designed to contain surfaces and
	 *   set properties to be applied to all of them at once.
	 *   This extends the Surface class.
	 *   A container surface will enforce these properties on the
	 *   surfaces it contains:
	 *
	 *   size (clips contained surfaces to its own width and height);
	 *
	 *   origin;
	 *
	 *   its own opacity and transform, which will be automatically
	 *   applied to  all Surfaces contained directly and indirectly.
	 *
	 * @class ContainerSurface
	 * @extends Surface
	 * @constructor
	 * @param {Array.Number} [options.size] [width, height] in pixels
	 * @param {Array.string} [options.classes] CSS classes to set on all inner content
	 * @param {Array} [options.properties] string dictionary of HTML attributes to set on target div
	 * @param {string} [options.content] inner (HTML) content of surface (should not be used)
	 */
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

	/**
	 * Add renderables to this object's render tree
	 *
	 * @method add
	 *
	 * @param {Object} obj renderable object
	 * @return {RenderNode} RenderNode wrapping this object, if not already a RenderNode
	 */
	ContainerSurface.prototype.add = function add() {
	    return this.context.add.apply(this.context, arguments);
	};

	/**
	 * Return spec for this surface.  Note: Can result in a size recalculation.
	 *
	 * @private
	 * @method render
	 *
	 * @return {Object} render spec for this surface (spec id)
	 */
	ContainerSurface.prototype.render = function render() {
	    if (this._sizeDirty) this._shouldRecalculateSize = true;
	    return Surface.prototype.render.apply(this, arguments);
	};

	/**
	 * Place the document element this component manages into the document.
	 *
	 * @private
	 * @method deploy
	 * @param {Node} target document parent of this container
	 */
	ContainerSurface.prototype.deploy = function deploy() {
	    this._shouldRecalculateSize = true;
	    return Surface.prototype.deploy.apply(this, arguments);
	};

	/**
	 * Apply changes from this component to the corresponding document element.
	 * This includes changes to classes, styles, size, content, opacity, origin,
	 * and matrix transforms.
	 *
	 * @private
	 * @method commit
	 * @param {Context} context commit context
	 * @param {Transform} transform unused TODO
	 * @param {Number} opacity  unused TODO
	 * @param {Array.Number} origin unused TODO
	 * @param {Array.Number} size unused TODO
	 * @return {undefined} TODO returns an undefined value
	 */
	ContainerSurface.prototype.commit = function commit(context, transform, opacity, origin, size) {
	    var previousSize = this._size ? [this._size[0], this._size[1]] : null;
	    var result = Surface.prototype.commit.apply(this, arguments);
	    if (this._shouldRecalculateSize || (previousSize && (this._size[0] !== previousSize[0] || this._size[1] !== previousSize[1]))) {
	        this.context.setSize();
	        this._shouldRecalculateSize = false;
	    }
	    this.context.update();
	    return result;
	};

	module.exports = ContainerSurface;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */




	/**
	 * Three-element floating point vector.
	 *
	 * @class Vector
	 * @constructor
	 *
	 * @param {number} x x element value
	 * @param {number} y y element value
	 * @param {number} z z element value
	 */
	function Vector(x,y,z) {
	    if (arguments.length === 1) this.set(x);
	    else {
	        this.x = x || 0;
	        this.y = y || 0;
	        this.z = z || 0;
	    }
	    return this;
	}

	var _register = new Vector(0,0,0);

	/**
	 * Add this element-wise to another Vector, element-wise.
	 *   Note: This sets the internal result register, so other references to that vector will change.
	 *
	 * @method add
	 * @param {Vector} v addend
	 * @return {Vector} vector sum
	 */
	Vector.prototype.add = function add(v) {
	    return _setXYZ.call(_register,
	        this.x + v.x,
	        this.y + v.y,
	        this.z + v.z
	    );
	};

	/**
	 * Subtract another vector from this vector, element-wise.
	 *   Note: This sets the internal result register, so other references to that vector will change.
	 *
	 * @method sub
	 * @param {Vector} v subtrahend
	 * @return {Vector} vector difference
	 */
	Vector.prototype.sub = function sub(v) {
	    return _setXYZ.call(_register,
	        this.x - v.x,
	        this.y - v.y,
	        this.z - v.z
	    );
	};

	/**
	 * Scale Vector by floating point r.
	 *   Note: This sets the internal result register, so other references to that vector will change.
	 *
	 * @method mult
	 *
	 * @param {number} r scalar
	 * @return {Vector} vector result
	 */
	Vector.prototype.mult = function mult(r) {
	    return _setXYZ.call(_register,
	        r * this.x,
	        r * this.y,
	        r * this.z
	    );
	};

	/**
	 * Scale Vector by floating point 1/r.
	 *   Note: This sets the internal result register, so other references to that vector will change.
	 *
	 * @method div
	 *
	 * @param {number} r scalar
	 * @return {Vector} vector result
	 */
	Vector.prototype.div = function div(r) {
	    return this.mult(1 / r);
	};

	/**
	 * Given another vector v, return cross product (v)x(this).
	 *   Note: This sets the internal result register, so other references to that vector will change.
	 *
	 * @method cross
	 * @param {Vector} v Left Hand Vector
	 * @return {Vector} vector result
	 */
	Vector.prototype.cross = function cross(v) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;
	    var vx = v.x;
	    var vy = v.y;
	    var vz = v.z;

	    return _setXYZ.call(_register,
	        z * vy - y * vz,
	        x * vz - z * vx,
	        y * vx - x * vy
	    );
	};

	/**
	 * Component-wise equality test between this and Vector v.
	 * @method equals
	 * @param {Vector} v vector to compare
	 * @return {boolean}
	 */
	Vector.prototype.equals = function equals(v) {
	    return (v.x === this.x && v.y === this.y && v.z === this.z);
	};

	/**
	 * Rotate clockwise around x-axis by theta radians.
	 *   Note: This sets the internal result register, so other references to that vector will change.
	 * @method rotateX
	 * @param {number} theta radians
	 * @return {Vector} rotated vector
	 */
	Vector.prototype.rotateX = function rotateX(theta) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;

	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);

	    return _setXYZ.call(_register,
	        x,
	        y * cosTheta - z * sinTheta,
	        y * sinTheta + z * cosTheta
	    );
	};

	/**
	 * Rotate clockwise around y-axis by theta radians.
	 *   Note: This sets the internal result register, so other references to that vector will change.
	 * @method rotateY
	 * @param {number} theta radians
	 * @return {Vector} rotated vector
	 */
	Vector.prototype.rotateY = function rotateY(theta) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;

	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);

	    return _setXYZ.call(_register,
	        z * sinTheta + x * cosTheta,
	        y,
	        z * cosTheta - x * sinTheta
	    );
	};

	/**
	 * Rotate clockwise around z-axis by theta radians.
	 *   Note: This sets the internal result register, so other references to that vector will change.
	 * @method rotateZ
	 * @param {number} theta radians
	 * @return {Vector} rotated vector
	 */
	Vector.prototype.rotateZ = function rotateZ(theta) {
	    var x = this.x;
	    var y = this.y;
	    var z = this.z;

	    var cosTheta = Math.cos(theta);
	    var sinTheta = Math.sin(theta);

	    return _setXYZ.call(_register,
	        x * cosTheta - y * sinTheta,
	        x * sinTheta + y * cosTheta,
	        z
	    );
	};

	/**
	 * Return dot product of this with a second Vector
	 * @method dot
	 * @param {Vector} v second vector
	 * @return {number} dot product
	 */
	Vector.prototype.dot = function dot(v) {
	    return this.x * v.x + this.y * v.y + this.z * v.z;
	};

	/**
	 * Return squared length of this vector
	 * @method normSquared
	 * @return {number} squared length
	 */
	Vector.prototype.normSquared = function normSquared() {
	    return this.dot(this);
	};

	/**
	 * Return length of this vector
	 * @method norm
	 * @return {number} length
	 */
	Vector.prototype.norm = function norm() {
	    return Math.sqrt(this.normSquared());
	};

	/**
	 * Scale Vector to specified length.
	 *   If length is less than internal tolerance, set vector to [length, 0, 0].
	 *   Note: This sets the internal result register, so other references to that vector will change.
	 * @method normalize
	 *
	 * @param {number} length target length, default 1.0
	 * @return {Vector}
	 */
	Vector.prototype.normalize = function normalize(length) {
	    if (arguments.length === 0) length = 1;
	    var norm = this.norm();

	    if (norm > 1e-7) return _setFromVector.call(_register, this.mult(length / norm));
	    else return _setXYZ.call(_register, length, 0, 0);
	};

	/**
	 * Make a separate copy of the Vector.
	 *
	 * @method clone
	 *
	 * @return {Vector}
	 */
	Vector.prototype.clone = function clone() {
	    return new Vector(this);
	};

	/**
	 * True if and only if every value is 0 (or falsy)
	 *
	 * @method isZero
	 *
	 * @return {boolean}
	 */
	Vector.prototype.isZero = function isZero() {
	    return !(this.x || this.y || this.z);
	};

	function _setXYZ(x,y,z) {
	    this.x = x;
	    this.y = y;
	    this.z = z;
	    return this;
	}

	function _setFromArray(v) {
	    return _setXYZ.call(this,v[0],v[1],v[2] || 0);
	}

	function _setFromVector(v) {
	    return _setXYZ.call(this, v.x, v.y, v.z);
	}

	function _setFromNumber(x) {
	    return _setXYZ.call(this,x,0,0);
	}

	/**
	 * Set this Vector to the values in the provided Array or Vector.
	 *
	 * @method set
	 * @param {object} v array, Vector, or number
	 * @return {Vector} this
	 */
	Vector.prototype.set = function set(v) {
	    if (v instanceof Array)    return _setFromArray.call(this, v);
	    if (v instanceof Vector)   return _setFromVector.call(this, v);
	    if (typeof v === 'number') return _setFromNumber.call(this, v);
	};

	Vector.prototype.setXYZ = function(x,y,z) {
	    return _setXYZ.apply(this, arguments);
	};

	Vector.prototype.set1D = function(x) {
	    return _setFromNumber.call(this, x);
	};

	/**
	 * Put result of last internal register calculation in specified output vector.
	 *
	 * @method put
	 * @param {Vector} v destination vector
	 * @return {Vector} destination vector
	 */

	Vector.prototype.put = function put(v) {
	    if (this === _register) _setFromVector.call(v, _register);
	    else _setFromVector.call(v, this);
	};

	/**
	 * Set this vector to [0,0,0]
	 *
	 * @method clear
	 */
	Vector.prototype.clear = function clear() {
	    return _setXYZ.call(this,0,0,0);
	};

	/**
	 * Scale this Vector down to specified "cap" length.
	 *   If Vector shorter than cap, or cap is Infinity, do nothing.
	 *   Note: This sets the internal result register, so other references to that vector will change.
	 *
	 * @method cap
	 * @return {Vector} capped vector
	 */
	Vector.prototype.cap = function cap(cap) {
	    if (cap === Infinity) return _setFromVector.call(_register, this);
	    var norm = this.norm();
	    if (norm > cap) return _setFromVector.call(_register, this.mult(cap / norm));
	    else return _setFromVector.call(_register, this);
	};

	/**
	 * Return projection of this Vector onto another.
	 *   Note: This sets the internal result register, so other references to that vector will change.
	 *
	 * @method project
	 * @param {Vector} n vector to project upon
	 * @return {Vector} projected vector
	 */
	Vector.prototype.project = function project(n) {
	    return n.mult(this.dot(n));
	};

	/**
	 * Reflect this Vector across provided vector.
	 *   Note: This sets the internal result register, so other references to that vector will change.
	 *
	 * @method reflectAcross
	 * @param {Vector} n vector to reflect across
	 * @return {Vector} reflected vector
	 */
	Vector.prototype.reflectAcross = function reflectAcross(n) {
	    n.normalize().put(n);
	    return _setFromVector(_register, this.sub(this.project(n).mult(2)));
	};

	/**
	 * Convert Vector to three-element array.
	 *
	 * @method get
	 * @return {array<number>} three-element array
	 */
	Vector.prototype.get = function get() {
	    return [this.x, this.y, this.z];
	};

	Vector.prototype.get1D = function() {
	    return this.x;
	};

	module.exports = Vector;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	var EventHandler = __webpack_require__(36);

	/**
	 * The Physics Engine is responsible for mediating Bodies and their
	 * interaction with forces and constraints. The Physics Engine handles the
	 * logic of adding and removing bodies, updating their state of the over
	 * time.
	 *
	 * @class PhysicsEngine
	 * @constructor
	 * @param options {Object} options
	 */
	function PhysicsEngine(options) {
	    this.options = Object.create(PhysicsEngine.DEFAULT_OPTIONS);
	    if (options) this.setOptions(options);

	    this._particles      = [];   //list of managed particles
	    this._bodies         = [];   //list of managed bodies
	    this._agents         = {};   //hash of managed agents
	    this._forces         = [];   //list of IDs of agents that are forces
	    this._constraints    = [];   //list of IDs of agents that are constraints

	    this._buffer         = 0.0;
	    this._prevTime       = now();
	    this._isSleeping     = false;
	    this._eventHandler   = null;
	    this._currAgentId    = 0;
	    this._hasBodies      = false;
	}

	var TIMESTEP = 17;
	var MIN_TIME_STEP = 1000 / 120;
	var MAX_TIME_STEP = 17;

	/**
	 * @property PhysicsEngine.DEFAULT_OPTIONS
	 * @type Object
	 * @protected
	 * @static
	 */
	PhysicsEngine.DEFAULT_OPTIONS = {

	    /**
	     * The number of iterations the engine takes to resolve constraints
	     * @attribute constraintSteps
	     * @type Number
	     */
	    constraintSteps : 1,

	    /**
	     * The energy threshold before the Engine stops updating
	     * @attribute sleepTolerance
	     * @type Number
	     */
	    sleepTolerance  : 1e-7
	};

	var now = (function() {
	    return Date.now;
	})();

	/**
	 * Options setter
	 * @method setOptions
	 * @param options {Object}
	 */
	PhysicsEngine.prototype.setOptions = function setOptions(opts) {
	    for (var key in opts) if (this.options[key]) this.options[key] = opts[key];
	};

	/**
	 * Method to add a physics body to the engine. Necessary to update the
	 * body over time.
	 *
	 * @method addBody
	 * @param body {Body}
	 * @return body {Body}
	 */
	PhysicsEngine.prototype.addBody = function addBody(body) {
	    body._engine = this;
	    if (body.isBody) {
	        this._bodies.push(body);
	        this._hasBodies = true;
	    }
	    else this._particles.push(body);
	    return body;
	};

	/**
	 * Remove a body from the engine. Detaches body from all forces and
	 * constraints.
	 *
	 * @method removeBody
	 * @param body {Body}
	 */
	PhysicsEngine.prototype.removeBody = function removeBody(body) {
	    var array = (body.isBody) ? this._bodies : this._particles;
	    var index = array.indexOf(body);
	    if (index > -1) {
	        for (var i = 0; i < Object.keys(this._agents).length; i++) this.detachFrom(i, body);
	        array.splice(index,1);
	    }
	    if (this.getBodies().length === 0) this._hasBodies = false;
	};

	function _mapAgentArray(agent) {
	    if (agent.applyForce)      return this._forces;
	    if (agent.applyConstraint) return this._constraints;
	}

	function _attachOne(agent, targets, source) {
	    if (targets === undefined) targets = this.getParticlesAndBodies();
	    if (!(targets instanceof Array)) targets = [targets];

	    this._agents[this._currAgentId] = {
	        agent   : agent,
	        targets : targets,
	        source  : source
	    };

	    _mapAgentArray.call(this, agent).push(this._currAgentId);
	    return this._currAgentId++;
	}

	/**
	 * Attaches a force or constraint to a Body. Returns an AgentId of the
	 * attached agent which can be used to detach the agent.
	 *
	 * @method attach
	 * @param agent {Agent|Array.Agent} A force, constraint, or array of them.
	 * @param [targets=All] {Body|Array.Body} The Body or Bodies affected by the agent
	 * @param [source] {Body} The source of the agent
	 * @return AgentId {Number}
	 */
	PhysicsEngine.prototype.attach = function attach(agents, targets, source) {
	    if (agents instanceof Array) {
	        var agentIDs = [];
	        for (var i = 0; i < agents.length; i++)
	            agentIDs[i] = _attachOne.call(this, agents[i], targets, source);
	        return agentIDs;
	    }
	    else return _attachOne.call(this, agents, targets, source);
	};

	/**
	 * Append a body to the targets of a previously defined physics agent.
	 *
	 * @method attachTo
	 * @param agentID {AgentId} The agentId of a previously defined agent
	 * @param target {Body} The Body affected by the agent
	 */
	PhysicsEngine.prototype.attachTo = function attachTo(agentID, target) {
	    _getBoundAgent.call(this, agentID).targets.push(target);
	};

	/**
	 * Undoes PhysicsEngine.attach. Removes an agent and its associated
	 * effect on its affected Bodies.
	 *
	 * @method detach
	 * @param agentID {AgentId} The agentId of a previously defined agent
	 */
	PhysicsEngine.prototype.detach = function detach(id) {
	    // detach from forces/constraints array
	    var agent = this.getAgent(id);
	    var agentArray = _mapAgentArray.call(this, agent);
	    var index = agentArray.indexOf(id);
	    agentArray.splice(index,1);

	    // detach agents array
	    delete this._agents[id];
	};

	/**
	 * Remove a single Body from a previously defined agent.
	 *
	 * @method detach
	 * @param agentID {AgentId} The agentId of a previously defined agent
	 * @param target {Body} The body to remove from the agent
	 */
	PhysicsEngine.prototype.detachFrom = function detachFrom(id, target) {
	    var boundAgent = _getBoundAgent.call(this, id);
	    if (boundAgent.source === target) this.detach(id);
	    else {
	        var targets = boundAgent.targets;
	        var index = targets.indexOf(target);
	        if (index > -1) targets.splice(index,1);
	    }
	};

	/**
	 * A convenience method to give the Physics Engine a clean slate of
	 * agents. Preserves all added Body objects.
	 *
	 * @method detachAll
	 */
	PhysicsEngine.prototype.detachAll = function detachAll() {
	    this._agents        = {};
	    this._forces        = [];
	    this._constraints   = [];
	    this._currAgentId   = 0;
	};

	function _getBoundAgent(id) {
	    return this._agents[id];
	}

	/**
	 * Returns the corresponding agent given its agentId.
	 *
	 * @method getAgent
	 * @param id {AgentId}
	 */
	PhysicsEngine.prototype.getAgent = function getAgent(id) {
	    return _getBoundAgent.call(this, id).agent;
	};

	/**
	 * Returns all particles that are currently managed by the Physics Engine.
	 *
	 * @method getParticles
	 * @return particles {Array.Particles}
	 */
	PhysicsEngine.prototype.getParticles = function getParticles() {
	    return this._particles;
	};

	/**
	 * Returns all bodies, except particles, that are currently managed by the Physics Engine.
	 *
	 * @method getBodies
	 * @return bodies {Array.Bodies}
	 */
	PhysicsEngine.prototype.getBodies = function getBodies() {
	    return this._bodies;
	};

	/**
	 * Returns all bodies that are currently managed by the Physics Engine.
	 *
	 * @method getBodies
	 * @return bodies {Array.Bodies}
	 */
	PhysicsEngine.prototype.getParticlesAndBodies = function getParticlesAndBodies() {
	    return this.getParticles().concat(this.getBodies());
	};

	/**
	 * Iterates over every Particle and applies a function whose first
	 * argument is the Particle
	 *
	 * @method forEachParticle
	 * @param fn {Function} Function to iterate over
	 * @param [dt] {Number} Delta time
	 */
	PhysicsEngine.prototype.forEachParticle = function forEachParticle(fn, dt) {
	    var particles = this.getParticles();
	    for (var index = 0, len = particles.length; index < len; index++)
	        fn.call(this, particles[index], dt);
	};

	/**
	 * Iterates over every Body that isn't a Particle and applies
	 * a function whose first argument is the Body
	 *
	 * @method forEachBody
	 * @param fn {Function} Function to iterate over
	 * @param [dt] {Number} Delta time
	 */
	PhysicsEngine.prototype.forEachBody = function forEachBody(fn, dt) {
	    if (!this._hasBodies) return;
	    var bodies = this.getBodies();
	    for (var index = 0, len = bodies.length; index < len; index++)
	        fn.call(this, bodies[index], dt);
	};

	/**
	 * Iterates over every Body and applies a function whose first
	 * argument is the Body
	 *
	 * @method forEach
	 * @param fn {Function} Function to iterate over
	 * @param [dt] {Number} Delta time
	 */
	PhysicsEngine.prototype.forEach = function forEach(fn, dt) {
	    this.forEachParticle(fn, dt);
	    this.forEachBody(fn, dt);
	};

	function _updateForce(index) {
	    var boundAgent = _getBoundAgent.call(this, this._forces[index]);
	    boundAgent.agent.applyForce(boundAgent.targets, boundAgent.source);
	}

	function _updateForces() {
	    for (var index = this._forces.length - 1; index > -1; index--)
	        _updateForce.call(this, index);
	}

	function _updateConstraint(index, dt) {
	    var boundAgent = this._agents[this._constraints[index]];
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

	function _updateVelocities(particle, dt) {
	    particle.integrateVelocity(dt);
	}

	function _updateAngularVelocities(body, dt) {
	    body.integrateAngularMomentum(dt);
	    body.updateAngularVelocity();
	}

	function _updateOrientations(body, dt) {
	    body.integrateOrientation(dt);
	}

	function _updatePositions(particle, dt) {
	    particle.integratePosition(dt);
	    particle.emit('update', particle);
	}

	function _integrate(dt) {
	    _updateForces.call(this, dt);
	    this.forEach(_updateVelocities, dt);
	    this.forEachBody(_updateAngularVelocities, dt);
	    _updateConstraints.call(this, dt);
	    this.forEachBody(_updateOrientations, dt);
	    this.forEach(_updatePositions, dt);
	}

	function _getEnergyParticles() {
	    var energy = 0.0;
	    var particleEnergy = 0.0;
	    this.forEach(function(particle) {
	        particleEnergy = particle.getEnergy();
	        energy += particleEnergy;
	        if (particleEnergy < particle.sleepTolerance) particle.sleep();
	    });
	    return energy;
	}

	function _getEnergyForces() {
	    var energy = 0;
	    for (var index = this._forces.length - 1; index > -1; index--)
	        energy += this._forces[index].getEnergy() || 0.0;
	    return energy;
	}

	function _getEnergyConstraints() {
	    var energy = 0;
	    for (var index = this._constraints.length - 1; index > -1; index--)
	        energy += this._constraints[index].getEnergy() || 0.0;
	    return energy;
	}

	/**
	 * Calculates the kinetic energy of all Body objects and potential energy
	 * of all attached agents.
	 *
	 * TODO: implement.
	 * @method getEnergy
	 * @return energy {Number}
	 */
	PhysicsEngine.prototype.getEnergy = function getEnergy() {
	    return _getEnergyParticles.call(this) + _getEnergyForces.call(this) + _getEnergyConstraints.call(this);
	};

	/**
	 * Updates all Body objects managed by the physics engine over the
	 * time duration since the last time step was called.
	 *
	 * @method step
	 */
	PhysicsEngine.prototype.step = function step() {
	//        if (this.getEnergy() < this.options.sleepTolerance) {
	//            this.sleep();
	//            return;
	//        };

	    //set current frame's time
	    var currTime = now();

	    //milliseconds elapsed since last frame
	    var dtFrame = currTime - this._prevTime;

	    this._prevTime = currTime;

	    if (dtFrame < MIN_TIME_STEP) return;
	    if (dtFrame > MAX_TIME_STEP) dtFrame = MAX_TIME_STEP;

	    //robust integration
	//        this._buffer += dtFrame;
	//        while (this._buffer > this._timestep){
	//            _integrate.call(this, this._timestep);
	//            this._buffer -= this._timestep;
	//        };
	//        _integrate.call(this, this._buffer);
	//        this._buffer = 0.0;
	    _integrate.call(this, TIMESTEP);

	//        this.emit('update', this);
	};

	/**
	 * Tells whether the Physics Engine is sleeping or awake.
	 * @method isSleeping
	 * @return {Boolean}
	 */
	PhysicsEngine.prototype.isSleeping = function isSleeping() {
	    return this._isSleeping;
	};

	/**
	 * Stops the Physics Engine from updating. Emits an 'end' event.
	 * @method sleep
	 */
	PhysicsEngine.prototype.sleep = function sleep() {
	    this.emit('end', this);
	    this._isSleeping = true;
	};

	/**
	 * Starts the Physics Engine from updating. Emits an 'start' event.
	 * @method wake
	 */
	PhysicsEngine.prototype.wake = function wake() {
	    this._prevTime = now();
	    this.emit('start', this);
	    this._isSleeping = false;
	};

	PhysicsEngine.prototype.emit = function emit(type, data) {
	    if (this._eventHandler === null) return;
	    this._eventHandler.emit(type, data);
	};

	PhysicsEngine.prototype.on = function on(event, fn) {
	    if (this._eventHandler === null) this._eventHandler = new EventHandler();
	    this._eventHandler.on(event, fn);
	};

	module.exports = PhysicsEngine;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Vector = __webpack_require__(43);
	var Transform = __webpack_require__(25);
	var EventHandler = __webpack_require__(36);
	var Integrator = __webpack_require__(65);

	/**
	 * A point body that is controlled by the Physics Engine. A particle has
	 *   position and velocity states that are updated by the Physics Engine.
	 *   Ultimately, a particle is a _special type of modifier, and can be added to
	 *   the Famous render tree like any other modifier.
	 *
	 * @constructor
	 * @class Particle
	 * @uses EventHandler
	 * @uses Modifier
	 * @extensionfor Body
	 * @param {Options} [options] An object of configurable options.
	 * @param {Array} [options.position] The position of the particle.
	 * @param {Array} [options.velocity] The velocity of the particle.
	 * @param {Number} [options.mass] The mass of the particle.
	 * @param {Hexadecimal} [options.axis] The axis a particle can move along. Can be bitwise ORed e.g., Particle.AXES.X, Particle.AXES.X | Particle.AXES.Y
	 *
	 */
	 function Particle(options) {
	    options = options || {};

	    // registers
	    this.position = new Vector();
	    this.velocity = new Vector();
	    this.force    = new Vector();

	    var defaults  = Particle.DEFAULT_OPTIONS;

	    // set vectors
	    this.setPosition(options.position || defaults.position);
	    this.setVelocity(options.velocity || defaults.velocity);
	    this.force.set(options.force || [0,0,0]);

	    // set scalars
	    this.mass = (options.mass !== undefined)
	        ? options.mass
	        : defaults.mass;

	    this.axis = (options.axis !== undefined)
	        ? options.axis
	        : defaults.axis;

	    this.inverseMass = 1 / this.mass;

	    // state variables
	    this._isSleeping     = false;
	    this._engine         = null;
	    this._eventOutput    = null;
	    this._positionGetter = null;

	    this.transform = Transform.identity.slice();

	    // cached _spec
	    this._spec = {
	        transform : this.transform,
	        target    : null
	    };
	}

	Particle.DEFAULT_OPTIONS = {
	    position : [0,0,0],
	    velocity : [0,0,0],
	    mass : 1,
	    axis : undefined
	};

	/**
	 * Kinetic energy threshold needed to update the body
	 *
	 * @property SLEEP_TOLERANCE
	 * @type Number
	 * @static
	 * @default 1e-7
	 */
	Particle.SLEEP_TOLERANCE = 1e-7;

	/**
	 * Axes by which a body can translate
	 *
	 * @property AXES
	 * @type Hexadecimal
	 * @static
	 * @default 1e-7
	 */
	Particle.AXES = {
	    X : 0x00, // hexadecimal for 0
	    Y : 0x01, // hexadecimal for 1
	    Z : 0x02  // hexadecimal for 2
	};

	// Integrator for updating the particle's state
	// TODO: make this a singleton
	Particle.INTEGRATOR = new Integrator();

	//Catalogue of outputted events
	var _events = {
	    start  : 'start',
	    update : 'update',
	    end    : 'end'
	};

	// Cached timing function
	var now = (function() {
	    return Date.now;
	})();

	/**
	 * Stops the particle from updating
	 * @method sleep
	 */
	Particle.prototype.sleep = function sleep() {
	    if (this._isSleeping) return;
	    this.emit(_events.end, this);
	    this._isSleeping = true;
	};

	/**
	 * Starts the particle update
	 * @method wake
	 */
	Particle.prototype.wake = function wake() {
	    if (!this._isSleeping) return;
	    this.emit(_events.start, this);
	    this._isSleeping = false;
	    this._prevTime = now();
	};

	/**
	 * @attribute isBody
	 * @type Boolean
	 * @static
	 */
	Particle.prototype.isBody = false;

	/**
	 * Basic setter for position
	 * @method getPosition
	 * @param position {Array|Vector}
	 */
	Particle.prototype.setPosition = function setPosition(position) {
	    this.position.set(position);
	};

	/**
	 * 1-dimensional setter for position
	 * @method setPosition1D
	 * @param value {Number}
	 */
	Particle.prototype.setPosition1D = function setPosition1D(x) {
	    this.position.x = x;
	};

	/**
	 * Basic getter function for position
	 * @method getPosition
	 * @return position {Array}
	 */
	Particle.prototype.getPosition = function getPosition() {
	    if (this._positionGetter instanceof Function)
	        this.setPosition(this._positionGetter());

	    this._engine.step();

	    return this.position.get();
	};

	/**
	 * 1-dimensional getter for position
	 * @method getPosition1D
	 * @return value {Number}
	 */
	Particle.prototype.getPosition1D = function getPosition1D() {
	    this._engine.step();
	    return this.position.x;
	};

	/**
	 * Defines the position from outside the Physics Engine
	 * @method positionFrom
	 * @param positionGetter {Function}
	 */
	Particle.prototype.positionFrom = function positionFrom(positionGetter) {
	    this._positionGetter = positionGetter;
	};

	/**
	 * Basic setter function for velocity Vector
	 * @method setVelocity
	 * @function
	 */
	Particle.prototype.setVelocity = function setVelocity(velocity) {
	    this.velocity.set(velocity);
	    this.wake();
	};

	/**
	 * 1-dimensional setter for velocity
	 * @method setVelocity1D
	 * @param velocity {Number}
	 */
	Particle.prototype.setVelocity1D = function setVelocity1D(x) {
	    this.velocity.x = x;
	    this.wake();
	};

	/**
	 * Basic getter function for velocity Vector
	 * @method getVelocity
	 * @return velocity {Array}
	 */
	Particle.prototype.getVelocity = function getVelocity() {
	    return this.velocity.get();
	};

	/**
	 * 1-dimensional getter for velocity
	 * @method getVelocity1D
	 * @return velocity {Number}
	 */
	Particle.prototype.getVelocity1D = function getVelocity1D() {
	    return this.velocity.x;
	};

	/**
	 * Basic setter function for mass quantity
	 * @method setMass
	 * @param mass {Number} mass
	 */
	Particle.prototype.setMass = function setMass(mass) {
	    this.mass = mass;
	    this.inverseMass = 1 / mass;
	};

	/**
	 * Basic getter function for mass quantity
	 * @method getMass
	 * @return mass {Number}
	 */
	Particle.prototype.getMass = function getMass() {
	    return this.mass;
	};

	/**
	 * Reset position and velocity
	 * @method reset
	 * @param position {Array|Vector}
	 * @param velocity {Array|Vector}
	 */
	Particle.prototype.reset = function reset(position, velocity) {
	    this.setPosition(position || [0,0,0]);
	    this.setVelocity(velocity || [0,0,0]);
	};

	/**
	 * Add force vector to existing internal force Vector
	 * @method applyForce
	 * @param force {Vector}
	 */
	Particle.prototype.applyForce = function applyForce(force) {
	    if (force.isZero()) return;
	    this.force.add(force).put(this.force);
	    this.wake();
	};

	/**
	 * Add impulse (change in velocity) Vector to this Vector's velocity.
	 * @method applyImpulse
	 * @param impulse {Vector}
	 */
	Particle.prototype.applyImpulse = function applyImpulse(impulse) {
	    if (impulse.isZero()) return;
	    var velocity = this.velocity;
	    velocity.add(impulse.mult(this.inverseMass)).put(velocity);
	};

	/**
	 * Update a particle's velocity from its force accumulator
	 * @method integrateVelocity
	 * @param dt {Number} Time differential
	 */
	Particle.prototype.integrateVelocity = function integrateVelocity(dt) {
	    Particle.INTEGRATOR.integrateVelocity(this, dt);
	};

	/**
	 * Update a particle's position from its velocity
	 * @method integratePosition
	 * @param dt {Number} Time differential
	 */
	Particle.prototype.integratePosition = function integratePosition(dt) {
	    Particle.INTEGRATOR.integratePosition(this, dt);
	};

	/**
	 * Update the position and velocity of the particle
	 * @method _integrate
	 * @protected
	 * @param dt {Number} Time differential
	 */
	Particle.prototype._integrate = function _integrate(dt) {
	    this.integrateVelocity(dt);
	    this.integratePosition(dt);
	};

	/**
	 * Get kinetic energy of the particle.
	 * @method getEnergy
	 * @function
	 */
	Particle.prototype.getEnergy = function getEnergy() {
	    return 0.5 * this.mass * this.velocity.normSquared();
	};

	/**
	 * Generate transform from the current position state
	 * @method getTransform
	 * @return Transform {Transform}
	 */
	Particle.prototype.getTransform = function getTransform() {
	    this._engine.step();

	    var position = this.position;
	    var axis = this.axis;
	    var transform = this.transform;

	    if (axis !== undefined) {
	        if (axis & ~Particle.AXES.X) {
	            position.x = 0;
	        }
	        if (axis & ~Particle.AXES.Y) {
	            position.y = 0;
	        }
	        if (axis & ~Particle.AXES.Z) {
	            position.z = 0;
	        }
	    }

	    transform[12] = position.x;
	    transform[13] = position.y;
	    transform[14] = position.z;

	    return transform;
	};

	/**
	 * The modify interface of a Modifier
	 * @method modify
	 * @param target {Spec}
	 * @return Spec {Spec}
	 */
	Particle.prototype.modify = function modify(target) {
	    var _spec = this._spec;
	    _spec.transform = this.getTransform();
	    _spec.target = target;
	    return _spec;
	};

	// private
	function _createEventOutput() {
	    this._eventOutput = new EventHandler();
	    this._eventOutput.bindThis(this);
	    //overrides on/removeListener/pipe/unpipe methods
	    EventHandler.setOutputHandler(this, this._eventOutput);
	}

	Particle.prototype.emit = function emit(type, data) {
	    if (!this._eventOutput) return;
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Force = __webpack_require__(61);

	/**
	 * Drag is a force that opposes velocity. Attach it to the physics engine
	 * to slow down a physics body in motion.
	 *
	 * @class Drag
	 * @constructor
	 * @extends Force
	 * @param {Object} options options to set on drag
	 */
	function Drag(options) {
	    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
	    if (options) this.setOptions(options);

	    Force.call(this);
	}

	Drag.prototype = Object.create(Force.prototype);
	Drag.prototype.constructor = Drag;

	/**
	 * @property Drag.FORCE_FUNCTIONS
	 * @type Object
	 * @protected
	 * @static
	 */
	Drag.FORCE_FUNCTIONS = {

	    /**
	     * A drag force proportional to the velocity
	     * @attribute LINEAR
	     * @type Function
	     * @param {Vector} velocity
	     * @return {Vector} drag force
	     */
	    LINEAR : function(velocity) {
	        return velocity;
	    },

	    /**
	     * A drag force proportional to the square of the velocity
	     * @attribute QUADRATIC
	     * @type Function
	     * @param {Vector} velocity
	     * @return {Vector} drag force
	     */
	    QUADRATIC : function(velocity) {
	        return velocity.mult(velocity.norm());
	    }
	};

	/**
	 * @property Drag.DEFAULT_OPTIONS
	 * @type Object
	 * @protected
	 * @static
	 */
	Drag.DEFAULT_OPTIONS = {

	    /**
	     * The strength of the force
	     *    Range : [0, 0.1]
	     * @attribute strength
	     * @type Number
	     * @default 0.01
	     */
	    strength : 0.01,

	    /**
	     * The type of opposing force
	     * @attribute forceFunction
	     * @type Function
	     */
	    forceFunction : Drag.FORCE_FUNCTIONS.LINEAR
	};

	/**
	 * Adds a drag force to a physics body's force accumulator.
	 *
	 * @method applyForce
	 * @param targets {Array.Body} Array of bodies to apply drag force to.
	 */
	Drag.prototype.applyForce = function applyForce(targets) {
	    var strength        = this.options.strength;
	    var forceFunction   = this.options.forceFunction;
	    var force           = this.force;
	    for (var index = 0; index < targets.length; index++) {
	        var particle = targets[index];
	        forceFunction(particle.velocity).mult(-strength).put(force);
	        particle.applyForce(force);
	    }
	};

	/**
	 * Basic options setter
	 *
	 * @method setOptions
	 * @param {Objects} options
	 */
	Drag.prototype.setOptions = function setOptions(options) {
	    for (var key in options) this.options[key] = options[key];
	};

	module.exports = Drag;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Force = __webpack_require__(61);
	var Vector = __webpack_require__(43);

	/**
	 *  A force that moves a physics body to a location with a spring motion.
	 *    The body can be moved to another physics body, or an anchor point.
	 *
	 *  @class Spring
	 *  @constructor
	 *  @extends Force
	 *  @param {Object} options options to set on drag
	 */
	function Spring(options) {
	    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
	    if (options) this.setOptions(options);

	    //registers
	    this.disp = new Vector(0,0,0);

	    _init.call(this);
	    Force.call(this);
	}

	Spring.prototype = Object.create(Force.prototype);
	Spring.prototype.constructor = Spring;

	/** @const */ var pi = Math.PI;

	/**
	 * @property Spring.FORCE_FUNCTIONS
	 * @type Object
	 * @protected
	 * @static
	 */
	Spring.FORCE_FUNCTIONS = {

	    /**
	     * A FENE (Finitely Extensible Nonlinear Elastic) spring force
	     *      see: http://en.wikipedia.org/wiki/FENE
	     * @attribute FENE
	     * @type Function
	     * @param {Number} dist current distance target is from source body
	     * @param {Number} rMax maximum range of influence
	     * @return {Number} unscaled force
	     */
	    FENE : function(dist, rMax) {
	        var rMaxSmall = rMax * .99;
	        var r = Math.max(Math.min(dist, rMaxSmall), -rMaxSmall);
	        return r / (1 - r * r/(rMax * rMax));
	    },

	    /**
	     * A Hookean spring force, linear in the displacement
	     *      see: http://en.wikipedia.org/wiki/FENE
	     * @attribute FENE
	     * @type Function
	     * @param {Number} dist current distance target is from source body
	     * @return {Number} unscaled force
	     */
	    HOOK : function(dist) {
	        return dist;
	    }
	};

	/**
	 * @property Spring.DEFAULT_OPTIONS
	 * @type Object
	 * @protected
	 * @static
	 */
	Spring.DEFAULT_OPTIONS = {

	    /**
	     * The amount of time in milliseconds taken for one complete oscillation
	     * when there is no damping
	     *    Range : [150, Infinity]
	     * @attribute period
	     * @type Number
	     * @default 300
	     */
	    period        : 300,

	    /**
	     * The damping of the spring.
	     *    Range : [0, 1]
	     *    0 = no damping, and the spring will oscillate forever
	     *    1 = critically damped (the spring will never oscillate)
	     * @attribute dampingRatio
	     * @type Number
	     * @default 0.1
	     */
	    dampingRatio : 0.1,

	    /**
	     * The rest length of the spring
	     *    Range : [0, Infinity]
	     * @attribute length
	     * @type Number
	     * @default 0
	     */
	    length : 0,

	    /**
	     * The maximum length of the spring (for a FENE spring)
	     *    Range : [0, Infinity]
	     * @attribute length
	     * @type Number
	     * @default Infinity
	     */
	    maxLength : Infinity,

	    /**
	     * The location of the spring's anchor, if not another physics body
	     *
	     * @attribute anchor
	     * @type Array
	     * @optional
	     */
	    anchor : undefined,

	    /**
	     * The type of spring force
	     * @attribute forceFunction
	     * @type Function
	     */
	    forceFunction : Spring.FORCE_FUNCTIONS.HOOK
	};

	function _setForceFunction(fn) {
	    this.forceFunction = fn;
	}

	function _calcStiffness() {
	    var options = this.options;
	    options.stiffness = Math.pow(2 * pi / options.period, 2);
	}

	function _calcDamping() {
	    var options = this.options;
	    options.damping = 4 * pi * options.dampingRatio / options.period;
	}

	function _calcEnergy(strength, dist) {
	    return 0.5 * strength * dist * dist;
	}

	function _init() {
	    _setForceFunction.call(this, this.options.forceFunction);
	    _calcStiffness.call(this);
	    _calcDamping.call(this);
	}

	/**
	 * Basic options setter
	 *
	 * @method setOptions
	 * @param options {Objects}
	 */
	Spring.prototype.setOptions = function setOptions(options) {
	    if (options.anchor !== undefined) {
	        if (options.anchor.position instanceof Vector) this.options.anchor = options.anchor.position;
	        if (options.anchor   instanceof Vector)  this.options.anchor = options.anchor;
	        if (options.anchor   instanceof Array)  this.options.anchor = new Vector(options.anchor);
	    }
	    if (options.period !== undefined) this.options.period = options.period;
	    if (options.dampingRatio !== undefined) this.options.dampingRatio = options.dampingRatio;
	    if (options.length !== undefined) this.options.length = options.length;
	    if (options.forceFunction !== undefined) this.options.forceFunction = options.forceFunction;
	    if (options.maxLength !== undefined) this.options.maxLength = options.maxLength;

	    _init.call(this);
	};

	/**
	 * Adds a spring force to a physics body's force accumulator.
	 *
	 * @method applyForce
	 * @param targets {Array.Body} Array of bodies to apply force to.
	 */
	Spring.prototype.applyForce = function applyForce(targets, source) {
	    var force        = this.force;
	    var disp         = this.disp;
	    var options      = this.options;

	    var stiffness    = options.stiffness;
	    var damping      = options.damping;
	    var restLength   = options.length;
	    var lMax         = options.maxLength;
	    var anchor       = options.anchor || source.position;

	    for (var i = 0; i < targets.length; i++) {
	        var target = targets[i];
	        var p2 = target.position;
	        var v2 = target.velocity;

	        anchor.sub(p2).put(disp);
	        var dist = disp.norm() - restLength;

	        if (dist === 0) return;

	        //if dampingRatio specified, then override strength and damping
	        var m      = target.mass;
	        stiffness *= m;
	        damping   *= m;

	        disp.normalize(stiffness * this.forceFunction(dist, lMax))
	            .put(force);

	        if (damping)
	            if (source) force.add(v2.sub(source.velocity).mult(-damping)).put(force);
	            else force.add(v2.mult(-damping)).put(force);

	        target.applyForce(force);
	        if (source) source.applyForce(force.mult(-1));

	        this.setEnergy(_calcEnergy(stiffness, dist));
	    }
	};

	/**
	 * Calculates the potential energy of the spring.
	 *
	 * @method getEnergy
	 * @param target {Body}     The physics body attached to the spring
	 * @return energy {Number}
	 */
	Spring.prototype.getEnergy = function getEnergy(target) {
	    var options        = this.options;
	    var restLength  = options.length;
	    var anchor      = options.anchor;
	    var strength    = options.stiffness;

	    var dist = anchor.sub(target.position).norm() - restLength;
	    return 0.5 * strength * dist * dist;
	};

	/**
	 * Sets the anchor to a new position
	 *
	 * @method setAnchor
	 * @param anchor {Array}    New anchor of the spring
	 */
	Spring.prototype.setAnchor = function setAnchor(anchor) {
	    if (!this.options.anchor) this.options.anchor = new Vector();
	    this.options.anchor.set(anchor);
	};

	module.exports = Spring;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var EventHandler = __webpack_require__(36);
	var Engine = __webpack_require__(26);

	/**
	 * Handles piped in mousewheel events.
	 *   Emits 'start', 'update', and 'end' events with payloads including:
	 *   delta: change since last position,
	 *   position: accumulated deltas,
	 *   velocity: speed of change in pixels per ms,
	 *   slip: true (unused).
	 *
	 *   Can be used as delegate of GenericSync.
	 *
	 * @class ScrollSync
	 * @constructor
	 * @param {Object} [options] overrides of default options
	 * @param {Number} [options.direction] Pay attention to x changes (ScrollSync.DIRECTION_X),
	 *   y changes (ScrollSync.DIRECTION_Y) or both (undefined)
	 * @param {Number} [options.minimumEndSpeed] End speed calculation floors at this number, in pixels per ms
	 * @param {boolean} [options.rails] whether to snap position calculations to nearest axis
	 * @param {Number | Array.Number} [options.scale] scale outputs in by scalar or pair of scalars
	 * @param {Number} [options.stallTime] reset time for velocity calculation in ms
	 */
	function ScrollSync(options) {
	    this.options = Object.create(ScrollSync.DEFAULT_OPTIONS);
	    if (options) this.setOptions(options);

	    this._payload = {
	        delta    : null,
	        position : null,
	        velocity : null,
	        slip     : true
	    };

	    this._eventInput = new EventHandler();
	    this._eventOutput = new EventHandler();

	    EventHandler.setInputHandler(this, this._eventInput);
	    EventHandler.setOutputHandler(this, this._eventOutput);

	    this._position = (this.options.direction === undefined) ? [0,0] : 0;
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
	    lineHeight: 40
	};

	ScrollSync.DIRECTION_X = 0;
	ScrollSync.DIRECTION_Y = 1;

	var MINIMUM_TICK_TIME = 8;

	var _now = Date.now;

	function _newFrame() {
	    if (this._inProgress && (_now() - this._prevTime) > this.options.stallTime) {
	        this._inProgress = false;

	        var finalVel = (Math.abs(this._prevVel) >= this.options.minimumEndSpeed)
	            ? this._prevVel
	            : 0;

	        var payload = this._payload;
	        payload.position = this._position;
	        payload.velocity = finalVel;
	        payload.slip = true;

	        this._eventOutput.emit('end', payload);
	    }
	}

	function _handleMove(event) {
	    event.preventDefault();

	    if (!this._inProgress) {
	        this._inProgress = true;
	        this._position = (this.options.direction === undefined) ? [0,0] : 0;
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

	    var diffX = (event.wheelDeltaX !== undefined) ? event.wheelDeltaX : -event.deltaX;
	    var diffY = (event.wheelDeltaY !== undefined) ? event.wheelDeltaY : -event.deltaY;

	    if (event.deltaMode === 1) { // units in lines, not pixels
	        diffX *= this.options.lineHeight;
	        diffY *= this.options.lineHeight;
	    }

	    if (this.options.rails) {
	        if (Math.abs(diffX) > Math.abs(diffY)) diffY = 0;
	        else diffX = 0;
	    }

	    var diffTime = Math.max(currTime - prevTime, MINIMUM_TICK_TIME); // minimum tick time

	    var velX = diffX / diffTime;
	    var velY = diffY / diffTime;

	    var scale = this.options.scale;
	    var nextVel;
	    var nextDelta;

	    if (this.options.direction === ScrollSync.DIRECTION_X) {
	        nextDelta = scale * diffX;
	        nextVel = scale * velX;
	        this._position += nextDelta;
	    }
	    else if (this.options.direction === ScrollSync.DIRECTION_Y) {
	        nextDelta = scale * diffY;
	        nextVel = scale * velY;
	        this._position += nextDelta;
	    }
	    else {
	        nextDelta = [scale * diffX, scale * diffY];
	        nextVel = [scale * velX, scale * velY];
	        this._position[0] += nextDelta[0];
	        this._position[1] += nextDelta[1];
	    }

	    var payload = this._payload;
	    payload.delta    = nextDelta;
	    payload.velocity = nextVel;
	    payload.position = this._position;
	    payload.slip     = true;

	    this._eventOutput.emit('update', payload);

	    this._prevTime = currTime;
	    this._prevVel = nextVel;
	}

	/**
	 * Return entire options dictionary, including defaults.
	 *
	 * @method getOptions
	 * @return {Object} configuration options
	 */
	ScrollSync.prototype.getOptions = function getOptions() {
	    return this.options;
	};

	/**
	 * Set internal options, overriding any default options
	 *
	 * @method setOptions
	 *
	 * @param {Object} [options] overrides of default options
	 * @param {Number} [options.minimimEndSpeed] If final velocity smaller than this, round down to 0.
	 * @param {Number} [options.stallTime] ms of non-motion before 'end' emitted
	 * @param {Number} [options.rails] whether to constrain to nearest axis.
	 * @param {Number} [options.direction] ScrollSync.DIRECTION_X, DIRECTION_Y -
	 *    pay attention to one specific direction.
	 * @param {Number} [options.scale] constant factor to scale velocity output
	 */
	ScrollSync.prototype.setOptions = function setOptions(options) {
	    if (options.direction !== undefined) this.options.direction = options.direction;
	    if (options.minimumEndSpeed !== undefined) this.options.minimumEndSpeed = options.minimumEndSpeed;
	    if (options.rails !== undefined) this.options.rails = options.rails;
	    if (options.scale !== undefined) this.options.scale = options.scale;
	    if (options.stallTime !== undefined) this.options.stallTime = options.stallTime;
	};

	module.exports = ScrollSync;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var TouchTracker = __webpack_require__(62);
	var EventHandler = __webpack_require__(36);

	/**
	 * Handles piped in touch events. Emits 'start', 'update', and 'events'
	 *   events with position, velocity, acceleration, and touch id.
	 *   Useful for dealing with inputs on touch devices.
	 *
	 *
	 * @class TouchSync
	 * @constructor
	 *
	 * @param [options] {Object}             default options overrides
	 * @param [options.direction] {Number}   read from a particular axis
	 * @param [options.rails] {Boolean}      read from axis with greatest differential
	 * @param [options.scale] {Number}       constant factor to scale velocity output
	 */
	function TouchSync(options) {
	    this.options =  Object.create(TouchSync.DEFAULT_OPTIONS);
	    if (options) this.setOptions(options);

	    this._eventOutput = new EventHandler();
	    this._touchTracker = new TouchTracker();

	    EventHandler.setOutputHandler(this, this._eventOutput);
	    EventHandler.setInputHandler(this, this._touchTracker);

	    this._touchTracker.on('trackstart', _handleStart.bind(this));
	    this._touchTracker.on('trackmove', _handleMove.bind(this));
	    this._touchTracker.on('trackend', _handleEnd.bind(this));

	    this._payload = {
	        delta    : null,
	        position : null,
	        velocity : null,
	        clientX  : undefined,
	        clientY  : undefined,
	        count    : 0,
	        touch    : undefined
	    };

	    this._position = null; // to be deprecated
	}

	TouchSync.DEFAULT_OPTIONS = {
	    direction: undefined,
	    rails: false,
	    scale: 1
	};

	TouchSync.DIRECTION_X = 0;
	TouchSync.DIRECTION_Y = 1;

	var MINIMUM_TICK_TIME = 8;

	// handle 'trackstart'
	function _handleStart(data) {
	    var velocity;
	    var delta;
	    if (this.options.direction !== undefined){
	        this._position = 0;
	        velocity = 0;
	        delta = 0;
	    }
	    else {
	        this._position = [0, 0];
	        velocity = [0, 0];
	        delta = [0, 0];
	    }

	    var payload = this._payload;
	    payload.delta = delta;
	    payload.position = this._position;
	    payload.velocity = velocity;
	    payload.clientX = data.x;
	    payload.clientY = data.y;
	    payload.count = data.count;
	    payload.touch = data.identifier;

	    this._eventOutput.emit('start', payload);
	}

	// handle 'trackmove'
	function _handleMove(data) {
	    var history = data.history;

	    var currHistory = history[history.length - 1];
	    var prevHistory = history[history.length - 2];

	    var prevTime = prevHistory.timestamp;
	    var currTime = currHistory.timestamp;

	    var diffX = currHistory.x - prevHistory.x;
	    var diffY = currHistory.y - prevHistory.y;

	    if (this.options.rails) {
	        if (Math.abs(diffX) > Math.abs(diffY)) diffY = 0;
	        else diffX = 0;
	    }

	    var diffTime = Math.max(currTime - prevTime, MINIMUM_TICK_TIME);

	    var velX = diffX / diffTime;
	    var velY = diffY / diffTime;

	    var scale = this.options.scale;
	    var nextVel;
	    var nextDelta;

	    if (this.options.direction === TouchSync.DIRECTION_X) {
	        nextDelta = scale * diffX;
	        nextVel = scale * velX;
	        this._position += nextDelta;
	    }
	    else if (this.options.direction === TouchSync.DIRECTION_Y) {
	        nextDelta = scale * diffY;
	        nextVel = scale * velY;
	        this._position += nextDelta;
	    }
	    else {
	        nextDelta = [scale * diffX, scale * diffY];
	        nextVel = [scale * velX, scale * velY];
	        this._position[0] += nextDelta[0];
	        this._position[1] += nextDelta[1];
	    }

	    var payload = this._payload;
	    payload.delta    = nextDelta;
	    payload.velocity = nextVel;
	    payload.position = this._position;
	    payload.clientX  = data.x;
	    payload.clientY  = data.y;
	    payload.count    = data.count;
	    payload.touch    = data.identifier;

	    this._eventOutput.emit('update', payload);
	}

	// handle 'trackend'
	function _handleEnd(data) {
	    this._payload.count = data.count;
	    this._eventOutput.emit('end', this._payload);
	}

	/**
	 * Set internal options, overriding any default options
	 *
	 * @method setOptions
	 *
	 * @param [options] {Object}             default options overrides
	 * @param [options.direction] {Number}   read from a particular axis
	 * @param [options.rails] {Boolean}      read from axis with greatest differential
	 * @param [options.scale] {Number}       constant factor to scale velocity output
	 */
	TouchSync.prototype.setOptions = function setOptions(options) {
	    if (options.direction !== undefined) this.options.direction = options.direction;
	    if (options.rails !== undefined) this.options.rails = options.rails;
	    if (options.scale !== undefined) this.options.scale = options.scale;
	};

	/**
	 * Return entire options dictionary, including defaults.
	 *
	 * @method getOptions
	 * @return {Object} configuration options
	 */
	TouchSync.prototype.getOptions = function getOptions() {
	    return this.options;
	};

	module.exports = TouchSync;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */



	/**
	 * This namespace holds standalone functionality.
	 *  Currently includes name mapping for transition curves,
	 *  name mapping for origin pairs, and the after() function.
	 *
	 * @class Utility
	 * @static
	 */
	var Utility = {};

	/**
	 * Table of direction array positions
	 *
	 * @property {object} Direction
	 * @final
	 */
	Utility.Direction = {
	    X: 0,
	    Y: 1,
	    Z: 2
	};

	/**
	 * Return wrapper around callback function. Once the wrapper is called N
	 *   times, invoke the callback function. Arguments and scope preserved.
	 *
	 * @method after
	 *
	 * @param {number} count number of calls before callback function invoked
	 * @param {Function} callback wrapped callback function
	 *
	 * @return {function} wrapped callback with coundown feature
	 */
	Utility.after = function after(count, callback) {
	    var counter = count;
	    return function() {
	        counter--;
	        if (counter === 0) callback.apply(this, arguments);
	    };
	};

	/**
	 * Load a URL and return its contents in a callback
	 *
	 * @method loadURL
	 *
	 * @param {string} url URL of object
	 * @param {function} callback callback to dispatch with content
	 */
	Utility.loadURL = function loadURL(url, callback) {
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function onreadystatechange() {
	        if (this.readyState === 4) {
	            if (callback) callback(this.responseText);
	        }
	    };
	    xhr.open('GET', url);
	    xhr.send();
	};

	/**
	 * Create a document fragment from a string of HTML
	 *
	 * @method createDocumentFragmentFromHTML
	 *
	 * @param {string} html HTML to convert to DocumentFragment
	 *
	 * @return {DocumentFragment} DocumentFragment representing input HTML
	 */
	Utility.createDocumentFragmentFromHTML = function createDocumentFragmentFromHTML(html) {
	    var element = document.createElement('div');
	    element.innerHTML = html;
	    var result = document.createDocumentFragment();
	    while (element.hasChildNodes()) result.appendChild(element.firstChild);
	    return result;
	};

	module.exports = Utility;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var MultipleTransition = __webpack_require__(63);
	var TweenTransition = __webpack_require__(64);

	/**
	 * A state maintainer for a smooth transition between
	 *    numerically-specified states. Example numeric states include floats or
	 *    Transform objects.
	 *
	 * An initial state is set with the constructor or set(startState). A
	 *    corresponding end state and transition are set with set(endState,
	 *    transition). Subsequent calls to set(endState, transition) begin at
	 *    the last state. Calls to get(timestamp) provide the interpolated state
	 *    along the way.
	 *
	 * Note that there is no event loop here - calls to get() are the only way
	 *    to find state projected to the current (or provided) time and are
	 *    the only way to trigger callbacks. Usually this kind of object would
	 *    be part of the render() path of a visible component.
	 *
	 * @class Transitionable
	 * @constructor
	 * @param {number|Array.Number|Object.<number|string, number>} start
	 *    beginning state
	 */
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

	Transitionable.registerMethod = function registerMethod(name, engineClass) {
	    if (!(name in transitionMethods)) {
	        transitionMethods[name] = engineClass;
	        return true;
	    }
	    else return false;
	};

	Transitionable.unregisterMethod = function unregisterMethod(name) {
	    if (name in transitionMethods) {
	        delete transitionMethods[name];
	        return true;
	    }
	    else return false;
	};

	function _loadNext() {
	    if (this._callback) {
	        var callback = this._callback;
	        this._callback = undefined;
	        callback();
	    }
	    if (this.actionQueue.length <= 0) {
	        this.set(this.get()); // no update required
	        return;
	    }
	    this.currentAction = this.actionQueue.shift();
	    this._callback = this.callbackQueue.shift();

	    var method = null;
	    var endValue = this.currentAction[0];
	    var transition = this.currentAction[1];
	    if (transition instanceof Object && transition.method) {
	        method = transition.method;
	        if (typeof method === 'string') method = transitionMethods[method];
	    }
	    else {
	        method = TweenTransition;
	    }

	    if (this._currentMethod !== method) {
	        if (!(endValue instanceof Object) || method.SUPPORTS_MULTIPLE === true || endValue.length <= method.SUPPORTS_MULTIPLE) {
	            this._engineInstance = new method();
	        }
	        else {
	            this._engineInstance = new MultipleTransition(method);
	        }
	        this._currentMethod = method;
	    }

	    this._engineInstance.reset(this.state, this.velocity);
	    if (this.velocity !== undefined) transition.velocity = this.velocity;
	    this._engineInstance.set(endValue, transition, _loadNext.bind(this));
	}

	/**
	 * Add transition to end state to the queue of pending transitions. Special
	 *    Use: calling without a transition resets the object to that state with
	 *    no pending actions
	 *
	 * @method set
	 *
	 * @param {number|FamousMatrix|Array.Number|Object.<number, number>} endState
	 *    end state to which we interpolate
	 * @param {transition=} transition object of type {duration: number, curve:
	 *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
	 *    instantaneous.
	 * @param {function()=} callback Zero-argument function to call on observed
	 *    completion (t=1)
	 */
	Transitionable.prototype.set = function set(endState, transition, callback) {
	    if (!transition) {
	        this.reset(endState);
	        if (callback) callback();
	        return this;
	    }

	    var action = [endState, transition];
	    this.actionQueue.push(action);
	    this.callbackQueue.push(callback);
	    if (!this.currentAction) _loadNext.call(this);
	    return this;
	};

	/**
	 * Cancel all transitions and reset to a stable state
	 *
	 * @method reset
	 *
	 * @param {number|Array.Number|Object.<number, number>} startState
	 *    stable state to set to
	 */
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

	/**
	 * Add delay action to the pending action queue queue.
	 *
	 * @method delay
	 *
	 * @param {number} duration delay time (ms)
	 * @param {function} callback Zero-argument function to call on observed
	 *    completion (t=1)
	 */
	Transitionable.prototype.delay = function delay(duration, callback) {
	    this.set(this.get(), {duration: duration,
	        curve: function() {
	            return 0;
	        }},
	        callback
	    );
	};

	/**
	 * Get interpolated state of current action at provided time. If the last
	 *    action has completed, invoke its callback.
	 *
	 * @method get
	 *
	 * @param {number=} timestamp Evaluate the curve at a normalized version of this
	 *    time. If omitted, use current time. (Unix epoch time)
	 * @return {number|Object.<number|string, number>} beginning state
	 *    interpolated to this point in time.
	 */
	Transitionable.prototype.get = function get(timestamp) {
	    if (this._engineInstance) {
	        if (this._engineInstance.getVelocity)
	            this.velocity = this._engineInstance.getVelocity();
	        this.state = this._engineInstance.get(timestamp);
	    }
	    return this.state;
	};

	/**
	 * Is there at least one action pending completion?
	 *
	 * @method isActive
	 *
	 * @return {boolean}
	 */
	Transitionable.prototype.isActive = function isActive() {
	    return !!this.currentAction;
	};

	/**
	 * Halt transition at current state and erase all pending actions.
	 *
	 * @method halt
	 */
	Transitionable.prototype.halt = function halt() {
	    this.set(this.get());
	};

	module.exports = Transitionable;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Transitionable = __webpack_require__(51);
	var Transform = __webpack_require__(25);
	var Utility = __webpack_require__(50);

	/**
	 * A class for transitioning the state of a Transform by transitioning
	 * its translate, scale, skew and rotate components independently.
	 *
	 * @class TransitionableTransform
	 * @constructor
	 *
	 * @param [transform=Transform.identity] {Transform} The initial transform state
	 */
	function TransitionableTransform(transform) {
	    this._final = Transform.identity.slice();
	    this.translate = new Transitionable([0, 0, 0]);
	    this.rotate = new Transitionable([0, 0, 0]);
	    this.skew = new Transitionable([0, 0, 0]);
	    this.scale = new Transitionable([1, 1, 1]);

	    if (transform) this.set(transform);
	}

	function _build() {
	    return Transform.build({
	        translate: this.translate.get(),
	        rotate: this.rotate.get(),
	        skew: this.skew.get(),
	        scale: this.scale.get()
	    });
	}

	/**
	 * An optimized way of setting only the translation component of a Transform
	 *
	 * @method setTranslate
	 * @chainable
	 *
	 * @param translate {Array}     New translation state
	 * @param [transition] {Object} Transition definition
	 * @param [callback] {Function} Callback
	 * @return {TransitionableTransform}
	 */
	TransitionableTransform.prototype.setTranslate = function setTranslate(translate, transition, callback) {
	    this.translate.set(translate, transition, callback);
	    this._final = this._final.slice();
	    this._final[12] = translate[0];
	    this._final[13] = translate[1];
	    if (translate[2] !== undefined) this._final[14] = translate[2];
	    return this;
	};

	/**
	 * An optimized way of setting only the scale component of a Transform
	 *
	 * @method setScale
	 * @chainable
	 *
	 * @param scale {Array}         New scale state
	 * @param [transition] {Object} Transition definition
	 * @param [callback] {Function} Callback
	 * @return {TransitionableTransform}
	 */
	TransitionableTransform.prototype.setScale = function setScale(scale, transition, callback) {
	    this.scale.set(scale, transition, callback);
	    this._final = this._final.slice();
	    this._final[0] = scale[0];
	    this._final[5] = scale[1];
	    if (scale[2] !== undefined) this._final[10] = scale[2];
	    return this;
	};

	/**
	 * An optimized way of setting only the rotational component of a Transform
	 *
	 * @method setRotate
	 * @chainable
	 *
	 * @param eulerAngles {Array}   Euler angles for new rotation state
	 * @param [transition] {Object} Transition definition
	 * @param [callback] {Function} Callback
	 * @return {TransitionableTransform}
	 */
	TransitionableTransform.prototype.setRotate = function setRotate(eulerAngles, transition, callback) {
	    this.rotate.set(eulerAngles, transition, callback);
	    this._final = _build.call(this);
	    this._final = Transform.build({
	        translate: this.translate.get(),
	        rotate: eulerAngles,
	        scale: this.scale.get(),
	        skew: this.skew.get()
	    });
	    return this;
	};

	/**
	 * An optimized way of setting only the skew component of a Transform
	 *
	 * @method setSkew
	 * @chainable
	 *
	 * @param skewAngles {Array}    New skew state
	 * @param [transition] {Object} Transition definition
	 * @param [callback] {Function} Callback
	 * @return {TransitionableTransform}
	 */
	TransitionableTransform.prototype.setSkew = function setSkew(skewAngles, transition, callback) {
	    this.skew.set(skewAngles, transition, callback);
	    this._final = Transform.build({
	        translate: this.translate.get(),
	        rotate: this.rotate.get(),
	        scale: this.scale.get(),
	        skew: skewAngles
	    });
	    return this;
	};

	/**
	 * Setter for a TransitionableTransform with optional parameters to transition
	 * between Transforms
	 *
	 * @method set
	 * @chainable
	 *
	 * @param transform {Array}     New transform state
	 * @param [transition] {Object} Transition definition
	 * @param [callback] {Function} Callback
	 * @return {TransitionableTransform}
	 */
	TransitionableTransform.prototype.set = function set(transform, transition, callback) {
	    this._final = transform;
	    var components = Transform.interpret(transform);

	    var _callback = callback ? Utility.after(4, callback) : null;
	    this.translate.set(components.translate, transition, _callback);
	    this.rotate.set(components.rotate, transition, _callback);
	    this.skew.set(components.skew, transition, _callback);
	    this.scale.set(components.scale, transition, _callback);
	    return this;
	};

	/**
	 * Sets the default transition to use for transitioning betwen Transform states
	 *
	 * @method setDefaultTransition
	 *
	 * @param transition {Object} Transition definition
	 */
	TransitionableTransform.prototype.setDefaultTransition = function setDefaultTransition(transition) {
	    this.translate.setDefault(transition);
	    this.rotate.setDefault(transition);
	    this.skew.setDefault(transition);
	    this.scale.setDefault(transition);
	};

	/**
	 * Getter. Returns the current state of the Transform
	 *
	 * @method get
	 *
	 * @return {Transform}
	 */
	TransitionableTransform.prototype.get = function get() {
	    if (this.isActive()) {
	        return _build.call(this);
	    }
	    else return this._final;
	};

	/**
	 * Get the destination state of the Transform
	 *
	 * @method getFinal
	 *
	 * @return Transform {Transform}
	 */
	TransitionableTransform.prototype.getFinal = function getFinal() {
	    return this._final;
	};

	/**
	 * Determine if the TransitionalTransform is currently transitioning
	 *
	 * @method isActive
	 *
	 * @return {Boolean}
	 */
	TransitionableTransform.prototype.isActive = function isActive() {
	    return this.translate.isActive() || this.rotate.isActive() || this.scale.isActive() || this.skew.isActive();
	};

	/**
	 * Halts the transition
	 *
	 * @method halt
	 */
	TransitionableTransform.prototype.halt = function halt() {
	    this._final = this.get();
	    this.translate.halt();
	    this.rotate.halt();
	    this.skew.halt();
	    this.scale.halt();
	};

	module.exports = TransitionableTransform;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/glyphicons-halflings-regular.eot"

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/glyphicons-halflings-regular.woff"

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/glyphicons-halflings-regular.ttf"

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/glyphicons-halflings-regular.svg"

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Entity = __webpack_require__(37);
	var SpecParser = __webpack_require__(66);

	/**
	 * A wrapper for inserting a renderable component (like a Modifer or
	 *   Surface) into the render tree.
	 *
	 * @class RenderNode
	 * @constructor
	 *
	 * @param {Object} object Target renderable component
	 */
	function RenderNode(object) {
	    this._object = null;
	    this._child = null;
	    this._hasMultipleChildren = false;
	    this._isRenderable = false;
	    this._isModifier = false;

	    this._resultCache = {};
	    this._prevResults = {};

	    this._childResult = null;

	    if (object) this.set(object);
	}

	/**
	 * Append a renderable to the list of this node's children.
	 *   This produces a new RenderNode in the tree.
	 *   Note: Does not double-wrap if child is a RenderNode already.
	 *
	 * @method add
	 * @param {Object} child renderable object
	 * @return {RenderNode} new render node wrapping child
	 */
	RenderNode.prototype.add = function add(child) {
	    var childNode = (child instanceof RenderNode) ? child : new RenderNode(child);
	    if (this._child instanceof Array) this._child.push(childNode);
	    else if (this._child) {
	        this._child = [this._child, childNode];
	        this._hasMultipleChildren = true;
	        this._childResult = []; // to be used later
	    }
	    else this._child = childNode;

	    return childNode;
	};

	/**
	 * Return the single wrapped object.  Returns null if this node has multiple child nodes.
	 *
	 * @method get
	 *
	 * @return {Ojbect} contained renderable object
	 */
	RenderNode.prototype.get = function get() {
	    return this._object || (this._hasMultipleChildren ? null : (this._child ? this._child.get() : null));
	};

	/**
	 * Overwrite the list of children to contain the single provided object
	 *
	 * @method set
	 * @param {Object} child renderable object
	 * @return {RenderNode} this render node, or child if it is a RenderNode
	 */
	RenderNode.prototype.set = function set(child) {
	    this._childResult = null;
	    this._hasMultipleChildren = false;
	    this._isRenderable = child.render ? true : false;
	    this._isModifier = child.modify ? true : false;
	    this._object = child;
	    this._child = null;
	    if (child instanceof RenderNode) return child;
	    else return this;
	};

	/**
	 * Get render size of contained object.
	 *
	 * @method getSize
	 * @return {Array.Number} size of this or size of single child.
	 */
	RenderNode.prototype.getSize = function getSize() {
	    var result = null;
	    var target = this.get();
	    if (target && target.getSize) result = target.getSize();
	    if (!result && this._child && this._child.getSize) result = this._child.getSize();
	    return result;
	};

	// apply results of rendering this subtree to the document
	function _applyCommit(spec, context, cacheStorage) {
	    var result = SpecParser.parse(spec, context);
	    var keys = Object.keys(result);
	    for (var i = 0; i < keys.length; i++) {
	        var id = keys[i];
	        var childNode = Entity.get(id);
	        var commitParams = result[id];
	        commitParams.allocator = context.allocator;
	        var commitResult = childNode.commit(commitParams);
	        if (commitResult) _applyCommit(commitResult, context, cacheStorage);
	        else cacheStorage[id] = commitParams;
	    }
	}

	/**
	 * Commit the content change from this node to the document.
	 *
	 * @private
	 * @method commit
	 * @param {Context} context render context
	 */
	RenderNode.prototype.commit = function commit(context) {
	    // free up some divs from the last loop
	    var prevKeys = Object.keys(this._prevResults);
	    for (var i = 0; i < prevKeys.length; i++) {
	        var id = prevKeys[i];
	        if (this._resultCache[id] === undefined) {
	            var object = Entity.get(id);
	            if (object.cleanup) object.cleanup(context.allocator);
	        }
	    }

	    this._prevResults = this._resultCache;
	    this._resultCache = {};
	    _applyCommit(this.render(), context, this._resultCache);
	};

	/**
	 * Generate a render spec from the contents of the wrapped component.
	 *
	 * @private
	 * @method render
	 *
	 * @return {Object} render specification for the component subtree
	 *    only under this node.
	 */
	RenderNode.prototype.render = function render() {
	    if (this._isRenderable) return this._object.render();

	    var result = null;
	    if (this._hasMultipleChildren) {
	        result = this._childResult;
	        var children = this._child;
	        for (var i = 0; i < children.length; i++) {
	            result[i] = children[i].render();
	        }
	    }
	    else if (this._child) result = this._child.render();

	    return this._isModifier ? this._object.modify(result) : result;
	};

	module.exports = RenderNode;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */



	/**
	 * EventEmitter represents a channel for events.
	 *
	 * @class EventEmitter
	 * @constructor
	 */
	function EventEmitter() {
	    this.listeners = {};
	    this._owner = this;
	}

	/**
	 * Trigger an event, sending to all downstream handlers
	 *   listening for provided 'type' key.
	 *
	 * @method emit
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {Object} event event data
	 * @return {EventHandler} this
	 */
	EventEmitter.prototype.emit = function emit(type, event) {
	    var handlers = this.listeners[type];
	    if (handlers) {
	        for (var i = 0; i < handlers.length; i++) {
	            handlers[i].call(this._owner, event);
	        }
	    }
	    return this;
	};

	/**
	 * Bind a callback function to an event type handled by this object.
	 *
	 * @method "on"
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {function(string, Object)} handler callback
	 * @return {EventHandler} this
	 */
	   EventEmitter.prototype.on = function on(type, handler) {
	    if (!(type in this.listeners)) this.listeners[type] = [];
	    var index = this.listeners[type].indexOf(handler);
	    if (index < 0) this.listeners[type].push(handler);
	    return this;
	};

	/**
	 * Alias for "on".
	 * @method addListener
	 */
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	   /**
	 * Unbind an event by type and handler.
	 *   This undoes the work of "on".
	 *
	 * @method removeListener
	 *
	 * @param {string} type event type key (for example, 'click')
	 * @param {function} handler function object to remove
	 * @return {EventEmitter} this
	 */
	EventEmitter.prototype.removeListener = function removeListener(type, handler) {
	    var index = this.listeners[type].indexOf(handler);
	    if (index >= 0) this.listeners[type].splice(index, 1);
	    return this;
	};

	/**
	 * Call event handlers with this set to owner.
	 *
	 * @method bindThis
	 *
	 * @param {Object} owner object this EventEmitter belongs to
	 */
	EventEmitter.prototype.bindThis = function bindThis(owner) {
	    this._owner = owner;
	};

	module.exports = EventEmitter;

/***/ },
/* 59 */
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

	/*global define, console*/

	/**
	 * LayoutContext is the interface for a layout-function to access
	 * renderables in the data-source and set their size, position, tranformation, etc...
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

	    // properties
	    // size
	    // direction

	    /**
	     * Get the layout-node for the next renderable in the data-source. When
	     * the end of the data-source is reached, `undefined` is returned.
	     * Use this function to enumerate the contents of a data-source that is
	     * either an Array or a ViewSequence.
	     *
	     * **Example:**
	     *
	     * ```javascript
	     * function MyLayoutFunction(context, options) {
	     *   var height = 0;
	     *   var node = context.next(); // get first node
	     *   while (node) {
	     *     context.set({
	     *       size: [context.size[0], 100],
	     *       transform: [0, height, 0]
	     *     });
	     *     height += 100;
	     *     node = context.next(); // get next node
	     *   }
	     * }
	     * ```
	     *
	     * @return {LayoutNode} layout-node or undefined
	     */
	    LayoutContext.prototype.next = function() {
	        // dummy implementation, override in constructor
	    };

	    LayoutContext.prototype.prev = function() {
	        // dummy implementation, override in constructor
	    };

	    /**
	     * Get the layout-node for a renderable with a specific id. This function
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
	     * layout-nodes in the array use `get()` to get the array and enumerate the
	     * elements in the array:
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
	     *       context.set(leftItems[i], {
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
	     * @param {String|Array.Elmement} node node-id or array-element
	     * @return {LayoutNode} layout-node or undefined
	     */
	    LayoutContext.prototype.get = function(node) {
	        // dummy implementation, override in constructor
	    };

	    /**
	     * Set the size, origin, align, translation, scale, rotate & skew for a layout-node.
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
	     *   })
	     * }
	     * ```
	     *
	     * @param {LayoutNode|String|Array.Element} node layout-node, node-id or array-element
	     * @param {Object} set properties: size, origin, align, translate, scale, rotate & skew
	     */
	    LayoutContext.prototype.set = function(node, set) {
	        // dummy implementation, override in constructor
	    };

	    /**
	     * Resolve the size of a layout-node by accessing the `getSize` function
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
	     * @param {LayoutNode|String|Array.Element} node layout-node, node-id or array-element
	     * @return {Size} size of the node
	     */
	    LayoutContext.prototype.resolveSize = function(node) {
	        // dummy implementation, override in constructor
	    };

	    module.exports = LayoutContext;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */




	/**
	 * Internal helper object to Context that handles the process of
	 *   creating and allocating DOM elements within a managed div.
	 *   Private.
	 *
	 * @class ElementAllocator
	 * @constructor
	 * @private
	 * @param {Node} container document element in which Famo.us content will be inserted
	 */
	function ElementAllocator(container) {
	    if (!container) container = document.createDocumentFragment();
	    this.container = container;
	    this.detachedNodes = {};
	    this.nodeCount = 0;
	}

	/**
	 * Move the document elements from their original container to a new one.
	 *
	 * @private
	 * @method migrate
	 *
	 * @param {Node} container document element to which Famo.us content will be migrated
	 */
	ElementAllocator.prototype.migrate = function migrate(container) {
	    var oldContainer = this.container;
	    if (container === oldContainer) return;

	    if (oldContainer instanceof DocumentFragment) {
	        container.appendChild(oldContainer);
	    }
	    else {
	        while (oldContainer.hasChildNodes()) {
	            container.appendChild(oldContainer.removeChild(oldContainer.firstChild));
	        }
	    }

	    this.container = container;
	};

	/**
	 * Allocate an element of specified type from the pool.
	 *
	 * @private
	 * @method allocate
	 *
	 * @param {string} type type of element, e.g. 'div'
	 * @return {Node} allocated document element
	 */
	ElementAllocator.prototype.allocate = function allocate(type) {
	    type = type.toLowerCase();
	    if (!(type in this.detachedNodes)) this.detachedNodes[type] = [];
	    var nodeStore = this.detachedNodes[type];
	    var result;
	    if (nodeStore.length > 0) {
	        result = nodeStore.pop();
	    }
	    else {
	        result = document.createElement(type);
	        this.container.appendChild(result);
	    }
	    this.nodeCount++;
	    return result;
	};

	/**
	 * De-allocate an element of specified type to the pool.
	 *
	 * @private
	 * @method deallocate
	 *
	 * @param {Node} element document element to deallocate
	 */
	ElementAllocator.prototype.deallocate = function deallocate(element) {
	    var nodeType = element.nodeName.toLowerCase();
	    var nodeStore = this.detachedNodes[nodeType];
	    nodeStore.push(element);
	    this.nodeCount--;
	};

	/**
	 * Get count of total allocated nodes in the document.
	 *
	 * @private
	 * @method getNodeCount
	 *
	 * @return {Number} total node count
	 */
	ElementAllocator.prototype.getNodeCount = function getNodeCount() {
	    return this.nodeCount;
	};

	module.exports = ElementAllocator;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Vector = __webpack_require__(43);
	var EventHandler = __webpack_require__(36);

	/**
	 * Force base class.
	 *
	 * @class Force
	 * @uses EventHandler
	 * @constructor
	 */
	function Force(force) {
	    this.force = new Vector(force);
	    this._energy = 0.0;
	    this._eventOutput = null;
	}

	/**
	 * Basic setter for options
	 *
	 * @method setOptions
	 * @param options {Objects}
	 */
	Force.prototype.setOptions = function setOptions(options) {
	    for (var key in options) this.options[key] = options[key];
	};

	/**
	 * Adds a force to a physics body's force accumulator.
	 *
	 * @method applyForce
	 * @param body {Body}
	 */
	Force.prototype.applyForce = function applyForce(body) {
	    body.applyForce(this.force);
	};

	/**
	 * Getter for a force's potential energy.
	 *
	 * @method getEnergy
	 * @return energy {Number}
	 */
	Force.prototype.getEnergy = function getEnergy() {
	    return this._energy;
	};

	/*
	 * Setter for a force's potential energy.
	 *
	 * @method setEnergy
	 * @param energy {Number}
	 */
	Force.prototype.setEnergy = function setEnergy(energy) {
	    this._energy = energy;
	};

	function _createEventOutput() {
	    this._eventOutput = new EventHandler();
	    this._eventOutput.bindThis(this);
	    EventHandler.setOutputHandler(this, this._eventOutput);
	}

	Force.prototype.on = function on() {
	    _createEventOutput.call(this);
	    return this.on.apply(this, arguments);
	};
	Force.prototype.addListener = function addListener() {
	    _createEventOutput.call(this);
	    return this.addListener.apply(this, arguments);
	};
	Force.prototype.pipe = function pipe() {
	    _createEventOutput.call(this);
	    return this.pipe.apply(this, arguments);
	};
	Force.prototype.removeListener = function removeListener() {
	    return this.removeListener.apply(this, arguments);
	};
	Force.prototype.unpipe = function unpipe() {
	    return this.unpipe.apply(this, arguments);
	};

	module.exports = Force;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var EventHandler = __webpack_require__(36);

	var _now = Date.now;

	function _timestampTouch(touch, event, history) {
	    return {
	        x: touch.clientX,
	        y: touch.clientY,
	        identifier : touch.identifier,
	        origin: event.origin,
	        timestamp: _now(),
	        count: event.touches.length,
	        history: history
	    };
	}

	function _handleStart(event) {
	    for (var i = 0; i < event.changedTouches.length; i++) {
	        var touch = event.changedTouches[i];
	        var data = _timestampTouch(touch, event, null);
	        this.eventOutput.emit('trackstart', data);
	        if (!this.selective && !this.touchHistory[touch.identifier]) this.track(data);
	    }
	}

	function _handleMove(event) {
	    for (var i = 0; i < event.changedTouches.length; i++) {
	        var touch = event.changedTouches[i];
	        var history = this.touchHistory[touch.identifier];
	        if (history) {
	            var data = _timestampTouch(touch, event, history);
	            this.touchHistory[touch.identifier].push(data);
	            this.eventOutput.emit('trackmove', data);
	        }
	    }
	}

	function _handleEnd(event) {
	    for (var i = 0; i < event.changedTouches.length; i++) {
	        var touch = event.changedTouches[i];
	        var history = this.touchHistory[touch.identifier];
	        if (history) {
	            var data = _timestampTouch(touch, event, history);
	            this.eventOutput.emit('trackend', data);
	            delete this.touchHistory[touch.identifier];
	        }
	    }
	}

	function _handleUnpipe() {
	    for (var i in this.touchHistory) {
	        var history = this.touchHistory[i];
	        this.eventOutput.emit('trackend', {
	            touch: history[history.length - 1].touch,
	            timestamp: Date.now(),
	            count: 0,
	            history: history
	        });
	        delete this.touchHistory[i];
	    }
	}

	/**
	 * Helper to TouchSync – tracks piped in touch events, organizes touch
	 *   events by ID, and emits track events back to TouchSync.
	 *   Emits 'trackstart', 'trackmove', and 'trackend' events upstream.
	 *
	 * @class TouchTracker
	 * @constructor
	 * @param {Boolean} selective if false, save state for each touch.
	 */
	function TouchTracker(selective) {
	    this.selective = selective;
	    this.touchHistory = {};

	    this.eventInput = new EventHandler();
	    this.eventOutput = new EventHandler();

	    EventHandler.setInputHandler(this, this.eventInput);
	    EventHandler.setOutputHandler(this, this.eventOutput);

	    this.eventInput.on('touchstart', _handleStart.bind(this));
	    this.eventInput.on('touchmove', _handleMove.bind(this));
	    this.eventInput.on('touchend', _handleEnd.bind(this));
	    this.eventInput.on('touchcancel', _handleEnd.bind(this));
	    this.eventInput.on('unpipe', _handleUnpipe.bind(this));
	}

	/**
	 * Record touch data, if selective is false.
	 * @private
	 * @method track
	 * @param {Object} data touch data
	 */
	TouchTracker.prototype.track = function track(data) {
	    this.touchHistory[data.identifier] = [data];
	};

	module.exports = TouchTracker;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Utility = __webpack_require__(50);

	/**
	 * Transition meta-method to support transitioning multiple
	 *   values with scalar-only methods.
	 *
	 *
	 * @class MultipleTransition
	 * @constructor
	 *
	 * @param {Object} method Transionable class to multiplex
	 */
	function MultipleTransition(method) {
	    this.method = method;
	    this._instances = [];
	    this.state = [];
	}

	MultipleTransition.SUPPORTS_MULTIPLE = true;

	/**
	 * Get the state of each transition.
	 *
	 * @method get
	 *
	 * @return state {Number|Array} state array
	 */
	MultipleTransition.prototype.get = function get() {
	    for (var i = 0; i < this._instances.length; i++) {
	        this.state[i] = this._instances[i].get();
	    }
	    return this.state;
	};

	/**
	 * Set the end states with a shared transition, with optional callback.
	 *
	 * @method set
	 *
	 * @param {Number|Array} endState Final State.  Use a multi-element argument for multiple transitions.
	 * @param {Object} transition Transition definition, shared among all instances
	 * @param {Function} callback called when all endStates have been reached.
	 */
	MultipleTransition.prototype.set = function set(endState, transition, callback) {
	    var _allCallback = Utility.after(endState.length, callback);
	    for (var i = 0; i < endState.length; i++) {
	        if (!this._instances[i]) this._instances[i] = new (this.method)();
	        this._instances[i].set(endState[i], transition, _allCallback);
	    }
	};

	/**
	 * Reset all transitions to start state.
	 *
	 * @method reset
	 *
	 * @param  {Number|Array} startState Start state
	 */
	MultipleTransition.prototype.reset = function reset(startState) {
	    for (var i = 0; i < startState.length; i++) {
	        if (!this._instances[i]) this._instances[i] = new (this.method)();
	        this._instances[i].reset(startState[i]);
	    }
	};

	module.exports = MultipleTransition;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */




	/**
	 *
	 * A state maintainer for a smooth transition between
	 *    numerically-specified states.  Example numeric states include floats or
	 *    Transfornm objects.
	 *
	 *    An initial state is set with the constructor or set(startValue). A
	 *    corresponding end state and transition are set with set(endValue,
	 *    transition). Subsequent calls to set(endValue, transition) begin at
	 *    the last state. Calls to get(timestamp) provide the _interpolated state
	 *    along the way.
	 *
	 *   Note that there is no event loop here - calls to get() are the only way
	 *    to find out state projected to the current (or provided) time and are
	 *    the only way to trigger callbacks. Usually this kind of object would
	 *    be part of the render() path of a visible component.
	 *
	 * @class TweenTransition
	 * @constructor
	 *
	 * @param {Object} options TODO
	 *    beginning state
	 */
	function TweenTransition(options) {
	    this.options = Object.create(TweenTransition.DEFAULT_OPTIONS);
	    if (options) this.setOptions(options);

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

	/**
	 * Transition curves mapping independent variable t from domain [0,1] to a
	 *    range within [0,1]. Includes functions 'linear', 'easeIn', 'easeOut',
	 *    'easeInOut', 'easeOutBounce', 'spring'.
	 *
	 * @property {object} Curve
	 * @final
	 */
	TweenTransition.Curves = {
	    linear: function(t) {
	        return t;
	    },
	    easeIn: function(t) {
	        return t*t;
	    },
	    easeOut: function(t) {
	        return t*(2-t);
	    },
	    easeInOut: function(t) {
	        if (t <= 0.5) return 2*t*t;
	        else return -2*t*t + 4*t - 1;
	    },
	    easeOutBounce: function(t) {
	        return t*(3 - 2*t);
	    },
	    spring: function(t) {
	        return (1 - t) * Math.sin(6 * Math.PI * t) + t;
	    }
	};

	TweenTransition.SUPPORTS_MULTIPLE = true;
	TweenTransition.DEFAULT_OPTIONS = {
	    curve: TweenTransition.Curves.linear,
	    duration: 500,
	    speed: 0 /* considered only if positive */
	};

	var registeredCurves = {};

	/**
	 * Add "unit" curve to internal dictionary of registered curves.
	 *
	 * @method registerCurve
	 *
	 * @static
	 *
	 * @param {string} curveName dictionary key
	 * @param {unitCurve} curve function of one numeric variable mapping [0,1]
	 *    to range inside [0,1]
	 * @return {boolean} false if key is taken, else true
	 */
	TweenTransition.registerCurve = function registerCurve(curveName, curve) {
	    if (!registeredCurves[curveName]) {
	        registeredCurves[curveName] = curve;
	        return true;
	    }
	    else {
	        return false;
	    }
	};

	/**
	 * Remove object with key "curveName" from internal dictionary of registered
	 *    curves.
	 *
	 * @method unregisterCurve
	 *
	 * @static
	 *
	 * @param {string} curveName dictionary key
	 * @return {boolean} false if key has no dictionary value
	 */
	TweenTransition.unregisterCurve = function unregisterCurve(curveName) {
	    if (registeredCurves[curveName]) {
	        delete registeredCurves[curveName];
	        return true;
	    }
	    else {
	        return false;
	    }
	};

	/**
	 * Retrieve function with key "curveName" from internal dictionary of
	 *    registered curves. Default curves are defined in the
	 *    TweenTransition.Curves array, where the values represent
	 *    unitCurve functions.
	 *
	 * @method getCurve
	 *
	 * @static
	 *
	 * @param {string} curveName dictionary key
	 * @return {unitCurve} curve function of one numeric variable mapping [0,1]
	 *    to range inside [0,1]
	 */
	TweenTransition.getCurve = function getCurve(curveName) {
	    var curve = registeredCurves[curveName];
	    if (curve !== undefined) return curve;
	    else throw new Error('curve not registered');
	};

	/**
	 * Retrieve all available curves.
	 *
	 * @method getCurves
	 *
	 * @static
	 *
	 * @return {object} curve functions of one numeric variable mapping [0,1]
	 *    to range inside [0,1]
	 */
	TweenTransition.getCurves = function getCurves() {
	    return registeredCurves;
	};

	 // Interpolate: If a linear function f(0) = a, f(1) = b, then return f(t)
	function _interpolate(a, b, t) {
	    return ((1 - t) * a) + (t * b);
	}

	function _clone(obj) {
	    if (obj instanceof Object) {
	        if (obj instanceof Array) return obj.slice(0);
	        else return Object.create(obj);
	    }
	    else return obj;
	}

	// Fill in missing properties in "transition" with those in defaultTransition, and
	//   convert internal named curve to function object, returning as new
	//   object.
	function _normalize(transition, defaultTransition) {
	    var result = {curve: defaultTransition.curve};
	    if (defaultTransition.duration) result.duration = defaultTransition.duration;
	    if (defaultTransition.speed) result.speed = defaultTransition.speed;
	    if (transition instanceof Object) {
	        if (transition.duration !== undefined) result.duration = transition.duration;
	        if (transition.curve) result.curve = transition.curve;
	        if (transition.speed) result.speed = transition.speed;
	    }
	    if (typeof result.curve === 'string') result.curve = TweenTransition.getCurve(result.curve);
	    return result;
	}

	/**
	 * Set internal options, overriding any default options.
	 *
	 * @method setOptions
	 *
	 *
	 * @param {Object} options options object
	 * @param {Object} [options.curve] function mapping [0,1] to [0,1] or identifier
	 * @param {Number} [options.duration] duration in ms
	 * @param {Number} [options.speed] speed in pixels per ms
	 */
	TweenTransition.prototype.setOptions = function setOptions(options) {
	    if (options.curve !== undefined) this.options.curve = options.curve;
	    if (options.duration !== undefined) this.options.duration = options.duration;
	    if (options.speed !== undefined) this.options.speed = options.speed;
	};

	/**
	 * Add transition to end state to the queue of pending transitions. Special
	 *    Use: calling without a transition resets the object to that state with
	 *    no pending actions
	 *
	 * @method set
	 *
	 *
	 * @param {number|FamousMatrix|Array.Number|Object.<number, number>} endValue
	 *    end state to which we _interpolate
	 * @param {transition=} transition object of type {duration: number, curve:
	 *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
	 *    instantaneous.
	 * @param {function()=} callback Zero-argument function to call on observed
	 *    completion (t=1)
	 */
	TweenTransition.prototype.set = function set(endValue, transition, callback) {
	    if (!transition) {
	        this.reset(endValue);
	        if (callback) callback();
	        return;
	    }

	    this._startValue = _clone(this.get());
	    transition = _normalize(transition, this.options);
	    if (transition.speed) {
	        var startValue = this._startValue;
	        if (startValue instanceof Object) {
	            var variance = 0;
	            for (var i in startValue) variance += (endValue[i] - startValue[i]) * (endValue[i] - startValue[i]);
	            transition.duration = Math.sqrt(variance) / transition.speed;
	        }
	        else {
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

	/**
	 * Cancel all transitions and reset to a stable state
	 *
	 * @method reset
	 *
	 * @param {number|Array.Number|Object.<number, number>} startValue
	 *    starting state
	 * @param {number} startVelocity
	 *    starting velocity
	 */
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

	/**
	 * Get current velocity
	 *
	 * @method getVelocity
	 *
	 * @returns {Number} velocity
	 */
	TweenTransition.prototype.getVelocity = function getVelocity() {
	    return this.velocity;
	};

	/**
	 * Get interpolated state of current action at provided time. If the last
	 *    action has completed, invoke its callback.
	 *
	 * @method get
	 *
	 *
	 * @param {number=} timestamp Evaluate the curve at a normalized version of this
	 *    time. If omitted, use current time. (Unix epoch time)
	 * @return {number|Object.<number|string, number>} beginning state
	 *    _interpolated to this point in time.
	 */
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
	        for (var i = 0; i < current.length; i++){
	            if (typeof current[i] === 'number')
	                velocity[i] = speed * (current[i] - start[i]) / duration;
	            else
	                velocity[i] = 0;
	        }

	    }
	    else velocity = speed * (current - start) / duration;
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
	    }
	    else state = _interpolate(start, end, t);
	    return state;
	}

	/**
	 * Update internal state to the provided timestamp. This may invoke the last
	 *    callback and begin a new action.
	 *
	 * @method update
	 *
	 *
	 * @param {number=} timestamp Evaluate the curve at a normalized version of this
	 *    time. If omitted, use current time. (Unix epoch time)
	 */
	TweenTransition.prototype.update = function update(timestamp) {
	    if (!this._active) {
	        if (this._callback) {
	            var callback = this._callback;
	            this._callback = undefined;
	            callback();
	        }
	        return;
	    }

	    if (!timestamp) timestamp = Date.now();
	    if (this._updateTime >= timestamp) return;
	    this._updateTime = timestamp;

	    var timeSinceStart = timestamp - this._startTime;
	    if (timeSinceStart >= this._duration) {
	        this.state = this._endValue;
	        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, 1);
	        this._active = false;
	    }
	    else if (timeSinceStart < 0) {
	        this.state = this._startValue;
	        this.velocity = this._startVelocity;
	    }
	    else {
	        var t = timeSinceStart / this._duration;
	        this.state = _calculateState(this._startValue, this._endValue, this._curve(t));
	        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, t);
	    }
	};

	/**
	 * Is there at least one action pending completion?
	 *
	 * @method isActive
	 *
	 *
	 * @return {boolean}
	 */
	TweenTransition.prototype.isActive = function isActive() {
	    return this._active;
	};

	/**
	 * Halt transition at current state and erase all pending actions.
	 *
	 * @method halt
	 *
	 */
	TweenTransition.prototype.halt = function halt() {
	    this.reset(this.get());
	};

	// Register all the default curves
	TweenTransition.registerCurve('linear', TweenTransition.Curves.linear);
	TweenTransition.registerCurve('easeIn', TweenTransition.Curves.easeIn);
	TweenTransition.registerCurve('easeOut', TweenTransition.Curves.easeOut);
	TweenTransition.registerCurve('easeInOut', TweenTransition.Curves.easeInOut);
	TweenTransition.registerCurve('easeOutBounce', TweenTransition.Curves.easeOutBounce);
	TweenTransition.registerCurve('spring', TweenTransition.Curves.spring);

	TweenTransition.customCurve = function customCurve(v1, v2) {
	    v1 = v1 || 0; v2 = v2 || 0;
	    return function(t) {
	        return v1*t + (-2*v1 - v2 + 3)*t*t + (v1 + v2 - 2)*t*t*t;
	    };
	};

	module.exports = TweenTransition;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var OptionsManager = __webpack_require__(34);

	/**
	 * Ordinary Differential Equation (ODE) Integrator.
	 * Manages updating a physics body's state over time.
	 *
	 *  p = position, v = velocity, m = mass, f = force, dt = change in time
	 *
	 *      v <- v + dt * f / m
	 *      p <- p + dt * v
	 *
	 *  q = orientation, w = angular velocity, L = angular momentum
	 *
	 *      L <- L + dt * t
	 *      q <- q + dt/2 * q * w
	 *
	 * @class SymplecticEuler
	 * @constructor
	 * @param {Object} options Options to set
	 */
	function SymplecticEuler(options) {
	    this.options = Object.create(SymplecticEuler.DEFAULT_OPTIONS);
	    this._optionsManager = new OptionsManager(this.options);

	    if (options) this.setOptions(options);
	}

	/**
	 * @property SymplecticEuler.DEFAULT_OPTIONS
	 * @type Object
	 * @protected
	 * @static
	 */
	SymplecticEuler.DEFAULT_OPTIONS = {

	    /**
	     * The maximum velocity of a physics body
	     *      Range : [0, Infinity]
	     * @attribute velocityCap
	     * @type Number
	     */

	    velocityCap : undefined,

	    /**
	     * The maximum angular velocity of a physics body
	     *      Range : [0, Infinity]
	     * @attribute angularVelocityCap
	     * @type Number
	     */
	    angularVelocityCap : undefined
	};

	/*
	 * Setter for options
	 *
	 * @method setOptions
	 * @param {Object} options
	 */
	SymplecticEuler.prototype.setOptions = function setOptions(options) {
	    this._optionsManager.patch(options);
	};

	/*
	 * Getter for options
	 *
	 * @method getOptions
	 * @return {Object} options
	 */
	SymplecticEuler.prototype.getOptions = function getOptions() {
	    return this._optionsManager.value();
	};

	/*
	 * Updates the velocity of a physics body from its accumulated force.
	 *      v <- v + dt * f / m
	 *
	 * @method integrateVelocity
	 * @param {Body} physics body
	 * @param {Number} dt delta time
	 */
	SymplecticEuler.prototype.integrateVelocity = function integrateVelocity(body, dt) {
	    var v = body.velocity;
	    var w = body.inverseMass;
	    var f = body.force;

	    if (f.isZero()) return;

	    v.add(f.mult(dt * w)).put(v);
	    f.clear();
	};

	/*
	 * Updates the position of a physics body from its velocity.
	 *      p <- p + dt * v
	 *
	 * @method integratePosition
	 * @param {Body} physics body
	 * @param {Number} dt delta time
	 */
	SymplecticEuler.prototype.integratePosition = function integratePosition(body, dt) {
	    var p = body.position;
	    var v = body.velocity;

	    if (this.options.velocityCap) v.cap(this.options.velocityCap).put(v);
	    p.add(v.mult(dt)).put(p);
	};

	/*
	 * Updates the angular momentum of a physics body from its accumuled torque.
	 *      L <- L + dt * t
	 *
	 * @method integrateAngularMomentum
	 * @param {Body} physics body (except a particle)
	 * @param {Number} dt delta time
	 */
	SymplecticEuler.prototype.integrateAngularMomentum = function integrateAngularMomentum(body, dt) {
	    var L = body.angularMomentum;
	    var t = body.torque;

	    if (t.isZero()) return;

	    if (this.options.angularVelocityCap) t.cap(this.options.angularVelocityCap).put(t);
	    L.add(t.mult(dt)).put(L);
	    t.clear();
	};

	/*
	 * Updates the orientation of a physics body from its angular velocity.
	 *      q <- q + dt/2 * q * w
	 *
	 * @method integrateOrientation
	 * @param {Body} physics body (except a particle)
	 * @param {Number} dt delta time
	 */
	SymplecticEuler.prototype.integrateOrientation = function integrateOrientation(body, dt) {
	    var q = body.orientation;
	    var w = body.angularVelocity;

	    if (w.isZero()) return;
	    q.add(q.multiply(w).scalarMultiply(0.5 * dt)).put(q);
	//        q.normalize.put(q);
	};

	module.exports = SymplecticEuler;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */

	var Transform = __webpack_require__(25);

	/**
	 *
	 * This object translates the rendering instructions ("render specs")
	 *   that renderable components generate into document update
	 *   instructions ("update specs").  Private.
	 *
	 * @private
	 * @class SpecParser
	 * @constructor
	 */
	function SpecParser() {
	    this.result = {};
	}
	SpecParser._instance = new SpecParser();

	/**
	 * Convert a render spec coming from the context's render chain to an
	 *    update spec for the update chain. This is the only major entry point
	 *    for a consumer of this class.
	 *
	 * @method parse
	 * @static
	 * @private
	 *
	 * @param {renderSpec} spec input render spec
	 * @param {Object} context context to do the parse in
	 * @return {Object} the resulting update spec (if no callback
	 *   specified, else none)
	 */
	SpecParser.parse = function parse(spec, context) {
	    return SpecParser._instance.parse(spec, context);
	};

	/**
	 * Convert a renderSpec coming from the context's render chain to an update
	 *    spec for the update chain. This is the only major entrypoint for a
	 *    consumer of this class.
	 *
	 * @method parse
	 *
	 * @private
	 * @param {renderSpec} spec input render spec
	 * @param {Context} context
	 * @return {updateSpec} the resulting update spec
	 */
	SpecParser.prototype.parse = function parse(spec, context) {
	    this.reset();
	    this._parseSpec(spec, context, Transform.identity);
	    return this.result;
	};

	/**
	 * Prepare SpecParser for re-use (or first use) by setting internal state
	 *  to blank.
	 *
	 * @private
	 * @method reset
	 */
	SpecParser.prototype.reset = function reset() {
	    this.result = {};
	};

	// Multiply matrix M by vector v
	function _vecInContext(v, m) {
	    return [
	        v[0] * m[0] + v[1] * m[4] + v[2] * m[8],
	        v[0] * m[1] + v[1] * m[5] + v[2] * m[9],
	        v[0] * m[2] + v[1] * m[6] + v[2] * m[10]
	    ];
	}

	var _originZeroZero = [0, 0];

	// From the provided renderSpec tree, recursively compose opacities,
	//    origins, transforms, and sizes corresponding to each surface id from
	//    the provided renderSpec tree structure. On completion, those
	//    properties of 'this' object should be ready to use to build an
	//    updateSpec.
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
	        align = parentContext.align || parentContext.origin;
	        if (parentContext.size && align && (align[0] || align[1])) {
	            var alignAdjust = [align[0] * parentContext.size[0], align[1] * parentContext.size[1], 0];
	            transform = Transform.thenMove(transform, _vecInContext(alignAdjust, sizeContext));
	        }
	        this.result[id] = {
	            transform: transform,
	            opacity: parentContext.opacity,
	            origin: parentContext.origin || _originZeroZero,
	            align: parentContext.align || parentContext.origin || _originZeroZero,
	            size: parentContext.size
	        };
	    }
	    else if (!spec) { // placed here so 0 will be cached earlier
	        return;
	    }
	    else if (spec instanceof Array) {
	        for (var i = 0; i < spec.length; i++) {
	            this._parseSpec(spec[i], parentContext, sizeContext);
	        }
	    }
	    else {
	        target = spec.target;
	        transform = parentContext.transform;
	        opacity = parentContext.opacity;
	        origin = parentContext.origin;
	        align = parentContext.align;
	        size = parentContext.size;
	        var nextSizeContext = sizeContext;

	        if (spec.opacity !== undefined) opacity = parentContext.opacity * spec.opacity;
	        if (spec.transform) transform = Transform.multiply(parentContext.transform, spec.transform);
	        if (spec.origin) {
	            origin = spec.origin;
	            nextSizeContext = parentContext.transform;
	        }
	        if (spec.align) align = spec.align;
	        if (spec.size) {
	            var parentSize = parentContext.size;
	            size = [
	                spec.size[0] !== undefined ? spec.size[0] : parentSize[0],
	                spec.size[1] !== undefined ? spec.size[1] : parentSize[1]
	            ];
	            if (parentSize) {
	                if (!align) align = origin;
	                if (align && (align[0] || align[1])) transform = Transform.thenMove(transform, _vecInContext([align[0] * parentSize[0], align[1] * parentSize[1], 0], sizeContext));
	                if (origin && (origin[0] || origin[1])) transform = Transform.moveThen([-origin[0] * size[0], -origin[1] * size[1], 0], transform);
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

/***/ }
/******/ ])