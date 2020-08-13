import Router from 'koa-router';
import hands from './hands';

const router = new Router();

router.use(hands.routes());

export default router;
