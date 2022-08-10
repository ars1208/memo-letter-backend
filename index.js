const express = require("express");
const app = express();

app.set('port', (process.env.PORT || 3000));

app.get("/", function (req, res) {
  res.send("Hello world!");
});

app.get("/jp", function (req, res) {
  const name = req.query.name || 'Name';
  res.send(`こんにちは! ${name}さん\n`);
});

app.listen(app.get('port'), () => console.log("Example app listening on port " + app.get('port')));