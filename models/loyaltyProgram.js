const connection = require('./db');

class LoyaltyProgram {
    constructor(loyaltyProgramId, accountId, points) {
      this.loyaltyProgramId = loyaltyProgramId;
      this.accountId = accountId;
      this.points = points;
    }
  
    static getAllLoyaltyPrograms() {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM LoyaltyProgram', (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
      });
    }
  
    static getLoyaltyProgramById(loyaltyProgramId) {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM LoyaltyProgram WHERE loyaltyProgramId = ?', [loyaltyProgramId], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results[0]);
        });
      });
    }
  
    static getLoyaltyProgramByAccountId(accountId) {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM LoyaltyProgram WHERE accountId = ?', [accountId], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results[0]);
        });
      });
    }
  
    static addLoyaltyProgram(loyaltyProgram) {
      return new Promise((resolve, reject) => {
        connection.query('INSERT INTO LoyaltyProgram SET ?', loyaltyProgram, (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results.insertId);
        });
      });
    }
  
    static updateLoyaltyProgram(loyaltyProgramId, updates) {
      return new Promise((resolve, reject) => {
        connection.query('UPDATE LoyaltyProgram SET ? WHERE loyaltyProgramId = ?', [updates, loyaltyProgramId], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results.affectedRows);
        });
      });
    }
  
    static deleteLoyaltyProgram(loyaltyProgramId) {
      return new Promise((resolve, reject) => {
        connection.query('DELETE FROM LoyaltyProgram WHERE loyaltyProgramId = ?', [loyaltyProgramId], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results.affectedRows);
        });
      });
    }
  }
  
  module.exports = LoyaltyProgram;
