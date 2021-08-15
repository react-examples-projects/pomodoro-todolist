const Mongoose = require("mongoose");
const connection = Mongoose.connection;
const { MONGODB_URL, OPTIONS } = require("./mongodb");
const { message } = require("../helpers/utils");
const CONNECTION_TOTAL_TRIES = 4;
let connectionTries = 1;

connection.on("open", () => {
  message.success("Connect to database in " + MONGODB_URL);
});

connection.on("error", (err) => {
  message.error("Error in connect to mongodb", err);
});

async function closeDb(server) {
  try {
    await Mongoose.disconnect();
    message.success("Mongodb disconnect successfully");
    server.close();
    message.success("The server has stopped successfully");
  } catch (err) {
    message.error("Error in disconnet to mongodb", err);
  }
}

async function connectDb() {
  try {
    return await Mongoose.connect(MONGODB_URL, OPTIONS);
  } catch (err) {
    message.error("Error in connect to mongodb", err);
    const id = setTimeout(() => {
      if (connectionTries === CONNECTION_TOTAL_TRIES) return clearTimeout(id);
      message.warn(`Reconnecting to mongodb server {${connectionTries}}...`);
      connectionTries++;
      connectDb();
    }, 4000);
  }
}

module.exports = { connectDb, closeDb };
