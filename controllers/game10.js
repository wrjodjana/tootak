const game10Asset = require("../model/game8Asset");
const game10Audio = require("../model/game8Audio");
const { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

dotenv.config();

// AWS S3 configuration
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
  var storyImage1 = req.files["storyImage1"][0];

  var params = {
    Bucket: bucketName,
    Key: storyImage1.originalname,
    Body: storyImage1.buffer,
    ContentType: storyImage1.mimetype,
  };

  var command = new PutObjectCommand(params);
  await s3.send(command);

  var storyImage2 = req.files["storyImage2"][0];

  var params = {
    Bucket: bucketName,
    Key: storyImage2.originalname,
    Body: storyImage2.buffer,
    ContentType: storyImage2.mimetype,
  };

  var command = new PutObjectCommand(params);
  await s3.send(command);

  var storyImage3 = req.files["storyImage3"][0];

  var params = {
    Bucket: bucketName,
    Key: storyImage3.originalname,
    Body: storyImage3.buffer,
    ContentType: storyImage3.mimetype,
  };

  var command = new PutObjectCommand(params);
  await s3.send(command);

  var storyImage1 = req.files["storyImage4"][0];

  var params = {
    Bucket: bucketName,
    Key: storyImage4.originalname,
    Body: storyImage4.buffer,
    ContentType: storyImage4.mimetype,
  };

  var command = new PutObjectCommand(params);
  await s3.send(command);

  // storing data in mongodb
  var Asset;
  var flag = false;
  await game10Asset.findOne({ name: req.body.name }).then(async (asset) => {
    if (asset) {
      flag = true;
      return res.status(200).send("Asset already inside the database");
    } else {
      const document = new game10Asset({
        name: req.body.name,
        storyImage1: storyImage1.originalname,
        storyImage2: storyImage2.originalname,
        storyImage3: storyImage3.originalname,
        storyImage4: storyImage4.originalname,
        storyText1: storyText1.originalname,
        storyText2: storyText2.originalname,
        storyText3: storyText3.originalname,
        storyText4: storyText4.originalname,
      });
      document
        .save()
        .then((result) => {
          Asset = result;
          console.log("Asset added successfully");
        })
        .catch((err) => {
          res.status(400).send({ error: err.toString() });
          return;
        });
    }
  });

  if (flag) {
    return;
  }
};

const addAudio = async (req, res) => {
  var storyAudio1 = req.files["storyAudio1"][0];

  var params = {
    Bucket: bucketName,
    Key: storyAudio1.originalname,
    Body: storyAudio1.buffer,
    ContentType: storyAudio1.mimetype,
  };
  command = new PutObjectCommand(params);
  await s3.send(command);

  var storyAudio2 = req.files["storyAudio2"][0];

  var params = {
    Bucket: bucketName,
    Key: storyAudio2.originalname,
    Body: storyAudio2.buffer,
    ContentType: storyAudio2.mimetype,
  };
  command = new PutObjectCommand(params);
  await s3.send(command);

  var storyAudio3 = req.files["storyAudio3"][0];

  var params = {
    Bucket: bucketName,
    Key: storyAudio3.originalname,
    Body: storyAudio3.buffer,
    ContentType: storyAudio3.mimetype,
  };
  command = new PutObjectCommand(params);
  await s3.send(command);

  var storyAudio1 = req.files["storyAudio4"][0];

  var params = {
    Bucket: bucketName,
    Key: storyAudio4.originalname,
    Body: storyAudio4.buffer,
    ContentType: storyAudio4.mimetype,
  };
  command = new PutObjectCommand(params);
  await s3.send(command);

  var promptAudio = req.files["promptAudio"][0];

  var params = {
    Bucket: bucketName,
    Key: promptAudio.originalname,
    Body: promptAudio.buffer,
    ContentType: promptAudio.mimetype,
  };
  command = new PutObjectCommand(params);
  await s3.send(command);

  game10Audio
    .findOne({ Name: req.body.name })
    .then(async (audio) => {
      if (!audio) {
        const document = new game10Audio({
          name: req.body.name,
          storyAudio1: storyAudio1.originalname,
          storyAudio2: storyAudio2.originalname,
          storyAudio3: storyAudio3.originalname,
          storyAudio4: storyAudio4.originalname,
          promptAudio: promptAudio.originalname,
        });
        await document
          .save()
          .then((result) => {
            res.status(200).send(result);
          })
          .catch((error) => {
            res.status(400).send({ error: error.toString() });
          });
      } else {
        res.status(200).send("Audio already inside the database");
      }
    })
    .catch((error) => {
      res.status(400).send({ error: error.toString() });
    });
};

const getAsset = async (req, res) => {
  var flag = false;

  await game10Asset
    .findOne({ name: req.body.name })
    .then(async (result) => {
      if (result) {
        var getObjectParams = {
          Bucket: bucketName,
          Key: result.storyImage1,
        };
        command = new GetObjectCommand(getObjectParams);
        var storyImage1Url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        var getObjectParams = {
          Bucket: bucketName,
          Key: result.storyImage2,
        };
        command = new GetObjectCommand(getObjectParams);
        var storyImage2Url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        var getObjectParams = {
          Bucket: bucketName,
          Key: result.storyImage3,
        };
        command = new GetObjectCommand(getObjectParams);
        var storyImage3Url = await getSignedUrl(s3, command, { expresIn: 3600 });

        var getObjectParams = {
          Bucket: bucketName,
          Key: result.storyImage4,
        };
        command = new GetObjectCommand(getObjectParams);
        var storyImage4Url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        if (flag == false) {
          res.status(200).send({
            storyImage1: storyImage1Url,
            storyImage2: storyImage2Url,
            storyImage3: storyImage3Url,
            storyImage4: storyImage4Url,
          });
        }
      } else {
        res.status(400).send("No scenario in the database");
      }
    })
    .catch((error) => {
      res.status(400).send({ error: error.toString() });
    });
};

const getAudio = async (req, res) => {
  var flag = false;
  await game10Audio
    .findOne({ name: req.body.name })
    .then(async (result) => {
      if (result) {
        var getObjectParams = {
          Bucket: bucketName,
          Key: result.storyAudio1,
        };
        command = new GetObjectCommand(getObjectParams);
        var storyAudio1Url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        var getObjectParams = {
          Bucket: bucketName,
          Key: result.storyAudio2,
        };
        command = new GetObjectCommand(getObjectParams);
        var storyAudio2Url = await getSignedUrl(s3, command, { expressIn: 3600 });

        var getObjectParams = {
          Bucket: bucketName,
          Key: result.storyAudio3,
        };
        command = new GetObjectCommand(getObjectParams);
        var storyAudio3Url = await getSignedUrl(s3, command, { expressIn: 3600 });

        var getObjectParams = {
          Bucket: bucketName,
          Key: result.storyAudio4,
        };
        command = new GetObjectCommand(getObjectParams);
        var storyAudio4Url = await getSignedUrl(s3, command, { expressIn: 3600 });

        var getObjectParams = {
          Bucket: bucketName,
          Key: result.promptAudio,
        };
        command = new GetObjectCommand(getObjectParams);
        var promptAudioUrl = await getSignedUrl(s3, command, { expressIn: 3600 });

        if (flag == false) {
          res.status(200).send({
            storyAudio1: storyAudio1Url,
            storyAudio2: storyAudio2Url,
            storyAudio3: storyAudio3Url,
            storyAudio4: storyAudio4Url,
            promptAudio: promptAudioUrl,
          });
        }
      } else {
        res.status(400).send("No scenario in the database");
      }
    })
    .catch((error) => {
      res.status(400).send({ error: error.toString() });
    });
};

const getAllAssets = async (req, res) => {
  try {
    const assets = await game8Asset.find();
    res.status(200).send(assets);
  } catch (error) {
    res.status(400).send({ error: error.toString() });
  }
};

const getAllAudios = async (req, res) => {
  try {
    const audios = await game8Audio.find();
    res.status(200).send(audios);
  } catch (error) {
    res.status(400).send({ error: error.toString() });
  }
};

const deleteAsset = async (req, res) => {
  try {
    await game8Asset.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "done",
    });
  } catch (error) {
    res.send(error);
  }
};

const deleteAudio = async (req, res) => {
  try {
    await game8Audio.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "done",
    });
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getAudio, getAsset, getAllAssets, getAllAudios, deleteAsset, deleteAudio };
