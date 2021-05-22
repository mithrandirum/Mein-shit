const express = require("express");
require("dotenv").config();
const connect = require("./utils/connection");
const app = express();
const colors = require("colors");
const authRoute = require("./routes/auth");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const profileRoute = require("./routes/profileRoute");
const postRoute = require("./routes/postRoute");
const path = require("path");

connect();

app.use(express.json());
app.use(fileUpload());
app.use(cors());

app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/post", postRoute);

process.on("uncaughtException", function (err) {
  console.log(err);
});

process.env.PWD = process.cwd();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log(`server listenning on port ${process.env.PORT}`.bold.yellow);
});
