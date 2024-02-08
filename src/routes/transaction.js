require('dotenv').config();
const express = require('express');
const router = express.Router();
const helper = require('./routesHelper');

router.get('/', (req, res) => {
    res.render(`${helper.getPagesDirectory()}/transactions-list`, helper.getOptions());
});

router.get('/create', (req, res) => {
    res.render(`${helper.getPagesDirectory()}/transaction-form`, helper.getOptions());
});

router.get('/edit:id', (req, res) => {
    res.render(`${helper.getPagesDirectory()}/transaction-edit`, helper.getOptions());
});

router.get('/remove:id', (req, res) => {
    res.render(`${helper.getPagesDirectory()}/transaction-remove`, helper.getOptions());
});

module.exports = router;