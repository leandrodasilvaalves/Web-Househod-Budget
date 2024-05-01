import httpclient from './http.client';

const getAllTransactions = async ({ year, month, page, size }) =>
    httpclient.get('transactions', `year=${year}&month=${month}&pageNumber=${page}&pageSize=${size || 15}`);

const getTransactionById = async id =>
    httpclient.get(`transactions/${id}`);

const createTransaction = async transaction =>
    httpclient.post('transactions', transaction);

const updateTransaction = async transaction =>
    httpclient.patch('transactions', transaction);

export {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
};