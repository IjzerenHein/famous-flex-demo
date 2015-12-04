import {FamousEngine} from 'famous/core';
import {DOMNode, LayoutNode} from 'famous-flex/core';
import {Label} from 'famous-flex/controls';
import {ListView} from 'famous-flex/views';
import Theme from 'famous-flex/theme';
import autoSelectTheme from 'famous-flex/theme/autoSelect';

class CodeFragment {
  constructor(element) {
    this.code = element ? element.innerHTML.trim() : '';
  }

  toString() {
    return this.code;
  }
}

class Example {
  constructor(element) {
    this.name = element.getElementsByTagName('h3')[0].innerHTML;
    this.code = new CodeFragment(element.getElementsByTagName('code')[0]);
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code.toString()
    };
  }

  toString() {
    return JSON.stringify(this.toJSON(), undefined, 2);
  }
}

class Item {
  constructor(element) {
    this.name = element.getElementsByTagName('h2')[0].innerHTML;
    const preSetup = element.getElementsByClassName('pre-setup');
    this.preSetup = new CodeFragment(preSetup ? preSetup[0] : undefined);
    const postSetup = element.getElementsByClassName('post-setup');
    this.postSetup = new CodeFragment(postSetup ? postSetup[0] : undefined);
    this.examples = [];
    const examples = element.getElementsByClassName('example');
    for (let i = 0; i < examples.length; i++) {
      this.examples.push(new Example(examples[i]));
    }
  }

  toJSON() {
    return {
      name: this.name,
      preSetup: this.preSetup.toString(),
      postSetup: this.postSetup.toString(),
      examples: this.examples.map((example) => example.toJSON())
    };
  }

  toString() {
    return JSON.stringify(this.toJSON(), undefined, 2);
  }
}

function itemViewLayout(context) {
  const titleHeight = 30;
  const exampleWidth = Math.min(200, Math.round(context.rect.width / 2));
  const rect = context.rect;
  rect.height = titleHeight;
  context.nodes.get('title').rect = rect;
  rect.y = titleHeight;
  rect.width = rect.parent.width - exampleWidth;
  rect.height = Math.round((rect.parent.height - titleHeight) / 2);
  context.nodes.get('preview').rect = rect;
  rect.height = rect.parent.height - rect.height - titleHeight;
  rect.alignY(1);
  context.nodes.get('code').rect = rect;
  rect.y = titleHeight;
  rect.width = exampleWidth;
  rect.height = rect.parent.height - titleHeight;
  rect.alignX(1);
  context.nodes.get('examples').rect = rect;
}

class ItemView extends LayoutNode {
  constructor(item) {
    super({
      layout: itemViewLayout
    });
    this.item = item;
    const title = new Label({
      text: item.name
    });
    const previewView = new DOMNode({styles: {backgroundColor: Theme.color}, innerHTML: 'preview'});
    const codeView = new DOMNode({styles: {backgroundColor: Theme.secondaryColor}, innerHTML: 'code'});
    const examplesView = new DOMNode({styles: {backgroundColor: Theme.color}, innerHTML: 'examples'});
    this.nodes.set('title', title);
    this.nodes.set('preview', previewView);
    this.nodes.set('code', codeView);
    this.nodes.set('examples', examplesView);
  }
}

/**
 * Parse page content
 */
const items = [];
const elms = document.getElementsByClassName('item');
for (let i = 0; i < elms.length; i++) {
  items.push(new Item(elms[i]));
}
items.forEach((item) => console.log(item.toString()));


/**
 * Initialize engine on the document
 */
document.body.innerHTML = '';
FamousEngine.init();
Theme.init(autoSelectTheme());
const scene = FamousEngine.createScene();
const listView = new ListView({
  size: {
    maxWidth: 1000
  },
  layoutOptions: {
    itemSize: 300
  }
});
scene.addChild(listView);

/**
 * Add examples
 */
for (let i = 0; i < items.length; i++) {
  listView.nodes.push(new ItemView(items[i]));
}
