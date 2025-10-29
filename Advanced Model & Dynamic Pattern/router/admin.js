const express = require("express");

const router = express.Router();
const admin = require("../controller/admin");

router.get("/admin/add-product", admin.addProductPage);

router.get("/admin/products", admin.getAdminProducts);

router.get("/admin/add-product/:productId", admin.editProductPage);

router.post("/admin/createProduct", admin.createProduct);

router.post("/admin/editProduct", admin.editProduct);

module.exports = router;
