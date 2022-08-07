const express = require('express');
const router = express.Router();

const db = require('./db/db');

router.get('/', (req, res, next) => {
  db.pool.connect((err, client) => {
    if (err) {
      console.log(err);
      console.log("error 1");
    } else {
      client.query('SELECT * FROM users;', (err, result) => {
        console.log(result.rows);
        console.log("error 2");
      });
    }
  });
  res.render('index', {
    title: 'hello express',
  });
});