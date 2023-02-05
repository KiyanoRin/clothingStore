var express = require('express');
var router = express.Router();

// show all
router.get('/', (req, res) => {
  LoyaltyProgram.getAllLoyaltyPrograms()
    .then(loyaltyPrograms => res.json(loyaltyPrograms))
    .catch(error => res.status(500).send(error.message));
});

// show by accountID
router.get('/:accountId', (req, res) => {
  const accountId = req.params.accountId;
  LoyaltyProgram.getLoyaltyProgramByAccountId(accountId)
    .then(loyaltyProgram => {
      if (!loyaltyProgram) {
        return res.status(404).send(`No loyalty program found with account ID ${accountId}`);
      }
      res.json(loyaltyProgram);
    })
    .catch(error => res.status(500).send(error.message));
});

module.exports = router;




module.exports = router;