const express = require('express');
const game1Img = require('../model/game1');
// const game1Thumbnail = require('../model/gameThumbnail');
const pharsiName = require('../model/PharsiNames');
const audio = require('../model/game1Audio');
const { S3Client, PutObjectCommand, GetObjectCommand, S3, ListBucketInventoryConfigurationsOutputFilterSensitiveLog } = require("@aws-sdk/client-s3");
const dotenv = require('dotenv');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const PharsiNames = require('../model/PharsiNames');

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


const addImage = async (req, res) => {

    const imageFile = req.files['image'][0];
    const centerFile = req.files['centerImage'][0];


    var params = {
        Bucket: bucketName,
        Key: imageFile.originalname,
        Body: imageFile.buffer,
        ContentType: imageFile.mimetype
    }

    var command = new PutObjectCommand(params);
    await s3.send(command);
    // console.log(req.body.Name);
    if (centerFile != null) {
        // console.log('hoo');
        params = {
            Bucket: bucketName,
            Key: centerFile.originalname,
            Body: centerFile.buffer,
            ContentType: centerFile.mimetype
        }

        command = new PutObjectCommand(params);
        await s3.send(command);

    }

    // var collection_count = 0;
    // if (collection_count == 0) {
    //     const scene = new game1Img({ Name: req.body.Name, Images: [req.file.originalname] });
    //     scene.save().then(result => { res.status(200).send(result) }).catch(err => {
    //         res.status(400).send({ 'error1': err });
    //     });

    // }
    await game1Img.findOne({ Name: req.body.Name }).then(async scenario => {

        if (scenario) {
            var image_list = scenario.Images;
            const imageFile = req.files['image'][0];
            image_list.push(imageFile.originalname);
            // console.log(image_list);
            try {
                const PharsiN = new PharsiNames({ ImageName: imageFile.originalname, Text: req.body.PharsiText });
                PharsiN.save().then().catch(err => { res.status(400).send({ 'err in pharsiNames': err }); return; });

                await game1Img.updateOne({ Name: req.body.Name }, { Images: image_list });

                res.status(200).send('successfully added to scenario ' + req.body.Name);
            }
            catch (err) {
                res.status(400).send({ 'error': err });
            }

        }
        else {

            const scene = new game1Img({ Name: req.body.Name, Images: [imageFile.originalname], CenterImage: centerFile.originalname, BottomText: req.body.BottomText });

            const PharsiN = new PharsiNames({ ImageName: imageFile.originalname, Text: req.body.PharsiText });

            PharsiN.save().then().catch(err => { res.status(400).send(err); return; });

            scene.save().then(result => { res.status(200).send(result) }).catch(err => {
                res.status(400).send({ 'error': err });
            });
        }
    }).catch(err => {
        res.status(400).send({ 'error': err });
    });


};


const getImage = async (req, res) => {
    // console.log(req.body.ImageName);

    await game1Img.findOne({ Name: req.body.Name }).then(async scenario => {
        if (scenario) {

            var urls = [];
            var img_list = scenario.Images;

            for (let i = 0; i < img_list.length; i++) {

                const getObjectParams = {
                    Bucket: bucketName,
                    Key: img_list[i],
                };

                const command = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                urls.push(url);
            }
            const getObjectParams = {
                Bucket: bucketName,
                Key: scenario.CenterImage,
            };

            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            res.status(200).send({ Images: urls, Center: url });
        }
        else {
            res.status(400).send('No such scenario');
        }
    }).catch(err => {
        res.status(400).send({ 'error': err });
    });



};

const addAudio = async (req, res) => {

    const params = {
        Bucket: bucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }

    const command = new PutObjectCommand(params);
    await s3.send(command);
    audio.findOne({ Name: req.body.Name }).then(async scenario => {
        if (!scenario) {
            const Audio = new audio({
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


const getAudio = async (req, res) => {
    var audios = req.body.Audio;

    var urls = [];
    var br = false;
    for (let i = 0; i < audios.length; i++) {

        await audio.findOne({ Name: audios[i] }).then(async val => {
            // console.log('hou ' + val);
            const getObjectParams = {
                Bucket: bucketName,
                Key: val.Audio,
            };
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            urls.push(url);

        }).catch(err => { res.status(400).send({ 'err': err }); br = true; });

        if (br == true) {
            break;
        }


    }
    res.status(200).send(urls);
}

// const abcd = (req, res) => {
//     console.log("hdaopf");
//     const imageFile = req.files['image'][0];
//     // console.log(imageFile.originalname);
//     res.send('o');
// }

const numberOfScenario = (req, res) => {
    // game1Img.find().count((err,count)=>{
    //     if(err){
    //         res.status(400).send(err);
    //     }
    //     else{
    //         res.status(200).send(count);
    //     }
    // })
    var query = game1Img.find();
    query.count().then((count) => {
        res.status(200).send({ count });
    }).catch((err) => {
        res.status(400).send(err);
    });


}

// const addThumbnail = async (req, res) => {


//     var params = {
//         Bucket: bucketName,
//         Key: req.file.originalname,
//         Body: req.file.buffer,
//         ContentType: req.file.mimetype
//     }

//     var command = new PutObjectCommand(params);
//     await s3.send(command);

//     await game1Thumbnail.findOne({ Scenario: req.body.Scenario }).then(async scenario => {

//         if (scenario) {
//             res.status(200).send('Scenario already there');

//         }
//         else {

//             const thumbnail = new game1Thumbnail({ Scenario: req.body.Scenario, ThumbnailImage: req.file.originalname });
//             thumbnail.save().then(result => { res.status(200).send(result) }).catch(err => {
//                 res.status(400).send({ 'error': err });
//             });
//         }
//     }).catch(err => {
//         res.status(400).send({ 'error': err });
//     });

// }


const getAsset = async (req, res) => {


    await game1Img.findOne({ Name: req.body.Name }).then(async scenario => {
        if (scenario) {

            var urls = [];
            var img_list = scenario.Images;
            var pharsiNames = [];

            var audio_url = [];

            for (let i = 0; i < img_list.length; i++) {


                const getObjectParams = {
                    Bucket: bucketName,
                    Key: img_list[i],
                };

                const command = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                urls.push(url);

                pharsiName.findOne({ ImageName: img_list[i] }).then(data => { pharsiNames.push(data.Text); });

                /// audio

                var curr_audio = img_list[i];
                // var idx = curr_audio.indexOf('.')
                // curr_audio = curr_audio.slice(0, idx)





                await audio.findOne({ Name: curr_audio }).then(async val => {

                    const getObjectParams = {
                        Bucket: bucketName,
                        Key: val.Audio,
                    };
                    const command = new GetObjectCommand(getObjectParams);
                    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                    audio_url.push(url);

                }).catch(err => { res.status(400).send({ 'err 2': err }); br = true; });









            }

            var getObjectParams = {
                Bucket: bucketName,
                Key: scenario.CenterImage,
            };

            var command = new GetObjectCommand(getObjectParams);

            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });


            // getting prompt audio //
            var pfile = 'Prompt' + scenario.Name.slice(8);
            let promptfile = '';

            await audio.findOne({ Name: pfile }).then((filep) => { promptfile = String(filep.Audio); });


            var getObjectParams = {
                Bucket: bucketName,
                Key: promptfile,
            };

            var command = new GetObjectCommand(getObjectParams);

            const prompturl = await getSignedUrl(s3, command, { expiresIn: 3600 });





            res.status(200).send({ Images: urls, Center: url, Audios: audio_url, prompt: scenario.BottomText, promptAudio: prompturl, text: pharsiNames });
        }
        else {
            res.status(400).send('No such scenario');
        }
    }).catch(err => {
        res.status(400).send({ 'error 3': err });
    });


}

const deleteImage = (req, res) => {


    // console.log(req.file.originalname);
};

module.exports = { addImage, deleteImage, getImage, addAudio, getAudio, numberOfScenario, getAsset };