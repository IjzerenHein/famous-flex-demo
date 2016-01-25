import {DOMNode, LayoutNode, Color} from 'famous-flex/core';

function lineLayoutLogo({nodes, rect}) {
  let idx = 0;
  rect.width = Math.round(rect.width / 2);
  rect.height = Math.round(rect.height / 2);
  rect.aspectRatio(1 / 2);
  rect.alignY(1);
  const visibleWidth = rect.width * 0.74;
  nodes.forEach((node) => {
    rect.x = (idx * visibleWidth);
    node.origin.y = 1;
    node.rotation.z = (36.2 / 180) * -Math.PI;
    node.rect = rect;
    idx++;
  });
}

/*function lineLayoutHamburger({nodes, rect}) {
  rect.width = rect.width / 1.2;
  rect.height = rect.height / 3;
  rect.center();
  nodes.forEach((node) => {
    node.origin.y = 1;
    node.rotation.z = 0;
    node.rect = rect;
  });
}*/

function lineLayoutFilled({nodes, rect}) {
  nodes.forEach((node) => {
    node.origin.y = 1;
    node.rotation.z = 0;
    node.rect = rect;
  });
}

class Line extends LayoutNode {
  constructor(options) {
    super();
    this.layout = lineLayoutLogo;
    this._color = new Color(this);
    this._color.set('#d62c1f');
    for (let i = 0; i < 3; i++) {
      this.nodes.push(new DOMNode({
        style: {
          backgroundColor: this._color,
          pointerEvents: 'none'
        }
      }));
    }
    this.setOptions(options);
  }

  get color() {
    return this._color;
  }

  set color(value) {
    this._color.set(value);
  }

  get opacity() {
    return this.nodes.get(0).opacity;
  }

  set opacity(value) {
    this.nodes.forEach((node) => node.opacity = value);
  }
}


function logoLayout({nodes, rect}) {
  nodes.get('background').rect = rect;

  rect.height = Math.round(rect.height / 3);
  rect.aspectRatio(1 / 2);
  rect.centerX();
  rect.z += 5;
  rect.y = (rect.parent.height - (rect.height * 3)) / 2;
  nodes.get(0).rect = rect;
  rect.y += rect.height;
  nodes.get(1).rect = rect;
  rect.y += rect.height;
  nodes.get(2).rect = rect;
}

export default class LogoView extends LayoutNode {
  constructor(options) {
    super();
    this._lineLayout = lineLayoutFilled;
    this._lineColor = '#d62c1f';
    this.nodes.set('background', new DOMNode({
      style: {
        backgroundColor: this._lineColor
      }
    }));
    this.nodes.get('background').on('tap', () => this.toggleLayout());
    for (let i = 0; i < 3; i++) {
      this.nodes.push(new Line({
        layout: this._lineLayout,
        color: this._lineColor
      }));
    }
    this.layout = logoLayout;
    this.setOptions(options);
  }

  toggleLayout() {
    if (this._lineLayout === lineLayoutFilled) {
      this._lineLayout = lineLayoutLogo;
      this._lineColor = '#FFFFFF';
      this._lineOpacity = 1;
    } else {
      this._lineLayout = lineLayoutFilled;
      this._lineColor = '#d62c1f';
      this._lineOpacity = 0;
    }
    this.animate('easeInOut', 700, () => this.nodes.forEach((line) => {
      line.layout = this._lineLayout;
      //line.color = this._lineColor;
      //line.opacity = this._lineOpacity;
    }));
    this.animate('easeOut', 300, () => this.nodes.forEach((line) => {
      //line.opacity = this._lineOpacity;
      line.color = this._lineColor;
    }));
  }
}
