import {DOMNode, LayoutNode, ShowNode, ScrollNode} from 'famous-flex/core';
import {headerFooterLayout} from 'famous-flex/layouts';
import {Label, Button, Switch, ProgressBar, Slider} from 'famous-flex/controls';
import Theme from 'famous-flex/theme';

export default class AppView extends LayoutNode {
  constructor() {
    super({
      layout: headerFooterLayout,
      layoutOptions: {
        headerSize: 70,
        footerSize: 70
      }
    });
    this.header = this.addChild(new DOMNode({
      style: {backgroundColor: Theme.color}
    }));
    this.footer = this.addChild(new DOMNode({
      style: {backgroundColor: Theme.color}
    }));
    /*this.content = this.addChild(new ShowNode({
      animation: {
        effect: 'flipUp',
        duration: 3000
      }
    }));*/

    const redNode = new DOMNode({style: {backgroundColor: '#FF0000', backfaceVisibility: 'hidden'}, innerHTML: 'red'});
    const blueNode = new DOMNode({style: {backgroundColor: '#0000FF', backfaceVisibility: 'hidden'}, innerHTML: 'blue'});
    const scrollNode = new ScrollNode({
      layoutOptions: {
        itemSize: 100,
        isSectionCallback: (node) => node === redNode
      }
    });
    this.content = this.addChild(scrollNode);

    const button = new Button({
      text: 'my button',
      label: {
        animation: {
          effect: 'coverSlideLeft',
          duration: 20000,
          curve: 'inOutQuad'
        },
        styles: {
          backgroundColor: '#FF0000'
        }
      }
    });
    button.on('click', () => button.text = (button.text === 'woohooo') ? 'ja hoor' : 'woohooo');
    const progressBar = new ProgressBar();
    const slider = new Slider({
      value: 0.8,
      direction: 0
    });
    const switch1 = new Switch();
    const label = new Label({
      text: 'wooohoooo',
      backgroundColor: '#00FF00',
      animated: true,
    });

    //scrollNode.nodes.push(redNode);
    //scrollNode.nodes.push(blueNode);

    let whoop = true;
    this.header.on('tap', () => {
      this.animate('inOutElastic', 500, () => {
        //this.content = this.addChild(redNode);
      });
      //this.content.show((this.content.visibleNode === redNode) ? blueNode : redNode);
    });
    this.footer.on('tap', () => {
      /*this.animate('outBack', 500, () => {
        // add node
        redNode.scale.x = 0.5;
        redNode.scale.y = 0.5;
        redNode.origin.x = 0.5;
        redNode.origin.y = 0.5;
        redNode.rotation.z = Math.PI;
        redNode.rect.y = 1000;
        this.content = this.addChild(redNode);
      });*/
    });

    /*this.header.on('tap', (event) => {
      this.animate('easeIn', 2000, () => this.content.progress = 0.1)
      .then(() => this.animate('easeIn', 2000, () => this.content.progress = 0.8))
      .then(() => this.animate('easeIn', 2000, () => this.content.progress = 0.5));
    });*/

    /*this.footer.on('tap', (event) => {
      console.log('animating...');
      animate('easeIn', 500, () => this.nodes.content.backgroundColor = '#FF0000')
      .then(() => animate('easeIn', 500, () => this.nodes.content.backgroundColor = '#00FF00'))
      .then(() => animate('easeIn', 500, () => this.nodes.content.backgroundColor = '#0000FF'))
      .then(() => console.log('done'));
    });*/

    /*this.footer.on('tap', (event) => {
      this.animate('easeIn', 500, () => {
        this.content.intrinsicSize.width = undefined;
        this.content.intrinsicSize.height = undefined;
        this.content.intrinsicSize.aspectRatio = [10, 1];
      }).then(() => this.animate('easeIn', 500, () => this.content.intrinsicSize.aspectRatio = undefined));
    })*/

    /*this.footer.on('tap', (event) => {
      //const node = (this.content.visibleNode === switch1) ? progressBar : switch1;
      //this.content.show(node, 'slideLeft', 'easeInOut', 1000);
      this.animate('easeIn', 1000, () => Theme.color = '#FF0000')
      .then(() => this.animate('easeIn', 1000, () => Theme.color = '#00FF00'))
      .then(() => this.animate('easeIn', 1000, () => Theme.color = '#0000FF'));
    });*/

    /*this.header.el.on('click', () => {
      alert('click');
    });*/
  }
}
