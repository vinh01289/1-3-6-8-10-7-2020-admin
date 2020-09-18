const express = require('express');
const router = express.Router();

// trang dashboard
const admin_router = require('./admin_router');
router.use('/admin', admin_router);

// trang product
const product_router = require('./product_router');
router.use('/product', product_router);

// trang category
const category_router = require('./category_router');
router.use('/category', category_router);

// trang user
const user_router = require('./user_router');
router.use('/user', user_router);

// api user
const api_user_router = require('./api_user_router');
router.use('/apiUser', api_user_router);

module.exports = router;