const connection = require('./db');

class Voucher {
  constructor(voucherId, discount, limit) {
    this.voucherId = voucherId;
    this.discount = discount;
    this.limit = limit;
  }

  static getAllVouchers() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Voucher', (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }

  static getVoucherById(voucherId) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Voucher WHERE voucherId = ?', [voucherId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      });
    });
  }

  static addVoucher(voucher) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO Voucher SET ?', voucher, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.insertId);
      });
    });
  }

  static updateVoucher(voucherId, updates) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE Voucher SET ? WHERE voucherId = ?', [updates, voucherId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.affectedRows);
      });
    });
  }

  static deleteVoucher(voucherId) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM Voucher WHERE voucherId = ?', [voucherId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.affectedRows);
      });
    });
  }
}

module.exports = Voucher;
