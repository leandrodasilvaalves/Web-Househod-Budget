const express = require('express');
const router = express.Router();

router.get('/transaction', (req, res) => {
    res.sendFile('transaction.html', { root: 'transactions' });
});

module.exports = router;