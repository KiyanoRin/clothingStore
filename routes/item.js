var express = require('express');
const Cart = require('../models/cart');
var router = express.Router();

// select all items
router.get('/', (req, res) => {
  Item.getAllItems()
    .then((items) => {
      res.json(items);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

// select one item
router.get('/:itemId', (req, res) => {
  const itemId = req.params.id;
  Item.getItemById(itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

// update item to databse
router.put('/:itemId', (req, res) => {
  const itemId = req.params.id;
  const updates = req.body;
  Item.updateItem(itemId, updates)
    .then((result) => {
      if (result === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json({ message: 'Item updated successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

// add item
router.post('/', (req, res) => {
  const item = req.body;
  Item.addItem(item)
    .then((result) => {
      res.json({ message: 'Item added successfully', itemId: result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

//delete item
router.delete('/:itemId', (req, res) => {
  const itemId = req.params.id;
  Item.deleteItem(itemId)
    .then((result) => {
      res.json({ message: 'Item deleted successfully', affectedRows: result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

// select by category
router.get('/category/:category', (req, res) => {
  const category = req.params.category;
  Item.getItemsByCategory(category)
    .then((results) => {
      res.json({ items: results });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

// search item by keyword
router.get('/search/:keyword', (req, res) => {
  const keyword = req.params.keyword;
  Item.searchItems(keyword)
    .then((results) => {
      res.json({ items: results });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

// add item to cart
router.post('/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const accountId = req.params.accountId;

  Cart.getAllCartsByAccountId(accountId)
    .then((carts) => {
      // Check if the item is already in the cart
      const existingCart = carts.find((cart) => cart.itemId === itemId);

      if (existingCart) {
        // If the item is already in the cart, update its quantity
        Cart.updateQuantity(accountId, itemId, existingCart.quantity + 1)
          .then((result) => {
            res.json({ message: "Item quantity updated successfully", cart: result });
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      } else {
        // If the item is not in the cart, add it
        Cart.addItemToCart(accountId, itemId, 1)
          .then((result) => {
            res.json({ message: "Item added to cart successfully", cart: result });
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});


module.exports = router;