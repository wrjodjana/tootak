const Book = require("../models/game10book");
const SortingGame = require("../models/game10sorting");
const ChoiceGame = require("../models/game10choice");
const MatchGame = require("../models/game10match");
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

dotenv.config();

// AWS S3 configuration
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const addBookContent = async (req, res) => {
  try {
    let imageUrl = null,
      audioUrl = null;


    if (req.files && req.files.image) {
      const image = req.files.image;
      const imageUploadParams = {
        Bucket: bucketName,
        Key: image.originalname,
        Body: image.buffer,
        ContentType: image.mimetype,
      };
      await s3.send(new PutObjectCommand(imageUploadParams));
      imageUrl = await getSignedUrl(s3, new GetObjectCommand({ Bucket: bucketName, Key: image.originalname }), { expiresIn: 3600 });
    }


    if (req.files && req.files.audio) {
      const audio = req.files.audio;
      const audioUploadParams = {
        Bucket: bucketName,
        Key: audio.originalname,
        Body: audio.buffer,
        ContentType: audio.mimetype,
      };
      await s3.send(new PutObjectCommand(audioUploadParams));
      audioUrl = await getSignedUrl(s3, new GetObjectCommand({ Bucket: bucketName, Key: audio.originalname }), { expiresIn: 3600 });
    }


    const newFrame = {
      text: req.body.text,
      image: imageUrl,
      audio: audioUrl,
    };


    const book = await Book.findOne({ title: req.body.title });
    if (book) {
      book.frames.push(newFrame);
      await book.save();
      res.status(200).json({ message: "Frame added to book", book });
    } else {
      const newBook = new Book({
        title: req.body.title,
        frames: [newFrame],
      });
      await newBook.save();
      res.status(200).json({ message: "New book created", book: newBook });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBook = async (req, res) => {
  try {
    const bookId = req.params.bookId; 


    const book = await Book.findById(bookId);

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
