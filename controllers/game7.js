const game7Asset = require('../model/game7Asset');
const game7Audio = require('../model/game7Audio');
const User = require('../model/user');
const {S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand} = require('@aws-sdk/client-s3')
const dotenv = require('dotenv');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const jwt = require('jsonwebtoken');

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

//  Adding  Image files to S3 bucket and their names to Mongo Db
const addAsset = async(req, res) => {

    // pushing mainImages to S3 bucket
    var main_imgs = [];
    try {
        for(let i=0;i<req.files['mainImages'].length;i++){
            var imageFile = req.files['mainImages'][i];
            //console.log(imageFile);
            
            var params = {
                Bucket: bucketName,
                Key: imageFile.originalname,
                Body: imageFile.buffer,
                ContentType: imageFile.mimetype
            }
            var command = new PutObjectCommand(params);
            await s3.send(command);
            
            main_imgs.push(imageFile.originalname);
        }
        main_imgs.sort();
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Error. Something went wrong' });
        return;
    }

    // pushing completeImage to S3 bucket
    var complete_img =  req.files['completeImage'][0];
    
    try {
        if (complete_img != null) {
            var params = {
                Bucket: bucketName,
                Key: complete_img.originalname,
                Body: complete_img.buffer,
                ContentType: complete_img.mimetype
            }

            command = new PutObjectCommand(params);
            await s3.send(command);

        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Error. Something went wrong' });
        return;
    }
    
   // Storing Data into MongoDb
    await game7Asset.findOne({Name : req.body.Name}).then(async (scenario) =>{
        if(scenario){
            res.status(200).send('Scenario already present in Database');
        }
        else{
            if(main_imgs.length!=4)
            {
                res.status(400).send('Number of Main images uploaded is less than 4');
                return;
            }
            const document = new game7Asset({Name: req.body.Name, MainImages: main_imgs,CompleteImage: complete_img.originalname, Text1: req.body.Text1, Text2: req.body.Text2, Letter: req.body.Letter});
            document.save().then(result => {
                res.status(200).send(result);
            }).catch(err =>{
                console.log(err);
                res.status(400).json({ message: 'Error. Something went wrong' });
            });
        }
    })
    
}

// adding audio files to S3 bucket and their names to Mongo Db
const addAudio = async (req, res) => {

    // returns if any of the 3 files is missing
    try {
        var initial_prompt = req.files['initialPrompt'][0];
        var letter_sound = req.files['letterSound'][0];
        var last_prompt = req.files['lastPrompt'][0];
    } catch (error) {
        res.status(400).json({message : "Input is wrong. One or more files are missing."});
        return;
    }
    

    // sending Initial Prompt Audio to S3
    try{
        const params = {
            Bucket: bucketName,
            Key: initial_prompt.originalname,
            Body: initial_prompt.buffer,
            ContentType: initial_prompt.mimetype
        }

        const command = new PutObjectCommand(params);
        await s3.send(command);
        //console.log(initial_prompt.originalname);
    }
    catch(err){
        console.log(err);
        res.status(400).json({ message: 'Error. Something went wrong' });
        return;
    }

    // sending Letter Sound to S3
    try{
        const params = {
            Bucket: bucketName,
            Key: letter_sound.originalname,
            Body: letter_sound.buffer,
            ContentType: letter_sound.mimetype
        }
    
        const command = new PutObjectCommand(params);
        await s3.send(command);
    }
    catch(err){
        console.log(err);
        res.status(400).json({ message: 'Error. Something went wrong' });
        return;
    }

    // sending Last Prompt Audio to S3
    try{
        const params = {
            Bucket: bucketName,
            Key: last_prompt.originalname,
            Body: last_prompt.buffer,
            ContentType: last_prompt.mimetype
        }
    
        const command = new PutObjectCommand(params);
        await s3.send(command);
    }
    catch(err){
        console.log(err);
        res.status(400).json({ message: 'Error. Something went wrong' });
        return;
    }

    // Adding Audio files's names to Mongo Db
    game7Audio.findOne({ Name: req.body.Name }).then(async scenario => {
        if (!scenario) {
            const Audio = new game7Audio({
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
            res.status(200).send('Audio already added');

        }
    }).catch(err => {
        console.log(err);
        res.status(400).json({ message: 'Error. Something went wrong' });
    });
};

// To Send Response(Urls from S3, data from Mongo) to Frontend
const getAsset = async (req,res) => {

    var br = false;

    await game7Asset.findOne({Name : req.body.Name}).then(async result =>{
        // if requested data is in the database
        if(result){
            var to_frontend = [];
            var main_imgs_urls = [];
            var main_imgs_list = result.MainImages;
            var complete_img = result.CompleteImage;
            var initial_prompt_url;
            var letter_sound_url;
            var last_prompt_url;

            //getting the main images url from S3
            for(let i=0;i<main_imgs_list.length;i++){
                var curr_img = String(main_imgs_list[i]);
                const getObjectParams = {
                    Bucket: bucketName,
                    Key: curr_img,
                };

                const command = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                main_imgs_urls.push(url);

            }

            // Making 3 sets of side image urls for frontend
            let array = [1, 2, 3, 4];
            let positions = removeRandomValueAndShuffle(array);   
            //console.log("random positions generated are : ", positions)
            
            for (let i = 0; i < 3; i++) {
               let image_set = [];
            
               var new_arr = removeValueFromArray(array, positions[i]);
               new_arr = removeRandomValue(new_arr);
               new_arr.push(positions[i]);
               new_arr = shuffleArray(new_arr);
               to_frontend.push(new_arr);
            }

            // getting Complete image url from S3
            let getObjectParams = {
                Bucket: bucketName,
                Key: complete_img,
            };
            let command = new GetObjectCommand(getObjectParams);
            let complete_img_url = await getSignedUrl(s3, command, { expiresIn: 3600 });

            // Getting Audio Urls
            await game7Audio.findOne({ Name: req.body.Name }).then(async scenario => {
                if(scenario){
                    var initial_prompt = scenario.InitialPrompt;
                    var letter_sound = scenario.LetterSound;
                    var last_prompt = scenario.LastPrompt;
                    
                    const getObjectParams1 = {
                        Bucket: bucketName,
                        Key: initial_prompt,
                    };
                    const command1 = new GetObjectCommand(getObjectParams1);
                    const url1 = await getSignedUrl(s3, command1, { expiresIn: 3600 });
                    initial_prompt_url = url1;

                    const getObjectParams2 = {
                        Bucket: bucketName,
                        Key: letter_sound,
                    };
                    const command2 = new GetObjectCommand(getObjectParams2);
                    url2 = await getSignedUrl(s3, command2, { expiresIn: 3600 });
                    letter_sound_url = url2;

                    const getObjectParams3 = {
                        Bucket: bucketName,
                        Key: last_prompt,
                    };
                    const command3 = new GetObjectCommand(getObjectParams3);
                    const url3 = await getSignedUrl(s3, command3, { expiresIn: 3600 });
                    last_prompt_url = url3;  
                }  
            }).catch(err => { res.status(400).send({ 'err 2': err }); br = true; });

            if(br == false){
                res.status(200).send({ 'mainImages': main_imgs_urls, 'sideImages' : to_frontend, 'completeImage' : complete_img_url, 'missingImages' : positions , 'text1' : result.Text1, 
                    'text2' : result.Text2, 'initialPromptAudio' : initial_prompt_url, 'letterSoundAudio' : letter_sound_url, lastPromptAudio : last_prompt_url });
            }

        }else {
            res.status(400).send('No such Scenario in Database');
        }
    }).catch(err => {
        res.status(400).send({ 'error 3': err });
    });
}

function removeValueFromArray(arr, val) {
    return arr.filter(function (elem) {
       return elem != val;
    });
 }
 function removeRandomValue(arr) {
 
    let random_val = arr[(Math.floor(Math.random() * arr.length))];
    return arr.filter(function (elem) {
       return elem != random_val;
    });
 }
 function shuffleArray(arr){
    let shuffled = arr.map(value => ({ value, sort: Math.random() }))
       .sort((a, b) => a.sort - b.sort)
       .map(({ value }) => value)
    return shuffled;
 }
 function removeRandomValueAndShuffle(arr) {
 
    let random_val = arr[(Math.floor(Math.random() * arr.length))];
    let new_arr = arr.filter(function (elem) {
       return elem != random_val;
    });
 
    let shuffled = new_arr.map(value => ({ value, sort: Math.random() }))
       .sort((a, b) => a.sort - b.sort)
       .map(({ value }) => value)
    return shuffled;
 }


// ----------------------- Only for Development Phase ----------------------
const getAllAssets = async (req, res) => {
    try {
        const assets = await game7Asset.find();
        res.status(200).send(assets);
    } catch (error) {
        console.log(error.toString());
        res.status(400).json({ message: 'Error. Something went wrong.' });
    }
}

const getAllAudios = async (req, res) => {
    try {
        const audios = await game7Audio.find();
        res.status(200).send(audios);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error. Something went wrong' });
    }
}

const getAssestById = async (req, res) => {        
    try {
        const id =req.params.id;
        const asset = await game7Asset.findById(id);

        var main_imgs_urls = [];
        var main_imgs_list = asset.MainImages;
        var complete_img = asset.CompleteImage;

        // generating Urls for Main Images
        for(let i=0;i<main_imgs_list.length;i++){
            var curr_img = String(main_imgs_list[i]);
            const getObjectParams = {
                Bucket: bucketName,
                Key: curr_img,
            };

            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            main_imgs_urls.push(url);
        }

        // getting Complete image url from S3
        let getObjectParams = {
            Bucket: bucketName,
            Key: complete_img,
        };
        let command = new GetObjectCommand(getObjectParams);
        let complete_img_url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        res.status(200).send({asset : asset, mainImageURLs : main_imgs_urls, completeImageUrl : complete_img_url});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error. Something went wrong' });
    }
}

const getAudioByID = async (req, res) => {
    try {
        const id = req.params.id;
        const audio = await game7Audio.findById(id);

        var initial_prompt = audio.InitialPrompt;
        var letter_sound = audio.LetterSound;
        var last_prompt = audio.LastPrompt;

        var getObjectParams = {
            Bucket: bucketName,
            Key: initial_prompt,
        };
        var command = new GetObjectCommand(getObjectParams);
        var initial_prompt_url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
            Bucket: bucketName,
            Key: letter_sound,
        };
        command = new GetObjectCommand(getObjectParams);
        var letter_sound_url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        getObjectParams = {
            Bucket: bucketName,
            Key: last_prompt,
        };
        command = new GetObjectCommand(getObjectParams);
        var last_prompt_url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        res.status(200).send({ audio: audio, InitialPromptURL: initial_prompt_url, LetterSoundURL: letter_sound_url, LastPromptURL: last_prompt_url });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error. Something went wrong' });
    }
}

const deleteAsset = async (req, res) => {
    try {
        var asset = await game7Asset.findById(req.params.id );
        
        if (!asset) {
            res.status(404).json({
                message: "Record not found"
            })
            return;
        }
/*
        for (let i = 0; i < asset.MainImages.length; i++) {

            var params = {
                Bucket: bucketName,
                Key: asset.MainImages[i],
            }
            var command = new DeleteObjectCommand(params);
            await s3.send(command);
        }

        var params = {
            Bucket: bucketName,
            Key: asset.CompleteImage,
        }
        var command = new DeleteObjectCommand(params);
        await s3.send(command);
*/
        await game7Asset.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: "done"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error. Something went wrong' });
    }
}

const deleteAudio = async(req,res) =>{
    try {

        var audio = await game7Audio.findById(req.params.id);
        if(!audio){
            res.status(404).json({
                message: "Record not found"
            });
            return;
        }
/*
        var params = {
            Bucket: bucketName,
            Key: audio.InitialPrompt,
        }
        var command = new DeleteObjectCommand(params);
        await s3.send(command);

        params = {
            Bucket: bucketName,
            Key: audio.LetterSound,
        }
        command = new DeleteObjectCommand(params);
        await s3.send(command);

        params = {
            Bucket: bucketName,
            Key: audio.LastPrompt,
        }
        command = new DeleteObjectCommand(params);
        await s3.send(command);
*/
        await game7Audio.deleteOne({_id : req.params.id});
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
        //req.files['mainImages'] == null
        // adding this condition becoz : if id in url is wrong or no image is added to 'mainImages' in postman, then req.files['mainImages'].length!= 4
        // waali line runs and we get an error ki null ki length kaise check kare and hence program crashes
        if (req.files['mainImages'] == null || req.files['mainImages'].length != 4 || req.files['completeImage'] == null) {
            res.status(400).json({
                message: "Please provide the images correctly"
            })
            return;
        }

        var main_imgs = [];
        for (let i = 0; i < req.files['mainImages'].length; i++) {
            var imageFile = req.files['mainImages'][i];

            var params = {
                Bucket: bucketName,
                Key: imageFile.originalname,
                Body: imageFile.buffer,
                ContentType: imageFile.mimetype
            }
            var command = new PutObjectCommand(params);
            await s3.send(command);

            main_imgs.push(imageFile.originalname);
        }
        main_imgs.sort();

        // pushing completeImage to S3 bucket
        var complete_img = req.files['completeImage'][0];

        if (complete_img != null) {
            var params = {
                Bucket: bucketName,
                Key: complete_img.originalname,
                Body: complete_img.buffer,
                ContentType: complete_img.mimetype
            }
            command = new PutObjectCommand(params);
            await s3.send(command);
        }

        // below commented line was causing problem as it was creating new object of 'game7Asset' with new _id. but our 'to be modified' object has its own _id. Hence error
        //const document = new game7Asset({ Name: req.body.Name, MainImages: main_imgs, CompleteImage: complete_img.originalname, Text1: req.body.Text1, Text2: req.body.Text2, Letter: req.body.Letter });
        const document = { Name: req.body.Name, MainImages: main_imgs, CompleteImage: complete_img.originalname, Text1: req.body.Text1, Text2: req.body.Text2, Letter: req.body.Letter };
        await game7Asset.updateOne({
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

const updateAudio = async(req,res) =>{

    // If any of the 3 files is missing, we get error due to that field being null. hence catch runs and returns if any of the 3 files is missing
    try {
        var initial_prompt = req.files['initialPrompt'][0];
        var letter_sound = req.files['letterSound'][0];
        var last_prompt = req.files['lastPrompt'][0];
    } catch (error) {
        res.status(400).send("Input is wrong. One or more files are missing.");
        return;
    }

    try {

        // updating initialprompt on S3
        var params = {
            Bucket: bucketName,
            Key: initial_prompt.originalname,
            Body: initial_prompt.buffer,
            ContentType: initial_prompt.mimetype
        }
        var command = new PutObjectCommand(params);
        await s3.send(command);

        // updating letterSound on S3
        params = {
            Bucket: bucketName,
            Key: letter_sound.originalname,
            Body: letter_sound.buffer,
            ContentType: letter_sound.mimetype
        }
        command = new PutObjectCommand(params);
        await s3.send(command);

        // updating lastPrompt on S3
        params = {
            Bucket: bucketName,
            Key: last_prompt.originalname,
            Body: last_prompt.buffer,
            ContentType: last_prompt.mimetype
        }

        command = new PutObjectCommand(params);
        await s3.send(command);

        const document = { Name: req.body.Name, InitialPrompt: initial_prompt.originalname, LetterSound: letter_sound.originalname, LastPrompt: last_prompt.originalname };
        await game7Audio.updateOne({
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

function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null)
        return res.status(401).json({ message: 'No Token provided!' });

    jwt.verify(token, process.env.JWT, (err, user) => {

        if (err)
            return res.status(401).json({ message: 'Invalid Token.' });

        req.user = user;
        next();
    })


}
async function AuthorizeUser(req, res, next) {
    const result = await User.findOne({ _id: req.user.id });
    if (result.Role !== 'Admin') {
        return res.status(403).json({ 'message': 'Unauthorized User. Access Denied.' });
    }
    next();
}

 
module.exports = { addAsset, addAudio, getAsset, getAllAssets, getAllAudios, getAssestById, getAudioByID, deleteAsset, deleteAudio, updateAsset, updateAudio, authenticateToken, AuthorizeUser }