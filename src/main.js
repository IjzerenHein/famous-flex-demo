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

    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var FastClick = require('famous/inputs/FastClick');
    var LayoutController = require('famous-flex/LayoutController');
    var LayoutUtility = require('famous-flex/LayoutUtility');
    var GridLayout = require('famous-flex-layouts/GridLayout');
    var NavBarLayout = require('famous-flex-layouts/NavBarLayout');
    var Easing = require('famous/transitions/Easing');
    var Dogs = require('./data/dogs/collection');

    // create the main context
    var mainContext = Engine.createContext();

    // Create the shell
    var collection = [];
    var navbar = _createNavbar();
    var sidebar = _createSidebar();
    var collectionView = _createCollectionView(collection);
    var shell = _createShell({
        navbar: navbar,
        sidebar: sidebar,
        content: collectionView
    });
    mainContext.add(shell);

    // Add layout types
    _addCollectionLayouts();

    function ShellLayout(context, options) {

        // Create a rect from the size
        var r = {left: 0, top: 0, right: context.size[0], bottom: context.size[1]};

        // Layout the sidebar (when width < height it is positioned on the bottom)
        var sidebar = context.nodeById('sidebar');
        sidebar.setOrigin([0, 1]);
        sidebar.setAlign([0, 1]);
        if (context.size[0] >= context.size[1]) {
            sidebar.setSize([options.sidebarWidth, context.size[1]]);
            r.left += options.sidebarWidth;
        }
        else {
            sidebar.setSize([r.right - r.left, options.sidebarHeight]);
            r.bottom -= options.sidebarHeight;
        }

        // Layout the navbar
        var navbar = context.nodeById('navbar');
        navbar.setSize([r.right - r.left, options.navbarHeight]);
        navbar.setTransform(Transform.translate(r.left, r.top, 0));
        r.top += options.navbarHeight;

        // Use what's left to the content
        var content = context.nodeById('content');
        content.setSize([r.right - r.left, r.bottom - r.top]);
        content.setTransform(Transform.translate(r.left, r.top, 0));
    }

    function _createShell(renderables) {
        return new LayoutController({
            reflowTransition: {duration: 500, curve: Easing.outBack},
            layout: ShellLayout,
            layoutOptions: {
                navbarHeight: 50,
                sidebarWidth: 100,
                sidebarHeight: 200
            },
            dataSource: renderables
        });
    }

    function _createCollectionItem() {
        var imageUrl = Dogs[collection.length % Dogs.length];
        return new Surface({
            classes: ['image-frame'],
            content: '<span class="image-helper"></span><img src="' + imageUrl + '" class="image-content">'
        });
    }
    function _addCollectionItem() {
        if (collectionView) {
            var rightItems = navbar.getLayoutNodeById('rightItems');
            var insertSpec = LayoutUtility.cloneSpec(navbar.getLayoutNode(rightItems[1])._current);
            insertSpec.opacity = 0;
            collectionView.insert(-1, _createCollectionItem(), insertSpec);
        }
        else {
            collection.unshift(_createCollectionItem());
        }
    }

    function _removeCollectionItem() {
        var rightItems = navbar.getLayoutNodeById('rightItems');
        var removeSpec = LayoutUtility.cloneSpec(navbar.getLayoutNode(rightItems[0])._current);
        removeSpec.opacity = 0;
        collectionView.remove(0, removeSpec);
    }

    function _createButton(content) {
        return new Surface({
            size: [38, undefined],
            content: '<button type="button" class="btn btn-default">' + content + '</button>'
        });
    }

    function _createSidebar() {
        return new Surface({
            classes: ['sidebar']
        });
    }

    function _createNavbar() {
        var layoutController = new LayoutController({
            layout: NavBarLayout,
            layoutOptions: {
                margins: [8],
                rightItemSpacer: 5
            }
        });
        var background = new Surface({classes: ['navbar', 'navbar-default']});
        var title = new Surface({content: 'famous-flex', classes: ['title']});
        var addButton = _createButton('<i class="glyphicon glyphicon-plus"></i>');
        addButton.on('click', _addCollectionItem);
        var removeButton = _createButton('<i class="glyphicon glyphicon-minus"></i>');
        removeButton.on('click', _removeCollectionItem);
        layoutController.setDataSource({
            background: background,
            title: title,
            rightItems: [
                removeButton,
                addButton
            ]
        });
        return layoutController;
    }

    function _createCollectionView(collection) {
        for (var i = 0; i < 3; i++) {
            _addCollectionItem();
        }
        return new LayoutController({
            layout: GridLayout,
            layoutOptions: {
                columns: 3,
                rows: 3,
                gutter: [20, 20]
            },
            dataSource: collection,
            reflowTransition: {duration: 500, curve: Easing.outBack}
        });
    }

    function _addCollectionLayouts() {
        _addCollectionLayout('GridLayout', GridLayout, [
            {name: 'columns',   value: 3, min: 1, max: 50},
            {name: 'rows',      value: 3, min: 1, max: 50},
            {name: 'gutter',    value: [20, 20], min: [0, 0], max: [100, 100]},
            {name: 'direction', value: 0, min: 0, max: 1}
        ]);
    }

    function _addCollectionLayout(text, layout, options) {
        // TODO
    }

});
