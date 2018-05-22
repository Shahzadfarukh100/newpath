const assert = require('assert');
const app = require('../../server/src/app');

describe('\'journey\' service', () => {
  it('registered the service', () => {
    const service = app.service('journey');

    assert.ok(service, 'Registered the service');
  });
});
