var User = require('../models/user');

var AuthManager = Ember.Object.extend({

  // Load the current user if the cookies exist and is valid
  init: function() {
    this._super();
    var accessToken = $.cookie('access_token');
    var authUserId  = $.cookie('auth_user');
    if (!Ember.isEmpty(accessToken) && !Ember.isEmpty(authUserId)) {
      this.authenticate(accessToken, authUserId);
    }
  },
 
  // Determine if the user is currently authenticated.
  isAuthenticated: function() {
    return !Ember.isEmpty(this.get('apiKey.accessToken')) && !Ember.isEmpty(this.get('apiKey.user'));
  },
 
  // Authenticate the user. Once they are authenticated, set the access token to be submitted with all
  // future AJAX requests to the server.
  authenticate: function(accessToken, userId) {
    var user = User.find(userId);
    this.set('apiKey', App.ApiKey.createRecord({
      accessToken: accessToken,
      user: user
    }));
    $.ajaxSetup({
      headers: { 'Authorization': 'Bearer ' + accessToken }
    });
  },
 
  // Log out the user
  reset: function() {
    this.set('apiKey', null);
    $.ajaxSetup({
      headers: { 'Authorization': 'Bearer none' }
    });
  },
 
  // Ensure that when the apiKey changes, we store the data in cookies in order for us to load
  // the user when the browser is refreshed.
  apiKeyObserver: function() {
    App.Store.accessToken = this.get('apiKey.accessToken');
    if (Ember.isEmpty(this.get('apiKey'))) {
      $.removeCookie('access_token');
      $.removeCookie('auth_user');
    } else {
      $.cookie('access_token', this.get('apiKey.accessToken'));
      $.cookie('auth_user', this.get('apiKey.user.id'));
    }
  }.observes('apiKey')
});

module.exports = AuthManager;