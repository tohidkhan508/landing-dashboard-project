const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getVideos,
  addVideos,
  updateVideos,
  deleteVideos,
} = require("../controllers/video.controller");

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router
  .get("/", getVideos)
  .post("/", upload.single("video"), addVideos)
  .put("/:id", upload.single("video"), updateVideos)
  .delete("/:id", deleteVideos);

module.exports = router;
