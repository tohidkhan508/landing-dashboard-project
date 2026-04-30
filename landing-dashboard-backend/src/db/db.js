const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "product_dashboard",
  password: "inframe123",
  port: 5432,
});

module.exports = pool;
