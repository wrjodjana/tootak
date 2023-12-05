const game4Asset = require('../model/game4Asset');
const game4Audio = require('../model/game4Audio');
// const game5audio = require('../model/game5Audio');
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
    var imageFile = req.files['image'][0];
    var ScratchImage = req.files['scratch'][0];
    var gifFile = req.files['Gif'][0];
    //var promptAudio = req.files['promptAudio'][0];

    var params = {
        Bucket: bucketName,
        Key: imageFile.originalname,
        Body: imageFile.buffer,
        ContentType: imageFile.mimetype
    }

    var command = new PutObjectCommand(params);
    await s3.send(command);

    params = {
        Bucket: bucketName,
        Key: ScratchImage.originalname,
        Body: ScratchImage.buffer,
        ContentType: ScratchImage.mimetype
    }

    command = new PutObjectCommand(params);
    await s3.send(command);

    params = {
        Bucket: bucketName,
        Key: gifFile.originalname,
        Body: gifFile.buffer,
        ContentType: gifFile.mimetype
    }

    command = new PutObjectCommand(params);
    await s3.send(command);

    /*
    params = {
        Bucket: bucketName,
        Key: promptAudio.originalname,
        Body: promptAudio.buffer,
        ContentType: promptAudio.mimetype
    }

    command = new PutObjectCommand(params);
    await s3.send(command);
    */

    await game4Asset.findOne({ Name: req.body.Name }).then(async (scenario) => {
        if (scenario) {
            res.status(400).send('Scenario already there');
        }
        else {
            const scene = new game4Asset({
                Name: req.body.Name,
                Image: imageFile.originalname,
                ScratchImage: ScratchImage.originalname,
                Text: req.body.prompt,
                Gif: gifFile.originalname,
                //promptAudio: promptAudio.originalname
            });

            await scene.save().then(result => { res.status(200).send(result); }).catch(err => { res.status(200).send({ 'err': err }) });
        }
    }).catch(err => { res.status(200).send({ 'err': err }) });

}

const addAudio = async(req,res)=>{

    // returns if any of the 3 files is missing
    try {
        var initial_prompt = req.files['initialPrompt'][0];
        var letter_sound = req.files['letterSound'][0];
        var last_prompt = req.files['lastPrompt'][0];
    } catch (error) {
        res.status(400).send("Input is wrong. One or more files are missing.");
        return;
    }
    //sending Initial Prompt Audio to S3
    var params = {
        Bucket: bucketName,
        Key: initial_prompt.originalname,
        Body: initial_prompt.buffer,
        ContentType: initial_prompt.mimetype
    }

    var command = new PutObjectCommand(params);
    await s3.send(command);
    //console.log(initial_prompt.originalname);

    //sending Letter Sound to S3
    params = {
        Bucket: bucketName,
        Key: letter_sound.originalname,
        Body: letter_sound.buffer,
        ContentType: letter_sound.mimetype
    }

    command = new PutObjectCommand(params);
    await s3.send(command);

    //sending Last Prompt Audio to S3
    params = {
        Bucket: bucketName,
        Key: last_prompt.originalname,
        Body: last_prompt.buffer,
        ContentType: last_prompt.mimetype
    }

    command = new PutObjectCommand(params);
    await s3.send(command);

    game4Audio.findOne({ Name: req.body.Name }).then(async scenario => {
        if (!scenario) {
            const Audio = new game4Audio({
                Name: req.body.Name,
                InitialPrompt: initial_prompt.originalname,
                LetterSound: letter_sound.originalname,
                LastPrompt: last_prompt.originalname
            })
            await Audio.save().then(result => { res.status(200).send(result) }).catch(err => {
                res.status(400).send({ 'error': err });
            })
        }
        else {
            res.status(200).send('Audio files already added');

        }
    }).catch(err => {
        res.status(400).send({ 'error': err });
    });
}


const getAsset = async (req, res) => {
    var flag = false;
    game4Asset.findOne({ Name: req.body.Name }).then(async data => {
        if (data) {

            var initial_prompt_url;
            var letter_sound_url;
            var last_prompt_url;

            var getObjectParams = {
                Bucket: bucketName,
                Key: data.Image,
            };
            var command = new GetObjectCommand(getObjectParams);
            var imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });


            getObjectParams = {
                Bucket: bucketName,
                Key: data.ScratchImage,
            };
            command = new GetObjectCommand(getObjectParams);
            var scratchImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

            getObjectParams = {
                Bucket: bucketName,
                Key: data.Gif,
            };
            command = new GetObjectCommand(getObjectParams);
            var gifUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

            /*
            getObjectParams = {
                Bucket: bucketName,
                Key: data.promptAudio,
            };
            command = new GetObjectCommand(getObjectParams);
            var audioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
            */

            await game4Audio.findOne({ Name: req.body.Name }).then(async scenario => {
                if(scenario){
                    var initial_prompt = scenario.InitialPrompt;
                    var letter_sound = scenario.LetterSound;
                    var last_prompt = scenario.LastPrompt;

                    getObjectParams = {
                        Bucket: bucketName,
                        Key: initial_prompt,
                    };
                    command = new GetObjectCommand(getObjectParams);
                    initial_prompt_url = await getSignedUrl(s3, command, { expiresIn: 3600 });

                    getObjectParams = {
                        Bucket: bucketName,
                        Key: letter_sound,
                    };
                    command = new GetObjectCommand(getObjectParams);
                    letter_sound_url = await getSignedUrl(s3, command, { expiresIn: 3600 });

                    getObjectParams = {
                        Bucket: bucketName,
                        Key: last_prompt,
                    };
                    command = new GetObjectCommand(getObjectParams);
                    last_prompt_url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                }else{
                    flag=true;
                }     
            }).catch(err => { res.status(400).send({ 'err 2': err }); flag = true; });

            if(flag==false){
                //res.status(200).send({ 'image': imageUrl, 'scratchImage': scratchImageUrl, 'Gif': gifUrl, 'prompt': data.Text, 'promptAudio': audioUrl });
                res.status(200).send({ 'image': imageUrl, 'scratchImage': scratchImageUrl, 'gif': gifUrl, 'prompt': data.Text, 'initialPromptAudio' : initial_prompt_url, 'letterSoundAudio' : letter_sound_url, 'lastPromptAudio' : last_prompt_url});
            }
        }
        else {
            res.status(400).send('No such Scenario');
        }
    }).catch(err => { res.status(400).send({ 'err': err }) });

}

const getAllAssets = async(req,res) =>{
    try {
        var assets = await game4Asset.find();
        res.send(assets);
    } catch (error) {
        res.send(error);
    }
}

const getAllAudiios = async(req,res) =>{
    try {
        var assets = await game4Audio.find();
        res.send(assets);
    } catch (error) {
        res.send(error);
    }
}

const removeField = async(req,res) =>{
    try {
        const updatedAssets = await game4Asset.updateMany({}, {$unset: {"promptAudio" : 1}});
        res.send(updatedAssets);
    } catch (error) {
        res.send(error);
    }
}

module.exports = { addAsset, getAsset, addAudio, getAllAssets, getAllAudiios, removeField };

