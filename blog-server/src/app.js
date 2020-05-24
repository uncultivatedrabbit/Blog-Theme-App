require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const bodyParser = require("body-parser");
const app = express();
const morganOptions = NODE_ENV === "production" ? "tiny" : "common";
const MongoClient = require("mongodb").MongoClient;

app.use(morgan(morganOptions));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const url = process.env.DATABASE_URL;
let dbase;
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
  if (err) throw err;
  dbase = db.db("ProductsDatabase");
});

//get request
app.get("/api/blogThemes", (req, res) => {
  const blogData = dbase
    .collection("ProductsData")
    .find()
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results[0].blogThemes);
    });
});

// get user info
app.get("/api/user", (req, res) => {
  const userData = dbase
    .collection("ProductsData")
    .find()
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results[0].user);
    });
});

// put requests
app.put("/api/blogThemes", (req, res) => {
  dbase
    .collection("ProductsData")
    .find(
      { "blogThemes.type": "author" },
      { "blogThemes.type": "author" },
      (err, response) => {
        console.log(response);
      }
    );
  // const blogData = dbase
  // .collection("ProductsData")
  // .updateOne({ id: req.body.id },{ $set: { favorited: req.body.favorited }, function(err,res){
  //   if (err) throw err;
  //   console.log("success")
  // } }
  // )
  res.send("updated");
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
