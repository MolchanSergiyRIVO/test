import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { pool } from '../database';

// todo: Describe the interfaces for returned objects from the database
// todo: describe the return types for methods

@Injectable()
export class BookingService {
  async create(createBookingDto: CreateBookingDto) {
    const client = await pool.connect();
    try {
      const { carId, startDate, endDate } = createBookingDto;
      const query = `
          WITH insert_booking AS (
            INSERT INTO booking (car_id, start_date, end_date) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING
            RETURNING id, start_date, end_date
          ) INSERT INTO booking_discount (booking_id, discount_id) VALUES (
            (SELECT id FROM insert_booking),
            (
              SELECT id FROM discounts
              WHERE minimum_number_of_days <= (SELECT end_date - start_date AS number FROM insert_booking)
              AND maximum_number_of_days >= (SELECT end_date - start_date AS number FROM insert_booking)
            )
          );
      `;
      const res = await client.query(query, [carId, startDate, endDate]);
      return res;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
  }

  async findUnavailable(carId: number, startDate: string) {
    const client = await pool.connect();
    try {
      const query =
        'SELECT * FROM booking WHERE car_id = $1 AND $2 - end_date <= 3';
      const res = await client.query(query, [carId, startDate]);
      return res.rows;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
  }

  async findAll() {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM booking';
      const res = await client.query(query);
      return res.rows;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
  }
}
