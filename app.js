if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dbUrl = process.env.MONGO_URL;

main()
  .then(() => {
    console.log("Connected to Atlas db successfully!!!");
  })
  .catch((err) => {
    console.log(err);
    console.log("oops!Something went wrong!!!");
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.listen(8080, (req, res) => {
  console.log("Listening on port 8080");
});
