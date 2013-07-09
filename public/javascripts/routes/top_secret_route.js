var AuthenticatedRoute = require('./authenticated_route');
var User = require('../models/user');

var TopSecretRoute = AuthenticatedRoute.extend({
  model: function() {
    return User.find();
  }
});

module.exports = TopSecretRoute;
