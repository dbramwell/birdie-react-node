var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET users listing. */
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
    db.all(`SELECT distinct(${columnName}) as value,
                   count(*) as count,
                   avg(age) as 'average age'
            from census_learn_sql
            group by ${columnName}
            order by count desc
            limit 100;`, (err, columns) => {
      if (err) {
        console.error(err.message);
      } else {
        res.send(columns);
      }
    });
  });
});

module.exports = router;
