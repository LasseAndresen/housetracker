import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Setup session middleware
  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET', 'mySessionSecret'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000, // Just needs to last through the OAuth flow
      },
    }),
  );

  const port = configService.get<number>('PORT') ?? 0;
  await app.listen(port);
}
bootstrap();
