// Initializes the `guardrails` service on path `/guardrails`
const createService = require('feathers-mongoose');
const createModel = require('../../models/guardrails.model');
const hooks = require('./guardrails.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/guardrails', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('guardrails');

  service.hooks(hooks);
};
