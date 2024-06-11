const db = require("../model/database");
const path = require("path");

const defaultAdminId = 1;

const getAllKidspedia = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [rows, fields] = await connection.query("SELECT kidspedia.*, kategori_kidspedia.nama AS kategori_nama FROM kidspedia INNER JOIN kategori_kidspedia ON kidspedia.kategori_id = kategori_kidspedia.id");
    connection.release();
    res.send(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

const searchKidspedia = async (req, res) => {
  const { keyword } = req.query;
  let sql = "SELECT kidspedia.*, kategori_kidspedia.nama AS kategori_nama FROM kidspedia INNER JOIN kategori_kidspedia ON kidspedia.kategori_id = kategori_kidspedia.id";
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

const addKidspedia = async (req, res) => {
  const { kategori_id, judul, link } = req.body;
  let foto = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    foto = filename;
  }
  console.log("Received data:", req.body);

  if (!kategori_id || !judul || !foto || !link) {
    return res.status(400).send("All fields are required");
  }
  const sql = `INSERT INTO kidspedia (kategori_id, judul, foto, link, admin_id) VALUES (?, ?, ?, ?, ?)`;
  const values = [kategori_id, judul, foto, link, defaultAdminId];

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

const getKidspediaById = async (req, res) => {
  const kidspediaId = req.params.id;
  const sql = `SELECT kidspedia.*, kategori_kidspedia.nama AS kategori_nama 
               FROM kidspedia 
               INNER JOIN kategori_kidspedia ON kidspedia.kategori_id = kategori_kidspedia.id 
               WHERE kidspedia.id = ?`;

  try {
    const connection = await db.getConnection();
    const [rows, fields] = await connection.query(sql, [kidspediaId]);
    connection.release();
    if (rows.length === 0) {
      return res.status(404).json({ error: "Kidspedia not found" });
    }
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

const updateKidspedia = async (req, res) => {
  const kidspediaId = req.params.id;
  const { judul, kategori_id, link } = req.body;
  let foto = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    foto = filename;
  }

  if (!judul || !kategori_id || !link) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  let updateQuery = "";
  const updateValues = [];
  if (foto) {
    updateQuery = "UPDATE kidspedia SET judul = ?, foto = ?, kategori_id = ?, link = ? WHERE id = ?";
    updateValues.push(judul, foto, kategori_id, link, kidspediaId);
  } else {
    updateQuery = "UPDATE kidspedia SET judul = ?, kategori_id = ?, link = ? WHERE id = ?";
    updateValues.push(judul, kategori_id, link, kidspediaId);
  }

  try {
    const connection = await db.getConnection();
    const [result, fields] = await connection.query(updateQuery, updateValues);
    connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Kidspedia not found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

const deleteKidspedia = async (req, res) => {
  const kidspediaId = req.params.id;
  const deleteQuery = "DELETE FROM kidspedia WHERE id = ?";

  try {
    const connection = await db.getConnection();
    const [result, fields] = await connection.query(deleteQuery, [kidspediaId]);
    connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Kidspedia not found" });
    }
    return res.status(200).json({ message: "Kidspedia deleted successfully" });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

module.exports = {
  getAllKidspedia,
  searchKidspedia,
  addKidspedia,
  getKidspediaById,
  updateKidspedia,
  deleteKidspedia,
};
