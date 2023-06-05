const express = require('express');
const orderController = require('../controllers/order.controller');
const asynchandler = require('express-async-handler');

const router = express.Router();
// http://localhost:4050/api/orders/submit
router.post('/submit',asynchandler(submitOrder));

async function submitOrder(req,res,next){
    const orderToSave = req.body;
    console.log('Received order to save is ',orderToSave);

    const order = await orderController.submitOrder(orderToSave);

    res.json(order);
}

module.exports = router;