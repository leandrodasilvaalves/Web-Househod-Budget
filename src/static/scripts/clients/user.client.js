import httpclient from './http.client';

const login = async (user) =>
    httpclient.post('identity/login', user, true);

export { login };