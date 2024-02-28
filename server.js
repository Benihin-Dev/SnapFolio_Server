const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const snapfolioUserDataRouter = require("./router");
app.use(cors());
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { uploadFile, getFileStream } = require("./s3");

app.post("/uploadprofilepic", upload.single("image"), async (req, res) => {
  const file = req.file;
  console.log(file);

  const result = await uploadFile(file);
  await unlinkFile(file.path);
  console.log(result);
  const description = req.body.description;
  res.send({ imagePath: `${result.Key}` });
});

app.get("/uploadprofilepic/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  console.log(req);
  res.send("Hello \n This server working for Snapfolio !..");
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
  "/snapfolio",
  (req, res, next) => {
    console.log(" ");
    console.log("Method is " + req.method);
    console.log("Body Data is " + req.body);
    console.log(" ");
    next();
  },
  snapfolioUserDataRouter,
  () => {
    console.log("Hello");
  }
);
