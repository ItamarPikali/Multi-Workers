const express = require("express");
const cors = require("cors");

const controller = require("./controllers-layer/controller");

const server = express();
server.use(cors());
server.use(express.json());

server.use("/api", controller);

server.use("*", (req, res) => {
  res.status(404).send(`Route not found : (${req.originalUrl})`);
});

server.listen(4000, () => {
  console.log("Listening on 4000");
});
