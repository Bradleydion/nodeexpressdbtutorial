const express = require("express");
const Blog = require("../models/dbHelpers");
const bcrypt = require("bcryptjs");
const { restart } = require("nodemon");

const router = express.Router();

router.post("/register", (req, res) => {
  const credentials = req.body;
  const { username, password } = credentials;

  if (!(username && password)) {
    return res.status(400).json({ message: "Username & Password required" });
  }
  const hash = bcrypt.hashSync(credentials.password, 12);
  credentials.password = hash;

  Blog.addUser(credentials)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      if (error.errno == 19) {
        res.status(400).json({ message: `Username Already Taken` });
      } else {
        res.status(500).json({ message: `Error adding User, ${error}` });
      }
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    return res.status(400).json({ message: "Username & Password required" });
  }

  Blog.findUserByUsername(username)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = {
          id: user.id,
          username: user.username,
        };
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        restart.status(401).json({ message: `Invalid Credentials` });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: `Error Logging In ${err}` });
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).json({ message: `Error ${error}` });
      } else {
        res.status(200).json({ message: `Log out successful` });
      }
    });
  } else {
    res.status(200).json({ message: `No user logged in` });
  }
});

module.exports = router;
