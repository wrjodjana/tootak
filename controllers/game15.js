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
    // audio

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

    // level 1

    var level1Image = req.files["level1Image"][0];
    params = {
      Bucket: bucketName,
      Key: level1Image.originalname,
      Body: level1Image.buffer,
      ContentType: level1Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level1CorrectOptionAudio = req.files["level1CorrectOptionAudio"][0];
    params = {
      Bucket: bucketName,
      Key: level1CorrectOptionAudio.originalname,
      Body: level1CorrectOptionAudio.buffer,
      ContentType: level1CorrectOptionAudio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level1Option1Audio = req.files["level1Option1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level1Option1Audio.originalname,
      Body: level1Option1Audio.buffer,
      ContentType: level1Option1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level1Option2Audio = req.files["level1Option2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level1Option2Audio.originalname,
      Body: level1Option2Audio.buffer,
      ContentType: level1Option2Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    // level 2

    var level2Image = req.files["level2Image"][0];
    params = {
      Bucket: bucketName,
      Key: level2Image.originalname,
      Body: level2Image.buffer,
      ContentType: level2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level2CorrectOptionAudio = req.files["level2CorrectOptionAudio"][0];
    params = {
      Bucket: bucketName,
      Key: level2CorrectOptionAudio.originalname,
      Body: level2CorrectOptionAudio.buffer,
      ContentType: level2CorrectOptionAudio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level2Option1Audio = req.files["level2Option1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level2Option1Audio.originalname,
      Body: level2Option1Audio.buffer,
      ContentType: level2Option1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level2Option2Audio = req.files["level2Option2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level2Option2Audio.originalname,
      Body: level2Option2Audio.buffer,
      ContentType: level2Option2Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    // level 3

    var level3Image = req.files["level3Image"][0];
    params = {
      Bucket: bucketName,
      Key: level3Image.originalname,
      Body: level3Image.buffer,
      ContentType: level3Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level3CorrectOptionAudio = req.files["level3CorrectOptionAudio"][0];
    params = {
      Bucket: bucketName,
      Key: level3CorrectOptionAudio.originalname,
      Body: level3CorrectOptionAudio.buffer,
      ContentType: level3CorrectOptionAudio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level3Option1Audio = req.files["level3Option1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level3Option1Audio.originalname,
      Body: level3Option1Audio.buffer,
      ContentType: level3Option1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level3Option2Audio = req.files["level3Option2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level3Option2Audio.originalname,
      Body: level3Option2Audio.buffer,
      ContentType: level3Option2Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    await game15Asset
      .findOne({ name: req.body.name, module: req.body.module })
      .then(async (asset) => {
        if (asset) {
          return res.status(200).send("Asset already present in the database");
        } else {
          const document = new game15Asset({
            name: req.body.name,
            module: req.body.module,

            // audio
            initialAudioPrompt: initialAudioPrompt.originalname,
            finalAudioPrompt: finalAudioPrompt.originalname,

            // level1
            level1: {
              level1Image: level1Image.originalname,
              level1CorrectOption: {
                text: req.body.level1CorrectOptionText,
                audio: level1CorrectOptionAudio.originalname,
              },
              level1Option1: {
                text: req.body.level1Option1Text,
                audio: level1Option1Audio.originalname,
              },
              level1Option2: {
                text: req.body.level1Option2Text,
                audio: level1Option2.originalname,
              },
            },

            // level2
            level2: {
              level2Image: level2Image.originalname,
              level2CorrectOption: {
                text: req.body.level2CorrectOptionText,
                audio: level2CorrectOptionAudio.originalname,
              },
              level2Option1: {
                text: req.body.level2Option1Text,
                audio: level2Option1Audio.originalname,
              },
              level2Option2: {
                text: req.body.level2Option2Text,
                audio: level2Option2.originalname,
              },
            },

            // level3
            level3: {
              level3Image: level3Image.originalname,
              level3CorrectOption: {
                text: req.body.level3CorrectOptionText,
                audio: level3CorrectOptionAudio.originalname,
              },
              level3Option1: {
                text: req.body.level3Option1Text,
                audio: level3Option1Audio.originalname,
              },
              level3Option2: {
                text: req.body.level3Option2Text,
                audio: level3Option2.originalname,
              },
            },
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
    res.status(400).send({ error: error.message });
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
          // fetching urls for audio
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

          // fetching urls for level 1

          var level1Audios = [];

          getObjectParams = {
            Bucket: bucketName,
            Key: result.level1.level1Image,
          };
          command = new GetObjectCommand(getObjectParams);
          var level1ImageUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });

          getObjectParams = {
            Bucket: bucketName,
            Key: result.level1.level1CorrectOption.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var level1CorrectOptionAudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          level1Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          getObjectParams = {
            Bucket: bucketName,
            Key: result.level1.level1Option1.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var level1Option1AudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          level1Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          getObjectParams = {
            Bucket: bucketName,
            Key: result.level1.level1Option2.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var level1Option2AudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          level1Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          var level1Array = [
            [
              level1CorrectOptionAudioUrl,
              result.level1.level1CorrectOption.text,
              true,
            ],
            [level1Option1AudioUrl, result.level1.level1Option1.text, false],
            [level1Option2AudioUrl, result.level1.level1Option2.text, false],
          ];
          var shuffled1 = fisherYatesShuffle(level1Array);

          // fetching urls for level 2

          var level2Audios = [];

          getObjectParams = {
            Bucket: bucketName,
            Key: result.level2.level2Image,
          };
          command = new GetObjectCommand(getObjectParams);
          var level2ImageUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });

          getObjectParams = {
            Bucket: bucketName,
            Key: result.level2.level2CorrectOption.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var level2CorrectOptionAudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          level2Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          getObjectParams = {
            Bucket: bucketName,
            Key: result.level2.level2Option1.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var level2Option1AudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          level2Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          getObjectParams = {
            Bucket: bucketName,
            Key: result.level2.level2Option2.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var level2Option2AudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          level2Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          var level2Array = [
            [
              level2CorrectOptionAudioUrl,
              result.level2.level2CorrectOption.text,
              true,
            ],
            [level2Option1AudioUrl, result.level2.level2Option1.text, false],
            [level2Option2AudioUrl, result.level2.level2Option2.text, false],
          ];
          var shuffled2 = fisherYatesShuffle(level2Array);

          // fetching urls for level 3

          var level3Audios = [];

          getObjectParams = {
            Bucket: bucketName,
            Key: result.level3.level3Image,
          };
          command = new GetObjectCommand(getObjectParams);
          var level3ImageUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });

          getObjectParams = {
            Bucket: bucketName,
            Key: result.level3.leve32CorrectOption.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var level3CorrectOptionAudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          level3Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          getObjectParams = {
            Bucket: bucketName,
            Key: result.level3.level3Option1.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var level3Option1AudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          level3Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          getObjectParams = {
            Bucket: bucketName,
            Key: result.level3.level3Option2.audio,
          };
          command = new GetObjectCommand(getObjectParams);
          var level3Option2AudioUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          level3Audios.push(
            await getSignedUrl(s3, command, { expiresIn: 3600 })
          );

          var level3Array = [
            [
              level3CorrectOptionAudioUrl,
              result.level3.level3CorrectOption.text,
              true,
            ],
            [level3Option1AudioUrl, result.level3.level3Option1.text, false],
            [level3Option2AudioUrl, result.level3.level3Option2.text, false],
          ];
          var shuffled3 = fisherYatesShuffle(level3Array);

          return res.status(200).send({
            initialAudioPromptUrl,
            finalAudioPromptUrl,
            level1ImageUrl,
            level2ImageUrl,
            level3ImageUrl,
            level1: shuffled1,
            level2: shuffled2,
            level3: shuffled3,
          });
        }
      });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAllAssets = async (req, res) => {
  try {
    const assets = await game15AssetAndAudio.find();
    res.status(200).send(assets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAssetById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await game15AssetAndAudio.findById(id);

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

    // get level 1 urls

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level1.level1Image,
    };
    command = new GetObjectCommand(getObjectParams);
    var level1ImageUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level1.level1CorrectOption.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var level1CorrectOptionAudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level1.level1Option1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var level1Option1AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level1.level1Option2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var level1Option2AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    // get level 2 urls

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level2.level2Image,
    };
    command = new GetObjectCommand(getObjectParams);
    var level2ImageUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level2.level2CorrectOption.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var level2CorrectOptionAudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level2.level2Option1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var level2Option1AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level2.level2Option2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var level2Option2AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    // get level 3 urls

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level3.level3Image,
    };
    command = new GetObjectCommand(getObjectParams);
    var level3ImageUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level3.leve32CorrectOption.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var level3CorrectOptionAudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });
    level3Audios.push(await getSignedUrl(s3, command, { expiresIn: 3600 }));

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level3.level3Option1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var level3Option1AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });
    level3Audios.push(await getSignedUrl(s3, command, { expiresIn: 3600 }));

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level3.level3Option2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var level3Option2AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });
    level3Audios.push(await getSignedUrl(s3, command, { expiresIn: 3600 }));

    return res.status(200).send({
      result,
      initialAudioPromptUrl,
      finalAudioPromptUrl,
      level1ImageUrl,
      level1CorrectOptionAudioUrl,
      level1Option1AudioUrl,
      level1Option2AudioUrl,
      level2ImageUrl,
      level2CorrectOptionAudioUrl,
      level2Option1AudioUrl,
      level2Option2AudioUrl,
      level3ImageUrl,
      level3CorrectOptionAudioUrl,
      level3Option1AudioUrl,
      level3Option2AudioUrl,
    });
  } catch (error) {
    return res.status(400).send({ error: error.message });
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

    // level 1

    var level1Image = req.files["level1Image"][0];
    params = {
      Bucket: bucketName,
      Key: level1Image.originalname,
      Body: level1Image.buffer,
      ContentType: level1Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level1CorrectOptionAudio = req.files["level1CorrectOptionAudio"][0];
    params = {
      Bucket: bucketName,
      Key: level1CorrectOptionAudio.originalname,
      Body: level1CorrectOptionAudio.buffer,
      ContentType: level1CorrectOptionAudio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level1Option1Audio = req.files["level1Option1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level1Option1Audio.originalname,
      Body: level1Option1Audio.buffer,
      ContentType: level1Option1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level1Option2Audio = req.files["level1Option2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level1Option2Audio.originalname,
      Body: level1Option2Audio.buffer,
      ContentType: level1Option2Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    // level 2

    var level2Image = req.files["level2Image"][0];
    params = {
      Bucket: bucketName,
      Key: level2Image.originalname,
      Body: level2Image.buffer,
      ContentType: level2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level2CorrectOptionAudio = req.files["level2CorrectOptionAudio"][0];
    params = {
      Bucket: bucketName,
      Key: level2CorrectOptionAudio.originalname,
      Body: level2CorrectOptionAudio.buffer,
      ContentType: level2CorrectOptionAudio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level2Option1Audio = req.files["level2Option1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level2Option1Audio.originalname,
      Body: level2Option1Audio.buffer,
      ContentType: level2Option1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level2Option2Audio = req.files["level2Option2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level2Option2Audio.originalname,
      Body: level2Option2Audio.buffer,
      ContentType: level2Option2Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    // level 3

    var level3Image = req.files["level3Image"][0];
    params = {
      Bucket: bucketName,
      Key: level3Image.originalname,
      Body: level3Image.buffer,
      ContentType: level3Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level3CorrectOptionAudio = req.files["level3CorrectOptionAudio"][0];
    params = {
      Bucket: bucketName,
      Key: level3CorrectOptionAudio.originalname,
      Body: level3CorrectOptionAudio.buffer,
      ContentType: level3CorrectOptionAudio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level3Option1Audio = req.files["level3Option1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level3Option1Audio.originalname,
      Body: level3Option1Audio.buffer,
      ContentType: level3Option1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level3Option2Audio = req.files["level3Option2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level3Option2Audio.originalname,
      Body: level3Option2Audio.buffer,
      ContentType: level3Option2Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    const document = {
      name: req.body.name,
      module: req.body.module,

      // audio
      initialAudioPrompt: initialAudioPrompt.originalname,
      finalAudioPrompt: finalAudioPrompt.originalname,

      // level1
      level1: {
        level1Image: level1Image.originalname,
        level1CorrectOption: {
          text: req.body.level1CorrectOptionText,
          audio: level1CorrectOptionAudio.originalname,
        },
        level1Option1: {
          text: req.body.level1Option1Text,
          audio: level1Option1Audio.originalname,
        },
        level1Option2: {
          text: req.body.level1Option2Text,
          audio: level1Option2.originalname,
        },
      },

      // level2
      level2: {
        level2Image: level2Image.originalname,
        level2CorrectOption: {
          text: req.body.level2CorrectOptionText,
          audio: level2CorrectOptionAudio.originalname,
        },
        level2Option1: {
          text: req.body.level2Option1Text,
          audio: level2Option1Audio.originalname,
        },
        level2Option2: {
          text: req.body.level2Option2Text,
          audio: level2Option2.originalname,
        },
      },

      // level3
      level3: {
        level3Image: level3Image.originalname,
        level3CorrectOption: {
          text: req.body.level3CorrectOptionText,
          audio: level3CorrectOptionAudio.originalname,
        },
        level3Option1: {
          text: req.body.level3Option1Text,
          audio: level3Option1Audio.originalname,
        },
        level3Option2: {
          text: req.body.level3Option2Text,
          audio: level3Option2.originalname,
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
    return res.status(400).send({ error: message });
  }
};

module.exports = {
  addAsset,
  getAsset,
  getAllAssets,
  getAssetById,
  deleteById,
  updateAsset
};
