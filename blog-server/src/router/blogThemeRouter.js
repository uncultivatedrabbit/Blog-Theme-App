const express = require("express");
const blogThemeRouter = express.Router();
const dbService = require("../dbConnection");

blogThemeRouter
  .route("/api/blogThemes")
  .get((req, res) => {
    dbService.connect((err) => {
      if (err) {
        console.log("Error: ", err);
        process.exit(1);
      }
      const db = dbService;
      db.db
        .collection("ProductsData")
        .find()
        .toArray((err, results) => {
          if (err) throw err;
          res.json(results[0].blogThemes);
        });
    });
  })
  .patch((req, res) => {
    dbService.connect((err) => {
      if (err) {
        console.log("Error: ", err);
        process.exit(1);
      }
      const db = dbService;
      db.db
      .collection("ProductsData")
      .findOneAndUpdate(
        { "blogThemes.id": req.body.id },
        { $set: { "blogThemes.$.favorited": req.body.favorited } },
        (err, response) => {
          if (err) console.log(err);
          res.send("updated");
        }
      );
    });
  });

blogThemeRouter.route("/api/user").get((req, res) => {
  dbService.connect((err) => {
    if (err) {
      console.log("Error: ", err);
      process.exit(1);
    }
    const db = dbService;
    db.db
    .collection("ProductsData")
    .find()
    .toArray((err, results) => {
      if (err) throw err;
      res.json(results[0].user);
    });
  });
});

module.exports = blogThemeRouter;
