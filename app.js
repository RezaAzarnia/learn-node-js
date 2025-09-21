import path from "path";
import express from "express";
import homeRoute from "./routes/home.js";
import usersRoute from "./routes/users.js";
import __dirname from "./utils/config.js";

const app = express();

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "../public")));

app.use(usersRoute);
app.use(homeRoute);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "404.html"));
});

app.listen(3000);
