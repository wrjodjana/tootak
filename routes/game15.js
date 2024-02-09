const express = require("express");
const multer = require("multer");
const { addGame1, addGame2, addGame3, getAsset, getAllAssets, getAssetById, deleteById, updateGame1, updateGame2, updateGame3 } = require("../controllers/game15");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/addGame1").post(upload.fields([{ name: "initialAudioPrompt" }, { name: "finalAudioPrompt" }, { name: "image" }, { name: "correctOptionAudio" }, { name: "option1Audio" }, { name: "option2Audio" }]), addGame1);

router.route("/addGame2").post(upload.fields([{ name: "image" }, { name: "correctOptionAudio" }, { name: "option1Audio" }, { name: "option2Audio" }]), addGame2);

router.route("/addGame3").post(upload.fields([{ name: "image" }, { name: "correctOptionAudio" }, { name: "option1Audio" }, { name: "option2Audio" }]), addGame3);

router.route("/getAsset").get(getAsset);

router.route("/getAssets").get(getAllAssets);

router.route("/getAsset/:id").get(getAssetById);

router.route("/delete/:id").delete(deleteById);

router.route("/updateGame1/:id").put(upload.fields([{ name: "initialAudioPrompt" }, { name: "finalAudioPrompt" }, { name: "image" }, { name: "correctOptionAudio" }, { name: "option1Audio" }, { name: "option2Audio" }]), updateGame1);

router.route("/updateGame2/:id").put(upload.fields([{ name: "image" }, { name: "correctOptionAudio" }, { name: "option1Audio" }, { name: "option2Audio" }]), updateGame2);

router.route("/updateGame3/:id").put(upload.fields([{ name: "image" }, { name: "correctOptionAudio" }, { name: "option1Audio" }, { name: "option2Audio" }]), updateGame3);

module.exports = router;
