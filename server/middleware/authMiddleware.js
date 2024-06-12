const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/appConfig");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Failed to authenticate token" });
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
