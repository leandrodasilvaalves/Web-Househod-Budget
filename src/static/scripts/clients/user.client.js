const axios = require('axios');
const apiVersion = 'v1';

async function login({ username, password }) {
    try {
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
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export { login };