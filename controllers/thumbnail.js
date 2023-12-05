const gameThumbnail = require('../model/gameThumbnail');
const { S3Client, PutObjectCommand, GetObjectCommand, S3, ListBucketInventoryConfigurationsOutputFilterSensitiveLog } = require("@aws-sdk/client-s3");
const dotenv = require('dotenv');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const video = require('../model/video');

const game5 = require('../model/game5Asset.js');

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


const addThumbnail = async (req, res) => {


    var params = {
        Bucket: bucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }

    var command = new PutObjectCommand(params);
    await s3.send(command);

    await gameThumbnail.findOne({ Scenario: req.body.Scenario, Game: req.body.Game, Module: req.body.Module, Type: req.body.Type }).then(async scenario => {

        if (scenario) {
            res.status(200).send('Thumbnail for the Scenario of the game already there');

        }
        else {

            const thumbnail = new gameThumbnail({ Scenario: req.body.Scenario, ThumbnailImage: req.file.originalname, Game: req.body.Game, Type: req.body.Type, Module: req.body.Module, Letter: req.body.Letter });
            thumbnail.save().then(result => { res.status(200).send(result) }).catch(err => {
                res.status(400).send({ 'error': err });
            });
        }
    }).catch(err => {
        res.status(400).send({ 'error': err });
    });

}
const getThumbnail = async (req, res) => {
    var videos = [];
    var video_letter = [];
    await video.find({ Module: req.body.Module }).then(async (result) => {
        for (let i = 0; i < result.length; i++) {
            const getObjectParams = {
                Bucket: bucketName,
                Key: result[i].video,
            };

            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            videos.push(url);
            video_letter.push(result[i].Letter);
        }
    }).catch(err => { res.status(400).send({ "err": error }); return; });


    await gameThumbnail.find({ Module: req.body.Module }).then(async result => {
        img_urls = [];
        for (let i = 0; i < result.length; i++) {
            const getObjectParams = {
                Bucket: bucketName,
                Key: result[i].ThumbnailImage,
            };

            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            img_urls.push(url);

        }
        res.status(200).send({ 'data': result, 'images': img_urls, 'videos': videos, 'letters': video_letter });
    }).catch(err => res.status(400).send({ 'err': err }));
}

// const update = async (req, res) => {
//     await gameThumbnail.find().then(async result => {
//         console.log('odjf ' + result.length);
//         for (let i = 0; i < result.length; i++) {
//             if (result[i].Game == '5') {
//                 console.log(i + ' ' + result[i].Scenario);
//                 try {
//                     var l = ''
//                     await game5.findOne({ Name: result[i].Scenario }).then(resp => l = resp.Letter);
//                     // console.log(l);
//                     await gameThumbnail.updateOne({ _id: result[i].id }, { Letter: l });
//                     await gameThumbnail.findOne({ _id: result[i].id }).then(resul => console.log(l + " " + resul.Letter));

//                 }
//                 catch (err) {
//                     console.log('err ' + err);

//                 }


//             }

//         }

//     }).catch(err => res.status(400).send({ 'err': err }));

// }

module.exports = { addThumbnail, getThumbnail }
