import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListingsController } from './listings/listings.controller';

@Module({
  imports: [],
  controllers: [AppController, ListingsController],
  providers: [AppService],
})
export class AppModule {}
