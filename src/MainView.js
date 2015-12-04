import {DOMNode, ScrollNode} from 'famous-flex/core';
import {ImageNode, Slider, ProgressBar, Button} from 'famous-flex/controls';
import Theme from 'famous-flex/theme';
import ListView from 'famous-flex/views/ListView';
import ImageTileView from 'famous-flex/views/ImageTileView';
import HeaderFooterView from 'famous-flex/views/HeaderFooterView';
import DrawerView from 'famous-flex/views/DrawerView';

export default class MainView extends DrawerView {
  constructor() {
    super({
      drawerSize: 100,
      drawerMode: 'move',
      drawer: new DOMNode({styles: {backgroundColor: Theme.secondaryColor}, innerHTML: 'header'}),
      //content: new DOMNode({styles: {backgroundColor: Theme.color}, innerHTML: 'content'}),
      /*content: new ImageNode({
        src: 'http://vignette1.wikia.nocookie.net/memoryalpha/images/f/fe/Klingons2285.jpg/revision/latest?cb=20040915215955&path-prefix=en',
        size: 'cover'
      })*/
      content: new Button(),
      contentMode: 'move'
    });
    this.content.on('tap', () => {
      this.animate('outBack', 300, () => {
        this.open = !this.open;
      });
    });
  }
}

/*export default class MainView extends HeaderFooterView {
  constructor() {
    super({
      headerSize: 50,
      header: new DOMNode({styles: {backgroundColor: Theme.color2}, innerHTML: 'header'}),
      content: new DOMNode({styles: {backgroundColor: Theme.color}, innerHTML: 'content'}),
      footerSize: 50,
      footer: new DOMNode({styles: {backgroundColor: Theme.color2}, innerHTML: 'footer'})
    });
    this.header.on('tap', () => {
      this.animate('easeIn', 500, () => {
        console.log('anim');
        this.headerSize = '50%';
      });
    });
  }
}*/



/*
export default class MainView extends ImageTileView {
  constructor() {
    super({
      src: 'http://backintimefilm.com/wp-content/uploads/2014/11/bg2.jpg',
      size: 'cover'
    });
    this.on('tap', () => {
      console.log('whoop');
      this.src = 'http://vignette1.wikia.nocookie.net/memoryalpha/images/f/fe/Klingons2285.jpg/revision/latest?cb=20040915215955&path-prefix=en';
    });
  }
}*/

/*
export default class MainView extends ListView {
  constructor() {
    super({
      layoutOptions: {
        itemSize: 50,
        isSectionCallback: (node) => node.isSection
      }
    });

    const section2 = new DOMNode({styles: {backgroundColor: Theme.color2}, innerHTML: 'top'});
    section2.isSection = true;
    this.nodes.push(section2);
    for (var i = 0; i < 10; i++) {
      const section = new DOMNode({styles: {backgroundColor: Theme.color}, innerHTML: 'red'});
      section.isSection = true;
      this.nodes.push(section);
      for (var j = 0; j < 10; j++) {
        const item = new DOMNode({styles: {backgroundColor: '#DDDDDD'}, innerHTML: '#DDDDDD'});
        this.nodes.push(item);
      }
    }
  }
}*/

/*export default class MainView extends ListView {
  constructor() {
    super();
    this.content = new ImageNode({
      src: 'http://backintimefilm.com/wp-content/uploads/2014/11/bg2.jpg',
      size: 'cover'
      //size: 'cover'
      //size: [true, true, 'cover']
    });
    this.overscroll = [0, 0];
    this.direction = undefined;
  }
}*/


/*export default class MainView extends ScrollNode {
  constructor() {
    super({
      layoutOptions: {
        itemSize: 40,
        isSectionCallback: (node) => node.isSection
      }
    });

    const section2 = new DOMNode({styles: {backgroundColor: Theme.color2}, innerHTML: 'top'});
    section2.isSection = true;
    this.nodes.push(section2);
    for (var i = 0; i < 10; i++) {
      const section = new DOMNode({styles: {backgroundColor: Theme.color}, innerHTML: 'red'});
      section.isSection = true;
      this.nodes.push(section);
      for (var j = 0; j < 10; j++) {
        const item = new DOMNode({styles: {backgroundColor: '#DDDDDD'}, innerHTML: '#DDDDDD'});
        this.nodes.push(item);
      }
    }
  }
}*/
