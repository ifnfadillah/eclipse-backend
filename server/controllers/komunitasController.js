const db = require("../model/database");
const path = require("path");

const defaultAdminId = 1;

const getAllKomunitas = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [rows, fields] = await connection.query("SELECT * FROM komunitas");
    connection.release();
    res.send(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

const searchKomunitas = async (req, res) => {
  const { keyword } = req.query;
  let sql = "SELECT * FROM komunitas";
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

const addKomunitas = async (req, res) => {
  const { nama, deskripsi, link_daftar } = req.body;
  let foto = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    foto = filename;
  }
  console.log("Received data:", req.body);

  if (!nama || !foto || !deskripsi || !link_daftar) {
    return res.status(400).json({ error: "Please provide nama, foto, deskripsi, and link daftar" });
  }

  const sql = `INSERT INTO komunitas (nama, foto, deskripsi, link_daftar, admin_id) VALUES (?, ?, ?, ?, ?)`;
  const values = [nama, foto, deskripsi, link_daftar, defaultAdminId];

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

const getKomunitasById = async (req, res) => {
  const komunitasId = req.params.id;
  const sql = `SELECT * FROM komunitas WHERE id = ?`;

  try {
    const connection = await db.getConnection();
    const [rows, fields] = await connection.query(sql, [komunitasId]);
    connection.release();
    if (rows.length === 0) {
      return res.status(404).json({ error: "Komunitas not found" });
    }
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

const updateKomunitas = async (req, res) => {
  const komunitasId = req.params.id;
  const { nama, deskripsi, link_daftar } = req.body;
  let foto = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    foto = filename;
  }

  if (!nama || !deskripsi || !link_daftar) {
    return res.status(400).json({ error: "Please provide nama, deskripsi, and link daftar" });
  }

  let updateQuery = "";
  const updateValues = [];
  if (foto) {
    updateQuery = "UPDATE komunitas SET nama = ?, foto = ?, deskripsi = ?, link_daftar = ? WHERE id = ?";
    updateValues.push(nama, foto, deskripsi, link_daftar, komunitasId);
  } else {
    updateQuery = "UPDATE komunitas SET nama = ?, deskripsi = ?, link_daftar = ? WHERE id = ?";
    updateValues.push(nama, deskripsi, link_daftar, komunitasId);
  }

  try {
    const connection = await db.getConnection();
    const [result, fields] = await connection.query(updateQuery, updateValues);
    connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Komunitas not found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

const deleteKomunitas = async (req, res) => {
  const komunitasId = req.params.id;
  const deleteQuery = "DELETE FROM komunitas WHERE id = ?";

  try {
    const connection = await db.getConnection();
    const [result, fields] = await connection.query(deleteQuery, [komunitasId]);
    connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Komunitas not found" });
    }
    return res.status(200).json({ message: "Komunitas deleted successfully" });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

module.exports = {
  getAllKomunitas,
  searchKomunitas,
  addKomunitas,
  getKomunitasById,
  updateKomunitas,
  deleteKomunitas,
};
