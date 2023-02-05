const connection = require('./db');

class Order {
    constructor(orderId, accountId, voucherId, orderDate, status, address) {
      this.orderId = orderId;
      this.accountId = accountId;
      this.voucherId = voucherId;
      this.orderDate = orderDate;
      this.status = status;
      this.address = address;
    }
  
    static getAllOrders() {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Order_', (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
      });
    }
  
    static getOrderById(orderId) {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Order_ WHERE orderId = ?', [orderId], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results[0]);
        });
      });
    }

    static getOrderByAccountId(accountId) {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Order_ WHERE accountId = ?', [accountId], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results[0]);
        });
      });
    }
  
    static addOrder(order) {
      return new Promise((resolve, reject) => {
        connection.query('INSERT INTO Order_ SET ?', order, (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results.insertId);
        });
      });
    }
  
    static updateOrder(orderId, updates) {
      return new Promise((resolve, reject) => {
        connection.query('UPDATE Order_ SET ? WHERE orderId = ?', [updates, orderId], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results.affectedRows);
        });
      });
    }
  
    static deleteOrder(orderId) {
      return new Promise((resolve, reject) => {
        connection.query('DELETE FROM Order_ WHERE orderId = ?', [orderId], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results.affectedRows);
        });
      });
    }
  }
  
  module.exports = Order;
