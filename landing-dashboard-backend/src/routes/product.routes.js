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
const {
  checkForAuthenticstion,
  checkAdminRole,
} = require("../middlewares/dashboard.user");

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
  .post(
    "/",
    upload.single("image"),
    checkForAuthenticstion,
    checkAdminRole,
    addProduct,
  )
  .patch(
    "/:id",
    upload.single("image"),
    checkForAuthenticstion,
    checkAdminRole,
    updateProduct,
  )
  .delete("/:id", checkForAuthenticstion, checkAdminRole, deleteProduct);

module.exports = router;
