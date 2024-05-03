const knexConfig =
  require("../knexfile")[process.env.NODE_ENV || "development"]; // Adjust this based on your environment
const knex = require("knex")(knexConfig);

function addDataAnggota(data) {
  return knex("data_anggota").insert(data);
}

function getDataAnggota() {
  return knex("data_anggota").select("*");
}

function hapusDataAnggota(id) {
  return knex("data_anggota").where("id", id).del();
}

module.exports = {
  addDataAnggota,
  getDataAnggota,
  hapusDataAnggota,
};
