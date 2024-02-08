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
    res.render(`${pages_dirname}/transactions-list`, options);
});

router.get('/create', (req, res) => {
    res.render(`${pages_dirname}/transaction-form`, options);
});

router.get('/edit:id', (req, res) => {
    res.render(`${pages_dirname}/transaction-edit`, options);
});

router.get('/remove:id', (req, res) => {
    res.render(`${pages_dirname}/transaction-remove`, options);
});

module.exports = router;