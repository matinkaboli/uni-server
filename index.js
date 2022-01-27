const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const configs = require("./configs");
const app = express();
const server = require("http").createServer(app);
const { port } = configs;
const cors = require("cors");

(async () => await mongoose.connect(configs.db.url))().catch((err) =>
  console.log({ err })
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// you can specify a path `${origin}/yourPath` or by default it's `${origin}`
app.use("/", require("./routers"));

server.listen(port, () => console.log(`Server is running on :${port}`));
