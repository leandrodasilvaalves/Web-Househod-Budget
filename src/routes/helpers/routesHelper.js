require('dotenv').config();
const path = require('path');

const currentDate = new Date();
const padZeroLeft = (number, zeros) => number.toString().padStart(zeros || 1, '0');

const options = {
    root: path.join(__dirname, 'views'),
    apiUrl: process.env.HOUSEHOLDBUDGET_URL,
    envName: process.env.ENV_NAME,
    theme: process.env.THEME,
    year: currentDate.getFullYear(),
    month: padZeroLeft(currentDate.getMonth() + 1, 2),
    pageSize: process.env.PAGE_SIZE || 20
};

const helper = {
    getOptions: () => options,
    getView: (viewName) => `pages/${viewName}`,
}

module.exports = helper;