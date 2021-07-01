class CreateRentalSessionDto {
  carId: number;
  bookingId: number;
  mileage: number;
  date: string;
}

class CreateRentalSessiondbDto {
  carId: number;
  bookingId: number;
  mileage: number;
  date: string;
  price: number;
}

class findRentalSessionReportDto {
  carId: number;
  date: string;
  report: string;
}

export {
  CreateRentalSessionDto,
  CreateRentalSessiondbDto,
  findRentalSessionReportDto,
};
