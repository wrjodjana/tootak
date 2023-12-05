const express = require('express');
const multer = require('multer');
const { addAsset, getAsset, addAudio, getAllAssets, getAllAudiios,removeField } = require('../controllers/game4');

const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//router.route('/addAsset').post(upload.fields([{ name: 'image' }, { name: 'scratch' }, { name: 'Gif' }, { name: 'promptAudio' }]), addAsset);
router.route('/addAsset').post(upload.fields([{ name: 'image' }, { name: 'scratch' }, { name: 'Gif' }]), addAsset);

router.route('/addAudio').post(upload.fields([{ name: 'initialPrompt' },{ name: 'letterSound' },{ name: 'lastPrompt' }]), addAudio);

router.route('/getAsset').get(getAsset);

router.route('/getAllAssets').get(getAllAssets);

router.route('/getAllAudios').get(getAllAudiios);

//router.route('/removeField').put(removeField);

module.exports = router;