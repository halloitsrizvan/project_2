import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { HttpErrorFilter } from './common/http-error.filter.js';

/** Shared by the long-running server (main.ts) and the Vercel serverless entry (vercel.ts). */
export function configureApp(app: INestApplication, options: { swagger?: boolean } = {}) {
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.enableCors({ origin: process.env.CLIENT_URL });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useGlobalFilters(new HttpErrorFilter());
  if (options.swagger !== false) {
    const swagger = new DocumentBuilder().setTitle('EventSense API').setVersion('1.0').addBearerAuth().build();
    SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swagger));
  }
}
