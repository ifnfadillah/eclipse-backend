const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const artikelController = require("../controllers/artikelController");

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

//MENAMPILKAN SEMUA DATA ARTIKEL
router.get("/", artikelController.getAllArtikel);

//MENCARI ARTIKEL BERDASARKAN JUDUL
router.get("/search", artikelController.searchArtikel);

//MENAMBAH DATA ARTIKEL
router.post("/", upload.single("foto"), artikelController.addArtikel);

//MENGAMBIL DATA ARTIKEL BERDASARKAN ID
router.get("/:id", artikelController.getArtikelById);

//MENGUPDATE DATA ARTIKEL
router.put("/update/:id", upload.single("foto"), artikelController.updateArtikel);

//MENGHAPUS DATA ARTIKEL
router.delete("/delete/:id", artikelController.deleteArtikel);

module.exports = router;
