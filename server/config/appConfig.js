require("dotenv").config();

// APP
const BASE_URL = process.env.BASE_URL ?? "localhost";
const PORT = process.env.PORT ?? 3001;

// DATABASE
const DB_HOST = process.env.DATABASE_HOST ?? "localhost";
const DB_PORT = process.env.DATABASE_PORT ?? 3306;
const DB_USER = process.env.DATABASE_USER ?? "root";
const DB_PASSWORD = process.env.DATABASE_PASSWORD ?? "";
const DB_NAME = process.env.DATABASE_NAME ?? "parentify";

// AUTHENTICATION
const SECRET = process.env.JWT_SECRET ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MDg1OTEwLCJleHAiOjE3MTgwODk1MTB9.SFUcw3Gh_xVjZdCQLWdbAIHFEnz9v8Phwr3WIWTFAQ8";

module.exports = {
  BASE_URL,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  SECRET,
};
