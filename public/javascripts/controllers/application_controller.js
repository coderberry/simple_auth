var ApplicationController = Ember.Controller.extend({
  currentUser: function() {
    return App.AuthManager.get('apiKey.user')
  }.property('App.AuthManager.apiKey'),

  isAuthenticated: function() {
    return App.AuthManager.isAuthenticated()
  }.property('App.AuthManager.apiKey')
});

module.exports = ApplicationController;
