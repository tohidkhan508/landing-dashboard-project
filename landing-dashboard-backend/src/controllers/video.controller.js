const db = require("../db/db");

async function getVideos(req, res) {
  try {
    const result = await db.query("SELECT * FROM videos ORDER BY id DESC");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

async function addVideos(req, res) {
  try {
    const { title } = req.body;

    const video = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !video) {
      return res.status(400).json({
        message: "title and video are required",
      });
    }

    const result = await db.query(
      "INSERT INTO videos (title, video) VALUES ($1, $2) RETURNING *",
      [title, video],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function updateVideos(req, res) {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const video = req.file ? `/uploads/${req.file.filename}` : null;

    let query;
    let values;

    if (video) {
      query = "UPDATE videos SET title=$1, video=$2 WHERE id=$3 RETURNING *";
      values = [title, video, id];
    } else {
      query = "UPDATE videos SET title=$1 WHERE id=$2 RETURNING *";
      values = [title, id];
    }

    const result = await db.query(query, values);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function deleteVideos(req, res) {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM videos WHERE id=$1", [id]);

    res.status(200).json({ message: "Deleted Successfully!" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  getVideos,
  addVideos,
  updateVideos,
  deleteVideos,
};
