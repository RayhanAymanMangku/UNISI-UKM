const dataKeuanganModel = require("../models/dataKeuanganModel");

async function addDataKeuangan(req, res) {
  try {
    const formData = req.body;
    await dataKeuanganModel.addDataKeuangan(formData);
    res.status(200).json({ message: "Data Keuangan berhasil ditambahkan!" });
  } catch (error) {
    console.error("Error adding data Keuangan:", error);
    res.status(500).json({ error: "Gagal menambahkan data Keuangan" });
  }
}

async function getDataKeuangan(req, res) {
  try {
    const dataKeuangan = await dataKeuanganModel.getDataKeuangan();
    res.status(200).json(dataKeuangan);
  } catch (error) {
    console.error("Error getting data Keuangan:", error);
    res.status(500).json({ error: "Gagal mengambil data Keuangan" });
  }
}

async function hapusDataKeuangan(req, res) {
  try {
    const id = req.params.id;
    await dataKeuanganModel.hapusDataKeuangan(id);
    res.status(200).json({ message: "Data Keuangan berhasil dihapus!" });
  } catch (error) {
    console.error("Error deleting data Keuangan:", error);
    res.status(500).json({ error: "Gagal menghapus data Keuangan" });
  }
}

module.exports = {
  addDataKeuangan,
  getDataKeuangan,
  hapusDataKeuangan,
};
