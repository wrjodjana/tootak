const game16Asset = require("../model/game16Asset");
const { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

dotenv.config();
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const addAsset = async (req, res) => {
  try {
    if (!req.files["image1"] || !req.files["image2"] || !req.files["image3"] || !req.files["image4"] || !req.files["text1"] || !req.files["text2"] || !req.files["text3"] || req.files["text4"] || req.files["initialPromptAudio"] || req.files["finalPromptAudio"] || req.files["image1Audio"] || req.files["image2Audio"] || req.files["image3Audio"] || req.files["image4Audio"]) {
      res.status(400).json({
        message: "One or more fields are missing. Please upload the assets correctly.",
      });
      return;
    }

    var image1 = req.files["image1"][0];
    var params = {
      Bucket: bucketName,
      Key: image1.originalname,
      Body: image1.buffer,
      ContentType: image1.mimetype,
    };
    var command = new PutObjectCommand(params);
    await s3.send(command);

    var image2 = req.files["image2"][0];
    params = {
      Bucket: bucketName,
      Key: image2.originalname,
      Body: image2.buffer,
      ContentType: image2.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var image3 = req.files["image3"][0];
    params = {
      Bucket: bucketName,
      Key: image3.originalname,
      Body: image3.buffer,
      ContentType: image3.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var image4 = req.files["image4"][0];
    params = {
      Bucket: bucketName,
      Key: image4.originalname,
      Body: image4.buffer,
      ContentType: image4.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var text1 = req.files["text1"][0];
    params = {
      Bucket: bucketName,
      Key: text1.originalname,
      Body: text1.buffer,
      ContentType: text1.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var text2 = req.files["text2"][0];
    params = {
      Bucket: bucketName,
      Key: text2.originalname,
      Body: text2.buffer,
      ContentType: text2.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var text3 = req.files["text3"][0];
    params = {
      Bucket: bucketName,
      Key: text3.originalname,
      Body: text3.buffer,
      ContentType: text3.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var text4 = req.files["text4"][0];
    params = {
      Bucket: bucketName,
      Key: text4.originalname,
      Body: text4.buffer,
      ContentType: text4.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var initialPromptAudio = req.files["initialPromptAudio"][0];
    params = {
      Bucket: bucketName,
      Key: initialPromptAudio.originalname,
      Body: initialPromptAudio.buffer,
      ContentType: initialPromptAudio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var finalPromptAudio = req.files["finalPromptAudio"][0];
    params = {
      Bucket: bucketName,
      Key: finalPromptAudio.originalname,
      Body: finalPromptAudio.buffer,
      ContentType: finalPromptAudio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

  }
}
