const connection = require('./db');

class Item {
  constructor(itemId, name, description, price, quantity, image, category) {
    this.itemId = itemId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
    this.category = category;
  }

  static getAllItems() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Item', (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }

  static getItemById(itemId) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Item WHERE itemId = ?', [itemId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      });
    });
  }

  static getItemsByCategory(category) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Item WHERE category = ?', [category], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }

  static addItem(item) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO Item SET ?', item, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.insertId);
      });
    });
  }

  static updateItem(itemId, updates) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE Item SET ? WHERE itemId = ?', [updates, itemId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.affectedRows);
      });
    });
  }

  static deleteItem(itemId) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM Item WHERE itemId = ?', [itemId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.affectedRows);
      });
    });
  }

  static searchItems(keyword) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM Item WHERE name LIKE ? OR description LIKE ?',
        [`%${keyword}%`, `%${keyword}%`],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        }
      );
    });
  }
}

module.exports = Item;
