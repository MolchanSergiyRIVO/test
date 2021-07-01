// eslint-disable-next-line @typescript-eslint/no-var-requires
const pool = require('../database');

async function init() {
  const client = await pool.connect();
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS booking_discount (
            booking_id INT,
            discount_id INT,
            FOREIGN KEY (booking_id) REFERENCES booking(id),
            FOREIGN KEY (discount_id) REFERENCES discounts(id)
        )
		`);
    await client.query(
      `CREATE INDEX booking_discount_booking_id_key_discount_id_key ON booking_discount (booking_id, discount_id)`,
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    client.release();
  }
}

module.exports = init;
