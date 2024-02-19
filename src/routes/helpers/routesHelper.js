require('dotenv').config();
const path = require('path');

const options = {
    root: path.join(__dirname, 'views'),
    apiUrl: process.env.HOUSEHOLDBUDGET_URL,
    envName: process.env.ENV_NAME,
    theme: process.env.THEME,
};

const helper = {
    getOptions: () => options,
    getView:(viewName)=> `pages/${viewName}`,
}

module.exports = helper;