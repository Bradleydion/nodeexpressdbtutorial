const express = require("express");
const session = require("express-session");
const blogRouter = require("../Routes/blog-routes");
const commentsRouter = require("../Routes/comments-routes");
const usersRouter = require("../Routes/users-route");
const authRouter = require("../Auth/auth-routs");
const restricted = require("../Auth/middleware");
const server = express();
const sessionConfig = {
  name: "monster", // name of the cookie
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60, // time span of my cookie,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
};
server.use(express.json());
server.use(session(sessionConfig));
server.get("/", (req, res) => {
  res.json({ message: "I finally got this to run" });
});
server.use("/api/blog", restricted, blogRouter);
server.use("/api/comments", commentsRouter);
server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);
module.exports = server;
