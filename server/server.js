const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const endpoint = require("express-list-endpoints");
const { BASE_URL, PORT } = require("./config/appConfig");
const dashboardRoutes = require("./routes/countDashboardRoutes");
const mitraRoutes = require("./routes/mitraRoutes");
const komunitasRoutes = require("./routes/komunitasRoutes");
const webinarRoutes = require("./routes/webinarRoutes");
const artikelRoutes = require("./routes/artikelRoutes");
const kidspediaRoutes = require("./routes/kidspediaRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on ${BASE_URL}:${PORT}`));

app.use("/endpoint", (req, res) => {
  res.json(endpoint(app));
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "parentify",
});

//DATA DASHBOARD
app.use("/dashboard", dashboardRoutes);

//DATA MITRA
app.use("/mitra", mitraRoutes);

//DATA KOMUNITAS
app.use("/komunitas", komunitasRoutes);

//DATA WEBINAR
app.use("/webinar", webinarRoutes);

//DATA ARTIKEL
app.use("/artikel", artikelRoutes);

//DATA KIDSPEDIA
app.use("/kidspedia", kidspediaRoutes);

//MENGAMBIL FOTO DARI UPLOADS
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//AUTH ADMIN
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
