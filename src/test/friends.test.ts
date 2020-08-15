import friends from '../lib/friends';
import { expect } from 'chai';

describe('Friends', function () {
  this.timeout(60000);
  describe('#compareFriends()', () => {
    it('1. Работа с неверным id', async () => {
      let res = await friends.recCompare(19155567857658671772, 239585468);
      expect(res).to.have.lengthOf(0);
    });

    it('2. Работа с неверным id на второй позиции', async () => {
      let res = await friends.recCompare(239585468, 19155567857658671772);
      expect(res).to.have.lengthOf(0);
    });

    it('3. Работа с двумя невернымы id', async () => {
      let res = await friends.recCompare(2, 19155567857658671772);
      expect(res).to.be.false;
    });

    it('4. Работа с закрытым профилем', async () => {
      let res = await friends.recCompare(2691, 239585468);
      expect(res).to.have.lengthOf(0);
    });

    it('5. Работа с закрытым профилем на второй позиции', async () => {
      let res = await friends.recCompare(239585468, 2691);
      expect(res).to.have.lengthOf(0);
    });

    it('6. Работа с двумя закрытыми профилями', async () => {
      let res = await friends.recCompare(2691, 246);
      expect(res).to.be.false;
    });

    it('7. Работа с несозданным профилем', async () => {
      let res = await friends.recCompare(26, 239585468);
      expect(res).to.have.lengthOf(0);
    });

    it('8. Работа с несозданным профилем на второй позиции', async () => {
      let res = await friends.recCompare(239585468, 26);
      expect(res).to.have.lengthOf(0);
    });

    it('9. Работа с двумя несозданными профилями', async () => {
      let res = await friends.recCompare(26, 3);
      expect(res).to.be.false;
    });

    it('10. Работа с заблокированным профилем', async () => {
      let res = await friends.recCompare(2692, 239585468);
      expect(res).to.have.lengthOf(0);
    });

    it('11. Работа с заблокированным профилем на второй позиции', async () => {
      let res = await friends.recCompare(239585468, 2692);
      expect(res).to.have.lengthOf(0);
    });

    it('12. Работа с двумя заблокированными профилями', async () => {
      let res = await friends.recCompare(2692, 2695);
      expect(res).to.be.false;
    });

    it('13. Работа с замороженным профилем', async () => {
      let res = await friends.recCompare(584505657, 239585468);
      expect(res).to.have.lengthOf(1);
    });

    it('14. Работа с замороженным профилем на второй позиции', async () => {
      let res = await friends.recCompare(239585468, 584505657);
      expect(res).to.have.lengthOf(1);
    });

    it('15. Работа с двумя замороженными профилями', async () => {
      let res = await friends.recCompare(584505657, 155746463);
      expect(res).to.be.false;
    });

    it('16. Работа с удалённым профилем', async () => {
      let res = await friends.recCompare(510530939, 239585468);
      expect(res).to.have.lengthOf(2);
    });

    it('17. Работа с удалённым профилем на второй позиции', async () => {
      let res = await friends.recCompare(239585468, 510530939);
      expect(res).to.have.lengthOf(2);
    });

    it('18. Работа с двумя удалёнными профилями', async () => {
      let res = await friends.recCompare(510530939, 526260813);
      expect(res).to.be.false;
    });

    it('19. Работа с друзьями', async () => {
      let res = await friends.recCompare(191551772, 239585468);
      expect(res).to.be.true;
    });

    it('20. Работа с друзьями с закрытым профилем', async () => {
      let res = await friends.recCompare(154882141, 501233738);
      expect(res).to.be.true;
    });

    it('21. Работа с друзьями с закрытым профилем на второй позиции', async () => {
      let res = await friends.recCompare(501233738, 154882141);
      expect(res).to.be.true;
    });

    it('22. Работа с общими друзьями', async () => {
      let res = await friends.recCompare(191551772, 371338739);
      expect(res).to.have.lengthOf(9);
    });
    it('23. Работа не с друзьями', async () => {
      let res = await friends.recCompare(191551772, 236702691);
      expect(res).to.have.lengthOf(0);
    });
  });
});
