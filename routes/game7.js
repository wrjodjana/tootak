const express = require('express');
const multer = require('multer');
const {addAsset, addAudio, getAsset, getAllAssets, getAllAudios, getAssestById, getAudioByID, deleteAsset, deleteAudio, updateAsset, updateAudio, authenticateToken, AuthorizeUser} = require('../controllers/game7');

const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route('/addAsset').post(upload.fields([{ name: 'mainImages' },{ name: 'completeImage' }]), authenticateToken, AuthorizeUser, addAsset);

router.route('/addAudio').post(upload.fields([{ name: 'initialPrompt' },{ name: 'letterSound' },{ name: 'lastPrompt' }]),authenticateToken, AuthorizeUser, addAudio);
//router.route('/addAudio').post(upload.single('audio'), addAudio);

router.route('/getAsset').get(getAsset);

// For Development Purpose only
router.route('/getAssets').get(authenticateToken, AuthorizeUser, getAllAssets);  
router.route('/getAudios').get(authenticateToken, AuthorizeUser, getAllAudios);
router.route('/getAsset/:id').get(authenticateToken, AuthorizeUser, getAssestById); 
router.route('/getAudio/:id').get(authenticateToken, AuthorizeUser, getAudioByID);
router.route('/deleteAsset/:id').delete(authenticateToken, AuthorizeUser, deleteAsset);  
router.route('/deleteAudio/:id').delete(authenticateToken, AuthorizeUser, deleteAudio);
router.route('/updateAsset/:id').put(upload.fields([{ name: 'mainImages' },{ name: 'completeImage' }]), authenticateToken, AuthorizeUser, updateAsset);
router.route('/updateAudio/:id').put(upload.fields([{ name: 'initialPrompt' },{ name: 'letterSound' },{ name: 'lastPrompt' }]), authenticateToken, AuthorizeUser, updateAudio);
module.exports = router;