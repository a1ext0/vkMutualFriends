import Router from 'koa-router';
const router = new Router();

router.post('/friends', async (ctx) => {
    if (ctx.request.body) {
        if (ctx.request.body.id1 && ctx.request.body.id2) {
            let id1 = ctx.request.body.id1
            let id2 = ctx.request.body.id2
            if (typeof id1 == 'number' && typeof id2 == 'number') {
                
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
