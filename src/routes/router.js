require('dotenv').config();
const express = require('express');
const transactions = require('./transaction');
const account = require('./account');
const router = express.Router();
const path = require('path');

const pages_dirname = 'pages';
const options = {
    root: path.join(__dirname, 'views'),
    apiUrl: process.env.HOUSEHOLDBUDGET_URL
};

router.get('/', (req, res) => {
    res.render(`${pages_dirname}/home`, options);
});

router.use('/transactions', transactions);

router.use('/account', account);

module.exports = router;