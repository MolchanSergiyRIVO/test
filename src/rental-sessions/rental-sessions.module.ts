import { Module } from '@nestjs/common';
import { RentalSessionsService } from './rental-sessions.service';
import { RentalSessionsController } from './rental-sessions.controller';

@Module({
  controllers: [RentalSessionsController],
  providers: [RentalSessionsService]
})
export class RentalSessionsModule {}
