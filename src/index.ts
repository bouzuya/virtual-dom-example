import * as VirtualDOM from 'virtual-dom';
import parse from 'vdom-parser';

const createElement = VirtualDOM.create;
const diff = VirtualDOM.diff;
const h = VirtualDOM.h;
const patch = VirtualDOM.patch;

type State = {
  count: number;
  items: string[];
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
    h('div', { className: 'count' }, [
      String(state.count)
    ]),
    h('ul', state.items.map(item => h('li', [item])))
  ]);
};

const updateState = (state: State): State => {
  return {
    count: state.count + 1,
    items: state.items.concat(['item ' + state.count])
  };
};

const updateDOM = (state: State, { tree, rootNode }: App): App => {
  const newTree = render(state);
  const patches = diff(tree, newTree);
  const newRootNode = patch(rootNode, patches);
  return { state, tree: newTree, rootNode: newRootNode };
};

const loop = (app: App): void => {
  setTimeout(() => loop(updateDOM(updateState(app.state), app)), 1000);
};

export default function main() {
  const state: State = { count: 15, items: [] };
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => loop(init(state)), 3000);
  });
}