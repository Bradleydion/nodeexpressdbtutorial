const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
  add,
  findAll,
  findById,
  remove,
  update,
};
async function add(blogPost) {
  const [id] = await db("blog").insert(blogPost);
  return id;
}
function findAll() {
  return db("blog");
}
function findById(id) {
  return db("blog").where({ id }).first();
}
function remove(id) {
  return db("blog").where({ id }).del();
}
function update(id, changes) {
  return db("blog")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}
