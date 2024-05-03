// const express = require("express");
// const router = express.Router();
// const cors = require("cors");
// const dataKeuanganController = require("../controllers/dataKeuanganController");

// // Handle CORS preflight request
// router.options("/api/data-keuangan", cors());

// // Handle POST request
// router.post("/api/data-keuangan", dataKeuanganController.addDataKeuangan);

// router.get(
//   "/api/data-keuangan",
//   cors(),
//   dataKeuanganController.getDataKeuangan
// );

// router.delete(
//   "/api/data-keuangan/:id",
//   cors(),
//   dataKeuanganController.hapusDataKeuangan
// );

// module.exports = router;

const express = require("express");
const router = express.Router();
const dataKeuanganController = require("../controllers/dataKeuanganController");
const cors = require("cors");

// Define CORS options
const corsOptions = {
  origin: "http://localhost:3000", // Replace with the actual origin of your React app
  credentials: true,
};

// Apply CORS middleware to the router
router.use(cors(corsOptions));

// Handle GET request to retrieve data keuangan
router.get("/api/data-keuangan", dataKeuanganController.getDataKeuangan);

// Handle POST request to add data keuangan
router.post("/api/data-keuangan", dataKeuanganController.addDataKeuangan);

// Handle DELETE request to delete data keuangan by ID
router.delete(
  "/api/data-keuangan/:id",
  dataKeuanganController.hapusDataKeuangan
);

module.exports = router;
