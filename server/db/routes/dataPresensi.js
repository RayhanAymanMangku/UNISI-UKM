const express = require("express");
const router = express.Router();
const cors = require("cors"); // Import the cors middleware
const dataPresensiController = require("../controllers/dataPresensiController");

// Handle CORS preflight request
router.options("/api/data-presensi", cors());

// Handle POST request
router.post(
  "/api/data-presensi",
  cors(),
  dataPresensiController.addDataPresensi
);

router.get(
  "/api/data-presensi",
  cors(),
  dataPresensiController.getDataPresensi
);

router.delete(
  "/api/data-presensi/:id",
  cors(),
  dataPresensiController.hapusDataPresensi
);

module.exports = router;
