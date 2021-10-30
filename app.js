const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
mongoose.connect(process.env.MONGO_KEY);
const db = mongoose.connection;
db.on("open", () => console.log("database connected"));
db.on("error", (error) => console.log(error));
app.use(express.json());
const router = require("./router/reading");
app.use(express.static("public"));
app.use("/", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server listening......");
});
