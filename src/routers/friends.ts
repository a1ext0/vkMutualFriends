import Router from 'koa-router';
import friends from '../lib/friends';
import id from '../lib/id';
const router = new Router();

router.post('/friends', async (ctx) => {
  if (ctx.request.body) {
    if (ctx.request.body.id1 && ctx.request.body.id2) {
      let id1 = ctx.request.body.id1;
      let id2 = ctx.request.body.id2;
      if (typeof id1 == 'string') {
        id1 = id.urlToId(id1);
      }
      if (typeof id2 == 'string') {
        id2 = id.urlToId(id2);
      }
      let aId1 = await id1;
      let aId2 = await id2;
      if (typeof aId1 == 'number' && typeof aId2 == 'number') {
        let exists = await Promise.all([id.exists(aId1), id.exists(aId2)]);
        if (!exists[0] || !exists[1]) {
          ctx.status = 422;
          ctx.body = {
            status: 0,
            about: 'Запрос отклонён, проверьте id пользователей',
          };
        } else {
          let mutualFriends = await friends.recCompare(aId1, aId2);
          switch (mutualFriends) {
            case true:
              ctx.body = { status: 1, about: 'Эти пользователи друзья' };
              break;

            case false:
              ctx.status = 422;
              ctx.body = {
                status: 0,
                about: 'Запрос отклонён, проверьте id пользователей',
              };
              break;

            default:
              if (Array.isArray(mutualFriends)) {
                if (mutualFriends.length == 0) {
                  ctx.body = {
                    status: 2,
                    about:
                      'У этих пользователей не найдено общих друзей с открытыми профилями',
                  };
                } else {
                  ctx.body = {
                    status: 3,
                    friends: mutualFriends,
                    about: `У этих пользователей есть ${mutualFriends.length} общих друзей`,
                  };
                }
              } else {
                ctx.status = 500;
                ctx.body = { about: 'Ошибка сервера' };
              }
              break;
          }
        }
      } else {
        ctx.status = 422;
        ctx.body = {
          about:
            'Поля "id1" и "id2" должны быть числами или ссылками на профили',
        };
      }
    } else {
      ctx.status = 422;
      ctx.body = {
        about: 'В теле запроса должны содержаться поля "id1" и "id2"',
      };
    }
  } else {
    ctx.status = 405;
    ctx.body = { about: 'Тело запроса не должно быть пустым' };
  }
});

export default router;
