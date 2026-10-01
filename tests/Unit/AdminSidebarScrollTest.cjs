const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('public/assets/js/aiz-core.js', 'utf8');
const method = source.match(/rememberSidebarScroll: function \(\) \{[\s\S]*?\n        \},/);

function setup(stored, blocked = false) {
    assert.ok(method, 'Sidebar scroll persistence must be installed');
    const listeners = {};
    const sidebar = { scrollTop: 0, addEventListener: (event, callback) => listeners[event] = callback };
    const storage = { getItem: () => { if (blocked) throw Error('blocked'); return stored; }, setItem: (key, value) => { if (blocked) throw Error('blocked'); stored = value; } };
    const window = { location: { pathname: '/admin/website/header' }, addEventListener: (event, callback) => listeners[event] = callback };
    const feature = vm.runInNewContext('({' + method[0] + '})', { document: { querySelector: () => sidebar }, window, sessionStorage: storage, Number });
    feature.rememberSidebarScroll();
    return { sidebar, listeners, stored: () => stored };
}

test('keeps sidebar position across navigation, reload and form submission', () => {
    const page = setup('640');
    assert.equal(page.sidebar.scrollTop, 640);
    page.sidebar.scrollTop = 710;
    page.listeners.scroll();
    assert.equal(page.stored(), '710');
    page.sidebar.scrollTop = 720;
    page.listeners.pagehide();
    assert.equal(setup(page.stored()).sidebar.scrollTop, 720);
});

test('ignores malformed stored positions and unavailable browser storage', () => {
    for (const value of [null, 'NaN', '-1', 'Infinity']) assert.equal(setup(value).sidebar.scrollTop, 0);
    const blocked = setup(null, true);
    assert.equal(blocked.sidebar.scrollTop, 0);
    assert.doesNotThrow(() => blocked.listeners.scroll());
    assert.doesNotThrow(() => blocked.listeners.pagehide());
});
