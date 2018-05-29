const authentication = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');
const jwt = require('@feathersjs/authentication-jwt');

module.exports = (app) => {
  let config = app.get('auth');
  app.configure(authentication(config));
  app.configure(local());
  app.configure(jwt());

  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(['jwt', 'local'])
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  });
};
