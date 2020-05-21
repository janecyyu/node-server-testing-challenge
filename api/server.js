const express = require("express");
const usersRouter = require("../usersRouter/router");

const server = express();

server.use(express.json());
server.use("/users", usersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
