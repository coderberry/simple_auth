var User = DS.Model.extend({
  name:     DS.attr('string'),
  email:    DS.attr('string'),
  username: DS.attr('string'),

  errors: {}
});

module.exports = User;

