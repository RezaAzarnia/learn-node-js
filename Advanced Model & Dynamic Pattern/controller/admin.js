const Product = require("../model/products");
exports.addProductPage = (req, res) => {
  res.render("admin/add-product.ejs", {
    pageTitle: "add product",
    path: "/admin/add-product",
    editMode: false,
  });
};

exports.getAdminProducts = (req, res) => {
  Product.getProducts((products) => {
    res.render("admin/admin-products.ejs", {
      pageTitle: "admin products",
      path: "/admin/products",
      products,
    });
  });
};
exports.createProduct = (req, res) => {
  const { productName, productPrice, imgUrl, productDescription } = req.body;
  //   console.log(req.body);

  const product = new Product(
    productName.trim(),
    imgUrl.trim(),
    Number(productPrice),
    productDescription.trim()
  );
  product.save();

  res.redirect("/");
};

exports.editProductPage = (req, res) => {
  const { edit } = req.query;
  const { productId } = req.params;
  if (!Boolean(edit)) {
    return res.redirect("/");
  }
  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/add-product.ejs", {
      pageTitle: "add product",
      path: "/admin/add-product",
      editMode: Boolean(edit),
      product,
    });
  });
};
exports.editProduct = (req, res) => {
  const { id, productName, productPrice, imgUrl, productDescription } =
    req.body;
  const product = new Product(
    id,
    productName.trim(),
    imgUrl.trim(),
    Number(productPrice),
    productDescription.trim()
  );
  product.save();
  res.redirect("/");
};
