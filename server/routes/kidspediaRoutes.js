const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const kidspediaController = require("../controllers/kidspediaController");

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

//MENAMPILKAN SEMUA DATA KIDSPEDIA
router.get("/", kidspediaController.getAllKidspedia);

//MENCARI KIDSPEDIA BERDASARKAN JUDUL
router.get("/search", kidspediaController.searchKidspedia);

//MENAMBAH DATA KIDSPEDIA
router.post("/", upload.single("foto"), kidspediaController.addKidspedia);

//MENGAMBIL DATA KIDSPEDIA BERDASARKAN ID
router.get("/:id", kidspediaController.getKidspediaById);

//MENGUPDATE DATA KIDSPEDIA
router.put("/update/:id", upload.single("foto"), kidspediaController.updateKidspedia);

//MENGHAPUS DATA KIDSPEDIA
router.delete("/delete/:id", kidspediaController.deleteKidspedia);

module.exports = router;
