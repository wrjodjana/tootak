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
    if (
      !req.files["image1"] ||
      !req.files["image2"] ||
      !req.files["image3"] ||
      !req.files["image4"] ||
      !req.files["text1"] ||
      !req.files["text2"] ||
      !req.files["text3"] ||
      !req.files["text4"] ||
      !req.files["initialPromptAudio"] ||
      !req.files["finalPromptAudio"] ||
      !req.files["image1Audio"] ||
      !req.files["image2Audio"] ||
      !req.files["image3Audio"] ||
      !req.files["image4Audio"]
    ) {
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

    var image1Audio = req.files["image1Audio"][0];
    params = {
      Bucket: bucketName,
      Key: image1Audio.originalname,
      Body: image1Audio.buffer,
      ContentType: image1Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var image2Audio = req.files["image2Audio"][0];
    params = {
      Bucket: bucketName,
      Key: image2Audio.originalname,
      Body: image2Audio.buffer,
      ContentType: image2Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var image3Audio = req.files["image3Audio"][0];
    params = {
      Bucket: bucketName,
      Key: image3Audio.originalname,
      Body: image3Audio.buffer,
      ContentType: image3Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);

    var image3Audio = req.files["image3Audio"][0];
    params = {
      Bucket: bucketName,
      Key: image3Audio.originalname,
      Body: image3Audio.buffer,
      ContentType: image3Audio.mimetype,
    };
    command = new PutObjectCommand(params);
    await s3.send(command);
    await game16Asset.findOne({ name: req.body.name, module: req.body.module }).then(async (asset) => {
      if (asset) {
        return res.status(200).send("Asset already present in database");
      } else {
        const document = new game12Asset({
          name: req.body.name,
          module: req.body.module,

          image1: image1.originalname,
          image2: image2.originalname,
          image3: image3.originalname,
          image4: image4.originalname,

          text1: text1.originalname,
          text2: text2.originalname,
          text3: text3.originalname,
          text4: text4.originalname,

          initialPromptAudio: initialPromptAudio.originalname,
          finalPromptAudio: finalPromptAudio.originalname,

          image1Audio: image1Audio.originalname,
          image2Audio: image2Audio.originalname,
          image3Audio: image3Audio.originalname,
          image4Audio: image4Audio.originalname,
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
  var flag = false;

  await game12Asset
    .findOne({ name: req.body.name, module: req.body.module })
    .then(async (result) => {
      if (result) {
        // Assets

        var getObjectParams = {
          Bucket: bucketName,
          Key: result.image1,
        };
        var command = new GetObjectCommand(getObjectParams);
        var image1Url = await getSignedUrl(s3, command, { expresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.image2,
        };
        command = new GetObjectCommand(getObjectParams);
        var image2Url = await getSignedUrl(s3, command, { expresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.image3,
        };
        command = new GetObjectCommand(getObjectParams);
        var image3Url = await getSignedUrl(s3, command, { expresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.image4,
        };
        command = new GetObjectCommand(getObjectParams);
        var image4Url = await getSignedUrl(s3, command, { expresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.text1,
        };
        command = new GetObjectCommand(getObjectParams);
        var text1Url = await getSignedUrl(s3, command, { expresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.text2,
        };
        command = new GetObjectCommand(getObjectParams);
        var text2Url = await getSignedUrl(s3, command, { expresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.text3,
        };
        command = new GetObjectCommand(getObjectParams);
        var text3Url = await getSignedUrl(s3, command, { expresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.text4,
        };
        command = new GetObjectCommand(getObjectParams);
        var text4Url = await getSignedUrl(s3, command, { expresIn: 3600 });

        // Audio

        getObjectParams = {
          Bucket: bucketName,
          Key: result.initialPromptAudio,
        };
        command = new GetObjectCommand(getObjectParams);
        var initialPromptAudioUrl = await getSignedUrl(s3, command, { expresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.finalPromptAudio,
        };
        command = new GetObjectCommand(getObjectParams);
        var finalPromptAudioUrl = await getSignedUrl(s3, command, { expresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.image1Audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var image1AudioUrl = await getSignedUrl(s3, command, { expresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.image2Audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var image2AudioUrl = await getSignedUrl(s3, command, { expresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.image3Audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var image3AudioUrl = await getSignedUrl(s3, command, { expresIn: 3600 });

        getObjectParams = {
          Bucket: bucketName,
          Key: result.image4Audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var image4AudioUrl = await getSignedUrl(s3, command, { expresIn: 3600 });

        if (flag == false) {
          res.status(200).send({
            image1: image1Url,
            image2: image2Url,
            image3: image3Url,
            image4: image4Url,

            text1: text1Url,
            text2: text2Url,
            text3: text3Url,
            text4: text4Url,

            initialPromptAudio: initialPromptAudioUrl,
            finalPromptAudio: finalPromptAudioUrl,

            image1Audio: image1AudioUrl,
            image2Audio: image2AudioUrl,
            image3Audio: image3AudioUrl,
            image4Audio: image4AudioUrl,
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
    const assets = await game16Asset.find();
    res.status(200).send(assets);
  } catch (error) {
    res.status(400).send({ error: error.toString() });
  }
};
