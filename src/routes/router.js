require('dotenv').config();
const express = require('express');
const transactions = require('./transaction');
const account = require('./account');
const router = express.Router();
const helper = require('./helpers/routesHelper');


router.get('/', (req, res) => {
    res.render(helper.getView('home'), helper.getOptions());
});

router.use('/transactions', transactions);

router.use('/account', account);

module.exports = router;