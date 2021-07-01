// eslint-disable-next-line @typescript-eslint/no-var-requires
const pool = require('../database');

async function init() {
  const client = await pool.connect();
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS booking (
            id SERIAL PRIMARY KEY,
            car_id INT,
            start_date DATE constraint chk_booking_start_date CHECK(EXTRACT(ISODOW FROM start_date) < 6 AND (end_date - start_date) < 31),
            end_date DATE constraint chk_booking_end_date CHECK(EXTRACT(ISODOW FROM end_date) < 6 AND (end_date - start_date) < 31),
            FOREIGN KEY (car_id) REFERENCES cars(id)
        )
		`);
    await client.query(`CREATE INDEX booking_id_pkey ON booking (id)`);
  } catch (e) {
    throw new Error(e);
  } finally {
    client.release();
  }
}

module.exports = init;
