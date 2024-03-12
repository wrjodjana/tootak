const game13AssetAndAudio = require("../model/game13");
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
    var initialAudioPrompt = req.files["initialAudioPrompt"][0];
    var params = {
      Bucket: bucketName,
      Key: initialAudioPrompt.originalname,
      Body: initialAudioPrompt.buffer,
      ContentType: initialAudioPrompt.mimetype,
    };
    var command = new PutObjectCommand(params);
    await s3.send(command);

    var finalAudioPrompt = req.files["finalAudioPrompt"][0];
    params = {
      Bucket: bucketName,
      Key: finalAudioPrompt.originalname,
      Body: finalAudioPrompt.buffer,
      ContentType: finalAudioPrompt.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var audios = [],
      texts = [];

    for (let i = 0; i < 6; i++) {
      var string1 = "audio".concat(i + 1);
      var string2 = "text".concat(i + 1);

      if (!req.files[string1]) break;

      var audioFile = req.files[string1][0];
      var params = {
        Bucket: bucketName,
        Key: audioFile.originalname,
        Body: audioFile.buffer,
        ContentType: audioFile.mimetype,
      };
      var command = new PutObjectCommand(params);
      await s3.send(command);
      audios.push(audioFile.originalname);

      texts.push(req.body[string2.valueOf()]);
    }

    await game13AssetAndAudio.findOne({ name: req.body.name, module: req.body.module }).then(async (asset) => {
      if (asset) {
        return res.status(200).send("Asset already present in the database");
      } else {
        const document = new game13AssetAndAudio({
          name: req.body.name,
          module: req.body.module,

          initialAudioPrompt: initialAudioPrompt.originalname,
          finalAudioPrompt: finalAudioPrompt.originalname,

          audios: audios,
          texts: texts,
        });
        document
          .save()
          .then((result) => {
            return res.status(200).send(result);
          })
          .catch((error) => {
            return res.status(400).send({ error: error.message });
          });
      }
    });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const getAsset = async (req, res) => {
  try {
    await game13AssetAndAudio.findOne({ name: req.body.name, module: req.body.module }).then(async (result) => {
      if (!result) {
        return res.status(200).send("No such scenario exists");
      } else {
        var audios = [];

        var getObjectParams = {
          Bucket: bucketName,
          Key: result.initialAudioPrompt,
        };
        var command = new GetObjectCommand(getObjectParams);
        var initialAudioPromptUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.finalAudioPrompt,
        };
        command = new GetObjectCommand(getObjectParams);
        var finalAudioPromptUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        for (let i = 0; i < result.audios.length; i++) {
          var currentAudio = String(result.audios[i]);

          var getObjectParams = {
            Bucket: bucketName,
            Key: currentAudio,
          };
          var command = new GetObjectCommand(getObjectParams);
          var url = await getSignedUrl(s3, command, { expiresIn: 3600 });
          audios.push(url);
        }

        return res.status(200).send({
          initialAudioPromptUrl,
          finalAudioPromptUrl,
          audios,
          texts: result.texts,
        });
      }
    });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const getAllAssets = async (req, res) => {
  try {
    const assets = await game13AssetAndAudio.find();
    res.status(200).send(assets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAssetById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await game13AssetAndAudio.findById(id);

    var audios = [];

    var getObjectParams = {
      Bucket: bucketName,
      Key: result.initialAudioPrompt,
    };
    var command = new GetObjectCommand(getObjectParams);
    var initialAudioPromptUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.finalAudioPrompt,
    };
    command = new GetObjectCommand(getObjectParams);
    var finalAudioPromptUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    for (let i = 0; i < result.audios.length; i++) {
      var currentAudio = String(result.audios[i]);

      getObjectParams = {
        Bucket: bucketName,
        Key: currentAudio,
      };
      command = new GetObjectCommand(getObjectParams);
      url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      audios.push(url);
    }
    return res.status(200).send({
      result,
      initialAudioPromptUrl,
      finalAudioPromptUrl,
      audios,
    });
  } catch (error) {
    return res.status(400).send("error");
  }
};

const deleteById = async (req, res) => {
  try {
    var asset = await game13AssetAndAudio.findById(req.params.id);

    if (!asset) {
      res.status(404).json({
        message: "Record not found",
      });
      return;
    }

    await game13AssetAndAudio.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "done",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error. Something went wrong" });
  }
};

const updateAsset = async (req, res) => {
  try {
    var audios = [],
      texts = [];

    var initialAudioPrompt = req.files["initialAudioPrompt"][0];
    var params = {
      Bucket: bucketName,
      Key: initialAudioPrompt.originalname,
      Body: initialAudioPrompt.buffer,
      ContentType: initialAudioPrompt.mimetype,
    };
    var command = new PutObjectCommand(params);
    await s3.send(command);

    var finalAudioPrompt = req.files["finalAudioPrompt"][0];
    params = {
      Bucket: bucketName,
      Key: finalAudioPrompt.originalname,
      Body: finalAudioPrompt.buffer,
      ContentType: finalAudioPrompt.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    for (let i = 0; i < 6; i++) {
      var string1 = "audio".concat(i + 1);
      var string2 = "text".concat(i + 1);

      if (!req.files[string1]) break;

      var audioFile = req.files[string2][0];
      params = {
        Bucket: bucketName,
        Key: audioFile.originalname,
        Body: audioFile.buffer,
        ContentType: audioFile.mimetype,
      };
      command = new PutObjectCommand(params);
      await s3.send(command);
      audios.push(audioFile.originalname);

      texts.push(req.body[string2.valueOf()]);
    }

    const document = {
      name: req.body.name,
      module: req.body.module,
      initialAudioPrompt: initialAudioPrompt.originalname,
      finalAudioPrompt: finalAudioPrompt.originalname,
      audios: audios,
      texts: texts,
    };
    await game13AssetAndAudio.updateOne(
      {
        _id: req.params.id,
      },
      document
    );

    res.status(200).json({
      message: "done",
    });
  } catch (error) {
    return res.status(400).send("error");
  }
};

module.exports = {
  addAsset,
  getAsset,
  getAllAssets,
  getAssetById,
  deleteById,
  updateAsset,
};
