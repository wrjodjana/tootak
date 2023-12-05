const game2Asset = require('../model/game2');
const game2Audio = require('../model/game2Audio');
const {S3Client, GetObjectCommand, PutObjectCommand} = require('@aws-sdk/client-s3')
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

const addAsset = async(req,res)=>{

    var image1 = req.files['image1'][0];

    var params = {
        Bucket: bucketName,
        Key: image1.originalname,
        Body: image1.buffer,
        ContentType: image1.mimetype
    }
    var command = new PutObjectCommand(params);
    await s3.send(command);

    var image2 = req.files['image2'][0];

    params = {
        Bucket: bucketName,
        Key: image2.originalname,
        Body: image2.buffer,
        ContentType: image2.mimetype
    }
    command = new PutObjectCommand(params);
    await s3.send(command);

    var audio = req.files['audio'][0];

    params = {
        Bucket: bucketName,
        Key: audio.originalname,
        Body: audio.buffer,
        ContentType: audio.mimetype
    }
    command = new PutObjectCommand(params);
    await s3.send(command);

    await game2Asset.findOne({Name : req.body.Name, Category: req.body.Category,Module: req.body.Module }).then(async (result) =>{
        if(result){
            res.status(200).send('Scenario already present in Database');
        }
        else {
            const document = new game2Asset({Name: req.body.Name, Category : req.body.Category, Module: req.body.Module, Image1 : image1.originalname, Image2 : image2.originalname, Audio : audio.originalname });
            document.save().then(result =>{
                res.status(200).send(result);
            }).catch(err =>{
                res.status(400).send({'error': err});
            });
        }
    })
}

const addAudio = async(req,res) =>{

    var promptAudio1 = req.files['promptAudio1'][0];

    var params = {
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

    game2Audio.findOne({Category : req.body.Category, Module : req.body.Module}).then(async result =>{

        if(!result){

            const newAudio = new game2Audio({
                Category : req.body.Category,
                Module : req.body.Module,
                PromptAudio1 : promptAudio1.originalname,
                PromptAudio2 : promptAudio2.originalname
            })

            await newAudio.save().then(result => {res.status(200).send(result)}).catch(error =>{
                res.status(400).send({ 'error': err });
            })
        }
        else{
            res.status(200).send('Audio already added');
        }
    }).catch(err => {
        res.status(400).send({ 'error': err });
    });
}

const getAsset = async(req,res) =>{
    // var assets =await game2Asset.aggregate([ {$match : {Category : req.body.Category}}, { $sample: { size: 3}}]);
    //var assets =await game2Asset.aggregate([ {$match : {Module : req.body.Module, Category : req.body.Category}}, { $sample: { size: 3}}]);
    //res.send(assets);

     var flag = false;
     await game2Asset.aggregate([ {$match : {Module : req.body.Module, Category : req.body.Category}}, { $sample: { size: 3}}]).then(async result =>{
        if(result){
            
            var image1Urls = [];
            var image2Urls = [];
            var audioUrls = [];
            var promptAudio1Url;
            var promptAudio2Url;

            for(let i=0;i<result.length;i++){

                var image1 = result[i].Image1;
                var getObjectParams = {
                    Bucket: bucketName,
                    Key: image1,
                };

                var command = new GetObjectCommand(getObjectParams);
                var url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                image1Urls.push(url);

                var image2 = result[i].Image2;
                getObjectParams = {
                    Bucket: bucketName,
                    Key: image2,
                };

                command = new GetObjectCommand(getObjectParams);
                url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                image2Urls.push(url);

                var audio = result[i].Audio;
                getObjectParams = {
                    Bucket: bucketName,
                    Key: audio,
                };

                command = new GetObjectCommand(getObjectParams);
                url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                audioUrls.push(url);
              
            }
            
            await game2Audio.findOne({Category : req.body.Category, Module : req.body.Module}).then(async result=>{
                if(result){
                    
                    var promptAudio1 = result.PromptAudio1;

                    var getObjectParams = {
                        Bucket: bucketName,
                        Key: promptAudio1,
                    };
    
                    var command = new GetObjectCommand(getObjectParams);
                    promptAudio1Url = await getSignedUrl(s3, command, { expiresIn: 3600 });

                    var promptAudio2 = result.PromptAudio2
                    getObjectParams = {
                        Bucket: bucketName,
                        Key: promptAudio2,
                    };
    
                    command = new GetObjectCommand(getObjectParams);
                    promptAudio2Url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                    
                }else {
                    flag= true;
                    res.status(404).send('No Audios available for this category');
                    return;
                }
            }).catch(err => { res.status(400).send({ 'err 2': err }); br = true; });

            if(flag == false){
                //console.log(result);
                res.status(200).send({ image1 : image1Urls, image2 : image2Urls, audio : audioUrls, promptAudio1 : promptAudio1Url, promptAudio2 : promptAudio2Url})
            }
        }else{
            res.status(400).send('No such Scenario in Database');
        }
     })
}
/*
const getAllAssets = async(req,res) =>{
    try {
        var assets = await game2Asset.find();
        res.send(assets);
    } catch (error) {
        res.send(error);
    }
}
const getAllAudios = async(req,res) =>{
    try {
        var assets = await game2Audio.find();
        res.send(assets);
    } catch (error) {
        res.send(error);
    }
}
*/
const deleteAllAssets = async(req,res) =>{
    var deleted = await game2Asset.deleteMany();
    res.send(deleted);
}
const deleteAllAudios = async(req,res) =>{
    var deleted = await game2Audio.deleteMany();
    res.send(deleted);
}

const getAllAssets = async (req, res) => {
    try {
        const assets = await game2Asset.find();
        res.status(200).send(assets);
    } catch (error) {
        console.log(error.toString());
        res.status(400).json({ message: 'Error. Something went wrong.' });
    }
}
const getAllAudios = async (req, res) => {
    try {
        const audios = await game2Audio.find();
        res.status(200).send(audios);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error. Something went wrong' });
    }
}
const getAssestById = async (req, res) => {
    try {
        const id = req.params.id;
        const asset = await game2Asset.findById(id);

        var image1 = asset.Image1;
        var image2 = asset.Image2;
        var audio = asset.Audio;

        var getObjectParams = {
            Bucket: bucketName,
            Key: image1,
        };
        var command = new GetObjectCommand(getObjectParams);
        var image1Url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
            Bucket: bucketName,
            Key: image2,
        };
        command = new GetObjectCommand(getObjectParams);
        var image2Url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
            Bucket: bucketName,
            Key: audio,
        };
        command = new GetObjectCommand(getObjectParams);
        var audioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        res.status(200).send({ asset: asset, image1Url: image1Url, image2Url: image2Url, audioUrl: audioUrl });

    } catch (error) {
        res.status(400).json({ message: 'Error. Something went wrong' });
    }
}

const getAudioById = async(req,res) =>{
    try {
        const id = req.params.id;
        const audio = await game2Audio.findById(id);

        var promptAudio1 = audio.PromptAudio1;
        var promptAudio2 = audio.PromptAudio2;

        var getObjectParams = {
            Bucket: bucketName,
            Key: promptAudio1,
        };
        var command = new GetObjectCommand(getObjectParams);
        var promptAudio1Url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
            Bucket: bucketName,
            Key: promptAudio2,
        };
        command = new GetObjectCommand(getObjectParams);
        var promptAudio2Url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        res.status(200).send({audio : audio, promptAudio1Url : promptAudio1Url, promptAudio2Url : promptAudio2Url})

    } catch (error) {
        res.status(400).json({ message: 'Error. Something went wrong' });
    }
}

const deleteAsset = async (req, res) => {
    try {
        var asset = await game2Asset.findById(req.params.id);

        if (!asset) {
            res.status(404).json({
                message: "Record not found"
            })
            return;
        }
        /*
                var params = {
                    Bucket: bucketName,
                    Key: asset.Image1,
                }
                var command = new DeleteObjectCommand(params);
                await s3.send(command);
        
                params = {
                    Bucket: bucketName,
                    Key: asset.Image2,
                }
                command = new DeleteObjectCommand(params);
                await s3.send(command);
        
                params = {
                    Bucket: bucketName,
                    Key: asset.Audio,
                }
                command = new DeleteObjectCommand(params);
                await s3.send(command);
        */
        await game2Asset.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: "done"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error. Something went wrong' });
    }
}

const deleteAudio = async (req, res) => {
    try {

        var audio = await game2Audio.findById(req.params.id);
        if (!audio) {
            res.status(404).json({
                message: "Record not found"
            });
            return;
        }
        /*
                var params = {
                    Bucket: bucketName,
                    Key: audio.PromptAudio1,
                }
                var command = new DeleteObjectCommand(params);
                await s3.send(command);
        
                params = {
                    Bucket: bucketName,
                    Key: audio.PromptAudio2,
                }
                command = new DeleteObjectCommand(params);
                await s3.send(command);
        
        */
        await game2Audio.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: "done"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error. Something went wrong' });
    }
}

const updateAsset = async (req, res) => {  // fetch and first delete old assests , then upload new to s3 then update in mongo

    try {

        if (req.files['image1'] == null || req.files['image2'] == null || req.files['audio'] == null) {
            res.status(400).json({
                message: "Please provide the files correctly"
            })
            return;
        }

        var image1 = req.files['image1'][0];

        var params = {
            Bucket: bucketName,
            Key: image1.originalname,
            Body: image1.buffer,
            ContentType: image1.mimetype
        }
        var command = new PutObjectCommand(params);
        await s3.send(command);

        var image2 = req.files['image2'][0];

        params = {
            Bucket: bucketName,
            Key: image2.originalname,
            Body: image2.buffer,
            ContentType: image2.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var audio = req.files['audio'][0];

        params = {
            Bucket: bucketName,
            Key: audio.originalname,
            Body: audio.buffer,
            ContentType: audio.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        const document = { Name: req.body.Name, Category: req.body.Category, Module: req.body.Module, Image1: image1.originalname, Image2: image2.originalname, Audio: audio.originalname };
        await game2Asset.updateOne({
            _id: req.params.id
        },
            document);

        res.status(200).json({
            message: "done"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error. Something went wrong' });
    }
}

const updateAudio = async(req,res) => {
    try {
        if (!req.files['promptAudio1'] || !req.files['promptAudio2']) {
            res.status(400).json({
                message: "One or more fields are missing. Please upload the audios correctly."
            })
            return;
        }

        var promptAudio1 = req.files['promptAudio1'][0];
        var params = {
            Bucket: bucketName,
            Key: promptAudio1.originalname,
            Body: promptAudio1.buffer,
            ContentType: promptAudio1.mimetype
        }
        var command = new PutObjectCommand(params);
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

        const document = {Category : req.body.Category, Module : req.body.Module, PromptAudio1 : promptAudio1.originalname, PromptAudio2 : promptAudio2.originalname};
        await game2Audio.updateOne({
            _id: req.params.id
        },
            document);

        res.status(200).json({
            message: "done"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error. Something went wrong' });
    }
}
module.exports = {addAsset, addAudio, getAsset, getAllAssets,getAllAudios, deleteAllAssets, deleteAllAudios};