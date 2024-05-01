import httpclient from './http.client';

const getOneMonthlyBudget = async (year, month) =>
    await httpclient.get(`budget/${year}/${month}`);

export {
    getOneMonthlyBudget
}