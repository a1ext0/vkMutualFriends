import Router from 'koa-router';
import easyVk from '../lib/vk'
const router = new Router();


router.post('/hand', async (ctx) => {
    let vk = await easyVk.auth()
});

export default router;
