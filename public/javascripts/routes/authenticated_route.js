var AuthenticatedRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    if (!App.AuthManager.isAuthenticated()) {
      this.redirectToLogin(transition);
    }
  },

  // Redirect to the login page and store the current transition so we can
  // run it again after login
  redirectToLogin: function(transition) {
    var sessionNewController = this.controllerFor('sessions.new');
    sessionNewController.set('attemptedTransition', transition);
    this.transitionTo('sessions.new');
  },

  events: {
    error: function(reason, transition) {
      this.redirectToLogin(transition);
    }
  }
});

module.exports = AuthenticatedRoute;

