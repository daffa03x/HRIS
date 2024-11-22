const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "bpvd3qwphxrkmsqmynfk-mysql.services.clever-cloud.com",
  user: "ugmhnsddjdsz5ins",
  password: "91lMQvHqYFEniedHvSU6",
  database: "bpvd3qwphxrkmsqmynfk",
});

const promisePool = pool.promise();

module.exports = promisePool;
