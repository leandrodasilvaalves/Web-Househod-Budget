import httpclient from './http.client';

async function getCategories() {
    const categoryList = [];
    let pageNumber = 1;
    let hasMorePages = false;

    do {
        const { data, error } = await httpclient.get('categories', `pageNumber=${pageNumber}&pageSize=50`);
        if (error) return error;

        categoryList.push(...data?.items);
        hasMorePages = data.hasMorePages;
        pageNumber += 1;

    } while (hasMorePages);
    return { isSuccess: true, items: categoryList };
}

export { getCategories };