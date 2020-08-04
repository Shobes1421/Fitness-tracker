const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongojs = require("mongojs");

const PORT = process.env.PORT || 3030;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "workout";
const collections = ["exercise"];

const db = mongojs(databaseUrl, collections);
db.on("error", error => {
    console.log("Database Error:", error);
});

const MONGOURL = process.env.MONGODB_URI || "mongodb://heroku_bj8917sh:password123@ds023603.mlab.com:23603/heroku_bj8917sh";

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});


// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

