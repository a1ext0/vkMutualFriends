import cr from './cr';
import Koa from 'koa';
import router from './routers';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import log from 'koa-logger';
import serve from 'koa-static';

let env = process.env.NODE_ENV;

export default function () {
  const app = new Koa();

  if (env != 'production') {
    app.use(log());
  }

  app.use(cors());
  app.use(serve('./public'));
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());

  const server = app.listen(cr.PORT, cr.HOST, () =>
    console.info(`Сервер запущен на ${cr.HOST}:${cr.PORT}`)
  );

  server.on('error', (e) => {
    if (e.name == 'EADDRINUSE') {
      console.error(`Порт ${cr.PORT} занят`);
    } else {
      console.error(e);
    }
  });
  return server;
}
