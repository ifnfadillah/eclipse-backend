const mysql = require("mysql2/promise");
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = require("../config/appConfig");

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

pool
  .getConnection()
  .then((connection) => {
    console.log(`Connected to database`);
    connection.release();
  })
  .catch((err) => console.error(`Connection to database failed ${err}`));

module.exports = pool;
