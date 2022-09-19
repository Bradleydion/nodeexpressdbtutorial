const express = require("express");
const blogRouter = require("../Routes/blog-routes");
const commentsRouter = require("../Routes/comments-routes");
const server = express();
server.use(express.json());
server.get("/", (req, res) => {
  res.json({ message: "I finally got this to run" });
});
server.use("/api/blog", blogRouter);
server.use("/api/comments", commentsRouter);
module.exports = server;
