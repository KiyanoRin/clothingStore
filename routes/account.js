var express = require('express');
var router = express.Router();

const Account = require('../models/account.js');
//const endConnection = require('../models/endConnection');

// show all
router.get('/', function(req, res, next) {
  Account.getAllAccounts()
    .then((accounts) => {
        res.json({ accounts });
      })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error getting account' });
    });
});

// show by accountID
router.get('/:accountId', function(req, res, next) {
  const accountId = req.params.accountId;

  Account.getAccountById(accountId)
    .then((account) => {
      if (!account) {
        res.status(400).json({ message: 'Account not found' });
        return;
      }
        res.json({ account });
      })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error getting account' });
    });
});

// log in
router.post('/', function(req, res, next) {
  const phone = req.body.phone;
  const password = req.body.password;
  
  Account.getAccountByPhone(phone)
    .then((account) => {
      if (!account) {
        res.status(400).json({ message: 'Phone not found' });
        return;
      }
      if (account.password !== password) {
        res.status(400).json({ message: 'Incorrect password' });
        return;
      }
      // generate a JWT token for the user
      const token = jwt.sign({ id: account.id, email: account.email }, secret, { expiresIn: '1d' });
      res.json({ token });
    })
    .then(account => {
      const endConnection = require('../models/endConnection');
  endConnection.end;
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error logging in' });
    });
});

// register
router.post('/register', (req, res) => {
  const account = req.body;

  // used to create conncurrently 2 data account and loyaltyProgram
  connection.beginTransaction(error => {
    if (error) {
      return res.status(500).json({ message: 'Error beginning transaction' });
    }

    Account.addAccount(account)
      .then(accountId => {
        const loyaltyProgram = { accountId, points: 0 };

        return LoyaltyProgram.addLoyaltyProgram(loyaltyProgram);
      })
      .then(() => {
        connection.commit(error => {
          if (error) {
            return res.status(500).json({ message: 'Error committing transaction' });
          }

          res.json({ message: 'register succesfully' });
        });
      })
      .catch(error => {
        connection.rollback(() => {
          res.status(500).json({ message: 'Error register' });
        });
      });
  });
});


// forgot password
router.post('/forgot_password', function(req, res, next) {
  const phone = req.body.phone;
  Account.getAccountByPhone(phone)
    .then((account) => {
      if (!account) {
        res.status(400).json({ message: 'account not found' });
        return;
      }
      // generate a new password and update the account
      const newPassword = generatePassword();
      Account.updatePassword(account.id, newPassword)
      .then(() => {
        res.json({ message: 'Password reset successful. New Password : }', newPassword });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error resetting password' });
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error getting account by phone' });
    });
});

// update accont
router.put('/:accountId', (req, res) => {
  const accountId = req.params.accountId;
  const updates = req.body;

  Account.updateAccount(accountId, updates)
    .then(affectedRows => {
      if (affectedRows === 0) {
        return res.status(404).send({ error: 'Account not found' });
      }
      res.json({ message: 'update succesfully' });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

module.exports = router;
