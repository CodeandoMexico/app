/**
 * Module dependencies.
 */

var bus = require('bus');
var classes = require('classes');
var empty = require('empty');
var locker = require('browser-lock');
var o = require('query');
var title = require('title');

/**
 * Constructor
 */

function SectionBrowser() {
  this.container = o('#browser .app-content');
  this.classes = classes(this.container);
  this.body = classes(document.body);
}

/**
 * Render `view` inside `this.container`
 * using given options
 */

SectionBrowser.prototype.render = function(view, opts) {
  opts = opts || {};

  empty(this.container);
  this.renderView(view);
  this.body.add('browser-page');
  if (opts.class) this.body.add(opts.class);
  if (opts.title) title(opts.title);
  this.path = opts.path || '/';
  bus.emit('page:render');
  bus.once('page:change', this.onpagechange.bind(this));
};

SectionBrowser.prototype.renderView = function(view) {
  if (Array.isArray(view)) {
    view.forEach(function (v) {
      this.container.appendChild(v.el ? v.el : v);
    }, this);
  } else {
    this.container.appendChild(view.el ? view.el : view);
  }
};

/**
 * Handle `page:change` bus event
 */

SectionBrowser.prototype.onpagechange = function(url) {
  // restore page's original title
  title();

  // lock article's section
  locker.lock();

  // hide it from user
  this.classes.add('hide');

  var self = this;
  // once render, unlock and show
  bus.once('page:render', function() {
    locker.unlock();
    self.classes.remove('hide');
  });

  // check if loading to same page
  // and if not, scroll to top
  if (url !== this.path) this.container.parentNode.scrollTop = 0;

  // don't remove 'browser-page' body class
  // if we still are in a browsing laws page
  if (/^\/$/.test(url)) return;
  if (/^\/law/.test(url)) return;
  this.body.remove('browser-page');
};

/**
 * Create new SectionBrowser and expose it
 */

module.exports = new SectionBrowser();