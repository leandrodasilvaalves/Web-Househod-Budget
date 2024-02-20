import { getAllTransactions } from './clients/transaction.client';

export default function () {
    if (page.isDesiredRoute()) {
        page.loadTransactions();
    }
}

const page = {
    table: document.getElementById('tbTransactions'),
    isDesiredRoute: () => {
        const desiredRoutes = ['/transactions'];
        return desiredRoutes.includes(window.location.pathname);
    },
    loadTransactions: async () => {
        const { isSuccess, data, errors } = await getAllTransactions('2024', '02', 1);
        if (isSuccess) {
            const tbody = page.table.getElementsByTagName("tbody")[0];
            const result = data.items.map(item =>{
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
                            <button type="button" class="btn btn-outline-info"><i
                                    class="bi bi-pencil-square"></i></button>
                            <button type="button" class="btn btn-outline-danger"><i
                                    class="bi bi-trash"></i></button>
                        </div>
                    </td>
                </tr>`}).join('');
            tbody.innerHTML = result;
        }
    }
}
