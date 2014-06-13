/**
 * Module dependencies.
 */

var page = require('page');
var View = require('./view');
var request = require('request');
var t = require('t');
var o = require('query');
var content = require('section-content');

page('/signin', function(ctx, next) {
  // Build signin view with options
  var form = new View({});

  // Render signin-page into content section
  content.render(form, { title: t('Login'), class: 'signin-page' });

  form.on('submit', function(data) {
    request
    .post('/signin')
    .send(data)
    .end(function(err, res) {
      var submit = o('input[type="submit"]', o('#signin-form'));
      submit.disabled = false;

      if (!res.ok) {
        return form.errors([res.error]);
      };
      if (err || (res.body && res.body.error)) {
        return form.errors([err || res.body.error]);
      };
      page('/');
    });
  });

});
