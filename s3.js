const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = "snapfolioprofilepics";
const region = "us-east-1";
const accessKeyId = "AKIA5FTY7H2YZOFSZEWU";
const secretAccessKey = "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";

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename + ".png",
  };

  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;
