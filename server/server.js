const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");
const endpoint = require("express-list-endpoints");
const { BASE_URL, PORT } = require("./config/appConfig");
const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/authMiddleware");
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

//Middleware
app.use(verifyToken);

//AUTH
app.use("/auth", authRoutes);

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

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});
