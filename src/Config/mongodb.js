import mongodb from "mongodb";
const { MONGO_DB } = require("./variables");
const MongoClient = mongodb.MongoClient;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

module.exports = {
  MongoClient,
  MONGODB_URL: MONGO_DB.URL,
  OPTIONS,
  MONGO_DB: MONGO_DB.DB_NAME,
};
