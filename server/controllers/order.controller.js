const 
Order = require('../models/order.model');

async function submitOrder(order) {
    console.log('saving order object to database',order);

    return await new Order(order).save();
}

module.exports = {
    submitOrder
}