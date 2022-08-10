const { Pool } = require('pg');

// DB情報を持ったPoolを生成
exports.pool = new Pool ({
  host: process.env.ENV_HOST,
  database: process.env.ENV_DATABASE,
  user: process.env.ENV_USER,
  port: process.env.ENV_PORT,
  password: process.env.ENV_PASSWORD,
  ssl: {
    sslmode: 'require',
    rejectUnauthorized: false
  }
});

module.exports = pool;