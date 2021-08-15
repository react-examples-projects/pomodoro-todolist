import dotenv from "dotenv";

dotenv.config();

const MONGO_DB = {
  URL: process.env.MONGODB_URL,
  DB_NAME: process.env.MONGO_DB,
};

const SERVER = {
  SALT_BCRYPT: 6,
  SECRET_TOKEN: process.env.SECRET_TOKEN,
};

export { MONGO_DB, SERVER };
