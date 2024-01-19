const express = require("express");
const multer = require("multer");
const { addAsset, addAudio, getAssetAndAudio, getAllAssets, getAllAudios, deleteAsset, deleteAudio, updateAsset, updateAudio } = require("../controllers/game12");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/addAsset").post(upload.fields([{ name: "backgroundImage" }, { name: "wordImage" }, { name: "gif" }]), addAsset);
router.route("/addAudio").post(upload.fields([{ name: "initialPromptAudio" }, { name: "lastPromptAudio" }]), addAudio);

router.route("/updateAsset/:id").put(upload.fields([{ name: "backgroundImage" }, { name: "wordImage" }, { name: "gif" }]), updateAsset);
router.route("/updateAudio/:id").put(upload.fields([{ name: "initialPromptAudio" }, { name: "lastPromptAudio" }]), updateAudio);

router.route("/getAsset").get(getAssetAndAudio);

router.route("/getAssets").get(getAllAssets);
router.route("/getAudios").get(getAllAudios);

router.route("/deleteAsset/:id").delete(deleteAsset);
router.route("/deleteAudio/:id").delete(deleteAudio);

module.exports = router;
