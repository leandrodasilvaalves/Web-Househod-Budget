import { getAllTransactions } from './clients/transaction.client';
import pagination from './pagination.service';

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
            pagination(data);
        }
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