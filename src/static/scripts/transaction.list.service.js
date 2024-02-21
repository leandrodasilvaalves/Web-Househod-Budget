import { getAllTransactions } from './clients/transaction.client';

export default function () {
    if (page.isDesiredRoute()) {
        page.loadTransactions();
    }
}

const page = {
    table: document.getElementById('tbTransactions'),
    pagination: document.getElementById('pagination'),
    isDesiredRoute: () => {
        const desiredRoutes = ['/transactions'];
        return desiredRoutes.includes(window.location.pathname);
    },

    loadTransactions: async () => {
        const { isSuccess, data, errors } = await getAllTransactions(page.getQueryString());
        if (isSuccess) {
            const tbody = page.table.getElementsByTagName("tbody")[0];
            const result = data.items.map(item => {
                return `<tr>
                    <td>${new Date(item.transactionDate).getUTCDate()}</td>
                    <td>${item.description}</td>
                    <td>
                        <span class="badge rounded-pill text-bg-secondary">${item.category.name}</span><br/>
                        <small class="text-secondary">${item.category.subcategory.name}</small>
                    </td>
                    <td>
                        <span class="badge bg-secondary">${item.payment.type?.toLowerCase()}</span><br/>
                        <small>${item.payment.total.toFixed(2)}</small>
                    </td>                                        
                    <td>
                        <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">                           
                            <button type="button" class="btn btn-outline-info"><i class="bi bi-pencil-square"></i></button>
                            <button type="button" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
                        </div>
                    </td>
                </tr>`}).join('');
            tbody.innerHTML = result;
            page.generatePagination(data);
        }
    },

    generatePagination: ({ totalResult, currentPage, pageSize, totalPages, hasMorePages }) => {
        const previousPage = currentPage > 1 ? (currentPage - 1) : currentPage;
        const nextPage = currentPage < totalPages ? (currentPage + 1) : totalPages;
        const disablePreviousPage = currentPage == 1 ? "disabled" : "";
        const disableNextpage = currentPage == totalPages ? "disabled" : "";

        console.log({ totalResult, currentPage, pageSize, totalPages, hasMorePages });

        const html = `<ul class="pagination justify-content-end">
          <li class="page-item ${disablePreviousPage}">
            <a class="page-link" href="/transactions?year=2024&month=02&page=${previousPage}&size=${pageSize}">Previous</a>
          </li>
          <li class="page-item"><a class="page-link" href="/transactions?year=2024&month=02&page=1&size=${pageSize}">1</a></li>
          <li class="page-item"><a class="page-link" href="/transactions?year=2024&month=02&page=2&size=${pageSize}">2</a></li>
          <li class="page-item"><a class="page-link" href="/transactions?year=2024&month=02&page=3&size=${pageSize}">3</a></li>
          <li class="page-item ${disableNextpage}">
            <a class="page-link" href="/transactions?year=2024&month=02&page=${nextPage}&size=${pageSize}">Next</a>
          </li>
        </ul>`
        page.pagination.innerHTML = html;
    },

    getQueryString: () => {
        const queryString = window.location.search;
        const parameters = new URLSearchParams(queryString);

        const year = parameters.get('year');
        const month = parameters.get('month');
        const page = parameters.get('page');
        const size = parameters.get('size');
        return { year, month, page, size };
    }
}