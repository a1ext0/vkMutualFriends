import friends from '../lib/friends'
import { expect } from 'chai'

describe('Friends', function () {
    this.timeout(1000000)
    describe('#compareFriends()', ()=> {
        it('works on friends', async ()=> {
            let res = await friends.recCompare(191551772, 239585468)
            console.log(res);
            expect(res).to.have.lengthOf(2)
        })
        it('works on 2nd_friends', async ()=> {
            let res = await friends.recCompare(191551772, 371338739)
            console.log(res);
            expect(res).to.have.lengthOf(3)
        })
    })
})