import vk from '../lib/vk'
class Friends{
    iteration = 1
    chain:Array<number> = []
    areFriends(friends:Array<number>, user2:number):boolean {
        if (friends.includes(user2)) {
            return true
        } else {
            return false
        }
    }
    async recCompare(user1:number, user2:number) {
        this.chain = []
        if (typeof user1 != 'number' || typeof user2 != 'number') {
            return false
        } else {
            let friends = await vk.getFriends(user1)
            if (friends.length <= 0) {
                return false
            } else {
                if (friends.includes(user2)) {
                    this.chain.push(user1, user2)
                    return this.chain
                } else {
                    this.iteration++
                    let i = 0
                    let found = false
                    while (i<friends.length && !found) {
                        let is = await this.compare(friends[i], user2)
                        if (is) {
                            found = true
                            this.chain.push(user2)
                            this.chain.unshift(user1)
                        }
                        i++
                    }
                    if (found) {
                        return this.chain
                    } else {
                        return false
                    }
                }
            }
        }
    }
    async compare(user1:number, user2:number) {
        if (typeof user1 != 'number' || typeof user2 != 'number') {
            return false
        } else {
            let friends = await vk.getFriends(user1)
            if (friends.length <= 0) {
                return false
            } else {
                if (friends.includes(user2)) {
                    this.chain.push(user1)
                    return true
                } else {
                    return false
                }
            }
        }
    }
}

export default new Friends()