/*
 * Copyright (c) 2014 Gloey Apps
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
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
    var FastClick = require('famous/inputs/FastClick');
    var LayoutController = require('famous-flex/LayoutController');
    var LayoutUtility = require('famous-flex/LayoutUtility');
    var GridLayout = require('famous-flex-layouts/GridLayout');
    var NavBarLayout = require('famous-flex-layouts/NavBarLayout');
    var HeaderFooterLayout = require('famous-flex-layouts/HeaderFooterLayout');
    var Easing = require('famous/transitions/Easing');
    var Dogs = require('./data/dogs/collection');

    // create the main context
    var mainContext = Engine.createContext();

    // Create the shell
    var collection = [];
    var navbar = _createNavbar();
    var collectionView = _createCollectionView(collection);
    var shell = _createShell({
        header: navbar,
        content: collectionView
    });
    mainContext.add(shell);

    // Add layout types
    _addCollectionLayouts();

    function _createShell(renderables) {
        return new LayoutController({
            layout: HeaderFooterLayout,
            layoutOptions: {
                headerHeight: 50
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
