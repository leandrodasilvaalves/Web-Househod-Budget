require('dotenv').config();
const express = require('express');
const router = express.Router();
const helper = require('./routesHelper');

router.get('/login', (req, res) => {
    res.render(`${helper.getPagesDirectory()}/login`, helper.getOptions());
});

router.get('/register', (req, res) => {
    res.render(`${helper.getPagesDirectory()}/register`, helper.getOptions());
});

module.exports = router;