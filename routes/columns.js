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
                   avg(age) as 'average age',
                   c.total_count as total_count
            from census_learn_sql, (
              SELECT count(distinct(${columnName})) +
                count(distinct(case when ${columnName} is null then 1 end)) as total_count
              from census_learn_sql
            ) c
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
