import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello World!';
});

app.use(router.routes()).use(router.allowedMethods());

export default app;

// eslint-disable-next-line import/prefer-default-export
export function badAdd(a: number, b: number): number {
  return a + b;
}
