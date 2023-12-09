const express = require("express");
const multer = require("multer");
const { addAsset, addAudio, getAssetAndAudio, getAllAssets, getAllAudios, deleteAsset, deleteAudio } = require("../controllers/game12");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/addAsset").post(upload.fields([{ name: backgroundImage }, { name: wordImage }, { name: gif }]));
router.route("/addAudio").post(upload.fields([{ name: initialPromptAudio }, { name: lastPromptAudio }]));

router.route("/getAssetAndAudio").get(getAsset);
router.route("/getAssetAndAudio").get(getAudio);

router.route("/getAssets").get(getAllAssets);
router.route("/getAudios").get(getAllAudios);

router.route("/deleteAsset/:id").delete(deleteAsset);
router.route("/deleteAudio/:id").delete(deleteAudio);

module.exports = router;
