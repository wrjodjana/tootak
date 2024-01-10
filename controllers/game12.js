const game12Asset = require("../model/game12Asset");
const game12Audio = require("../model/game12Audio");
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
    if (!req.files["backgroundImage"] || !req.files["wordImage"] || !req.files["gif"]) {
      res.status(400).json({
        message: "One or more fields are missing. Please upload the assets correctly.",
      });
      return;
    }

    var backgroundImage = req.files["backgroundImage"][0];
    var params = {
      Bucket: bucketName,
      Key: backgroundImage.originalname,
      Body: backgroundImage.buffer,
      ContentType: backgroundImage.mimetype,
    };
    var command = new PutObjectCommand(params);
    await s3.send(command);

    var wordImage = req.files["wordImage"][0];
    params = {
      Bucket: bucketName,
      Key: wordImage.originalname,
      Body: wordImage.buffer,
      ContentType: wordImage.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var gif = req.files["gif"][0];
    params = {
      Bucket: bucketName,
      Key: gif.originalname,
      Body: gif.buffer,
      ContentType: gif.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    await game12Asset.findOne({ name: req.body.name, module: req.body.module }).then(async (asset) => {
      if (asset) {
        return res.status(200).send("Asset already present in database");
      } else {
        const document = new game12Asset({
          name: req.body.name,
          module: req.body.module,
          backgroundImage: backgroundImage.originalname,
          wordImage: wordImage.originalname,
          gif: gif.originalname,
        });
        document
          .save()
          .then((result) => {
            res.status(200).send(result);
          })
          .catch((error) => {
            res.status(400).send({ error: error.toString() });
          });
      }
    });
  } catch (error) {
    res.status(400).send({ error: error.toString() });
  }
};

const addAudio = async (req, res) => {
  try {
    if (!req.files["initialPromptAudio"] || !req.files["lastPromptAudio"]) {
      res.status(400).json({
        message: "One or more fields are missing. Please upload the audio correctly.",
      });
      return;
    }

    var initialPromptAudio = req.files["initialPromptAudio"][0];
    var params = {
      Bucket: bucketName,
      Key: initialPromptAudio.originalname,
      Body: initialPromptAudio.buffer,
      ContentType: initialPromptAudio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var lastPromptAudio = req.files["lastPromptAudio"][0];
    params = {
      Bucket: bucketName,
      Key: lastPromptAudio.originalname,
      Body: lastPromptAudio.buffer,
      ContentType: lastPromptAudio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    await game12Audio.findOne({ name: req.body.name, module }).then(async (audio) => {
      if (audio) {
        return res.status(200).send("Audio already present in the database");
      } else {
        const document = new game12Asset({
          name: req.body.name,
          module: req.body.module,
          initialPromptAudio: initialPromptAudio.originalname,
          lastPromptAudio: lastPromptAudio.originalname,
        });
        await document
          .save()
          .then((result) => {
            res.status(200).send(result);
          })
          .catch((error) => {
            res.status(400).send({ error: error.toString() });
          });
      }
    });
  } catch (error) {
    res.status(400).send({ error: error.toString() });
  }
};

const getAssetAndAudio = async (req, res) => {
  var flag = false;

  await game12Asset
    .findOne({ name: req.body.name, module: req.body.module })
    .then(async (result) => {
      if (result) {
        var initialPromptAudioUrl;
        var lastPromptAudioUrl;

        var getObjectParams = {
          Bucket: bucketName,
          Key: result.backgroundImage,
        };
        var command = new GetObjectCommand(getObjectParams);
        var backgroundImageUrl = await getSignedUrl(s3, command, { expresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.wordImage,
        };
        command = new GetObjectCommand(getObjectParams);
        var wordImageUrl = await getSignedUrl(s3, command, { expresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.gif,
        };
        command = new GetObjectCommand(getObjectParams);
        var gifUrl = await getSignedUrl(s3, command, { expresIn: 3600 });

        await game12Audio
          .findOne({ name: req.body.name, module: req.body.module })
          .then(async (audio) => {
            if (!audio) {
              flag = true;
              res.status(400).send({ message: "Audio does not exist for the request" });
              return;
            } else {
              var getObjectParams = {
                Bucket: bucketName,
                Key: audio.initialPromptAudio,
              };
              var command = new GetObjectCommand(getObjectParams);
              initialPromptAudioUrl = await getSignedUrl(s3, command, { expresIn: 3600 });

              getObjectParams = {
                Bucket: bucketName,
                Key: audio.lastPromptAudio,
              };
              command = new GetObjectCommand(getObjectParams);
              lastPromptAudioUrl = await getSignedUrl(s3, command, { expresIn: 3600 });
            }
          })
          .catch((err) => {
            res.status(400).send({ "error 2": err.toString() });
            flag = true;
          });

        if (flag == false) {
          res.status(200).send({
            backgroundImage: backgroundImageUrl,
            wordImage: wordImageUrl,
            gif: gifUrl,
            initialPromptAudio: initialPromptAudioUrl,
            lastPromptAudio: lastPromptAudioUrl,
          });
        }
      } else {
        res.status(404).send("No such scenario in database");
      }
    })
    .catch((error) => {
      res.status(400).send({ error: error.toString() });
    });
};

const getAllAssets = async (req, res) => {
  try {
    const assets = await game12Asset.find();
    res.status(200).send(assets);
  } catch (error) {
    res.status(400).send({ error: error.toString() });
  }
};

const getAllAudios = async (req, res) => {
  try {
    const audios = await game12Audio.find();
    res.status(200).send(audios);
  } catch (error) {
    res.status(400).send({ error: error.toString() });
  }
};

const deleteAsset = async (req, res) => {
  try {
    var asset = await game12Asset.findById(req.params.id);

    if (!asset) {
      res.status(404).json({
        message: "Record not found",
      });
      return;
    }

    await game12Asset.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "done",
    });
  } catch (error) {
    res.status(400).json({ message: "Error. Something went wrong" });
  }
};

const deleteAudio = async (req, res) => {
  try {
    var audio = await game12Audio.findById(req.params.id);

    if (!audio) {
      res.status(404).json({
        message: "Record not found",
      });
      return;
    }

    await game12Audio.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "done",
    });
  } catch (error) {
    res.status(400).json({ message: "Error. Something went wrong" });
  }
};

const updateAsset = async (req, res) => {
  try {
    if (!req.files["backgroundImage"] || !req.files["wordImage"] || !req.files["gif"]) {
      res.status(400).json({
        message: "Please provide the correct files",
      });
      return;
    }

    var backgroundImage = req.files["backgroundImage"][0];

    var params = {
      Bucket: bucketName,
      Key: backgroundImage.originalname,
      Body: backgroundImage.buffer,
      ContentType: backgroundImage.mimetype,
    };
    var command = new PutObjectCommand(params);
    await s3.send(command);

    var wordImage = req.files["wordImage"][0];

    params = {
      Bucket: bucketName,
      Key: wordImage.originalname,
      Body: wordImage.buffer,
      ContentType: wordImage.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var gif = req.files["gif"][0];

    params = {
      Bucket: bucketName,
      Key: gif.originalname,
      Body: gif.buffer,
      ContentType: gif.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    const document = { name: req.body.name, module: req.body.module, backgroundImage: req.body.backgroundImage, wordImage: req.body.wordImage, gif: req.body.gif };
    await game12Asset.updateOne(
      {
        __id: req.params.id,
      },
      document
    );

    res.status(200).json({
      message: "completed",
    });
  } catch (error) {
    res.status(400).send({ message: "Error. Something went wrong" });
  }
};

const updateAudio = async (req, res) => {
  try {
    if (!req.files["initialPromptAudio"] || !req.files["lastPromptAudio"]) {
      res.status(400).json({
        message: "Please upload the files correctly",
      });
      return;
    }

    var initialPromptAudio = req.files["initialPromptAudio"][0];

    var params = {
      Bucket: bucketName,
      Key: initialPromptAudio.originalname,
      Body: initialPromptAudio.buffer,
      ContentType: initialPromptAudio.mimetype,
    };
    var command = new PutObjectCommand(params);
    await s3.send(command);

    var lastPromptAudio = req.files["lastPromptAudio"][0];

    params = {
      Bucket: bucketName,
      Key: lastPromptAudio.originalname,
      Body: lastPromptAudio.buffer,
      ContentType: lastPromptAudio.mimetype,
    };

    command = new PutObjectCommand(params);
    await s3.send(command);

    const document = { name: req.body.name, module: req.body.module, initialPromptAudio: req.body.initialPromptAudio, lastPromptAudio: req.body.lastPromptAudio };

    await game12Audio.updateOne(
      {
        __id: req.params.id,
      },
      document
    );

    res.status(200).json({
      message: "completed",
    });
  } catch (error) {
    res.status(400).json({ message: "Error. Something went wrong" });
  }
};

module.exports = { addAsset, addAudio, getAssetAndAudio, getAllAssets, getAllAudios, deleteAsset, deleteAudio, updateAsset, updateAudio };
