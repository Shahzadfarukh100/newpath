// Initializes the `goals` service on path `/goals`
const createService = require('feathers-mongoose');
const createModel = require('../../models/goals.model');
const hooks = require('./goals.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/goals', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('goals');

  service.hooks(hooks);
};
