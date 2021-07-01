import { IsString, IsInt } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  carId: number;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;
}
