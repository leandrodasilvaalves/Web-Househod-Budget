const axios = require('axios');
const apiVersion = 'v1';


async function login(username, password) {
    let storageKey = `${username}-accessToken`;
    try {
        const accessToken = localStorage.getItem(storageKey);
        if (accessToken) return accessToken;

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${apiUrl}/api/${apiVersion}/identity/login`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: { username, password }
        };
        const response = await axios.request(config);
        var { isSuccess, data } = response.data;
        if (isSuccess) {
            const { token_type, access_token } = data;
            localStorage.setItem(storageKey, `${token_type} ${access_token}`)
            return access_token;
        }
    } catch (error) {
        return error.response;
    }
}

export { login };