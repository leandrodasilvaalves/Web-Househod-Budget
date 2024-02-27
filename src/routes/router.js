require('dotenv').config();
const express = require('express');
const transactions = require('./transaction');
const account = require('./account');
const router = express.Router();
const helper = require('./helpers/routesHelper');
const monthlybudget = require('./monthlybudget');


router.get('/', (req, res) => {
    res.render(helper.getView('home'), helper.getOptions());
});

router.use('/transactions', transactions);
router.use('/account', account);
router.use('/monthlybudget', monthlybudget);

module.exports = router;