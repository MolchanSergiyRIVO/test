// eslint-disable-next-line @typescript-eslint/no-var-requires
const pool = require('../database');

async function init() {
  const client = await pool.connect();
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS rental_sessions (
            id SERIAL PRIMARY KEY,
            car_id INT,
            booking_id INT,
            price double precision,
            mileage double precision,
            date DATE,
            FOREIGN KEY (car_id) REFERENCES cars(id),
            FOREIGN KEY (booking_id) REFERENCES booking(id)
        )
		`);
    await client.query(`CREATE INDEX rental_sessions_car_id_key_mileage_key ON rental_sessions (mileage, car_id)`);
  } catch (e) {
    throw new Error(e);
  } finally {
    client.release();
  }
}

module.exports = init;
