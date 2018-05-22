const assert = require('assert');
const app = require('../../server/src/app');

describe('\'fuel\' service', () => {
  it('registered the service', () => {
    const service = app.service('fuel');

    assert.ok(service, 'Registered the service');
  });
});
