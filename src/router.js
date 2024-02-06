const express = require('express');
const router = express.Router();
const path = require('path');
const view_dirname = path.join(__dirname, 'views');

router.get('/', (req, res) => {
    res.sendFile('home.html', { root: view_dirname });
});

router.get('/transactions', (req, res) => {
    res.sendFile('transaction.html', { root: view_dirname });
});

module.exports = router;