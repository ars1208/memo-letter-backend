const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors")
const app = express();
const session = require("express-session");

const pool = require('./db/db');
const ses_opt = {
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
};

app.use(cors());
app.use(session(ses_opt));

app.set('port', (process.env.PORT || 3000));

// アカウント関連API
app.get("/logout", function(req, res) {
  req.session.login = undefined

  res.redirect("/");
})

app.post("/login", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://ars1208.github.io")
  bcrypt.hash(req.password, 10, function(err, hash) {
    pool.query(`SELECT * FROM REGISTERED_USERS WHERE user_name="${req.userId}";`, async function(err, results) {
      if (err) {
        throw err
      }
      res.status(200).json({
        data: results.rows
      });
      // const compared = await bcrypt.compare(req.password, results.rows.user_password_hash);

      // if (compared) {
        // req.session.login = row.userId;
        // console.log(res)
      // }

      // res.redirect("/");
    })
  });
});

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