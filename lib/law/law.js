/**
 * Module dependencies.
 */

var request = require('request');
var citizen = require('citizen');
var page = require('page');
var Article = require('proposal-article');
var Options = require('proposal-options');
var Comments = require('comments-view');
var sidebar = require('sidebar');
var filter = require('laws-filter');
var o = require('query');
var browser = require('section-browser');
var log = require('debug')('democracyos:law:page');

page('/law/:id', citizen.optional, load, function(ctx, next) {
  if (!ctx.law) {
    log('Law %s not found', ctx.params.id);
    return next();
  }

  // Render sidebar list
  sidebar.ready(function() {
    select() && filter.on('reload', select);

    function select() {
      log('select sidebar law %s', ctx.law.id);
      return setTimeout(sidebar.select.bind(sidebar, ctx.law.id), 0);
    }
  });

  // Build article's content container
  // and render to section.app-content
  var article = new Article(ctx.law);
  browser.render(article, { path: ctx.path, title: ctx.law.mediaTitle });

  // Build article's meta
  // and render to section.app-content
  var options = new Options(ctx.law, ctx.citizen);
  options.render('section.app-content');

  // Build article's comments, feth them
  // and render to section.app-content
  var comments = new Comments('law', ctx.law.id);
  comments.render('section.app-content');
  comments.initialize();

  log('render %s', ctx.params.id);
});

/*
 * Load homepage data
 *
 * @param {Object} ctx page's context
 * @param {Function} next callback after load
 * @api private
 */

function load (ctx, next) {
  log('fetch for %s', ctx.params.id);

  request
  .get('/api/law/' + ctx.params.id)
  .end(function(err, res) {
    if (res.status == 404) return ctx.law = null, next();
    if (err || !res.ok) return log('Found error: %s', err || res.error);
    ctx.law = res.body;
    next();
  });
};