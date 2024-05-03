/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("data_keuangan", (table) => {
    table.increments("id").primary();

    table.string("tanggal").notNullable();
    table.string("keterangan").notNullable();
    table.string("jumlah").notNullable(); //harga
    table.binary("file").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("data_keuangan");
};
