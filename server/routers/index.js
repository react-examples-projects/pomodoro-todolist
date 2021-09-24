const express = require("express");
const router = express.Router();
const existsToken = require("../middlewares/existsToken");

// sub-routers
const userRouters = require("./user");
const authRouters = require("./auth");
const noteRouters = require("./notes");
const tasksRouters = require("./tasks");

router.use("/user", existsToken, userRouters);
router.use("/auth", authRouters);
router.use("/note", existsToken, noteRouters);
router.use("/task", existsToken, tasksRouters);

module.exports = router;
