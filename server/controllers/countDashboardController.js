const db = require("../model/database");

const getDashboardData = async (req, res) => {
  try {
    const [[{ mitraCount }]] = await db.query("SELECT COUNT(*) AS mitraCount FROM mitra");
    const [[{ kidspediaCount }]] = await db.query("SELECT COUNT(*) AS kidspediaCount FROM kidspedia");
    const [[{ webinarCount }]] = await db.query("SELECT COUNT(*) AS webinarCount FROM webinar");
    const [[{ komunitasCount }]] = await db.query("SELECT COUNT(*) AS komunitasCount FROM komunitas");
    const [[{ artikelCount }]] = await db.query("SELECT COUNT(*) AS artikelCount FROM artikel");

    const dataCounts = {
      mitraCount,
      kidspediaCount,
      webinarCount,
      komunitasCount,
      artikelCount,
    };

    res.json(dataCounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getDashboardData };
