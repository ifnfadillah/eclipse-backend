const db = require("../model/database");
const path = require("path");

const defaultAdminId = 1;

const getAllWebinar = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [rows, fields] = await connection.query("SELECT *, DATE_FORMAT(tanggal, '%Y/%m/%d') AS tanggal FROM webinar");
    connection.release();
    res.send(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

const searchWebinar = async (req, res) => {
  const { keyword } = req.query;
  let sql = "SELECT * FROM webinar";
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

const addWebinar = async (req, res) => {
  const { judul, deskripsi, narasumber, tanggal, waktu, harga, link_daftar } = req.body;
  let foto = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    foto = filename;
  }
  console.log("Received data:", req.body);

  if (!judul || !foto || !deskripsi || !narasumber || !tanggal || !waktu || !harga || !link_daftar) {
    return res.status(400).json({ error: "Please provide judul, foto, deskripsi, narasumber, tanggal, waktu, harga, and link daftar" });
  }

  const sql = `INSERT INTO webinar (judul, foto, deskripsi, narasumber, tanggal, waktu, harga, link_daftar, admin_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [judul, foto, deskripsi, narasumber, tanggal, waktu, harga, link_daftar, defaultAdminId];

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

const getWebinarById = async (req, res) => {
  const webinarId = req.params.id;
  const sql = `SELECT * FROM webinar WHERE id = ?`;

  try {
    const connection = await db.getConnection();
    const [rows, fields] = await connection.query(sql, [webinarId]);
    connection.release();
    if (rows.length === 0) {
      return res.status(404).json({ error: "Webinar not found" });
    }
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

const updateWebinar = async (req, res) => {
  const webinarId = req.params.id;
  const { judul, deskripsi, narasumber, tanggal, waktu, harga, link_daftar } = req.body;
  let foto = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    foto = filename;
  }

  if (!judul || !deskripsi || !narasumber || !tanggal || !waktu || !harga || !link_daftar) {
    return res.status(400).json({ error: "Please provide judul, deskripsi, narasumber, tanggal, waktu, harga, and link daftar" });
  }

  let updateQuery = "";
  const updateValues = [];
  if (foto) {
    updateQuery = "UPDATE webinar SET judul = ?, foto = ?, deskripsi = ?, narasumber = ?, tanggal = ?, waktu = ?, harga = ?, link_daftar = ? WHERE id = ?";
    updateValues.push(judul, foto, deskripsi, narasumber, tanggal, waktu, harga, link_daftar, webinarId);
  } else {
    updateQuery = "UPDATE webinar SET judul = ?, deskripsi = ?, narasumber = ?, tanggal = ?, waktu = ?, link_daftar = ? WHERE id = ?";
    updateValues.push(judul, deskripsi, narasumber, tanggal, waktu, link_daftar, webinarId);
  }

  try {
    const connection = await db.getConnection();
    const [result, fields] = await connection.query(updateQuery, updateValues);
    connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Webinar not found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

const deleteWebinar = async (req, res) => {
  const webinarId = req.params.id;
  const deleteQuery = "DELETE FROM webinar WHERE id = ?";

  try {
    const connection = await db.getConnection();
    const [result, fields] = await connection.query(deleteQuery, [webinarId]);
    connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Webinar not found" });
    }
    return res.status(200).json({ message: "Webinar deleted successfully" });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

module.exports = {
  getAllWebinar,
  searchWebinar,
  addWebinar,
  getWebinarById,
  updateWebinar,
  deleteWebinar,
};
