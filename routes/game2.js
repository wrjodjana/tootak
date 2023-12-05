const express = require('express');
const multer = require('multer');
const {addAsset,addAudio, getAsset, getAllAssets,getAllAudios, deleteAllAssets, deleteAllAudios} = require('../controllers/game2');

const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route('/addAsset').post(upload.fields([{ name: 'image1' }, { name: 'image2' }, {name: 'audio'}]), addAsset);

router.route('/addAudio').post(upload.fields([{ name: 'promptAudio1' }, { name: 'promptAudio2' }]), addAudio);

router.route('/getAsset').get(getAsset);

router.route('/getAllAsset').get(getAllAssets);

router.route('/getAllAudio').get(getAllAudios);

router.route('/deleteAll').delete(deleteAllAssets);

router.route('/deleteAllAudios').delete(deleteAllAudios);

module.exports = router