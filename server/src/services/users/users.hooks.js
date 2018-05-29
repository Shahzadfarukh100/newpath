const auth = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');

module.exports = {
  before: {
    all: [],
    find: [
      auth.hooks.authenticate('jwt')
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
