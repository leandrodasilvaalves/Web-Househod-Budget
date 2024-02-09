import httpclient from './http.client';

const login = async (user) =>
    httpclient.post('identity/login', user, true);

const register = async (user)=>
    httpclient.post('identity/register', user, true);

export { login, register };