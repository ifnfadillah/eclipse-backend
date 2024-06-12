const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const mitraController = require("../controllers/mitraController");
const verifyToken = require("../middleware/authMiddleware");

//MULTER UPLOADS
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

//MENAMPILKAN SEMUA DATA MITRA
router.get("/", mitraController.getAllMitra);

//MENCARI MITRA BERDASARKAN NAMA
router.get("/search", mitraController.searchMitra);

//MENAMBAH DATA MITRA
router.post("/", verifyToken, upload.single("logo"), mitraController.addMitra);

//MENGAMBIL DATA MITRA BERDASARKAN ID
router.get("/:id", mitraController.getMitraById);

//MENGUPDATE DATA MITRA
router.put("/update/:id", verifyToken, upload.single("logo"), mitraController.updateMitra);

//MENGHAPUS DATA MITRA
router.delete("/delete/:id", verifyToken, mitraController.deleteMitra);

module.exports = router;
