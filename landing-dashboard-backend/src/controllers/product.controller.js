const db = require("../db/db");

// GET ALL PRODUCTS
async function getProduct(req, res) {
  try {
    const result = await db.query("SELECT * FROM products");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// CREATE PRODUCT
async function addProduct(req, res) {
  try {
    const { name, description } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !image) {
      return res.status(400).json({ message: "Name and Image required" });
    }

    const result = await db.query(
      "INSERT INTO products (image, name, description) VALUES ($1, $2, $3) RETURNING *",
      [image, name, description],
    );
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// UPDATE PRODUCT
async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    let query;
    let values;

    if (image) {
      query =
        "UPDATE products SET name=$1, description=$2, image=$3 WHERE id=$4 RETURNING *";
      values = [name, description, image, id];
    } else {
      query =
        "UPDATE products SET name=$1, description=$2 WHERE id=$3 RETURNING *";
      values = [name, description, id];
    }

    const result = await db.query(query, values);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// DELETE PRODUCT
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM products WHERE id=$1", [id]);

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
