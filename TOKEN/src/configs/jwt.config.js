import { config } from "dotenv";

config({ quiet: true });

export default {
  SECRET_KEY: process.env.SECRET_KEY,
  EXPIRE_TIME: process.env.EXPIRE_TIME ? Number(process.env.EXPIRE_TIME) : 600,
};
