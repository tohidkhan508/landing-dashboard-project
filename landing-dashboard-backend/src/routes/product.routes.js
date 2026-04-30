const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

// multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// routes
router
  .get("/", getProduct)
  .post("/", upload.single("image"), addProduct)
  .patch("/:id", upload.single("image"), updateProduct)
  .delete("/:id", deleteProduct);

module.exports = router;
