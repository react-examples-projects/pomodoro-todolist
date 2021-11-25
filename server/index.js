const bodyParser = require("body-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const express = require("express");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
const routers = require("./routers");
const { SERVER } = require("./config/variables");
const startServer = require("./config/server");

app.use(morgan("dev"));
app.use(express.static("./uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Security middlewares
app.use(helmet());
app.use(hpp());
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    //origin: "https://pomodoro-three-theta.vercel.app",
    // origin(origin, cb) {
    //   if (!origin || SERVER.API.ALLOWED_DOMAINS.indexOf(origin) !== -1) {
    //     return cb(null, true);
    //   }

    //   cb(
    //     new Error(
    //       `Su cliente [${origin}] no puede realizar peticiones al servidor`
    //     )
    //   );
    // },
  })
);
app.use(rateLimit(SERVER.API.RATE_LIMITS));
startServer(app, routers);
