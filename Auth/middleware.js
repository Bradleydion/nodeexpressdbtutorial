module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You need to be logged in to access that feature" });
  }
};
