const Pool = require("pg").Pool;
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const pool = new Pool({
  user: config.get("user"),
  host: config.get("host"),
  database: config.get("database"),
  password: config.get("password"),
  port: config.get("port"),
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
