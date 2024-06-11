const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const webinarController = require("../controllers/webinarController");

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

//MENAMPILKAN SEMUA DATA WEBINAR
router.get("/", webinarController.getAllWebinar);

//MENCARI WEBINAR BERDASARKAN JUDUL
router.get("/search", webinarController.searchWebinar);

//MENAMBAH DATA WEBINAR
router.post("/", upload.single("foto"), webinarController.addWebinar);

//MENGAMBIL DATA WEBINAR BERDASARKAN ID
router.get("/:id", webinarController.getWebinarById);

//MENGUPDATE DATA WEBINAR
router.put("/update/:id", upload.single("foto"), webinarController.updateWebinar);

//MENGHAPUS DATA WEBINAR
router.delete("/delete/:id", webinarController.deleteWebinar);

module.exports = router;
