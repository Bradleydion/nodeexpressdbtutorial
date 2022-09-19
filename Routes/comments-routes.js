const express = require("express");
const Blog = require("../models/dbHelpers");

const router = express.Router();
//  endpoint already has /api/comments

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Blog.removeComment(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: `Comment with id ${id} has been successfully deleted`,
        });
      } else {
        res.status(404).json({ message: "No comment with that id" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: `Unable to delete message ${error}` });
    });
});

// future update- add patch to update a comment

module.exports = router;
