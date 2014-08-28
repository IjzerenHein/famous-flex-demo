/**
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

define(function(require) {

    //<webpack>
    require('famous-polyfills');
    require('bootstrap/dist/css/bootstrap.min.css');
    require('famous/core/famous.css');
    require('./styles.css');
    require('./index.html');
    //</webpack>

    // Fast-click
    require('famous/inputs/FastClick');

    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var LayoutController = require('famous-flex/LayoutController');
    var FlowLayoutController = require('famous-flex/FlowLayoutController');
    var LayoutUtility = require('famous-flex/LayoutUtility');
    var GridLayout = require('famous-flex-layouts/GridLayout');
    var NavBarLayout = require('famous-flex-layouts/NavBarLayout');
    var ListLayout = require('famous-flex-layouts/ListLayout');
    var CollectionLayout = require('famous-flex-layouts/CollectionLayout');
    var Dogs = require('./data/dogs/collection');
    var LayoutDockHelper = require('famous-flex/helpers/LayoutDockHelper');
    var BkImageSurface = require('famous-bkimagesurface/BkImageSurface');

    // create the main context
    var mainContext = Engine.createContext();

    // Create the shell
    var layoutListRenderables = [];
    var collection = [];
    var layouts = [];
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
    function _createShell(renderables) {
        return new LayoutController({
            layout: function(size, nodes, options) {
                var dock = new LayoutDockHelper(size, nodes);
                dock.top('navbar', 50);
                if (options.showSidebar) {
                    if (size[0] >= size[1]) {
                        dock.left('sidebar', 200);
                    }
                    else {
                        dock.bottom('sidebar', 200);
                    }
                }
                dock.fill('content');
            },
            dataSource: renderables
        });
    }
    function _createSidebar() {
        return new LayoutController({
            layout: function(size, nodes) {
                var dock = new LayoutDockHelper(size, nodes);
                if (size[0] < 300) {
                    dock.bottom('details', 200);
                }
                else {
                    dock.right('details', 200);
                }
                dock.fill('list');
            },
            dataSource: {
                'list': _createLayoutListView(),
                'details': _createLayoutDetailsView()
            }
        });
    }
    function _toggleSidebar() {
        shell.patchLayoutOptions({
            showSidebar: !shell.getLayoutOptions().showSidebar
        });
    }

    /**
     * Navbar
     */
    function _createButton(content) {
        return new Surface({
            size: [38, undefined],
            content: '<button type="button" class="btn btn-default">' + content + '</button>'
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
        addButton.on('click', _addCollectionItem);
        var removeButton = _createButton('<i class="glyphicon glyphicon-minus"></i>');
        removeButton.on('click', _removeCollectionItem);
        var menuButton = _createButton('<i class="glyphicon glyphicon-tasks"></i>');
        menuButton.on('click', _toggleSidebar);
        layoutController.setDataSource({
            background: background,
            title: title,
            rightItems: [
                removeButton,
                addButton
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
        var imageUrl = Dogs[collection.length % Dogs.length];
        /*return new Surface({
            classes: ['image-frame'],
            content: '<span class="image-helper"></span><img src="' + imageUrl + '" class="image-content">'
        });*/
        return new BkImageSurface({
            classes: ['image-frame'],
            content: imageUrl,
            sizeMode: 'cover'
        });

    }
    function _addCollectionItem() {
        if (collectionView) {
            var rightItems = navbar.getSpecByNodeId('rightItems');
            var insertSpec = LayoutUtility.cloneSpec(navbar.getSpecByNode(rightItems[1]));
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
        var rightItems = navbar.getSpecByNodeId('rightItems');
        var removeSpec = LayoutUtility.cloneSpec(navbar.getSpecByNode(rightItems[0]));
        removeSpec.opacity = 0;
        removeSpec.origin = [1, 0];
        removeSpec.align = [1, 0];
        var pos = Math.floor(Math.random() * Math.min(collection.length, 5));
        collectionView.remove(pos, removeSpec);
    }
    function _createCollectionView() {
        for (var i = 0; i < 3; i++) {
            _addCollectionItem();
        }
        return new FlowLayoutController({
            layout: GridLayout,
            layoutOptions: {
                columns: 3,
                rows: 3,
                gutter: [20, 20]
            },
            dataSource: collection
        });
    }

    /**
     * Layouts
     */
    function _createLayoutListView() {
        return new LayoutController({
            layout: ListLayout,
            layoutOptions: { itemHeight: 50 },
            dataSource: layoutListRenderables
        });
    }
    function _createLayoutDetailsView() {
        return new Surface({
            classes: ['navbar', 'navbar-default']
        });
    }

    function _addLayout(name, layoutFn, options) {
        var layout = {
            name: name,
            layout: layoutFn,
            options: options
        };
        layouts.push(layout);
        var listRenderable = new Surface({
            classes: ['navbar', 'navbar-default', 'layout-list-item'],
            content: name
        });
        listRenderable.on('click', function() {
            var layoutOptions = {};
            for (var i = 0; i < options.length; i++) {
                layoutOptions[options[i].name] = options[i].value;
            }
            collectionView.setLayout(layoutFn, layoutOptions);
        });
        layoutListRenderables.push(listRenderable);
    }
    function _addLayouts() {
        _addLayout('GridLayout', GridLayout, [
            {name: 'columns',   value: 3, min: 1, max: 50},
            {name: 'rows',      value: 3, min: 1, max: 50},
            {name: 'gutter',    value: [20, 20], min: [0, 0], max: [100, 100]},
            {name: 'direction', value: 0, min: 0, max: 1}
        ]);
        _addLayout('ListLayout', ListLayout, [
            {name: 'itemWidth',  value: 50, min: 0, max: 1000},
            {name: 'itemHeight', value: 50, min: 0, max: 1000},
            {name: 'direction',  value: 1, min: 0, max: 1}
        ]);
        _addLayout('CollectionLayout', CollectionLayout, [
            {name: 'itemWidth',  value: 100, min: 0, max: 1000},
            {name: 'itemHeight', value: 100, min: 0, max: 1000},
            {name: 'direction',  value: 1, min: 0, max: 1},
            {name: 'justify',    value: 1, min: 0, max: 1},
            {name: 'gutter',     value: [10, 10], min: [0, 0], max: [100, 100]}
        ]);
    }
    _addLayouts();
});
