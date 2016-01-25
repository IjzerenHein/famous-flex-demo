require('./index.html');
require('famous-flex/controls/styles.less');

//v3 test
/*require('famous/core/famous.css');

import {LayoutNode, DOMNode} from 'famous-flex/core'

const layoutNode = new LayoutNode();
layoutNode.mountToDOMElement();

const domNode = new DOMNode({
  style: {
    backgroundColor: '#FF0000'
  }
});
layoutNode.nodes.push(domNode);
layoutNode.layout = ({nodes, rect}) => {
  nodes.get(0).rect = rect;
};*/


import {FamousEngine} from 'famous/core';
//import AppView from './AppView';
//import MainView from './MainView';
import LogoView from './LogoView';
import {Animation} from 'famous-flex/core';
import autoSelectTheme from 'famous-flex/theme/autoSelect';
import Theme from 'famous-flex/theme';

Theme.init(autoSelectTheme());
//theme.color = '#0000FF';*/


//const appView = new AppView();
//const appView = new MainView();
//const appView = new LogoView();
//appView.mountToDOMElement();

FamousEngine.init();
const scene = FamousEngine.createScene();
const appView = new LogoView();
scene.addChild(appView);


