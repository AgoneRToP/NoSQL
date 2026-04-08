import { config } from "dotenv";

config({ quiet: true });

export default {
  SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
  EXPIRE_TIME: process.env.ACCESS_TOKEN_EXPIRE_TIME ? Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) : 600,
  REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_EXPIRE_TIME: process.env.REFRESH_TOKEN_EXPIRE_TIME
};
