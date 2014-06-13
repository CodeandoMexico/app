/**
 * Module dependencies.
 */

var bus = require('bus');
var Header = require('./header');

/**
 * Create sidebar instance and expose
 */

var header = module.exports = new Header();

// Render header
bus.once('page:render', function() {
  header.render('header.app-header');
});