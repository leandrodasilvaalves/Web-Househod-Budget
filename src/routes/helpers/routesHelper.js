require('dotenv').config();
const path = require('path');

const currentDate = new Date();
const months = [...process.env.MONTH_NAMES?.split(',')];

const options = {
    root: path.join(__dirname, 'views'),
    apiUrl: process.env.HOUSEHOLDBUDGET_URL,
    envName: process.env.ENV_NAME,
    theme: process.env.THEME,
    year: currentDate.getFullYear(),
    month: (currentDate.getMonth() + 1).toString().padStart(2, '0'),
    monthName: months[currentDate.getMonth()],
    pageSize: process.env.PAGE_SIZE || 20
};

const helper = {
    getOptions: () => options,
    getView: (viewName) => `pages/${viewName}`,
}

module.exports = helper;