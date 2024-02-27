import httpclient from './http.client';

const getOneMonthlyBudget = (year, month) =>
    httpclient.get(`budget/${year}/${month}`);

export {
    getOneMonthlyBudget
}