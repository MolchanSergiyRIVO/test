const pool = require('../database');

async function init() {
  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO discounts (discount, minimum_number_of_days, maximum_number_of_days) VALUES (0.95, 3, 5),
                                                                                                (0.90, 6, 14),
                                                                                                (0.85, 15, 30)`,
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    client.release();
  }
}

module.exports = init;
