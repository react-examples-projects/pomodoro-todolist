const { SERVER } = require("./variables");
const wrapServerErrors = require("../middlewares/errorsHandling");
const { message } = require("../helpers/utils");
const { connectDb, closeDb } = require("../config/connection");

async function startServer(app, routers) {
  try {
    await connectDb();
    app.use("/api", routers);
    app.use((req, res, next) => {
      res.status(404).json({ status: 404, body: "Not Found" });
      next();
    });
    wrapServerErrors(app);

    const server = app.listen(SERVER.PORT, async () => {
      console.clear();
      message.success(`Server has started in http://localhost:${SERVER.PORT}/`);
      process.on("SIGINT", () => closeDb(server));
      process.on("SIGTERM", () => closeDb(server));
    });
  } catch (err) {
    message.error("Error Ocurred while starting the server", err);
  }
}

module.exports = startServer;
