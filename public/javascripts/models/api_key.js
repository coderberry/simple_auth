var ApiKey = DS.Model.extend({
  access_token: DS.attr('string'),
  user:         DS.belongsTo('App.User')
});

module.exports = ApiKey;

