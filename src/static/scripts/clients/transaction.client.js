import { accessToken, clearAccessToken } from '../user.service';

const axios = require('axios');
const apiVersion = 'v1';

async function create(transaction) {
    try {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${apiUrl}/api/${apiVersion}/transactions`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
            },
            data: transaction
        };
        return (await axios.request(config))?.data;

    } catch (error) {
        const { status } = error.response;
        if (status == 401) {
            clearAccessToken();
        }
        return error.response;
    }
}

export { create };