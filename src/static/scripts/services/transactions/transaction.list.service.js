import { getAllTransactions, updateTransaction } from '@clients/transaction.client';
import pagination from '@partials/pagination.partial';
import { padZeroLeft } from '@utils/number.utils';
import { successAlert, errorAlert, confirmAlert } from '@utils/alerts.utils';
import { configureMonthOptions, configureYearOptions } from '@utils/date.utils';

export default function () {
    document.addEventListener("DOMContentLoaded", async () => {
        if (page.isTransactionsList()) {
            page.loadTransactions();

            const { year, month } = page.getQueryString();
            configureYearOptions(page.year, year);
            configureMonthOptions(page.month, parseInt(month));

            page.form.addEventListener('submit', event => {
                event.preventDefault();
                window.location.href = page.getPathRoute();
            });
        }
    });
}

const today = new Date();
export const page = {
    table: document.getElementById('tbTransactions'),
    pagination: document.getElementById('pagination'),
    form: document.getElementById('search'),
    year: document.getElementById('year'),
    month: document.getElementById('month'),
    btnExcludeList: document.getElementsByName('btn-exclude'),
    getPathRoute: () => {
        const { page: pg, size } = page.getQueryString();
        const year = page.year?.value || today.getFullYear();
        const month = page.month?.value || padZeroLeft(today.getMonth() + 1, 2);
        return `/transactions?year=${year}&month=${month}&page=${pg}&size=${size}`;
    },
    isTransactionsList: () => window.location.pathname == '/transactions',
    loadTransactions: async () => {
        const { isSuccess, data, errors } = await getAllTransactions(page.getQueryString());
        if (isSuccess) {
            const tbody = page.table.getElementsByTagName("tbody")[0];
            const result = data.items.map((item, index) =>
                `<tr class="align-middle">
                    <td>${new Date(item.transactionDate).getUTCDate()}</td>
                    <td>${item.description}</td>
                    <td>
                        <span class="badge rounded-pill ${item.type == "INCOMES" ? "bg-success" : "bg-secondary"}">${item.category.name}</span><br/>
                        <small class="text-secondary">${item.category.subcategory.name}</small>
                    </td>
                    <td>
                        <span class="badge ${item.type == "INCOMES" ? "bg-success" : "bg-secondary"}">${item.payment.type?.toLowerCase()}</span><br/>
                        <small>${item.payment.total.toFixed(2)}</small>
                    </td>                                        
                    <td>
                        <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">   
                            <a href="/transactions/edit/${item.id}" class="btn btn-outline-info" tabindex="-1" role="button"><i class="bi bi-pencil-square"></i></a>
                            <a href="/transactions/clone/${item.id}" class="btn btn-outline-secondary" tabindex="-1" role="button"><i class="bi bi-copy"></i></a>
                            <button name="btn-exclude" data-id="${item.id}" data-index="${index}" class="btn btn-outline-danger" tabindex="-1" role="button"><i class="bi bi-trash"></i></button>
                        </div>
                    </td>
                </tr>`).join('');
            tbody.innerHTML = result;
            pagination({ ...data, pageSize: 15 });

            Array.from(page.btnExcludeList).forEach(btn =>
                btn.addEventListener('click', () => page.excludeTransaction(btn.dataset)));
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
    },
    excludeTransaction: ({ id, index }) => {
        confirmAlert(
            "Deseja realmente excluir essa transação?",
            "Esta transação não pode ser desfeita!",
            async () => {
                var { isSuccess, data, errors } = await updateTransaction({ id, status: 'EXCLUDED' });
                if (isSuccess) {
                    page.removeTableRow(index);
                    console.log('data', data);
                    successAlert('transação atualizada com sucesso');
                }
                else {
                    console.log('errors', errors);
                    errorAlert('Ocorreram erros ao tentar atualizar uma transação');
                }
            });
    },
    removeTableRow: (index) => {
        const tbody = page.table.getElementsByTagName('tbody')[0];
        tbody.deleteRow(index);
    }
}