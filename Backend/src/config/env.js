import "dotenv/config.js";

export const ENV = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY,
};
