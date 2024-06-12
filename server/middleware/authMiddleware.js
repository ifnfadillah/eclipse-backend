const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/appConfig");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    console.log(decoded);
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
