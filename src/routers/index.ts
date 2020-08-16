import Router from 'koa-router';
import friends from './friends';
import info from './info';

const router = new Router();

router.use(friends.routes());
router.use(info.routes());

export default router;
