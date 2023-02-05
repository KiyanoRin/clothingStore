var express = require('express');
var router = express.Router();

// show all voucher
router.get('/', (req, res) => {
  Voucher.getAllVouchers()
    .then((vouchers) => {
      res.json({ vouchers });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
});

// ADMIN add new coucher
router.post('/', (req, res) => {
  const voucher = req.body;

  Voucher.addVoucher(voucher)
    .then((voucherId) => {
      res.json({ message: 'Voucher added successfully', voucherId });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

// update voucher
router.put('/', (req, res) => {
  const voucherId = req.params.voucherId;
  const updates = req.body;

  Voucher.updateVoucher(voucherId, updates)
    .then(affectedRows => {
      if (affectedRows === 0) {
        return res.status(404).send({ error: 'Voucher not found' });
      }
      res.json({ message: 'Voucher updated successfully' });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

// deletevoucher
router.delete('/', (req, res) => {
  const voucherId = req.params.voucherId;

  Voucher.deleteVoucher(voucherId)
    .then(affectedRows => {
      if (affectedRows === 0) {
        return res.status(404).send({ error: 'Voucher not found' });
      }
      res.json({ message: 'Voucher deleted successfully' });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

module.exports = router;