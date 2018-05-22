// Initializes the `fuel` service on path `/fuel`
const createService = require('feathers-mongoose');
const createModel = require('../../models/fuel.model');
const hooks = require('./fuel.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/fuel', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('fuel');

  service.hooks(hooks);
};
