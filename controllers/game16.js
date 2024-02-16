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

    // level 1

    var level1CorrectOption1Image = req.files["level1CorrectOption1Image"][0];
    params = {
      Bucket: bucketName,
      Key: level1CorrectOption1Image.originalname,
      Body: level1CorrectOption1Image.buffer,
      ContentType: level1CorrectOption1Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level1CorrectOption2Image = req.files["level1CorrectOption2Image"][0];
    params = {
      Bucket: bucketName,
      Key: level1CorrectOption2Image.originalname,
      Body: level1CorrectOption2Image.buffer,
      ContentType: level1CorrectOption2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level1Option1Image = req.files["level1Option1Image"][0];
    params = {
      Bucket: bucketName,
      Key: level1Option1Image.originalname,
      Body: level1Option1Image.buffer,
      ContentType: level1Option1Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level1Option2Image = req.files["level1Option2Image"][0];
    params = {
      Bucket: bucketName,
      Key: level1Option2Image.originalname,
      Body: level1Option2Image.buffer,
      ContentType: level1Option2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level1CorrectOption1Audio = req.files["level1CorrectOption1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level1CorrectOption1Audio.originalname,
      Body: level1CorrectOption1Audio.buffer,
      ContentType: level1CorrectOption1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level1CorrectOption2Audio = req.files["level1CorrectOption2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level1CorrectOption2Audio.originalname,
      Body: level1CorrectOption2Audio.buffer,
      ContentType: level1CorrectOption2Audio.mimetype,
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

    var level2CorrectOption1Image = req.files["level2CorrectOption1Image"][0];
    params = {
      Bucket: bucketName,
      Key: level2CorrectOption1Image.originalname,
      Body: level2CorrectOption1Image.buffer,
      ContentType: level2CorrectOption1Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level2CorrectOption2Image = req.files["level2CorrectOption2Image"][0];
    params = {
      Bucket: bucketName,
      Key: level2CorrectOption2Image.originalname,
      Body: level2CorrectOption2Image.buffer,
      ContentType: level2CorrectOption2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level2Option1Image = req.files["level2Option1Image"][0];
    params = {
      Bucket: bucketName,
      Key: level2Option1Image.originalname,
      Body: level2Option1Image.buffer,
      ContentType: level2Option1Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level2Option2Image = req.files["level2Option2Image"][0];
    params = {
      Bucket: bucketName,
      Key: level2Option2Image.originalname,
      Body: level2Option2Image.buffer,
      ContentType: level2Option2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level2CorrectOption1Audio = req.files["level2CorrectOption1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level2CorrectOption1Audio.originalname,
      Body: level2CorrectOption1Audio.buffer,
      ContentType: level2CorrectOption1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level2CorrectOption2Audio = req.files["level2CorrectOption2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level2CorrectOption2Audio.originalname,
      Body: level2CorrectOption2Audio.buffer,
      ContentType: level2CorrectOption2Audio.mimetype,
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

    var level3CorrectOption1Image = req.files["level3CorrectOption1Image"][0];
    params = {
      Bucket: bucketName,
      Key: level3CorrectOption1Image.originalname,
      Body: level3CorrectOption1Image.buffer,
      ContentType: level3CorrectOption1Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level3CorrectOption2Image = req.files["level3CorrectOption2Image"][0];
    params = {
      Bucket: bucketName,
      Key: level3CorrectOption2Image.originalname,
      Body: level3CorrectOption2Image.buffer,
      ContentType: level3CorrectOption2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level3Option1Image = req.files["level3Option1Image"][0];
    params = {
      Bucket: bucketName,
      Key: level3Option1Image.originalname,
      Body: level3Option1Image.buffer,
      ContentType: level3Option1Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level3Option2Image = req.files["level3Option2Image"][0];
    params = {
      Bucket: bucketName,
      Key: level3Option2Image.originalname,
      Body: level3Option2Image.buffer,
      ContentType: level3Option2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level3CorrectOption1Audio = req.files["level3CorrectOption1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level3CorrectOption1Audio.originalname,
      Body: level3CorrectOption1Audio.buffer,
      ContentType: level3CorrectOption1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level3CorrectOption2Audio = req.files["level3CorrectOption2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level3CorrectOption2Audio.originalname,
      Body: level3CorrectOption2Audio.buffer,
      ContentType: level3CorrectOption2Audio.mimetype,
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

    await game16AssetAndAudio.findOne({ name: req.body.name, module: req.body.module }).then(async (asset) => {
      if (asset) {
        return res.status(200).send("Asset already present in the database");
      } else {
        const document = new game16AssetAndAudio({
          name: req.body.name,
          module: req.body.module,

          // audio
          initialAudioPrompt: initialAudioPrompt.originalname,
          finalAudioPrompt: finalAudioPrompt.originalname,

          // level1
          level1: {
            level1CorrectOption1: {
              image: level1CorrectOption1Image.originalname,
              audio: level1CorrectOption1Audio.originalname,
              text: req.body.level1CorrectOption1Text,
            },
            level1CorrectOption2: {
              image: level1CorrectOption2Image.originalname,
              audio: level1CorrectOption2Audio.originalname,
              text: req.body.level1CorrectOption2Text,
            },
            level1Option1: {
              image: level1Option1Image.originalname,
              audio: level1Option1Audio.originalname,
              text: req.body.level1Option1Text,
            },
            level1Option2: {
              image: level1Option2Image.originalname,
              audio: level1Option2.originalname,
              text: req.body.level1Option2Text,
            },
          },

          // level2
          level2: {
            level2CorrectOption1: {
              image: level2CorrectOption1Image.originalname,
              audio: level2CorrectOption1Audio.originalname,
              text: req.body.level2CorrectOption1Text,
            },
            level2CorrectOption2: {
              image: level2CorrectOption2Image.originalname,
              audio: level2CorrectOption2Audio.originalname,
              text: req.body.level2CorrectOption2Text,
            },
            level2Option1: {
              image: level2Option1Image.originalname,
              audio: level2Option1Audio.originalname,
              text: req.body.level2Option1Text,
            },
            level2Option2: {
              image: level2Option2Image.originalname,
              audio: level2Option2.originalname,
              text: req.body.level2Option2Text,
            },
          },

          // level3
          level3: {
            level3CorrectOption1: {
              image: level3CorrectOption1Image.originalname,
              audio: level3CorrectOption1Audio.originalname,
              text: req.body.level3CorrectOption1Text,
            },
            level3CorrectOption2: {
              image: level3CorrectOption2Image.originalname,
              audio: level3CorrectOption2Audio.originalname,
              text: req.body.level3CorrectOption2Text,
            },
            level3Option1: {
              image: level3Option1Image.originalname,
              audio: level3Option1Audio.originalname,
              text: req.body.level3Option1Text,
            },
            level3Option2: {
              image: level3Option2Image.originalname,
              audio: level3Option2.originalname,
              text: req.body.level3Option2Text,
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
    return res.status(400).send({ error: error.message });
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
          Key: result.level1.level1CorrectOption1.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var level1CorrectOption1ImageUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.level1.level1CorrectOption1.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var level1CorrectOption1AudioUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });
        level1Audios.push(await getSignedUrl(s3, command, { expiresIn: 3600 }));

        getObjectParams = {
          Bucket: bucketName,
          Key: result.level1.level1CorrectOption2.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var level1CorrectOption2ImageUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.level1.level1CorrectOption2.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var level1CorrectOption2AudioUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });
        level1Audios.push(await getSignedUrl(s3, command, { expiresIn: 3600 }));

        getObjectParams = {
          Bucket: bucketName,
          Key: result.level1.level1Option1.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var level1Option1ImageUrl = await getSignedUrl(s3, command, {
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
        level1Audios.push(await getSignedUrl(s3, command, { expiresIn: 3600 }));

        getObjectParams = {
          Bucket: bucketName,
          Key: result.level1.level1Option2.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var level1Option2ImageUrl = await getSignedUrl(s3, command, {
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
        level1Audios.push(await getSignedUrl(s3, command, { expiresIn: 3600 }));

        var level1Array = [
          [level1CorrectOption1ImageUrl, level1CorrectOption1AudioUrl, result.level1.level1CorrectOption1.text, true],
          [level1CorrectOption2ImageUrl, level1CorrectOption2AudioUrl, result.level1.level1CorrectOption2.text, true],
          [level1Option1ImageUrl, level1Option1AudioUrl, result.level1.level1Option1.text, false],
          [level1Option2ImageUrl, level1Option2AudioUrl, result.level1.level1Option2.text, false],
        ];
        var shuffled1 = fisherYatesShuffle(level1Array);

        // fetching urls for level 2

        var level2Audios = [];

        getObjectParams = {
          Bucket: bucketName,
          Key: result.level2.level2CorrectOption1.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var level2CorrectOption1ImageUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.level2.level2CorrectOption1.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var level2CorrectOption1AudioUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });
        level2Audios.push(await getSignedUrl(s3, command, { expiresIn: 3600 }));

        getObjectParams = {
          Bucket: bucketName,
          Key: result.level2.level2CorrectOption2.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var level2CorrectOption2ImageUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.level2.level2CorrectOption2.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var level2CorrectOption2AudioUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });
        level2Audios.push(await getSignedUrl(s3, command, { expiresIn: 3600 }));

        getObjectParams = {
          Bucket: bucketName,
          Key: result.level2.level2Option1.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var level2Option1ImageUrl = await getSignedUrl(s3, command, {
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
        level2Audios.push(await getSignedUrl(s3, command, { expiresIn: 3600 }));

        getObjectParams = {
          Bucket: bucketName,
          Key: result.level2.level2Option2.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var level2Option2ImageUrl = await getSignedUrl(s3, command, {
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
        level2Audios.push(await getSignedUrl(s3, command, { expiresIn: 3600 }));

        var level2Array = [
          [level2CorrectOption1ImageUrl, level2CorrectOption1AudioUrl, result.level2.level2CorrectOption1.text, true],
          [level2CorrectOption2ImageUrl, level2CorrectOption2AudioUrl, result.level2.level2CorrectOption2.text, true],
          [level2Option1ImageUrl, level2Option1AudioUrl, result.level2.level2Option1.text, false],
          [level2Option2ImageUrl, level2Option2AudioUrl, result.level2.level2Option2.text, false],
        ];
        var shuffled2 = fisherYatesShuffle(level2Array);

        // fetching urls for level 3

        var level3Audios = [];

        getObjectParams = {
          Bucket: bucketName,
          Key: result.level3.level3CorrectOption1.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var level3CorrectOption1ImageUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.level3.level3CorrectOption1.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var level3CorrectOption1AudioUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });
        level3Audios.push(await getSignedUrl(s3, command, { expiresIn: 3600 }));

        getObjectParams = {
          Bucket: bucketName,
          Key: result.level3.level3CorrectOption2.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var level3CorrectOption2ImageUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.level3.level3CorrectOption2.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var level3CorrectOption2AudioUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });
        level3Audios.push(await getSignedUrl(s3, command, { expiresIn: 3600 }));

        getObjectParams = {
          Bucket: bucketName,
          Key: result.level3.level3Option1.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var level3Option1ImageUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

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
          Key: result.level3.level3Option2.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var level3Option2ImageUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.level3.level3Option2.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var level3Option2AudioUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });
        level3Audios.push(await getSignedUrl(s3, command, { expiresIn: 3600 }));

        var level3Array = [
          [level3CorrectOption1ImageUrl, level3CorrectOption1AudioUrl, result.level3.level3CorrectOption1.text, true],
          [level3CorrectOption2ImageUrl, level3CorrectOption2AudioUrl, result.level3.level3CorrectOption2.text, true],
          [level3Option1ImageUrl, level3Option1AudioUrl, result.level3.level3Option1.text, false],
          [level3Option2ImageUrl, level3Option2AudioUrl, result.level3.level3Option2.text, false],
        ];
        var shuffled3 = fisherYatesShuffle(level3Array);

        return res.status(200).send({
          initialAudioPromptUrl,
          finalAudioPromptUrl,
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
    const assets = await game16AssetAndAudio.find();
    res.status(200).send(assets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAssetById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await game16AssetAndAudio.findById(id);

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

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level1.level1CorrectOption1.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var level1CorrectOption1ImageUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level1.level1CorrectOption1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var level1CorrectOption1AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level1.level1CorrectOption2.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var level1CorrectOption2ImageUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level1.level1CorrectOption2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var level1CorrectOption2AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level1.level1Option1.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var level1Option1ImageUrl = await getSignedUrl(s3, command, {
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
      Key: result.level1.level1Option2.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var level1Option2ImageUrl = await getSignedUrl(s3, command, {
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

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level2.level2CorrectOption1.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var level2CorrectOption1ImageUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level2.level2CorrectOption1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var level2CorrectOption1AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level2.level2CorrectOption2.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var level2CorrectOption2ImageUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level2.level2CorrectOption2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var level2CorrectOption2AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level2.level2Option1.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var level2Option1ImageUrl = await getSignedUrl(s3, command, {
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
      Key: result.level2.level2Option2.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var level2Option2ImageUrl = await getSignedUrl(s3, command, {
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

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level3.level3CorrectOption1.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var level3CorrectOption1ImageUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level3.level3CorrectOption1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var level3CorrectOption1AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level3.level3CorrectOption2.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var level3CorrectOption2ImageUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level3.level3CorrectOption2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var level3CorrectOption2AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level3.level3Option1.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var level3Option1ImageUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level3.level3Option1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var level3Option1AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level3.level3Option2.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var level3Option2ImageUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.level3.level3Option2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var level3Option2AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    return res.status(200).send({
      result,
      initialAudioPromptUrl,
      finalAudioPromptUrl,
      level1CorrectOption1ImageUrl,
      level1CorrectOption1AudioUrl,
      level1CorrectOption2ImageUrl,
      level1CorrectOption2AudioUrl,
      level1Option1ImageUrl,
      level1Option1AudioUrl,
      level1Option2ImageUrl,
      level1Option2AudioUrl,
      level2CorrectOption1ImageUrl,
      level2CorrectOption1AudioUrl,
      level2CorrectOption2ImageUrl,
      level2CorrectOption2AudioUrl,
      level2Option1ImageUrl,
      level2Option1AudioUrl,
      level2Option2ImageUrl,
      level2Option2AudioUrl,
      level3CorrectOption1ImageUrl,
      level3CorrectOption1AudioUrl,
      level3CorrectOption2ImageUrl,
      level3CorrectOption2AudioUrl,
      level3Option1ImageUrl,
      level3Option1AudioUrl,
      level3Option2ImageUrl,
      level3Option2AudioUrl,
    });
  } catch (error) {
    return res.status(400).send({ error: error.message });
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

    await game16AssetAndAudio.deleteOne({ _id: req.params.id });
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

    var level1CorrectOption1Image = req.files["level1CorrectOption1Image"][0];
    params = {
      Bucket: bucketName,
      Key: level1CorrectOption1Image.originalname,
      Body: level1CorrectOption1Image.buffer,
      ContentType: level1CorrectOption1Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level1CorrectOption2Image = req.files["level1CorrectOption2Image"][0];
    params = {
      Bucket: bucketName,
      Key: level1CorrectOption2Image.originalname,
      Body: level1CorrectOption2Image.buffer,
      ContentType: level1CorrectOption2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level1Option1Image = req.files["level1Option1Image"][0];
    params = {
      Bucket: bucketName,
      Key: level1Option1Image.originalname,
      Body: level1Option1Image.buffer,
      ContentType: level1Option1Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level1Option2Image = req.files["level1Option2Image"][0];
    params = {
      Bucket: bucketName,
      Key: level1Option2Image.originalname,
      Body: level1Option2Image.buffer,
      ContentType: level1Option2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level1CorrectOption1Audio = req.files["level1CorrectOption1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level1CorrectOption1Audio.originalname,
      Body: level1CorrectOption1Audio.buffer,
      ContentType: level1CorrectOption1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level1CorrectOption2Audio = req.files["level1CorrectOption2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level1CorrectOption2Audio.originalname,
      Body: level1CorrectOption2Audio.buffer,
      ContentType: level1CorrectOption2Audio.mimetype,
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

    var level2CorrectOption1Image = req.files["level2CorrectOption1Image"][0];
    params = {
      Bucket: bucketName,
      Key: level2CorrectOption1Image.originalname,
      Body: level2CorrectOption1Image.buffer,
      ContentType: level2CorrectOption1Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level2CorrectOption2Image = req.files["level2CorrectOption2Image"][0];
    params = {
      Bucket: bucketName,
      Key: level2CorrectOption2Image.originalname,
      Body: level2CorrectOption2Image.buffer,
      ContentType: level2CorrectOption2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level2Option1Image = req.files["level2Option1Image"][0];
    params = {
      Bucket: bucketName,
      Key: level2Option1Image.originalname,
      Body: level2Option1Image.buffer,
      ContentType: level2Option1Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level2Option2Image = req.files["level2Option2Image"][0];
    params = {
      Bucket: bucketName,
      Key: level2Option2Image.originalname,
      Body: level2Option2Image.buffer,
      ContentType: level2Option2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level2CorrectOption1Audio = req.files["level2CorrectOption1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level2CorrectOption1Audio.originalname,
      Body: level2CorrectOption1Audio.buffer,
      ContentType: level2CorrectOption1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level2CorrectOption2Audio = req.files["level2CorrectOption2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level2CorrectOption2Audio.originalname,
      Body: level2CorrectOption2Audio.buffer,
      ContentType: level2CorrectOption2Audio.mimetype,
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

    var level3CorrectOption1Image = req.files["level3CorrectOption1Image"][0];
    params = {
      Bucket: bucketName,
      Key: level3CorrectOption1Image.originalname,
      Body: level3CorrectOption1Image.buffer,
      ContentType: level3CorrectOption1Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level3CorrectOption2Image = req.files["level3CorrectOption2Image"][0];
    params = {
      Bucket: bucketName,
      Key: level3CorrectOption2Image.originalname,
      Body: level3CorrectOption2Image.buffer,
      ContentType: level3CorrectOption2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level3Option1Image = req.files["level3Option1Image"][0];
    params = {
      Bucket: bucketName,
      Key: level3Option1Image.originalname,
      Body: level3Option1Image.buffer,
      ContentType: level3Option1Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level3Option2Image = req.files["level3Option2Image"][0];
    params = {
      Bucket: bucketName,
      Key: level3Option2Image.originalname,
      Body: level3Option2Image.buffer,
      ContentType: level3Option2Image.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level3CorrectOption1Audio = req.files["level3CorrectOption1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level3CorrectOption1Audio.originalname,
      Body: level3CorrectOption1Audio.buffer,
      ContentType: level3CorrectOption1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var level3CorrectOption2Audio = req.files["level3CorrectOption2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: level3CorrectOption2Audio.originalname,
      Body: level3CorrectOption2Audio.buffer,
      ContentType: level3CorrectOption2Audio.mimetype,
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
        level1CorrectOption1: {
          image: level1CorrectOption1Image.originalname,
          audio: level1CorrectOption1Audio.originalname,
          text: req.body.level1CorrectOption1Text,
        },
        level1CorrectOption2: {
          image: level1CorrectOption2Image.originalname,
          audio: level1CorrectOption2Audio.originalname,
          text: req.body.level1CorrectOption2Text,
        },
        level1Option1: {
          image: level1Option1Image.originalname,
          audio: level1Option1Audio.originalname,
          text: req.body.level1Option1Text,
        },
        level1Option2: {
          image: level1Option2Image.originalname,
          audio: level1Option2.originalname,
          text: req.body.level1Option2Text,
        },
      },

      // level2
      level2: {
        level2CorrectOption1: {
          image: level2CorrectOption1Image.originalname,
          audio: level2CorrectOption1Audio.originalname,
          text: req.body.level2CorrectOption1Text,
        },
        level2CorrectOption2: {
          image: level2CorrectOption2Image.originalname,
          audio: level2CorrectOption2Audio.originalname,
          text: req.body.level2CorrectOption2Text,
        },
        level2Option1: {
          image: level2Option1Image.originalname,
          audio: level2Option1Audio.originalname,
          text: req.body.level2Option1Text,
        },
        level2Option2: {
          image: level2Option2Image.originalname,
          audio: level2Option2.originalname,
          text: req.body.level2Option2Text,
        },
      },

      // level3
      level3: {
        level3CorrectOption1: {
          image: level3CorrectOption1Image.originalname,
          audio: level3CorrectOption1Audio.originalname,
          text: req.body.level3CorrectOption1Text,
        },
        level3CorrectOption2: {
          image: level3CorrectOption2Image.originalname,
          audio: level3CorrectOption2Audio.originalname,
          text: req.body.level3CorrectOption2Text,
        },
        level3Option1: {
          image: level3Option1Image.originalname,
          audio: level3Option1Audio.originalname,
          text: req.body.level3Option1Text,
        },
        level3Option2: {
          image: level3Option2Image.originalname,
          audio: level3Option2.originalname,
          text: req.body.level3Option2Text,
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
    return res.status(400).send({ error: message });
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
  addAsset,
  getAsset,
  getAllAssets,
  getAssetById,
  deleteById,
  updateAsset,
};
