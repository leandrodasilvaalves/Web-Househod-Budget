import { accessToken, clearAccessToken } from '../user.service';
const axios = require('axios');
const apiVersion = 'v1';

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

const httpclient = {
    get: async (path, query, isAnonymousRoute) => {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${apiUrl}/api/${apiVersion}/${path}?${query}`,
                headers: headers(isAnonymousRoute),
            };
            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            return handlerError(error);
        }
    },

    post: async (path, body, isAnonymousRoute) => {
        try {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${apiUrl}/api/${apiVersion}/${path}`,
                headers: headers(isAnonymousRoute),
                data: body
            };

            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            return handlerError(error);
        }
    }
}
export default httpclient;