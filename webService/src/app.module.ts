import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListingsController } from './listings/listings.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ListingsService} from "./listings/listings.service";
import {ConfigModule, ConfigService} from "@nestjs/config";
import Joi from "joi";
import {Listing, Useraccount, Useraccountlistingslink} from "./entity/entities";
import {ListingsCache} from "./listings/listings.cache";
import {HttpModule} from "@nestjs/axios";
import {ScraperService} from "./data-access/scraperService";
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [
    HttpModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DB_HOST_DOCKER: Joi.string().default('host.docker.internal'),
        DB_USER: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(5432),

        SCRAPER_SERVICE_URL: Joi.string().required(),
        // Add more env vars here as needed
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {

        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          synchronize: false, // Only true in dev!
          logging: true,
          entities: [Listing, Useraccount, Useraccountlistingslink],
        }
      }
    })
  ],
  controllers: [AppController, ListingsController],
  providers: [AppService, ScraperService, ListingsService, ListingsCache],
})
export class AppModule {}
