import id from '../lib/id';
import vk from '../lib/vk';
import { assert, expect } from 'chai';

describe('class Id', () => {
  describe('#exists()', function () {
    this.timeout(10000);
    it('1. Валидный профиль', async () => {
      let res = await id.exists(191551772);
      expect(res).to.be.true;
    });

    it('2. Закрытый профиль', async () => {
      let res = await id.exists(2691);
      expect(res).to.be.true;
    });

    it('3. Удалённый профиль', async () => {
      let res = await id.exists(510530939);
      expect(res).to.be.true;
    });

    it('4. Замороженный профиль', async () => {
      let res = await id.exists(584505657);
      expect(res).to.be.true;
    });

    it('5. Заблокированный профиль', async () => {
      let res = await id.exists(2692);
      expect(res).to.be.true;
    });

    it('6. Неверный профиль', async () => {
      let res = await id.exists(19155567857658671772);
      expect(res).to.be.false;
    });
  });

  describe('#getUser()', function () {
    this.timeout(10000);

    it('1. Валидный name', async () => {
      let res = await vk.getUser('a1ext0');
      assert.equal(191551772, res);
    });

    it('2. Невалидный name', async () => {
      let res = await vk.getUser('a1---');
      expect(res).to.be.false;
    });

    it('3. Несуществующий name', async () => {
      let res = await vk.getUser('a1ext0000');
      expect(res).to.be.false;
    });

    it('4. Закрытый профиль name', async () => {
      let res = await vk.getUser('max_belo_v');
      assert.equal(430969489, res);
    });

    it('5. Замороженный профиль name', async () => {
      let res = await vk.getUser('games_mr_frodo');
      assert.equal(402050328, res);
    });

    it('6. Удалённый профиль name', async () => {
      let res = await vk.getUser('69iguschin69');
      assert.equal(514581774, res);
    });
  });

  describe('#transformUrl()', () => {
    it('1. Полный url', () => {
      let res = id.transformUrl('https://vk.com/a1ext0');
      assert.equal('a1ext0', res);
    });

    it('2. Неполный url', () => {
      let res = id.transformUrl('vk.com/a1ext0');
      assert.equal('a1ext0', res);
    });

    it('3. Полный url с пробелом в конце', () => {
      let res = id.transformUrl('https://vk.com/a1ext0 ');
      assert.equal('a1ext0', res);
    });

    it('4. Полный url с пробелом в начале', () => {
      let res = id.transformUrl(' https://vk.com/a1ext0');
      assert.equal('a1ext0', res);
    });

    it('5. Полный url с пробелом в начале и в конце', () => {
      let res = id.transformUrl(' https://vk.com/a1ext0 ');
      assert.equal('a1ext0', res);
    });

    it('6. Полный url с пробелом в середине', () => {
      let res = id.transformUrl('https://vk. com/a1ext0');
      assert.equal('a1ext0', res);
    });

    it('7. Полный url со слешем в конце', () => {
      let res = id.transformUrl('https://vk.com/a1ext0/');
      assert.equal('a1ext0', res);
    });

    it('8. Невалидный url', () => {
      let res = id.transformUrl('https://vk.com/a1e-xt0/');
      expect(res).to.be.false;
    });

    it('9. Невалидный url/2', () => {
      let res = id.transformUrl('https://vk.com/!a1ext0/');
      expect(res).to.be.false;
    });

    it('10. Валидный с подчеркиванием', () => {
      let res = id.transformUrl('https://vk.com/a1e_xt0/');
      assert.equal('a1e_xt0', res);
    });

    it('11. Валидный ник', () => {
      let res = id.transformUrl('a1ext0');
      assert.equal('a1ext0', res);
    });
  });

  describe('#urlToId()', () => {
    it('1. Полный url', async () => {
      let res = await id.urlToId('https://vk.com/a1ext0');
      assert.equal(191551772, res);
    });

    it('2. Неполный url', async () => {
      let res = await id.urlToId('vk.com/a1ext0');
      assert.equal(191551772, res);
    });

    it('3. Полный url с пробелом в конце', async () => {
      let res = await id.urlToId('https://vk.com/a1ext0 ');
      assert.equal(191551772, res);
    });

    it('4. Полный url с пробелом в начале', async () => {
      let res = await id.urlToId(' https://vk.com/a1ext0');
      assert.equal(191551772, res);
    });

    it('5. Полный url с пробелом в начале и в конце', async () => {
      let res = await id.urlToId(' https://vk.com/a1ext0 ');
      assert.equal(191551772, res);
    });

    it('6. Полный url с пробелом в середине', async () => {
      let res = await id.urlToId('https://vk. com/a1ext0');
      assert.equal(191551772, res);
    });

    it('7. Полный url со слешем в конце', async () => {
      let res = await id.urlToId('https://vk.com/a1ext0/');
      assert.equal(191551772, res);
    });

    it('8. Невалидный url', async () => {
      let res = await id.urlToId('https://vk.com/a1e-xt0/');
      expect(res).to.be.false;
    });

    it('9. Невалидный url/2', async () => {
      let res = await id.urlToId('https://vk.com/!a1ext0/');
      expect(res).to.be.false;
    });

    it('10. Невалидный name', async () => {
      let res = await id.urlToId('https://vk.com/a1---');
      expect(res).to.be.false;
    });

    it('11. Несуществующий name', async () => {
      let res = await id.urlToId('https://vk.com/a1ext0000');
      expect(res).to.be.false;
    });

    it('12. Закрытый профиль name', async () => {
      let res = await id.urlToId('https://vk.com/max_belo_v');
      assert.equal(430969489, res);
    });

    it('13. Замороженный профиль name', async () => {
      let res = await id.urlToId('https://vk.com/games_mr_frodo');
      assert.equal(402050328, res);
    });

    it('14. Удалённый профиль name', async () => {
      let res = await id.urlToId('https://vk.com/69iguschin69');
      assert.equal(514581774, res);
    });
  });
});
