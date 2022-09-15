const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
  add,
  findAll,
  findById,
  remove,
  update,
  addComment,
  findCommentById,
};
async function add(blogPost) {
  const [id] = await db("blog").insert(blogPost);
  return findById(id);
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
function findCommentById(id) {
  return db("comments").where({ id }).first();
}

async function addComment(comment, blog_id) {
  const [id] = await db("comments").where({ blog_id }).insert(comment);
  return findByCommentById(id);
}
