const game8Asset = require('../model/game8Asset');
const game8Audio = require('../model/game8Audio');
const {S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand} = require('@aws-sdk/client-s3')
const dotenv = require('dotenv');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

dotenv.config();
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;


const s3 = new S3Client({
    credentials: {
        accessKeyId : accessKey,
        secretAccessKey : secretAccessKey
    },
    region: bucketRegion
});

const addAssetAndAudio = async(req,res) =>{

    try {
        // should it be !req.file[''][0] or should it be !req.files['']. check and update accordingly
        if (!req.files['incompleteWordImage'] || !req.files['completeWordImage'] || !req.files['completeWordAudio'] || !req.files['correctOptionImageIndependentState'] ||
            !req.files['correctOptionImageAttachedState'] ||!req.files['correctOptionAudio'] || !req.files['option1Image'] ||
            !req.files['option1Audio'] || !req.files['option2Image'] || !req.files['option2Audio'] || !req.files['option3Image'] ||
            !req.files['option3Audio'] || !req.files['gif'] || !req.files['promptAudio1'] || !req.files['promptAudio2']) {
            res.status(400).json({
                message: "One or more fields are missing. Please upload the assets correctly."
            })
            return;
        }

        var incompleteWordImage = req.files['incompleteWordImage'][0];
        var params = {
            Bucket: bucketName,
            Key: incompleteWordImage.originalname,
            Body: incompleteWordImage.buffer,
            ContentType: incompleteWordImage.mimetype
        }
        var command = new PutObjectCommand(params);
        await s3.send(command);

        var completeWordImage = req.files['completeWordImage'][0];
        params = {
            Bucket: bucketName,
            Key: completeWordImage.originalname,
            Body: completeWordImage.buffer,
            ContentType: completeWordImage.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var completeWordAudio = req.files['completeWordAudio'][0];
        params = {
            Bucket: bucketName,
            Key: completeWordAudio.originalname,
            Body: completeWordAudio.buffer,
            ContentType: completeWordAudio.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var correctOptionImageIndependentState = req.files['correctOptionImageIndependentState'][0];
        params = {
            Bucket: bucketName,
            Key: correctOptionImageIndependentState.originalname,
            Body: correctOptionImageIndependentState.buffer,
            ContentType: correctOptionImageIndependentState.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var correctOptionImageAttachedState = req.files['correctOptionImageAttachedState'][0];
        params = {
            Bucket: bucketName,
            Key: correctOptionImageAttachedState.originalname,
            Body: correctOptionImageAttachedState.buffer,
            ContentType: correctOptionImageAttachedState.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var correctOptionAudio = req.files['correctOptionAudio'][0];
        params = {
            Bucket: bucketName,
            Key: correctOptionAudio.originalname,
            Body: correctOptionAudio.buffer,
            ContentType: correctOptionAudio.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var option1Image = req.files['option1Image'][0];
        params = {
            Bucket: bucketName,
            Key: option1Image.originalname,
            Body: option1Image.buffer,
            ContentType: option1Image.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var option1Audio = req.files['option1Audio'][0];
        params = {
            Bucket: bucketName,
            Key: option1Audio.originalname,
            Body: option1Audio.buffer,
            ContentType: option1Audio.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var option2Image = req.files['option2Image'][0];
        params = {
            Bucket: bucketName,
            Key: option2Image.originalname,
            Body: option2Image.buffer,
            ContentType: option2Image.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var option2Audio = req.files['option2Audio'][0];
        params = {
            Bucket: bucketName,
            Key: option2Audio.originalname,
            Body: option2Audio.buffer,
            ContentType: option2Audio.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var option3Image = req.files['option3Image'][0];
        params = {
            Bucket: bucketName,
            Key: option3Image.originalname,
            Body: option3Image.buffer,
            ContentType: option3Image.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var option3Audio = req.files['option3Audio'][0];
        params = {
            Bucket: bucketName,
            Key: option3Audio.originalname,
            Body: option3Audio.buffer,
            ContentType: option3Audio.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var gif = req.files['gif'][0];
        params = {
            Bucket: bucketName,
            Key: gif.originalname,
            Body: gif.buffer,
            ContentType: gif.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var promptAudio1 = req.files['promptAudio1'][0];
        params = {
            Bucket: bucketName,
            Key: promptAudio1.originalname,
            Body: promptAudio1.buffer,
            ContentType: promptAudio1.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var promptAudio2 = req.files['promptAudio2'][0];
        params = {
            Bucket: bucketName,
            Key: promptAudio2.originalname,
            Body: promptAudio2.buffer,
            ContentType: promptAudio2.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var Asset ;
        var flag = false;
        await game8Asset.findOne({name : req.body.name, module : req.body.module}).then(async asset =>{
            if (asset) {
                flag =true;
                return res.status(200).send('Asset already present in Database');
            } else {
                const document = new game8Asset({
                    name: req.body.name,
                    module: req.body.module,
                    incompleteWordImage: incompleteWordImage.originalname,
                    completeWordImage: completeWordImage.originalname,
                    correctOptionImageIndependentState: correctOptionImageIndependentState.originalname,
                    correctOptionImageAttachedState: correctOptionImageAttachedState.originalname,
                    option1Image: option1Image.originalname,
                    option2Image: option2Image.originalname,
                    option3Image: option3Image.originalname,
                    gif: gif.originalname
                })
                document.save().then(result => {
                    //res.status(200).send(result);
                    Asset = result;
                    console.log("Assest added succesfully");
                }).catch(err => {
                    res.status(400).send({ 'error': err.toString() });
                    return; // added so that error aaye toh fir yahi se exit ho jaye. Hence DB mai na hi audio and na hi asset store ho
                });
            }
        })

        if(flag){
            return;
        }

        // Note is part should be in 'else' at line 192, not here. Update it.
        await game8Audio.findOne({ name: req.body.name, module: req.body.module }).then(async audio => {
            if (!audio) {
                const document = new game8Audio({
                    name: req.body.name,
                    module: req.body.module,
                    completeWordAudio: completeWordAudio.originalname,
                    correctOptionAudio: correctOptionAudio.originalname,
                    option1Audio: option1Audio.originalname,
                    option2Audio: option2Audio.originalname,
                    option3Audio: option3Audio.originalname,
                    promptAudio1: promptAudio1.originalname,
                    promptAudio2: promptAudio2.originalname
                })
                await document.save().then(audio => { res.status(200).json({'Asset' : Asset, 'Audio' : audio }) }).catch(err => {
                    res.status(400).send({ 'error': err.toString() });
                })
            }
            else {
                res.status(200).send('Audio already present in the Database')
            }
        }).catch(err => {
            res.status(400).send({ 'error': err });
        });

    } catch (error) {
         res.status(400).send({'error': error.toString()});
    }
}

const getAsset = async (req, res) => {
    var flag = false;

    await game8Asset.findOne({ name: req.body.name, module : req.body.module}).then(async result => {

        if (result) {

            var completeWordAudioUrl;
            var correctOptionAudioUrl;
            var option1AudioUrl;
            var option2AudioUrl;
            var option3AudioUrl;
            var promptAudio1URL;
            var promptAudio2URL;

            // generating link for incompleteWordImage
            var getObjectParams = {
                Bucket: bucketName,
                Key: result.incompleteWordImage,
            };
            var command = new GetObjectCommand(getObjectParams);
            var incompleteWordImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

            // generating link for completeWordImage
            getObjectParams = {
                Bucket: bucketName,
                Key: result.completeWordImage,
            };
            command = new GetObjectCommand(getObjectParams);
            var completeWordImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

            // generating link for correctOptionImageIndependentState
            getObjectParams = {
                Bucket: bucketName,
                Key: result.correctOptionImageIndependentState,
            };
            command = new GetObjectCommand(getObjectParams);
            var correctOptionImageIndependentStateUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

            // generating link for correctOptionImageAttachedState
            getObjectParams = {
                Bucket: bucketName,
                Key: result.correctOptionImageAttachedState,
            };
            command = new GetObjectCommand(getObjectParams);
            var correctOptionImageAttachedStateUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

            // generating link for option1Image
            getObjectParams = {
                Bucket: bucketName,
                Key: result.option1Image,
            };
            command = new GetObjectCommand(getObjectParams);
            var option1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

            // generating link for option2Image
            getObjectParams = {
                Bucket: bucketName,
                Key: result.option2Image,
            };
            command = new GetObjectCommand(getObjectParams);
            var option2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

            // generating link for option3Image
            getObjectParams = {
                Bucket: bucketName,
                Key: result.option3Image,
            };
            command = new GetObjectCommand(getObjectParams);
            var option3ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

            // generating link for gif
            getObjectParams = {
                Bucket: bucketName,
                Key: result.gif,
            };
            command = new GetObjectCommand(getObjectParams);
            var gifUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

            await game8Audio.findOne({name : req.body.name, module : req.body.module}).then( async audio=>{
                if(!audio){
                    flag = true;
                    res.status(400).send({'message' : "Audio does not exist for the request"});
                    return;
                }
                else {
                    // generating link for completeWordAudio
                    var getObjectParams = {
                        Bucket: bucketName,
                        Key: audio.completeWordAudio,
                    };
                    var command = new GetObjectCommand(getObjectParams);
                    completeWordAudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                    // generating link for correctOptionAudio
                    getObjectParams = {
                        Bucket: bucketName,
                        Key: audio.correctOptionAudio,
                    };
                    command = new GetObjectCommand(getObjectParams);
                    correctOptionAudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                    // generating link for option1Audio
                    getObjectParams = {
                        Bucket: bucketName,
                        Key: audio.option1Audio,
                    };
                    command = new GetObjectCommand(getObjectParams);
                    option1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                    // generating link for option2Audio
                    getObjectParams = {
                        Bucket: bucketName,
                        Key: audio.option2Audio,
                    };
                    command = new GetObjectCommand(getObjectParams);
                    option2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                    // generating link for option3Audio
                    getObjectParams = {
                        Bucket: bucketName,
                        Key: audio.option3Audio,
                    };
                    command = new GetObjectCommand(getObjectParams);
                    option3AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                    // generating url for promptAudio1
                    getObjectParams = {
                        Bucket: bucketName,
                        Key: audio.promptAudio1,
                    };
                    command = new GetObjectCommand(getObjectParams);
                    promptAudio1URL = await getSignedUrl(s3, command, { expiresIn: 3600 });

                    // generating url for promptAudio2
                    getObjectParams = {
                        Bucket: bucketName,
                        Key: audio.promptAudio2,
                    };
                    var command = new GetObjectCommand(getObjectParams);
                    promptAudio2URL = await getSignedUrl(s3, command, { expiresIn: 3600 });

                }
            }).catch(err => { res.status(400).send({ 'err 2': err.toString() }); flag = true; });

            if(flag == false){
                res.status(200).send({
                    incompleteWordImage : incompleteWordImageUrl,
                    completeWordImage : completeWordImageUrl,
                    correctOptionImageIndependentState : correctOptionImageIndependentStateUrl,
                    correctOptionImageAttachedState: correctOptionImageAttachedStateUrl,
                    option1Image : option1ImageUrl,
                    option2Image : option2ImageUrl,
                    option3Image : option3ImageUrl,
                    gif : gifUrl,
                    completeWordAudio : completeWordAudioUrl,
                    correctOptionAudio : correctOptionAudioUrl,
                    option1Audio : option1AudioUrl,
                    option2Audio : option2AudioUrl,
                    option3Audio : option3AudioUrl,
                    promptAudio1 : promptAudio1URL,
                    promptAudio2 : promptAudio2URL
                })
            }
        } 
        else {
            res.status(404).send("No such Scenario in database")
        }

    }).catch(error =>{
        res.status(400).send({ 'error': error.toString() });
    })

    
}

const getAllAssets = async (req, res) => {
    try {
        const assets = await game8Asset.find();
        res.status(200).send(assets);
    } catch (error) {
        res.status(400).send({'error': error.toString()});
    }  
}

const getAllAudios = async (req, res) => {
    try {
        const audios = await game8Audio.find();
        res.status(200).send(audios);
    } catch (error) {
        res.status(400).send({'error': error.toString()});
    }  
}

const deleteAsset = async(req,res) =>{
    try {
        await game8Asset.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: "done"
        })
    } catch (error) {
        res.send(error);
    }
}

const deleteAudio = async(req,res) =>{
    try {
        await game8Audio.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: "done"
        })
    } catch (error) {
        res.send(error);
    }
}

module.exports = {addAssetAndAudio, getAsset, getAllAssets, getAllAudios, deleteAsset, deleteAudio};