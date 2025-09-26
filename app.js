import path from "path";
import express from "express";
import homeRoute from "./routes/home.js";
import usersRoute from "./routes/users.js";
import __dirname from "./utils/config.js";
const app = express();

app.set("view engine", "ejs");
app.set("views", "views/ejsViews");

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "../public")));

app.use(usersRoute);
app.use(homeRoute);

app.use((req, res) => {
  res.status(404).render("404", {
    path: "404",
    pageTitle: "not found",
    isNotfoundPageActive: true,
    // we can disable the layout by adding this property to here
    // layout: false,
  });
});

app.listen(3000);
