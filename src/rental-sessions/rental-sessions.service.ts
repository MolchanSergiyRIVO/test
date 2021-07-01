import { Injectable } from '@nestjs/common';
import { CreateRentalSessiondbDto } from './dto/create-rental-session.dto';
import { pool } from '../database';

@Injectable()
export class RentalSessionsService {
  async create(createRentalSessionDto: CreateRentalSessiondbDto) {
    const client = await pool.connect();
    try {
      const { carId, bookingId, price, mileage, date } = createRentalSessionDto;
      const query =
        'INSERT INTO rental_sessions (car_id, booking_id, price, mileage, date) VALUES ($1, $2, $3, $4, $5)';
      const res = await client.query(query, [
        carId,
        bookingId,
        price,
        mileage,
        date,
      ]);
      return res;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
  }

  async findBookingDiscount(bookingId: number) {
    // create service for this method
    const client = await pool.connect();
    try {
      const query =
        'SELECT discount FROM discounts RIGHT JOIN booking_discount on discounts.id = booking_discount.discount_id WHERE booking_discount.booking_id = $1';
      const res = await client.query(query, [bookingId]);
      return res.rows[0].discount;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
  }

  async findTariff(mileage: number) {
    // create service for this method
    const client = await pool.connect();
    try {
      const byMax = await client.query(
        'SELECT max(price) FROM tariffs WHERE mileage <= $1',
        [mileage],
      );
      const byMin = await client.query(
        'SELECT min(price) FROM tariffs WHERE mileage >= $1',
        [mileage],
      );
      return byMin.rows[0].min || byMax.rows[0].max;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
  }

  async findReportByCar(data) {
    const client = await pool.connect();
    try {
      const { carId } = data;
      const res = await client.query(
        'SELECT avg(mileage) AS average_mileage, count(*) AS number_of_session FROM rental_sessions WHERE car_id = $1',
        [carId],
      );
      return res.rows;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
  }

  async findReportByDate(data) {
    const client = await pool.connect();
    try {
      const { date } = data;
      const res = await client.query(
        'SELECT avg(mileage) AS average_mileage, count(*) FROM rental_sessions WHERE date = $1',
        [date],
      );
      return res.rows;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
  }

  async findReportByDateAndCar(data) {
    const client = await pool.connect();
    try {
      const { date, carId } = data;
      const res = await client.query(
        'SELECT avg(mileage) AS average_mileage, count(*) FROM rental_sessions WHERE date = $1 AND car_id = $2',
        [date, carId],
      );
      return res.rows;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
  }

  async findReport() {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT avg(mileage) AS average_mileage, count(*) FROM rental_sessions');
      return res.rows;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
  }
}
