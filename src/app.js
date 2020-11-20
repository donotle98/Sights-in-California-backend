const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");

const loginRouter = require("./login/login-router");
const bookmarksRouter = require("./bookmarks/bookmarks-router");
const usersRouter = require("./users/users-router");
const sightsRouter = require("./sights/sights-router");
const errorHandler = require("./error-handler");

const app = express();

const morganSetting = NODE_ENV === "production" ? "tiny" : "common";
app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors());

app.use("/api/login", loginRouter);
app.use("/api/bookmarks", bookmarksRouter);
app.use("/api/users", usersRouter);
app.use("/api/sights", sightsRouter);

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.use(errorHandler);

module.exports = app;
