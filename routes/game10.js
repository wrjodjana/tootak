const express = require("express");
const multer = require("multer");
const { addBookContent, getBook, getAllBooks, updateBookFrame, addGame, getGame, updateGame } = require("../controllers/bookController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Book routes
router.post("/addBookContent", upload.single("file"), addBookContent);
router.get("/getBook/:bookId", getBook);
router.get("/getAllBooks", getAllBooks);
router.put("/updateBookFrame/:bookId", upload.none(), updateBookFrame);

// Game routes
router.post("/addGame", upload.single("file"), addGame);
router.get("/getGame/:gameId", getGame);
router.put("/updateGame/:gameId", upload.none(), updateGame);

module.exports = router;
