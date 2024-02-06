const express = require("express");
const multer = require("multer");
const { addGame1, addGame2, addGame3, getAsset, getAllAssets, getAssetById, deleteById, updateGame1, updateGame2, updateGame3 } = require("../controllers/game16");
const { authenticateToken, authorizeUser } = require("../auth/auth");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .route("/addGame1")
  .post(
    upload.fields([
      { name: "initialAudioPrompt" },
      { name: "finalAudioPrompt" },
      { name: "correctOption1Image" },
      { name: "correctOption1Audio" },
      { name: "correctOption2Image" },
      { name: "correctOption2Audio" },
      { name: "option1Image" },
      { name: "option1Audio" },
      { name: "option2Image" },
      { name: "option2Audio" },
    ]),
    authenticateToken,
    authorizeUser,
    addGame1
  );

router
  .route("/addGame2")
  .post(
    upload.fields([
      { name: "correctOption1Image" },
      { name: "correctOption1Audio" },
      { name: "correctOption2Image" },
      { name: "correctOption2Audio" },
      { name: "option1Image" },
      { name: "option1Audio" },
      { name: "option2Image" },
      { name: "option2Audio" },
    ]),
    authenticateToken,
    authorizeUser,
    addGame2
  );

router
  .route("/addGame3")
  .post(
    upload.fields([
      { name: "correctOption1Image" },
      { name: "correctOption1Audio" },
      { name: "correctOption2Image" },
      { name: "correctOption2Audio" },
      { name: "option1Image" },
      { name: "option1Audio" },
      { name: "option2Image" },
      { name: "option2Audio" },
    ]),
    authenticateToken,
    authorizeUser,
    addGame3
  );

router.route("/getAsset").get(getAsset);

router.route("/getAllAssets").get(authenticateToken, authorizeUser, getAllAssets);

router.route("/getAsset/:id").get(authenticateToken, authorizeUser, getAssetById);

router.route("/delete/:id").delete(authenticateToken, authorizeUser, deleteById);

router
  .route("/updateGame1/:id")
  .put(
    upload.fields([
      { name: "initialAudioPrompt" },
      { name: "finalAudioPrompt" },
      { name: "correctOption1Image" },
      { name: "correctOption1Audio" },
      { name: "correctOption2Image" },
      { name: "correctOption2Audio" },
      { name: "option1Image" },
      { name: "option1Audio" },
      { name: "option2Image" },
      { name: "option2Audio" },
    ]),
    authenticateToken,
    authorizeUser,
    updateGame1
  );

router
  .route("/updateGame2/:id")
  .put(
    upload.fields([
      { name: "correctOption1Image" },
      { name: "correctOption1Audio" },
      { name: "correctOption2Image" },
      { name: "correctOption2Audio" },
      { name: "option1Image" },
      { name: "option1Audio" },
      { name: "option2Image" },
      { name: "option2Audio" },
    ]),
    authenticateToken,
    authorizeUser,
    updateGame2
  );

router
  .route("/updateGame3/:id")
  .put(
    upload.fields([
      { name: "correctOption1Image" },
      { name: "correctOption1Audio" },
      { name: "correctOption2Image" },
      { name: "correctOption2Audio" },
      { name: "option1Image" },
      { name: "option1Audio" },
      { name: "option2Image" },
      { name: "option2Audio" },
    ]),
    authenticateToken,
    authorizeUser,
    updateGame3
  );

module.exports = router;
