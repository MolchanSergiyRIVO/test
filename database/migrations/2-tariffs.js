// eslint-disable-next-line @typescript-eslint/no-var-requires
const pool = require('../database');

async function init() {
  const client = await pool.connect();
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS tariffs (
            id SERIAL PRIMARY KEY,
            price double precision,
            mileage numeric(3)
        );
		`);
    await client.query(`CREATE INDEX tariffs_mileage_key ON tariffs (mileage)`);
  } catch (e) {
    throw new Error(e);
  } finally {
    client.release();
  }
}

module.exports = init;
