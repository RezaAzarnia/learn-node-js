const Product = require("../model/products.js");
const Cart = require("../model/cart.js");

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

exports.getUserCardItems = (req, res) => {
  Product.getProducts((allProds) => {
    Cart.getCardItem((cardData) => {
      const products = cardData?.products.map((product) => {
        const mainProduct = allProds.find((item) => item.id == product.id);
        return { ...mainProduct, qty: product.qty };
      });
      console.log(products);
      res.render("shop/cart.ejs", {
        path: "/cart",
        pageTitle: "cart",
        products: products || [],
        totalPrice: cardData?.totalPrice,
      });
    });
  });
};

exports.addToCart = (req, res) => {
  const { id, price } = req.body;
  Cart.addToCart(id, price);
  res.redirect("/");
};

exports.deleteCartItem = (req, res) => {
  const { id, price } = req.body;
  Cart.deleteFromCart(id, price);
  res.redirect("/");
};
