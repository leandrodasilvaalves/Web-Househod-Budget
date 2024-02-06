import { login } from './user.client';

const axios = require('axios');
const apiVersion = 'v1';

async function getCategories() {
    const categoryList = [];
    let pageNumber = 1;
    let hasMorePages = false;

    try {
        var access_token = await login('foo', 'bar');
        do {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${apiUrl}/api/${apiVersion}/categories?pageNumber=${pageNumber}&pageSize=50`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': access_token,
                }
            };

            const response = await axios.request(config);
            var { isSuccess, data } = response.data;
            if (isSuccess) {
                categoryList.push(...data.items);
                hasMorePages = data.hasMorePages;
                pageNumber += 1;
            }
        } while (hasMorePages);
        return { isSuccess: true, items: categoryList };

    } catch (error) {
        return error.response;
    }
}

export { getCategories };