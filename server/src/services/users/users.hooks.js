const auth = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');

module.exports = {
  before: {
    all: [],
    find: [
      auth.hooks.authenticate('jwt'),
      async (hook) => {
        if ('_aggregate' in hook.params.query) {
          console.log('found _aggregate');
          try {
            hook.result = await hook.service.Model.aggregate([hook.params.query._aggregate]).exec();
            console.log('res', hook.result);
          } catch(ex) {
            console.log('ex', ex);
            hook.result = ex;
          }
        }
      }
    ],
    get: [
      auth.hooks.authenticate('jwt')
    ],
    create: [
      local.hooks.hashPassword()
    ],
    update: [

    ],
    patch: [

    ],
    remove: [

    ]
  },

  after: {
    all: [ local.hooks.protect('password') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
