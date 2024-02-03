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

    await game16AssetAndAudio.findOne({ name: req.body.name, module: req.body.module }).then(async (asset) => {
      if (asset) {
        return res.status(200).send("Asset already present in database");
      } else {
        const document = new game16AssetAndAudio({
          name: req.body.name,
          module: req.body.module,

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
    await game16AssetAndAudio.findOne({ name: req.body.name, module: req.body.module }).then(async (result) => {
      if (!result) {
        return res.status(200).send("No such scenario exists");
      } else {
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
          Key: result.correctOption1.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var correctOption1ImageUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.correctOption1.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var correctOption1AudioUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.correctOption2.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var correctOption2ImageUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.correctOption2.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var correctOption2AudioUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.option1.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var option1ImageUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.option1.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var option1AudioUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.option2.image,
        };
        command = new GetObjectCommand(getObjectParams);
        var option2ImageUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.option2.audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var option2AudioUrl = await getSignedUrl(s3, command, {
          expiresIn: 3600,
        });

        var game16Array = [
          [correctOption1ImageUrl, correctOption1AudioUrl, result.correctOption1.text, true], // Correct option, hence 'True'
          [correctOption2ImageUrl, correctOption2AudioUrl, result.correctOption2.text, true], // Correct option, hence 'True'
          [option1ImageUrl, option1AudioUrl, result.option1.text, false], // Incorrect option, hence 'False'
          [option2ImageUrl, option2AudioUrl, result.option2.text, false], // Incorrect option, hence 'False'
        ];

        var shuffled = fisherYatesShuffle(game16Array);

        return res.status(200).send({
          initialAudioPromptUrl,
          finalAudioPromptUrl,
          game16: shuffled,
        });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "Error. Something went wrong" });
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
    const id = req.params.id;
    const result = await game16AssetAndAudio.findById(id);

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
      Key: result.correctOption1.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var correctOption1ImageUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.correctOption1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var correctOption1AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.correctOption2.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var correctOption2ImageUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.correctOption2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var correctOption2AudioUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.option1.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var option1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.option1.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var option1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.option2.image,
    };
    command = new GetObjectCommand(getObjectParams);
    var option2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    getObjectParams = {
      Bucket: bucketName,
      Key: result.option2.audio,
    };
    command = new GetObjectCommand(getObjectParams);
    var option2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return res.status(200).send({
      result,
      initialAudioPromptUrl,
      finalAudioPromptUrl,
      correctOption1ImageUrl,
      correctOption1AudioUrl,
      correctOption2ImageUrl,
      correctOption2AudioUrl,
      option1ImageUrl,
      option1AudioUrl,
      option2ImageUrl,
      option2AudioUrl,
    });
  } catch (error) {
    res.status(400).json({ message: "Error. Something went wrong" });
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
      name: req.body.name,
      module: req.body.module,

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
