const express = require('express')
const multer = require('multer');
const { addThumbnail, getThumbnail, update } = require('../controllers/thumbnail');
const router = express.Router()


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// router.route('/addThumbnail').post(upload.single('thumbnail'), addThumbnail);
router.route('/addThumbnail').post(upload.single('thumbnail'), addThumbnail);
router.route('/getThumbnail').get(getThumbnail);
// router.route('/update').get(update);
module.exports = router