require('dotenv').config();
const path = require('path');

const options = {
    root: path.join(__dirname, 'views'),
    apiUrl: process.env.HOUSEHOLDBUDGET_URL
};

const helper = {
    getOptions: () => options,
    getView:(viewName)=> `pages/${viewName}`,
}

module.exports = helper;