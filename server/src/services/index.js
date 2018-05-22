const users = require('./users/users.service.js');
const goals = require('./goals/goals.service.js');
const journey = require('./journey/journey.service.js');
const guardrails = require('./guardrails/guardrails.service.js');
const fuel = require('./fuel/fuel.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(goals);
  app.configure(journey);
  app.configure(guardrails);
  app.configure(fuel);
};
