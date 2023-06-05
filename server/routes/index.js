const express = require('express');
const authRoutes = require('./auth.route');
const orderRoutes = require('./order.route');
const router = express.Router();

router.use('/auth',authRoutes);

// http://localhost:4050/api/orders
router.use('/orders',orderRoutes);

module.exports = router;