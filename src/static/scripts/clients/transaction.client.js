import httpclient from './http.client';

const create = async transaction =>
    httpclient.post('transactions', transaction);

export { create };