import Koa from 'koa';

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello World!';
});

export default app;

// eslint-disable-next-line import/prefer-default-export
export function badAdd(a: number, b: number): number {
  return a + b;
}
