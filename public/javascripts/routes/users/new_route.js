var User = require('../../models/user');

var UsersNewRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this.controller.set('model', User.createRecord());
  }
});

module.exports = UsersNewRoute;