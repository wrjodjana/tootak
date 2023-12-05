const videoSchema = require('../model/video');
const { S3Client, PutObjectCommand, GetObjectCommand, S3, ListBucketInventoryConfigurationsOutputFilterSensitiveLog } = require("@aws-sdk/client-s3");
const dotenv = require('dotenv');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

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
    region: bucketRegion
});


const addVideo = async (req, res) => {
    var params = {
        Bucket: bucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }

    var command = new PutObjectCommand(params);
    await s3.send(command);
    await videoSchema.findOne({ Letter: req.body.Letter, Module: req.body.Module }).then((result) => {
        if (result) {
            res.status(200).send('video of the game already there');
        }
        else {
            const video = new videoSchema({ video: req.file.originalname, Letter: req.body.Letter, Module: req.body.Module });
            video.save().then(result2 => res.status(200).send(result2)).catch(err => res.status(400).send({ 'err': err }));
        }
    }).catch(err => res.status(400).send({ 'err': err }));


}
const getVideo = async (req, res) => {
    await videoSchema.find({ Module: req.body.Module }).then(async result => {
        video_urls = [];
        letter = [];
        for (let i = 0; i < result.length; i++) {
            const getObjectParams = {
                Bucket: bucketName,
                Key: result[i].video,
            };

            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            video_urls.push(url);
            letter.push(result[i].Letter);

        }
        res.status(200).send({ 'letter': letter, 'videos': video_urls });
    }).catch(err => res.status(400).send({ 'err': err }));
}

module.exports = {
    addVideo, getVideo
}