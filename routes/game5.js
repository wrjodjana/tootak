const express = require('express');
const multer = require('multer');
const { addAsset, addAudio, getAsset } = require('../controllers/game5');

const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route('/addAsset').post(upload.fields([{ name: 'images' }, { name: 'Gif' }]), addAsset);

router.route('/addAudio').post(upload.single('audio'), addAudio);

router.route('/getAsset').get(getAsset);

module.exports = router;