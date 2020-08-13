import easyvk from 'easyvk';
import {VK} from 'easyvk'
import cr from '../cr'

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
}

export default new Easyvk();