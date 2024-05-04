/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("data_presensi", function (table) {
    table.increments("id").primary();
    table.date("tanggal");
    table.string("namaLengkap");
    table.boolean("hadir");
    table.boolean("izin");
    table.boolean("alpa");
    table.string("lokasi");
    table.integer("pertemuan");
    // table.foreign("id").references("data_anggota.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("data_presensi");
};
