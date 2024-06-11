const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const komunitasController = require("../controllers/komunitasController");

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

//MENAMPILKAN SEMUA DATA KOMUNITAS
router.get("/", komunitasController.getAllKomunitas);

//MENCARI KOMUNITAS BERDASARKAN NAMA
router.get("/search", komunitasController.searchKomunitas);

//MENAMBAH DATA KOMUNITAS
router.post("/", upload.single("foto"), komunitasController.addKomunitas);

//MENGAMBIL DATA KOMUNITAS BERDASARKAN ID
router.get("/:id", komunitasController.getKomunitasById);

//MENGUPDATE DATA KOMUNITAS
router.put("/update/:id", upload.single("foto"), komunitasController.updateKomunitas);

//MENGHAPUS DATA KOMUNITAS
router.delete("/delete/:id", komunitasController.deleteKomunitas);

module.exports = router;
