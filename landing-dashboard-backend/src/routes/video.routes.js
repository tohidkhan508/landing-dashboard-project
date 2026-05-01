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
const {
  checkForAuthenticstion,
  checkAdminRole,
} = require("../middlewares/dashboard.user");

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
  .post(
    "/",
    upload.single("video"),
    checkForAuthenticstion,
    checkAdminRole,
    addVideos,
  )
  .put(
    "/:id",
    upload.single("video"),
    checkForAuthenticstion,
    checkAdminRole,
    updateVideos,
  )
  .delete("/:id", checkForAuthenticstion, checkAdminRole, deleteVideos);

module.exports = router;
