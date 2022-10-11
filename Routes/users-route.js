const express = require("express");
const Blog = require("../models/dbHelpers");

const router = express.Router();

router.post("/register", (req, res) => {
  const credentials = req.body;
  const { username, password } = credentials;

  if (!(username && password)) {
    return res.status(400).json({ message: "Username & Password required" });
  }
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
