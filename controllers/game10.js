const game10AssetAndAudio = require("../model/game10");
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

const addStory = async(req,res) =>{
    try {
        var images = [], audios = [], texts = [];

        var bookCoverImage = req.files['bookCoverImage'][0];
        var params = {
            Bucket: bucketName,
            Key: bookCoverImage.originalname,
            Body: bookCoverImage.buffer,
            ContentType: bookCoverImage.mimetype
        }
        var command = new PutObjectCommand(params);
        await s3.send(command);

        var bookTitleAudio = req.files['bookTitleAudio'][0];
        params = {
            Bucket: bucketName,
            Key: bookTitleAudio.originalname,
            Body: bookTitleAudio.buffer,
            ContentType: bookTitleAudio.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

         
        for (let i = 0; i < 10; i++) {

            var string1 = "storyImage".concat(i + 1);
            var string2 = "storyAudio".concat(i + 1);
            var string3 = "text".concat(i+1);
            
            if(!req.files[string1])
                break;

            var imageFile = req.files[string1][0];
            var params = {
                Bucket: bucketName,
                Key: imageFile.originalname,
                Body: imageFile.buffer,
                ContentType: imageFile.mimetype
            }
            var command = new PutObjectCommand(params);
            await s3.send(command);
            images.push(imageFile.originalname);
            
            var audioFile = req.files[string2][0];
            params = {
                Bucket: bucketName,
                Key: audioFile.originalname,
                Body: audioFile.buffer,
                ContentType: audioFile.mimetype
            }
            command = new PutObjectCommand(params);
            await s3.send(command);
            audios.push(audioFile.originalname);

            texts.push(req.body[string3.valueOf()]);
        }

        var audioPromptBeforeGameStarts = req.files['audioPromptBeforeGameStarts'][0];
        params = {
            Bucket: bucketName,
            Key: audioPromptBeforeGameStarts.originalname,
            Body: audioPromptBeforeGameStarts.buffer,
            ContentType: audioPromptBeforeGameStarts.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);
        
        await game10AssetAndAudio.findOne({name : req.body.name, module : req.body.module}).then(async result =>{
            if(!result){
                const document = new game10AssetAndAudio({
                    name : req.body.name,
                    module : req.body.module,
                    bookCoverImage : bookCoverImage.originalname,
                    bookTitle : req.body.bookTitle,
                    bookTitleAudio : bookTitleAudio.originalname,
                    story : {
                        populated : true,
                        images : images,
                        audios : audios,
                        texts : texts
                    },
                    audioPromptBeforeGameStarts : audioPromptBeforeGameStarts.originalname
                })
                document.save().then(result => {
                    res.status(200).send(result);
                }).catch(err => {
                    return res.status(400).send({ 'error': err.message });
                });
            }
            else if(result && result.story.populated == false){

                await game10AssetAndAudio.updateOne({
                    _id: result._id
                },
                {
                    story : {
                        populated : true,
                        images : images,
                        audios : audios,
                        texts : texts
                    }
                });
                return res.status(200).send(await game10AssetAndAudio.findOne({name : req.body.name, module : req.body.module}));
            }
            else{
                return res.status(200).send('Asset already present in Database')
            }
        })
        

    } catch (error) {
        console.log(error.message);
        console.log(error.toString());
    }
}

const addGame1 = async(req,res)=>{
    try {
        
        var initialAudioPrompt = req.files['initialAudioPrompt'][0];
        var params = {
            Bucket: bucketName,
            Key: initialAudioPrompt.originalname,
            Body: initialAudioPrompt.buffer,
            ContentType: initialAudioPrompt.mimetype
        }
        var command = new PutObjectCommand(params);
        await s3.send(command);

        var images = [];
        for (let i = 0; i < 4; i++) {
            var s = "image".concat(i + 1);
            var imageFile = req.files[s][0];

            var params = {
                Bucket: bucketName,
                Key: imageFile.originalname,
                Body: imageFile.buffer,
                ContentType: imageFile.mimetype
            }
            var command = new PutObjectCommand(params);
            await s3.send(command);

            images.push(imageFile.originalname);
        }

        var audios = [];
        for (let i = 0; i < 4; i++) {
            var s = "audio".concat(i + 1);
            var audioFile = req.files[s][0];

            var params = {
                Bucket: bucketName,
                Key: audioFile.originalname,
                Body: audioFile.buffer,
                ContentType: audioFile.mimetype
            }
            var command = new PutObjectCommand(params);
            await s3.send(command);

            audios.push(audioFile.originalname);
        }
        
        await game10AssetAndAudio.findOne({name : req.body.name, module : req.body.module}).then( async result =>{
            if(!result){
                const document = new game10AssetAndAudio({
                    name : req.body.name,
                    module : req.body.module,
                    game1 : {
                        populated : true,
                        initialAudioPrompt : initialAudioPrompt.originalname,
                        images : images,
                        audios : audios
                    }
                })
                document.save().then(result => {
                    return res.status(200).send(result);
                }).catch(err => {
                    return res.status(400).send({ 'error': err.message });
                });
            }
            else if(result && result.game1.populated == false){

                await game10AssetAndAudio.updateOne({
                    _id: result._id
                },
                {
                    game1 : {
                        populated : true,
                        initialAudioPrompt : initialAudioPrompt.originalname,
                        images : images,
                        audios : audios
                    }
                });
                return res.status(200).send(await game10AssetAndAudio.findOne({name : req.body.name, module : req.body.module}));
            }
            else{
                return res.status(200).send("Scenario already exist in database")
            }
        })
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const addGame2 = async(req,res)=>{
    try {
        
        var initialAudioPrompt = req.files['initialAudioPrompt'][0];
        var params = {
            Bucket: bucketName,
            Key: initialAudioPrompt.originalname,
            Body: initialAudioPrompt.buffer,
            ContentType: initialAudioPrompt.mimetype
        }
        var command = new PutObjectCommand(params);
        await s3.send(command);

        var image = req.files['image'][0];
        params = {
            Bucket: bucketName,
            Key: image.originalname,
            Body: image.buffer,
            ContentType: image.mimetype
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

        var option1Audio = req.files['option1Audio'][0];
        params = {
            Bucket: bucketName,
            Key: option1Audio.originalname,
            Body: option1Audio.buffer,
            ContentType: option1Audio.mimetype
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
        
        await game10AssetAndAudio.findOne({name : req.body.name, module : req.body.module}).then( async result =>{
            if(!result){
                const document = new game10AssetAndAudio({
                    name: req.body.name,
                    module: req.body.module,
                    game2: {
                        populated: true,
                        initialAudioPrompt: initialAudioPrompt.originalname,
                        image: image.originalname,
                        correctOption: {
                            text: req.body.correctOptionText,
                            audio: correctOptionAudio.originalname
                        },
                        option1: {
                            text: req.body.option1Text,
                            audio: option1Audio.originalname
                        },
                        option2: {
                            text: req.body.option2Text,
                            audio: option2Audio.originalname,
                        }
                    }
                })
                document.save().then(result => {
                    return res.status(200).send(result);
                }).catch(err => {
                    return res.status(400).send({ 'error': err.message });
                });
            }
            else if(result && result.game2.populated == false){

                await game10AssetAndAudio.updateOne({
                    _id: result._id
                },
                {
                    game2: {
                        populated: true,
                        initialAudioPrompt: initialAudioPrompt.originalname,
                        image: image.originalname,
                        correctOption: {
                            text: req.body.correctOptionText,
                            audio: correctOptionAudio.originalname
                        },
                        option1: {
                            text: req.body.option1Text,
                            audio: option1Audio.originalname
                        },
                        option2: {
                            text: req.body.option2Text,
                            audio: option2Audio.originalname,
                        }
                    }
                });
                return res.status(200).send(await game10AssetAndAudio.findOne({name : req.body.name, module : req.body.module}));
            }
            else{
                return res.status(200).send("Scenario already exist in database")
            }
        })
        
    } catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(400).send(error.message);
    }
}

const addGame3 = async(req,res)=>{
    try {
        
        var initialAudioPrompt = req.files['initialAudioPrompt'][0];
        var params = {
            Bucket: bucketName,
            Key: initialAudioPrompt.originalname,
            Body: initialAudioPrompt.buffer,
            ContentType: initialAudioPrompt.mimetype
        }
        var command = new PutObjectCommand(params);
        await s3.send(command);

        var correctOption1Image = req.files['correctOption1Image'][0];
        params = {
            Bucket: bucketName,
            Key: correctOption1Image.originalname,
            Body: correctOption1Image.buffer,
            ContentType: correctOption1Image.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var correctOption1Audio = req.files['correctOption1Audio'][0];
        params = {
            Bucket: bucketName,
            Key: correctOption1Audio.originalname,
            Body: correctOption1Audio.buffer,
            ContentType: correctOption1Audio.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var correctOption2Image = req.files['correctOption2Image'][0];
        params = {
            Bucket: bucketName,
            Key: correctOption2Image.originalname,
            Body: correctOption2Image.buffer,
            ContentType: correctOption2Image.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var correctOption2Audio = req.files['correctOption2Audio'][0];
        params = {
            Bucket: bucketName,
            Key: correctOption2Audio.originalname,
            Body: correctOption2Audio.buffer,
            ContentType: correctOption2Audio.mimetype
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

        await game10AssetAndAudio.findOne({name : req.body.name, module : req.body.module}).then( async result =>{
            if(!result){
                const document = new game10AssetAndAudio({
                    name : req.body.name,
                    module : req.body.module,
                    game3: {
                        populated : true,
                        initialAudioPrompt : initialAudioPrompt.originalname,
                        correctOption1: {
                            image : correctOption1Image.originalname,
                            audio : correctOption1Audio.originalname,
                            text : req.body.correctOption1Text
                        },
                        correctOption2: {
                            image : correctOption2Image.originalname,
                            audio : correctOption2Audio.originalname,
                            text : req.body.correctOption2Text
                        },
                        option1: {
                            image : option1Image.originalname,
                            audio : option1Audio.originalname,
                            text : req.body.option1Text
                        },
                        option2: {
                            image : option2Image.originalname,
                            audio : option2Audio.originalname,
                            text : req.body.option2Text
                        }
                    }
                })
                document.save().then(result => {
                    return res.status(200).send(result);
                }).catch(err => {
                    return res.status(400).send({ 'error': err.message });
                });
            }
            else if(result && result.game3.populated == false){

                await game10AssetAndAudio.updateOne({
                    _id: result._id
                },
                {
                    game3: {
                        populated : true,
                        initialAudioPrompt : initialAudioPrompt.originalname,
                        correctOption1: {
                            image : correctOption1Image.originalname,
                            audio : correctOption1Audio.originalname,
                            text : req.body.correctOption1Text
                        },
                        correctOption2: {
                            image : correctOption2Image.originalname,
                            audio : correctOption2Audio.originalname,
                            text : req.body.correctOption2Text
                        },
                        option1: {
                            image : option1Image.originalname,
                            audio : option1Audio.originalname,
                            text : req.body.option1Text
                        },
                        option2: {
                            image : option2Image.originalname,
                            audio : option2Audio.originalname,
                            text : req.body.option2Text
                        }
                    }
                });
                return res.status(200).send(await game10AssetAndAudio.findOne({name : req.body.name, module : req.body.module}));
            }
            else{
                return res.status(200).send("Scenario already exist in database")
            }
        })
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const getAsset = async(req,res)=>{
    try {
        await game10AssetAndAudio.findOne({name : req.body.name, module : req.body.module}).then(async result =>{
            if(!result){
                return res.status(200).send("No such scenario exists")
            }
            else if(result.story.populated==false || result.game1.populated==false || result.game2.populated==false || result.game3.populated==false){
                return res.status(200).send("The Scenario is incomplete.")
            }
            else {
                
                // fetching URLs for the Story
                var storyImages = [], storyAudios = [];

                var getObjectParams = {
                    Bucket: bucketName,
                    Key: result.bookCoverImage
                };
                var command = new GetObjectCommand(getObjectParams);
                var bookCoverImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                getObjectParams = {
                    Bucket: bucketName,
                    Key: result.bookTitleAudio
                };
                command = new GetObjectCommand(getObjectParams);
                var bookTitleAudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                // getting URLs for images and audios of 'Story part' of the game
                for (let i = 0; i < result.story.images.length; i++) {

                    var currrentImage = String(result.story.images[i]);
                    var currrentAudio = String(result.story.audios[i]);

                    var getObjectParams = {
                        Bucket: bucketName,
                        Key: currrentImage
                    };
                    var command = new GetObjectCommand(getObjectParams);
                    var url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                    storyImages.push(url);

                    getObjectParams = {
                        Bucket: bucketName,
                        Key: currrentAudio
                    };
                    command = new GetObjectCommand(getObjectParams);
                    url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                    storyAudios.push(url);
                }

                getObjectParams = {
                    Bucket: bucketName,
                    Key: result.audioPromptBeforeGameStarts
                };
                command = new GetObjectCommand(getObjectParams);
                var audioPromptBeforeGameStartsUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                // fetching URLs for Game 1
                var game1Images = [], game1Audios = [];

                getObjectParams = {
                    Bucket: bucketName,
                    Key: result.game1.initialAudioPrompt
                };
                command = new GetObjectCommand(getObjectParams);
                var game1InitialAudioPromptUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                for (let i = 0; i < result.game1.images.length; i++) {

                    var currrentImage = String(result.game1.images[i]);
                    var currrentAudio = String(result.game1.audios[i]);

                    var getObjectParams = {
                        Bucket: bucketName,
                        Key: currrentImage
                    };
                    var command = new GetObjectCommand(getObjectParams);
                    var url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                    game1Images.push(url);

                    getObjectParams = {
                        Bucket: bucketName,
                        Key: currrentAudio
                    };
                    command = new GetObjectCommand(getObjectParams);
                    url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                    game1Audios.push(url);
                }

                // fetching URLs for game 2
                var game2Audios = [];

                getObjectParams = {
                    Bucket: bucketName,
                    Key: result.game2.initialAudioPrompt
                };
                command = new GetObjectCommand(getObjectParams);
                var game2InitialAudioPromptUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                getObjectParams = {
                    Bucket: bucketName,
                    Key: result.game2.image
                };
                command = new GetObjectCommand(getObjectParams);
                var game2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                getObjectParams = {
                    Bucket: bucketName,
                    Key: result.game2.correctOption.audio
                };
                command = new GetObjectCommand(getObjectParams);
                var game2CorrectOptionAudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
                game2Audios.push(await getSignedUrl(s3, command, { expiresIn: 3600 }));

                getObjectParams = {
                    Bucket: bucketName,
                    Key: result.game2.option1.audio
                };
                command = new GetObjectCommand(getObjectParams);
                var game2Option1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
                game2Audios.push(await getSignedUrl(s3, command, { expiresIn: 3600 }));

                getObjectParams = {
                    Bucket: bucketName,
                    Key: result.game2.option2.audio
                };
                command = new GetObjectCommand(getObjectParams);
                var game2Option2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
                game2Audios.push(await getSignedUrl(s3, command, { expiresIn: 3600 }));

                /*
                var game2Array = [{'correctOption' : [game2CorrectOptionAudioUrl, result.game2.correctOption.text]},
                                    {'option1' : [game2Option1AudioUrl, result.game2.option1.text]},
                                    {'option2' : [game2Option2AudioUrl, result.game2.option2.text]}];
                */
                var game2Array = [
                    [game2CorrectOptionAudioUrl, result.game2.correctOption.text, true], // Correct option, hence 'True'
                    [game2Option1AudioUrl, result.game2.option1.text, false], // Incorrect option, hence 'False'
                    [game2Option2AudioUrl, result.game2.option2.text, false] // Incorrect option, hence 'False'
                ];
                var shuffled1 = fisherYatesShuffle(game2Array);

                // fetching URLs for game3
                getObjectParams = {
                    Bucket: bucketName,
                    Key: result.game3.initialAudioPrompt
                };
                command = new GetObjectCommand(getObjectParams);
                var game3InitialAudioPromptUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                getObjectParams = {
                    Bucket: bucketName,
                    Key: result.game3.correctOption1.image
                };
                command = new GetObjectCommand(getObjectParams);
                var game3CorrectOption1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                getObjectParams = {
                    Bucket: bucketName,
                    Key: result.game3.correctOption1.audio
                };
                command = new GetObjectCommand(getObjectParams);
                var game3CorrectOption1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                getObjectParams = {
                    Bucket: bucketName,
                    Key: result.game3.correctOption2.image
                };
                command = new GetObjectCommand(getObjectParams);
                var game3CorrectOption2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                getObjectParams = {
                    Bucket: bucketName,
                    Key: result.game3.correctOption2.audio
                };
                command = new GetObjectCommand(getObjectParams);
                var game3CorrectOption2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                getObjectParams = {
                    Bucket: bucketName,
                    Key: result.game3.option1.image
                };
                command = new GetObjectCommand(getObjectParams);
                var game3Option1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                getObjectParams = {
                    Bucket: bucketName,
                    Key: result.game3.option1.audio
                };
                command = new GetObjectCommand(getObjectParams);
                var game3Option1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
                
                getObjectParams = {
                    Bucket: bucketName,
                    Key: result.game3.option2.image
                };
                command = new GetObjectCommand(getObjectParams);
                var game3Option2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

                getObjectParams = {
                    Bucket: bucketName,
                    Key: result.game3.option2.audio
                };
                command = new GetObjectCommand(getObjectParams);
                var game3Option2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
/*
                var game3Array = [{'correctOption1' : [game3CorrectOption1ImageUrl, game3CorrectOption1AudioUrl, result.game3.correctOption1.text]},
                                    {'correctOption2' : [game3CorrectOption2ImageUrl, game3CorrectOption2AudioUrl, result.game3.correctOption2.text]},
                                    {'option1' : [game3Option1ImageUrl, game3Option1AudioUrl, result.game3.option1.text]},
                                    {'option2' : [game3Option2ImageUrl, game3Option2AudioUrl, result.game3.option2.text]}
                                ];
                                */
                var game3Array = [
                    [game3CorrectOption1ImageUrl, game3CorrectOption1AudioUrl, result.game3.correctOption1.text, true], // Correct option, hence 'True'
                    [game3CorrectOption2ImageUrl, game3CorrectOption2AudioUrl, result.game3.correctOption2.text, true], // Correct option, hence 'True'
                    [game3Option1ImageUrl, game3Option1AudioUrl, result.game3.option1.text, false], // Incorrect option, hence 'False'
                    [game3Option2ImageUrl, game3Option2AudioUrl, result.game3.option2.text, false] // Incorrect option, hence 'False'
                ];
                var shuffled2  = fisherYatesShuffle(game3Array);

                return res.status(200).send({
                    bookTitle : result.bookTitle,
                    bookCoverImageUrl,
                    bookTitleAudioUrl,
                    audioPromptBeforeGameStartsUrl,
                    storyImages,
                    storyAudios,
                    storyTexts : result.story.texts,
                    game1InitialAudioPromptUrl,
                    game1Images,
                    game1Audios,
                    game2InitialAudioPromptUrl,
                    game2ImageUrl,
                    'game2' : shuffled1,
                    game3InitialAudioPromptUrl,
                    'game3' : shuffled2
                })
            }
        })
    } catch (error) {
        
    }
}

const getAll = async (req, res) => {
    try {
        const assets = await game10AssetAndAudio.find();
        res.status(200).send(assets);
    } catch (error) {
        console.log(error.toString());
        res.status(400).json({ message: 'Error. Something went wrong.' });
    }
}

const getById = async(req,res) =>{
    try {
        const id = req.params.id;
        const result = await game10AssetAndAudio.findById(id);

        // fetching URLs for the Story
        var storyImages = [], storyAudios = [];

        var getObjectParams = {
            Bucket: bucketName,
            Key: result.bookCoverImage
        };
        var command = new GetObjectCommand(getObjectParams);
        var bookCoverImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
            Bucket: bucketName,
            Key: result.bookTitleAudio
        };
        command = new GetObjectCommand(getObjectParams);
        var bookTitleAudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        // getting URLs for images and audios of 'Story part' of the game
        for (let i = 0; i < result.story.images.length; i++) {

            var currrentImage = String(result.story.images[i]);
            var currrentAudio = String(result.story.audios[i]);

            var getObjectParams = {
                Bucket: bucketName,
                Key: currrentImage
            };
            var command = new GetObjectCommand(getObjectParams);
            var url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            storyImages.push(url);

            getObjectParams = {
                Bucket: bucketName,
                Key: currrentAudio
            };
            command = new GetObjectCommand(getObjectParams);
            url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            storyAudios.push(url);
        }

        getObjectParams = {
            Bucket: bucketName,
            Key: result.audioPromptBeforeGameStarts
        };
        command = new GetObjectCommand(getObjectParams);
        var audioPromptBeforeGameStartsUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        // fetching URLs for Game 1
        var game1Images = [], game1Audios = [];

        getObjectParams = {
            Bucket: bucketName,
            Key: result.game1.initialAudioPrompt
        };
        command = new GetObjectCommand(getObjectParams);
        var game1InitialAudioPromptUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        for (let i = 0; i < result.game1.images.length; i++) {

            var currrentImage = String(result.game1.images[i]);
            var currrentAudio = String(result.game1.audios[i]);

            var getObjectParams = {
                Bucket: bucketName,
                Key: currrentImage
            };
            var command = new GetObjectCommand(getObjectParams);
            var url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            game1Images.push(url);

            getObjectParams = {
                Bucket: bucketName,
                Key: currrentAudio
            };
            command = new GetObjectCommand(getObjectParams);
            url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            game1Audios.push(url);
        }

        // fetching URLs for game 2
        getObjectParams = {
            Bucket: bucketName,
            Key: result.game2.initialAudioPrompt
        };
        command = new GetObjectCommand(getObjectParams);
        var game2InitialAudioPromptUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
            Bucket: bucketName,
            Key: result.game2.image
        };
        command = new GetObjectCommand(getObjectParams);
        var game2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
            Bucket: bucketName,
            Key: result.game2.correctOption.audio
        };
        command = new GetObjectCommand(getObjectParams);
        var game2CorrectOptionAudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
            Bucket: bucketName,
            Key: result.game2.option1.audio
        };
        command = new GetObjectCommand(getObjectParams);
        var game2Option1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
            Bucket: bucketName,
            Key: result.game2.option2.audio
        };
        command = new GetObjectCommand(getObjectParams);
        var game2Option2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        // fetching URLs for game3
        getObjectParams = {
            Bucket: bucketName,
            Key: result.game3.initialAudioPrompt
        };
        command = new GetObjectCommand(getObjectParams);
        var game3InitialAudioPromptUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
            Bucket: bucketName,
            Key: result.game3.correctOption1.image
        };
        command = new GetObjectCommand(getObjectParams);
        var game3CorrectOption1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
            Bucket: bucketName,
            Key: result.game3.correctOption1.audio
        };
        command = new GetObjectCommand(getObjectParams);
        var game3CorrectOption1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
            Bucket: bucketName,
            Key: result.game3.correctOption2.image
        };
        command = new GetObjectCommand(getObjectParams);
        var game3CorrectOption2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
            Bucket: bucketName,
            Key: result.game3.correctOption2.audio
        };
        command = new GetObjectCommand(getObjectParams);
        var game3CorrectOption2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
            Bucket: bucketName,
            Key: result.game3.option1.image
        };
        command = new GetObjectCommand(getObjectParams);
        var game3Option1ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
            Bucket: bucketName,
            Key: result.game3.option1.audio
        };
        command = new GetObjectCommand(getObjectParams);
        var game3Option1AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
        
        getObjectParams = {
            Bucket: bucketName,
            Key: result.game3.option2.image
        };
        command = new GetObjectCommand(getObjectParams);
        var game3Option2ImageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
            Bucket: bucketName,
            Key: result.game3.option2.audio
        };
        command = new GetObjectCommand(getObjectParams);
        var game3Option2AudioUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        return res.status(200).send({
             result,
             bookCoverImageUrl,
             bookTitleAudioUrl,
             storyImages,
             storyAudios,
             audioPromptBeforeGameStartsUrl,
             game1InitialAudioPromptUrl,
             game1Images,
             game1Audios,
             game2InitialAudioPromptUrl,
             game2ImageUrl,
             game2CorrectOptionAudioUrl,
             game2Option1AudioUrl,
             game2Option2AudioUrl,
             game3InitialAudioPromptUrl,
             game3CorrectOption1ImageUrl,
             game3CorrectOption1AudioUrl,
             game3CorrectOption2ImageUrl,
             game3CorrectOption2AudioUrl,
             game3Option1ImageUrl,
             game3Option1AudioUrl,
             game3Option2ImageUrl,
             game3Option2AudioUrl
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error. Something went wrong' });
    }
}

const deleteById = async (req, res) => {
    try {
        var asset = await game10AssetAndAudio.findById(req.params.id);

        if (!asset) {
            res.status(404).json({
                message: "Record not found"
            })
            return;
        }

        await game10AssetAndAudio.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: "done"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error. Something went wrong' });
    }
}

const updateStory = async(req,res) =>{
    try {
        var images = [], audios = [], texts = [];

        var bookCoverImage = req.files['bookCoverImage'][0];
        var params = {
            Bucket: bucketName,
            Key: bookCoverImage.originalname,
            Body: bookCoverImage.buffer,
            ContentType: bookCoverImage.mimetype
        }
        var command = new PutObjectCommand(params);
        await s3.send(command);

        var bookTitleAudio = req.files['bookTitleAudio'][0];
        params = {
            Bucket: bucketName,
            Key: bookTitleAudio.originalname,
            Body: bookTitleAudio.buffer,
            ContentType: bookTitleAudio.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);
   
        for (let i = 0; i < 10; i++) {

            var string1 = "storyImage".concat(i + 1);
            var string2 = "storyAudio".concat(i + 1);
            var string3 = "text".concat(i+1);
    
            if(!req.files[string1])
                break;

            var imageFile = req.files[string1][0];
        
            var params = {
                Bucket: bucketName,
                Key: imageFile.originalname,
                Body: imageFile.buffer,
                ContentType: imageFile.mimetype
            }
            var command = new PutObjectCommand(params);
            await s3.send(command);
            images.push(imageFile.originalname);
            
            var audioFile = req.files[string2][0];
            params = {
                Bucket: bucketName,
                Key: audioFile.originalname,
                Body: audioFile.buffer,
                ContentType: audioFile.mimetype
            }
            command = new PutObjectCommand(params);
            await s3.send(command);
            audios.push(audioFile.originalname);

            texts.push(req.body[string3.valueOf()]);
        }

        var audioPromptBeforeGameStarts = req.files['audioPromptBeforeGameStarts'][0];
        params = {
            Bucket: bucketName,
            Key: audioPromptBeforeGameStarts.originalname,
            Body: audioPromptBeforeGameStarts.buffer,
            ContentType: audioPromptBeforeGameStarts.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        const document = {
            name : req.body.name,
            module : req.body.module,
            bookCoverImage : bookCoverImage.originalname,
            bookTitle : req.body.bookTitle,
            bookTitleAudio : bookTitleAudio.originalname,
            story : {
                populated : true,
                images : images,
                audios : audios,
                texts : texts
            },
            audioPromptBeforeGameStarts : audioPromptBeforeGameStarts.originalname
        }

        await game10AssetAndAudio.updateOne({
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

const updateGame1 = async(req,res) =>{
    try {
        var initialAudioPrompt = req.files['initialAudioPrompt'][0];
        var params = {
            Bucket: bucketName,
            Key: initialAudioPrompt.originalname,
            Body: initialAudioPrompt.buffer,
            ContentType: initialAudioPrompt.mimetype
        }
        var command = new PutObjectCommand(params);
        await s3.send(command);

        var images = [];
        for (let i = 0; i < 4; i++) {
            var s = "image".concat(i + 1);
            var imageFile = req.files[s][0];

            var params = {
                Bucket: bucketName,
                Key: imageFile.originalname,
                Body: imageFile.buffer,
                ContentType: imageFile.mimetype
            }
            var command = new PutObjectCommand(params);
            await s3.send(command);

            images.push(imageFile.originalname);
        }

        var audios = [];
        for (let i = 0; i < 4; i++) {
            var s = "audio".concat(i + 1);
            var audioFile = req.files[s][0];

            var params = {
                Bucket: bucketName,
                Key: audioFile.originalname,
                Body: audioFile.buffer,
                ContentType: audioFile.mimetype
            }
            var command = new PutObjectCommand(params);
            await s3.send(command);

            audios.push(audioFile.originalname);
        }

        const document = {
            game1 : {
                populated : true,
                initialAudioPrompt : initialAudioPrompt.originalname,
                images : images,
                audios : audios
            }
        }
        
        await game10AssetAndAudio.updateOne({
            _id: req.params.id
        },
            document);

        res.status(200).json({
            message: "done"
        })
    } catch (error) {
        res.status(400).json({ message: 'Error. Something went wrong' });
    }
}

const updateGame2 = async(req,res) =>{
    try {
        var initialAudioPrompt = req.files['initialAudioPrompt'][0];
        var params = {
            Bucket: bucketName,
            Key: initialAudioPrompt.originalname,
            Body: initialAudioPrompt.buffer,
            ContentType: initialAudioPrompt.mimetype
        }
        var command = new PutObjectCommand(params);
        await s3.send(command);

        var image = req.files['image'][0];
        params = {
            Bucket: bucketName,
            Key: image.originalname,
            Body: image.buffer,
            ContentType: image.mimetype
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

        var option1Audio = req.files['option1Audio'][0];
        params = {
            Bucket: bucketName,
            Key: option1Audio.originalname,
            Body: option1Audio.buffer,
            ContentType: option1Audio.mimetype
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

        const document = {
            game2: {
                populated: true,
                initialAudioPrompt: initialAudioPrompt.originalname,
                image: image.originalname,
                correctOption: {
                    text: req.body.correctOptionText,
                    audio: correctOptionAudio.originalname
                },
                option1: {
                    text: req.body.option1Text,
                    audio: option1Audio.originalname
                },
                option2: {
                    text: req.body.option2Text,
                    audio: option2Audio.originalname,
                }
            }
        }
        await game10AssetAndAudio.updateOne({
            _id: req.params.id
        },
            document);

        res.status(200).json({
            message: "done"
        })
        
    } catch (error) {
        res.status(400).json({ message: 'Error. Something went wrong' });
    }
}

const updateGame3 = async(req,res) =>{
    try {
        var initialAudioPrompt = req.files['initialAudioPrompt'][0];
        var params = {
            Bucket: bucketName,
            Key: initialAudioPrompt.originalname,
            Body: initialAudioPrompt.buffer,
            ContentType: initialAudioPrompt.mimetype
        }
        var command = new PutObjectCommand(params);
        await s3.send(command);

        var correctOption1Image = req.files['correctOption1Image'][0];
        params = {
            Bucket: bucketName,
            Key: correctOption1Image.originalname,
            Body: correctOption1Image.buffer,
            ContentType: correctOption1Image.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var correctOption1Audio = req.files['correctOption1Audio'][0];
        params = {
            Bucket: bucketName,
            Key: correctOption1Audio.originalname,
            Body: correctOption1Audio.buffer,
            ContentType: correctOption1Audio.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var correctOption2Image = req.files['correctOption2Image'][0];
        params = {
            Bucket: bucketName,
            Key: correctOption2Image.originalname,
            Body: correctOption2Image.buffer,
            ContentType: correctOption2Image.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        var correctOption2Audio = req.files['correctOption2Audio'][0];
        params = {
            Bucket: bucketName,
            Key: correctOption2Audio.originalname,
            Body: correctOption2Audio.buffer,
            ContentType: correctOption2Audio.mimetype
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

        const document = {
            game3: {
                populated : true,
                initialAudioPrompt : initialAudioPrompt.originalname,
                correctOption1: {
                    image : correctOption1Image.originalname,
                    audio : correctOption1Audio.originalname,
                    text : req.body.correctOption1Text
                },
                correctOption2: {
                    image : correctOption2Image.originalname,
                    audio : correctOption2Audio.originalname,
                    text : req.body.correctOption2Text
                },
                option1: {
                    image : option1Image.originalname,
                    audio : option1Audio.originalname,
                    text : req.body.option1Text
                },
                option2: {
                    image : option2Image.originalname,
                    audio : option2Audio.originalname,
                    text : req.body.option2Text
                }
            }
        }
        await game10AssetAndAudio.updateOne({
            _id: req.params.id
        },
            document);

        res.status(200).json({
            message: "done"
        })

    } catch (error) {
        res.status(400).json({ message: 'Error. Something went wrong' });
    }
}

function fisherYatesShuffle (array1){
    let currentIndex = array1.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor( Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array1[currentIndex], array1[randomIndex]] = [
      array1[randomIndex], array1[currentIndex]];
        
  }
  return array1;
  
}

function shuffle(arr) {
    var i = arr.length, j, temp;
    while(--i > 0){
      j = Math.floor(Math.random()*(i+1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
  }


module.exports = {addStory, addGame1, addGame2, addGame3,getAsset, getAll, getById, deleteById,  updateStory, updateGame1, updateGame2, updateGame3};