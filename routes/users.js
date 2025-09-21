import express from "express";
import { resolve } from "path";
import __dirname from "../utils/config.js";
const router = express.Router();

const users = [];

router.get("/users", (req, res) => {
  res.status(201).sendFile(resolve(__dirname, "../views/users.html"));
});

router.post("/createUser", (req, res) => {
  const { username } = req.body;

  users.push({ title: username });

});

export default router;

export { users };
