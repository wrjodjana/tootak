const express = require('express')
const multer = require('multer');
const { addVideo, getVideo } = require('../controllers/video');
const router = express.Router()


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// router.route('/addThumbnail').post(upload.single('thumbnail'), addThumbnail);
router.route('/addVideo').post(upload.single('video'), addVideo);
router.route('/getVideo').get(getVideo);
module.exports = router