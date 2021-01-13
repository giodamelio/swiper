// Shim for TypeORM
import 'reflect-metadata';

import Koa from 'koa';
import Router from 'koa-router';

import connectDatabase from './database';

export default async function main(): Promise<Koa> {
  const app = new Koa();
  const router = new Router();

  const db = await connectDatabase();

  router.get('/tables', async (ctx) => {
    const tables = await db.manager.query(
      'SELECT * FROM sqlite_master WHERE type = "table" AND name NOT LIKE "sqlite_%"'
    );
    ctx.body = tables;
  });

  app.use(router.routes()).use(router.allowedMethods());

  return app;
}
