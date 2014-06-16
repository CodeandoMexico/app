/**
 * Module dependencies.
 */

var bus = require('bus');
var classes = require('classes');
var empty = require('empty');
var o = require('query');
var title = require('title');

/**
 * Constructor
 */

function SectionContent() {
  this.container = o('#content');
  this.body = classes(document.body);
}

/**
 * Render `view` inside `this.container`
 * using given options
 */

SectionContent.prototype.render = function(view, opts) {
  empty(this.container).appendChild(view.el ? view.el : view);
  if (opts.class) this.body.add(opts.class);
  if (opts.title) title(opts.title);
  bus.emit('page:render');
};

/**
 * Create new SectionContent and expose it
 */

module.exports = new SectionContent();