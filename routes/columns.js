var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.serialize(() => {
    db.all(`PRAGMA table_info(census_learn_sql)`, (err, columns) => {
      if (err) {
        console.error(err.message);
      } else {
        let columnNames = columns.map(column => column.name);
        res.send(columnNames);
      }
    });
  });
});

module.exports = router;
