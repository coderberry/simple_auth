var SessionsNewController = Ember.ObjectController.extend({
  loginUser: function() {
    var router = this.get('target');
    var data = this.getProperties('username_or_email', 'password');

    $.post('/session', data, function(results) {
      App.AuthManager.authenticate(results.api_key.access_token, results.api_key.user_id);
      router.transitionTo('index');
    });
  }
});

module.exports = SessionsNewController;

