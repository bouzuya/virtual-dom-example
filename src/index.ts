import * as VirtualDOM from 'virtual-dom';
import parse from 'vdom-parser';

const createElement = VirtualDOM.create;
const diff = VirtualDOM.diff;
const h = VirtualDOM.h;
const patch = VirtualDOM.patch;

type State = {
  count: number;
  tree: VirtualDOM.VNode;
  rootNode: Element;
};

const init = (): State => {
  const count = 15;
  const el = document.querySelector('#app');
  const tree = (el ? parse(el) : render(count));
  const rootNode = (el ? el : createElement(tree));
  if (!el) document.body.appendChild(rootNode);
  const state = { count, tree, rootNode };
  return state;
};

const render = (count: number): VirtualDOM.VNode => {
  return h('div', { id: 'app' }, [
    h('div', { class: 'count' }, [String(count)])
  ]);
};

const update = ({ count, tree, rootNode }: State): State => {
  const newCount = count + 1;
  const newTree = render(newCount);
  const patches = diff(tree, newTree);
  const newRootNode = patch(rootNode, patches);
  return { count: newCount, tree: newTree, rootNode: newRootNode };
};

const loop = (state: State): void => {
  setTimeout(() => loop(update(state)), 1000);
};

export default function main() {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => loop(init()), 3000);
  });
}