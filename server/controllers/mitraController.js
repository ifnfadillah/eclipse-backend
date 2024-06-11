const db = require("../model/database");
const path = require("path");

const defaultAdminId = 1;

const getAllMitra = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [rows, fields] = await connection.query("SELECT * FROM mitra");
    connection.release();
    res.send(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

const searchMitra = async (req, res) => {
  const { keyword } = req.query;
  let sql = "SELECT * FROM mitra";
  let values = [];

  if (keyword) {
    sql += " WHERE nama LIKE ?";
    values.push(`%${keyword}%`);
  }

  try {
    const connection = await db.getConnection();
    const [rows, fields] = await connection.query(sql, values);
    connection.release();
    res.status(200).json(rows);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

const addMitra = async (req, res) => {
  const { nama, deskripsi } = req.body;
  let logo = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    logo = filename;
  }
  console.log("Received data:", req.body);

  if (!nama || !logo || !deskripsi) {
    return res.status(400).json({ error: "Please provide nama, logo, and deskripsi" });
  }

  const sql = `INSERT INTO mitra (nama, logo, deskripsi, admin_id) VALUES (?, ?, ?, ?)`;
  const values = [nama, logo, deskripsi, defaultAdminId];

  try {
    const connection = await db.getConnection();
    const [rows, fields] = await connection.query(sql, values);
    connection.release();
    return res.status(201).json(rows);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

const getMitraById = async (req, res) => {
  const mitraId = req.params.id;
  const sql = `SELECT * FROM mitra WHERE id = ?`;

  try {
    const connection = await db.getConnection();
    const [rows, fields] = await connection.query(sql, [mitraId]);
    connection.release();
    if (rows.length === 0) {
      return res.status(404).json({ error: "Mitra not found" });
    }
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

const updateMitra = async (req, res) => {
  const mitraId = req.params.id;
  const { nama, deskripsi } = req.body;
  let logo = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    logo = filename;
  }

  if (!nama || !deskripsi) {
    return res.status(400).json({ error: "Please provide nama and deskripsi" });
  }

  let updateQuery = "";
  const updateValues = [];
  if (logo) {
    updateQuery = "UPDATE mitra SET nama = ?, logo = ?, deskripsi = ? WHERE id = ?";
    updateValues.push(nama, logo, deskripsi, mitraId);
  } else {
    updateQuery = "UPDATE mitra SET nama = ?, deskripsi = ? WHERE id = ?";
    updateValues.push(nama, deskripsi, mitraId);
  }

  try {
    const connection = await db.getConnection();
    const [result, fields] = await connection.query(updateQuery, updateValues);
    connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Mitra not found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

const deleteMitra = async (req, res) => {
  const mitraId = req.params.id;
  const deleteQuery = "DELETE FROM mitra WHERE id = ?";

  try {
    const connection = await db.getConnection();
    const [result, fields] = await connection.query(deleteQuery, [mitraId]);
    connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Mitra not found" });
    }
    return res.status(200).json({ message: "Mitra deleted successfully" });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

module.exports = {
  getAllMitra,
  searchMitra,
  addMitra,
  getMitraById,
  updateMitra,
  deleteMitra,
};
