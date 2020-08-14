import Router from 'koa-router';
import friends from './friends';

const router = new Router();

router.use(friends.routes());

export default router;
