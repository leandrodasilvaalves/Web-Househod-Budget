require('dotenv').config();
const express = require('express');
const router = express.Router();
const helper = require('./helpers/routesHelper');

router.get('/', (req, res) => {
    res.render(helper.getView('monthly-budget'), helper.getOptions());
});

module.exports = router;