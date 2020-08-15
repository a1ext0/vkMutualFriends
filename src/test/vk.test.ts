import vk from '../lib/vk';
import { expect } from 'chai';

describe('VK', function () {
  describe('#getFriends()', () => {
    this.timeout(10000);
    it('works on self', async () => {
      let friends = await vk.getFriends(0);
      expect(friends).to.be.an('Array');
      expect(friends).to.satisfy(function (nums: Array<any>) {
        let val = true;
        nums.forEach((num) => {
          if (val) {
            val = typeof num == 'number';
          }
        });
        return val;
      });
    });
    it('works on open profile', async () => {
      let friends = await vk.getFriends(414010361);
      expect(friends).to.be.an('Array');
      expect(friends).to.satisfy(function (nums: Array<any>) {
        let val = true;
        nums.forEach((num) => {
          if (val) {
            val = typeof num == 'number';
          }
        });
        return val;
      });
    });
    it('works on closed profile', async () => {
      let friends = await vk.getFriends(537405269);
      expect(friends).to.be.an('Array');
      expect(friends).to.satisfy(function (nums: Array<any>) {
        let val = true;
        nums.forEach((num) => {
          if (val) {
            val = typeof num == 'number';
          }
        });
        return val;
      });
    });
  });
});
