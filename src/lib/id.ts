import vk from '../lib/vk';

class Id {
  async exists(id: number): Promise<true | false> {
    let userId = await vk.getUser(id);
    if (userId) {
      return true;
    } else {
      return false;
    }
  }

  async urlToId(url: string): Promise<number | false> {
    let name = this.transformUrl(url);
    if (name) {
      let id = await vk.getUser(name);
      if (id) {
        return id;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  transformUrl(url: string): string | false {
    url = url.replace(/\s+/g, '');
    let regexp = /vk.com\/[a-zA-Z0-9_]{5,32}/i;
    let regexp2 = /^[a-zA-Z0-9_]{5,32}$/i;
    let name = url.match(regexp);
    if (name && name[0]) {
      let res = name[0].replace(/vk.com\//i, '');
      return res;
    } else {
      let res = url.match(regexp2);
      if (res && res[0]) {
        return res[0];
      } else {
        return false;
      }
    }
  }
}
export default new Id();
