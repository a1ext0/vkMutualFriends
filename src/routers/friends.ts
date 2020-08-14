import Router from 'koa-router';
import friends from '../lib/friends'
const router = new Router();

router.post('/friends', async (ctx) => {
    if (ctx.request.body) {
        if (ctx.request.body.id1 && ctx.request.body.id2) {
            let id1 = ctx.request.body.id1
            let id2 = ctx.request.body.id2
            if (typeof id1 == 'number' && typeof id2 == 'number') {
                let mutualFriends = await await friends.recCompare(239585468, 510530939)
                switch (mutualFriends) {
                    case true:
                        ctx.body = { status: 1, about: 'Эти пользователи друзья' }
                        break;

                    case false:
                        ctx.body = { status: 0, about: 'Запрос отклонён, проверьте id пользователей' }
                        break;
                
                    default:
                        if (Array.isArray(mutualFriends)) {
                            if (mutualFriends.length == 0) {
                                ctx.body = { status: 2, about: 'У этих пользователей не найдено общих друзей с открытыми профилями' }
                            } else {
                                ctx.body = { status: 3, friends: mutualFriends, about: `У этих пользователей есть ${mutualFriends.length} общих друзей` }
                            }
                        } else {
                            ctx.status = 500
                            ctx.body = { error: 'Ошибка сервера' }
                        }
                        break;
                }
            } else {
                ctx.status = 422
                ctx.body = {error: 'Поля "id1" и "id2" должны быть числами'}
            }
        } else {
            ctx.status = 422
            ctx.body = {error: 'В теле запроса должны содержаться поля "id1" и "id2"'}
        }
    } else {
        ctx.status = 405
        ctx.body = {error: 'Тело запроса не должно быть пустым'}
    }
});

export default router;
