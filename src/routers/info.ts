import Router from 'koa-router';
import id from '../lib/id';
import vk from '../lib/vk';
const router = new Router();

router.post('/info', async (ctx) => {
  if (ctx.request.body) {
    if (ctx.request.body.id) {
      let name = ctx.request.body.id;
      if (typeof name == 'string') {
        name = id.urlToId(name);
      }
      let aId = await name;
      if (typeof aId == 'number') {
        let info = await vk.getInfo([aId]);
        if (!info) {
          ctx.status = 422;
          ctx.body = {
            status: 0,
            about: 'Запрос отклонён, проверьте id пользователя',
          };
        } else {
          if (info[0] && info[0].id == aId) {
            ctx.body = { status: 1, info: info[0] };
          } else {
            ctx.body = {
              status: 0,
              about: 'Запрос отклонён, проверьте id пользователя',
            };
          }
        }
      } else {
        ctx.status = 422;
        ctx.body = {
          about: 'Поле "id" должно быть числом или ссылкой на профиль',
        };
      }
    } else {
      ctx.status = 422;
      ctx.body = {
        about: 'В теле запроса должно содержаться поле "id"',
      };
    }
  } else {
    ctx.status = 405;
    ctx.body = { about: 'Тело запроса не должно быть пустым' };
  }
});

export default router;
