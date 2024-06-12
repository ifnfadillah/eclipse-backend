const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../model/database");
const { SECRET } = require("../config/appConfig");

async function login(req, res) {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      message: "Bad request",
      errors: errors.array(),
    });

  try {
    const [users] = await database.query(`SELECT * FROM users WHERE email = ?`, [email]);
    if (users.length === 0) return res.status(400).json({ message: "Invalid email or password" });

    const user = users[0];

    // VERIFIKASI PASSWORD
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // BUAT JWT TOKEN
    const token = jwt.sign({ userId: user.id }, SECRET, {
      expiresIn: "60m",
      algorithm: "HS256",
    });

    res.cookie("jwt", token, { maxAge: 60 * 60 * 1000 }); //ms
    res.json({
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  login,
};
