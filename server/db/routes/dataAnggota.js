const express = require("express");
const router = express.Router();
const cors = require("cors"); // Import the cors middleware
const dataAnggotaController = require("../controllers/dataAnggotaController");

// Handle CORS preflight request
router.options("/api/data-anggota", cors());

// Handle POST request
router.post("/api/data-anggota", dataAnggotaController.addDataAnggota);

router.get("/api/data-anggota", cors(), dataAnggotaController.getDataAnggota);

router.delete(
  "/api/data-anggota/:id",
  cors(),
  dataAnggotaController.hapusDataAnggota
);

module.exports = router;
