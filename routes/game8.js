const express = require('express');
const multer = require('multer');
const {addAssetAndAudio, getAsset, getAllAssets, getAllAudios, deleteAsset, deleteAudio} = require('../controllers/game8')
const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route('/add').post(upload.fields([{ name: 'incompleteWordImage' },{ name: 'completeWordImage' },
                                                { name: 'correctOptionImageIndependentState' },{ name: 'correctOptionImageAttachedState' },
                                                { name: 'option1Image' },{ name: 'option2Image' },{ name: 'option3Image' },{ name: 'gif' },
                                                { name: 'completeWordAudio' },{ name: 'correctOptionAudio' },{ name: 'option1Audio' },
                                                { name: 'option2Audio' },{ name: 'option3Audio' },{ name: 'promptAudio1' },
                                                { name: 'promptAudio2' }]), addAssetAndAudio);

//router.route('/addAudio').post(upload.fields([{ name: 'promptAudio1' },{ name: 'promptAudio2' },]), addAudio);

router.route('/getAsset').get(getAsset); 

router.route('/getAssets').get(getAllAssets); 
router.route('/getAudios').get(getAllAudios); 
router.route('/deleteAsset/:id').delete(deleteAsset);  
router.route('/deleteAudio/:id').delete(deleteAudio);

module.exports = router;