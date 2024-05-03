const dataPresensiModel = require("../models/dataPresensiModel");

async function addDataPresensi(req, res) {
  try {
    const formData = req.body;
    await dataPresensiModel.addDataPresensi(formData);
    res.status(200).json({ message: "Data Kos berhasil ditambahkan!" });
  } catch (error) {
    console.error("Error adding data Kos:", error);
    res.status(500).json({ error: "Gagal menambahkan data Kos" });
  }
}

async function getDataPresensi(req, res) {
  try {
    const dataPresensi = await dataPresensiModel.getDataPresensi();
    res.status(200).json(dataPresensi);
  } catch (error) {
    console.error("Error getting data Kos:", error);
    res.status(500).json({ error: "Gagal mendapatkan data Anggota" });
  }
}

async function hapusDataPresensi(req, res) {
  try {
    const id = req.params.id;
    await dataPresensiModel.hapusDataPresensi(id);
    res.status(200).json({ message: "Data Anggota berhasil dihapus!" });
  } catch (error) {
    console.error("Error deleting data Anggota:", error);
    res.status(500).json({ error: "Gagal menghapus data Anggota" });
  }
}

module.exports = {
  addDataPresensi,
  getDataPresensi,
  hapusDataPresensi,
};
