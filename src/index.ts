import * as VirtualDOM from 'virtual-dom';

const createElement = VirtualDOM.create;
const diff = VirtualDOM.diff;
const h = VirtualDOM.h;
const patch = VirtualDOM.patch;

type State = {
  count: number;
  tree: VirtualDOM.VNode;
  rootNode: Element;
};

const render = (count: number) => {
  return h('div', {
    style: {
      textAlign: 'center',
      lineHeight: (100 + count) + 'px', 
      border: '1px solid red',
      width: (100 + count) + 'px',
      height: (100 + count) + 'px'
    }
  }, [String(count)]);
};

const update = ({ count, tree, rootNode }: State): State => {
  const newCount = count + 1;
  const newTree = render(newCount);
  const patches = diff(tree, newTree);
  const newRootNode = patch(rootNode, patches);
  return { count: newCount, tree: newTree, rootNode: newRootNode };
};

export default function main() {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('load');
    const count = 0;
    const tree = render(count);
    const rootNode = createElement(tree);
    document.body.appendChild(rootNode);
    let state = { count, tree, rootNode };
    setInterval(() => { state = update(state); }, 1000);
  });
}