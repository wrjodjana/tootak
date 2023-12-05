const express = require('express');
const multer = require('multer');
const { addAsset, addAudio, getAsset, getAllAssets, updateText2} = require('../controllers/game3');

const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route('/addImage').post(upload.single('Image'), addAsset);

router.route('/addAudio').post(upload.single('audio'), addAudio);

router.route('/getAsset').get(getAsset);

router.route('/getAllAssets').get(getAllAssets);

router.route('/updateText2').put(upload.none(), updateText2);

module.exports = router;