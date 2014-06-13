/**
 * Module dependencies.
 */

var bus = require('bus');
var classes = require('classes');
var empty = require('empty');
var o = require('query');
var title = require('title');

/**
 * Create new SectionContent and expose it
 */

module.exports = new SectionContent();

/**
 * Constructor
 */

function SectionContent() {
  this.content = o('#content');
  this.body = classes(document.body);
}

/**
 * Render `view` inside `this.content`
 * using given options
 */

SectionContent.prototype.render = function(view, opts) {
  empty(this.content).appendChild(view.el ? view.el : view);
  if (opts.class) this.body.add(opts.class);
  if (opts.title) title(opts.title);
  bus.emit('page:render');
};