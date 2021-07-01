// eslint-disable-next-line @typescript-eslint/no-var-requires
const pool = require('../database');

async function init() {
  const client = await pool.connect();
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            brand VARCHAR(32),
            model VARCHAR(32),
            state_naumber VARCHAR(15),
            VIN VARCHAR(10)
        )
		`);
    await client.query(`CREATE INDEX cars_id_pkey ON cars (id)`);
  } catch (e) {
    throw new Error(e);
  } finally {
    client.release();
  }
}

module.exports = init;
