const pool = require('../database');

async function init() {
  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO tariffs (price, mileage) VALUES (270.00, 200),
                                                    (330.00, 350),
                                                    (390.00, 500)`,
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    client.release();
  }
}

module.exports = init;
