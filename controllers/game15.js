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

const addGame1 = async (req, res) => {
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
    var command = new PutObjectCommand(params);
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
      .then(async (result) => {
        if (!result) {
          const document = new game15AssetAndAudio({
            name: req.body.name,
            module: req.body.module,
            initialAudioPrompt: initialAudioPrompt.originalname,
            finalAudioPrompt: finalAudioPrompt.originalname,
            game1: {
              image: image.originalname,
              correctOption: {
                text: req.body.correctOptionText,
                audio: correctOptionAudio.originalname,
              },
              option1: {
                text: req.body.option1Text,
                audio: option1Audio.originalname,
              },
              option2: {
                text: req.body.option2Text,
                audio: option2Audio.originalname,
              },
            },
          })
          document.save().then(result => {
            return res.status(200).send(result);
        }).catch(err => {
            return res.status(400).send({ 'error': err.message });
        });
        } else {
          return res.status(200).send(error.message);
        }
      });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

const addGame2 = async (req, res) => {
  try {
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
      .then(async (result) => {
        if (!result) {
          const document = new game15AssetAndAudio({
            name: req.body.name,
            module: req.body.module,
            game2: {
              image: image.originalname,
              correctOption: {
                text: req.body.correctOptionText,
                audio: correctOptionAudio.originalname,
              },
              option1: {
                text: req.body.option1Text,
                audio: option1Audio.originalname,
              },
              option2: {
                text: req.body.option2Text,
                audio: option2Audio.originalname,
              },
            },
          })  
          document.save().then(result => {
            return res.status(200).send(result);
        }).catch(err => {
            return res.status(400).send({ 'error': err.message });
        });
        } else {
          return res.status(200).send("Scenario already inside the database")
        }
      });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

const addGame3 = async (req, res) => {
  try {
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
      .then(async (result) => {
        if (!result) {
          const document = new game15AssetAndAudio({
            name: req.body.name,
            module: req.body.module,
            game3: {
              initialAudioPrompt: initialAudioPrompt.originalname,
              finalAudioPrompt: finalAudioPrompt.originalname,
              image: image.originalname,
              correctOption: {
                text: req.body.correctOptionText,
                audio: correctOptionAudio.originalname,
              },
              option1: {
                text: req.body.option1Text,
                audio: option1Audio.originalname,
              },
              option2: {
                text: req.body.option2Text,
                audio: option2Audio.originalname,
              },
            },
          })                 
            document.save().then(result => {
            return res.status(200).send(result);
        }).catch(err => {
            return res.status(400).send({ 'error': err.message });
        });
        } else {
          return res.status(200).send(error.message);
        }
      });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

const getAsset = async (req, res) => {
  try {
    await game15AssetAndAudio
      .findOne({ name: req.body.name, module: req.body.module })
      .then(async (result) => {
        if (!result) {
          return res.status(200).send("No scenario exists");
        } else {
          // urls for audios
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

          // fetching urls for game 1
          var game1Audios = [];

          getObjectParams = {
            Bucket: bucketName,
            Key: result.game1.image,
          };
          command = new GetObjectCommand(getObjectParams);
          var game1ImageUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });

          getObjectParams = {
            Bucket: bucketName,
            Key: result.game1.correctOption.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var game1CorrectOptionAudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          game1Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          getObjectParams = {
            Bucket: bucketName,
            Key: result.game1.option1.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var game1Option1AudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          game1Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          getObjectParams = {
            Bucket: bucketName,
            Key: result.game1.option2.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var game1Option2AudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          game1Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          var game1Array = [
            [game1CorrectOptionAudioUrl, result.game1.correctOption.text, true], // Correct option, hence 'True'
            [game1Option1AudioUrl, result.game1.option1.text, false], // Incorrect option, hence 'False'
            [game1Option2AudioUrl, result.game1.option2.text, false], // Incorrect option, hence 'False'
          ];
          var shuffled1 = fisherYatesShuffle(game1Array);

          // fetching urls for game 2
          var game2Audios = [];

          getObjectParams = {
            Bucket: bucketName,
            Key: result.game2.image,
          };
          command = new GetObjectCommand(getObjectParams);
          var game2ImageUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });

          getObjectParams = {
            Bucket: bucketName,
            Key: result.game2.correctOption.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var game2CorrectOptionAudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          game2Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          getObjectParams = {
            Bucket: bucketName,
            Key: result.game2.option1.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var game2Option1AudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          game2Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          getObjectParams = {
            Bucket: bucketName,
            Key: result.game2.option2.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var game2Option2AudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          game2Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          var game2Array = [
            [game2CorrectOptionAudioUrl, result.game2.correctOption.text, true], // Correct option, hence 'True'
            [game2Option1AudioUrl, result.game2.option1.text, false], // Incorrect option, hence 'False'
            [game2Option2AudioUrl, result.game2.option2.text, false], // Incorrect option, hence 'False'
          ];
          var shuffled2 = fisherYatesShuffle(game2Array);

          // fetching urls for game 3
          var game3Audios = [];

          getObjectParams = {
            Bucket: bucketName,
            Key: result.game3.image,
          };
          command = new GetObjectCommand(getObjectParams);
          var game3ImageUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });

          getObjectParams = {
            Bucket: bucketName,
            Key: result.game3.correctOption.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var game3CorrectOptionAudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          game3Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          getObjectParams = {
            Bucket: bucketName,
            Key: result.game3.option1.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var game3Option1AudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          game3Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          getObjectParams = {
            Bucket: bucketName,
            Key: result.game3.option2.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var game3Option2AudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          game3Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          var game3Array = [
            [game3CorrectOptionAudioUrl, result.game3.correctOption.text, true], // Correct option, hence 'True'
            [game3Option1AudioUrl, result.game3.option1.text, false], // Incorrect option, hence 'False'
            [game3Option2AudioUrl, result.game3.option2.text, false], // Incorrect option, hence 'False'
          ];
          var shuffled3 = fisherYatesShuffle(game3Array);

          return res.status(200).send({
            initialAudioPromptUrl,
            finalAudioPromptUrl,
            game1ImageUrl,
            game2ImageUrl,
            game3ImageUrl,
            game1: shuffled1,
            game2: shuffled2,
            game3: shuffled3,
          });
        }
      });
  } catch (error) {
    return res.status(400).send(error.message);
  }
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

    // fetching urls for audio
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

    // fetching urls for game 1
    getObjectParams = {
      Bucket: bucketName,
      Key: result.game1.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var game1ImageUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game1.correctOption.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game1CorrectOptionAudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game1.option1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game1Option1AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game1.option2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game1Option2AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    // fetching urls for game 2
    getObjectParams = {
      Bucket: bucketName,
      Key: result.game2.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var game2ImageUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game2.correctOption.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game2CorrectOptionAudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game2.option1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game2Option1AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game2.option2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game2Option2AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    // fetching urls for game 3
    getObjectParams = {
      Bucket: bucketName,
      Key: result.game3.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var game3ImageUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game3.correctOption.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game3CorrectOptionAudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game3.option1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game3Option1AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game3.option2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game3Option2AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    return res.status(200).send({
      result,
      initialAudioPromptUrl,
      finalAudioPromptUrl,
      game1ImageUrl,
      game1CorrectOptionAudioUrl,
      game1Option1AudioUrl,
      game1Option2AudioUrl,
      game2ImageUrl,
      game2CorrectOptionAudioUrl,
      game2Option1AudioUrl,
      game2Option2AudioUrl,
      game3ImageUrl,
      game3CorrectOptionAudioUrl,
      game3Option1AudioUrl,
      game3Option2AudioUrl,
    });
  } catch (error) {
    return res.status(400).send(error.message);
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
    console.log(error);
    res.status(400).json({ message: "Error. Something went wrong" });
  }
};

const updateGame1 = async (req, res) => {
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
    var command = new PutObjectCommand(params);
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
      initialAudioPrompt: initialAudioPrompt.originalname,
      finalAudioPrompt: finalAudioPrompt.originalname,

      game1: {
        image: image.originalname,
        correctOption: {
          text: req.body.correctOptionText,
          audio: correctOptionAudio.originalname,
        },
        option1: {
          text: req.body.option1Text,
          audio: option1Audio.originalname,
        },
        option2: {
          text: req.body.option2Text,
          audio: option2Audio.originalname,
        },
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
    return res.status(400).send(error.message);
  }
};

const updateGame2 = async (req, res) => {
  try {
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
      game2: {
        image: image.originalname,
        correctOption: {
          text: req.body.correctOptionText,
          audio: correctOptionAudio.originalname,
        },
        option1: {
          text: req.body.option1Text,
          audio: option1Audio.originalname,
        },
        option2: {
          text: req.body.option2Text,
          audio: option2Audio.originalname,
        },
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
    return res.status(400).send(error.message);
  }
};

const updateGame3 = async (req, res) => {
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
    var command = new PutObjectCommand(params);
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
      game3: {
        image: image.originalname,
        correctOption: {
          text: req.body.correctOptionText,
          audio: correctOptionAudio.originalname,
        },
        option1: {
          text: req.body.option1Text,
          audio: option1Audio.originalname,
        },
        option2: {
          text: req.body.option2Text,
          audio: option2Audio.originalname,
        },
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
    return res.status(400).send(error.message);
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
  addGame1,
  addGame2,
  addGame3,
  getAsset,
  getAllAssets,
  getAssetById,
  deleteById,
  updateGame1,
  updateGame2,
  updateGame3,
};
