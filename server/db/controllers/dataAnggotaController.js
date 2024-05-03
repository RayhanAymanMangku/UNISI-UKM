const dataAnggotaModel = require("../models/dataAnggotaModel");

async function addDataAnggota(req, res) {
  try {
    const formData = req.body;
    await dataAnggotaModel.addDataAnggota(formData);
    res.status(200).json({ message: "Data Kos berhasil ditambahkan!" });
  } catch (error) {
    console.error("Error adding data Kos:", error);
    res.status(500).json({ error: "Gagal menambahkan data Kos" });
  }
}

async function getDataAnggota(req, res) {
  try {
    const dataAnggota = await dataAnggotaModel.getDataAnggota();
    res.status(200).json(dataAnggota);
  } catch (error) {
    console.error("Error getting data Kos:", error);
    res.status(500).json({ error: "Gagal mendapatkan data Anggota" });
  }
}

async function hapusDataAnggota(req, res) {
  try {
    const id = req.params.id;
    await dataAnggotaModel.hapusDataAnggota(id);
    res.status(200).json({ message: "Data Anggota berhasil dihapus!" });
  } catch (error) {
    console.error("Error deleting data Anggota:", error);
    res.status(500).json({ error: "Gagal menghapus data Anggota" });
  }
}

module.exports = {
  addDataAnggota,
  getDataAnggota,
  hapusDataAnggota,
};
