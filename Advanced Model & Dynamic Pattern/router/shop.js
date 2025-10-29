const express = require("express");
const shop = require("../controller/shop");

const router = express.Router();

router.get("/", shop.getShopIndex);

router.get("/products", shop.getProdcts);

router.get("/products/:productId", shop.getSingleProduct);

router.get("/orders" , shop.getOrders)
module.exports = router;
