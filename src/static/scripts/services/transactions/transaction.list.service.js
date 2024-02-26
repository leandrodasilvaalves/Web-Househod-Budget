import { getAllTransactions, updateTransaction } from '@clients/transaction.client';
import pagination from '@partials/pagination.partial';
import { padZeroLeft } from '@utils/number.utils';

export default function () {
    document.addEventListener("DOMContentLoaded", async () => {
        if (page.isTransactionsList()) {
            page.loadTransactions();
            page.configureMonths();
            page.configureYear();

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
    getPathRoute: () => {
        const { page: pg, size } = page.getQueryString();
        return `/transactions?year=${page.year?.value || today.getFullYear()}&month=${page.month?.value || padZeroLeft(today.getMonth() + 1, 2)}&page=${pg}&size=${size}`;
    },
    isTransactionsList: () => window.location.pathname == '/transactions',

    loadTransactions: async () => {
        const { isSuccess, data, errors } = await getAllTransactions(page.getQueryString());
        if (isSuccess) {
            const tbody = page.table.getElementsByTagName("tbody")[0];
            const result = data.items.map(item =>
                `<tr>
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
                            <a href="/transactions/remove/${item.id}" class="btn btn-outline-danger" tabindex="-1" role="button"><i class="bi bi-trash"></i></a>
                        </div>
                    </td>
                </tr>`).join('');
            tbody.innerHTML = result;
            pagination({ ...data, pageSize: 15 });
        }
    },
    configureMonths: () => {
        const nameOfMonths = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const { month: current } = page.getQueryString();
        nameOfMonths.forEach((month, index) => {
            let option = document.createElement('option');
            option.value = padZeroLeft(index + 1, 2);
            option.text = month;
            option.selected = current == padZeroLeft(index + 1, 2);
            page.month.appendChild(option);
        });
    },
    configureYear: () => {
        const { year: current } = page.getQueryString();
        for (let year = 2015; year <= 2045; year++) {
            let option = document.createElement('option');
            option.value = year;
            option.text = year;
            option.selected = year == current;
            page.year.appendChild(option);
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