const game15AssetAndAudio = require("../model/game15");
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
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

    var image = req.files["image"][0];
    params = {
      Bucket: bucketName,
      Key: image.originalname,
      Body: image.buffer,
      ContentType: image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOptionAudio = req.files["correctOptionAudio"][0];
    params = {
      Bucket: bucketName,
      Key: correctOptionAudio.originalname,
      Body: correctOptionAudio.buffer,
      ContentType: correctOptionAudio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var option1Audio = req.files["option1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: option1Audio.originalname,
      Body: option1Audio.buffer,
      ContentType: option1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var option2Audio = req.files["option2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: option2Audio.originalname,
      Body: option2Audio.buffer,
      ContentType: option2Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    await game15AssetAndAudio
      .findOne({ name: req.body.name, module: req.body.module })
      .then(async (asset) => {
        if (asset) {
          return res.status(200).send("Asset already present in database");
        } else {
          const document = new game15AssetAndAudio({
            name: req.body.name,
            module: req.body.module,

            initialAudioPrompt: initialAudioPrompt.originalname,
            finalAudioPrompt: finalAudioPrompt.originalname,
            image: image.originalname,

            correctOption: {
              audio: correctOptionAudio.originalname,
              text: req.body.correctOptionText,
            },
            option1: {
              audio: option1Audio.originalname,
              text: req.body.option1Text,
            },
            option2: {
              audio: option2Audio.originalname,
              text: req.body.option2Text,
            },
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

const getAsset = async (req, res) => {
  try {
    await game15AssetAndAudio
      .findOne({ name: req.body.name, module: req.body.module })
      .then(async (result) => {
        if (!result) {
          return res.status(200).send("No such scenario exists");
        } else {
          var game15Audios = [];

          getObjectParams = {
            Bucket: bucketName,
            Key: result.initialAudioPrompt,
          };
          command = new GetObjectCommand(getObjectParams);
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

          getObjectParams = {
            Bucket: bucketName,
            Key: result.image,
          };
          command = new GetObjectCommand(getObjectParams);
          var imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

          getObjectParams = {
            Bucket: bucketName,
            Key: result.correctOption.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var correctOptionAudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          game15Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          getObjectParams = {
            Bucket: bucketName,
            Key: result.option1.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var option1AudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          game15Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          getObjectParams = {
            Bucket: bucketName,
            Key: result.option2.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var option2AudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          game15Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          var game15Array = [
            [correctOptionAudioUrl, result.correctOption.text, true], // Correct option, hence 'True'
            [option1AudioUrl, result.option1.text, false], // Incorrect option, hence 'False'
            [option2AudioUrl, result.option2.text, false], // Incorrect option, hence 'False'
          ];
          var shuffled = fisherYatesShuffle(game15Array);

          return res.status(200).send({
            initialAudioPromptUrl,
            finalAudioPromptUrl,
            imageUrl,
            game15: shuffled,
          });
        }
      });
  } catch (error) {}
};

const getAllAssets = async (req, res) => {
  try {
    const assets = await game15AssetAndAudio.find();
    res.status(200).send(assets);
  } catch (error) {
    console.log(error.toString());
    res.status(400).json({ message: "Error. Something went wrong." });
  }
};

const getAssetById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await game15AssetAndAudio.findById(id);

    getObjectParams = {
      Bucket: bucketName,
      Key: result.initialAudioPrompt,
    };
    command = new GetObjectCommand(getObjectParams);
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

    getObjectParams = {
      Bucket: bucketName,
      Key: result.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.correctOption.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var correctOptionAudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.option1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var option1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.option2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var option2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return res.status(200).send({
      result,
      intialAudioPromptUrl,
      finalAudioPromptUrl,
      imageUrl,
      correctOptionAudioUrl,
      option1AudioUrl,
      option2AudioUrl,
    });
  } catch (error) {
    res.status(400).json({ message: "Error. Something went wrong" });
  }
};

const deleteById = async (req, res) => {
  try {
    var asset = await game15AssetAndAudio.findById(req.params.id);

    if (!asset) {
      res.status(404).json({
        message: "Record not found",
      });
      return;
    }

    await game15AssetAndAudio.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "done",
    });
  } catch (error) {
    res.status(400).json({ message: "Error. Something went wrong" });
  }
};

const updateAsset = async (req, res) => {
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

    var image = req.files["image"][0];
    params = {
      Bucket: bucketName,
      Key: image.originalname,
      Body: image.buffer,
      ContentType: image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOptionAudio = req.files["correctOptionAudio"][0];
    params = {
      Bucket: bucketName,
      Key: correctOptionAudio.originalname,
      Body: correctOptionAudio.buffer,
      ContentType: correctOptionAudio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var option1Audio = req.files["option1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: option1Audio.originalname,
      Body: option1Audio.buffer,
      ContentType: option1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var option2Audio = req.files["option2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: option2Audio.originalname,
      Body: option2Audio.buffer,
      ContentType: option2Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    const document = {
      name: req.body.name,
      module: req.body.module,

      initialAudioPrompt: initialAudioPrompt.originalname,
      finalAudioPrompt: finalAudioPrompt.originalname,
      image: image.originalname,

      correctOption: {
        audio: correctOptionAudio.originalname,
        text: req.body.correctOptionText,
      },
      option1: {
        audio: option1Audio.originalname,
        text: req.body.option1Text,
      },
      option2: {
        audio: option2Audio.originalname,
        text: req.body.option2Text,
      },
    };
    await game15AssetAndAudio.updateOne(
      {
        _id: req.params.id,
      },
      document
    );

    res.status(200).json({
      message: "done",
    });
  } catch (error) {
    res.status(400).json({ message: "Error. Something went wrong" });
  }
};

function fisherYatesShuffle(array1) {
  let currentIndex = array1.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array1[currentIndex], array1[randomIndex]] = [
      array1[randomIndex],
      array1[currentIndex],
    ];
  }
  return array1;
}

module.exports = {
  addAsset,
  getAsset,
  getAllAssets,
  getAssetById,
  deleteById,
  updateAsset,
};
