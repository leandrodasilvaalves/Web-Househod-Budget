require('dotenv').config();
const express = require('express');
const router = express.Router();
const path = require('path');
const pages_dirname = 'pages';

const options = {
    root: path.join(__dirname, 'views'),
    apiUrl: process.env.HOUSEHOLDBUDGET_URL
};

router.get('/login', (req, res) => {
    res.render(`${pages_dirname}/login`, options);
});

router.get('/register', (req, res) => {
    res.render(`${pages_dirname}/register`, options);
});

module.exports = router;