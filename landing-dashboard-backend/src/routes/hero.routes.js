const express = require("express");
const upload = require("../middlewares/upload");

const {
  getHeroSlider,
  addHeroSlider,
  updateHeroSlider,
  deleteHeroSlider,
} = require("../controllers/HeroSlider.controller");
const {
  checkForAuthenticstion,
  checkAdminRole,
} = require("../middlewares/dashboard.user");

const router = express.Router();

router
  .get("/", getHeroSlider)
  .post(
    "/",
    upload.single("image"),
    checkForAuthenticstion,
    checkAdminRole,
    addHeroSlider,
  )
  .put(
    "/:id",
    upload.single("image"),
    checkForAuthenticstion,
    checkAdminRole,
    updateHeroSlider,
  )
  .delete("/:id", checkForAuthenticstion, checkAdminRole, deleteHeroSlider);

module.exports = router;
