const express = require("express");
const multer = require("multer");
const { addAsset, addAudio } = require("../controllers/game10");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/addAsset").post(upload.fields([{ name: "storyImage1" }, { name: "storyImage2" }, { name: "storyImage3" }, { name: "storyImage4" }]));
router.route("/addAudio").post(upload.fields([{ name: "storyAudio1" }, { name: "storyAudio2" }, { name: "storyAudio3" }, { name: "storyAudio4" }, { name: "promptAudio" }]));

router.route("/getAsset").get(getAsset);
router.route("/getAudio").get(getAudio);

router.route("/getAssets").get(getAllAssets);
router.route("/getAudios").get(getAllAudios);

router.route("/deleteAsset/:id").delete(deleteAsset);
router.route("/deleteAudio/:id").delete(deleteAudio);

module.exports = router;
