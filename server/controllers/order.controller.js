const 
Order = require('../models/order.model');

async function submitOrder(order) {
    console.log('saving order object to database',order);

    return await new Order(order).save();
}

async function getOrderById(orderId){

    return await Order.findById(orderId);
  
}

async function getAllOrders(){
    return await Order.find({});
}

async function getOrdersByUserId(userId){
    console.log('searching orders for user',userId);

    const orders = await Order.find({
        userId
    });

    const mappedOrder = orders.map((order)=>({
        ...order.toObject(),
        orderId: order._id,
    }));
    console.log("mappedOrder",mappedOrder);
    return mappedOrder;
}
module.exports = {
    submitOrder,
    getOrderById,
    getAllOrders,
    getOrdersByUserId
}