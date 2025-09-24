import express from "express";

const router = express.Router();

const usersArray = [];

router.get("/createUser", (req, res) => {
  res.render("createUser", { path: "/createUser", pageTitle: "create users page" });
});

router.post("/createUser", (req, res) => {
  const { username } = req.body;

  usersArray.push({ name: username, id: usersArray.length + 1 });

  res.redirect("/");
});
export { usersArray };

export default router;
