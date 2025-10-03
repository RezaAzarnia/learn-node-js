const notFound = (req, res) => {
  res.render("404", { path: "404", pageTitle: "not found" });
};
module.exports = notFound