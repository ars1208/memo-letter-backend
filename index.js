const express = require('express');
const router = express.Router();

const db = require('./db/db');

router.get('/', (req, res, next) => {
  db.pool.connect((err, client) => {
    if (err) {
      console.log(err);
    } else {
      client.query('SELECT * FROM user', (err, result) => {
        console.log(result.rows);
      });
    }
  });
  res.render('index', {
    title: 'hello express',
  });
});