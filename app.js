import path from "path";
import express from "express";
import homeRoute from "./routes/home.js";
import usersRoute from "./routes/users.js";
import __dirname from "./utils/config.js";
import { engine } from "express-handlebars";
const app = express();
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    layoutsDir: "./views/layout/",
    defaultLayout: "main-layout.hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

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
