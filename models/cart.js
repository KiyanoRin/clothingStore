const connection = require('./db');

class Cart {
  constructor(cartId, accountId, itemId, quantity) {
    this.cartId = cartId;
    this.accountId = accountId;
    this.itemId = itemId;
    this.quantity = quantity;
  }

  static getAllCartsByAccountId(accountId) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Cart WHERE accountId = ?',[accountId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }

  static addItemToCart(accountId, itemId, quantity) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO Cart SET (accountId, itemId, quantity) VALUES (?, ?, ? ) ', accountId, itemId, quantity, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.insertId);
      });
    });
  }

  static deleteItemToCartByAccountId(accountId, itemId) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM Cart WHERE accountId = ? AND itemId = ?', [accountId], [itemId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.affectedRows);
      });
    });
  }

  static updateQuantity(accountId, itemId, quantity) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE cart SET quantity = ?, WHERE accountId = ? AND itemId = ?', 
                  [quantity], [accountId], [itemId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.affectedRows);
      });
    });
  }

  static clearItemsByAccountId(accountId) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM Cart WHERE accountId = ?', [accountId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.affectedRows);
      });
    });
  }

  
}

module.exports = Cart;
