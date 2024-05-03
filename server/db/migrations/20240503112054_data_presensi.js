/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("data_presensi", function (table) {
    table.increments("ID").primary();
    table.date("Tanggal");
    table.string("Nama_Anggota");
    table.integer("Hadir");
    table.integer("Izin");
    table.integer("Alpa");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("data_presensi");
};
