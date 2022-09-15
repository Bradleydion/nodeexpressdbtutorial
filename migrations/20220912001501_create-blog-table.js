/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("blog", (tbl) => {
      tbl.increments();
      tbl.text("Title").notNullable().unique();
      tbl.text("Content").notNullable();
      tbl.timestamps(true, true);
    })
    .createTable("comments", (tbl) => {
      tbl.increments();
      tbl.text("Sender").notNullable();
      tbl.text("Comment").notNullable();
      tbl.timestamps(true, true);
      tbl
        .integer("blog_id")
        .unsigned()
        .references("id")
        .inTable("blog")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("comments").dropTableIfExists("blog");
};
