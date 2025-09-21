import path from "path";
import express from "express";
import __dirname from "../utils/config.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(201).sendFile(path.resolve(__dirname, "../views/home.html"));
});

export default router;
