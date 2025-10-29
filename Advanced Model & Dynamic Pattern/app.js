const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const shopRouter = require("./router/shop.js");
const adminRouter = require("./router/admin.js");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(shopRouter);
app.use(adminRouter);

app.listen(3000);
