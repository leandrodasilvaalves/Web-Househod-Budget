import { getAllTransactions } from '@clients/transaction.client';
import pagination from '@partials/pagination.partial';
import { padZeroLeft } from '@utils/number.utils';

export default function () {
    if (page.isDesiredRoute()) {
        page.loadTransactions();
    }
}

const today = new Date();

export const page = {
    table: document.getElementById('tbTransactions'),
    pagination: document.getElementById('pagination'),
    getPathRoute: () => `/transactions?year=${today.getFullYear()}&month=${padZeroLeft(today.getMonth() + 1, 2)}&page=1&size=15`,
    isDesiredRoute: () => {
        const desiredRoutes = ['/transactions'];
        return desiredRoutes.includes(window.location.pathname);
    },

    loadTransactions: async () => {
        const { isSuccess, data, errors } = await getAllTransactions(page.getQueryString());
        if (isSuccess) {
            const tbody = page.table.getElementsByTagName("tbody")[0];
            const result = data.items.map(item =>
                `<tr>
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
                            <a href="/transactions/edit/${item.id}" class="btn btn-outline-info" tabindex="-1" role="button"><i class="bi bi-pencil-square"></i></a>
                            <a href="#" class="btn btn-outline-danger" tabindex="-1" role="button"><i class="bi bi-trash"></i></a>
                        </div>
                    </td>
                </tr>`).join('');
            tbody.innerHTML = result;
            pagination({ ...data, pageSize: 15 });
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