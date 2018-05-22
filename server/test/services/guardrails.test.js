const assert = require('assert');
const app = require('../../server/src/app');

describe('\'guardrails\' service', () => {
  it('registered the service', () => {
    const service = app.service('guardrails');

    assert.ok(service, 'Registered the service');
  });
});
