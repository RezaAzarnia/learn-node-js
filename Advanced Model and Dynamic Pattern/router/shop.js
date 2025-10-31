const express = require("express");
const shop = require("../controller/shop");

const router = express.Router();

router.get("/", shop.getShopIndex);

router.get("/products", shop.getProdcts);

router.get("/products/:productId", shop.getSingleProduct);

router.get("/orders", shop.getOrders);

router.get("/cart" , shop.getUserCardItems)

router.post("/addCart", shop.addToCart);

router.post("/delete-cart-item", shop.deleteCartItem);

module.exports = router;
