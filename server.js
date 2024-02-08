const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const userDataRouter = require("./router");

app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  console.log(req);
  res.send("Hell000000");
});

mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "DB is Connected 😊 Server is running on PORT " + process.env.PORT
      );
    });
  })
  .catch((e) => {
    console.log(e.message);
  });

app.use(
  "/userData",
  (req, res, next) => {
    console.log(" ");
    console.log("Method is " + req.method);
    console.log("Body Data is " + req.body);
    console.log(" ");
    next();
  },
  userDataRouter,
  () => {
    console.log("Hello");
  }
);
