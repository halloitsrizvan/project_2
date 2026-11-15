import 'reflect-metadata';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { configureApp } from './app.setup.js';

type Handler = (req: IncomingMessage, res: ServerResponse) => void;
let cached: Promise<Handler> | undefined;

/** Boots Nest once per serverless instance and reuses it for later requests. */
function boot() {
  cached ??= (async () => {
    const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'] });
    configureApp(app, { swagger: false });
    await app.init();
    return app.getHttpAdapter().getInstance() as Handler;
  })();
  return cached;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    (await boot())(req, res);
  } catch (error) {
    cached = undefined;
    console.error('Nest failed to start', error);
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ statusCode: 500, message: 'The service failed to start.' }));
  }
}
