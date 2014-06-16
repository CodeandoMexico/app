/**
 * Module dependencies.
 */

var empty = require('empty');
var o = require('query');
var template = require('./template');
var render = require('render');
var page = require('page');
var classes = require('classes');
var content = require('section-content');

/**
 * Append 404 middleware
 */

page('*', function (ctx, next) {
  var view = render.dom(template);
  content.render(view, { class: 'not-found-page' });
});