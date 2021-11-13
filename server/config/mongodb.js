const mongodb = require("mongodb");
const { MONGO_DB } = require("./variables");
const MongoClient = mongodb.MongoClient;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = {
  MongoClient,
  MONGODB_URL: MONGO_DB.URL,
  OPTIONS,
};
