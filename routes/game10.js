const express = require("express");
const multer = require("multer");
const {
  addStory,
  addGame1,
  addGame2,
  addGame3,
  getAsset,
  getAll,
  getById,
  deleteById,
  updateStory,
  updateGame1,
  updateGame2,
  updateGame3,
} = require("../controllers/game10");
const { authenticateToken, authorizeUser } = require("../auth/auth");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .route("/addStory")
  .post(
    upload.fields([
      { name: "bookCoverImage" },
      { name: "bookTitleAudio" },
      { name: "storyImage1" },
      { name: "storyImage2" },
      { name: "storyImage3" },
      { name: "storyImage4" },
      { name: "storyAudio1" },
      { name: "storyAudio2" },
      { name: "storyAudio3" },
      { name: "storyAudio4" },
      { name: "audioPromptBeforeGameStarts" },
    ]),
    authenticateToken,
    authorizeUser,
    addStory
  );

router
  .route("/addGame1")
  .post(
    upload.fields([
      { name: "initialAudioPrompt" },
      { name: "image1" },
      { name: "image2" },
      { name: "image3" },
      { name: "image4" },
      { name: "audio1" },
      { name: "audio2" },
      { name: "audio3" },
      { name: "audio4" },
    ]),
    authenticateToken,
    authorizeUser,
    addGame1
  );

router
  .route("/addGame2")
  .post(
    upload.fields([
      { name: "initialAudioPrompt" },
      { name: "image" },
      { name: "correctOptionAudio" },
      { name: "option1Audio" },
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
      { name: "initialAudioPrompt" },
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

router.route("/getAssets").get(authenticateToken, authorizeUser, getAll);

router.route("/getAsset/:id").get(authenticateToken, authorizeUser, getById);

router
  .route("/delete/:id")
  .delete(authenticateToken, authorizeUser, deleteById);

router
  .route("/updateStory/:id")
  .put(
    upload.fields([
      { name: "bookCoverImage" },
      { name: "bookTitleAudio" },
      { name: "storyImage1" },
      { name: "storyImage2" },
      { name: "storyImage3" },
      { name: "storyImage4" },
      { name: "storyAudio1" },
      { name: "storyAudio2" },
      { name: "storyAudio3" },
      { name: "storyAudio4" },
      { name: "audioPromptBeforeGameStarts" },
    ]),
    authenticateToken,
    authorizeUser,
    updateStory
  );

router
  .route("/updateGame1/:id")
  .put(
    upload.fields([
      { name: "initialAudioPrompt" },
      { name: "image1" },
      { name: "image2" },
      { name: "image3" },
      { name: "image4" },
      { name: "audio1" },
      { name: "audio2" },
      { name: "audio3" },
      { name: "audio4" },
    ]),
    authenticateToken,
    authorizeUser,
    updateGame1
  );

router
  .route("/updateGame2/:id")
  .put(
    upload.fields([
      { name: "initialAudioPrompt" },
      { name: "image" },
      { name: "correctOptionAudio" },
      { name: "option1Audio" },
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
      { name: "initialAudioPrompt" },
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
