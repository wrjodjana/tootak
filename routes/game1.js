const express = require('express')
const multer = require('multer');
const { addImage, deleteImage, getImage, addAudio, getAudio, numberOfScenario, getAsset } = require('../controllers/game1')

const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.route('/addImage').post(upload.fields([{ name: 'image', maxCount: 1 }, { name: 'centerImage', maxCount: 1 }]), addImage);


router.route('/addAudio').post(upload.single('audio'), addAudio);

router.route('/getImage').get(getImage);

router.route('/getAsset').get(getAsset);

router.route('/deleteImage').delete(deleteImage);

router.route('/getAudio').get(getAudio);

router.route('/Scenario').get(numberOfScenario);

// router.route('/addThumbnail').post(upload.single('thumbnail'), addThumbnail);

// router.route('/abcd').post(upload.fields([{ name: 'image', maxCount: 1 }, { name: 'name', maxCount: 1 }]), abcd);

module.exports = router