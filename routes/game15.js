const express = require("express");
const multer = require("multer");
const { addAsset, getAsset, getAllAssets, getAssetById, deleteById, updateAsset } = require("../controllers/game15");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .route("/addAsset")
  .post(
    upload.fields([
      { name: "initialAudioPrompt" },
      { name: "finalAudioPrompt" },
      { name: "level1Image" },
      { name: "level1CorrectOptionAudio" },
      { name: "level1Option1Audio" },
      { name: "level1Option2Audio" },
      { name: "level2Image" },
      { name: "level2CorrectOptionAudio" },
      { name: "level2Option1Audio" },
      { name: "level2Option2Audio" },
      { name: "level3Image" },
      { name: "level3CorrectOptionAudio" },
      { name: "level3Option1Audio" },
      { name: "level3Option2Audio" },
    ]),
    addAsset
  );

router.route("/getAsset").get(getAsset);

router.route("/getAssets").get(getAllAssets);

router.route("/getAsset/:id").get(getAssetById);

router.route("/delete/:id").delete(deleteById);

router
  .route("/updateAsset/:id")
  .put(
    upload.fields([
      { name: "initialAudioPrompt" },
      { name: "finalAudioPrompt" },
      { name: "level1Image" },
      { name: "level1CorrectOptionAudio" },
      { name: "level1Option1Audio" },
      { name: "level1Option2Audio" },
      { name: "level2Image" },
      { name: "level2CorrectOptionAudio" },
      { name: "level2Option1Audio" },
      { name: "level2Option2Audio" },
      { name: "level3Image" },
      { name: "level3CorrectOptionAudio" },
      { name: "level3Option1Audio" },
      { name: "level3Option2Audio" },
    ]),
    updateAsset
  );

module.exports = router;
