import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createBookingDto: CreateBookingDto): Promise<any> {
    try {
      const booked = await this.bookingService.findUnavailable(
        createBookingDto.carId,
        createBookingDto.startDate,
      );
      if (!booked.length) {
        await this.bookingService.create(createBookingDto);
      } else {
        throw new HttpException('Date not available', 400);
      }
    } catch (e) {
      throw new HttpException('Failed to book', 400);
    }
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.bookingService.findAll();
  }
}
