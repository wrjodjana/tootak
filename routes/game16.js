const express = require("express");
const multer = require("multer");
const { addAsset, getAsset, getAllAssets, deleteAsset, getAssetById, updateAsset } = require("../controllers/game16");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/addAsset").post(upload.fields([{ name: "backgroundImage" }, { name: "wordImage" }, { name: "gif" }]), addAsset);

router.route("/updateAsset/:id").put(upload.fields([{ name: "backgroundImage" }, { name: "wordImage" }, { name: "gif" }]), updateAsset);

router.route("/getAsset").get(getAsset);

router.route("/getAssets").get(getAllAssets);

router.route("/deleteAsset/:id").delete(deleteAsset);

module.exports = router;
