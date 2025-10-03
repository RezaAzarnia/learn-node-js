const express = require("express");
const products = require("../controller/products");
const router = express.Router();

router.post("/createBook", products.addProduct);

router.get("/createBook", products.booksController);

router.delete("/deleteBook", products.deleteProduct);

module.exports = router;
