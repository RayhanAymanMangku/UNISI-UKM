const express = require("express");
const app = express();
const cors = require("cors");
const dataAnggotaRoute = require("./db/routes/dataAnggota");
const dataKeuanganRoute = require("./db/routes/dataKeuangan");

app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: "http://localhost:3000", // Replace with the actual origin of your React app
  credentials: true,
  methods: ["DELETE"],
};

app.use(cors(corsOptions));

// Use routes
app.use(dataAnggotaRoute);
app.use(dataKeuanganRoute);

const PORT = process.env.PORT || 3060;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = {
  app,
};
