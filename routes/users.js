import express from "express";

const router = express.Router();

const usersArray = [];

router.get("/users", (req, res) => {
  res.render("users", { path: "/users", pageTitle: "create users page" });
});

router.post("/createUser", (req, res) => {
  const { username } = req.body;

  usersArray.push({ name: username, id: usersArray.length + 1 });

  res.redirect("/");
});
export { usersArray };

export default router;
