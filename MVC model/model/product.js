const fs = require("fs");
const path = require("path");
let books = [];

const dbPath = path.join(__dirname, "../data/db.json");

// const fetchAllBooks = () => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path.join(dbPath), "utf-8", (err, data) => {
//       if (!err && data) {
//         resolve({ data: JSON.parse(data) });
//       } else {
//         reject({ error: "you have no daata", data: [] });
//       }
//     });
//   });
// };
const fetchAllBooks = (callback) => {
  fs.readFile(path.join(dbPath), "utf-8", (err, data) => {
    if (!err && data) {
      // console.log(data);
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
  static delete(bookId, cb) {
    fetchAllBooks((prods) => {
      books = prods;

      books = books.filter((item) => item.id !== +bookId);

      fs.writeFile(dbPath, JSON.stringify(books), (err) => {
        if (err) console.log(err);
        cb();
      });
    });
  }
  static editBook(bookId, newData, cb) {
    fetchAllBooks((allBooks) => {
      const book = allBooks.find((book) => book.id == +bookId);
      for (const element in book) {
        book[element] = newData[element];
      }
      book.id = Number(bookId);
      fs.writeFile(dbPath, JSON.stringify(allBooks), (err) => {
        console.log(err);
        cb();
      });
    });
  }
  static fetchBooks(callback) {
    fetchAllBooks(callback);
  }
}

module.exports = Product;
