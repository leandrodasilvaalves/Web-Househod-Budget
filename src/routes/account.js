require('dotenv').config();
const express = require('express');
const router = express.Router();
const helper = require('./helpers/routesHelper');

router.get('/login', (req, res) => {
    res.render(helper.getView('user-login'), helper.getOptions());
});

router.get('/register', (req, res) => {
    res.render(helper.getView('user-register'), helper.getOptions());
});

module.exports = router;