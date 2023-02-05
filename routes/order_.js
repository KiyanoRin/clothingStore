var express = require('express');
var router = express.Router();

// show all
router.get('/', (req, res) => {
  Order.getAllOrders()
    .then(orders => {
      res.json(orders);
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

// show by accountId
router.get('/:accountId', (req, res) => {
  const accountId = req.params.accountId;

  Order.getOrderById(accountId)
    .then(order => {
      if (!order) {
        return res.status(404).send({ error: 'Order not found' });
      }
      res.json(order);
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

// pay (thiếu đồng bộ loyaltyProgram)
router.post('/:orderId', (req, res) => {
 // const order = req.body;
  const orderId = req.params.orderId;
  const items = req.body.items; // items is object contain items and quanlitys
  
  Order.addOrder(order)
    .then(newOrderId => {
      Promise.all(items.map(item => {
        return Order.addOrderItem(orderId, item.itemId, item.quantity);
      }))
        .then(orderItemIds => {
          res.json({orderId: newOrderId, orderItemIds });
       })
    .catch(error => {
      res.status(500).send({ error });
    });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});



module.exports = router;