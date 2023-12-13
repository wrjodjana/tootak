const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const user = require("./routes/users");
const game1 = require("./routes/game1");
const game2 = require("./routes/game2");
const game3 = require("./routes/game3");
const game4 = require("./routes/game4");
const game5 = require("./routes/game5");
const game7 = require("./routes/game7");
const game8 = require("./routes/game8");
const game12 = require("./routes/game12");
const thumbnail = require("./routes/thumbnails");
const video = require("./routes/video");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(bodyparser.json());

//Have to change the password from here to .env
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use("/user", user);

app.use("/game1", game1);

app.use("/game2", game2);

app.use("/game3", game3);

app.use("/game4", game4);

app.use("/game5", game5);

app.use("/game7", game7);

app.use("/game8", game8);

app.use("/game12", game12);

app.use("/thumbnail", thumbnail);
app.use("/video", video);

app.get("/", (req, res) => {
  res.send("This is Tootak Api!");
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server running on port 4000");
});
