const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('./db/us-census.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the census database.');
});

module.exports = db;