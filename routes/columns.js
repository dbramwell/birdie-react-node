var express = require('express');
var router = express.Router();
var db = require('../db/db');

router.get('/', function(req, res) {
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

router.get('/:column/', function(req, res, next) {
  const columnName = '`' + req.params.column + '`';
  db.serialize(() => {
    db.all(`SELECT DISTINCT(${columnName}) AS value,
                   COUNT(*) AS count,
                   AVG(age) AS 'average age',
                   c.total_count AS total_count
            FROM census_learn_sql,
                 (SELECT COUNT(DISTINCT(${columnName})) +
                         COUNT(DISTINCT(case when ${columnName} is null then 1 end)) AS total_count
                  FROM census_learn_sql) c
            GROUP BY ${columnName}
            ORDER BY count DESC
            LIMIT 100;`, (err, columns) => {
      if (err) {
        console.error(err.message);
      } else {
        res.send(columns);
      }
    });
  });
});

module.exports = router;
