/// <reference types="../../typings/easyvk" />
import easyvk from 'easyvk';
import { VK } from 'easyvk';
import cr from '../cr';

class Easyvk {
  vk: Promise<VK>;
  constructor() {
    this.vk = easyvk({
      username: cr.vk.username,
      password: cr.vk.password,
      v: '5.122',
      mode: {
        name: 'highload',
        timeout: 400,
      },
    });
  }

  async getUser(url: string | number): Promise<number | false> {
    let vk = await this.vk;
    let user;
    try {
      user = await vk.call('users.get', {
        user_ids: url,
      });
      return user[0].id;
    } catch (error) {
      if (error.error_code != 113) {
        console.error(error);
      }
      return false;
    }
  }

  async getInfo(ids: Array<number>): Promise<Array<any> | false> {
    if (ids.length == 0) {
      return [];
    } else {
      let vk = await this.vk;
      let users;
      let strIds = ids.join(',');
      try {
        users = await vk.call('users.get', {
          user_ids: strIds,
          fields: 'photo_100,domain',
        });
        return users;
      } catch (error) {
        if (error.error_code != 113) {
          console.error(error);
        }
        return false;
      }
    }
  }

  async getFriends(id: number): Promise<Array<number>> {
    if (id != 0) {
      let vk = await this.vk;
      let friends;
      try {
        friends = await vk.call('friends.get', {
          user_id: id,
          count: 10000,
        });
      } catch (error) {
        if (error.error_code != 30 && error.error_code != 18) {
          console.error(error);
        }
        friends = [];
      }
      if (friends.items && friends.items.length > 0) {
        return friends.items;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }
}

export default new Easyvk();
