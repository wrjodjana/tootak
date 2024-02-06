const game16AssetAndAudio = require("../model/game16");
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
    var params = {
      Bucket: bucketName,
      Key: finalAudioPrompt.originalname,
      Body: finalAudioPrompt.buffer,
      ContentType: finalAudioPrompt.mimetype,
    };
    var command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption1Image = req.files["correctOption1Image"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption1Image.originalname,
      Body: correctOption1Image.buffer,
      ContentType: correctOption1Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption1Audio = req.files["correctOption1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption1Audio.originalname,
      Body: correctOption1Audio.buffer,
      ContentType: correctOption1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption2Image = req.files["correctOption2Image"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption2Image.originalname,
      Body: correctOption2Image.buffer,
      ContentType: correctOption2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption2Audio = req.files["correctOption2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption2Audio.originalname,
      Body: correctOption2Audio.buffer,
      ContentType: correctOption2Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var option1Image = req.files["option1Image"][0];
    params = {
      Bucket: bucketName,
      Key: option1Image.originalname,
      Body: option1Image.buffer,
      ContentType: option1Image.mimetype,
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

    var option2Image = req.files["option2Image"][0];
    params = {
      Bucket: bucketName,
      Key: option2Image.originalname,
      Body: option2Image.buffer,
      ContentType: option2Image.mimetype,
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

    await game16AssetAndAudio.findOne({ name: req.body.name, module: req.body.module }).then(async (result) => {
      if (!result) {
        const document = new game16AssetAndAudio({
          name: req.body.name,
          module: req.body.module,
          game1: {
            initialAudioPrompt: initialAudioPrompt.originalname,
            finalAudioPrompt: finalAudioPrompt.originalname,
            correctOption1: {
              image: correctOption1Image.originalname,
              audio: correctOption1Audio.originalname,
              text: req.body.correctOption1Text,
            },
            correctOption2: {
              image: correctOption2Image.originalname,
              audio: correctOption2Audio.originalname,
              text: req.body.correctOption2Text,
            },
            option1: {
              image: option1Image.originalname,
              audio: option1Audio.originalname,
              text: req.body.option1Text,
            },
            option2: {
              image: option2Image.originalname,
              audio: option2Audio.originalname,
              text: req.body.option2Text,
            },
          },
        });
        document
          .save()
          .then((result) => {
            return res.status(200).send(result);
          })
          .catch((err) => {
            return res.status(400).send({ error: err.message });
          });
      }
    });
  } catch (error) {
    return res.status(200).send(error.message);
  }
};

const addGame2 = async (req, res) => {
  try {
    var correctOption1Image = req.files["correctOption1Image"][0];
    var params = {
      Bucket: bucketName,
      Key: correctOption1Image.originalname,
      Body: correctOption1Image.buffer,
      ContentType: correctOption1Image.mimetype,
    };
    var command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption1Audio = req.files["correctOption1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption1Audio.originalname,
      Body: correctOption1Audio.buffer,
      ContentType: correctOption1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption2Image = req.files["correctOption2Image"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption2Image.originalname,
      Body: correctOption2Image.buffer,
      ContentType: correctOption2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption2Audio = req.files["correctOption2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption2Audio.originalname,
      Body: correctOption2Audio.buffer,
      ContentType: correctOption2Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var option1Image = req.files["option1Image"][0];
    params = {
      Bucket: bucketName,
      Key: option1Image.originalname,
      Body: option1Image.buffer,
      ContentType: option1Image.mimetype,
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

    var option2Image = req.files["option2Image"][0];
    params = {
      Bucket: bucketName,
      Key: option2Image.originalname,
      Body: option2Image.buffer,
      ContentType: option2Image.mimetype,
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

    await game16AssetAndAudio.findOne({ name: req.body.name, module: req.body.module }).then(async (result) => {
      if (!result) {
        const document = new game16AssetAndAudio({
          name: req.body.name,
          module: req.body.module,
          game2: {
            correctOption1: {
              image: correctOption1Image.originalname,
              audio: correctOption1Audio.originalname,
              text: req.body.correctOption1Text,
            },
            correctOption2: {
              image: correctOption2Image.originalname,
              audio: correctOption2Audio.originalname,
              text: req.body.correctOption2Text,
            },
            option1: {
              image: option1Image.originalname,
              audio: option1Audio.originalname,
              text: req.body.option1Text,
            },
            option2: {
              image: option2Image.originalname,
              audio: option2Audio.originalname,
              text: req.body.option2Text,
            },
          },
        });
        document
          .save()
          .then((result) => {
            return res.status(200).send(result);
          })
          .catch((err) => {
            return res.status(400).send({ error: err.message });
          });
      }
    });
  } catch (error) {
    return res.status(200).send(error.message);
  }
};

const addGame3 = async (req, res) => {
  try {
    var correctOption1Image = req.files["correctOption1Image"][0];
    var params = {
      Bucket: bucketName,
      Key: correctOption1Image.originalname,
      Body: correctOption1Image.buffer,
      ContentType: correctOption1Image.mimetype,
    };
    var command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption1Audio = req.files["correctOption1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption1Audio.originalname,
      Body: correctOption1Audio.buffer,
      ContentType: correctOption1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption2Image = req.files["correctOption2Image"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption2Image.originalname,
      Body: correctOption2Image.buffer,
      ContentType: correctOption2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption2Audio = req.files["correctOption2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption2Audio.originalname,
      Body: correctOption2Audio.buffer,
      ContentType: correctOption2Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var option1Image = req.files["option1Image"][0];
    params = {
      Bucket: bucketName,
      Key: option1Image.originalname,
      Body: option1Image.buffer,
      ContentType: option1Image.mimetype,
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

    var option2Image = req.files["option2Image"][0];
    params = {
      Bucket: bucketName,
      Key: option2Image.originalname,
      Body: option2Image.buffer,
      ContentType: option2Image.mimetype,
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

    await game16AssetAndAudio.findOne({ name: req.body.name, module: req.body.module }).then(async (result) => {
      if (!result) {
        const document = new game16AssetAndAudio({
          name: req.body.name,
          module: req.body.module,
          game3: {
            correctOption1: {
              image: correctOption1Image.originalname,
              audio: correctOption1Audio.originalname,
              text: req.body.correctOption1Text,
            },
            correctOption2: {
              image: correctOption2Image.originalname,
              audio: correctOption2Audio.originalname,
              text: req.body.correctOption2Text,
            },
            option1: {
              image: option1Image.originalname,
              audio: option1Audio.originalname,
              text: req.body.option1Text,
            },
            option2: {
              image: option2Image.originalname,
              audio: option2Audio.originalname,
              text: req.body.option2Text,
            },
          },
        });
        document
          .save()
          .then((result) => {
            return res.status(200).send(result);
          })
          .catch((err) => {
            return res.status(400).send({ error: err.message });
          });
      }
    });
  } catch (error) {
    return res.status(200).send(error.message);
  }
};

const getAsset = async (req, res) => {
  try {
    await game16AssetAndAudio.findOne({ name: req.body.name, module: req.body.module }).then(async (result) => {
      if (!result) {
        return res.status(200).send("No such scenario exists");
      } else {
        // fetching urls for audio
        var getObjectParams = {
          Bucket: bucketName,
          Key: result.initialAudioPrompt,
        };
        var command = new GetObjectCommand(getObjectParams);
        var initialAudioPromptUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.finalAudioPrompt,
        };
        command = new GetObjectCommand(getObjectParams);
        var finalAudioPromptUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        // fetching urls for game 1;
        getObjectParams = {
          Bucket: bucketName,
          Key: result.game1.correctOption1.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var game1CorrectOption1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game1.correctOption1.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var game1CorrectOption1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game1.correctOption2.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var game1CorrectOption2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game1.correctOption2.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var game1CorrectOption2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game1.option1.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var game1Option1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game1.option1.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var game1Option1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game1.option2.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var game1Option2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game1.option2.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var game1Option2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        var game1Array = [
          [game1CorrectOption1ImageUrl, game1CorrectOption1AudioUrl, result.game1.correctOption1.text, true], // Correct option, hence 'True'
          [game1CorrectOption2ImageUrl, game1CorrectOption2AudioUrl, result.game1.correctOption2.text, true], // Correct option, hence 'True'
          [game1Option1ImageUrl, game1Option1AudioUrl, result.game1.option1.text, false], // Incorrect option, hence 'False'
          [game1Option2ImageUrl, game1Option2AudioUrl, result.game1.option2.text, false], // Incorrect option, hence 'False'
        ];
        var shuffled1 = fisherYatesShuffle(game1Array);

        // fetching urls for game 2
        getObjectParams = {
          Bucket: bucketName,
          Key: result.game2.correctOption1.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var game2CorrectOption1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game2.correctOption1.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var game2CorrectOption1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game2.correctOption2.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var game2CorrectOption2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game2.correctOption2.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var game2CorrectOption2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game2.option1.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var game2Option1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game2.option1.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var game2Option1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game2.option2.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var game2Option2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game2.option2.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var game2Option2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        var game2Array = [
          [game2CorrectOption1ImageUrl, game2CorrectOption1AudioUrl, result.game2.correctOption1.text, true], // Correct option, hence 'True'
          [game2CorrectOption2ImageUrl, game2CorrectOption2AudioUrl, result.game2.correctOption2.text, true], // Correct option, hence 'True'
          [game2Option1ImageUrl, game2Option1AudioUrl, result.game2.option1.text, false], // Incorrect option, hence 'False'
          [game2Option2ImageUrl, game2Option2AudioUrl, result.game2.option2.text, false], // Incorrect option, hence 'False'
        ];
        var shuffled2 = fisherYatesShuffle(game2Array);

        // fetching urls for game 3
        getObjectParams = {
          Bucket: bucketName,
          Key: result.game3.correctOption1.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var game3CorrectOption1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game3.correctOption1.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var game3CorrectOption1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game3.correctOption2.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var game3CorrectOption2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game3.correctOption2.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var game3CorrectOption2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game3.option1.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var game3Option1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game3.option1.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var game3Option1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game3.option2.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var game3Option2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.game3.option2.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var game3Option2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        var game3Array = [
          [game3CorrectOption1ImageUrl, game3CorrectOption1AudioUrl, result.game3.correctOption1.text, true], // Correct option, hence 'True'
          [game3CorrectOption2ImageUrl, game3CorrectOption2AudioUrl, result.game3.correctOption2.text, true], // Correct option, hence 'True'
          [game3Option1ImageUrl, game3Option1AudioUrl, result.game3.option1.text, false], // Incorrect option, hence 'False'
          [game3Option2ImageUrl, game3Option2AudioUrl, result.game3.option2.text, false], // Incorrect option, hence 'False'
        ];
        var shuffled3 = fisherYatesShuffle(game3Array);

        return res.status(200).send({
          initialAudioPromptUrl,
          finalAudioPromptUrl,
          game1: shuffled1,
          game2: shuffled2,
          game3: shuffled3,
        });
      }
    });
  } catch (error) {
    return res.status(200).send(error.message);
  }
};

const getAllAssets = async (req, res) => {
  try {
    const assets = await game16AssetAndAudio.find();
    res.status(200).send(assets);
  } catch (error) {
    console.log(error.toString());
    res.status(400).json({ message: "Error. Something went wrong." });
  }
};

const getAssetById = async (req, res) => {
  try {
    // fetching urls for audio
    var getObjectParams = {
      Bucket: bucketName,
      Key: result.initialAudioPrompt,
    };
    var command = new GetObjectCommand(getObjectParams);
    var initialAudioPromptUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.finalAudioPrompt,
    };
    command = new GetObjectCommand(getObjectParams);
    var finalAudioPromptUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    // fetching urls for game 1
    getObjectParams = {
      Bucket: bucketName,
      Key: result.game1.correctOption1.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var game1CorrectOption1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game1.correctOption1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game1CorrectOption1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game1.correctOption2.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var game1CorrectOption2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game1.correctOption2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game1CorrectOption2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game1.option1.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var game1Option1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game1.option1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game1Option1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game1.option2.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var game1Option2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game1.option2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game1Option2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    // fetching urls for game 2
    getObjectParams = {
      Bucket: bucketName,
      Key: result.game2.correctOption1.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var game2CorrectOption1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game2.correctOption1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game2CorrectOption1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game2.correctOption2.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var game2CorrectOption2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game2.correctOption2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game2CorrectOption2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game2.option1.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var game2Option1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game2.option1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game2Option1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game2.option2.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var game2Option2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game2.option2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game2Option2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    // fetching urls for game 3
    getObjectParams = {
      Bucket: bucketName,
      Key: result.game3.correctOption1.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var game3CorrectOption1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game3.correctOption1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game3CorrectOption1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game3.correctOption2.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var game3CorrectOption2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game3.correctOption2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game3CorrectOption2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game3.option1.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var game3Option1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game3.option1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game3Option1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game3.option2.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var game3Option2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.game3.option2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var game3Option2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return res.status(200).send({
      result,
      initialAudioPromptUrl,
      finalAudioPromptUrl,
      game1CorrectOption1ImageUrl,
      game1CorrectOption1AudioUrl,
      game1CorrectOption2ImageUrl,
      game1CorrectOption2AudioUrl,
      game1Option1ImageUrl,
      game1Option1AudioUrl,
      game1Option2ImageUrl,
      game1Option2AudioUrl,
      game2CorrectOption1ImageUrl,
      game2CorrectOption1AudioUrl,
      game2CorrectOption2ImageUrl,
      game2CorrectOption2AudioUrl,
      game2Option1ImageUrl,
      game2Option1AudioUrl,
      game2Option2ImageUrl,
      game2Option2AudioUrl,
      game3CorrectOption1ImageUrl,
      game3CorrectOption1AudioUrl,
      game3CorrectOption2ImageUrl,
      game3CorrectOption2AudioUrl,
      game3Option1ImageUrl,
      game3Option1AudioUrl,
      game3Option2ImageUrl,
      game3Option2AudioUrl,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const deleteById = async (req, res) => {
  try {
    var asset = await game16AssetAndAudio.findById(req.params.id);

    if (!asset) {
      res.status(404).json({
        message: "Record not found",
      });
      return;
    }

    await game10AssetAndAudio.deleteOne({ _id: req.params.id });
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
    var params = {
      Bucket: bucketName,
      Key: finalAudioPrompt.originalname,
      Body: finalAudioPrompt.buffer,
      ContentType: finalAudioPrompt.mimetype,
    };
    var command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption1Image = req.files["correctOption1Image"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption1Image.originalname,
      Body: correctOption1Image.buffer,
      ContentType: correctOption1Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption1Audio = req.files["correctOption1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption1Audio.originalname,
      Body: correctOption1Audio.buffer,
      ContentType: correctOption1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption2Image = req.files["correctOption2Image"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption2Image.originalname,
      Body: correctOption2Image.buffer,
      ContentType: correctOption2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption2Audio = req.files["correctOption2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption2Audio.originalname,
      Body: correctOption2Audio.buffer,
      ContentType: correctOption2Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var option1Image = req.files["option1Image"][0];
    params = {
      Bucket: bucketName,
      Key: option1Image.originalname,
      Body: option1Image.buffer,
      ContentType: option1Image.mimetype,
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

    var option2Image = req.files["option2Image"][0];
    params = {
      Bucket: bucketName,
      Key: option2Image.originalname,
      Body: option2Image.buffer,
      ContentType: option2Image.mimetype,
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
      game1: {
        initialAudioPrompt: initialAudioPrompt.originalname,
        finalAudioPrompt: finalAudioPrompt.originalname,
        correctOption1: {
          image: correctOption1Image.originalname,
          audio: correctOption1Audio.originalname,
          text: req.body.correctOption1Text,
        },
        correctOption2: {
          image: correctOption2Image.originalname,
          audio: correctOption2Audio.originalname,
          text: req.body.correctOption2Text,
        },
        option1: {
          image: option1Image.originalname,
          audio: option1Audio.originalname,
          text: req.body.option1Text,
        },
        option2: {
          image: option2Image.originalname,
          audio: option2Audio.originalname,
          text: req.body.option2Text,
        },
      },
    };
    await game16AssetAndAudio.updateOne(
      {
        _id: req.params.id,
      },
      document
    );

    res.status(200).json({
      message: "done",
    });
  } catch (error) {
    return res.status(200).send(error.message);
  }
};

const updateGame2 = async (req, res) => {
  try {
    var correctOption1Image = req.files["correctOption1Image"][0];
    var params = {
      Bucket: bucketName,
      Key: correctOption1Image.originalname,
      Body: correctOption1Image.buffer,
      ContentType: correctOption1Image.mimetype,
    };
    var command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption1Audio = req.files["correctOption1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption1Audio.originalname,
      Body: correctOption1Audio.buffer,
      ContentType: correctOption1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption2Image = req.files["correctOption2Image"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption2Image.originalname,
      Body: correctOption2Image.buffer,
      ContentType: correctOption2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption2Audio = req.files["correctOption2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption2Audio.originalname,
      Body: correctOption2Audio.buffer,
      ContentType: correctOption2Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var option1Image = req.files["option1Image"][0];
    params = {
      Bucket: bucketName,
      Key: option1Image.originalname,
      Body: option1Image.buffer,
      ContentType: option1Image.mimetype,
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

    var option2Image = req.files["option2Image"][0];
    params = {
      Bucket: bucketName,
      Key: option2Image.originalname,
      Body: option2Image.buffer,
      ContentType: option2Image.mimetype,
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
        correctOption1: {
          image: correctOption1Image.originalname,
          audio: correctOption1Audio.originalname,
          text: req.body.correctOption1Text,
        },
        correctOption2: {
          image: correctOption2Image.originalname,
          audio: correctOption2Audio.originalname,
          text: req.body.correctOption2Text,
        },
        option1: {
          image: option1Image.originalname,
          audio: option1Audio.originalname,
          text: req.body.option1Text,
        },
        option2: {
          image: option2Image.originalname,
          audio: option2Audio.originalname,
          text: req.body.option2Text,
        },
      },
    };
    await game16AssetAndAudio.updateOne(
      {
        _id: req.params.id,
      },
      document
    );

    res.status(200).json({
      message: "done",
    });
  } catch (error) {
    return res.status(200).send(error.message);
  }
};

const updateGame3 = async (req, res) => {
  try {
    var correctOption1Image = req.files["correctOption1Image"][0];
    var params = {
      Bucket: bucketName,
      Key: correctOption1Image.originalname,
      Body: correctOption1Image.buffer,
      ContentType: correctOption1Image.mimetype,
    };
    var command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption1Audio = req.files["correctOption1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption1Audio.originalname,
      Body: correctOption1Audio.buffer,
      ContentType: correctOption1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption2Image = req.files["correctOption2Image"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption2Image.originalname,
      Body: correctOption2Image.buffer,
      ContentType: correctOption2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var correctOption2Audio = req.files["correctOption2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: correctOption2Audio.originalname,
      Body: correctOption2Audio.buffer,
      ContentType: correctOption2Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var option1Image = req.files["option1Image"][0];
    params = {
      Bucket: bucketName,
      Key: option1Image.originalname,
      Body: option1Image.buffer,
      ContentType: option1Image.mimetype,
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

    var option2Image = req.files["option2Image"][0];
    params = {
      Bucket: bucketName,
      Key: option2Image.originalname,
      Body: option2Image.buffer,
      ContentType: option2Image.mimetype,
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
        correctOption1: {
          image: correctOption1Image.originalname,
          audio: correctOption1Audio.originalname,
          text: req.body.correctOption1Text,
        },
        correctOption2: {
          image: correctOption2Image.originalname,
          audio: correctOption2Audio.originalname,
          text: req.body.correctOption2Text,
        },
        option1: {
          image: option1Image.originalname,
          audio: option1Audio.originalname,
          text: req.body.option1Text,
        },
        option2: {
          image: option2Image.originalname,
          audio: option2Audio.originalname,
          text: req.body.option2Text,
        },
      },
    };
    await game16AssetAndAudio.updateOne(
      {
        _id: req.params.id,
      },
      document
    );

    res.status(200).json({
      message: "done",
    });
  } catch (error) {
    return res.status(200).send(error.message);
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
    [array1[currentIndex], array1[randomIndex]] = [array1[randomIndex], array1[currentIndex]];
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
