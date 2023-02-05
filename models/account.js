const connection = require('./db');

  class Account {
    constructor(accountId, username, password, phone, email, address, role) {
      this.accountId = accountId;
      this.username = username;
      this.password = password;
      this.phone = phone;
      this.email = email;
      this.address = address;
      this.role = role;
    }
  
    static getAllAccounts() {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Account', (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
      });
    }
  
    static getAccountById(accountId) {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Account WHERE accountId = ?', [accountId], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results[0]);
        });
      });
    }

    static getAccountByPhone(phone) {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Account WHERE phone = ?', [phone], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results[0]);
        });
      });
    }
  
    static addAccount(account) {
      return new Promise((resolve, reject) => {
        connection.query('INSERT INTO Account SET ?', account, (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results.insertId);
        });
      });
    }
  
    static updateAccount(accountId, updates) {
      return new Promise((resolve, reject) => {
        connection.query('UPDATE Account SET ? WHERE accountId = ?', [updates, accountId], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results.affectedRows);
        });
      });
    }
  
    static deleteAccount(accountId) {
      return new Promise((resolve, reject) => {
        connection.query('DELETE FROM Account WHERE accountId = ?', [accountId], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results.affectedRows);
        });
      });
    }

    static updatePassword(accountId, newPassword) {
      return new Promise((resolve, reject) => {
        connection.query('UPDATE Account SET password = ? WHERE accountId = ?', [newPassword, accountId], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results.affectedRows);
        });
      });
    }
  }
  
  module.exports = Account;