require('dotenv').config();
const path = require('path');

const options = {
    root: path.join(__dirname, 'views', 'pages'),
    apiUrl: process.env.HOUSEHOLDBUDGET_URL
};

const helper = {
    getOptions: () => options,
    getPagesDirectory: () => 'pages',
}

module.exports = helper;