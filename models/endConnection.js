const connection = require('./db');

// end database
connection.end((error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Disconnected from the database');
    }
  }); 
  
  module.exports = connection;