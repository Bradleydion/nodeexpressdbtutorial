const express = require("express");
const Blog = require("./models/dbHelpers");

const server = express();

server.use(express.json());

const PORT = process.env.PORT || 4000;
server.get("/", (req, res) => {
  res.json({ message: "I finally got this to run" });
});

server.post("/api/blog", (req, res) => {
  Blog.add(req.body)
    .then((blog) => {
      res.status(200).json(blog);
    })
    .catch((error) => {
      res.status(500).json({ message: "cannot add blog" });
    });
});
server.get("/api/blog", (req, res) => {
  Blog.findAll()
    .then((blog) => {
      res.status(200).json(blog);
    })
    .catch((error) => {
      res.status(500).json({ message: "cannot get blog post(s)" });
    });
});
server.get("/api/blog/:id", (req, res) => {
  const { id } = req.params;
  Blog.findById(id)
    .then((blog) => {
      if (blog) {
        res.status(200).json(blog);
      } else {
        res.status(404).json({ message: "Blog post not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "ERROR" });
    });
});
server.delete("/api/blog/:id", (req, res) => {
  const { id } = req.params;
  Blog.remove(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "Delete Successful" });
      } else {
        res.status(404).json({ message: "Blog post not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "ERROR" });
    });
});
server.patch("/api/blog/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Blog.update(id, changes)
    .then((blogPost) => {
      if (blogPost) {
        res.status(200).json(blogPost);
      } else {
        res.status(404).json({ message: "Blog Post Not Found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error with this function" });
    });
});

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
