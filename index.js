const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();

const pool = require('./db/db');

app.set('port', (process.env.PORT || 3000));

app.get("/login", function(req, res) {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    pool.query('SELECT * FROM REGISTERED_USERS WHERE user_name = ArashiKazuki;', function(err, results) {
      if (err) {
        throw err
      }
      res.setHeader("Access-Control-Allow-Origin", "https://ars1208.github.io")
      res.status(200).json({
        data: results.rows
      });
    });
    // var query = pool.query("SELECT * FROM REGISTERED_USERS WHERE user_name = $1;", [req.body.userId]);
  })
})

app.get("/", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://ars1208.github.io")
  res.send("Hello world!");
});

app.get("/jp", function (req, res) {
  const name = req.query.name || 'Name';
  res.send(`こんにちは! ${name}さん\n`);
});

app.get("/show", function (req, res) {
  pool.query('SELECT * FROM users', function(err, results) {
    if (err) {
      throw err
    }
    res.setHeader("Access-Control-Allow-Origin", "https://ars1208.github.io")
    res.status(200).json({
      data: results.rows
    });
  });
});

app.listen(app.get('port'), () => console.log("Example app listening on port " + app.get('port')));