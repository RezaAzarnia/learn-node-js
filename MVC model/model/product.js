const { rejects } = require("assert");
const fs = require("fs");
const path = require("path");
let books = [];

const dbPath = path.join(__dirname, "../data/db.json");
class Product {
  constructor(bookName, price, count) {
    this.bookName = bookName;
    this.price = price;
    this.count = count;
  }

  save() {
    fs.readFile(path.join(dbPath), "utf-8", (err, data) => {
      if (!err && data) {
        books = JSON.parse(data) || [];
      }
      books.push({
        bookName: this.bookName,
        price: this.price,
        bookCount: this.count,
      });
      fs.writeFile(dbPath, JSON.stringify(books), (err) => {
        console.log(err);
      });
    });
  }
  static fetchBooks() {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(dbPath), "utf-8", (err, data) => {
        if (!err && data) {
          resolve({ data: JSON.parse(data) });
        } else {
          reject({ error: "you have no daata", data: [] });
        }
      });
    });
  }
}

module.exports = Product;
