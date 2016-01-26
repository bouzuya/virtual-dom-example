import * as VirtualDOM from 'virtual-dom';
import parse from 'vdom-parser';

const createElement = VirtualDOM.create;
const diff = VirtualDOM.diff;
const h = VirtualDOM.h;
const patch = VirtualDOM.patch;

type State = {
  count: number;
};

type App = {
  state: State;
  tree: VirtualDOM.VNode;
  rootNode: Element;
};

const init = (state: State): App => {
  const el = document.querySelector('#app');
  const tree = (el ? parse(el) : render(state));
  const rootNode = (el ? el : createElement(tree));
  if (!el) document.body.appendChild(rootNode);
  return { state, tree, rootNode };
};

const render = (state: State): VirtualDOM.VNode => {
  return h('div', { id: 'app' }, [
    h('div', { class: 'count' }, [
      String(state.count)
    ])
  ]);
};

const update = ({ state, tree, rootNode }: App): App => {
  const newState = { count: state.count + 1 };
  const newTree = render(newState);
  const patches = diff(tree, newTree);
  const newRootNode = patch(rootNode, patches);
  return { state: newState, tree: newTree, rootNode: newRootNode };
};

const loop = (app: App): void => {
  setTimeout(() => loop(update(app)), 1000);
};

export default function main() {
  const state = { count: 15 };
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => loop(init(state)), 3000);
  });
}