import FastClick from 'fastclick/lib/fastclick';
import {FamousEngine} from 'famous/core';
import AppView from './AppView';
import MainView from './MainView';
import {Animation} from 'famous-flex/core';
import autoSelectTheme from 'famous-flex/theme/autoSelect';
import Theme from 'famous-flex/theme';

require('./index.html');
require('famous-flex/controls/styles.less');

FastClick.attach(document.body);

Theme.init(autoSelectTheme());
//theme.color = '#0000FF';

FamousEngine.init();
const scene = FamousEngine.createScene();
//const appView = new AppView();
const appView = new MainView();
scene.addChild(appView);
