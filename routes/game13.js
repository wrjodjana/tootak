const express = require("express");
const multer = require("multer");
const { addAsset, getAsset, getAllAssets, getAssetById, deleteById, updateAsset } = require("../controllers/game13");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .route("/addAsset")
  .post(
    upload.fields([{ name: "initialAudioPrompt" }, { name: "finalAudioPrompt" }, { name: "finalSentence" }, { name: "gameAudio1" }, { name: "gameAudio2" }, { name: "gameAudio3" }, { name: "gameAudio4" }, { name: "gameAudio5" }]),
    addAsset
  );

router.route("/getAsset").get(getAsset);

router.route("/getAssets").get(getAllAssets);

router.route("/getAsset/:id").get(getAssetById);

router.route("/delete/:id").delete(deleteById);

router
  .route("/updateAsset/:id")
  .put(
    upload.fields([{ name: "initialAudioPrompt" }, { name: "finalAudioPrompt" }, { name: "finalSentence" }, { name: "gameAudio1" }, { name: "gameAudio2" }, { name: "gameAudio3" }, { name: "gameAudio4" }, { name: "gameAudio5" }]),
    updateAsset
  );

module.exports = router;
