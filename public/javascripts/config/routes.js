var App = require('./app');

App.Router.map(function() {
  this.resource('sessions', function() {
    this.route('new');
  });
  this.resource('users', function() {
    this.route('new');
  })
  this.route('top_secret');
});
