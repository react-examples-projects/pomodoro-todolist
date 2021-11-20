const mongodb = require("mongodb");
const { MONGO_DB, SERVER } = require("./variables");
const IS_DEV = SERVER.DEV;
const MONGODB_URL = IS_DEV
  ? MONGO_DB.URL + MONGO_DB.DB
  : MONGO_DB.URL + `${MONGO_DB.DB}?retryWrites=true&w=majority`;
const MongoClient = mongodb.MongoClient;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = {
  MongoClient,
  MONGODB_URL,
  OPTIONS,
};
