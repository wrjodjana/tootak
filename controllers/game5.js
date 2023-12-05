const game5Asset = require('../model/game5Asset');
const game5audio = require('../model/game5Audio');
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



const addAsset = async (req, res) => {
    var imgs = [];
    try {
        for (let i = 0; i < req.files['images'].length; i++) {
            var imageFile = req.files['images'][i];
            var params = {
                Bucket: bucketName,
                Key: imageFile.originalname,
                Body: imageFile.buffer,
                ContentType: imageFile.mimetype
            }

            var command = new PutObjectCommand(params);
            await s3.send(command);
            imgs.push(imageFile.originalname);
        }

    }
    catch (err) {
        res.status(400).send(err);
        return;
    }

    //adding gif
    const gifFile = req.files['Gif'][0];

    if (gifFile != null) {
        var params = {
            Bucket: bucketName,
            Key: gifFile.originalname,
            Body: gifFile.buffer,
            ContentType: gifFile.mimetype
        }

        command = new PutObjectCommand(params);
        await s3.send(command);

    }

    await game5Asset.findOne({ Name: req.body.Name }).then(async (scenario) => {
        if (scenario) {
            res.status(200).send('Scenario already there');
        }
        else {
            if (imgs.length != 6) {
                res.status(400).send('No of images do not match images required');
                return;
            }

            const scene = new game5Asset({ Name: req.body.Name, Images: imgs, Text: req.body.Text, Gif: gifFile.originalname, CorrectImage: req.body.CorrectImage, Letter: req.body.Letter });
            scene.save().then(result => {
                res.status(200).send(result);
            }).catch(err => {
                res.status(400).send({ 'error': err });
            });
        }
    });
}




const addAudio = async (req, res) => {

    const params = {
        Bucket: bucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }

    const command = new PutObjectCommand(params);
    await s3.send(command);
    game5audio.findOne({ Name: req.body.Name }).then(async scenario => {
        if (!scenario) {
            const Audio = new game5audio({
                Name: req.body.Name,
                Audio: req.file.originalname,

            })
            await Audio.save().then(result => { res.status(200).send(result) }).catch(err => {
                res.status(400).send({ 'error': err });
            })
        }
        else {
            res.status(200).send('Audio already added');

        }

    }).catch(err => {
        res.status(400).send({ 'error': err });
    });
};


const getAsset = async (req, res) => {
    var br = false;
    // await game3Asset.findOne({ Name: req.body.Name }).then(async (scenario) => { console.log(Object.values(scenario.Images[0])) });
    await game5Asset.findOne({ Name: req.body.Name }).then(async scenario => {
        if (scenario) {

            var urls = [];
            var img_list = scenario.Images;

            var audio_url = [];
            var correctImageIdx = 0;


            for (let i = 0; i < img_list.length; i++) {

                var img_curr = String(img_list[i]);

                if (scenario.CorrectImage == img_curr) {
                    correctImageIdx = i;
                }

                const getObjectParams = {
                    Bucket: bucketName,
                    Key: img_curr,
                };


                const command = new GetObjectCommand(getObjectParams);

                const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                urls.push(url);


                /// audio

                var curr_audio = String(img_list[i]);
                // var idx = curr_audio.indexOf('.')
                // curr_audio = curr_audio.slice(0, idx)
                // console.log('dd ' + curr_audio + " " + img_list[i]);
                await game5audio.findOne({ Name: curr_audio }).then(async val => {

                    const getObjectParams = {
                        Bucket: bucketName,
                        Key: val.Audio,
                    };
                    const command = new GetObjectCommand(getObjectParams);
                    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                    audio_url.push(url);

                }).catch(err => { res.status(400).send({ 'err 2': err }); br = true; });

                if (br) {
                    break;
                }


                if (br) {
                    break;
                };

                // gif





            }
            var s = 'Prompt' + req.body.Name.charAt(req.body.Name.length - 1);
            // console.log(s);
            var prompt_audio = ''
            await game5audio.findOne({ Name: s }).then(async val => {

                const getObjectParams = {
                    Bucket: bucketName,
                    Key: val.Audio,
                };
                const command = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                prompt_audio = url;

            }).catch(err => { res.status(400).send({ 'err 2': err }); br = true; });

            const getgifParams = {
                Bucket: bucketName,
                Key: scenario.Gif,
            };
            const commandGif = new GetObjectCommand(getgifParams);
            const gifurl = await getSignedUrl(s3, commandGif, { expiresIn: 3600 });
            if (br == false) {
                res.status(200).send({ Images: urls, Audios: audio_url, Text: scenario.Text, CorrectImage: correctImageIdx, promptAudio: prompt_audio, Gif: gifurl });

            }

        }
        else {
            res.status(400).send('No such scenario');
        }
    }).catch(err => {
        res.status(400).send({ 'error 3': err });
    });


}

module.exports = { addAsset, addAudio, getAsset }
