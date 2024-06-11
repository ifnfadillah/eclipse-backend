const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authenticateAdmin = (db) => (req, res) => {
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
};

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) return res.status(500).json({ message: "Failed to authenticate token" });
    req.userId = decoded.id;
    next();
  });
};

module.exports = { authenticateAdmin, verifyToken };
