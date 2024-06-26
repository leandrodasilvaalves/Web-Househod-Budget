import { accessToken, clearAccessToken } from '../services/users';
const axios = require('axios');

const headers = (isAnonymousRoute) => {
    let _headers = { 'Content-Type': 'application/json', }
    if (isAnonymousRoute == undefined || isAnonymousRoute == false) {
        return { ..._headers, 'Authorization': accessToken };
    }
    return _headers;
}

const handlerError = (error) => {
    const { status } = error.response;
    if (status == 401) {
        clearAccessToken();
    }
    return error.response;
};

const createConfig = (method, path, body, isAnonymousRoute) => {
    let config = {
        method,
        maxBodyLength: Infinity,
        url: `${apiUrl}/api/v1/${path}`,
        headers: headers(isAnonymousRoute),
    };
    if (body) {
        return { ...config, data: body };
    }
    return config;
};

const request = async (method, path, body, isAnonymousRoute) => {
    try {
        let config = createConfig(method, path, body, isAnonymousRoute);
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        return handlerError(error);
    }
}

const httpclient = {
    get: async (path, query, isAnonymousRoute) => {
        const completePath = query ? `${path}?${query}` : path;
        return await request('get', completePath, undefined, isAnonymousRoute);
    },
    post: async (path, body, isAnonymousRoute) =>
        await request('post', path, body, isAnonymousRoute),

    patch: async (path, body, isAnonymousRoute) =>
        await request('patch', `${path}/${body.id}`, body, isAnonymousRoute),
}
export default httpclient;