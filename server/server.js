const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "parentify",
});

const defaultAdminId = 1;

//MENGAMBIL FILE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//MENAMPILKAN DATA MITRA
app.get("/mitra", (req, res) => {
  const sql = "SELECT * FROM mitra";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});

// SEARCH MITRA
app.get("/mitra/search", (req, res) => {
  const { keyword } = req.query;
  let sql = "SELECT * FROM mitra";
  let values = [];

  if (keyword) {
    sql += " WHERE nama LIKE ?";
    values.push(`%${keyword}%`);
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    res.status(200).json(result);
  });
});

//ADD MITRA
app.post("/mitra", upload.single("logo"), (req, res) => {
  const { nama, kontak } = req.body;
  let logo = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    logo = filename;
  }
  console.log("Received data:", req.body);

  if (!nama || !logo || !kontak) {
    return res.status(400).json({ error: "Please provide nama, logo, and kontak" });
  }

  const sql = `INSERT INTO mitra (nama, logo, kontak, admin_id) VALUES (?, ?, ?, ?)`;
  const values = [nama, logo, kontak, defaultAdminId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    return res.status(201).json(result);
  });
});

// READ MITRA
app.get("/mitra/:id", (req, res) => {
  const mitraId = req.params.id;
  const sql = `SELECT * FROM mitra WHERE id = ?`;

  db.query(sql, [mitraId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Mitra not found" });
    }
    return res.status(200).json(result[0]);
  });
});

// UPDATE MITRA
app.put("/mitra/update/:id", upload.single("logo"), (req, res) => {
  const mitraId = req.params.id;
  const { nama, kontak } = req.body;
  let logo = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    logo = filename;
  }

  if (!nama || !kontak) {
    return res.status(400).json({ error: "Please provide nama and kontak" });
  }

  let updateQuery = "";
  const updateValues = [];
  if (logo) {
    updateQuery = "UPDATE mitra SET nama = ?, logo = ?, kontak = ? WHERE id = ?";
    updateValues.push(nama, logo, kontak, mitraId);
  } else {
    updateQuery = "UPDATE mitra SET nama = ?, kontak = ? WHERE id = ?";
    updateValues.push(nama, kontak, mitraId);
  }

  db.query(updateQuery, updateValues, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Mitra not found" });
    }
    return res.status(200).json(result);
  });
});

//DELETE MITRA
app.delete("/mitra/delete/:id", (req, res) => {
  const mitraId = req.params.id;
  const deleteQuery = "DELETE FROM mitra WHERE id = ?";

  db.query(deleteQuery, [mitraId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Mitra not found" });
    }
    return res.status(200).json({ message: "Mitra deleted successfully" });
  });
});

//MENAMPILKAN DATA KOMUNITAS
app.get("/komunitas", (req, res) => {
  const sql = "SELECT * FROM komunitas";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});

// SEARCH KOMUNITAS
app.get("/komunitas/search", (req, res) => {
  const { keyword } = req.query;
  let sql = "SELECT * FROM komunitas";
  let values = [];

  if (keyword) {
    sql += " WHERE nama LIKE ?";
    values.push(`%${keyword}%`);
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    res.status(200).json(result);
  });
});

//ADD KOMUNITAS
app.post("/komunitas", upload.single("foto"), (req, res) => {
  const { nama, deskripsi, link_daftar } = req.body;
  let foto = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    foto = filename;
  }
  console.log("Received data:", req.body);

  if (!nama || !foto || !deskripsi || !link_daftar) {
    return res.status(400).json({ error: "Please provide nama, foto, deskripsi and link daftar" });
  }

  const sql = `INSERT INTO komunitas (nama, foto, deskripsi, link_daftar, admin_id) VALUES (?, ?, ?, ?, ?)`;
  const values = [nama, foto, deskripsi, link_daftar, defaultAdminId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    return res.status(201).json(result);
  });
});

//READ KOMUNITAS
app.get("/komunitas/:id", (req, res) => {
  const komunitasId = req.params.id;
  const sql = `SELECT * FROM komunitas WHERE id = ?`;

  db.query(sql, [komunitasId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Komunitas not found" });
    }
    return res.status(200).json(result[0]);
  });
});

// UPDATE KOMUNITAS
app.put("/komunitas/update/:id", upload.single("foto"), (req, res) => {
  const komunitasId = req.params.id;
  const { nama, deskripsi, link_daftar } = req.body;
  let foto = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    foto = filename;
  }

  if (!nama || !deskripsi || !link_daftar) {
    return res.status(400).json({ error: "Please provide nama, deskrips dan link daftar" });
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

  db.query(updateQuery, updateValues, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Komunitas not found" });
    }
    return res.status(200).json(result);
  });
});

//DELETE MITRA
app.delete("/komunitas/delete/:id", (req, res) => {
  const komunitasId = req.params.id;
  const deleteQuery = "DELETE FROM komunitas WHERE id = ?";

  db.query(deleteQuery, [komunitasId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Komunitas not found" });
    }
    return res.status(200).json({ message: "Komunitas deleted successfully" });
  });
});
