const express = require("express");
const Blog = require("../models/dbHelpers");
const { restart } = require("nodemon");

const router = express.Router();

router.get("/", (req, res) => {
  Blog.findAllUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: ` Unable to get users ${err}` });
    });
});

router.get("/:username", (req, res) => {
  const username = req.params;
  Blog.findUserByUsername(username)
    .then((user) => {
      res.status(200).json({ message: ` User ${user} was found` });
    })
    .catch((err) => {
      res.status(500).json({ message: `user name is not found ${err}` });
    });
});

module.exports = router;
