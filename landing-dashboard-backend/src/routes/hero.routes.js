const express = require("express");
const upload = require("../middlewares/upload");

const {
  getHeroSlider,
  addHeroSlider,
  updateHeroSlider,
  deleteHeroSlider,
} = require("../controllers/HeroSlider.controller");

const router = express.Router();

router
  .get("/", getHeroSlider)
  .post("/", upload.single("image"), addHeroSlider)
  .put("/:id", upload.single("image"), updateHeroSlider)
  .delete("/:id", deleteHeroSlider);

module.exports = router;
