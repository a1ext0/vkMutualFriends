import vk from '../lib/vk'
import counter from '../lib/counter'
import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

class Friends{
    iteration = 0
    chain:Array<number> = []
    async recCompare(user1:number, user2:number):Promise<boolean|Array<number>> {
        this.chain = []
        this.iteration = 0
        if (typeof user1 != 'number' || typeof user2 != 'number') {
            return false
        } else {
            let friends
            friends = await vk.getFriends(user1)
            if (friends.length <= 0) {
                let u3 = user1
                user1 = user2
                user2 = u3
                friends = await vk.getFriends(user1)
                if (friends.length <= 0) {
                    return false  
                } else {
                    if (friends.includes(user2)) {
                        this.chain.push(user1, user2)
                        return true
                    } else {
                        let i = 0
                        while (i < friends.length) {
                            let allow = await counter.start()
                            if (allow) {
                                this.compare(friends[i], user2, friends.length)
                                    .then((is) => {

                                    })
                            }
                            i++
                        }
                        return new Promise((resolve, reject) => {
                            eventEmitter.once('friendsDone', () => {
                                resolve(this.chain)
                            })
                        })
                    }
                }
            } else {
                if (friends.includes(user2)) {
                    this.chain.push(user1, user2)
                    return true
                } else {
                    let i = 0
                    while (i<friends.length) {
                        let allow = await counter.start()
                        if (allow) {
                            this.compare(friends[i], user2, friends.length)
                            .then((is)=> {
                        
                        })
                    }
                        i++
                    }
                    return new Promise((resolve,reject)=> {
                        eventEmitter.once('friendsDone', () => {
                            resolve(this.chain)
                        })
                    })
                }
            }
        }
    }
    async compare(user1:number, user2:number, l:number) {
        if (typeof user1 != 'number' || typeof user2 != 'number') {
            return false
        } else {
            let friends = await vk.getFriends(user1)
            this.iteration++
            if (friends.length <= 0) {
                if (this.iteration == l) {
                    eventEmitter.emit('friendsDone')
                }   
                return false
            } else {
                if (friends.includes(user2)) {
                    this.chain.push(user1)
                    if (this.iteration == l) {
                        eventEmitter.emit('friendsDone')
                    }   
                    return true
                } else {
                    if (this.iteration == l) {
                        eventEmitter.emit('friendsDone')
                    }
                    return false
                }
            }
        }
    }
}

export default new Friends()