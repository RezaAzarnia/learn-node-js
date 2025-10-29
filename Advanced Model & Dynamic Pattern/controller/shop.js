const Product = require("../model/products.js");

exports.getShopIndex = (req, res) => {
  Product.getProducts((data) => {
    res.render("shop/index.ejs", {
      pageTitle: "shop page",
      path: "/",
      products: data,
    });
  });
};

exports.getProdcts = (req, res) => {
  Product.getProducts((data) => {
    res.render("shop/products.ejs", {
      pageTitle: "products",
      path: "/products",
      products: data,
    });
  });
};

exports.getSingleProduct = (req, res) => {
  const { productId } = req.params;
  Product.findById(productId, (product) => {
    // console.log(product);
    if (!product) {
      return res.redirect("/");
    }
    res.render("shop/product-detail.ejs", {
      path: "/products",
      pageTitle: product.productTitle,
      product,
    });
  });
};

exports.getOrders = (req, res) => {
  res.render("shop/orders.ejs", {
    path: "/orders",
    pageTitle: "orders",
  });
};
