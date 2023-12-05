const game3Asset = require('../model/game3Asset');
const { S3Client, PutObjectCommand, GetObjectCommand, S3, ListBucketInventoryConfigurationsOutputFilterSensitiveLog } = require("@aws-sdk/client-s3");
const dotenv = require('dotenv');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
// const req = require('express/lib/request');
const game3audio = require('../model/game3Audio');
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
    const params = {
        Bucket: bucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }
    const command = new PutObjectCommand(params);
    await s3.send(command);
    game3Asset.findOne({ Name: req.body.Name }).then(async (scenario) => {
        if (scenario) {
            var img_list = scenario.Images;
            const map = new Map();
            map.set(req.file.originalname, req.body.Rank);
            img_list.push(map);
            try {
                await game3Asset.updateOne({ Name: req.body.Name }, { Images: img_list });
                res.status(200).send('successfully added to scenario ' + req.body.Name);
            }
            catch (err) {
                res.status(400).send({ 'error': err });
            }

        }
        else {
            const map = new Map();
            map.set(req.file.originalname, req.body.Rank);
            // console.log(map);
            //const scene = new game3Asset({ Name: req.body.Name, Images: [map], Text: req.body.Text, Letter: req.body.Letter });
            const scene = new game3Asset({ Name: req.body.Name, Images: [map], Text1: req.body.Text1, Text2: req.body.Text2, Letter: req.body.Letter }); // new added By K
            await scene.save().then((result) => {
                res.status(200).send(result);
            }).catch((err) => { res.status(400).send(err) });
        }
    }).catch((err) => {
        res.status(400).send(err);
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
    game3audio.findOne({ Name: req.body.Name }).then(async scenario => {
        if (!scenario) {
            const Audio = new game3audio({
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
    await game3Asset.findOne({ Name: req.body.Name }).then(async scenario => {
        if (scenario) {

            var urls = [];
            var ranks = []
            var img_list = scenario.Images;

            var audio_url = [];

            for (let i = 0; i < img_list.length; i++) {

                var img_curr = String(Object.keys(img_list[i]));

                const getObjectParams = {
                    Bucket: bucketName,
                    Key: img_curr,
                };


                const command = new GetObjectCommand(getObjectParams);

                const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                urls.push(url);

                ranks.push(String(Object.values(img_list[i])));

                /// prompt audio


                // console.log(s);
                var prompt_audio = ''
                var s = 'Prompt' + req.body.Name.charAt(req.body.Name.length - 1);
                // console.log(s);
                var prompt_audio = ''
                await game3audio.findOne({ Name: s }).then(async val => {

                    const getObjectParams = {
                        Bucket: bucketName,
                        Key: val.Audio,
                    };
                    const command = new GetObjectCommand(getObjectParams);
                    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                    prompt_audio = url;

                }).catch(err => { res.status(400).send({ 'err 2': err }); br = true; });

                /// audio


                var curr_audio = String(Object.keys(img_list[i]));
                // var idx = curr_audio.indexOf('.')
                // curr_audio = curr_audio.slice(0, idx)

                await game3audio.findOne({ Name: curr_audio }).then(async val => {

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



            }
            if (br == false) {
                //res.status(200).send({ Images: urls, Audios: audio_url, Ranks: ranks, Text: scenario.Text, promptAudio: prompt_audio });
                res.status(200).send({ Images: urls, Audios: audio_url, Ranks: ranks, Text1: scenario.Text1, Text2: scenario.Text2, promptAudio: prompt_audio }); // new added By k

            }

        }
        else {
            res.status(400).send('No such scenario');
        }
    }).catch(err => {
        res.status(400).send({ 'error 3': err });
    });


}

const getAllAssets = async(req,res) =>{
    try {
        var assets = await game3Asset.find();
        res.send(assets);
    } catch (error) {
        res.send(error);
    }
    
}

const updateText2 = async(req,res) =>{
    try {
        const asset = await game3Asset.updateOne({Name : req.body.Name}, {$set: {Text2: req.body.Text2}});
        res.status(200).send(asset);
    } catch (error) {
        res.status(400).send({'error': error});
    }
}
/*
const changeFieldName = async(req,res)=>{
    try {
        const assets =await game3Asset.updateMany({}, {$rename: {Text: "Text1"}});
        res.send(assets);
    } catch (error) {
        res.send(error);
    }
    
}
*/

module.exports = { addAsset, addAudio, getAsset, updateText2 , getAllAssets }