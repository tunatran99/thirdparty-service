process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as requestIp from 'request-ip';
import { json, urlencoded } from 'express';
import { HttpExceptionFilter } from '@libs/http.exception.filter';
import { LoggingInterceptor } from '@libs/logging.interceptor';
import { environment } from './environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(requestIp.mw());
  app.enableCors({
    exposedHeaders: ['Content-Disposition'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)), new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  await app.listen(environment.PORT);
}
bootstrap();
