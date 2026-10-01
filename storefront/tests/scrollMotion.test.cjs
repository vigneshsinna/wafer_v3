// Run: node tests/scrollMotion.test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

let intersection, mutation;
const preference = { matches: false, addEventListener: (_, callback) => preference.change = callback, removeEventListener() {} };
const events = {};
const nodes = [];
class Element {
    constructor(kind = '', parent = null) {
        this.tagName = 'DIV';
        this.dataset = { scrollReveal: kind };
        this.parentElement = parent;
        this.children = [];
        this.isConnected = true;
        this.calls = [];
        parent?.children.push(this);
    }
    contains(node) { return this === node || this.children.includes(node); }
    hasAttribute(name) { return name === 'data-scroll-stagger' && this.stagger; }
    closest() { return this.nested ? this : null; }
    animate(frames, options) {
        const animation = { cancel() { this.cancelled = true; } };
        this.calls.push({ frames, options, animation });
        return animation;
    }
}
class IntersectionObserver {
    constructor(callback) { this.callback = callback; this.targets = new Set(); intersection = this; }
    observe(node) { this.targets.add(node); }
    unobserve(node) { this.targets.delete(node); }
    disconnect() { this.targets.clear(); this.disconnected = true; }
    enter(node, visible = true) {
        if (this.targets.has(node)) this.callback([{ target: node, isIntersecting: visible }]);
    }
}
class MutationObserver {
    constructor(callback) { this.callback = callback; mutation = this; }
    observe() {}
    disconnect() { this.disconnected = true; }
}
const root = new Element();
root.querySelectorAll = () => nodes;
root.addEventListener = (name, callback) => events[name] = callback;
root.removeEventListener = name => delete events[name];
const document = { activeElement: null };
const context = {
    exports: {}, window: { IntersectionObserver, matchMedia: () => preference },
    document, IntersectionObserver, MutationObserver, Node: Element,
};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/scrollMotion.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, context);

const group = new Element(); group.stagger = true;
const first = new Element('', group), second = new Element('', group);
const image = new Element('image');
const heading = new Element(); heading.tagName = 'H1';
const parent = new Element(); parent.nested = true;
const nested = new Element('', parent);
nodes.push(first, second, image, heading, nested);
const cleanup = context.exports.initScrollMotion(root);
assert.equal(intersection.targets.has(nested), false, 'Nested content must not animate twice');
intersection.enter(first, false);
assert.equal(first.calls.length, 0, 'Offscreen content waits for intersection');
intersection.enter(first); intersection.enter(first);
assert.equal(first.calls.length, 1, 'Scroll reveals play once');
intersection.enter(second);
assert.equal(second.calls[0].options.delay, 50, 'Cards stagger by 50ms');
intersection.enter(image);
assert.ok(image.calls[0].frames[0].clipPath, 'Images use a wipe reveal');
intersection.enter(heading);
assert.equal(heading.calls[0].options.duration, 200);
assert.equal(heading.calls[0].frames[0].transform, undefined, 'Functional headings do not move');
events.focusin({ type: 'focusin', target: second });
assert.ok(second.calls[0].animation.cancelled, 'Focus makes content immediately visible');
preference.matches = true;
preference.change({ type: 'change', target: preference });
assert.ok(image.calls[0].animation.cancelled, 'Preference changes stop current movement');
const dynamic = new Element(); nodes.push(dynamic); mutation.callback();
intersection.enter(dynamic);
assert.equal(dynamic.calls[0].frames[0].transform, undefined, 'Reduced motion uses opacity only');
assert.equal(dynamic.calls[0].options.delay, 0);
assert.equal(dynamic.calls[0].options.duration, 200);
const focused = new Element(); nodes.push(focused); mutation.callback();
document.activeElement = focused; intersection.enter(focused);
assert.equal(focused.calls.length, 0, 'Do not animate focused content');
cleanup();
assert.ok(intersection.disconnected && mutation.disconnected);
assert.ok(dynamic.calls[0].animation.cancelled);
assert.equal(events.focusin, undefined);
context.window.IntersectionObserver = undefined;
assert.equal(typeof context.exports.initScrollMotion(root), 'function', 'Unsupported browsers keep visible content');
console.log('Scroll motion checks passed.');
