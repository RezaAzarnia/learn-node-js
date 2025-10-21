const fs = require("fs");
const path = require("path");
let books = [];

const dbPath = path.join(__dirname, "../data/db.json");

const fetchAllBooks = (callback) => {
  fs.readFile(path.join(dbPath), "utf-8", (err, data) => {
    if (!err && data) {
      const prods = JSON.parse(data);
      callback(prods);
    } else {
      callback([]);
    }
  });
};

class Product {
  constructor(bookName, price, count) {
    this.bookName = bookName;
    this.price = price;
    this.count = count;
  }

  async save() {
    fetchAllBooks((prods) => {
      books = prods;
      books.push({
        id: Date.now(),
        bookName: this.bookName,
        price: this.price,
        bookCount: this.count,
      });
      fs.writeFile(dbPath, JSON.stringify(books), (err) => {
        console.log(err);
      });
    });
  }
  static delete(bookId) {
    return new Promise((resolve, reject) => {
      fetchAllBooks((prods) => {
        books = prods;
        const isBookExist = books.find((item) => item.id === +bookId);
        if (isBookExist) {
          books = books.filter((item) => item.id !== +bookId);
          fs.writeFile(dbPath, JSON.stringify(books), (err) => {
            if (err) {
              reject({ success: false, message: err.cause });
            } else resolve({ message: "product deleted successfully" });
          });
        } else {
          reject({ message: "this book doesn't exist" });
        }
      });
    });
  }
  static editBook(bookId, newData) {
    return new Promise((resolve, reject) => {
      fetchAllBooks((allBooks) => {
        const book = allBooks.find((book) => book.id == +bookId);
        if (book) {
          for (const key in book) {
            book[key] = newData[key];
          }
          book.id = Number(bookId);
          fs.writeFile(dbPath, JSON.stringify(allBooks), (err) => {
            if (err) {
              console.log(err);
              reject({ success: false, message: err.cause });
            } else {
              resolve({ message: "product deleted successfully" });
            }
          });
        } else {
          reject({ success: false, message: "this book doesn't exist" });
        }
      });
    });
  }
  static fetchBooks(callback) {
    fetchAllBooks(callback);
  }
}

module.exports = Product;
