const express = require('express');
const orderController = require('../controllers/order.controller');
const asynchandler = require('express-async-handler');

const router = express.Router();
// http://localhost:4050/api/orders/submit
router.post('/submit',asynchandler(submitOrder));
// http://localhost:4050/api/orders/11111111dssdsde212121xaqxq
router.get('/:orderId',asynchandler(getOrderById));
// http://localhost:4050/api/orders
router.get('/',asynchandler(getAllOrders));
// http://localhost:4050/api/orders/userid/11111111dssdsde212121xaqxq
router.get('/userid/:userid',asynchandler(getOrdersByUserId));
async function submitOrder(req,res,next){
    const orderToSave = req.body;
    console.log('Received order to save is ',orderToSave);

    const order = await orderController.submitOrder(orderToSave);

    res.json(order);
}

async function getOrderById(req,res,next){
    const order = await orderController.getOrderById(req.params.orderId);
    console.log("Order",order);
    res.json(order)
}

async function getAllOrders(req,res,next){
    const orders = await orderController.getAllOrders();
    console.log("All Orders",orders);
    res.json(orders);
}

async function getOrdersByUserId(req,res,next){
    const orders = await orderController.getOrdersByUserId(req.params.userId);
    res.json(orders);
}
module.exports = router;