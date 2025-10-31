const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../data/cart.json");
// we will add the
const fetchCartItems = (cb) => {
  fs.readFile(dbPath, "utf-8", (err, data) => {
    if (err || !data) {
      return cb(null);
    }
    cb(JSON.parse(data));
  });
};
class Cart {
  static addToCart(productId, price) {
    fetchCartItems((data) => {
      const cartData = data ? data : { products: [], totalPrice: 0 };
      const productIndex = cartData.products.findIndex(
        (item) => item.id == productId
      );

      if (productIndex >= 0) {
        const existProduct = { ...cartData.products[productIndex] };

        existProduct.qty += 1;

        cartData.products = [...cartData.products];

        cartData.products[productIndex] = existProduct;
      } else {
        const newProduct = { id: productId, qty: 1 };
        cartData.products = [...cartData.products, newProduct];
      }

      cartData.totalPrice += +price;
      // console.log(cartData);
      fs.writeFile(dbPath, JSON.stringify(cartData), (err, m) => {
        console.log(err);
      });
    });
  }
  static deleteFromCart(productId, productPrice) {
    fetchCartItems((cardData) => {
      const userCard = { ...cardData };

      const cardItem = userCard.products.find((item) => item.id == productId);
      if (!cardItem) return;

      const newData = {
        ...userCard,
        products: userCard.products.filter((item) => item.id !== productId),
        totalPrice: userCard.totalPrice - productPrice * cardItem.qty,
      };
      // console.log(newData);
      fs.writeFile(dbPath, JSON.stringify(newData), (err, data) => {
        console.log(err);
      });
    });
  }
  static editCartItem(productId, oldProductPrice, newProductPrice) {
    fetchCartItems((cart) => {
      const productIndex = cart.products.findIndex(
        (item) => item.id == productId
      );
      if (productIndex === -1) return;

      const product = { ...cart.products[productIndex] };
      
      // both way are for handling the total price and both work correctly but i perfer first way
      
      cart.totalPrice =
        cart.totalPrice -
        product.qty * oldProductPrice +
        product.qty * newProductPrice;

      // cart.totalPrice += product.qty * (newProductPrice - oldProductPrice);

      console.log(cart.totalPrice);
      fs.writeFile(dbPath, JSON.stringify(cart), (err, data) => {
        console.log(err);
      });
    });
  }
  static getCardItem(cb) {
    fetchCartItems(cb);
  }
}

module.exports = Cart;
