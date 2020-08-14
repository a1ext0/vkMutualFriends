import friends from '../lib/friends'
import { expect } from 'chai'

describe('Friends', function () {
    this.timeout(60000)
    describe('#compareFriends()', ()=> {
        it('works on friends', async ()=> {
            let res = await friends.recCompare(191551772, 239585468)
            console.log(res);
            expect(res).to.be.true
        })
        it('works on 2nd_friends', async ()=> {
            let res = await friends.recCompare(191551772, 371338739)
            if (Array.isArray(res)) {
                console.log(res.length);
            }
            expect(res).to.have.lengthOf(9)
        })
        it('works on 2nd_friends/2', async ()=> {
            let res = await friends.recCompare(191551772, 131721502)
            if (Array.isArray(res)) {
                console.log(res.length);
            }
            expect(res).to.have.lengthOf(26)
        })
        it('works on not friends', async ()=> {
            let res = await friends.recCompare(191551772, 236702691)
            if (Array.isArray(res)) {
                console.log(res.length);
            }
            expect(res).to.have.lengthOf(0)
        })
    })
})