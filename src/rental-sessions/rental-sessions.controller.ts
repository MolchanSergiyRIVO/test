import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  Query,
} from '@nestjs/common';
import { RentalSessionsService } from './rental-sessions.service';
import {
  CreateRentalSessiondbDto,
  CreateRentalSessionDto,
  findRentalSessionReportDto,
} from './dto/create-rental-session.dto';

@Controller('rental-sessions')
export class RentalSessionsController {
  constructor(private readonly rentalSessionsService: RentalSessionsService) {}

  @Post()
  async create(@Body() createRentalSessionDto: CreateRentalSessionDto) {
    try {
      const discount =
        (await this.rentalSessionsService.findBookingDiscount(
          createRentalSessionDto.bookingId,
        )) || 1;
      const tariff = await this.rentalSessionsService.findTariff(
        createRentalSessionDto.mileage,
      );
      const price = tariff * discount;
      const data: CreateRentalSessiondbDto = {
        ...createRentalSessionDto,
        price,
      };
      await this.rentalSessionsService.create(data);
      return { price };
    } catch (e) {
      console.log(e);
      throw new HttpException('Failed.', 400);
    }
  }

  @Get()
  async findReport(@Query() query: findRentalSessionReportDto) {
    try {
      const data = query;
      const reports = {
        byDate: this.rentalSessionsService.findReportByDate,
        byCarId: this.rentalSessionsService.findReportByCar,
        byDateAndCarId: this.rentalSessionsService.findReportByDateAndCar,
        all: this.rentalSessionsService.findReport,
      };
      const reqiredFields = {
        byDate: ['date'],
        byCarId: ['carId'],
        byDateAndCarId: ['date', 'carId'],
        all: [],
      };

      if (!Object.entries(data).length) data.report = 'all';
      const getReport = reports[data.report];

      for (const key of reqiredFields[data.report]) {
        if (!data[key])
          throw new HttpException(`Failed. Set field: "${key}"`, 400);
      }

      delete data.report;
      return await getReport(data);
    } catch (e) {
      console.log(e);
      if (e.response) throw new HttpException(e.response, 400);
      throw new HttpException('Failed.', 400);
    }
  }
}
