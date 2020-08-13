/// <reference types="../../typings/easyvk" />
import easyvk from 'easyvk';
import {VK} from 'easyvk'
import cr from '../cr'
import counter from '../lib/counter'

class Easyvk {
    vk: Promise<VK>
    constructor() {
        console.log('const');
         this.vk = easyvk({
            username: cr.vk.username,
            password: cr.vk.password,
            v: '5.122',
            mode: {
                name: 'highload',
                timeout: 400
            }
        });
    }
    auth() {
        return easyvk({
            username: cr.vk.username,
            password: cr.vk.password,
            v: '5.122',
            mode: {
                name: 'highload',
                timeout: 400
            }
        });
    }
    async getFriends(id: number): Promise<Array<number>> {
        let vk = await this.vk
        let friends
        try {
            let allow = counter.start()
            if (allow) {
                friends = await vk.call("friends.get", {
                    user_id: id,
                    count: 10000
                })
            }
        } catch (error) {
            // console.error(error.error_code);
            friends = []
        }
        if (friends.items && friends.items.length>0) {
            return friends.items
        } else {
            return []
        }
    }
}

export default new Easyvk();