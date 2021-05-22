const mongoose = require("mongoose");
express = require("express");
const dotenv = require("dotenv").config();

function connect() {
  return mongoose.connect(
    process.env.CONNNECTION_URL,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
    (err, connection) => {
      if (err) console.log(err);
      console.log(`connected to database `.bold.yellow);
    }
  );
}

module.exports = connect;
