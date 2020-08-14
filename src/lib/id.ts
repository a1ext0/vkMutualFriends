import vk from '../lib/vk'

class Id {
    async urlToId(url:string):Promise<number|false> {
        let name = this.transformUrl(url)
        if (name) {
            let id = await vk.getUser(name)
            if (id) {
                return id
            } else {
                return false
            }
        } else {
            return false
        }
    }

    transformUrl(url:string):string|false {
        url = url.replace(/\s+/g, '');
        let regexp = /vk.com\/[a-zA-Z0-9_]{5,32}/i
        let name = url.match(regexp)
        if (name && name[0]) {
            let res = name[0].replace(/vk.com\//, '')
            return res
        } else {
            return false  
        }
    }
}
export default new Id()