require('../vendor/jquery');
require('../vendor/jquery.cookie');
require('../vendor/handlebars');
require('../vendor/ember');
require('../vendor/ember-data');

// Hide deprecation messages
Ember.TESTING_DEPRECATION = true;

var App = window.App = Ember.Application.create();
App.Store = require('./store');

module.exports = App;