// eslint-disable-next-line @typescript-eslint/no-var-requires
const pool = require('../database');

async function init() {
  const client = await pool.connect();
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS discounts (
            id SERIAL PRIMARY KEY,
            discount decimal(3, 2) constraint chk_discount check (discount between 0 and 1),
            minimum_number_of_days SMALLINT constraint chk_minimum_number_of_days check (minimum_number_of_days > 0 AND minimum_number_of_days < 30),
            maximum_number_of_days SMALLINT constraint chk_maximum_number_of_days check (maximum_number_of_days > 0 AND maximum_number_of_days < 31)
        )
		`);
    await client.query(
      `CREATE INDEX discounts_minimum_number_of_days_key_maximum_number_of_days_key ON discounts (minimum_number_of_days, maximum_number_of_days)`,
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    client.release();
  }
}

module.exports = init;
