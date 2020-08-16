import vk from '../lib/vk';
import counter from '../lib/counter';
import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

class Friends {
  iteration = 0;
  chain: Array<number> = [];
  async recCompare(
    user1: number,
    user2: number
  ): Promise<boolean | Array<number>> {
    this.chain = [];
    this.iteration = 0;
    if (typeof user1 != 'number' || typeof user2 != 'number') {
      return false;
    } else {
      let friends = await Promise.all([
        vk.getFriends(user1),
        vk.getFriends(user2),
      ]);
      if (friends[0].length == 0) {
        if (friends[1].length == 0) {
          return false;
        } else {
          let res = await this.worker(friends[1], user2, user1);
          if (Array.isArray(res)) {
            res = await vk.getInfo(res);
          }
          return res;
        }
      } else {
        if (friends[1].length == 0) {
          let res = await this.worker(friends[0], user1, user2);
          if (Array.isArray(res)) {
            res = await vk.getInfo(res);
          }
          return res;
        } else {
          let res = await this.fastWorker(friends[0], friends[1], user1, user2);
          if (Array.isArray(res)) {
            res = await vk.getInfo(res);
          }
          return res;
        }
      }
    }
  }

  async fastWorker(
    friends1: Array<number>,
    friends2: Array<number>,
    user1: number,
    user2: number
  ): Promise<boolean | Array<number>> {
    if (friends1.includes(user2)) {
      this.chain.push(user1, user2);
      return true;
    } else {
      let res: Array<number> = [];
      friends1.forEach((user) => {
        if (friends2.includes(user)) {
          res.push(user);
        }
      });
      return res;
    }
  }

  async worker(
    friends: Array<number>,
    user1: number,
    user2: number
  ): Promise<boolean | Array<number>> {
    if (friends.includes(user2)) {
      this.chain.push(user1, user2);
      return true;
    } else {
      let i = 0;
      while (i < friends.length) {
        let allow = await counter.start();
        if (allow) {
          this.compare(friends[i], user2, friends.length).then((is) => {});
        }
        i++;
      }
      return new Promise((resolve, reject) => {
        eventEmitter.once('friendsDone', () => {
          resolve(this.chain);
        });
      });
    }
  }

  async compare(user1: number, user2: number, l: number) {
    if (typeof user1 != 'number' || typeof user2 != 'number') {
      return false;
    } else {
      let friends = await vk.getFriends(user1);
      this.iteration++;
      if (friends.length <= 0) {
        if (this.iteration == l) {
          eventEmitter.emit('friendsDone');
        }
        return false;
      } else {
        if (friends.includes(user2)) {
          this.chain.push(user1);
          if (this.iteration == l) {
            eventEmitter.emit('friendsDone');
          }
          return true;
        } else {
          if (this.iteration == l) {
            eventEmitter.emit('friendsDone');
          }
          return false;
        }
      }
    }
  }
}

export default new Friends();
