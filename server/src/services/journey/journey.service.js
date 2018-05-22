// Initializes the `journey` service on path `/journey`
const createService = require('feathers-mongoose');
const createModel = require('../../models/journey.model');
const hooks = require('./journey.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/journey', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('journey');

  service.hooks(hooks);
};
