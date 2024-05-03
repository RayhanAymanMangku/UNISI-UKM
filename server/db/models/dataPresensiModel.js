const knexConfig =
  require("../knexfile")[process.env.NODE_ENV || "development"]; // Adjust this based on your environment
const knex = require("knex")(knexConfig);

function addDataPresensi(data) {
  return knex("data_presensi").insert(data);
}

function getDataPresensi() {
  return knex("data_presensi").select("*");
}

function hapusDataPresensi(id) {
  return knex("data_presensi").where("id", id).del();
}

module.exports = {
  addDataPresensi,
  getDataPresensi,
  hapusDataPresensi,
};
