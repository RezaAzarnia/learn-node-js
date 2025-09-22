import express from "express";
import { usersArray } from "./users.js";
const router = express.Router();

router.get("/", (req, res) => {
  console.log(usersArray);
  res.render("home", { users: usersArray });
});

export default router;
