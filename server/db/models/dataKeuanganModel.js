const knexConfig =
  require("../knexfile")[process.env.NODE_ENV || "development"]; // Adjust this based on your environment
const knex = require("knex")(knexConfig);

function addDataKeuangan(data) {
  return knex("data_keuangan").insert(data);
}

function getDataKeuangan() {
  return knex("data_keuangan").select("*");
}

function hapusDataKeuangan(id) {
  return knex("data_keuangan").where("id", id).del();
}

module.exports = {
  addDataKeuangan,
  getDataKeuangan,
  hapusDataKeuangan,
};
