const express = require("express");
const { connect } = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./src/router/index.js");

const app = express();
dotenv.config();
app.use(cors());

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
connect(MONGODB_URI);

app.use(bodyParser.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
