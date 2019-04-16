import config from "./../config/config";
import app from "./express";
import { MongoClient } from "mongodb";
import assert from "assert";

let mdb;
MongoClient.connect(
  config.mongoUri,
  {
    useNewUrlParser: true
  },
  (err, db) => {
    mdb = db;
  }
);

app.listen(config.port, err => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});

export { mdb };
