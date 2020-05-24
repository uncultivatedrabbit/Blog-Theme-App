require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const bodyParser = require("body-parser");
const ProductsData = require("../ProductsData");
const app = express();
// const Data = require("./models/ProductsData");

const morganOptions = NODE_ENV === "production" ? "tiny" : "common";

const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => {
  console.log("connected to database " + db.name)
});

app.use(morgan(morganOptions));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.get("/api/blogThemes", async (req, res) => {
  
  const blogThemes = ProductsData.blogThemes;
  res.json(blogThemes);
  // const test = await Data.find()
  // console.log(test)
  // res.send(test)
});

app.put("/api/blogThemes", (req, res) => {
  console.log(req.body);
  res.send("POST request to the homepage");
});

app.get("/api/users", (req, res) => {
  const blogThemes = ProductsData.users;
  res.json(blogThemes);
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.log(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
