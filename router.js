const express = require("express");
// const AWS = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// const uuid = require("uuid");
const {
  addnewuser,
  getalluser,
  getuser,
  deleteuser,
} = require("./userController");
const router = express.Router();

// const s3Client = new S3Client({
//   region: "us-east-1", // Specify your AWS region
//   credentials: {
//     accessKeyId: "AKIA5FTY7H2YZOFSZEWU",
//     secretAccessKey: "od5gg+GZ//TXOF21nT1Syol/bcwSFDrEbxSzXiX/",
//   },
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3Client, // Use the S3Client directly
//     bucket: "snapfolioprofilepics",
//     key: function (req, file, cb) {
//       const uniqueSuffix = uuid(); // Generate a unique UUID
//       cb(null, `${file.originalname}-${uniqueSuffix}`);
//     },
//   }),
// });

// router.post("/uploadprofilepic/", upload.single("image"), async (req, res) => {
//   try {
//     const imageUrl = req.file.location;
//     res.status(200).json({ imageUrl });
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).json({ error: "Internal server error" }); // Generic error for unexpected issues
//   }
// });

router.post("/", addnewuser);
router.get("/", getalluser);
router.get("/:id", getuser);
router.delete("/:id", deleteuser);

module.exports = router;
