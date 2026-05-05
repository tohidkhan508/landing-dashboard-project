const db = require("../db/db");
const fs = require("fs");
const path = require("path");

async function getHeroSlider(req, res) {
  try {
    const result = await db.query("SELECT * FROM hero_slider ORDER BY id DESC");
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching hero slider",
    });
  }
}

async function addHeroSlider(req, res) {
  try {
    const { title, subtitle } = req.body;
    console.log("FILE:", req.file);

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const image = `/uploads/${req.file.filename}`;

    const result = await db.query(
      "INSERT INTO hero_slider (title, subtitle, image) VALUES ($1,$2, $3) RETURNING *",
      [title, subtitle, image],
    );

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
}

async function updateHeroSlider(req, res) {
  try {
    const { id } = req.params;

    // only image update
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await db.query(
      `UPDATE hero_slider 
       SET image = COALESCE($1, image)
       WHERE id = $2
       RETURNING *`,
      [image, id],
    );

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
    });
  }
}

async function deleteHeroSlider(req, res) {
  try {
    const { id } = req.params;

    // get image first
    const result = await db.query("SELECT image FROM hero_slider WHERE id=$1", [
      id,
    ]);

    const image = result.rows[0]?.image;

    // delete DB
    await db.query("DELETE FROM hero_slider WHERE id=$1", [id]);

    // delete file
    if (image) {
      const filePath = path.join(__dirname, "..", image);
      fs.unlink(filePath, () => {});
    }

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getHeroSlider,
  addHeroSlider,
  updateHeroSlider,
  deleteHeroSlider,
};
