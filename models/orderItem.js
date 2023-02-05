const connection = require('./db');

class OrderItem {
    constructor(orderItemId, orderId, itemId, quantity) {
        this.orderItemId = orderItemId;
        this.orderId = orderId;
        this.itemId = itemId;
        this.quantity = quantity;
    }

    static getAllOrderByOrderId(orderId) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM OrderItem where orderId = ?', [orderId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static addOrderItem(orderId, itemId, quantity) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO Cart SET (orderId, itemId, quantity) VALUES (?, ?, ? ) ', orderId, itemId, quantity, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            });
        });
    }
}

module.exports = OrderItem;
