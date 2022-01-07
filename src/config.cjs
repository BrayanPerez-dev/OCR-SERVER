import { config } from "dotenv";

config();

export default{
  PORT:process.env.PORT || 4000,
  DB_HOST:process.env.DB_HOST,
  DB_USER:process.env.DB_USER,
  DB_PASS:process.env.DB_PASS,
  DB_NAME:process.env.DB_NAME,
  PGPORT:process.env.PGPORT
};