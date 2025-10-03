const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const books = require("./router/books");
const home = require("./router/home");
const notFound = require("./controller/error");
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "/public")));

app.use(books);
app.use(home);

app.use(notFound)
app.listen(3000);
