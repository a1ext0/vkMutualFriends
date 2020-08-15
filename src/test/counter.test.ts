import counter from '../lib/counter';

import assert from 'assert';

describe('Counter', function () {
  this.timeout(10000);
  describe('#start()', () => {
    it('should return Promise', async () => {
      for (let i = 0; i < 400; i++) {
        let res = await counter.start();
        assert.equal(true, res);
      }
      counter.stop();
    });
  });
});
