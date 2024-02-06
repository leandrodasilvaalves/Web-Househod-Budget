require('dotenv').config();
const express = require('express');
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

router.get('/transactions/create', (req, res) => {
    res.render(`${pages_dirname}/transaction-form`, options);
});

router.get('/account/login', (req, res) => {
    res.render(`${pages_dirname}/login`, options);
});

module.exports = router;