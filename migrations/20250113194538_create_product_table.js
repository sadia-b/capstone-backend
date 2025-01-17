/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("product", (table) => {
    table.increments("id").primary();
    table.string("type").notNullable();
    table.string("time").notNullable();
    table.string("concern").notNullable();
    table.string("brand").notNullable();
    table.string("name").notNullable();
    table.string("ingredient").notNullable();
    table.double("price", 15, 2).notNullable();
    table.string("photo").notNullable();
    table.string("photoDescription").notNullable();
    table.text("link").notNullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("products");
}
