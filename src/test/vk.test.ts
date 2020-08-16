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

  describe('#getInfo()', () => {
    this.timeout(10000);

    let tests = [
      {
        describe: 'Пустой массив',
        arr: [],
      },
      {
        describe: 'Открытый профиль',
        arr: [414010361],
      },
      {
        describe: 'Закрытый профиль',
        arr: [537405269],
      },
      {
        describe: 'Много профилей',
        arr: [
          3736647,
          8473264,
          32211501,
          35173889,
          48097889,
          49803353,
          70053084,
          75011672,
          91687553,
          95834763,
          116389526,
          124800036,
          126595722,
          133937652,
          135323952,
          138691523,
          139581733,
          143756671,
          147111097,
          153543117,
          154882141,
          155056137,
          155410103,
          155611213,
          156849542,
          159035508,
          162341677,
          164645242,
          166445045,
          168072780,
          170216961,
          170306807,
          170515946,
          171951522,
          172694136,
          176479569,
          180147347,
          183533440,
          184742720,
          186096175,
          191551772,
          193466441,
          196996086,
          199477631,
          200200981,
          202269161,
          210450682,
          210661345,
          213556934,
          216066743,
          218447554,
          223091089,
          224938679,
          225204696,
          226847601,
          231112275,
          231781748,
          232042062,
          234531658,
          237342219,
          238393850,
          239585468,
          239816482,
          241401720,
          242154742,
          244267737,
          247631528,
          251018509,
          251803830,
          254041723,
          254627341,
          267561451,
          268119779,
          272761228,
          278612674,
          281545006,
          294748693,
          295143771,
          298715501,
          306641187,
          322600153,
          323017172,
          333999068,
          336848875,
          345697346,
          348192872,
          353197614,
          360284013,
          365956382,
          372503598,
          374362190,
          382622554,
          384890381,
          385559595,
          395266933,
          403012101,
          413930319,
          418797804,
          423801610,
          429398163,
        ],
      },
    ];

    tests.forEach((test, number) => {
      it(`${number + 1}. ${test.describe}`, async () => {
        let friends = await vk.getInfo(test.arr);
        expect(friends).to.be.an('Array');
        expect(friends).to.be.lengthOf(test.arr.length);
        expect(friends).to.satisfy(function (nums: Array<any>) {
          let val = true;
          nums.forEach((num, l) => {
            if (val) {
              val = typeof num == 'object';
            }
            if (val) {
              val = num.id == test.arr[l];
            }
          });
          return val;
        });
      });
    });
  });
});
