var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("cart");
});

// update quantity
router.put('/:accountId', (req, res) => {
  const accountId = req.params.accountId;
  const itemId = req.body.itemId;
  const quantity = req.body.quantity;

  Cart.updateQuantity(accountId, itemId, quantity)
    .then(affectedRows => {
      if (affectedRows === 0) {
        return res.status(404).send({ error: 'Item not found in cart' });
      }
      res.json({ message: 'Quantity updated successfully' });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

// show all items in cart
router.get('/:accountId', (req, res) => {
  const accountId = req.params.accountId;

  Cart.getAllCartsByAccountId(accountId)
    .then(carts => {
      if (!carts) {
        return res.status(404).send({ error: 'Cart not found' });
      }
      res.json(carts);
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

//delete item in cart
router.delete('/:accountId', (req, res) => {
  const accountId = req.params.accountId;
  const itemId = req.body.itemId;

  Cart.deleteItemToCartByAccountId(accountId, itemId)
    .then(affectedRows => {
      if (affectedRows === 0) {
        return res.status(404).send({ error: 'Item not found in cart' });
      }
      res.json({ message: 'Item deleted successfully' });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

// clear cart
router.delete('/:accountId', (req, res) => {
  const accountId = req.params.accountId;

  Cart.clearItemsByAccountId(accountId)
    .then(affectedRows => {
      if (affectedRows === 0) {
        return res.status(404).send({ error: 'Cart not found' });
      }
      res.json({ message: 'Cart cleared successfully' });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});



module.exports = router;