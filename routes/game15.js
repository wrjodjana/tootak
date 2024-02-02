const express = require("express");
const multer = require("multer");
const { addAsset, getAsset, getAllAssets, getAssetById, deleteById, updateAsset } = require("../controllers/game15");
const { authenticateToken, authorizeUser } = require("../auth/auth");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .route("/addAsset")
  .post(upload.fields([{ name: "initialAudioPrompt" }, { name: "finalAudioPrompt" }, { name: "image" }, { name: "correctOptionAudio" }, { name: "option1Audio" }, { name: "option2Audio" }]), authenticateToken, authorizeUser, addAsset);

router.route("/getAsset").get(getAsset);

router.route("/getAllAssets").get(authenticateToken, authorizeUser, getAllAssets);

router.route("/getAsset/:id").get(authenticateToken, authorizeUser, getAssetById);

router.route("/delete/:id").delete(authenticateToken, authorizeUser, deleteById);

router
  .route("/updateAsset/:id")
  .put(upload.fields([{ name: "initialAudioPrompt" }, { name: "finalAudioPrompt" }, { name: "image" }, { name: "correctOptionAudio" }, { name: "option1Audio" }, { name: "option2Audio" }]), authenticateToken, authorizeUser, updateAsset);
module.exports = router;
