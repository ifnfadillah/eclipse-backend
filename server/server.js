const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const endpoint = require("express-list-endpoints");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use("/endpoint", (req, res) => {
  res.json(endpoint(app));
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

//DELETE KOMUNITAS
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

//MENAMPILKAN DATA WEBINAR
app.get("/webinar", (req, res) => {
  const sql = "SELECT *, DATE_FORMAT(tanggal, '%Y/%m/%d') AS tanggal FROM webinar";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});

// SEARCH WEBINAR
app.get("/webinar/search", (req, res) => {
  const { keyword } = req.query;
  let sql = "SELECT * FROM webinar";
  let values = [];

  if (keyword) {
    sql += " WHERE judul LIKE ?";
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

//ADD WEBINAR
app.post("/webinar", upload.single("foto"), (req, res) => {
  const { judul, deskripsi, narasumber, tanggal, waktu, harga, link_daftar } = req.body;
  let foto = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    foto = filename;
  }
  console.log("Received data:", req.body);

  if (!judul || !foto || !deskripsi || !narasumber || !tanggal || !waktu || !harga || !link_daftar) {
    return res.status(400).json({ error: "Please provide judul, foto, desc, narasumber, tanggal, waktu, harga and link daftar" });
  }

  const sql = `INSERT INTO webinar (judul, foto, deskripsi, narasumber, tanggal, waktu, harga, link_daftar, admin_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [judul, foto, deskripsi, narasumber, tanggal, waktu, harga, link_daftar, defaultAdminId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    return res.status(201).json(result);
  });
});

//READ WEBINAR
app.get("/webinar/:id", (req, res) => {
  const webinarId = req.params.id;
  const sql = `SELECT * FROM webinar WHERE id = ?`;

  db.query(sql, [webinarId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Webinar not found" });
    }
    return res.status(200).json(result[0]);
  });
});

//UPDATE WEBINAR
app.put("/webinar/update/:id", upload.single("foto"), (req, res) => {
  const webinarId = req.params.id;
  const { judul, deskripsi, narasumber, tanggal, waktu, harga, link_daftar } = req.body;
  let foto = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    foto = filename;
  }

  if (!judul || !deskripsi || !narasumber || !tanggal || !waktu || !harga || !link_daftar) {
    return res.status(400).json({ error: "Please provide judul desc, narasumber, tanggal, waktu, harga and link daftar" });
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

  db.query(updateQuery, updateValues, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Webinar not found" });
    }
    return res.status(200).json(result);
  });
});

//DELETE WEBINAR
app.delete("/webinar/delete/:id", (req, res) => {
  const webinarId = req.params.id;
  const deleteQuery = "DELETE FROM webinar WHERE id = ?";

  db.query(deleteQuery, [webinarId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Webinar not found" });
    }
    return res.status(200).json({ message: "Webinar deleted successfully" });
  });
});

//MENAMPILKAN DATA ARTIKEL
app.get("/artikel", (req, res) => {
  const sql = "SELECT *, DATE_FORMAT(tanggal, '%Y/%m/%d') AS tanggal FROM artikel";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});

// SEARCH ARTIKEL
app.get("/artikel/search", (req, res) => {
  const { keyword } = req.query;
  let sql = "SELECT * FROM artikel";
  let values = [];

  if (keyword) {
    sql += " WHERE judul LIKE ?";
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

//ADD ARTIKEL
app.post("/artikel", upload.single("foto"), (req, res) => {
  const { judul, author, tanggal, isi } = req.body;
  let foto = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    foto = filename;
  }
  console.log("Received data:", req.body);

  if (!judul || !author || !tanggal || !isi) {
    return res.status(400).json({ error: "Please provide judul, author, tanggal and isi" });
  }

  const sql = `INSERT INTO artikel (judul, foto, author, tanggal, isi, admin_id) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [judul, foto, author, tanggal, isi, defaultAdminId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    return res.status(201).json(result);
  });
});

//READ ARTIKEL
app.get("/artikel/:id", (req, res) => {
  const artikelId = req.params.id;
  const sql = `SELECT * FROM artikel WHERE id = ?`;

  db.query(sql, [artikelId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Artikel not found" });
    }
    return res.status(200).json(result[0]);
  });
});

//UPDATE Artikel
app.put("/artikel/update/:id", upload.single("foto"), (req, res) => {
  const artikelId = req.params.id;
  const { judul, author, tanggal, isi } = req.body;
  let foto = null;
  if (req.file) {
    const filename = path.basename(req.file.path);
    foto = filename;
  }

  if (!judul || !author || !tanggal || !isi) {
    return res.status(400).json({ error: "Please provide judul, author, tanggal and isi" });
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

  db.query(updateQuery, updateValues, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Artikel not found" });
    }
    return res.status(200).json(result);
  });
});

//DELETE ARTIKEL
app.delete("/artikel/delete/:id", (req, res) => {
  const artikelId = req.params.id;
  const deleteQuery = "DELETE FROM artikel WHERE id = ?";

  db.query(deleteQuery, [artikelId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Artikel not found" });
    }
    return res.status(200).json({ message: "Artikel deleted successfully" });
  });
});

//MENAMPILKAN DATA KIDSPEDIA
app.get("/kidspedia", (req, res) => {
  const sql = "SELECT kidspedia.*, kategori_kidspedia.nama AS kategori_nama FROM kidspedia INNER JOIN kategori_kidspedia ON kidspedia.kategori_id = kategori_kidspedia.id";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});

// SEARCH KIDSPEDIA
app.get("/kidspedia/search", (req, res) => {
  const { keyword } = req.query;
  let sql = "SELECT kidspedia.*, kategori_kidspedia.nama AS kategori_nama FROM kidspedia INNER JOIN kategori_kidspedia ON kidspedia.kategori_id = kategori_kidspedia.id";
  let values = [];

  if (keyword) {
    sql += " WHERE judul LIKE ?";
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

//ADD KIDSPEDIA
app.post("/kidspedia", upload.single("foto"), (req, res) => {
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

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    return res.status(201).json(result);
  });
});

//READ KIDSPEDIA
app.get("/kidspedia/:id", (req, res) => {
  const kidspediaId = req.params.id;
  const sql = `SELECT kidspedia.*, kategori_kidspedia.nama AS kategori_nama 
               FROM kidspedia 
               INNER JOIN kategori_kidspedia ON kidspedia.kategori_id = kategori_kidspedia.id 
               WHERE kidspedia.id = ?`;

  db.query(sql, [kidspediaId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Kidspedia not found" });
    }
    return res.status(200).json(result[0]);
  });
});

//UPDATE KIDSPEDIA
app.put("/kidspedia/update/:id", upload.single("foto"), (req, res) => {
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

  db.query(updateQuery, updateValues, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Kidspedia not found" });
    }
    return res.status(200).json(result);
  });
});

//DELETE Kidspedia
app.delete("/kidspedia/delete/:id", (req, res) => {
  const kidspediaId = req.params.id;
  const deleteQuery = "DELETE FROM kidspedia WHERE id = ?";

  db.query(deleteQuery, [kidspediaId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Kidspedia not found" });
    }
    return res.status(200).json({ message: "Kidspedia deleted successfully" });
  });
});

//Mengambil foto dari uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Auth Admin
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM admin WHERE username = ?", [username], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const admin = result[0];
      const isValidPassword = bcrypt.compareSync(password, admin.password);
      if (isValidPassword) {
        const token = jwt.sign({ id: admin.id }, "secretKey", { expiresIn: "1h" });
        res.json({ token });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) return res.status(500).json({ message: "Failed to authenticate token" });
    req.userId = decoded.id;
    next();
  });
};

app.get("/api/dashboard", verifyToken, (req, res) => {
  res.json({ message: "Welcome to the admin dashboard" });
});
