const pool = require('../database');

async function init() {
  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO cars (brand, model, state_naumber, VIN) VALUES  ('brand 1', 'model 1', 'num 111', 'VIN 1'),
																									 ('brand 1', 'model 2', 'num 112', 'VIN 2'),
																									 ('brand 1', 'model 3', 'num 113', 'VIN 3'),
																									 ('brand 2', 'model 1', 'num 114', 'VIN 4'),
																									 ('brand 3', 'model 1', 'num 115', 'VIN 5')`,
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    client.release();
  }
}

module.exports = init;
