/// <reference path="empower/empower.d.ts" />
/// <reference path="mocha/mocha.d.ts" />
/// <reference path="power-assert-formatter/power-assert-formatter.d.ts" />
/// <reference path="power-assert/power-assert.d.ts" />
/// <reference path="virtual-dom/virtual-dom.d.ts" />

declare module 'vdom-parser' {
  var parse: (el: any) => VirtualDOM.VNode;
  export default parse;
}