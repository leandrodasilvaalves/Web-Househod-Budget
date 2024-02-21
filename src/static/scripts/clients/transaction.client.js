import httpclient from './http.client';

const create = async transaction =>
    httpclient.post('transactions', transaction);

const getAllTransactions = async ({ year, month, page, size }) =>
    httpclient.get('transactions', `year=${year}&month=${month}&pageNumber=${page}&pageSize=${size || 15}`);

export { getAllTransactions, create };