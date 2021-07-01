async function init() {
  try {
    await Promise.all([
      await require('./migrations/1-cars')(),
      await require('./migrations/2-tariffs')(),
      await require('./migrations/3-discounts')(),
      await require('./migrations/4-booking')(),
    ]);
    await require('./migrations/5-booking_discount')();
    await require('./migrations/6-rental_sessions')();
    await Promise.all([
      await require('./seeds/cars')(),
      await require('./seeds/discounts')(),
      await require('./seeds/tariffs')(),
    ]);
  } catch (e) {
    throw new Error(e);
  }
}

init().then();
