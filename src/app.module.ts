import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RentalSessionsModule } from './rental-sessions/rental-sessions.module';
import { BookingModule } from './booking/booking.module';
import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';

@Module({
  imports: [RentalSessionsModule, BookingModule],
  controllers: [BookingController],
  providers: [AppService, BookingService],
})
export class AppModule {}
