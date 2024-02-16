const express = require("express");
const multer = require("multer");
const { addAsset, getAsset, getAllAssets, getAssetById, deleteById, updateAsset } = require("../controllers/game16");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .route("/addAsset")
  .post(
    upload.fields([
      { name: "initialAudioPrompt" },
      { name: "finalAudioPrompt" },
      { name: "level1CorrectOption1Image" },
      { name: "level1CorrectOption1Audio" },
      { name: "level1CorrectOption2Image" },
      { name: "level1CorrectOption2Audio" },
      { name: "level1Option1Image" },
      { name: "level1Option1Audio" },
      { name: "level1Option2Image" },
      { name: "level1Option2Audio" },
      { name: "level2CorrectOption1Image" },
      { name: "level2CorrectOption1Audio" },
      { name: "level2CorrectOption2Image" },
      { name: "level2CorrectOption2Audio" },
      { name: "level2Option1Image" },
      { name: "level2Option1Audio" },
      { name: "level2Option2Image" },
      { name: "level2Option2Audio" },
      { name: "level3CorrectOption1Image" },
      { name: "level3CorrectOption1Audio" },
      { name: "level3CorrectOption2Image" },
      { name: "level3CorrectOption2Audio" },
      { name: "level3Option1Image" },
      { name: "level3Option1Audio" },
      { name: "level3Option2Image" },
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
      { name: "level1CorrectOption1Image" },
      { name: "level1CorrectOption1Audio" },
      { name: "level1CorrectOption2Image" },
      { name: "level1CorrectOption2Audio" },
      { name: "level1Option1Image" },
      { name: "level1Option1Audio" },
      { name: "level1Option2Image" },
      { name: "level1Option2Audio" },
      { name: "level2CorrectOption1Image" },
      { name: "level2CorrectOption1Audio" },
      { name: "level2CorrectOption2Image" },
      { name: "level2CorrectOption2Audio" },
      { name: "level2Option1Image" },
      { name: "level2Option1Audio" },
      { name: "level2Option2Image" },
      { name: "level2Option2Audio" },
      { name: "level3CorrectOption1Image" },
      { name: "level3CorrectOption1Audio" },
      { name: "level3CorrectOption2Image" },
      { name: "level3CorrectOption2Audio" },
      { name: "level3Option1Image" },
      { name: "level3Option1Audio" },
      { name: "level3Option2Image" },
      { name: "level3Option2Audio" },
    ]),
    updateAsset
  );

module.exports = router;
