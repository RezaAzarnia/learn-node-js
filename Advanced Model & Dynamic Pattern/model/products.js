const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../data/products.json");
const fetchAllProducts = (cb) => {
  fs.readFile(dbPath, "utf-8", (err, data) => {
    if (err || !data) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
};

class Product {
  constructor(id, productTitle, productPic, productPrice, productDescription) {
    this.id = id;
    this.title = productTitle;
    this.imgUrl = productPic;
    this.price = productPrice;
    this.description = productDescription;
  }
  // here if we get the id got to edit mode and edit data
  // if there is no id just save new product
  save() {
    const productInfo = { ...this };
    fetchAllProducts((products) => {
      if (this.id) {
        const productIndex = products.findIndex((item) => item.id === this.id);
        if (productIndex === -1) {
          console.log("product not found");
          return;
        }
        products[productIndex] = { ...productInfo };
        fs.writeFile(dbPath, JSON.stringify(products), (err, data) => {
          if (err) console.log(err);
        });
      } else {
        const newUser = { ...productInfo, id: Date.now().toString() };
        products.push(newUser);
        fs.writeFile(dbPath, JSON.stringify(products), (err, data) => {
          console.log(err);
        });
      }
    });
  }

  static findById(productId, cb) {
    fetchAllProducts((data) => {
      const product = data.find((item) => item.id === productId);
      cb(product);
    });
  }
  static getProducts(cb) {
    fetchAllProducts(cb);
  }
}

module.exports = Product;
