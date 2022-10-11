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

module.exports = router;
