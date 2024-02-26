require('dotenv').config();
const express = require('express');
const router = express.Router();
const helper = require('./helpers/routesHelper');

router.get('/', (req, res) => {
    res.render(helper.getView('transactions-list'), helper.getOptions());
});

router.get('/create', (req, res) => {
    res.render(helper.getView('transaction-form'), helper.getOptions());
});

router.get('/edit/:id', (req, res) => {
    res.render(helper.getView('transaction-form'), helper.getOptions());
});

module.exports = router;