const authentication = require('./authentication');
const users = require('./users/users.service.js');
const goals = require('./goals/goals.service.js');
const journey = require('./journey/journey.service.js');
const guardrails = require('./guardrails/guardrails.service.js');
const fuel = require('./fuel/fuel.service.js');
const blogs = require('./blogs/blogs.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(authentication);
  app.configure(users);
  app.configure(goals);
  app.configure(journey);
  app.configure(guardrails);
  app.configure(fuel);
  app.configure(blogs);
};
