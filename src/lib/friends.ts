class Friends{
    iteration = 1
    areFriends(friends:Array<number>, user2:number):boolean {
        if (friends.includes(user2)) {
            return true
        } else {
            return false
        }
    }

    
}