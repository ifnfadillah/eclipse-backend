const db = require("../model/database");
const path = require("path");

const defaultAdminId = 1;

const getAllArtikel = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [rows, fields] = await connection.query("SELECT *, DATE_FORMAT(tanggal, '%Y/%m/%d') AS tanggal FROM artikel");
    connection.release();
    res.send(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

const searchArtikel = async (req, res) => {
  const { keyword } = req.query;
  let sql = "SELECT * FROM artikel";
  let values = [];

  if (keyword) {
    sql += " WHERE judul LIKE ?";
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

const addArtikel = async (req, res) => {
  const { judul, author, tanggal, isi } = req.body;
  let foto = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    foto = filename;
  }
  console.log("Received data:", req.body);

  if (!judul || !author || !tanggal || !isi) {
    return res.status(400).json({ error: "Please provide judul, author, tanggal, and isi" });
  }

  const sql = `INSERT INTO artikel (judul, foto, author, tanggal, isi, admin_id) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [judul, foto, author, tanggal, isi, defaultAdminId];

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

const getArtikelById = async (req, res) => {
  const artikelId = req.params.id;
  const sql = `SELECT * FROM artikel WHERE id = ?`;

  try {
    const connection = await db.getConnection();
    const [rows, fields] = await connection.query(sql, [artikelId]);
    connection.release();
    if (rows.length === 0) {
      return res.status(404).json({ error: "Artikel not found" });
    }
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

const updateArtikel = async (req, res) => {
  const artikelId = req.params.id;
  const { judul, author, tanggal, isi } = req.body;
  let foto = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    foto = filename;
  }

  if (!judul || !author || !tanggal || !isi) {
    return res.status(400).json({ error: "Please provide judul, author, tanggal, and isi" });
  }

  let updateQuery = "";
  const updateValues = [];
  if (foto) {
    updateQuery = "UPDATE artikel SET judul = ?, foto = ?, author = ?, tanggal = ?, isi = ? WHERE id = ?";
    updateValues.push(judul, foto, author, tanggal, isi, artikelId);
  } else {
    updateQuery = "UPDATE artikel SET judul = ?, author = ?, tanggal = ?, isi = ? WHERE id = ?";
    updateValues.push(judul, author, tanggal, isi, artikelId);
  }

  try {
    const connection = await db.getConnection();
    const [result, fields] = await connection.query(updateQuery, updateValues);
    connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Artikel not found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

const deleteArtikel = async (req, res) => {
  const artikelId = req.params.id;
  const deleteQuery = "DELETE FROM artikel WHERE id = ?";

  try {
    const connection = await db.getConnection();
    const [result, fields] = await connection.query(deleteQuery, [artikelId]);
    connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Artikel not found" });
    }
    return res.status(200).json({ message: "Artikel deleted successfully" });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

module.exports = {
  getAllArtikel,
  searchArtikel,
  addArtikel,
  getArtikelById,
  updateArtikel,
  deleteArtikel,
};
