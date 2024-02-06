import { accessToken, clearAccessToken } from '../user.service';
const axios = require('axios');
const apiVersion = 'v1';

async function getCategories() {
    const categoryList = [];
    let pageNumber = 1;
    let hasMorePages = false;

    try {
        do {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${apiUrl}/api/${apiVersion}/categories?pageNumber=${pageNumber}&pageSize=50`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken,
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
        const { status } = error.response;
        if (status == 401) {
            clearAccessToken();
        }
        return error.response;
    }
}

export { getCategories };