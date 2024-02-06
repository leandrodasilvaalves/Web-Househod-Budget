const express = require('express');
const router = express.Router();
const path = require('path');
const view_dirname = path.join(__dirname, 'views');
const pages_dirname = 'pages';

router.get('/', (req, res) => {
    res.render(`${pages_dirname}/home`, { root: view_dirname });
});

router.get('/transactions/create', (req, res) => {
    res.render(`${pages_dirname}/transaction-form`, { root: view_dirname });
});

module.exports = router;